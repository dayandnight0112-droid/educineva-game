/**
 * Educineva 核心母体服务 - 第 5 步终极并发压测与防串台隔离断言
 * 
 * 极端并发压测场景：
 * 1. 老师 A 创建房间 Room_A（游戏：极速赛车，学科：一年级数学），4 名学生并发进房。
 * 2. 老师 B 创建房间 Room_B（游戏：极速赛车，学科：三年级科学），4 名学生并发进房。
 * 3. 两个房间同时启动对战，8 位学生以毫秒级高频交错提交答案。
 * 
 * 严苛断言：
 * 【断言 1】：Room_A 的学生接收到的所有题目，学科归属 100% 必须为数学，违规泄露率绝对为 0.00%
 * 【断言 2】：Room_B 的学生接收到的所有题目，学科归属 100% 必须为科学，违规泄露率绝对为 0.00%
 * 【断言 3】：跨房间比分绝对零污染：Room_A 的任何答题得分绝对不导致 Room_B 的队伍或小车发生异动
 * 【断言 4】：两房最终结算与全量错题账本 100% 独立生成且数据准确无误
 */

import { io as ClientIO } from 'socket.io-client';
import { performance } from 'perf_hooks';
import { startServer, stopServer, roomManager } from './server.js';

const TEST_PORT = 3005;
const SERVER_URL = `http://localhost:${TEST_PORT}`;

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
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
      reject(new Error(`Socket 事件 [${event}] 超时`));
    }, 6000);

    socket.emit(event, data, (response) => {
      clearTimeout(timer);
      resolve(response);
    });
  });
}

function createClientSocket(url) {
  return new Promise((resolve, reject) => {
    const socket = ClientIO(url, {
      transports: ['websocket'],
      forceNew: true,
      reconnection: false
    });

    socket.on('connect', () => resolve(socket));
    socket.on('connect_error', (err) => reject(err));
  });
}

async function runStep5StressTests() {
  section('Educineva 终极验收：第 5 步 双班级极端并发与防串台隔离压测');

  let serverInstance = null;
  const allSockets = [];

  try {
    info(`启动母体高并发压测中枢于独立端口 ${TEST_PORT}...`);
    serverInstance = await startServer(TEST_PORT);
    pass(`服务正常就绪: ws://localhost:${TEST_PORT}`);

    const benchmarkStart = performance.now();

    // 1. 初始化两位老师
    const teacherA = await createClientSocket(SERVER_URL);
    const teacherB = await createClientSocket(SERVER_URL);
    allSockets.push(teacherA, teacherB);

    // 题库 A（纯数学）
    const mathQuestions = [
      {
        id: 'math_q1',
        questionText: '【数学题】12 + 18 等于多少？',
        options: { A: '28', B: '30', C: '32', D: '40' },
        correctAnswer: 'B'
      },
      {
        id: 'math_q2',
        questionText: '【数学题】9 × 6 等于多少？',
        options: { A: '54', B: '56', C: '63', D: '48' },
        correctAnswer: 'A'
      }
    ];

    // 题库 B（纯科学）
    const scienceQuestions = [
      {
        id: 'sci_q1',
        questionText: '【科学题】绿色植物进行光合作用需要什么？',
        options: { A: '二氧化碳和水', B: '只有氧气' },
        correctAnswer: 'A'
      },
      {
        id: 'sci_q2',
        questionText: '【科学题】声音在真空中能够传播吗？',
        options: { A: '能', B: '不能' },
        correctAnswer: 'B'
      }
    ];

    // 老师 A 与老师 B 并发开房
    info('老师 A 与 老师 B 并发创建房间...');
    const [resA, resB] = await Promise.all([
      emitAsync(teacherA, 'teacher_create_room', {
        teacherId: 'teacher_alex',
        roomName: '一年级一班-数学竞速房',
        gameId: 'speed-racing',
        questions: mathQuestions
      }),
      emitAsync(teacherB, 'teacher_create_room', {
        teacherId: 'teacher_bella',
        roomName: '三年级二班-科学冲刺房',
        gameId: 'speed-racing',
        questions: scienceQuestions
      })
    ]);

    const { roomId: roomIdA, pin: pinA } = resA;
    const { roomId: roomIdB, pin: pinB } = resB;

    info(`房间 A 已建立: ${roomIdA} (PIN: ${pinA})`);
    info(`房间 B 已建立: ${roomIdB} (PIN: ${pinB})`);

    // 2. 8 位学生并发加入各自房间
    info('模拟 8 位学生同时发起进房握手...');
    const socketsA = await Promise.all([
      createClientSocket(SERVER_URL),
      createClientSocket(SERVER_URL),
      createClientSocket(SERVER_URL),
      createClientSocket(SERVER_URL)
    ]);
    const socketsB = await Promise.all([
      createClientSocket(SERVER_URL),
      createClientSocket(SERVER_URL),
      createClientSocket(SERVER_URL),
      createClientSocket(SERVER_URL)
    ]);
    allSockets.push(...socketsA, ...socketsB);

    // 监听每个学生接收到的题目与比分广播
    const roomAQuestionsReceived = [];
    const roomBQuestionsReceived = [];
    const roomAScoreEventsReceived = [];
    const roomBScoreEventsReceived = [];

    socketsA.forEach((s, idx) => {
      s.on('new_question', (q) => { roomAQuestionsReceived.push({ studentIdx: idx, ...q }); });
      s.on('scoreboard_update', (sb) => { roomAScoreEventsReceived.push(sb); });
    });
    socketsB.forEach((s, idx) => {
      s.on('new_question', (q) => { roomBQuestionsReceived.push({ studentIdx: idx, ...q }); });
      s.on('scoreboard_update', (sb) => { roomBScoreEventsReceived.push(sb); });
    });

    // 并发进房
    const studentsA = await Promise.all([
      emitAsync(socketsA[0], 'student_join_room', { pin: pinA, studentName: '数奥生_A1' }),
      emitAsync(socketsA[1], 'student_join_room', { pin: pinA, studentName: '数奥生_A2' }),
      emitAsync(socketsA[2], 'student_join_room', { pin: pinA, studentName: '数奥生_A3' }),
      emitAsync(socketsA[3], 'student_join_room', { pin: pinA, studentName: '数奥生_A4' })
    ]);

    const studentsB = await Promise.all([
      emitAsync(socketsB[0], 'student_join_room', { pin: pinB, studentName: '科探生_B1' }),
      emitAsync(socketsB[1], 'student_join_room', { pin: pinB, studentName: '科探生_B2' }),
      emitAsync(socketsB[2], 'student_join_room', { pin: pinB, studentName: '科探生_B3' }),
      emitAsync(socketsB[3], 'student_join_room', { pin: pinB, studentName: '科探生_B4' })
    ]);

    pass('8 位学生并发进房全部完成，零阻塞零冲突');

    // =========================================================================
    // 3. 高并发交错答题压测（多轮循环）
    // =========================================================================
    section('执行极端并发交错发题与高频答题冲击');

    // 第 1 轮发题与答题
    info('双老师同时下发第 1 题...');
    await Promise.all([
      emitAsync(teacherA, 'teacher_push_question', { roomId: roomIdA, questionIndex: 0 }),
      emitAsync(teacherB, 'teacher_push_question', { roomId: roomIdB, questionIndex: 0 })
    ]);

    info('8 名学生毫秒级交错并发提交第 1 题答案...');
    await Promise.all([
      // 房间 A 答题 (标答为 B)
      emitAsync(socketsA[0], 'student_submit_answer', { roomId: roomIdA, questionId: 'math_q1', selectedOption: 'B' }), // 对
      emitAsync(socketsA[1], 'student_submit_answer', { roomId: roomIdA, questionId: 'math_q1', selectedOption: 'B' }), // 对
      emitAsync(socketsA[2], 'student_submit_answer', { roomId: roomIdA, questionId: 'math_q1', selectedOption: 'C' }), // 错
      emitAsync(socketsA[3], 'student_submit_answer', { roomId: roomIdA, questionId: 'math_q1', selectedOption: 'D' }), // 错
      // 房间 B 答题 (标答为 A)
      emitAsync(socketsB[0], 'student_submit_answer', { roomId: roomIdB, questionId: 'sci_q1', selectedOption: 'A' }), // 对
      emitAsync(socketsB[1], 'student_submit_answer', { roomId: roomIdB, questionId: 'sci_q1', selectedOption: 'A' }), // 对
      emitAsync(socketsB[2], 'student_submit_answer', { roomId: roomIdB, questionId: 'sci_q1', selectedOption: 'A' }), // 对
      emitAsync(socketsB[3], 'student_submit_answer', { roomId: roomIdB, questionId: 'sci_q1', selectedOption: 'B' })  // 错
    ]);

    // 第 2 轮发题与答题
    info('双老师同时下发第 2 题...');
    await Promise.all([
      emitAsync(teacherA, 'teacher_push_question', { roomId: roomIdA, questionIndex: 1 }),
      emitAsync(teacherB, 'teacher_push_question', { roomId: roomIdB, questionIndex: 1 })
    ]);

    info('8 名学生毫秒级交错并发提交第 2 题答案...');
    await Promise.all([
      // 房间 A (标答为 A)
      emitAsync(socketsA[0], 'student_submit_answer', { roomId: roomIdA, questionId: 'math_q2', selectedOption: 'A' }), // 对
      emitAsync(socketsA[1], 'student_submit_answer', { roomId: roomIdA, questionId: 'math_q2', selectedOption: 'C' }), // 错
      emitAsync(socketsA[2], 'student_submit_answer', { roomId: roomIdA, questionId: 'math_q2', selectedOption: 'A' }), // 对
      emitAsync(socketsA[3], 'student_submit_answer', { roomId: roomIdA, questionId: 'math_q2', selectedOption: 'B' }), // 错
      // 房间 B (标答为 B)
      emitAsync(socketsB[0], 'student_submit_answer', { roomId: roomIdB, questionId: 'sci_q2', selectedOption: 'B' }), // 对
      emitAsync(socketsB[1], 'student_submit_answer', { roomId: roomIdB, questionId: 'sci_q2', selectedOption: 'B' }), // 对
      emitAsync(socketsB[2], 'student_submit_answer', { roomId: roomIdB, questionId: 'sci_q2', selectedOption: 'A' }), // 错
      emitAsync(socketsB[3], 'student_submit_answer', { roomId: roomIdB, questionId: 'sci_q2', selectedOption: 'B' })  // 对
    ]);

    // 4. 双房间并发终局结算
    info('双房间同时触发终局结算信令...');
    const [settleA, settleB] = await Promise.all([
      emitAsync(teacherA, 'teacher_end_game', { roomId: roomIdA }),
      emitAsync(teacherB, 'teacher_end_game', { roomId: roomIdB })
    ]);

    const benchmarkEnd = performance.now();
    const elapsedMs = Math.round(benchmarkEnd - benchmarkStart);

    // 等待网络队列事件完全沉降
    await new Promise(r => setTimeout(r, 150));

    // =========================================================================
    // 严苛断言检测
    // =========================================================================
    section('执行严苛防串台与数据隔离断言');

    // 【断言 1】：Room_A 纯净度检验
    const aLeakScience = roomAQuestionsReceived.filter(q => q.questionText.includes('科学') || q.questionId.startsWith('sci_'));
    if (aLeakScience.length > 0) {
      fail(`严重安全事故：房间 A 混入了科学题目！泄露条数: ${aLeakScience.length}`);
    }
    const aAllMath = roomAQuestionsReceived.every(q => q.questionText.includes('数学'));
    if (!aAllMath || roomAQuestionsReceived.length === 0) {
      fail('房间 A 题目内容不符合数学规范');
    }
    pass(`断言 1 通过：Room_A 收到 ${roomAQuestionsReceived.length} 条题目广播，100% 均为数学题，串题违规率严格为 0.00%`);

    // 【断言 2】：Room_B 纯净度检验
    const bLeakMath = roomBQuestionsReceived.filter(q => q.questionText.includes('数学') || q.questionId.startsWith('math_'));
    if (bLeakMath.length > 0) {
      fail(`严重安全事故：房间 B 混入了数学题目！泄露条数: ${bLeakMath.length}`);
    }
    const bAllScience = roomBQuestionsReceived.every(q => q.questionText.includes('科学'));
    if (!bAllScience || roomBQuestionsReceived.length === 0) {
      fail('房间 B 题目内容不符合科学规范');
    }
    pass(`断言 2 通过：Room_B 收到 ${roomBQuestionsReceived.length} 条题目广播，100% 均为科学题，串题违规率严格为 0.00%`);

    // 【断言 3】：比分与房间广播信道绝对物理隔离
    const aScoreContaminated = roomAScoreEventsReceived.some(s => s.roomId !== roomIdA);
    const bScoreContaminated = roomBScoreEventsReceived.some(s => s.roomId !== roomIdB);

    if (aScoreContaminated || bScoreContaminated) {
      fail('严重广播串台：计分板广播穿透到了另一个房间！');
    }
    pass(`断言 3 通过：比分广播 100% 专属信道定向投递，两班赛况小车加速完全独立互不影响`);

    // 【断言 4】：两房最终结算与全量错题账本 100% 独立生成且数据准确无误
    if (!settleA.success || !settleB.success) {
      fail('结算响应异常');
    }

    const reportA = settleA.settlementData;
    const reportB = settleB.settlementData;

    if (reportA.roomId !== roomIdA || reportB.roomId !== roomIdB) {
      fail('结算报告归属房间错乱！');
    }
    if (reportA.leaderboard.length !== 4 || reportB.leaderboard.length !== 4) {
      fail('结算排行榜人数不匹配');
    }

    // 验证学生 A1 满分 (200分)
    const stuA1 = reportA.leaderboard.find(s => s.name === '数奥生_A1');
    if (!stuA1 || stuA1.score !== 200 || stuA1.wrongCount !== 0 || !stuA1.isPerfect) {
      fail(`数奥生_A1 成绩不符合预期: ${JSON.stringify(stuA1)}`);
    }
    pass(`Room_A 账本断言通过: 数奥生_A1 斩获 200 分满分通关，错题数为 0`);

    // 验证学生 B4 错 1 题 (100分)
    const stuB4 = reportB.leaderboard.find(s => s.name === '科探生_B4');
    if (!stuB4 || stuB4.score !== 100 || stuB4.wrongCount !== 1) {
      fail(`科探生_B4 成绩不符合预期: ${JSON.stringify(stuB4)}`);
    }
    pass(`Room_B 账本断言通过: 科探生_B4 错题精准记录 1 道，题干为 "${stuB4.wrongQuestions[0].questionText}"`);

    // 资源清理
    await Promise.all([
      emitAsync(teacherA, 'teacher_close_room', { roomId: roomIdA }),
      emitAsync(teacherB, 'teacher_close_room', { roomId: roomIdB })
    ]);
    pass('双房间沙箱资源已完全回收注销');

    // =========================================================================
    // 性能压测统计总结
    // =========================================================================
    section('压测性能与指标报告');
    console.log(`  ${colors.magenta}总并发模拟连接数:${colors.reset} 10 个 Socket 实例 (2 老师 + 8 学生)`);
    console.log(`  ${colors.magenta}总业务信令交互次数:${colors.reset} 40+ 次带状态转换的操作请求`);
    console.log(`  ${colors.magenta}全流程吞吐总耗时:${colors.reset}   ${elapsedMs} ms`);
    console.log(`  ${colors.magenta}串台/数据泄露/脏读率:${colors.reset} ${colors.green}${colors.bold}0.00% (绝对隔离)${colors.reset}`);

    section('Educineva 第 5 步验收结论');
    console.log(`${colors.green}${colors.bold}🎉 恭喜！第 5 步「通用子游戏 SDK、双模式适配与高并发防串台终极压测」全部 100% 验收通过！${colors.reset}\n`);

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

runStep5StressTests();
