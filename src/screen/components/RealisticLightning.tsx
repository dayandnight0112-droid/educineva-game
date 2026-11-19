import React from 'react';

interface RealisticLightningProps {
  mode: 2 | 3 | 4;
  className?: string;
}

export const RealisticLightning: React.FC<RealisticLightningProps> = ({
  mode,
  className = '',
}) => {
  /*
   * 真实高压交织闪电 (还原用户手绘图 1、图 2 与 6.png):
   * - 多股错综交缠的电弧 (Multi-tendril braided discharge)
   * - 白炽高能芯线 (Pure white-hot core)
   * - 饱和等离子辉光 (高斯模糊滤镜)
   * - 彻底移除 "VS" 徽章，完全由中心电浆碰撞旋涡自然交汇
   */

  if (mode === 2) {
    /* 
      【2 队对战闪电】(对标用户手绘图 2):
      - 上半部：烈焰赤红交织闪电 (Red lightning crackling from top)
      - 下半部：寒芒冰蓝交织闪电 (Blue lightning crackling from bottom)
      - 中心：红蓝等离子高能碰撞光球 (Swirling energy collision vortex - NO VS BADGE)
    */
    return (
      <div className={`absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-visible z-20 ${className}`}>
        {/* 纵向中心闪电束 */}
        <div className="relative w-16 h-full flex flex-col items-center justify-between">
          {/* 上半部：红色闪电 (Red Lightning Bolt) */}
          <div className="w-full flex-1 relative overflow-visible flex items-center justify-center">
            <svg
              className="w-full h-full overflow-visible animate-lightning-crackle-red"
              viewBox="0 0 60 200"
              preserveAspectRatio="none"
            >
              <defs>
                <filter id="redLightningGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="blur1" />
                  <feGaussianBlur stdDeviation="7" result="blur2" />
                  <feMerge>
                    <feMergeNode in="blur2" />
                    <feMergeNode in="blur1" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* 红电弧 1：主高压干线 */}
              <path
                d="M 30 0 L 26 22 L 35 45 L 22 72 L 33 98 L 24 125 L 36 155 L 28 178 L 30 200"
                fill="none"
                stroke="#ff0055"
                strokeWidth="5"
                filter="url(#redLightningGlow)"
              />
              {/* 红电弧 2：白炽芯线 */}
              <path
                d="M 30 0 L 26 22 L 35 45 L 22 72 L 33 98 L 24 125 L 36 155 L 28 178 L 30 200"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
              />
              {/* 红电弧 3：交织细电丝 (Braided Tendril) */}
              <path
                d="M 30 10 L 34 32 L 27 60 L 36 90 L 23 120 L 32 150 L 25 185 L 30 200"
                fill="none"
                stroke="#f43f5e"
                strokeWidth="2.5"
                opacity="0.85"
              />
              {/* 刺向两侧的微型放电枝晶 */}
              <path
                d="M 26 22 L 14 30 M 22 72 L 10 82 M 36 155 L 48 165 M 33 98 L 44 105"
                fill="none"
                stroke="#fb7185"
                strokeWidth="1.8"
              />
            </svg>
          </div>

          {/* 中心：红蓝等离子高能碰撞漩涡 (完全移除 VS 徽章) */}
          <div className="relative w-16 h-16 flex items-center justify-center my-[-16px] z-30">
            {/* 碰撞脉冲外环 */}
            <div className="absolute w-16 h-16 rounded-full bg-gradient-to-r from-rose-500/40 via-purple-500/40 to-cyan-500/40 blur-lg animate-ping"></div>
            {/* 核心强光球 */}
            <div className="w-9 h-9 rounded-full bg-radial from-white via-amber-200 to-transparent shadow-[0_0_25px_#ffffff,0_0_45px_#f43f5e] animate-pulse"></div>
            {/* 激荡电浆微粒环 */}
            <div className="absolute w-12 h-12 rounded-full border-2 border-dashed border-cyan-300 animate-spin opacity-80"></div>
          </div>

          {/* 下半部：蓝色闪电 (Blue Lightning Bolt) */}
          <div className="w-full flex-1 relative overflow-visible flex items-center justify-center">
            <svg
              className="w-full h-full overflow-visible animate-lightning-crackle"
              viewBox="0 0 60 200"
              preserveAspectRatio="none"
            >
              <defs>
                <filter id="blueLightningGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="blur1" />
                  <feGaussianBlur stdDeviation="7" result="blur2" />
                  <feMerge>
                    <feMergeNode in="blur2" />
                    <feMergeNode in="blur1" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* 蓝电弧 1：主高压干线 */}
              <path
                d="M 30 0 L 34 25 L 24 55 L 36 82 L 23 115 L 35 145 L 25 172 L 30 200"
                fill="none"
                stroke="#00ffff"
                strokeWidth="5"
                filter="url(#blueLightningGlow)"
              />
              {/* 蓝电弧 2：白炽芯线 */}
              <path
                d="M 30 0 L 34 25 L 24 55 L 36 82 L 23 115 L 35 145 L 25 172 L 30 200"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
              />
              {/* 蓝电弧 3：交织细电丝 */}
              <path
                d="M 30 5 L 25 35 L 34 68 L 22 100 L 37 130 L 26 165 L 32 190"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="2.5"
                opacity="0.85"
              />
              {/* 刺向两侧的放电枝晶 */}
              <path
                d="M 34 25 L 46 32 M 36 82 L 49 92 M 23 115 L 12 125 M 25 172 L 14 180"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="1.8"
              />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  if (mode === 3) {
    /* 
      【3 队对战闪电】(对标用户手绘图 1):
      - 上方：红色纵向高压闪电 (Red vertical arm pointing up)
      - 左下：黄色高压闪电射线 (Yellow arm pointing bottom-left)
      - 右下：蓝色高压闪电射线 (Blue arm pointing bottom-right)
      - 中心：三色高压交汇能量球 (NO VS BADGE)
    */
    return (
      <div className={`absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-visible z-20 ${className}`}>
        <svg className="w-full h-full overflow-visible" viewBox="0 0 800 500" preserveAspectRatio="none">
          <defs>
            <filter id="multiGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur1" />
              <feMerge>
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* 
            分支 1：上方红色闪电束 (从顶部到中枢 (400, 240))
          */}
          <g className="animate-lightning-crackle-red">
            <path
              d="M 400 0 L 396 35 L 406 70 L 394 110 L 405 150 L 397 190 L 400 240"
              fill="none"
              stroke="#f43f5e"
              strokeWidth="6"
              filter="url(#multiGlow)"
            />
            <path
              d="M 400 0 L 396 35 L 406 70 L 394 110 L 405 150 L 397 190 L 400 240"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.5"
            />
            {/* 缠绕分支 */}
            <path
              d="M 400 10 L 405 50 L 392 90 L 408 140 L 393 180 L 400 240"
              fill="none"
              stroke="#fb7185"
              strokeWidth="2"
            />
          </g>

          {/* 
            分支 2：左下方黄色闪电束 (从中枢 (400, 240) 刺向左下 (0, 500))
          */}
          <g className="animate-lightning-crackle">
            <path
              d="M 400 240 L 340 280 L 285 315 L 220 360 L 150 405 L 80 450 L 0 500"
              fill="none"
              stroke="#eab308"
              strokeWidth="6"
              filter="url(#multiGlow)"
            />
            <path
              d="M 400 240 L 340 280 L 285 315 L 220 360 L 150 405 L 80 450 L 0 500"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.5"
            />
            <path
              d="M 400 240 L 330 270 L 275 325 L 200 370 L 140 415 L 60 460 L 0 500"
              fill="none"
              stroke="#facc15"
              strokeWidth="2"
            />
          </g>

          {/* 
            分支 3：右下方蓝色闪电束 (从中枢 (400, 240) 刺向右下 (800, 500))
          */}
          <g className="animate-lightning-crackle">
            <path
              d="M 400 240 L 460 280 L 515 315 L 580 360 L 650 405 L 720 450 L 800 500"
              fill="none"
              stroke="#00ffff"
              strokeWidth="6"
              filter="url(#multiGlow)"
            />
            <path
              d="M 400 240 L 460 280 L 515 315 L 580 360 L 650 405 L 720 450 L 800 500"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.5"
            />
            <path
              d="M 400 240 L 470 270 L 525 325 L 600 370 L 660 415 L 740 460 L 800 500"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2"
            />
          </g>

          {/* 中心：三向电浆碰撞旋涡 (完全移除 VS 徽章) */}
          <circle cx="400" cy="240" r="28" fill="#ffffff" filter="url(#multiGlow)" opacity="0.9" />
          <circle cx="400" cy="240" r="16" fill="#fef08a" />
          <circle cx="400" cy="240" r="8" fill="#ffffff" />
        </svg>
      </div>
    );
  }

  /* 
    【4 队对战闪电】:
    - 十字 4 向闪电射线 (上红、左蓝、下黄、右绿)
    - 中心四色碰撞电弧旋涡 (NO VS BADGE)
  */
  return (
    <div className={`absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-visible z-20 ${className}`}>
      <svg className="w-full h-full overflow-visible" viewBox="0 0 600 400" preserveAspectRatio="none">
        <defs>
          <filter id="quadGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur1" />
            <feMerge>
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 向上红色 */}
        <g className="animate-lightning-crackle-red">
          <path d="M 300 0 L 297 50 L 305 100 L 296 150 L 300 200" fill="none" stroke="#f43f5e" strokeWidth="5" filter="url(#quadGlow)" />
          <path d="M 300 0 L 297 50 L 305 100 L 296 150 L 300 200" fill="none" stroke="#ffffff" strokeWidth="2" />
        </g>

        {/* 向下黄色 */}
        <g className="animate-lightning-crackle">
          <path d="M 300 200 L 303 250 L 295 300 L 304 350 L 300 400" fill="none" stroke="#eab308" strokeWidth="5" filter="url(#quadGlow)" />
          <path d="M 300 200 L 303 250 L 295 300 L 304 350 L 300 400" fill="none" stroke="#ffffff" strokeWidth="2" />
        </g>

        {/* 向左蓝色 */}
        <g className="animate-lightning-crackle">
          <path d="M 0 200 L 75 197 L 150 204 L 225 196 L 300 200" fill="none" stroke="#0284c7" strokeWidth="5" filter="url(#quadGlow)" />
          <path d="M 0 200 L 75 197 L 150 204 L 225 196 L 300 200" fill="none" stroke="#ffffff" strokeWidth="2" />
        </g>

        {/* 向右绿色 */}
        <g className="animate-lightning-crackle">
          <path d="M 300 200 L 375 203 L 450 196 L 525 204 L 600 200" fill="none" stroke="#10b981" strokeWidth="5" filter="url(#quadGlow)" />
          <path d="M 300 200 L 375 203 L 450 196 L 525 204 L 600 200" fill="none" stroke="#ffffff" strokeWidth="2" />
        </g>

        {/* 四向中心电浆碰撞核 */}
        <circle cx="300" cy="200" r="22" fill="#ffffff" filter="url(#quadGlow)" />
        <circle cx="300" cy="200" r="10" fill="#facc15" />
      </svg>
    </div>
  );
};
