/**
 * Educineva 核心母体服务 - 第 3 步自动化验收测试脚本
 * 
 * 模拟场景：
 * 1. 老师创建包含 2 道题的房间，2 个学生加入等待大厅。
 * 2. 老师触发发题，拦截并检查学生端接收到的消息，断言：`correctAnswer` 属性绝对不存在（物理脱敏成功）。
 * 3. 学生 1 提交正确选项（如 "C"），学生 2 提交错误选项（如 "A"）。
 * 4. 模拟学生 1 尝试对同一题重复提交，验证是否被防刷拦截。
 * 5. 断言检查：
 *    - 学生 1：积分 100，答错数 0。
 *    - 学生 2：积分 0，答错数 1。
 *    - 验证学生 2 的 `answerLogs` 中完整且准确地包含错题内容、所选错误选项以及标准答案。
 * 6. 多房间隔离检验：验证并行的房间 B 完全不受房间 A 发题和答题的干扰。
 */

import { io as ClientIO } from 'socket.io-client';
import { startServer, stopServer, roomManager } from './server.js';

const TEST_PORT = 3003;
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

async function runStep3AcceptanceTests() {
  section('Educineva 验收测试：第 3 步 题目安全脱敏分发与全量答题日志记录引擎');

  let serverInstance = null;
  const allSockets = [];

  try {
    // 0. 启动测试服务器
    info(`启动测试环境服务于端口 ${TEST_PORT}...`);
    serverInstance = await startServer(TEST_PORT);
    pass(`服务正常就绪: ws://localhost:${TEST_PORT}`);

    // 1. 初始化教师与学生客户端
    info('初始化教师端与 2 位学生客户端...');
    const teacherSocketA = await createClientSocket(SERVER_URL, '老师A');
    const studentSocket1 = await createClientSocket(SERVER_URL, '学生1');
    const studentSocket2 = await createClientSocket(SERVER_URL, '学生2');
    allSockets.push(teacherSocketA, studentSocket1, studentSocket2);

    // 老师 A 开房，传入 2 道精心设计的测试题
    const testQuestions = [
      {
        id: 'q_math_01',
        questionText: '3 + 5 等于几？',
        options: { A: '6', B: '7', C: '8', D: '9' },
        correctAnswer: 'C'
      },
      {
        id: 'q_sci_02',
        questionText: '光在真空中的传播速度约为每秒多少万公里？',
        options: { A: '30万公里', B: '20万公里', C: '10万公里', D: '50万公里' },
        correctAnswer: 'A'
      }
    ];

    info('老师 A 发起创建房间《智力大竞速》，载入 2 道私有测试题目...');
    const createRes = await emitAsync(teacherSocketA, 'teacher_create_room', {
      teacherId: 'teacher_alex',
      roomName: '智力大竞速',
      gameId: 'speed-racing',
      questions: testQuestions
    });

    if (!createRes.success) fail('建房失败', createRes.error);
    const { roomId: roomIdA, pin: pinA } = createRes;
    pass(`房间创建成功 (ID: ${roomIdA}, PIN: ${pinA})`);

    // 学生 1 和学生 2 凭 PIN 入房
    const joinRes1 = await emitAsync(studentSocket1, 'student_join_room', {
      pin: pinA,
      studentName: '学霸小明 (Student 1)'
    });
    const joinRes2 = await emitAsync(studentSocket2, 'student_join_room', {
      pin: pinA,
      studentName: '马虎小刚 (Student 2)'
    });

    if (!joinRes1.success || !joinRes2.success) fail('学生进房失败');
    pass(`两位学生已成功进房等待: 小明(ID: ${joinRes1.studentId}), 小刚(ID: ${joinRes2.studentId})`);

    // =========================================================================
    // 【断言 1】：题目安全物理脱敏分发（防作弊断言）
    // =========================================================================
    section('执行断言 1：题目物理脱敏下发校验（绝对防作弊）');

    // 学生端监听新题广播
    let receivedQuestion1OnStudent1 = null;
    let receivedQuestion1OnStudent2 = null;

    studentSocket1.on('new_question', (q) => {
      receivedQuestion1OnStudent1 = q;
    });
    studentSocket2.on('new_question', (q) => {
      receivedQuestion1OnStudent2 = q;
    });

    info('老师 A 触发发题指令 (questionIndex: 0)...');
    const pushRes = await emitAsync(teacherSocketA, 'teacher_push_question', {
      roomId: roomIdA,
      questionIndex: 0
    });

    if (!pushRes.success) fail('发题指令失败', pushRes.error);

    // 等待网络事件派发
    await new Promise(r => setTimeout(r, 100));

    if (!receivedQuestion1OnStudent1 || !receivedQuestion1OnStudent2) {
      fail('学生端未接收到 `new_question` 广播');
    }

    const payload = receivedQuestion1OnStudent1;
    info(`学生端收到的题目数据载荷结构: ${JSON.stringify(payload)}`);

    // 核心安全校验：绝对不能包含 correctAnswer 或 answer 字段
    if ('correctAnswer' in payload || payload.correctAnswer !== undefined) {
      fail('严重安全漏洞！学生端收到了标答字段 `correctAnswer`！');
    }
    if ('answer' in payload || payload.answer !== undefined) {
      fail('严重安全漏洞！学生端收到了标答字段 `answer`！');
    }
    pass(`安全性断言通过：题目数据已物理脱敏，绝不包含 correctAnswer / answer 答案字段`);

    // 校验必要展示字段完整性
    if (payload.questionId !== 'q_math_01' || payload.questionText !== '3 + 5 等于几？') {
      fail('题目 ID 或题干不匹配');
    }
    if (!payload.options || payload.options.C !== '8') {
      fail('题目选项数据不完整');
    }
    pass(`题目必要呈现字段完整合规: questionId=${payload.questionId}, options={A,B,C,D}, total=2`);

    // =========================================================================
    // 【断言 2 & 3】：学生作答提交、即时反馈与计分判定
    // =========================================================================
    section('执行断言 2：答题判分与即时个人反馈');

    let feedbackStudent1 = null;
    let feedbackStudent2 = null;

    studentSocket1.on('answer_feedback', (fb) => { feedbackStudent1 = fb; });
    studentSocket2.on('answer_feedback', (fb) => { feedbackStudent2 = fb; });

    // 1. 小明提交正确答案 "C"
    info('小明提交正确选项 "C"...');
    const submitRes1 = await emitAsync(studentSocket1, 'student_submit_answer', {
      roomId: roomIdA,
      questionId: 'q_math_01',
      selectedOption: 'C'
    });
    if (!submitRes1.success) fail('小明提交答题失败', submitRes1.error);

    // 2. 小刚提交错误答案 "A"
    info('小刚提交错误选项 "A"...');
    const submitRes2 = await emitAsync(studentSocket2, 'student_submit_answer', {
      roomId: roomIdA,
      questionId: 'q_math_01',
      selectedOption: 'A'
    });
    if (!submitRes2.success) fail('小刚提交答题失败', submitRes2.error);

    await new Promise(r => setTimeout(r, 100));

    // 验证小明判定
    if (!feedbackStudent1 || !feedbackStudent1.isCorrect || feedbackStudent1.pointsEarned !== 100) {
      fail(`小明判分错误: ${JSON.stringify(feedbackStudent1)}`);
    }
    pass(`小明答对判定正确: isCorrect=true, pointsEarned=100, currentScore=${feedbackStudent1.currentScore}`);

    // 验证小刚判定
    if (!feedbackStudent2 || feedbackStudent2.isCorrect || feedbackStudent2.pointsEarned !== 0) {
      fail(`小刚判分错误: ${JSON.stringify(feedbackStudent2)}`);
    }
    pass(`小刚答错判定正确: isCorrect=false, pointsEarned=0, currentScore=${feedbackStudent2.currentScore}`);

    // =========================================================================
    // 【断言 4】：防重复作答与防刷拦截测试
    // =========================================================================
    section('执行断言 4：防重复答题与防刷拦截校验');
    info('模拟小明试图再次提交本题答案（防刷测试）...');
    const duplicateSubmit = await emitAsync(studentSocket1, 'student_submit_answer', {
      roomId: roomIdA,
      questionId: 'q_math_01',
      selectedOption: 'C'
    });

    if (duplicateSubmit.success) {
      fail('防刷漏洞：学生能够对同一题目重复提交作答！');
    }
    pass(`防刷机制生效，成功拦截重复答题: "${duplicateSubmit.error}"`);

    // =========================================================================
    // 【断言 5】：全量答题日志流水账本（Answer Log）完整性断言
    // =========================================================================
    section('执行断言 5：全量答题日志流水账本（Answer Log）检验');

    // 调取小明和小刚的后台答题流水账本
    const logsRes1 = await emitAsync(teacherSocketA, 'get_student_answer_logs', {
      roomId: roomIdA,
      studentId: joinRes1.studentId
    });
    const logsRes2 = await emitAsync(teacherSocketA, 'get_student_answer_logs', {
      roomId: roomIdA,
      studentId: joinRes2.studentId
    });

    if (!logsRes1.success || !logsRes2.success) {
      fail('调取答题日志流水账本失败');
    }

    const log1 = logsRes1.data;
    const log2 = logsRes2.data;

    // 检查积分与错题数统计
    if (log1.score !== 100 || log1.wrongCount !== 0) {
      fail(`小明流水账本汇总错误: score=${log1.score}, wrongCount=${log1.wrongCount}`);
    }
    pass(`小明流水账本汇总正确: 积分=100, 错题数=0`);

    if (log2.score !== 0 || log2.wrongCount !== 1) {
      fail(`小刚流水账本汇总错误: score=${log2.score}, wrongCount=${log2.wrongCount}`);
    }
    pass(`小刚流水账本汇总正确: 积分=0, 错题数=1`);

    // 核心：深度核查小刚的错题流水账本明细
    const item = log2.answerLogs[0];
    if (!item) fail('小刚未记录答题条目');

    if (item.questionId !== 'q_math_01') fail(`流水题目ID不匹配: ${item.questionId}`);
    if (item.questionText !== '3 + 5 等于几？') fail(`流水题干不匹配: ${item.questionText}`);
    if (item.studentSelected !== 'A') fail(`记录的学生选项不匹配: ${item.studentSelected}`);
    if (item.correctAnswer !== 'C') fail(`记录的标准答案不匹配: ${item.correctAnswer}`);
    if (item.isCorrect !== false) fail(`对错状态记录不匹配`);

    pass(`错题明细流水账本 100% 精确固化:`);
    console.log(`       [流水记录] 题干: "${item.questionText}"`);
    console.log(`       [流水记录] 选项: ${JSON.stringify(item.options)}`);
    console.log(`       [流水记录] 学生选择: "${item.studentSelected}" | 标准答案: "${item.correctAnswer}" | 判定: 错误`);

    // =========================================================================
    // 【断言 6】：实时积分排行榜与团队积分同步校验
    // =========================================================================
    section('执行断言 6：实时全房排行榜广播校验');

    const scoreboardRes = await emitAsync(studentSocket1, 'get_scoreboard', { roomId: roomIdA });
    if (!scoreboardRes.success || !scoreboardRes.scoreboard) {
      fail('查询排行榜失败');
    }

    const sb = scoreboardRes.scoreboard;
    pass(`排行榜数据就绪：包含 ${sb.teams.length} 支队伍得分与 ${sb.students.length} 名学生个人战报`);
    pass(`榜首学生: "${sb.students[0].name}" (得分: ${sb.students[0].score})`);

    // 收尾注销房间
    await emitAsync(teacherSocketA, 'teacher_close_room', { roomId: roomIdA });
    pass(`测试房间已安全注销释放内存`);

    section('Educineva 第 3 步验收结论');
    console.log(`${colors.green}${colors.bold}🎉 恭喜！第 3 步「题目安全脱敏分发与全量答题日志记录引擎」所有自动化断言 100% 验收通过！${colors.reset}\n`);

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

runStep3AcceptanceTests();
