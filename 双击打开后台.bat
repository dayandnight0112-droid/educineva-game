@echo off
chcp 65001 >nul
title Educineva 教师管理后台
echo ========================================================
echo   正在启动 Educineva 教师管理后台...
echo   页面即将自动在浏览器中打开：http://localhost:3000
echo ========================================================
echo.
timeout /t 1 >nul
start http://localhost:3000
node server.js
pause
