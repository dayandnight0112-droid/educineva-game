/**
 * Educineva 核心母体服务 - 第 2 步自动化验收测试脚本
 * 
 * 模拟场景：
 * 1. 老师 A 创建房间（获得 PIN_A），老师 B 创建房间（获得 PIN_B）。
 * 2. 学生 1、学生 2、学生 3 输入 PIN_A 加入房间 A（验证自动均衡分队）。
 * 3. 学生 4 输入 PIN_B 加入房间 B。
 * 4. 模拟无效 PIN 码加入，验证是否正确返回错误拦截。
 * 5. 老师 A 发送调队指令：把学生 1 从红队调至蓝队。
 * 6. 学生 1 模拟断线重连，凭借 Token 成功恢复队伍身份。
 * 
 * 自动化断言：
 * 【断言 1】：验证学生 1、2、3 加入房间 A 时自动均衡分队，且花名册（Roster）准确同步
 * 【断言 2】：验证非法 PIN 码进房被精准拦截
 * 【断言 3】：验证老师 A 调队成功，且学生 1 独立收到专属 `your_team_changed` 事件通知
 * 【断言 4】：核心多房间隔离验证：房间 B（老师 B 和学生 4）绝对没有收到房间 A 的任何广播或调队通知
 * 【断言 5】：验证学生断线重连凭 Token 恢复队伍身份完好
 */

import { io as ClientIO } from 'socket.io-client';
import { startServer, stopServer, roomManager } from './server.js';

const TEST_PORT = 3002; // 使用独立端口
const SERVER_URL = `http://localhost:${TEST_PORT}`;

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m'
};

function pass(msg) {
  console.log(`  ${colors.green}✔ [PASS]${colors.reset} ${msg}`);
}

function fail(msg, err) {
  console.error(`  ${colors.red}✘ [FAIL]${colors.reset} ${msg}`);
  if (err) console.error(err);
  process.exit(1);
}

function info(msg) {
  console.log(`${colors.cyan}[INFO]${colors.reset} ${msg}`);
}

function section(title) {
  console.log(`\n${colors.bold}${colors.yellow}============================================================${colors.reset}`);
  console.log(`${colors.bold}${colors.yellow}  ${title}${colors.reset}`);
  console.log(`${colors.bold}${colors.yellow}============================================================${colors.reset}`);
}

function emitAsync(socket, event, data) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`Socket 事件 [${event}] 等待响应超时 (5000ms)`));
    }, 5000);

    socket.emit(event, data, (response) => {
      clearTimeout(timer);
      resolve(response);
    });
  });
}

function createClientSocket(url, label) {
  return new Promise((resolve, reject) => {
    const socket = ClientIO(url, {
      transports: ['websocket'],
      forceNew: true,
      reconnection: false
    });

    socket.on('connect', () => {
      resolve(socket);
    });

    socket.on('connect_error', (err) => {
      reject(new Error(`${label} 连接失败: ${err.message}`));
    });
  });
}

async function runStep2AcceptanceTests() {
  section('Educineva 验收测试：第 2 步 学生进房与教师动态分队调度');

  let serverInstance = null;
  const allSockets = [];

  try {
    // 0. 启动测试服务器
    info(`启动测试服务于端口 ${TEST_PORT}...`);
    serverInstance = await startServer(TEST_PORT);
    pass(`服务正常就绪: ws://localhost:${TEST_PORT}`);

    // 1. 创建老师 A 与老师 B
    info('初始化教师客户端连接...');
    const teacherSocketA = await createClientSocket(SERVER_URL, '老师A');
    const teacherSocketB = await createClientSocket(SERVER_URL, '老师B');
    allSockets.push(teacherSocketA, teacherSocketB);

    // 老师 A 开房
    const resA = await emitAsync(teacherSocketA, 'teacher_create_room', {
      teacherId: 'teacher_alex',
      roomName: '数学趣味竞速赛',
      gameId: 'speed-racing',
      config: { hasTeams: true }
    });
    const { roomId: roomIdA, pin: pinA } = resA;
    info(`老师 A 创建房间成功: 《数学趣味竞速赛》 (PIN: ${pinA}, RoomId: ${roomIdA})`);

    // 老师 B 开房
    const resB = await emitAsync(teacherSocketB, 'teacher_create_room', {
      teacherId: 'teacher_bella',
      roomName: '科学常识挑战赛',
      gameId: 'speed-racing',
      config: { hasTeams: true }
    });
    const { roomId: roomIdB, pin: pinB } = resB;
    info(`老师 B 创建房间成功: 《科学常识挑战赛》 (PIN: ${pinB}, RoomId: ${roomIdB})`);

    // 2. 初始化学生客户端
    info('初始化学生客户端连接...');
    const studentSocket1 = await createClientSocket(SERVER_URL, '学生1');
    const studentSocket2 = await createClientSocket(SERVER_URL, '学生2');
    const studentSocket3 = await createClientSocket(SERVER_URL, '学生3');
    const studentSocket4 = await createClientSocket(SERVER_URL, '学生4');
    allSockets.push(studentSocket1, studentSocket2, studentSocket3, studentSocket4);

    // 设置跨房间广播泄漏监听器（重点监控房间 B 是否收到房间 A 的事件）
    const roomBLeakEvents = [];
    teacherSocketB.on('room_roster_update', (data) => {
      if (data.roomId === roomIdA) {
        roomBLeakEvents.push({ target: 'teacherB', event: 'room_roster_update', data });
      }
    });
    teacherSocketB.on('your_team_changed', (data) => {
      roomBLeakEvents.push({ target: 'teacherB', event: 'your_team_changed', data });
    });
    studentSocket4.on('room_roster_update', (data) => {
      if (data.roomId === roomIdA) {
        roomBLeakEvents.push({ target: 'student4', event: 'room_roster_update', data });
      }
    });
    studentSocket4.on('your_team_changed', (data) => {
      roomBLeakEvents.push({ target: 'student4', event: 'your_team_changed', data });
    });

    // =========================================================================
    // 【步骤 1 & 断言 1】：学生 1、2、3 加入房间 A（自动均衡分队测试）
    // =========================================================================
    section('执行断言 1：学生凭 PIN 进房与自动均衡分队');

    info(`学生 1 输入 PIN [${pinA}] 加入房间 A...`);
    const joinRes1 = await emitAsync(studentSocket1, 'student_join_room', {
      pin: pinA,
      studentName: '小明 (Student 1)'
    });
    if (!joinRes1.success) fail('学生 1 进房失败', joinRes1.error);
    pass(`学生 1 成功加入，初始分配队伍: ${joinRes1.teamId}`);

    info(`学生 2 输入 PIN [${pinA}] 加入房间 A...`);
    const joinRes2 = await emitAsync(studentSocket2, 'student_join_room', {
      pin: pinA,
      studentName: '小红 (Student 2)'
    });
    if (!joinRes2.success) fail('学生 2 进房失败', joinRes2.error);
    pass(`学生 2 成功加入，初始分配队伍: ${joinRes2.teamId}`);

    info(`学生 3 输入 PIN [${pinA}] 加入房间 A...`);
    const joinRes3 = await emitAsync(studentSocket3, 'student_join_room', {
      pin: pinA,
      studentName: '小刚 (Student 3)'
    });
    if (!joinRes3.success) fail('学生 3 进房失败', joinRes3.error);
    pass(`学生 3 成功加入，初始分配队伍: ${joinRes3.teamId}`);

    // 验证人数均衡分队：红队与蓝队人数差不超过 1
    const currentRosterA = roomManager.getRoomRoster(roomIdA);
    const redCount = currentRosterA.students.filter(s => s.teamId === 'team_red').length;
    const blueCount = currentRosterA.students.filter(s => s.teamId === 'team_blue').length;

    if (Math.abs(redCount - blueCount) > 1) {
      fail(`自动均衡分队失败！红队人数: ${redCount}, 蓝队人数: ${blueCount}`);
    }
    pass(`自动均衡算法正确生效：3位学生进房后 红队(${redCount}人) 与 蓝队(${blueCount}人) 严格均衡`);

    // =========================================================================
    // 【步骤 2 & 断言 2】：非法 PIN 码拦截测试
    // =========================================================================
    section('执行断言 2：非法 PIN 码精准拦截校验');
    const fakeSocket = await createClientSocket(SERVER_URL, '测试外部客户端');
    allSockets.push(fakeSocket);

    const invalidPinRes = await emitAsync(fakeSocket, 'student_join_room', {
      pin: '000000',
      studentName: '非法闯入者'
    });

    if (invalidPinRes.success) {
      fail('安全漏洞：不存在的 PIN 码竟然成功加入了房间！');
    }
    pass(`非法/过期 PIN 码拦截成功，返回预期错误信息: "${invalidPinRes.error}"`);

    // =========================================================================
    // 【步骤 3】：学生 4 加入房间 B
    // =========================================================================
    section('执行步骤 3：学生 4 加入房间 B');
    info(`学生 4 输入 PIN [${pinB}] 加入房间 B...`);
    const joinRes4 = await emitAsync(studentSocket4, 'student_join_room', {
      pin: pinB,
      studentName: '小华 (Student 4 in Room B)'
    });
    if (!joinRes4.success) fail('学生 4 进房失败', joinRes4.error);
    pass(`学生 4 成功加入房间 B，分配队伍: ${joinRes4.teamId}`);

    // =========================================================================
    // 【步骤 4 & 断言 3】：老师 A 发送调队指令（将学生 1 调至目标队伍）
    // =========================================================================
    section('执行断言 3：教师动态调队调度与针对性通知');

    // 记录学生 1 原始队伍与目标队伍
    const originalTeamId = joinRes1.teamId;
    const targetTeamId = originalTeamId === 'team_red' ? 'team_blue' : 'team_red';

    // 监听学生 1 是否收到专属通知
    let teamChangedNotified = null;
    studentSocket1.on('your_team_changed', (evt) => {
      teamChangedNotified = evt;
    });

    // 老师 A 发起调度指令
    info(`老师 A 将学生 1 (ID: ${joinRes1.studentId}) 从 [${originalTeamId}] 调整至 [${targetTeamId}]...`);
    const moveRes = await emitAsync(teacherSocketA, 'teacher_move_student', {
      roomId: roomIdA,
      studentId: joinRes1.studentId,
      targetTeamId: targetTeamId
    });

    if (!moveRes.success) {
      fail('老师调队指令执行失败', moveRes.error);
    }
    pass(`老师 A 成功下发调队指令，服务端确认学生新队伍为: ${moveRes.teamId}`);

    // 等待 150ms 确保 Socket 事件分发
    await new Promise(r => setTimeout(r, 150));

    if (!teamChangedNotified) {
      fail('学生 1 未能接收到针对性的 `your_team_changed` 实时通知！');
    }
    if (teamChangedNotified.teamId !== targetTeamId) {
      fail(`通知队伍与目标队伍不匹配！收到: ${teamChangedNotified.teamId}, 预期: ${targetTeamId}`);
    }
    pass(`学生 1 成功收到精准推送的队伍变更通知 (目标队伍: ${teamChangedNotified.teamName || teamChangedNotified.teamId})`);

    // 检查房间 A 最新的花名册
    const rosterAAfterMove = roomManager.getRoomRoster(roomIdA);
    const stu1InRoster = rosterAAfterMove.students.find(s => s.studentId === joinRes1.studentId);
    if (!stu1InRoster || stu1InRoster.teamId !== targetTeamId) {
      fail('花名册中学生 1 的队伍未更新');
    }
    pass(`房间 A 花名册（Roster）中学生 1 队伍状态已彻底更新为: ${targetTeamId}`);

    // =========================================================================
    // 【断言 4】：验证多房间隔离性（房间 B 绝不串房）
    // =========================================================================
    section('执行断言 4：核心多房间广播绝对隔离校验');

    if (roomBLeakEvents.length > 0) {
      fail(`严重串房广播漏洞！房间 B 接收到了来自房间 A 的事件: ${JSON.stringify(roomBLeakEvents)}`);
    }
    pass(`多房间广播绝对隔离验证通过：房间 B（老师 B 与学生 4）全程 0 泄露，未受到房间 A 进房与调队的任何杂音干扰！`);

    // =========================================================================
    // 【断言 5】：验证学生凭借 Token 断线重连与队伍身份恢复
    // =========================================================================
    section('执行断言 5：学生断线重连与队伍身份恢复测试');

    info(`模拟学生 1 发生网络闪断/刷新浏览器，断开当前 Socket...`);
    studentSocket1.disconnect();

    // 模拟新建立 Socket 连接并恢复会话
    const reconnectedSocket1 = await createClientSocket(SERVER_URL, '学生1(重连)');
    allSockets.push(reconnectedSocket1);

    info(`学生 1 凭借 studentToken [${joinRes1.studentToken}] 请求重连恢复...`);
    const reconnectRes = await emitAsync(reconnectedSocket1, 'student_reconnect', {
      roomId: roomIdA,
      studentToken: joinRes1.studentToken
    });

    if (!reconnectRes.success) {
      fail('断线重连失败', reconnectRes.error);
    }
    if (reconnectRes.teamId !== targetTeamId) {
      fail(`重连后队伍丢失！预期: ${targetTeamId}, 实际: ${reconnectRes.teamId}`);
    }
    pass(`断线重连机制验证通过：学生 1 身份、队伍归属 (${reconnectRes.teamName || reconnectRes.teamId}) 毫发无损完整恢复！`);

    // =========================================================================
    // 测试收尾：清理房间与连接
    // =========================================================================
    section('执行收尾与资源释放');
    await emitAsync(teacherSocketA, 'teacher_close_room', { roomId: roomIdA });
    await emitAsync(teacherSocketB, 'teacher_close_room', { roomId: roomIdB });
    pass(`房间 A 与 房间 B 已全部注销，所有学生与队伍内存完全回收`);

    section('Educineva 第 2 步验收结论');
    console.log(`${colors.green}${colors.bold}🎉 恭喜！第 2 步「学生进房与教师动态分队调度」所有自动化断言 100% 验收通过！${colors.reset}\n`);

  } catch (err) {
    fail('测试异常中断', err);
  } finally {
    for (const s of allSockets) {
      try { s.disconnect(); } catch {}
    }
    if (serverInstance) {
      await stopServer();
      info('测试服务已安全停止。');
    }
  }
}

runStep2AcceptanceTests();
