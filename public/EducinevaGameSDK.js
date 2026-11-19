/**
 * Educineva 通用子游戏即插即用 SDK (EducinevaGameSDK)
 * 
 * 适用于赛车、投篮、拔河等所有独立接入的单体互动教学小游戏。
 * 
 * 核心功能：
 * 1. 自动从 URL 参数自解析握手信息 (?roomId=...&role=...&studentId=...&token=...&pin=...)
 * 2. 规范化生命周期事件订阅 (onConfig, onQuestion, onScoreChange, onSettlement 等)
 * 3. 规范化向母体上报信令 (submitAnswer, nextQuestion, endGame)
 * 4. 支持双玩法模式：
 *    - 模式 A：大屏赛况展示 (role='screen' / 'teacher') + 手机答题手柄 (role='student')
 *    - 模式 B：个人独立单机/终端运行 (同一界面内展示赛况并自带答题卡)
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    const SDK = factory();
    root.EducinevaGameSDK = SDK;
    root.EducinevaSDK = SDK; // 简写别名
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  class GameSDK {
    constructor() {
      this.socket = null;
      this.connected = false;
      this.roomId = null;
      this.role = 'student'; // 'teacher' | 'screen' | 'student'
      this.studentId = null;
      this.token = null;
      this.studentName = null;
      this.pin = null;
      this.roomData = null;
      this.currentQuestion = null;
      this.currentQuestionIndex = -1;

      // 注册的回调事件池
      this._handlers = {
        config: [],
        question: [],
        scoreChange: [],
        settlement: [],
        teamChanged: [],
        rosterUpdate: [],
        answerFeedback: [],
        error: []
      };

      // 自动解析当前页面 URL 参数
      this._parseUrlParams();
    }

    /**
     * 解析浏览器地址栏中的参数
     */
    _parseUrlParams() {
      if (typeof window === 'undefined' || !window.location) return;
      const params = new URLSearchParams(window.location.search);
      if (params.get('roomId')) this.roomId = params.get('roomId');
      if (params.get('role')) this.role = params.get('role');
      if (params.get('studentId')) this.studentId = params.get('studentId');
      if (params.get('token')) this.token = params.get('token');
      if (params.get('pin')) this.pin = params.get('pin');
      if (params.get('name')) this.studentName = params.get('name');
    }

    /**
     * 建立与 Educineva 母体 Socket 服务的连接
     * @param {Object} options 
     * @param {string} [options.serverUrl] 母体服务地址，默认自动获取当前 window.location.origin
     * @param {string} [options.roomId] 
     * @param {string} [options.role] 角色：'teacher' | 'screen' | 'student'
     * @param {string} [options.token] 断线重连学生 Token
     * @param {string} [options.pin] 6 位房间 PIN 码（学生凭 PIN 进房）
     * @param {string} [options.studentName] 学生姓名
     */
    connect(options = {}) {
      return new Promise((resolve, reject) => {
        // 合并配置参数
        this.roomId = options.roomId || this.roomId;
        this.role = options.role || this.role || 'student';
        this.studentId = options.studentId || this.studentId;
        this.token = options.token || this.token;
        this.pin = options.pin || this.pin;
        this.studentName = options.studentName || this.studentName || '参赛学员';

        const serverUrl = options.serverUrl || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');

        console.log(`[EducinevaSDK] 正在连接母体调度系统: ${serverUrl} (Role: ${this.role}, Room: ${this.roomId || '待寻址'})`);

        // 检查全局 Socket.io 是否可用
        const ioInstance = (typeof io !== 'undefined') 
          ? io 
          : (typeof window !== 'undefined' && window.io) 
            ? window.io 
            : null;

        if (!ioInstance) {
          const err = new Error('[EducinevaSDK] 未检测到 socket.io-client 依赖库，请确保页面已引入 /socket.io/socket.io.js');
          this._emit('error', err);
          return reject(err);
        }

        this.socket = ioInstance(serverUrl, {
          transports: ['websocket', 'polling'],
          reconnection: true,
          reconnectionAttempts: 5
        });

        this.socket.on('connect', () => {
          this.connected = true;
          console.log(`[EducinevaSDK] 已安全接入母体 Socket 核心 (SocketID: ${this.socket.id})`);

          // 自动根据身份执行进房握手
          this._performHandshake().then(resolve).catch(reject);
        });

        this.socket.on('connect_error', (err) => {
          console.error('[EducinevaSDK] 网络连接异常:', err.message);
          this._emit('error', err);
          reject(err);
        });

        this.socket.on('disconnect', (reason) => {
          this.connected = false;
          console.warn('[EducinevaSDK] 与母体中枢连接断开:', reason);
        });

        // 注册核心母体下行事件监听
        this._bindSocketEvents();
      });
    }

    /**
     * 内部握手协议调度
     */
    _performHandshake() {
      return new Promise((resolve) => {
        // 场景 1：如果学生携带 token 和 roomId，自动执行断线重连恢复
        if (this.role === 'student' && this.roomId && this.token) {
          this.socket.emit('student_reconnect', {
            roomId: this.roomId,
            studentToken: this.token
          }, (res) => {
            if (res && res.success) {
              console.log('[EducinevaSDK] 学生 Token 重连握手成功:', res);
              this.studentId = res.studentId;
              this._emit('config', res);
            }
            resolve(res);
          });
          return;
        }

        // 场景 2：学生携带 PIN 码加入
        if (this.role === 'student' && this.pin) {
          this.socket.emit('student_join_room', {
            pin: this.pin,
            studentName: this.studentName
          }, (res) => {
            if (res && res.success) {
              this.roomId = res.roomId;
              this.studentId = res.studentId;
              this.token = res.studentToken;
              console.log('[EducinevaSDK] 学生凭借 PIN 进房就绪:', res);
              this._emit('config', res);
            }
            resolve(res);
          });
          return;
        }

        // 场景 3：大屏/教师视角直接加入房间频道
        if (this.roomId) {
          this.socket.emit('get_room_info', { roomId: this.roomId }, (res) => {
            if (res && res.success) {
              this.roomData = res.room;
              this._emit('config', res.room);
            }
            resolve(res);
          });
          return;
        }

        resolve({ success: true, message: '未指定房间，等待主动指令' });
      });
    }

    /**
     * 绑定母体核心信令广播
     */
    _bindSocketEvents() {
      // 1. 题目分发信令（已物理脱敏）
      this.socket.on('new_question', (questionData) => {
        this.currentQuestion = questionData;
        this.currentQuestionIndex = questionData.index;
        console.log(`[EducinevaSDK] 收到新题目广播: 第 ${questionData.index + 1}/${questionData.total} 题 [${questionData.questionId}]`);
        this._emit('question', questionData);
      });

      // 2. 实时比分/排行榜广播（触发小游戏动画如赛车加速、拔河推进）
      this.socket.on('scoreboard_update', (scoreboard) => {
        this._emit('scoreChange', scoreboard);
      });

      // 3. 个人答题即时反馈（针对作答学生）
      this.socket.on('answer_feedback', (feedback) => {
        this._emit('answerFeedback', feedback);
      });

      // 4. 终局结算颁奖广播
      this.socket.on('game_settlement_data', (settlementData) => {
        console.log('[EducinevaSDK] 收到终局结算颁奖数据:', settlementData);
        this._emit('settlement', settlementData);
      });

      // 5. 教师调队提醒
      this.socket.on('your_team_changed', (teamInfo) => {
        console.log('[EducinevaSDK] 收到教师调队提醒:', teamInfo);
        this._emit('teamChanged', teamInfo);
      });

      // 6. 等待大厅花名册同步
      this.socket.on('room_roster_update', (roster) => {
        this._emit('rosterUpdate', roster);
      });
    }

    // =========================================================================
    // 标准对外事件订阅 API
    // =========================================================================

    /**
     * 接收房间基础配置（队伍列表、模式、时长等）
     */
    onConfig(callback) {
      this._handlers.config.push(callback);
      return this;
    }

    /**
     * 接收题目广播（安全的脱敏题干、选项字典或列表）
     */
    onQuestion(callback) {
      this._handlers.question.push(callback);
      return this;
    }

    /**
     * 接收比分变动（用于小游戏内驱动赛车移动、积分条推进）
     */
    onScoreChange(callback) {
      this._handlers.scoreChange.push(callback);
      return this;
    }

    /**
     * 接收结算颁奖典礼数据（领奖台、冠军队伍、全员错题对比）
     */
    onSettlement(callback) {
      this._handlers.settlement.push(callback);
      return this;
    }

    /**
     * 接收队伍变更提醒
     */
    onTeamChanged(callback) {
      this._handlers.teamChanged.push(callback);
      return this;
    }

    /**
     * 接收等待大厅花名册变动
     */
    onRosterUpdate(callback) {
      this._handlers.rosterUpdate.push(callback);
      return this;
    }

    /**
     * 接收单题判分反馈
     */
    onAnswerFeedback(callback) {
      this._handlers.answerFeedback.push(callback);
      return this;
    }

    /**
     * 监听异常错误
     */
    onError(callback) {
      this._handlers.error.push(callback);
      return this;
    }

    // =========================================================================
    // 标准对外信令上报 API
    // =========================================================================

    /**
     * 学生端提交答案
     * @param {string} questionId 题目 ID
     * @param {string} selectedOption 选项（如 'A', 'B' 等）
     * @returns {Promise<Object>}
     */
    submitAnswer(questionId, selectedOption) {
      return new Promise((resolve, reject) => {
        if (!this.socket || !this.connected) {
          return reject(new Error('未连接至母体服务'));
        }
        if (!this.roomId) {
          return reject(new Error('未关联有效房间'));
        }

        const payload = {
          roomId: this.roomId,
          studentId: this.studentId,
          questionId: questionId || this.currentQuestion?.questionId,
          selectedOption
        };

        this.socket.emit('student_submit_answer', payload, (res) => {
          if (res && res.success) {
            resolve(res.feedback);
          } else {
            reject(new Error(res?.error || '提交答案失败'));
          }
        });
      });
    }

    /**
     * 老师/大屏端推进下一题
     * @param {number} [targetIndex] 目标题目索引，不传则自动自增
     */
    nextQuestion(targetIndex) {
      return new Promise((resolve, reject) => {
        if (!this.socket || !this.connected) return reject(new Error('未连接'));
        const nextIdx = targetIndex !== undefined ? targetIndex : (this.currentQuestionIndex + 1);

        this.socket.emit('teacher_push_question', {
          roomId: this.roomId,
          questionIndex: nextIdx
        }, (res) => {
          if (res && res.success) resolve(res.question);
          else reject(new Error(res?.error || '下发题目失败'));
        });
      });
    }

    /**
     * 教师/大屏端结束游戏并触发结算
     */
    endGame() {
      return new Promise((resolve, reject) => {
        if (!this.socket || !this.connected) return reject(new Error('未连接'));
        this.socket.emit('teacher_end_game', { roomId: this.roomId }, (res) => {
          if (res && res.success) resolve(res.settlementData);
          else reject(new Error(res?.error || '结束比赛失败'));
        });
      });
    }

    // =========================================================================
    // 内部事件派发
    // =========================================================================
    _emit(event, data) {
      const list = this._handlers[event] || [];
      for (const fn of list) {
        try {
          fn(data);
        } catch (e) {
          console.error(`[EducinevaSDK] 消费事件 [${event}] 发生内部异常:`, e);
        }
      }
    }
  }

  // 导出单例实例
  return new GameSDK();
}));
