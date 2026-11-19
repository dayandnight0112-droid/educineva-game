import { useState, useEffect, useRef, useCallback } from 'react';

export type CountdownPhase = 'idle' | 'timer1' | 'timer2' | 'ended';

interface UseDualCountdownProps {
  durationTimer1: number; // 倒计时 1 时长 (审题)
  durationTimer2: number; // 倒计时 2 时长 (作答)
  autoAdvance?: boolean;  // 倒计时 1 结束后是否自动流转到 倒计时 2
  onTimer1Complete?: () => void;
  onTimer2Complete?: () => void;
}

export function useDualCountdown({
  durationTimer1,
  durationTimer2,
  autoAdvance = true,
  onTimer1Complete,
  onTimer2Complete,
}: UseDualCountdownProps) {
  const [phase, setPhase] = useState<CountdownPhase>('idle');
  const [timeLeft, setTimeLeft] = useState<number>(durationTimer1);
  const [totalTime, setTotalTime] = useState<number>(durationTimer1);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 检查是否进入最后 5 秒紧急警示状态
  const isUrgent = timeLeft <= 5 && timeLeft > 0 && (phase === 'timer1' || phase === 'timer2');

  // 计算百分比进度 (0 - 100)
  const progressPercent = totalTime > 0 ? Math.max(0, Math.min(100, (timeLeft / totalTime) * 100)) : 0;

  // 清除定时器
  const clearCurrentTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // 启动倒计时 1 (审题阶段)
  const startTimer1 = useCallback((customDuration?: number) => {
    clearCurrentTimer();
    const duration = customDuration ?? durationTimer1;
    setPhase('timer1');
    setTimeLeft(duration);
    setTotalTime(duration);
    setIsRunning(true);
  }, [clearCurrentTimer, durationTimer1]);

  // 启动倒计时 2 (作答阶段)
  const startTimer2 = useCallback((customDuration?: number) => {
    clearCurrentTimer();
    const duration = customDuration ?? durationTimer2;
    setPhase('timer2');
    setTimeLeft(duration);
    setTotalTime(duration);
    setIsRunning(true);
  }, [clearCurrentTimer, durationTimer2]);

  // 暂停计时
  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  // 继续计时
  const resume = useCallback(() => {
    if (phase === 'timer1' || phase === 'timer2') {
      setIsRunning(true);
    }
  }, [phase]);

  // 重置
  const reset = useCallback(() => {
    clearCurrentTimer();
    setIsRunning(false);
    setPhase('idle');
    setTimeLeft(durationTimer1);
    setTotalTime(durationTimer1);
  }, [clearCurrentTimer, durationTimer1]);

  // 提前跳过 / 立即结束当前阶段
  const skip = useCallback(() => {
    if (phase === 'timer1') {
      clearCurrentTimer();
      setIsRunning(false);
      onTimer1Complete?.();
      if (autoAdvance) {
        startTimer2();
      }
    } else if (phase === 'timer2') {
      clearCurrentTimer();
      setIsRunning(false);
      setPhase('ended');
      setTimeLeft(0);
      onTimer2Complete?.();
    }
  }, [phase, clearCurrentTimer, onTimer1Complete, autoAdvance, startTimer2, onTimer2Complete]);

  // 主计时循环
  useEffect(() => {
    if (!isRunning || (phase !== 'timer1' && phase !== 'timer2')) {
      clearCurrentTimer();
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearCurrentTimer();
          // 处理当前倒计时结束
          if (phase === 'timer1') {
            onTimer1Complete?.();
            if (autoAdvance) {
              // 自动切换进入 倒计时 2
              setTimeout(() => {
                startTimer2();
              }, 100);
            } else {
              setIsRunning(false);
            }
          } else if (phase === 'timer2') {
            setIsRunning(false);
            setPhase('ended');
            onTimer2Complete?.();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearCurrentTimer();
    };
  }, [isRunning, phase, clearCurrentTimer, onTimer1Complete, autoAdvance, startTimer2, onTimer2Complete]);

  return {
    phase,
    timeLeft,
    totalTime,
    isRunning,
    isUrgent,
    progressPercent,
    startTimer1,
    startTimer2,
    pause,
    resume,
    reset,
    skip,
  };
}
