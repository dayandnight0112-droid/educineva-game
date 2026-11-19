import React, { useState, useEffect } from 'react';
import { MOCK_QUIZ_QUESTIONS, PRESET_TEAMS } from '../mockData';
import { CartoonAvatar, StudentMistakeItem } from '../types';
import {
  Check,
  X,
  Tv,
  Smartphone,
  ArrowRight,
} from 'lucide-react';

export interface LiveDesensitizedQuestion {
  questionId: string;
  index: number;
  total: number;
  questionText: string;
  options: Record<string, string> | any[];
  timeLimit?: number;
}

interface QuizArenaProps {
  roomName: string;
  pin: string;
  studentName: string;
  avatar: CartoonAvatar;
  teamId: string;
  initialMode?: 'pad' | 'game';
  liveQuestion?: LiveDesensitizedQuestion | null;
  liveStage?: string | null;
  liveTimeLeft?: number;
  onSubmitLiveAnswer?: (
    questionId: string,
    selectedKey: 'A' | 'B' | 'C' | 'D'
  ) => Promise<{ isCorrect: boolean; pointsEarned: number; currentScore: number } | null>;
  onCompleteQuiz: (summary: {
    score: number;
    correctCount: number;
    wrongCount: number;
    mistakes: StudentMistakeItem[];
  }) => void;
  onBackToLobby: () => void;
}

export const QuizArena: React.FC<QuizArenaProps> = ({
  pin,
  studentName,
  teamId,
  initialMode = 'pad',
  liveQuestion,
  liveStage,
  liveTimeLeft,
  onSubmitLiveAnswer,
  onCompleteQuiz,
}) => {
  // 模式切换：'pad' (模式A: 手机手柄答题) | 'game' (模式B: 独立游戏容器)
  const [activeMode, setActiveMode] = useState<'pad' | 'game'>(initialMode);

  // 题目流转状态
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [liveAnswerResult, setLiveAnswerResult] = useState<{
    isCorrect: boolean;
    pointsEarned: number;
  } | null>(null);

  // 积分与答题统计
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  // 真实记录玩家在本次答题中的错题清单
  const [userMistakes, setUserMistakes] = useState<StudentMistakeItem[]>([]);

  // 离线模拟后台倒计时（用于自动揭晓，默认 15 秒）
  const [simulatedTimeLeft, setSimulatedTimeLeft] = useState(15);
  const [isSimulatedTimerRunning, setIsSimulatedTimerRunning] = useState(true);

  const isLiveMode = !!liveQuestion;
  const isPromptPhase = isLiveMode && liveStage === 'question-prompt';
  const mockQ = MOCK_QUIZ_QUESTIONS[currentIndex] || MOCK_QUIZ_QUESTIONS[0];

  const displayQNumber = isLiveMode ? liveQuestion.index + 1 : mockQ.number;
  const displayQTotal = isLiveMode ? liveQuestion.total : mockQ.total;
  const displayPoints = 100;

  // 当收到母体下发的新题目时，重置当前题目的选项与揭晓状态
  useEffect(() => {
    if (liveQuestion) {
      setSelectedOption(null);
      setIsRevealed(false);
      setLiveAnswerResult(null);
      setSimulatedTimeLeft(liveTimeLeft || liveQuestion.timeLimit || 15);
      setIsSimulatedTimerRunning(true);
    }
  }, [liveQuestion?.questionId]);

  // 当老师大屏切换阶段（审题期 -> 选项展开期 -> 统计揭晓期 -> 排行榜）时，手机端实时同步
  useEffect(() => {
    if (liveStage === 'result-stats' || liveStage === 'scoreboard') {
      setIsSimulatedTimerRunning(false);
      setIsRevealed(true);
    } else if (liveStage === 'question-prompt') {
      setIsRevealed(false);
      setSimulatedTimeLeft(liveTimeLeft || 15);
      setIsSimulatedTimerRunning(true);
    } else if (liveStage === 'question-options') {
      setIsRevealed(false);
      setSimulatedTimeLeft(liveTimeLeft || liveQuestion?.timeLimit || 15);
      setIsSimulatedTimerRunning(true);
    }
  }, [liveStage, liveTimeLeft, liveQuestion?.timeLimit]);

  // 离线模式下切换题目时重置选项与状态
  useEffect(() => {
    if (!isLiveMode) {
      setSelectedOption(null);
      setIsRevealed(false);
      setSimulatedTimeLeft(mockQ.timeLimit);
      setIsSimulatedTimerRunning(true);
    }
  }, [currentIndex, isLiveMode]);

  // 倒计时器
  useEffect(() => {
    if (!isSimulatedTimerRunning || isRevealed) return;

    if (simulatedTimeLeft <= 0) {
      if (!isLiveMode) {
        handleRevealResult();
      }
      return;
    }

    const timer = setInterval(() => {
      setSimulatedTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [simulatedTimeLeft, isSimulatedTimerRunning, isRevealed, isLiveMode]);

  // 1. 玩家点击选项
  const handleSelectOption = async (idx: number) => {
    if (isPromptPhase || selectedOption !== null || isRevealed) return; // 审题期、已提交或已揭晓则不可再按
    setSelectedOption(idx);

    const optionKeys: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];
    const selectedKey = optionKeys[idx];

    if (isLiveMode && onSubmitLiveAnswer && liveQuestion) {
      const feedback = await onSubmitLiveAnswer(liveQuestion.questionId, selectedKey);
      if (feedback) {
        setLiveAnswerResult({
          isCorrect: feedback.isCorrect,
          pointsEarned: feedback.pointsEarned,
        });
        setScore(feedback.currentScore);
        if (feedback.isCorrect) {
          setCorrectCount((c) => c + 1);
        } else {
          setWrongCount((w) => w + 1);
        }
      }
    }
  };

  // 2. 模拟时间到或全员回答完毕 -> 触发揭晓
  const handleRevealResult = () => {
    if (isRevealed) return;
    setIsSimulatedTimerRunning(false);
    setIsRevealed(true);

    if (isLiveMode) return;

    const isCorrect = selectedOption === mockQ.correctOptionIndex;
    if (isCorrect) {
      setScore((s) => s + mockQ.points);
      setCorrectCount((c) => c + 1);
    } else {
      setWrongCount((w) => w + 1);

      const optionKeys = ['A', 'B', 'C', 'D'];
      const studentAnsText =
        selectedOption !== null
          ? `${optionKeys[selectedOption]}. ${mockQ.options[selectedOption].text}`
          : '未在倒计时内作答';
      const correctAnsText = `${optionKeys[mockQ.correctOptionIndex]}. ${mockQ.options[mockQ.correctOptionIndex].text}`;

      setUserMistakes((prev) => [
        ...prev,
        {
          questionNumber: mockQ.number,
          prompt: mockQ.prompt,
          studentAnswer: studentAnsText,
          correctAnswer: correctAnsText,
          explanation: mockQ.explanation,
        },
      ]);
    }
  };

  // 3. 模拟老师在讲台按下“下一题”
  const handleTeacherNextQuestion = () => {
    if (currentIndex < MOCK_QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      onCompleteQuiz({
        score,
        correctCount,
        wrongCount,
        mistakes: userMistakes,
      });
    }
  };

  // 4 个巨大彩色触摸方块配置（左上、右上、左下、右下）
  // 经典 Kahoot 4 色几何符号：左上红(▲)、右上蓝(◆)、左下黄(●)、右下绿(■)
  const OPTION_BLOCKS = [
    {
      index: 0,
      position: '左上',
      key: 'A',
      symbol: '▲',
      defaultBg: 'bg-rose-500 active:bg-rose-600',
      activeRing: 'ring-8 ring-rose-200 shadow-rose-500/50',
    },
    {
      index: 1,
      position: '右上',
      key: 'B',
      symbol: '◆',
      defaultBg: 'bg-blue-500 active:bg-blue-600',
      activeRing: 'ring-8 ring-blue-200 shadow-blue-500/50',
    },
    {
      index: 2,
      position: '左下',
      key: 'C',
      symbol: '●',
      defaultBg: 'bg-amber-400 active:bg-amber-500',
      activeRing: 'ring-8 ring-amber-200 shadow-amber-500/50',
    },
    {
      index: 3,
      position: '右下',
      key: 'D',
      symbol: '■',
      defaultBg: 'bg-emerald-500 active:bg-emerald-600',
      activeRing: 'ring-8 ring-emerald-200 shadow-emerald-500/50',
    },
  ];

  const currentTeam = PRESET_TEAMS[teamId] || PRESET_TEAMS.blue;

  return (
    <div className="w-full flex-1 flex flex-col h-[calc(100vh-100px)] max-h-screen px-3 sm:px-6 py-2 select-none overflow-hidden">
      {/* 顶部极简栏：仅显示题数，题目和倒计时在老师大屏幕上 */}
      <div className="w-full max-w-4xl mx-auto flex items-center justify-between py-1.5 px-3 mb-1">
        {/* 左侧：极简题数指示胶囊 */}
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-slate-900 text-white font-black text-sm sm:text-base shadow-md border-2 border-slate-700">
            <span className="text-pink-400">Q</span>
            <span>{displayQNumber < 10 ? `0${displayQNumber}` : displayQNumber}</span>
            <span className="text-slate-500 font-normal">/</span>
            <span className="text-slate-400 text-xs sm:text-sm font-bold">
              {displayQTotal < 10 ? `0${displayQTotal}` : displayQTotal}
            </span>
          </div>

          {/* 状态轻提示 */}
          <div className="text-xs font-bold text-slate-600 hidden sm:inline-block">
            {isPromptPhase && `⏳ 正在审题期 (${simulatedTimeLeft}s)：请抬头看老师大屏幕思考答案...`}
            {!isPromptPhase && selectedOption === null && !isRevealed && `👀 请看老师大屏幕 4 个选项 (${simulatedTimeLeft}s)，点击下方同位置色块作答`}
            {selectedOption !== null && !isRevealed && '🔒 答案已实时上报母体，等待大屏倒计时揭晓...'}
            {isRevealed && '📢 答案已揭晓！等待老师大屏切换下一题...'}
          </div>
        </div>

        {/* 右侧：模式切换与当前阵营 */}
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-black ${currentTeam.badgeBg}`}>
            {currentTeam.icon} {currentTeam.shortName} · {score}分
          </span>
          {/* 双模式切换按钮 */}
          <div className="inline-flex p-0.5 bg-slate-200/80 rounded-xl">
            <button
              onClick={() => setActiveMode('pad')}
              className={`px-2.5 py-1 rounded-lg text-xs font-black flex items-center gap-1 transition-all cursor-pointer ${
                activeMode === 'pad' ? 'bg-pink-600 text-white shadow-xs' : 'text-slate-600'
              }`}
            >
              <Smartphone className="w-3 h-3" />
              <span>手柄</span>
            </button>
            <button
              onClick={() => setActiveMode('game')}
              className={`px-2.5 py-1 rounded-lg text-xs font-black flex items-center gap-1 transition-all cursor-pointer ${
                activeMode === 'game' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600'
              }`}
            >
              <Tv className="w-3 h-3" />
              <span>游戏</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 模式 A：手柄答题器模式（2x2 宫格占满屏幕 90%，与老师大屏 4 个选项同位置 1:1 对齐） */}
      {/* ========================================================================= */}
      {activeMode === 'pad' && (
        <div className="w-full max-w-4xl mx-auto flex-1 flex flex-col justify-center min-h-0 relative">
          {/* 阶段 2A 审题期悬浮遮罩提示：大屏尚未翻开选项时引导看大屏思考 */}
          {isPromptPhase && (
            <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 z-30 pointer-events-none flex justify-center">
              <div className="bg-slate-900/95 backdrop-blur-md text-white px-6 py-5 rounded-3xl border-2 border-amber-400/70 shadow-2xl text-center max-w-md space-y-1.5 animate-in zoom-in-95 duration-200">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black">
                  <span>⏳ 阶段 2A · 题干审题中 ({simulatedTimeLeft}s)</span>
                </div>
                <p className="text-base sm:text-lg font-black text-white">
                  👀 请抬头看老师大屏幕审读题目
                </p>
                <p className="text-xs text-slate-300 font-semibold">
                  大屏翻开四色选项后，手机 4 个同位置按键将同步解锁！
                </p>
              </div>
            </div>
          )}

          {/* 超时未作答提示浮层 */}
          {isRevealed && selectedOption === null && (
            <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 z-30 pointer-events-none flex justify-center">
              <div className="bg-slate-900/95 backdrop-blur-md text-white px-6 py-4 rounded-3xl border-2 border-rose-400/60 shadow-2xl text-center max-w-md space-y-1">
                <p className="text-base sm:text-lg font-black text-rose-300">
                  ⏰ 本题未在倒计时内作答
                </p>
                <p className="text-xs text-slate-300 font-semibold">
                  请看老师大屏幕答案揭晓，准备迎接下一题！
                </p>
              </div>
            </div>
          )}

          {/* 4 个巨大彩色触摸选项块：左上(A ▲)、右上(B ◆)、左下(C ●)、右下(D ■) (2行2列，占满 90% 空间) */}
          <div className="grid grid-cols-2 grid-rows-2 gap-3 sm:gap-5 w-full h-[76vh] sm:h-[80vh] p-1">
            {OPTION_BLOCKS.map((block) => {
              const isSelected = selectedOption === block.index;
              const isThisCorrect = isLiveMode
                ? isSelected && !!liveAnswerResult?.isCorrect
                : block.index === mockQ.correctOptionIndex;
              const hasAnswered = selectedOption !== null;

              // 样式计算
              let bgStyle = block.defaultBg;
              let extraClasses = 'hover:scale-[1.01] active:scale-95 cursor-pointer shadow-xl';
              const iconContent = block.symbol;

              if (isPromptPhase) {
                extraClasses = 'opacity-50 scale-[0.99] cursor-wait filter saturate-75';
              } else if (!isRevealed) {
                // 作答中状态
                if (hasAnswered) {
                  if (isSelected) {
                    // 选中的选项：保持高亮发光，周围光圈
                    bgStyle = block.defaultBg;
                    extraClasses = `${block.activeRing} scale-[1.02] shadow-2xl brightness-110 z-10`;
                  } else {
                    // 其他选项：半透明弱化
                    extraClasses = 'opacity-20 scale-98 pointer-events-none filter grayscale-40';
                  }
                }
              } else {
                // 倒计时结束 / 揭晓状态：
                if (isSelected) {
                  if (isThisCorrect) {
                    // 玩家答对：变成亮绿色并打勾
                    bgStyle = 'bg-emerald-500';
                    extraClasses = 'ring-8 ring-emerald-200 shadow-2xl shadow-emerald-500/50 scale-[1.03] z-10 animate-bounce-short';
                  } else {
                    // 玩家答错：变成亮红色并打叉
                    bgStyle = 'bg-rose-600';
                    extraClasses = 'ring-8 ring-rose-200 shadow-2xl shadow-rose-500/50 scale-[1.02] z-10';
                  }
                } else if (!isLiveMode && isThisCorrect) {
                  // 离线演示中：若玩家没选但这是正确答案时提示
                  bgStyle = 'bg-emerald-500';
                  extraClasses = 'ring-4 ring-emerald-300 scale-[1.01]';
                } else {
                  // 其他无关选项：直接自动半透明弱化
                  extraClasses = 'opacity-15 pointer-events-none filter grayscale';
                }
              }

              return (
                <button
                  key={block.index}
                  onClick={() => handleSelectOption(block.index)}
                  disabled={isPromptPhase || hasAnswered || isRevealed}
                  className={`relative w-full h-full rounded-[28px] sm:rounded-[40px] flex flex-col items-center justify-center text-white transition-all duration-300 overflow-hidden select-none border-4 border-white/20 ${bgStyle} ${extraClasses}`}
                >
                  {/* 背景微光泽质感 */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/15 to-transparent pointer-events-none"></div>

                  {/* 核心中央巨大几何符号 / 勾叉图标 */}
                  <div className="relative z-10 flex flex-col items-center justify-center">
                    {isRevealed && isSelected ? (
                      isThisCorrect ? (
                        // 答对：亮绿中展示巨大白勾
                        <div className="flex flex-col items-center">
                          <Check className="w-20 h-20 sm:w-28 sm:h-28 stroke-[3.5] text-white drop-shadow-lg animate-in zoom-in-75 duration-200" />
                          <span className="text-sm sm:text-xl font-black mt-1 tracking-wider bg-white/20 px-4 py-0.5 rounded-full">
                            🎉 答对啦 +{displayPoints}
                          </span>
                        </div>
                      ) : (
                        // 答错：亮红中展示巨大白叉
                        <div className="flex flex-col items-center">
                          <X className="w-20 h-20 sm:w-28 sm:h-28 stroke-[3.5] text-white drop-shadow-lg animate-in zoom-in-75 duration-200" />
                          <span className="text-sm sm:text-xl font-black mt-1 tracking-wider bg-white/20 px-4 py-0.5 rounded-full">
                            💪 答错了
                          </span>
                        </div>
                      )
                    ) : !isLiveMode && isRevealed && isThisCorrect ? (
                      // 玩家没选但这是正确答案时提示
                      <div className="flex flex-col items-center">
                        <Check className="w-16 h-16 sm:w-20 sm:h-20 stroke-[3] text-white/90 drop-shadow-md" />
                        <span className="text-xs sm:text-base font-black mt-1 tracking-wide bg-white/20 px-3 py-0.5 rounded-full">
                          正确答案
                        </span>
                      </div>
                    ) : (
                      // 正常作答状态展示经典几何大图标
                      <span className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tight drop-shadow-md transform transition-transform duration-200">
                        {iconContent}
                      </span>
                    )}
                  </div>

                  {/* 左上角与老师大屏 1:1 对应的位置与选项字母标 (左上 · 选项 A 等) */}
                  <span className="absolute top-3 left-4 text-xs sm:text-sm font-black text-white/85 tracking-wider uppercase bg-black/15 px-2.5 py-0.5 rounded-full">
                    {block.position} · 选项 {block.key}
                  </span>

                  {/* 选中等待中状态角标 */}
                  {isSelected && !isRevealed && (
                    <div className="absolute bottom-3 sm:bottom-5 px-3 sm:px-5 py-1 sm:py-1.5 rounded-full bg-white text-slate-900 font-black text-xs sm:text-sm shadow-md animate-pulse">
                      已提交 ✓ 等待大屏揭晓
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* 底部状态与离线调试控制浮条 */}
          <div className="mt-2 flex items-center justify-between bg-slate-900/90 text-white rounded-2xl py-2 px-3 border border-slate-700 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-amber-400 font-bold">
                {isLiveMode ? '📡 母体实时联机中:' : '📢 老师投影大屏幕模拟:'}
              </span>
              <span className="text-slate-300 font-medium">
                {isPromptPhase
                  ? `【老师大屏审题倒计时 ${simulatedTimeLeft}s · 即将展开选项】`
                  : isRevealed
                  ? '【大屏已揭晓本题统计与排行榜，等待老师切换下一题】'
                  : `【抢答倒计时 00:${simulatedTimeLeft < 10 ? `0${simulatedTimeLeft}` : simulatedTimeLeft} · 点击对应色块作答】`}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {!isRevealed ? (
                <button
                  onClick={handleRevealResult}
                  className="px-3 py-1 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black transition-all cursor-pointer shadow-xs"
                >
                  ⚡ 模拟时间到 / 揭晓
                </button>
              ) : (
                !isLiveMode && (
                  <button
                    onClick={handleTeacherNextQuestion}
                    className="px-4 py-1 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 text-white font-black transition-all cursor-pointer shadow-md flex items-center gap-1.5 animate-pulse"
                  >
                    <span>老师按：下一题 ➔</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 模式 B：独立游戏容器模式 */}
      {/* ========================================================================= */}
      {activeMode === 'game' && (
        <div className="w-full max-w-4xl mx-auto flex-1 flex flex-col justify-center min-h-0 bg-slate-900 rounded-3xl border-4 border-indigo-500/40 shadow-2xl overflow-hidden">
          <div className="bg-slate-950 px-5 py-2.5 border-b border-slate-800 flex items-center justify-between text-xs text-white">
            <span className="font-bold text-indigo-400">🎮 极速赛车挑战 (Game Container)</span>
            <div className="flex items-center gap-4 font-black">
              <span className="text-blue-400">蓝队 VS 红队</span>
            </div>
          </div>
          <div className="relative flex-1 min-h-[460px] bg-slate-950 flex flex-col items-center justify-center p-2">
            <iframe
              src={`./mock-racing-game.html?pin=${pin}&name=${encodeURIComponent(studentName)}`}
              title="Educineva Racing Game"
              className="w-full h-full rounded-2xl border border-slate-800 bg-slate-900"
            />
            <div className="absolute bottom-4 right-4">
              <button
                onClick={() => setActiveMode('pad')}
                className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-black text-xs shadow-lg cursor-pointer"
              >
                📱 切回手柄答题器
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
