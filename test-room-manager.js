/**
 * RoomManager 纯内核单元测试
 * 针对 PIN 码抗碰撞、大批量高频生成、深拷贝防穿透进行极端场景压测
 */

import { RoomManager, deepClone } from './server/roomManager.js';

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

function pass(msg) {
  console.log(`  ${colors.green}✔ [PASS]${colors.reset} ${msg}`);
}

function fail(msg, err) {
  console.error(`  ${colors.red}✘ [FAIL]${colors.reset} ${msg}`);
  if (err) console.error(err);
  process.exit(1);
}

console.log(`${colors.cyan}[INFO] 开始执行 RoomManager 隔离内核压测...${colors.reset}`);

const rm = new RoomManager();

// 1. 测试批量生成 1,000 个房间的 PIN 码唯一性
const pinSet = new Set();
const totalTestRooms = 1000;

for (let i = 0; i < totalTestRooms; i++) {
  const room = rm.createRoom({
    teacherId: `teacher_${i}`,
    roomName: `测试课堂_${i}`,
    questions: [{ id: `q_${i}`, content: `问题_${i}` }]
  });

  if (pinSet.has(room.pin)) {
    fail(`在第 ${i} 次创建时出现 PIN 码碰撞: ${room.pin}`);
  }
  pinSet.add(room.pin);
}

pass(`高频创建测试通过：连续创建 ${totalTestRooms} 个独立房间，PIN 码碰撞率为 0%`);

// 2. 测试通过 PIN 码寻址
const sampleRoom = rm.getRoomByPin([...pinSet][500]);
if (!sampleRoom || sampleRoom.teacherId !== 'teacher_500') {
  fail('通过 PIN 码 O(1) 检索房间失败');
}
pass('通过 6 位数字 PIN 码 O(1) 精确反查房间沙箱通过');

// 3. 测试深拷贝穿透防护
const originalConfig = { level: 1, nested: { speed: 100, tags: ['easy', 'fun'] } };
const roomWithNested = rm.createRoom({
  teacherId: 'teacher_deep',
  roomName: '深层对象测试',
  config: originalConfig
});

originalConfig.nested.speed = 999;
originalConfig.nested.tags.push('hacked');

const fetchedRoom = rm.getRoom(roomWithNested.roomId);
if (fetchedRoom.config.nested.speed === 999 || fetchedRoom.config.nested.tags.includes('hacked')) {
  fail('深层嵌套对象发生引用穿透！');
}
pass('深层多层嵌套对象深拷贝完全固化，外部修改 0 渗透');

// 4. 清理销毁测试
const currentCount = rm.getRoomCount();
rm.closeRoom(roomWithNested.roomId);
if (rm.getRoomCount() !== currentCount - 1 || rm.getRoom(roomWithNested.roomId) !== null) {
  fail('房间销毁后数据残留');
}
pass('房间彻底销毁注销并回收内存通过');

console.log(`\n${colors.green}所有 RoomManager 核心单元测试全部通过！${colors.reset}\n`);
