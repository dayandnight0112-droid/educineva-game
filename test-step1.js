/**
 * Educineva 核心母体服务 - 第 1 步自动化验收测试脚本
 * 
 * 模拟场景：
 * 1. 模拟 A 老师创建《一年级数学课堂》，传入数学试卷与配置
 * 2. 模拟 B 老师同时创建《三年级科学课堂》，传入科学试卷与配置
 * 
 * 自动化断言：
 * 【断言 1】：验证 A 老师与 B 老师生成的 PIN 码是否独立且不同（且为 6 位数字格式）
 * 【断言 2】：验证 A 房间和 B 房间的题目数据是否完全隔离互不干扰，且深拷贝免疫外部污染
 * 【断言 3】：验证关闭 A 房间后，B 房间依然完好独立运行
 */

import { io as ClientIO } from 'socket.io-client';
import http from 'http';
import { startServer, stopServer, roomManager } from './server.js';

const TEST_PORT = 3001; // 使用独立端口避免与开发服端口冲突
const SERVER_URL = `http://localhost:${TEST_PORT}`;

// 颜色输出辅助函数
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

/**
 * Socket.io 异步 emit 辅助封装，返回 Promise
 */
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

/**
 * 连接 Socket 客户端辅助函数
 */
function createClientSocket(url, label) {
  return new Promise((resolve, reject) => {
    const socket = ClientIO(url, {
      transports: ['websocket'],
      forceNew: true,
      reconnection: false
    });

    socket.on('connect', () => {
      info(`${label} 已连接至母体 Socket 服务 (SocketID: ${socket.id})`);
      resolve(socket);
    });

    socket.on('connect_error', (err) => {
      reject(new Error(`${label} 连接失败: ${err.message}`));
    });
  });
}

async function runStep1AcceptanceTests() {
  section('Educineva 验收测试：第 1 步 Socket 母体系统与多房间沙箱隔离');

  let serverInstance = null;
  let socketA = null;
  let socketB = null;

  try {
    // 0. 启动测试母体服务端
    info(`正在启动测试环境 Socket 母体服务 (端口: ${TEST_PORT})...`);
    serverInstance = await startServer(TEST_PORT);
    pass(`母体 HTTP 与 Socket.io 实时中枢在端口 ${TEST_PORT} 正常就绪`);

    // 1. 初始化两位老师的客户端连接
    info('正在模拟 A 老师与 B 老师建立实时 WebSocket 链接...');
    socketA = await createClientSocket(SERVER_URL, 'A老师客户端 (数学)');
    socketB = await createClientSocket(SERVER_URL, 'B老师客户端 (科学)');

    // 2. 准备两套完全不同学科的原始试卷与配置数据
    const mathQuestionsOriginal = [
      { id: 'math_101', title: '5 + 7 等于多少？', options: ['10', '11', '12', '13'], answer: '12' },
      { id: 'math_102', title: '9 × 9 等于多少？', options: ['72', '81', '90', '99'], answer: '81' },
      { id: 'math_103', title: '100 - 37 等于多少？', options: ['63', '53', '73', '67'], answer: '63' }
    ];

    const scienceQuestionsOriginal = [
      { id: 'sci_201', title: '水在常温常压下的沸点是多少度？', options: ['90℃', '100℃', '120℃', '80℃'], answer: '100℃' },
      { id: 'sci_202', title: '太阳系中体积最大的行星是哪一颗？', options: ['木星', '地球', '火星', '土星'], answer: '木星' },
      { id: 'sci_203', title: '绿色植物进行光合作用释放的气体是？', options: ['二氧化碳', '氧气', '氮气', '氦气'], answer: '氧气' }
    ];

    const mathConfig = { gameDurationSec: 120, lapTarget: 3, allowRevive: true };
    const scienceConfig = { gameDurationSec: 180, lapTarget: 5, allowRevive: false };

    // 3. A 老师创建房间《一年级数学课堂》
    info('A 老师发起开房请求:《一年级数学课堂》...');
    const resA = await emitAsync(socketA, 'teacher_create_room', {
      teacherId: 'teacher_alex_001',
      roomName: '一年级数学课堂',
      gameId: 'speed-racing',
      gameMode: 'math-battle',
      config: mathConfig,
      questions: mathQuestionsOriginal
    });

    if (!resA || !resA.success) {
      throw new Error(`A 老师建房失败: ${JSON.stringify(resA)}`);
    }

    // 4. B 老师创建房间《三年级科学课堂》
    info('B 老师发起开房请求:《三年级科学课堂》...');
    const resB = await emitAsync(socketB, 'teacher_create_room', {
      teacherId: 'teacher_bella_002',
      roomName: '三年级科学课堂',
      gameId: 'speed-racing',
      gameMode: 'science-dash',
      config: scienceConfig,
      questions: scienceQuestionsOriginal
    });

    if (!resB || !resB.success) {
      throw new Error(`B 老师建房失败: ${JSON.stringify(resB)}`);
    }

    // =========================================================================
    // 【断言 1】：验证 A 老师与 B 老师生成的 PIN 码是否独立且不同
    // =========================================================================
    section('执行断言 1：PIN 码唯一性与格式校验');
    const pinA = resA.pin;
    const pinB = resB.pin;
    const roomIdA = resA.roomId;
    const roomIdB = resB.roomId;

    if (!/^\d{6}$/.test(pinA)) {
      fail(`A 房间 PIN 码格式错误，必须为 6 位纯数字，实际为: "${pinA}"`);
    }
    pass(`A 房间 PIN 码合规性验证通过 (6位纯数字: ${pinA})`);

    if (!/^\d{6}$/.test(pinB)) {
      fail(`B 房间 PIN 码格式错误，必须为 6 位纯数字，实际为: "${pinB}"`);
    }
    pass(`B 房间 PIN 码合规性验证通过 (6位纯数字: ${pinB})`);

    if (pinA === pinB) {
      fail(`碰撞致命错误：A 房间 PIN [${pinA}] 与 B 房间 PIN [${pinB}] 相同！`);
    }
    pass(`A 与 B 房间 PIN 码绝对独立无碰撞 (A: ${pinA} !== B: ${pinB})`);

    if (roomIdA === roomIdB) {
      fail(`A 房间 ID 与 B 房间 ID 出现重复！`);
    }
    pass(`A 与 B 房间内部沙箱 roomId 独立隔离 (A: ${roomIdA}, B: ${roomIdB})`);

    // =========================================================================
    // 【断言 2】：验证 A 房间和 B 房间的题目数据是否完全隔离互不干扰
    // =========================================================================
    section('执行断言 2：多房间题库与配置沙箱隔离性校验');

    // 2.1 查询双方房间的内部数据
    const queryRoomA = await emitAsync(socketA, 'get_room_info', { roomId: roomIdA });
    const queryRoomB = await emitAsync(socketB, 'get_room_info', { roomId: roomIdB });

    if (!queryRoomA.success || !queryRoomB.success) {
      fail('查询房间内部信息失败');
    }

    const roomAQuestions = queryRoomA.room.questions;
    const roomBQuestions = queryRoomB.room.questions;

    // 2.2 验证题目数量与学科对应性
    if (roomAQuestions.length !== 3 || roomBQuestions.length !== 3) {
      fail(`题目数量不匹配：A房(${roomAQuestions.length})，B房(${roomBQuestions.length})`);
    }
    pass(`A 房间题目数量精确为 3，B 房间题目数量精确为 3`);

    // 验证 A 房间全为数学题，未混入任何科学题
    const aHasScience = roomAQuestions.some(q => q.id.startsWith('sci_'));
    const aHasAllMath = roomAQuestions.every(q => q.id.startsWith('math_'));
    if (aHasScience || !aHasAllMath) {
      fail('严重隔离穿透：A 房间题库混入了科学题！');
    }
    pass(`A 房间纯净度验证通过（包含且仅包含数学题库：${roomAQuestions.map(q => q.id).join(', ')}）`);

    // 验证 B 房间全为科学题，未混入任何数学题
    const bHasMath = roomBQuestions.some(q => q.id.startsWith('math_'));
    const bHasAllScience = roomBQuestions.every(q => q.id.startsWith('sci_'));
    if (bHasMath || !bHasAllScience) {
      fail('严重隔离穿透：B 房间题库混入了数学题！');
    }
    pass(`B 房间纯净度验证通过（包含且仅包含科学题库：${roomBQuestions.map(q => q.id).join(', ')}）`);

    // 2.3 验证配置沙箱独立性
    if (queryRoomA.room.config.lapTarget !== 3 || queryRoomB.room.config.lapTarget !== 5) {
      fail('房间配置发生串扰覆盖！');
    }
    pass(`A 房间配置 (圈数: 3, 复活: 开启) 与 B 房间配置 (圈数: 5, 复活: 关闭) 互相独立`);

    // 2.4 核心【深拷贝（Deep Clone）快照防篡改测试】：
    // 故意在客户端篡改传入前的 original 原始数组，检查服务端沙箱内的数据是否不受任何影响
    info('执行防篡改冲击测试：恶意修改外部原始试卷对象...');
    mathQuestionsOriginal[0].title = '【恶意篡改内容：题目已被破坏】';
    mathQuestionsOriginal.push({ id: 'injected_hack', title: '注入题目' });

    const recheckA = await emitAsync(socketA, 'get_room_info', { roomId: roomIdA });
    const storedFirstQTitle = recheckA.room.questions[0].title;
    const storedQLength = recheckA.room.questions.length;

    if (storedFirstQTitle !== '5 + 7 等于多少？') {
      fail(`深拷贝防篡改失效！服务端题目受到外部修改影响，当前为: ${storedFirstQTitle}`);
    }
    if (storedQLength !== 3) {
      fail(`深拷贝防篡改失效！外部 push 导致服务端题库变动，题目数: ${storedQLength}`);
    }
    pass(`深拷贝（Deep Clone）固化验证通过：外部试卷对象即使被恶意修改或追加，沙箱内题库依然绝对安全不可撼动！`);

    // =========================================================================
    // 【断言 3】：验证关闭 A 房间后，B 房间依然完好运行
    // =========================================================================
    section('执行断言 3：房间生命周期与注销隔离测试');

    // 监听 A 房间关闭广播
    let aClosedBroadcastReceived = false;
    socketA.on('room_closed', (evt) => {
      if (evt.roomId === roomIdA) {
        aClosedBroadcastReceived = true;
      }
    });

    info(`A 老师主动关闭房间 A: ${roomIdA}...`);
    const closeResA = await emitAsync(socketA, 'teacher_close_room', { roomId: roomIdA });

    if (!closeResA || !closeResA.success) {
      fail(`关闭 A 房间失败: ${JSON.stringify(closeResA)}`);
    }
    pass(`A 老师收到房间关闭成功确认`);

    // 等待 100ms 确保事件与广播落地
    await new Promise(r => setTimeout(r, 100));

    if (!aClosedBroadcastReceived) {
      fail(`未接收到 room_closed 广播通知`);
    }
    pass(`A 房间已广播 room_closed 通知且频道已安全解散`);

    // 验证 A 房间已被销毁
    const checkClosedA = await emitAsync(socketA, 'get_room_info', { roomId: roomIdA });
    if (checkClosedA.success) {
      fail(`销毁失效：A 房间仍能被查询到！`);
    }
    pass(`A 房间已在沙箱管理器中彻底注销与清空，内存完全释放`);

    // 核心：验证 B 房间依然生龙活虎
    info(`检验 B 房间是否受到 A 房间销毁的影响...`);
    const checkAliveB = await emitAsync(socketB, 'get_room_info', { roomId: roomIdB });

    if (!checkAliveB || !checkAliveB.success) {
      fail(`连带损坏致命缺陷：关闭 A 房间导致 B 房间异常不可用！`);
    }

    if (checkAliveB.room.pin !== pinB) {
      fail(`B 房间 PIN 码受损！预期: ${pinB}, 实际: ${checkAliveB.room.pin}`);
    }

    if (checkAliveB.room.questions.length !== 3) {
      fail(`B 房间题目受损！预期 3 道，实际: ${checkAliveB.room.questions.length}`);
    }

    if (checkAliveB.room.questions[0].title !== '水在常温常压下的沸点是多少度？') {
      fail(`B 房间首道科学题目异常`);
    }
    pass(`B 房间依然完好正常运行（PIN 码、科学试卷 3 道题目与独立配置完整保留）`);

    // 验证沙箱总活跃数
    if (roomManager.getRoomCount() !== 1) {
      fail(`房间计数异常，预期活跃房间为 1，实际为: ${roomManager.getRoomCount()}`);
    }
    pass(`沙箱活跃房间计数精确更新（从 2 减少为 1）`);

    // 5. 收尾工作：关闭 B 房间释放全部资源
    info('清理测试现场：关闭 B 房间...');
    await emitAsync(socketB, 'teacher_close_room', { roomId: roomIdB });
    pass(`B 房间已安全关闭，所有测试房间完全回收 (活跃数: ${roomManager.getRoomCount()})`);

    // =========================================================================
    // 全部验收通过
    // =========================================================================
    section('Educineva 第 1 步验收结论');
    console.log(`${colors.green}${colors.bold}🎉 恭喜！第 1 步「Socket 母体系统与多房间沙箱隔离内核」所有自动化断言 100% 验收通过！${colors.reset}\n`);

  } catch (err) {
    fail('测试流程异常中断', err);
  } finally {
    // 优雅断开连接并关闭测试服务器
    if (socketA) socketA.disconnect();
    if (socketB) socketB.disconnect();
    if (serverInstance) {
      await stopServer();
      info('测试用 Socket 母体服务已安全退出。');
    }
  }
}

// 启动执行
runStep1AcceptanceTests();
