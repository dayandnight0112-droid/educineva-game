/**
 * Educineva 母体 Socket 事件中枢 - SocketHandler
 * 职责：
 * 1. 注册核心教学与房间生命周期事件
 * 2. 处理老师建房、销房及房间专属频道广播
 * 3. 【第 2 步】：学生 6 位 PIN 码进房、自动均衡分队、等待大厅花名册（Roster）全房同步
 * 4. 【第 2 步】：教师专属队伍调配（新增队伍、删除队伍、调整学生队伍 `your_team_changed` 针对性通知）
 * 5. 【第 2 步】：学生断线凭借 Token 重连恢复
 * 6. 【第 3 步】：题目物理脱敏下发（`teacher_push_question` / `new_question`，绝不携带正确答案）
 * 7. 【第 3 步】：学生答题提交（`student_submit_answer`）、防刷防重、个人专属反馈（`answer_feedback`）、全房积分榜广播（`scoreboard_update`）
 * 8. 【第 4 步】：教师触发结算信令（`teacher_end_game`）、Kahoot 式颁奖台与全量错题复盘数据广播（`game_settlement_data`）
 */

/**
 * 初始化 Socket.io 调度中枢
 * @param {import('socket.io').Server} io 
 * @param {import('./roomManager.js').RoomManager} roomManager 
 */
export function initSocketServer(io, roomManager) {
  io.on('connection', (socket) => {
    console.log(`[Socket] 新连接建立: ${socket.id} (IP: ${socket.handshake.address})`);

    // =========================================================================
    // 教师端：房间生命周期
    // =========================================================================

    /**
     * 1. 老师创建房间事件
     */
    socket.on('teacher_create_room', async (data, callback) => {
      try {
        console.log(`[Socket] 收到创建房间请求:`, {
          socketId: socket.id,
          teacherId: data?.teacherId,
          roomName: data?.roomName,
          gameId: data?.gameId
        });

        if (!data || typeof data !== 'object') {
          throw new Error('无效的房间参数');
        }

        const { teacherId, roomName, gameId, gameMode, config, questions } = data;

        if (!teacherId) throw new Error('缺少必要参数: teacherId');
        if (!roomName) throw new Error('缺少必要参数: roomName');

        const roomSnapshot = roomManager.createRoom({
          teacherId,
          teacherSocketId: socket.id,
          roomName,
          gameId,
          gameMode,
          config,
          questions
        });

        const roomId = roomSnapshot.roomId;

        await socket.join(roomId);
        socket.data.roomId = roomId;
        socket.data.role = 'teacher';
        socket.data.teacherId = teacherId;

        const response = {
          success: true,
          roomId: roomSnapshot.roomId,
          pin: roomSnapshot.pin,
          roomData: roomSnapshot
        };

        if (typeof callback === 'function') callback(response);
        socket.emit('room_created', response);

      } catch (err) {
        console.error(`[Socket] 创建房间异常 [${socket.id}]:`, err.message);
        const errorResponse = { success: false, error: err.message || '创建房间失败' };
        if (typeof callback === 'function') callback(errorResponse);
        socket.emit('error', errorResponse);
      }
    });

    /**
     * 2. 老师关闭房间事件
     */
    socket.on('teacher_close_room', async (data, callback) => {
      try {
        const targetRoomId = data?.roomId || socket.data?.roomId;
        console.log(`[Socket] 收到关闭房间请求: ${targetRoomId} (操作者: ${socket.id})`);

        if (!targetRoomId) throw new Error('缺少必要参数: roomId');

        const room = roomManager.getRoom(targetRoomId);
        if (!room) throw new Error(`房间不存在或已被关闭: ${targetRoomId}`);

        io.to(targetRoomId).emit('room_closed', {
          roomId: targetRoomId,
          reason: 'teacher_closed',
          timestamp: Date.now()
        });

        io.in(targetRoomId).socketsLeave(targetRoomId);

        const closed = roomManager.closeRoom(targetRoomId);

        if (socket.data.roomId === targetRoomId) {
          socket.data.roomId = null;
        }

        const response = {
          success: closed,
          roomId: targetRoomId,
          message: '房间已成功注销并清理完毕'
        };

        if (typeof callback === 'function') callback(response);

      } catch (err) {
        console.error(`[Socket] 关闭房间异常 [${socket.id}]:`, err.message);
        const errorResponse = { success: false, error: err.message || '关闭房间失败' };
        if (typeof callback === 'function') callback(errorResponse);
        socket.emit('error', errorResponse);
      }
    });

    // =========================================================================
    // 学生端：进房与重连
    // =========================================================================

    /**
     * 3. 学生通过 6 位数字 PIN 码加入房间
     */
    socket.on('student_join_room', async (data, callback) => {
      try {
        const cleanPin = String(data?.pin || '').trim();
        const studentName = String(data?.studentName || '').trim();

        if (!cleanPin) throw new Error('请输入 6 位数字房间 PIN 码');
        if (!studentName) throw new Error('请输入学生姓名');

        const targetRoomId = roomManager.pinToRoomId.get(cleanPin);
        if (!targetRoomId) throw new Error(`未找到 PIN 码为 [${cleanPin}] 的活跃房间，请检查是否输入正确`);

        const room = roomManager.getRoom(targetRoomId);
        if (!room || room.status === 'closed') throw new Error('该房间已关闭或不存在');
        if (room.isLocked) throw new Error('该课堂房间已被老师锁定，暂时无法加入');

        const { student } = roomManager.addStudentToRoom(targetRoomId, {
          name: studentName,
          socketId: socket.id,
          avatar: data?.avatar
        });

        await socket.join(targetRoomId);

        socket.data.roomId = targetRoomId;
        socket.data.role = 'student';
        socket.data.studentId = student.studentId;
        socket.data.studentToken = student.token;

        const roster = roomManager.getRoomRoster(targetRoomId);
        let activeQuestion = null;
        if (room.status === 'in_game' && room.sandboxState && room.sandboxState.currentQuestionIndex >= 0) {
          try {
            activeQuestion = roomManager.getDesensitizedQuestion(targetRoomId, room.sandboxState.currentQuestionIndex);
          } catch {
            activeQuestion = null;
          }
        }

        const response = {
          success: true,
          roomId: targetRoomId,
          studentId: student.studentId,
          studentToken: student.token,
          avatar: student.avatar,
          teamId: student.teamId,
          roomName: room.roomName,
          teams: room.teams,
          hasTeams: room.hasTeams,
          roster,
          activeQuestion,
          activeStage: room.sandboxState?.activeStage || null
        };

        if (typeof callback === 'function') callback(response);
        socket.emit('student_joined', response);

        io.to(targetRoomId).emit('room_roster_update', roster);

      } catch (err) {
        console.error(`[Socket] 学生进房失败 [${socket.id}]:`, err.message);
        const errorResponse = { success: false, error: err.message || '加入房间失败' };
        if (typeof callback === 'function') callback(errorResponse);
        socket.emit('error', errorResponse);
      }
    });

    /**
     * 4. 学生凭借 Token 进行断线重连恢复
     */
    socket.on('student_reconnect', async (data, callback) => {
      try {
        const { roomId, studentToken } = data || {};
        if (!roomId || !studentToken) throw new Error('缺少必要参数: roomId 或 studentToken');

        const student = roomManager.reconnectStudent(roomId, {
          studentToken,
          socketId: socket.id
        });

        await socket.join(roomId);
        socket.data.roomId = roomId;
        socket.data.role = 'student';
        socket.data.studentId = student.studentId;
        socket.data.studentToken = studentToken;

        const room = roomManager.getRoom(roomId);
        const targetTeam = room.teams.find(t => t.id === student.teamId);

        const response = {
          success: true,
          studentId: student.studentId,
          teamId: student.teamId,
          teamName: targetTeam ? targetTeam.name : null,
          roomName: room.roomName,
          score: student.score,
          wrongCount: student.wrongCount,
          roster: roomManager.getRoomRoster(roomId)
        };

        if (typeof callback === 'function') callback(response);
        socket.emit('student_reconnected', response);

        io.to(roomId).emit('room_roster_update', roomManager.getRoomRoster(roomId));

      } catch (err) {
        console.error(`[Socket] 学生重连失败 [${socket.id}]:`, err.message);
        const errorResponse = { success: false, error: err.message || '重连恢复失败' };
        if (typeof callback === 'function') callback(errorResponse);
        socket.emit('error', errorResponse);
      }
    });

    // =========================================================================
    // 教师端专属：队伍管控与调配指令
    // =========================================================================

    /**
     * 5. 教师指令：新增队伍
     */
    socket.on('teacher_add_team', (data, callback) => {
      try {
        const roomId = data?.roomId || socket.data?.roomId;
        if (!roomId) throw new Error('缺少 roomId 参数');

        const room = roomManager.getRoom(roomId);
        if (!room) throw new Error('房间不存在');

        if (room.teacherSocketId !== socket.id && socket.data?.role !== 'teacher') {
          throw new Error('权限不足：仅任课老师可增减队伍');
        }

        const newTeam = roomManager.addTeam(roomId, {
          teamName: data.teamName,
          teamColor: data.teamColor
        });

        const roster = roomManager.getRoomRoster(roomId);
        io.to(roomId).emit('room_roster_update', roster);

        const response = { success: true, team: newTeam, roster };
        if (typeof callback === 'function') callback(response);

      } catch (err) {
        console.error(`[Socket] 新增队伍异常:`, err.message);
        const errorResponse = { success: false, error: err.message };
        if (typeof callback === 'function') callback(errorResponse);
        socket.emit('error', errorResponse);
      }
    });

    /**
     * 6. 教师指令：删除队伍
     */
    socket.on('teacher_remove_team', (data, callback) => {
      try {
        const roomId = data?.roomId || socket.data?.roomId;
        if (!roomId) throw new Error('缺少 roomId 参数');

        const room = roomManager.getRoom(roomId);
        if (!room) throw new Error('房间不存在');

        if (room.teacherSocketId !== socket.id && socket.data?.role !== 'teacher') {
          throw new Error('权限不足：仅任课老师可删除队伍');
        }

        const result = roomManager.removeTeam(roomId, data.teamId);
        const roster = roomManager.getRoomRoster(roomId);

        io.to(roomId).emit('room_roster_update', roster);

        for (const s of result.reassignedStudents) {
          if (s.socketId) {
            const assignedTeam = room.teams.find(t => t.id === s.newTeamId);
            io.to(s.socketId).emit('your_team_changed', {
              teamId: s.newTeamId,
              teamName: assignedTeam ? assignedTeam.name : null,
              teamColor: assignedTeam ? assignedTeam.color : null,
              reason: 'team_removed'
            });
          }
        }

        const response = { success: true, roster };
        if (typeof callback === 'function') callback(response);

      } catch (err) {
        console.error(`[Socket] 删除队伍异常:`, err.message);
        const errorResponse = { success: false, error: err.message };
        if (typeof callback === 'function') callback(errorResponse);
        socket.emit('error', errorResponse);
      }
    });

    /**
     * 7. 教师指令：在后台自由调队/换队
     */
    socket.on('teacher_move_student', (data, callback) => {
      try {
        const roomId = data?.roomId || socket.data?.roomId;
        if (!roomId) throw new Error('缺少 roomId 参数');

        const room = roomManager.getRoom(roomId);
        if (!room) throw new Error('房间不存在');

        if (room.teacherSocketId !== socket.id && socket.data?.role !== 'teacher') {
          throw new Error('权限不足：仅任课老师可调动学生队伍');
        }

        const { studentId, targetTeamId } = data;
        if (!studentId) throw new Error('缺少 studentId 参数');

        const { student, targetTeam } = roomManager.moveStudentTeam(roomId, studentId, targetTeamId);
        const roster = roomManager.getRoomRoster(roomId);

        io.to(roomId).emit('room_roster_update', roster);

        if (student.socketId) {
          io.to(student.socketId).emit('your_team_changed', {
            studentId: student.studentId,
            teamId: targetTeamId,
            teamName: targetTeam ? targetTeam.name : null,
            teamColor: targetTeam ? targetTeam.color : null,
            reason: 'teacher_reassigned'
          });
        }

        const response = {
          success: true,
          studentId: student.studentId,
          teamId: targetTeamId,
          teamName: targetTeam ? targetTeam.name : null
        };
        if (typeof callback === 'function') callback(response);

      } catch (err) {
        console.error(`[Socket] 调动学生队伍异常:`, err.message);
        const errorResponse = { success: false, error: err.message };
        if (typeof callback === 'function') callback(errorResponse);
        socket.emit('error', errorResponse);
      }
    });

    /**
     * 7.1 教师大屏绑定已有房间（用于后台建房后跳转大屏，支持指定 roomId/pin 或自动挂载最新活跃房间）
     */
    socket.on('teacher_bind_room', async (data, callback) => {
      try {
        let targetRoomId = data?.roomId || (data?.pin ? roomManager.pinToRoomId.get(String(data.pin).trim()) : null);

        // 若传入的 roomId/pin 已失效或开启了 autoLatest，自动寻找最近创建的活跃房间
        if ((!targetRoomId || !roomManager.getRoom(targetRoomId)) && data?.autoLatest) {
          const allSummaries = roomManager.getAllRoomSummaries().filter(r => r.status !== 'closed');
          if (allSummaries.length > 0) {
            allSummaries.sort((a, b) => b.createdAt - a.createdAt);
            targetRoomId = allSummaries[0].roomId;
          }
        }

        if (!targetRoomId) throw new Error('未提供有效的 roomId 或 pin');

        const room = roomManager.getRoom(targetRoomId);
        if (!room) throw new Error(`房间不存在: ${targetRoomId}`);

        room.teacherSocketId = socket.id;
        await socket.join(targetRoomId);
        socket.data.roomId = targetRoomId;
        socket.data.role = 'teacher';

        const snapshot = roomManager.getRoomSnapshot(targetRoomId);
        const roster = roomManager.getRoomRoster(targetRoomId);

        if (typeof callback === 'function') {
          callback({ success: true, roomId: targetRoomId, pin: room.pin, roomData: snapshot, roster });
        }
      } catch (err) {
        if (typeof callback === 'function') {
          callback({ success: false, error: err.message });
        }
      }
    });

    /**
     * 7.2 教师大屏：一键均衡调配队伍 / 切换 2/3/4 队模式
     */
    socket.on('teacher_rebalance_teams', (data, callback) => {
      try {
        const roomId = data?.roomId || socket.data?.roomId;
        if (!roomId) throw new Error('缺少 roomId 参数');

        const room = roomManager.getRoom(roomId);
        if (!room) throw new Error('房间不存在');

        const { teams, reassignedStudents } = roomManager.rebalanceTeams(roomId, data?.teamMode);
        const roster = roomManager.getRoomRoster(roomId);

        io.to(roomId).emit('room_roster_update', roster);

        for (const s of reassignedStudents) {
          if (s.socketId) {
            io.to(s.socketId).emit('your_team_changed', {
              studentId: s.studentId,
              teamId: s.newTeamId,
              teamName: s.newTeamName,
              teamColor: s.newTeamColor,
              reason: 'teacher_rebalanced'
            });
          }
        }

        if (typeof callback === 'function') {
          callback({ success: true, teams, roster });
        }
      } catch (err) {
        if (typeof callback === 'function') {
          callback({ success: false, error: err.message });
        }
      }
    });

    /**
     * 7.3 教师大屏：同步大屏当前阶段状态（审题期、抢答期、揭晓统计、排行榜、重开）
     */
    socket.on('teacher_sync_stage', (data, callback) => {
      try {
        const roomId = data?.roomId || socket.data?.roomId;
        if (!roomId) throw new Error('缺少 roomId 参数');

        const room = roomManager.getRoom(roomId);
        if (room && room.sandboxState) {
          room.sandboxState.activeStage = data.state;
        }

        // 若老师大屏点击「再来一局」返回等待大厅，自动清零本局积分与答题流水
        if (data.state === 'lobby' && room) {
          const resetRoster = roomManager.resetRoomGame(roomId);
          io.to(roomId).emit('room_roster_update', resetRoster);
          io.to(roomId).emit('scoreboard_update', roomManager.getScoreboard(roomId));
        }

        const payload = {
          roomId,
          state: data.state,
          questionIndex: data.questionIndex,
          timeLeft: data.timeLeft,
          timestamp: Date.now()
        };

        io.to(roomId).emit('screen_stage_sync', payload);

        if (typeof callback === 'function') {
          callback({ success: true, payload });
        }
      } catch (err) {
        if (typeof callback === 'function') {
          callback({ success: false, error: err.message });
        }
      }
    });

    /**
     * 7.4 教师大屏：切换房间锁定状态（锁房后禁止新学生加入）
     */
    socket.on('teacher_toggle_lock_room', (data, callback) => {
      try {
        const roomId = data?.roomId || socket.data?.roomId;
        if (!roomId) throw new Error('缺少 roomId 参数');

        const room = roomManager.getRoom(roomId);
        if (!room) throw new Error('房间不存在');

        room.isLocked = data?.isLocked !== undefined ? Boolean(data.isLocked) : !room.isLocked;
        io.to(roomId).emit('room_lock_changed', { roomId, isLocked: room.isLocked });

        if (typeof callback === 'function') {
          callback({ success: true, isLocked: room.isLocked });
        }
      } catch (err) {
        if (typeof callback === 'function') {
          callback({ success: false, error: err.message });
        }
      }
    });

    /**
     * 7.5 学生等待大厅：请求切换至下一支队伍（同步给老师大屏与全房花名册）
     */
    socket.on('student_switch_team', (data, callback) => {
      try {
        const roomId = data?.roomId || socket.data?.roomId;
        const studentId = data?.studentId || socket.data?.studentId;
        if (!roomId || !studentId) throw new Error('缺少 roomId 或 studentId');

        const room = roomManager.getRoom(roomId);
        if (!room) throw new Error('房间不存在');

        const student = room.students.get(studentId);
        if (!student) throw new Error('学生不存在');

        const activeTeams = room.teams || [];
        if (activeTeams.length === 0) throw new Error('当前无可用队伍');

        let targetTeam = null;
        if (data?.targetTeamId) {
          targetTeam = activeTeams.find(t => t.id === data.targetTeamId);
        }
        if (!targetTeam) {
          const currIdx = activeTeams.findIndex(t => t.id === student.teamId);
          targetTeam = activeTeams[(currIdx + 1) % activeTeams.length];
        }

        roomManager.moveStudentTeam(roomId, studentId, targetTeam.id);
        const roster = roomManager.getRoomRoster(roomId);

        io.to(roomId).emit('room_roster_update', roster);
        socket.emit('your_team_changed', {
          studentId: student.studentId,
          teamId: targetTeam.id,
          teamName: targetTeam.name,
          teamColor: targetTeam.color,
          reason: 'student_switched'
        });

        if (typeof callback === 'function') {
          callback({ success: true, teamId: targetTeam.id, teamName: targetTeam.name, roster });
        }
      } catch (err) {
        if (typeof callback === 'function') {
          callback({ success: false, error: err.message });
        }
      }
    });

    // =========================================================================
    // 【第 3 步】：题目脱敏分发、答题提交、计分反馈与流水账本
    // =========================================================================

    /**
     * 8. 教师触发发题信令：安全物理脱敏分发
     */
    socket.on('teacher_push_question', (data, callback) => {
      try {
        const roomId = data?.roomId || socket.data?.roomId;
        if (!roomId) throw new Error('缺少必要参数: roomId');

        const room = roomManager.getRoom(roomId);
        if (!room) throw new Error(`房间不存在: ${roomId}`);

        if (room.teacherSocketId !== socket.id && socket.data?.role !== 'teacher') {
          throw new Error('权限不足：仅任课老师有权触发发题');
        }

        const questionIndex = Number(data.questionIndex ?? 0);
        const desensitizedQuestion = roomManager.getDesensitizedQuestion(roomId, questionIndex);

        room.status = 'in_game';

        io.to(roomId).emit('new_question', desensitizedQuestion);

        console.log(`[Socket] 房间 [${room.roomName}] 下发第 ${questionIndex + 1} 题: ID=${desensitizedQuestion.questionId} (安全脱敏无答案)`);

        const response = { success: true, question: desensitizedQuestion };
        if (typeof callback === 'function') callback(response);

      } catch (err) {
        console.error(`[Socket] 发题失败:`, err.message);
        const errorResponse = { success: false, error: err.message };
        if (typeof callback === 'function') callback(errorResponse);
        socket.emit('error', errorResponse);
      }
    });

    /**
     * 9. 学生答题提交：判分防刷、账本记录与个人即时反馈
     */
    socket.on('student_submit_answer', (data, callback) => {
      try {
        const roomId = data?.roomId || socket.data?.roomId;
        const studentId = socket.data?.studentId || data?.studentId;
        const { questionId, selectedOption } = data || {};

        if (!roomId) throw new Error('缺少必要参数: roomId');
        if (!studentId) throw new Error('学生身份未识别，请重新加入或重连');
        if (!questionId) throw new Error('缺少必要参数: questionId');
        if (selectedOption === undefined || selectedOption === null) {
          throw new Error('请选择您的答案选项');
        }

        const result = roomManager.submitStudentAnswer(roomId, {
          studentId,
          questionId,
          selectedOption
        });

        const feedback = {
          questionId,
          isCorrect: result.isCorrect,
          pointsEarned: result.pointsEarned,
          currentScore: result.currentScore
        };

        socket.emit('answer_feedback', feedback);

        if (typeof callback === 'function') {
          callback({ success: true, feedback });
        }

        const scoreboard = roomManager.getScoreboard(roomId);
        io.to(roomId).emit('scoreboard_update', scoreboard);

      } catch (err) {
        console.error(`[Socket] 提交答案失败 [${socket.id}]:`, err.message);
        const errorResponse = { success: false, error: err.message };
        if (typeof callback === 'function') callback(errorResponse);
        socket.emit('error', errorResponse);
      }
    });

    // =========================================================================
    // 【第 4 步】：教师触发结算、Kahoot 式颁奖典礼与全量错题复盘看板
    // =========================================================================

    /**
     * 10. 教师触发全房游戏结算信令
     * 接收参数：{ roomId }
     */
    socket.on('teacher_end_game', (data, callback) => {
      try {
        const roomId = data?.roomId || socket.data?.roomId;
        if (!roomId) throw new Error('缺少必要参数: roomId');

        const room = roomManager.getRoom(roomId);
        if (!room) throw new Error(`房间不存在: ${roomId}`);

        if (room.teacherSocketId !== socket.id && socket.data?.role !== 'teacher') {
          throw new Error('权限不足：仅任课老师有权结束并结算比赛');
        }

        // 调用沙箱聚合引擎计算结算数据
        const settlementData = roomManager.settleGame(roomId);

        // 向全房间广播结算载荷（包含领奖台、获胜队伍、全员成绩与错题对照）
        io.to(roomId).emit('game_settlement_data', settlementData);

        console.log(`[Socket] 房间 [${room.roomName}] 比赛结算广播已送达全房间所有成员`);

        const response = { success: true, settlementData };
        if (typeof callback === 'function') callback(response);

      } catch (err) {
        console.error(`[Socket] 结束游戏结算失败:`, err.message);
        const errorResponse = { success: false, error: err.message };
        if (typeof callback === 'function') callback(errorResponse);
        socket.emit('error', errorResponse);
      }
    });

    /**
     * 11. 查询结算数据（供新入场或重连客户端拉取已完成结算）
     * 接收参数：{ roomId }
     */
    socket.on('get_settlement_data', (data, callback) => {
      try {
        const roomId = data?.roomId || socket.data?.roomId;
        if (!roomId) throw new Error('缺少必要参数: roomId');

        let settlement = roomManager.getSettlementData(roomId);
        if (!settlement) {
          const room = roomManager.getRoom(roomId);
          if (room) {
            settlement = roomManager.settleGame(roomId);
          }
        }

        if (typeof callback === 'function') {
          if (settlement) {
            callback({ success: true, settlementData: settlement });
          } else {
            callback({ success: false, error: '未找到结算数据' });
          }
        }
      } catch (err) {
        if (typeof callback === 'function') {
          callback({ success: false, error: err.message });
        }
      }
    });

    /**
     * 12. 查询全量答题流水账本
     */
    socket.on('get_student_answer_logs', (data, callback) => {
      try {
        const roomId = data?.roomId || socket.data?.roomId;
        const studentId = data?.studentId || socket.data?.studentId;

        if (!roomId || !studentId) throw new Error('缺少必要参数: roomId 或 studentId');

        const logs = roomManager.getStudentAnswerLogs(roomId, studentId);
        if (!logs) throw new Error('未检索到答题记录');

        if (typeof callback === 'function') {
          callback({ success: true, data: logs });
        }
      } catch (err) {
        if (typeof callback === 'function') {
          callback({ success: false, error: err.message });
        }
      }
    });

    /**
     * 13. 查询实时积分排行榜速报
     */
    socket.on('get_scoreboard', (data, callback) => {
      try {
        const roomId = data?.roomId || socket.data?.roomId;
        if (!roomId) throw new Error('缺少 roomId 参数');

        const scoreboard = roomManager.getScoreboard(roomId);
        if (typeof callback === 'function') {
          callback({ success: !!scoreboard, scoreboard });
        }
      } catch (err) {
        if (typeof callback === 'function') {
          callback({ success: false, error: err.message });
        }
      }
    });

    /**
     * 14. 查询房间只读信息
     */
    socket.on('get_room_info', (data, callback) => {
      try {
        if (!data) throw new Error('参数为空');
        const { roomId, pin } = data;
        let snapshot = null;
        if (roomId) {
          snapshot = roomManager.getRoomSnapshot(roomId);
        } else if (pin) {
          snapshot = roomManager.getRoomByPin(pin);
        }

        if (typeof callback === 'function') {
          if (snapshot) {
            callback({ success: true, room: snapshot });
          } else {
            callback({ success: false, error: '未找到指定房间' });
          }
        }
      } catch (err) {
        if (typeof callback === 'function') {
          callback({ success: false, error: err.message });
        }
      }
    });

    /**
     * 15. 客户端断开连接处理
     */
    socket.on('disconnect', (reason) => {
      console.log(`[Socket] 客户端已断开: ${socket.id} (原因: ${reason})`);
      const { roomId, role, studentId } = socket.data || {};

      if (role === 'teacher' && roomId) {
        console.log(`[Socket] 老师临时离线: 房间 ${roomId} 仍受沙箱保护保持待命`);
        io.to(roomId).emit('teacher_status_change', {
          roomId,
          online: false,
          timestamp: Date.now()
        });
      } else if (role === 'student' && roomId) {
        console.log(`[Socket] 学生离线: studentId=${studentId} (房间 ${roomId})`);
      }
    });

    /**
     * 16. 异常错误处理兜底
     */
    socket.on('error', (err) => {
      console.error(`[Socket] Socket 自身错误 [${socket.id}]:`, err);
    });
  });
}
