import http from 'http';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import { RoomManager } from './server/roomManager.js';
import { initSocketServer } from './server/socketHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;
const DIST = path.join(__dirname, 'dist');

// 1. 初始化 Express 与 HTTP Server
const app = express();
const server = http.createServer(app);

// 2. 初始化核心沙箱管理器
const roomManager = new RoomManager();

// 3. 配置 Express 中间件
app.use(cors());
app.use(express.json());

// 基础 HTTP 健康检查接口
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Educineva Socket Master System',
    step: 'Step 1: Socket 母体系统与多房间沙箱隔离内核',
    uptime: process.uptime(),
    activeRooms: roomManager.getRoomCount(),
    timestamp: Date.now()
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Educineva Socket Master System',
    step: 'Step 1: Socket 母体系统与多房间沙箱隔离内核',
    uptime: process.uptime(),
    activeRooms: roomManager.getRoomCount(),
    timestamp: Date.now()
  });
});

// 查询当前活跃房间摘要列表（内部管理/排查接口）
app.get('/api/rooms', (req, res) => {
  res.json({
    success: true,
    count: roomManager.getRoomCount(),
    rooms: roomManager.getAllRoomSummaries()
  });
});

// 4. 静态资源托管（兼容 Educineva 原有前端页面与管理后台）
if (fs.existsSync(DIST)) {
  app.use(express.static(DIST));
}
app.use(express.static(path.join(ROOT, 'public')));
app.use(express.static(ROOT));

// 前端 SPA 页面回退（兼容 Express 5）
app.use((req, res, next) => {
  if (req.method !== 'GET') {
    return next();
  }
  if (req.path.startsWith('/api') || req.path.startsWith('/socket.io') || req.path.startsWith('/health')) {
    return next();
  }
  const distIndex = path.join(DIST, 'index.html');
  if (fs.existsSync(distIndex)) {
    return res.sendFile(distIndex);
  }
  const rootIndex = path.join(ROOT, 'index.html');
  if (fs.existsSync(rootIndex)) {
    return res.sendFile(rootIndex);
  }
  res.status(404).send('Not Found');
});

// 5. 初始化 Socket.io 实时母体服务
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  },
  pingTimeout: 20000,
  pingInterval: 10000
});

initSocketServer(io, roomManager);

/**
 * 启动服务封装
 * @param {number} [port=PORT]
 * @returns {Promise<http.Server>}
 */
export function startServer(port = PORT) {
  return new Promise((resolve) => {
    server.listen(port, () => {
      console.log('====================================================');
      console.log(` Educineva Socket 母体调度系统已启动`);
      console.log(` HTTP 服务地址:   http://localhost:${port}`);
      console.log(` 健康检查接口:   http://localhost:${port}/health`);
      console.log(` Socket 实时中枢: ws://localhost:${port}`);
      console.log('====================================================');
      resolve(server);
    });
  });
}

/**
 * 停止服务封装
 * @returns {Promise<void>}
 */
export function stopServer() {
  return new Promise((resolve) => {
    try {
      // io.close() 会自动关闭关联的底层 http.Server
      io.close(() => {
        resolve();
      });
    } catch {
      resolve();
    }
  });
}

// 若通过命令行直接执行本文件则自动监听
if (process.argv[1] === __filename) {
  startServer(PORT);
}

export { app, server, io, roomManager };
