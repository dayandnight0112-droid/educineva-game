import React, { useState, useRef, useEffect } from 'react';
import { CARTOON_AVATARS } from '../mockData';
import { CartoonAvatar } from '../types';
import { X, Sparkles, Check, Dices, ArrowRight, ShieldCheck } from 'lucide-react';

interface JoinModalProps {
  isOpen: boolean;
  suggestedPin?: string;
  onClose: () => void;
  onJoinSuccess: (data: {
    pin: string;
    nickname: string;
    avatar: CartoonAvatar;
  }) => Promise<{ success: boolean; error?: string } | void> | void;
}

const RANDOM_NICKNAMES = [
  '机智小明', '闪电阳阳', '阳光果果', '元气天天',
  '学霸小涵', '飞跃浩浩', '敏捷朵朵', '星空小宇'
];

export const JoinModal: React.FC<JoinModalProps> = ({
  isOpen,
  suggestedPin = '686868',
  onClose,
  onJoinSuccess,
}) => {
  // 6 位 PIN 码分别存储在数组中
  const [pinDigits, setPinDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [nickname, setNickname] = useState('');
  const [selectedAvatarId, setSelectedAvatarId] = useState<string>(CARTOON_AVATARS[0].id);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 6 个 input 的 ref 引用
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // 打开弹窗时自动聚焦第一个输入框，若检测到真实课堂 PIN 码则自动预填方便快速入场
  useEffect(() => {
    if (isOpen) {
      setErrorMessage('');
      setIsSubmitting(false);
      if (suggestedPin && suggestedPin.length === 6 && suggestedPin !== '686868') {
        setPinDigits((prev) => (prev.every((d) => !d) ? suggestedPin.split('') : prev));
      }
      const timer = setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isOpen, suggestedPin]);

  if (!isOpen) return null;

  // 处理单个方格输入
  const handleDigitChange = (index: number, value: string) => {
    setErrorMessage('');
    // 仅保留数字
    const numChar = value.replace(/\D/g, '');
    if (!numChar) {
      const newDigits = [...pinDigits];
      newDigits[index] = '';
      setPinDigits(newDigits);
      return;
    }

    // 若输入了单字符
    const lastChar = numChar.slice(-1);
    const newDigits = [...pinDigits];
    newDigits[index] = lastChar;
    setPinDigits(newDigits);

    // 自动聚焦下一个方格
    if (index < 5 && lastChar) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // 处理退格键与方向键
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!pinDigits[index] && index > 0) {
        // 当前格为空，退回上一个格子并清空
        const newDigits = [...pinDigits];
        newDigits[index - 1] = '';
        setPinDigits(newDigits);
        inputRefs.current[index - 1]?.focus();
      } else {
        const newDigits = [...pinDigits];
        newDigits[index] = '';
        setPinDigits(newDigits);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // 处理粘贴 6 位数字
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pastedData) return;

    const newDigits = [...pinDigits];
    for (let i = 0; i < 6; i++) {
      newDigits[i] = pastedData[i] || '';
    }
    setPinDigits(newDigits);

    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  // 快捷填入示例 PIN 码（便于离线快速走查）
  const handleQuickFillPin = (demoPin: string = '686868') => {
    const chars = demoPin.split('').slice(0, 6);
    setPinDigits(chars);
    setErrorMessage('');
    if (!nickname) {
      handleRandomNickname();
    }
    inputRefs.current[5]?.focus();
  };

  // 随机挑选一个可爱昵称
  const handleRandomNickname = () => {
    const randomName = RANDOM_NICKNAMES[Math.floor(Math.random() * RANDOM_NICKNAMES.length)];
    setNickname(randomName);
  };

  // 提交加入房间
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullPin = pinDigits.join('');

    if (fullPin.length !== 6) {
      setErrorMessage('请输入完整的 6 位数字房间 PIN 码');
      const firstEmpty = pinDigits.findIndex((d) => !d);
      if (firstEmpty !== -1) inputRefs.current[firstEmpty]?.focus();
      return;
    }

    const cleanName = nickname.trim();
    if (!cleanName) {
      setErrorMessage('请给自己起一个响亮的昵称吧！');
      return;
    }

    const avatar = CARTOON_AVATARS.find((a) => a.id === selectedAvatarId) || CARTOON_AVATARS[0];

    setIsSubmitting(true);
    try {
      const res = await onJoinSuccess({
        pin: fullPin,
        nickname: cleanName,
        avatar,
      });
      setIsSubmitting(false);
      if (res && res.success === false) {
        setErrorMessage(res.error || '加入房间失败，请核对 6 位 PIN 码');
      }
    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMessage(err?.message || '连接课堂房间失败');
    }
  };

  const selectedAvatar = CARTOON_AVATARS.find((a) => a.id === selectedAvatarId) || CARTOON_AVATARS[0];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      {/* 弹窗主体 */}
      <div
        className="relative bg-white w-full max-w-lg rounded-[32px] shadow-2xl border-4 border-pink-200 overflow-hidden my-auto transform transition-all animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 顶部俏皮装饰条 */}
        <div className="h-3 bg-gradient-to-r from-pink-500 via-amber-400 to-blue-500"></div>

        {/* 弹窗头部 */}
        <div className="px-6 pt-6 pb-2 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-pink-100 flex items-center justify-center text-xl shadow-xs">
              🎮
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                加入课堂游戏房间
              </h3>
              <p className="text-xs font-semibold text-gray-500">
                输入老师屏幕上的 6 位 PIN 码，即可与同学并肩作战！
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 flex items-center justify-center transition-colors cursor-pointer"
            title="关闭"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 pt-3 space-y-6">
          {/* 1. 6 位数字大方格 PIN 码输入区 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-black text-gray-800 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-pink-500"></span>
                <span>房间 PIN 码（6 位数字）</span>
              </label>
              <button
                type="button"
                onClick={() => handleQuickFillPin(suggestedPin)}
                className="text-xs font-extrabold text-pink-600 hover:text-pink-700 bg-pink-50 hover:bg-pink-100 px-2.5 py-1 rounded-full transition-colors cursor-pointer"
              >
                ⚡ 填入当前课堂码: {suggestedPin}
              </button>
            </div>

            {/* 6 个独立大方格 */}
            <div className="grid grid-cols-6 gap-2 sm:gap-3 py-1">
              {pinDigits.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => (inputRefs.current[idx] = el)}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleDigitChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  onPaste={handlePaste}
                  className={`w-full aspect-square text-center font-black text-2xl sm:text-3xl rounded-2xl transition-all duration-150 outline-none select-none ${
                    digit
                      ? 'bg-pink-50 border-2 border-pink-500 text-pink-600 shadow-sm shadow-pink-100'
                      : 'bg-gray-50 border-2 border-gray-200 text-gray-900 hover:border-gray-300'
                  } focus:bg-white focus:border-pink-500 focus:ring-4 focus:ring-pink-200/60`}
                />
              ))}
            </div>
            <p className="text-[11px] text-gray-400 font-medium">
              💡 提示：支持直接从老师处复制 6 位数字在此一键粘贴
            </p>
          </div>

          {/* 2. 学生昵称输入栏 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-black text-gray-800 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <span>你的英雄昵称</span>
              </label>
              <button
                type="button"
                onClick={handleRandomNickname}
                className="text-xs font-extrabold text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100 px-2.5 py-1 rounded-full flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Dices className="w-3.5 h-3.5" />
                <span>随机萌趣昵称</span>
              </button>
            </div>

            <div className="relative">
              <input
                type="text"
                maxLength={10}
                value={nickname}
                onChange={(e) => {
                  setNickname(e.target.value);
                  setErrorMessage('');
                }}
                placeholder="输入你的名字，如：小明"
                className="w-full px-4 py-3.5 rounded-2xl bg-gray-50 border-2 border-gray-200 focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-200/60 font-bold text-gray-800 placeholder-gray-400 outline-none text-base transition-all"
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">
                {nickname.length}/10
              </span>
            </div>
          </div>

          {/* 3. 卡通萌趣头像选择栏 */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-black text-gray-800 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span>挑选你的专属萌趣头像</span>
              </label>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                已选：{selectedAvatar.name}
              </span>
            </div>

            {/* 8 款卡通头像横向 / 栅格点选 */}
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5">
              {CARTOON_AVATARS.map((avatar) => {
                const isSelected = selectedAvatarId === avatar.id;
                return (
                  <button
                    key={avatar.id}
                    type="button"
                    onClick={() => setSelectedAvatarId(avatar.id)}
                    className={`group relative aspect-square rounded-2xl p-1.5 flex flex-col items-center justify-center transition-all cursor-pointer ${
                      avatar.bgColor
                    } ${
                      isSelected
                        ? 'ring-3 ring-pink-500 ring-offset-2 scale-105 shadow-md shadow-pink-200'
                        : 'border-2 border-transparent hover:scale-105 hover:shadow-xs opacity-75 hover:opacity-100'
                    }`}
                    title={avatar.name}
                  >
                    <img
                      src={avatar.src}
                      alt={avatar.name}
                      className="w-full h-full object-contain drop-shadow-xs"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    {/* 选中高亮小对勾 */}
                    {isSelected && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-pink-500 text-white flex items-center justify-center text-[10px] shadow-sm">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 错误提示条 */}
          {errorMessage && (
            <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-bold flex items-center gap-2 animate-in fade-in duration-200">
              <span className="text-base">⚠️</span>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* 4. 底部【🚀 立即加入】大号主操作按钮 */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-2xl text-white font-black text-lg flex items-center justify-center gap-2 shadow-xl transition-all cursor-pointer active:scale-98 ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:from-pink-600 hover:to-amber-600 shadow-pink-300/60 hover:shadow-pink-400/80 transform hover:-translate-y-0.5'
              }`}
            >
              {isSubmitting ? (
                <>
                  <span className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>正在极速连接课堂房间...</span>
                </>
              ) : (
                <>
                  <span className="text-xl">🚀</span>
                  <span>立即加入对战！</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>

          {/* 底部安全隔离保证提示 */}
          <div className="text-center pt-1">
            <p className="text-[11px] font-bold text-gray-400 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>学生专属安全答题端口 · 物理脱敏隔离</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
