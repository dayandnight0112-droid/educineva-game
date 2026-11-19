const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

async function buildStandalone() {
  console.log('Building Standalone Teacher and Student portals...');

  // 1. 读取编译后的 CSS (来自 dist/assets)
  const assetsDir = path.join(__dirname, 'dist', 'assets');
  let cssContent = '';
  if (fs.existsSync(assetsDir)) {
    const cssFile = fs.readdirSync(assetsDir).find(f => f.endsWith('.css'));
    if (cssFile) {
      cssContent = fs.readFileSync(path.join(assetsDir, cssFile), 'utf-8');
    }
  }

  // 2. 打包教师端后台（带切学生端测试入口）
  console.log('-> Bundling Teacher App...');
  await esbuild.build({
    entryPoints: ['src/main.tsx'],
    bundle: true,
    outfile: 'dist/standalone-app.js',
    format: 'iife',
    define: { 'process.env.NODE_ENV': '"production"' },
    loader: { '.png': 'file' }
  });
  const jsAppContent = fs.readFileSync(path.join(__dirname, 'dist', 'standalone-app.js'), 'utf-8');

  const teacherHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Educineva 教师管理后台 - 游戏管理</title>
  <style>
${cssContent}
  </style>
</head>
<body class="bg-[#f8fafc] text-gray-800 antialiased selection:bg-pink-100 selection:text-pink-600">
  <div id="root"></div>
  <script>
${jsAppContent}
  </script>
</body>
</html>`;

  fs.writeFileSync(path.join(__dirname, '直接双击打开.html'), teacherHtml, 'utf-8');
  console.log('✅ 成功生成: 直接双击打开.html (教师后台)');

  // 3. 打包完全物理隔离的【学生端门户 (Student Portal)】
  console.log('-> Bundling Student Portal (Strict Physical Isolation)...');
  await esbuild.build({
    entryPoints: ['src/student-main.tsx'],
    bundle: true,
    outfile: 'dist/standalone-student.js',
    format: 'iife',
    define: { 'process.env.NODE_ENV': '"production"' },
    loader: { '.png': 'file' }
  });
  const jsStudentContent = fs.readFileSync(path.join(__dirname, 'dist', 'standalone-student.js'), 'utf-8');

  const studentHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <title>Educineva Kids - 互动教学游戏对战平台（学生端）</title>
  <link rel="icon" type="image/png" href="./assets/games/char_b.png" />
  <style>
${cssContent}
  </style>
</head>
<body class="bg-[#f8fafc] text-gray-800 antialiased selection:bg-pink-100 selection:text-pink-600">
  <div id="root"></div>
  <script>
${jsStudentContent}
  </script>
</body>
</html>`;

  fs.writeFileSync(path.join(__dirname, '学生端-直接双击打开.html'), studentHtml, 'utf-8');
  console.log('✅ 成功生成: 学生端-直接双击打开.html (零服务器、支持本地双击直接运行)');

  // 4. 打包【老师大屏控制与展示端 (Teacher Screen)】
  console.log('-> Bundling Teacher Presentation Screen (Large Screen View)...');
  await esbuild.build({
    entryPoints: ['src/screen-main.tsx'],
    bundle: true,
    outfile: 'dist/standalone-screen.js',
    format: 'iife',
    define: { 'process.env.NODE_ENV': '"production"' },
    loader: { '.png': 'file' }
  });
  const jsScreenContent = fs.readFileSync(path.join(__dirname, 'dist', 'standalone-screen.js'), 'utf-8');

  const screenHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Educineva 互动教学平台 - 老师大屏控制与展示端</title>
  <link rel="icon" type="image/png" href="./assets/games/char_b.png" />
  <style>
${cssContent}
  </style>
</head>
<body class="bg-slate-950 text-white antialiased overflow-hidden select-none">
  <div id="root"></div>
  <script>
${jsScreenContent}
  </script>
</body>
</html>`;

  fs.writeFileSync(path.join(__dirname, '老师大屏-直接双击打开.html'), screenHtml, 'utf-8');
  console.log('✅ 成功生成: 老师大屏-直接双击打开.html (零服务器、支持本地双击直接运行)');
}

buildStandalone().catch(err => {
  console.error(err);
  process.exit(1);
});
