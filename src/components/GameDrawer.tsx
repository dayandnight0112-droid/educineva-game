import React, { useState, useEffect } from 'react';
import {
  X,
  Info,
  Users,
  ChevronDown,
  Plus,
  Minus,
  Sparkles,
  GripVertical,
  ArrowRightLeft,
  UserCheck,
  Check,
  Flame,
} from 'lucide-react';
import { Game, QuestionPaper, TeamConfig, Student, RoomConfig } from '../types';
import {
  QUESTION_PAPERS,
  QUESTION_RULES,
  CHARACTER_OPTIONS,
  DEFAULT_TEAMS,
  AVAILABLE_TEAM_PRESETS,
  INITIAL_UNASSIGNED,
} from '../mock/data';

interface GameDrawerProps {
  game: Game | null;
  isOpen: boolean;
  onClose: () => void;
  onCreateRoom: (config: RoomConfig) => void;
  papers?: QuestionPaper[];
  onJumpToQuestions?: () => void;
}

export const GameDrawer: React.FC<GameDrawerProps> = ({
  game,
  isOpen,
  onClose,
  onCreateRoom,
  papers,
  onJumpToQuestions,
}) => {
  const activePapers = papers && papers.length > 0 ? papers : QUESTION_PAPERS;

  // Form State
  const [roomName, setRoomName] = useState('一年级数学课堂');
  const [selectedPaperId, setSelectedPaperId] = useState('p1');
  const [durationMinutes, setDurationMinutes] = useState(5);
  const [rounds, setRounds] = useState(3);
  const [isTeamMode, setIsTeamMode] = useState(true);
  const [playersPerTeam, setPlayersPerTeam] = useState(4);
  const [questionRule, setQuestionRule] = useState('random-5-norepeat');

  // Teams & Student Roster State
  const [teams, setTeams] = useState<TeamConfig[]>(DEFAULT_TEAMS);
  const [unassignedStudents, setUnassignedStudents] = useState<Student[]>(INITIAL_UNASSIGNED);

  // Drag and Drop state
  const [draggedStudent, setDraggedStudent] = useState<{
    student: Student;
    sourceTeamId: string | 'unassigned';
  } | null>(null);
  const [dragOverTeamId, setDragOverTeamId] = useState<string | null>(null);

  // Quick feedback toast / message
  const [transferToast, setTransferToast] = useState<string | null>(null);

  // Ensure selectedPaperId always points to an existing paper
  useEffect(() => {
    if (activePapers.length > 0 && !activePapers.some((p) => p.id === selectedPaperId)) {
      setSelectedPaperId(activePapers[0].id);
    }
  }, [activePapers, selectedPaperId]);

  const currentPaper =
    activePapers.find((p) => p.id === selectedPaperId) || activePapers[0];
  const currentPaperTotalQuestions = currentPaper?.questions
    ? currentPaper.questions.length
    : currentPaper?.questionCount || 0;

  // Reset or update default when game changes
  useEffect(() => {
    if (game) {
      const paperLabel = currentPaper
        ? `${currentPaper.grade}${currentPaper.subject}课堂`
        : '一年级数学课堂';
      setRoomName(`${game.name} · ${paperLabel}`);
      setDurationMinutes(game.defaultDuration || 5);
      setRounds(game.defaultRounds || 3);
    }
  }, [game]);

  if (!game) return null;

  const showToast = (msg: string) => {
    setTransferToast(msg);
    setTimeout(() => setTransferToast(null), 2500);
  };

  // Add / Remove Teams
  const handleAddTeam = () => {
    if (teams.length >= 4) {
      showToast('目前最多支持 4 支对抗队伍');
      return;
    }
    const nextPreset = AVAILABLE_TEAM_PRESETS[teams.length];
    if (nextPreset) {
      const newTeam: TeamConfig = {
        ...nextPreset,
        students: [],
      };
      setTeams([...teams, newTeam]);
      showToast(`已增设 ${newTeam.name}`);
    }
  };

  const handleRemoveTeam = (teamId: string) => {
    if (teams.length <= 2) {
      showToast('分队模式至少需要保留 2 支队伍');
      return;
    }
    const teamToRemove = teams.find((t) => t.id === teamId);
    if (!teamToRemove) return;

    // Move any existing students back to unassigned pool
    if (teamToRemove.students.length > 0) {
      setUnassignedStudents((prev) => [...prev, ...teamToRemove.students]);
    }
    setTeams(teams.filter((t) => t.id !== teamId));
    showToast(`已移除 ${teamToRemove.name}，学员暂移至待分配池`);
  };

  // Character selector for team
  const handleCharacterChange = (teamId: string, charName: string) => {
    const charOption = CHARACTER_OPTIONS.find((c) => c.name === charName);
    setTeams(
      teams.map((t) =>
        t.id === teamId
          ? {
              ...t,
              character: charName,
              characterAvatar: charOption?.avatar || t.characterAvatar,
            }
          : t
      )
    );
  };

  // Drag and Drop Logic
  const handleDragStart = (
    e: React.DragEvent,
    student: Student,
    sourceTeamId: string | 'unassigned'
  ) => {
    setDraggedStudent({ student, sourceTeamId });
    e.dataTransfer.setData('text/plain', JSON.stringify({ student, sourceTeamId }));
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, targetTeamId: string | 'unassigned') => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverTeamId !== targetTeamId) {
      setDragOverTeamId(targetTeamId);
    }
  };

  const handleDragLeave = () => {
    setDragOverTeamId(null);
  };

  const handleDrop = (e: React.DragEvent, targetTeamId: string | 'unassigned') => {
    e.preventDefault();
    setDragOverTeamId(null);
    if (!draggedStudent) return;

    const { student, sourceTeamId } = draggedStudent;
    if (sourceTeamId === targetTeamId) {
      setDraggedStudent(null);
      return;
    }

    // 1. Remove from source
    if (sourceTeamId === 'unassigned') {
      setUnassignedStudents((prev) => prev.filter((s) => s.id !== student.id));
    } else {
      setTeams((prev) =>
        prev.map((t) =>
          t.id === sourceTeamId
            ? { ...t, students: t.students.filter((s) => s.id !== student.id) }
            : t
        )
      );
    }

    // 2. Add to target
    if (targetTeamId === 'unassigned') {
      setUnassignedStudents((prev) => [...prev, student]);
      showToast(`已将【${student.name}】移至未分配学生池`);
    } else {
      const targetTeam = teams.find((t) => t.id === targetTeamId);
      setTeams((prev) =>
        prev.map((t) =>
          t.id === targetTeamId
            ? { ...t, students: [...t.students, student] }
            : t
        )
      );
      showToast(`已将【${student.name}】调动至【${targetTeam?.name}】`);
    }

    setDraggedStudent(null);
  };

  // Quick transfer button (e.g. swap from Red to Blue or Blue to Red)
  const handleQuickMove = (student: Student, fromTeamId: string) => {
    // Find next available team
    const otherTeams = teams.filter((t) => t.id !== fromTeamId);
    if (otherTeams.length === 0) return;
    const targetTeam = otherTeams[0];

    // Remove from source
    setTeams((prev) =>
      prev.map((t) => {
        if (t.id === fromTeamId) {
          return { ...t, students: t.students.filter((s) => s.id !== student.id) };
        }
        if (t.id === targetTeam.id) {
          return { ...t, students: [...t.students, student] };
        }
        return t;
      })
    );
    showToast(`已将【${student.name}】调往【${targetTeam.name}】`);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateRoom({
      gameId: game.id,
      roomName,
      questionPaperId: selectedPaperId,
      durationMinutes,
      rounds,
      isTeamMode,
      teamCount: teams.length,
      playersPerTeam,
      questionRule,
      teams,
      unassignedStudents,
    });
  };

  return (
    <>
      {/* Background Dim Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/25 backdrop-blur-[1px] z-40 transition-opacity duration-200"
        />
      )}

      {/* Slide-out Drawer Panel */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-full max-w-[580px] bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header (Exact Match to 2.png) */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between shrink-0 bg-white">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-10 rounded-xl overflow-hidden border border-gray-200/80 shadow-2xs shrink-0">
              <img
                src={game.coverUrl}
                alt={game.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 tracking-tight leading-tight">
                {game.name}
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                {game.tag === '课中' ? '课中游戏' : '课外游戏'} · 创建课堂房间
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            title="关闭设定"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
          {/* Lavender Info Alert (Exact Match to 2.png) */}
          <div className="bg-[#f5eeff] text-[#6b21a8] text-xs font-medium py-2.5 px-4 rounded-xl flex items-center gap-2 border border-purple-100/60 shadow-2xs">
            <Info className="w-4 h-4 text-[#7c3aed] shrink-0" />
            <span>每个房间独立保存设定与进度</span>
          </div>

          {/* Toast Notification */}
          {transferToast && (
            <div className="bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl px-4 py-2 text-xs flex items-center gap-2 animate-fade-in">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>{transferToast}</span>
            </div>
          )}

          {/* Section 1: 基本设定 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 bg-[#e60067] rounded-full" />
              <h3 className="text-sm font-bold text-gray-900 tracking-tight">
                基本设定
              </h3>
            </div>

            {/* 房间名称 */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700">
                房间名称
              </label>
              <input
                type="text"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="例如：一年级数学课堂"
                className="w-full px-4 py-2.5 bg-white border border-gray-200 hover:border-gray-300 focus:border-[#e60067] focus:ring-2 focus:ring-[#fde7f0] rounded-xl text-sm text-gray-900 outline-none transition"
              />
            </div>

            {/* 题目文件 */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-gray-700">
                  题目文件
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-gray-400">
                    {currentPaper?.grade} · {currentPaper?.subject} · {currentPaperTotalQuestions} 道题
                  </span>
                  {onJumpToQuestions && (
                    <button
                      type="button"
                      onClick={onJumpToQuestions}
                      className="text-[11px] font-semibold text-[#e60067] hover:underline cursor-pointer"
                    >
                      管理题库 →
                    </button>
                  )}
                </div>
              </div>
              <div className="relative">
                <select
                  value={selectedPaperId}
                  onChange={(e) => {
                    const nextId = e.target.value;
                    setSelectedPaperId(nextId);
                    const nextPaper = activePapers.find((p) => p.id === nextId);
                    if (nextPaper && game && roomName.startsWith(`${game.name} · `)) {
                      setRoomName(`${game.name} · ${nextPaper.grade}${nextPaper.subject}课堂`);
                    }
                  }}
                  className="w-full appearance-none px-4 py-2.5 bg-white border border-gray-200 hover:border-gray-300 focus:border-[#e60067] focus:ring-2 focus:ring-[#fde7f0] rounded-xl text-sm text-gray-900 outline-none cursor-pointer transition pr-10"
                >
                  {activePapers.map((paper) => {
                    const count = paper.questions ? paper.questions.length : paper.questionCount;
                    return (
                      <option key={paper.id} value={paper.id}>
                        {paper.name} ({paper.grade} · {paper.subject} · {count}题)
                      </option>
                    );
                  })}
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              {currentPaper?.questions && currentPaper.questions.length > 0 && (
                <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100 text-[11px] text-gray-500 space-y-1">
                  <div className="font-semibold text-gray-700 flex items-center justify-between">
                    <span>📋 已选题库预览（共 {currentPaper.questions.length} 题）：</span>
                    <span className="text-[#e60067] font-bold">开房后同步下发至老师大屏</span>
                  </div>
                  <div className="truncate text-gray-500">
                    Q1: {currentPaper.questions[0]?.stem}
                    {currentPaper.questions[1] ? ` ｜ Q2: ${currentPaper.questions[1].stem}` : ''}
                  </div>
                </div>
              )}
            </div>

            {/* Row: 每轮时长 & 游戏轮数 */}
            <div className="grid grid-cols-2 gap-3.5">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-700">
                  每轮时长
                </label>
                <div className="relative">
                  <select
                    value={durationMinutes}
                    onChange={(e) => setDurationMinutes(Number(e.target.value))}
                    className="w-full appearance-none px-4 py-2.5 bg-white border border-gray-200 hover:border-gray-300 focus:border-[#e60067] focus:ring-2 focus:ring-[#fde7f0] rounded-xl text-sm text-gray-900 outline-none cursor-pointer transition pr-10"
                  >
                    <option value={3}>3 分钟</option>
                    <option value={5}>5 分钟</option>
                    <option value={8}>8 分钟</option>
                    <option value={10}>10 分钟</option>
                    <option value={15}>15 分钟</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-700">
                  游戏轮数
                </label>
                <div className="relative">
                  <select
                    value={rounds}
                    onChange={(e) => setRounds(Number(e.target.value))}
                    className="w-full appearance-none px-4 py-2.5 bg-white border border-gray-200 hover:border-gray-300 focus:border-[#e60067] focus:ring-2 focus:ring-[#fde7f0] rounded-xl text-sm text-gray-900 outline-none cursor-pointer transition pr-10"
                  >
                    <option value={1}>1 轮</option>
                    <option value={2}>2 轮</option>
                    <option value={3}>3 轮</option>
                    <option value={5}>5 轮</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Row: 队伍数量 & 每队人数 */}
            <div className="grid grid-cols-2 gap-3.5">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-700">
                  队伍数量
                </label>
                <div className="relative">
                  <select
                    value={teams.length}
                    onChange={(e) => {
                      const count = Number(e.target.value);
                      if (count > teams.length) {
                        const needed = count - teams.length;
                        const newTeams = [...teams];
                        for (let i = 0; i < needed; i++) {
                          const preset = AVAILABLE_TEAM_PRESETS[newTeams.length];
                          if (preset) newTeams.push({ ...preset, students: [] });
                        }
                        setTeams(newTeams);
                      } else if (count < teams.length) {
                        const keptTeams = teams.slice(0, count);
                        const removed = teams.slice(count);
                        const returnedStudents = removed.flatMap((t) => t.students);
                        setUnassignedStudents((prev) => [...prev, ...returnedStudents]);
                        setTeams(keptTeams);
                      }
                    }}
                    className="w-full appearance-none px-4 py-2.5 bg-white border border-gray-200 hover:border-gray-300 focus:border-[#e60067] focus:ring-2 focus:ring-[#fde7f0] rounded-xl text-sm text-gray-900 outline-none cursor-pointer transition pr-10"
                  >
                    <option value={2}>2 队</option>
                    <option value={3}>3 队</option>
                    <option value={4}>4 队</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-700">
                  每队人数
                </label>
                <div className="relative">
                  <select
                    value={playersPerTeam}
                    onChange={(e) => setPlayersPerTeam(Number(e.target.value))}
                    className="w-full appearance-none px-4 py-2.5 bg-white border border-gray-200 hover:border-gray-300 focus:border-[#e60067] focus:ring-2 focus:ring-[#fde7f0] rounded-xl text-sm text-gray-900 outline-none cursor-pointer transition pr-10"
                  >
                    <option value={2}>2 人</option>
                    <option value={4}>4 人</option>
                    <option value={6}>6 人</option>
                    <option value={8}>8 人</option>
                    <option value={10}>10 人</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: 出题规则 (Exact Match to 2.png) */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 bg-[#e60067] rounded-full" />
              <h3 className="text-sm font-bold text-gray-900 tracking-tight">
                出题规则
              </h3>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700">
                每轮题目
              </label>
              <div className="relative">
                <select
                  value={questionRule}
                  onChange={(e) => setQuestionRule(e.target.value)}
                  className="w-full appearance-none px-4 py-2.5 bg-white border border-gray-200 hover:border-gray-300 focus:border-[#e60067] focus:ring-2 focus:ring-[#fde7f0] rounded-xl text-sm text-gray-900 outline-none cursor-pointer transition pr-10"
                >
                  {QUESTION_RULES.map((rule) => (
                    <option key={rule.id} value={rule.id}>
                      {rule.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              <p className="text-[11px] text-gray-400 pl-1">
                {QUESTION_RULES.find((r) => r.id === questionRule)?.desc}
              </p>
            </div>
          </div>

          {/* Section 3: 队伍与人物分配 (队伍管理 & 拖动分队) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-1 h-4 bg-[#e60067] rounded-full" />
                <h3 className="text-sm font-bold text-gray-900 tracking-tight">
                  队伍与人物分配
                </h3>
              </div>

              {/* Mode switch: Team vs Individual */}
              <div className="flex items-center gap-2 bg-gray-100 p-0.5 rounded-lg text-xs font-medium">
                <button
                  type="button"
                  onClick={() => setIsTeamMode(true)}
                  className={`px-2.5 py-1 rounded-md transition ${
                    isTeamMode
                      ? 'bg-white text-gray-900 shadow-2xs font-semibold'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  分队对抗
                </button>
                <button
                  type="button"
                  onClick={() => setIsTeamMode(false)}
                  className={`px-2.5 py-1 rounded-md transition ${
                    !isTeamMode
                      ? 'bg-white text-gray-900 shadow-2xs font-semibold'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  个人竞速
                </button>
              </div>
            </div>

            {isTeamMode ? (
              <div className="space-y-3">
                {/* Team Rows Matching 2.png with Character Selector and Student Chips */}
                {teams.map((team) => {
                  const isOver = dragOverTeamId === team.id;
                  const isBlue = team.id === 'blue';
                  const isRed = team.id === 'red';

                  return (
                    <div
                      key={team.id}
                      onDragOver={(e) => handleDragOver(e, team.id)}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, team.id)}
                      className={`p-3.5 rounded-2xl border transition-all ${
                        isOver
                          ? 'border-[#e60067] bg-pink-50/50 shadow-md ring-2 ring-pink-200'
                          : 'border-gray-200/90 bg-white hover:border-gray-300 shadow-2xs'
                      }`}
                    >
                      {/* Top Row: Team Badge | Character Preview | Character Dropdown (Exact Match to 2.png) */}
                      <div className="flex items-center gap-3">
                        {/* Team Indicator Pill */}
                        <div
                          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold shrink-0 min-w-[105px]`}
                          style={{
                            backgroundColor: team.bgColor,
                            color: team.textColor,
                            border: `1px solid ${team.borderColor}`,
                          }}
                        >
                          <div
                            className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs shadow-2xs"
                            style={{ backgroundColor: team.color }}
                          >
                            <Users className="w-3.5 h-3.5" />
                          </div>
                          <span>{team.name}</span>
                        </div>

                        {/* Divider Line */}
                        <div className="h-6 w-px bg-gray-200" />

                        {/* Character Avatar Preview */}
                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-gray-50 border border-gray-200/70 shrink-0 flex items-center justify-center">
                          <img
                            src={team.characterAvatar}
                            alt={team.character}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Character Selector Dropdown */}
                        <div className="relative flex-1">
                          <select
                            value={team.character}
                            onChange={(e) =>
                              handleCharacterChange(team.id, e.target.value)
                            }
                            className="w-full appearance-none px-3.5 py-2 bg-white border border-gray-200 hover:border-gray-300 focus:border-[#e60067] rounded-xl text-xs font-medium text-gray-800 outline-none cursor-pointer pr-8"
                          >
                            {CHARACTER_OPTIONS.map((c) => (
                              <option key={c.id} value={c.name}>
                                {c.name} · {c.badge}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>

                        {/* Remove Team Button (if more than 2 teams) */}
                        {teams.length > 2 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveTeam(team.id)}
                            title="移除此队伍"
                            className="w-8 h-8 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center transition"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      {/* Interactive Student Adjustment (Drag & Drop + Transfer Chips) */}
                      <div className="mt-3 pt-3 border-t border-dashed border-gray-100">
                        <div className="flex items-center justify-between text-[11px] text-gray-400 mb-2">
                          <span className="flex items-center gap-1">
                            <UserCheck className="w-3.5 h-3.5 text-gray-500" />
                            已入队学生 ({team.students.length} 人 · 拖拽可跨队调整)
                          </span>
                          <span className="text-[10px] text-gray-400">
                            支持按住拖动调队
                          </span>
                        </div>

                        {/* Students Tags Grid */}
                        <div className="flex flex-wrap gap-2 min-h-[36px] p-1.5 rounded-xl bg-gray-50/70 border border-gray-100">
                          {team.students.length === 0 ? (
                            <div className="w-full text-center py-2 text-xs text-gray-400">
                              暂无学生，拖拽学生至此加入{team.name}
                            </div>
                          ) : (
                            team.students.map((student) => (
                              <div
                                key={student.id}
                                draggable
                                onDragStart={(e) =>
                                  handleDragStart(e, student, team.id)
                                }
                                className="group relative flex items-center gap-1.5 px-2.5 py-1.5 bg-white border border-gray-200/90 hover:border-[#e60067] rounded-xl text-xs text-gray-700 shadow-2xs hover:shadow-xs cursor-grab active:cursor-grabbing transition-all select-none"
                              >
                                <GripVertical className="w-3 h-3 text-gray-300 group-hover:text-gray-400 shrink-0" />
                                <span
                                  className="w-2 h-2 rounded-full shrink-0"
                                  style={{ backgroundColor: student.avatarColor }}
                                />
                                <span className="font-medium text-gray-800">
                                  {student.name}
                                </span>

                                {/* Quick Transfer Button */}
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleQuickMove(student, team.id);
                                  }}
                                  title="一键调换至对方队伍"
                                  className="opacity-0 group-hover:opacity-100 ml-1 p-0.5 text-gray-400 hover:text-[#e60067] hover:bg-pink-50 rounded transition"
                                >
                                  <ArrowRightLeft className="w-3 h-3" />
                                </button>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Team Controls: Add Team Button */}
                {teams.length < 4 && (
                  <button
                    type="button"
                    onClick={handleAddTeam}
                    className="w-full py-2.5 border-2 border-dashed border-gray-200 hover:border-[#e60067] hover:text-[#e60067] text-gray-500 rounded-2xl text-xs font-semibold flex items-center justify-center gap-2 transition bg-white/60 hover:bg-[#fde7f0]/30"
                  >
                    <Plus className="w-4 h-4" />
                    <span>增加对战队伍 (当前 {teams.length} 队 / 最多 4 队)</span>
                  </button>
                )}

                {/* Unassigned Students Waiting Bench (候场大厅) */}
                <div
                  onDragOver={(e) => handleDragOver(e, 'unassigned')}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, 'unassigned')}
                  className={`p-3.5 rounded-2xl border transition-all ${
                    dragOverTeamId === 'unassigned'
                      ? 'border-amber-400 bg-amber-50/50 ring-2 ring-amber-100'
                      : 'border-gray-200 bg-slate-50/60'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-semibold text-gray-700 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      候场大厅 · 未分队学生 ({unassignedStudents.length} 人)
                    </span>
                    <span className="text-[11px] text-gray-400">
                      拖动学生可分配到各队伍
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 min-h-[32px]">
                    {unassignedStudents.length === 0 ? (
                      <span className="text-xs text-gray-400 py-1">
                        所有进入房间的学生均已分配队伍
                      </span>
                    ) : (
                      unassignedStudents.map((student) => (
                        <div
                          key={student.id}
                          draggable
                          onDragStart={(e) =>
                            handleDragStart(e, student, 'unassigned')
                          }
                          className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white border border-gray-200 hover:border-amber-400 rounded-xl text-xs text-gray-700 shadow-2xs cursor-grab active:cursor-grabbing hover:shadow-xs transition select-none"
                        >
                          <GripVertical className="w-3 h-3 text-gray-300" />
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: student.avatarColor }}
                          />
                          <span className="font-medium">{student.name}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 text-xs text-gray-600 space-y-2">
                <p className="font-semibold text-gray-800">
                  当前已启用「个人闯关模式」
                </p>
                <p>
                  每位学生使用独立角色与专属进度答题，无需分组对抗，最终大屏将展示班级全员积分排行榜。
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Drawer Bottom Actions (Exact Match to 2.png) */}
        <div className="p-4 px-6 border-t border-gray-100 bg-white shrink-0 flex items-center justify-end gap-3 shadow-2xs">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl border border-gray-200 hover:border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
          >
            取消
          </button>

          <button
            type="button"
            onClick={handleFormSubmit}
            className="px-8 py-2.5 rounded-xl bg-[#e60067] hover:bg-[#d0005d] text-white text-sm font-semibold shadow-md shadow-pink-200 active:scale-[0.98] transition-all flex items-center gap-2"
          >
            <span>创建房间</span>
          </button>
        </div>
      </div>
    </>
  );
};
