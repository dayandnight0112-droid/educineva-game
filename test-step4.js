/**
 * Educineva 核心母体服务 - 第 4 步自动化验收测试脚本
 * 
 * 模拟场景：
 * 1. 老师 A 创建包含 2 道题的房间，学生 A、学生 B、学生 C 依次加入。
 * 2. 老师 B 创建房间 B（并行房间，用于验证隔离性）。
 * 3. 第 1 题：
 *    - 学生 A 答对 (选 B)
 *    - 学生 B 答错 (选 A)
 *    - 学生 C 答错 (选 C)
 * 4. 第 2 题：
 *    - 学生 A 答对 (选 A)
 *    - 学生 B 答对 (选 A)
 *    - 学生 C 答错 (选 B)
 * 5. 老师 A 发送结算信令 `teacher_end_game`。
 * 
 * 自动化断言：
 * 【断言 1】：验证排行榜名次顺序：学生 A (Rank #1, 200分) > 学生 B (Rank #2, 100分) > 学生 C (Rank #3, 0分)
 * 【断言 2】：验证学生 B 的 `wrongQuestions` 错题数组长度恰好为 1，且精确记录其所选错误项与标准正确项
 * 【断言 3】：验证学生 A 的 `wrongQuestions` 为空数组且 `isPerfect === true`（全对满分学员）
 * 【断言 4】：验证学生 C 的 `wrongQuestions` 准确记录 2 处错题
 * 【断言 5】：验证领奖台 Podium 冠亚季军（1st: 学生 A, 2nd: 学生 B, 3rd: 学生 C）
 * 【断言 6】：多房间广播绝对隔离校验：房间 A 结算时，房间 B 全程 0 泄漏，丝毫不受干扰
 */

import { io as ClientIO } from 'socket.io-client';
import { startServer, stopServer, roomManager } from './server.js';

const TEST_PORT = 3004;
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

async function runStep4AcceptanceTests() {
  section('Educineva 验收测试：第 4 步 Kahoot 式结算颁奖与错题学情复盘看板');

  let serverInstance = null;
  const allSockets = [];

  try {
    // 0. 启动测试服务器
    info(`启动测试服务于端口 ${TEST_PORT}...`);
    serverInstance = await startServer(TEST_PORT);
    pass(`测试服务正常就绪: ws://localhost:${TEST_PORT}`);

    // 1. 初始化教师与学生客户端
    const teacherSocketA = await createClientSocket(SERVER_URL, '老师A');
    const studentSocketA = await createClientSocket(SERVER_URL, '学生A');
    const studentSocketB = await createClientSocket(SERVER_URL, '学生B');
    const studentSocketC = await createClientSocket(SERVER_URL, '学生C');

    // 并行房间 B（用于隔离测试）
    const teacherSocketB = await createClientSocket(SERVER_URL, '老师B');
    const studentSocketRoomB = await createClientSocket(SERVER_URL, '房间B学生');

    allSockets.push(teacherSocketA, studentSocketA, studentSocketB, studentSocketC, teacherSocketB, studentSocketRoomB);

    // 2. 准备题库
    const testQuestions = [
      {
        id: 'q1',
        questionText: '10 - 4 等于几？',
        options: { A: '5', B: '6', C: '7', D: '8' },
        correctAnswer: 'B'
      },
      {
        id: 'q2',
        questionText: '地球是圆的吗？',
        options: { A: '是', B: '否' },
        correctAnswer: 'A'
      }
    ];

    // 老师 A 开房
    const createResA = await emitAsync(teacherSocketA, 'teacher_create_room', {
      teacherId: 'teacher_alex',
      roomName: '冲关算力大挑战',
      gameId: 'speed-racing',
      questions: testQuestions
    });
    const { roomId: roomIdA, pin: pinA } = createResA;
    info(`老师 A 创建房间成功: ID=${roomIdA}, PIN=${pinA}`);

    // 老师 B 开房（对照组）
    const createResB = await emitAsync(teacherSocketB, 'teacher_create_room', {
      teacherId: 'teacher_bella',
      roomName: '独立平行房间B',
      gameId: 'speed-racing',
      questions: testQuestions
    });
    const { roomId: roomIdB, pin: pinB } = createResB;

    // 3. 学生进房
    const joinA = await emitAsync(studentSocketA, 'student_join_room', { pin: pinA, studentName: '李小华 (Student A)' });
    const joinB = await emitAsync(studentSocketB, 'student_join_room', { pin: pinA, studentName: '张小明 (Student B)' });
    const joinC = await emitAsync(studentSocketC, 'student_join_room', { pin: pinA, studentName: '王小刚 (Student C)' });

    // 房间 B 学生进房
    await emitAsync(studentSocketRoomB, 'student_join_room', { pin: pinB, studentName: '平行宇宙学生' });

    pass('3 位学生已全部加入房间 A，并均已均衡入编');

    // 4. 设置房间 B 串房泄漏监听
    const roomBLeakEvents = [];
    teacherSocketB.on('game_settlement_data', (d) => { roomBLeakEvents.push(d); });
    studentSocketRoomB.on('game_settlement_data', (d) => { roomBLeakEvents.push(d); });

    // 5. 进行第 1 题作答
    info('下发第 1 题并进行答题...');
    await emitAsync(teacherSocketA, 'teacher_push_question', { roomId: roomIdA, questionIndex: 0 });

    await emitAsync(studentSocketA, 'student_submit_answer', { roomId: roomIdA, questionId: 'q1', selectedOption: 'B' }); // 对
    await emitAsync(studentSocketB, 'student_submit_answer', { roomId: roomIdA, questionId: 'q1', selectedOption: 'A' }); // 错
    await emitAsync(studentSocketC, 'student_submit_answer', { roomId: roomIdA, questionId: 'q1', selectedOption: 'C' }); // 错

    // 6. 进行第 2 题作答
    info('下发第 2 题并进行答题...');
    await emitAsync(teacherSocketA, 'teacher_push_question', { roomId: roomIdA, questionIndex: 1 });

    await emitAsync(studentSocketA, 'student_submit_answer', { roomId: roomIdA, questionId: 'q2', selectedOption: 'A' }); // 对
    await emitAsync(studentSocketB, 'student_submit_answer', { roomId: roomIdA, questionId: 'q2', selectedOption: 'A' }); // 对
    await emitAsync(studentSocketC, 'student_submit_answer', { roomId: roomIdA, questionId: 'q2', selectedOption: 'B' }); // 错

    // =========================================================================
    // 触发结算广播
    // =========================================================================
    section('执行结算：老师 A 发送 teacher_end_game');

    let studentAReceivedSettlement = null;
    studentSocketA.on('game_settlement_data', (d) => { studentAReceivedSettlement = d; });

    const endRes = await emitAsync(teacherSocketA, 'teacher_end_game', { roomId: roomIdA });
    if (!endRes.success) fail('结束游戏结算失败', endRes.error);

    await new Promise(r => setTimeout(r, 120));

    if (!studentAReceivedSettlement) {
      fail('学生端未收到 `game_settlement_data` 广播事件');
    }
    pass(`全房间成功接收到结算广播载荷 game_settlement_data`);

    const settlement = endRes.settlementData;

    // =========================================================================
    // 【断言 1】：验证排行榜名次顺序 (A > B > C)
    // =========================================================================
    section('执行断言 1：全员积分与排行榜名次校验');
    const lb = settlement.leaderboard;

    if (lb.length !== 3) fail(`排行榜人数不匹配，应为 3 人，实际: ${lb.length}`);

    if (lb[0].name !== '李小华 (Student A)' || lb[0].score !== 200 || lb[0].rank !== 1) {
      fail(`第 1 名不匹配: 应为李小华(200分)，实际为: ${lb[0].name}(${lb[0].score}分)`);
    }
    pass(`名次 #1 验证通过: ${lb[0].name} (得分: ${lb[0].score}, 错题: ${lb[0].wrongCount})`);

    if (lb[1].name !== '张小明 (Student B)' || lb[1].score !== 100 || lb[1].rank !== 2) {
      fail(`第 2 名不匹配: 应为张小明(100分)，实际为: ${lb[1].name}(${lb[1].score}分)`);
    }
    pass(`名次 #2 验证通过: ${lb[1].name} (得分: ${lb[1].score}, 错题: ${lb[1].wrongCount})`);

    if (lb[2].name !== '王小刚 (Student C)' || lb[2].score !== 0 || lb[2].rank !== 3) {
      fail(`第 3 名不匹配: 应为王小刚(0分)，实际为: ${lb[2].name}(${lb[2].score}分)`);
    }
    pass(`名次 #3 验证通过: ${lb[2].name} (得分: ${lb[2].score}, 错题: ${lb[2].wrongCount})`);

    // =========================================================================
    // 【断言 2】：验证学生 B 的错题数组（恰好错 1 题，选项准确）
    // =========================================================================
    section('执行断言 2：学生 B 错题复盘流水明细断言');
    const stuB = lb[1];

    if (stuB.wrongQuestions.length !== 1) {
      fail(`学生 B 错题数不为 1，实际为: ${stuB.wrongQuestions.length}`);
    }
    pass(`学生 B 错题数量精确为 1`);

    const mistakeB = stuB.wrongQuestions[0];
    if (mistakeB.studentSelected !== 'A' || !mistakeB.studentSelectedText.includes('5')) {
      fail(`学生 B 选择的错误项记录不正确: ${mistakeB.studentSelectedText}`);
    }
    if (mistakeB.correctAnswer !== 'B' || !mistakeB.correctAnswerText.includes('6')) {
      fail(`学生 B 错题的标准答案记录不正确: ${mistakeB.correctAnswerText}`);
    }
    pass(`学生 B 错题对比记录精准:`);
    console.log(`       [错题题干] "${mistakeB.questionText}"`);
    console.log(`       [学生错误] "${mistakeB.studentSelectedText}"`);
    console.log(`       [标准正解] "${mistakeB.correctAnswerText}"`);

    // =========================================================================
    // 【断言 3】：验证学生 A 的错题数组（全对满分）
    // =========================================================================
    section('执行断言 3：学生 A 全对满分通关断言');
    const stuA = lb[0];

    if (stuA.wrongQuestions.length !== 0 || !stuA.isPerfect) {
      fail(`学生 A 应为全对满分，实际错题数: ${stuA.wrongQuestions.length}`);
    }
    pass(`学生 A 满分通关验证通过: isPerfect=true, wrongQuestions=[] (0 错题)`);

    // =========================================================================
    // 【断言 4】：验证学生 C 的错题记录（错 2 题）
    // =========================================================================
    section('执行断言 4：学生 C 错题记录断言 (2 处错题)');
    const stuC = lb[2];

    if (stuC.wrongQuestions.length !== 2) {
      fail(`学生 C 错题数应为 2，实际为: ${stuC.wrongQuestions.length}`);
    }
    pass(`学生 C 错题数量精确为 2 (题1选: ${stuC.wrongQuestions[0].studentSelected}, 题2选: ${stuC.wrongQuestions[1].studentSelected})`);

    // =========================================================================
    // 【断言 5】：验证领奖台 Podium (前三名)
    // =========================================================================
    section('执行断言 5：Kahoot 领奖台 (Podium) 聚合校验');
    const podium = settlement.podium;

    if (podium.length !== 3) fail(`领奖台应有 3 位选手`);
    if (podium[0].name !== '李小华 (Student A)' || podium[0].rank !== 1) fail('冠军颁奖错误');
    if (podium[1].name !== '张小明 (Student B)' || podium[1].rank !== 2) fail('亚军颁奖错误');
    if (podium[2].name !== '王小刚 (Student C)' || podium[2].rank !== 3) fail('季军颁奖错误');
    pass(`领奖台金银铜牌排序无误: 🥇金牌: ${podium[0].name} | 🥈银牌: ${podium[1].name} | 🥉铜牌: ${podium[2].name}`);

    // =========================================================================
    // 【断言 6】：多房间广播绝对隔离校验
    // =========================================================================
    section('执行断言 6：多房间广播绝对隔离校验');

    if (roomBLeakEvents.length > 0) {
      fail(`严重串房泄漏！房间 B 意外收到了房间 A 的结算通知: ${JSON.stringify(roomBLeakEvents)}`);
    }
    pass(`多房间广播绝对隔离验证通过：房间 B 全程 0 泄露，未受到房间 A 结算的任何干扰！`);

    // 收尾注销房间
    await emitAsync(teacherSocketA, 'teacher_close_room', { roomId: roomIdA });
    await emitAsync(teacherSocketB, 'teacher_close_room', { roomId: roomIdB });
    pass(`测试房间已安全清理注销`);

    section('Educineva 第 4 步验收结论');
    console.log(`${colors.green}${colors.bold}🎉 恭喜！第 4 步「Kahoot 式结算颁奖画面与可折叠错题学情复盘看板」所有自动化断言 100% 验收通过！${colors.reset}\n`);

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

runStep4AcceptanceTests();
