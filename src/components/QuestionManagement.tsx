import React, { useState, useEffect } from 'react';
import {
  Plus,
  Search,
  ChevronDown,
  FileText,
  MoreHorizontal,
  ArrowRight,
  Info,
  X,
  Edit,
  Copy,
  Trash2
} from 'lucide-react';
import { QUESTION_PAPERS } from '../mock/data';
import { QuestionPaper, SingleChoiceQuestion } from '../types';
import { QuestionDrawer } from './QuestionDrawer';

export const LOCAL_STORAGE_PAPERS_KEY = 'educineva_teacher_papers_v2';

interface QuestionManagementProps {
  papers?: QuestionPaper[];
  onUpdatePapers?: React.Dispatch<React.SetStateAction<QuestionPaper[]>>;
}

export const QuestionManagement: React.FC<QuestionManagementProps> = ({
  papers: externalPapers,
  onUpdatePapers,
}) => {
  // 试卷列表状态（优先使用父组件传入状态，否则从 localStorage 读取）
  const [internalPapers, setInternalPapers] = useState<QuestionPaper[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_PAPERS_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load papers from localStorage:', e);
    }
    return QUESTION_PAPERS;
  });

  const papers = externalPapers ?? internalPapers;
  const setPapers = onUpdatePapers ?? setInternalPapers;

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('全部年级');
  const [selectedSubject, setSelectedSubject] = useState('全部科目');

  // 新增文件弹窗状态 (Modal)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const [newGrade, setNewGrade] = useState('一年级');
  const [newSubject, setNewSubject] = useState('数学');

  // 题目编辑抽屉状态 (Drawer)
  const [activeEditingPaperId, setActiveEditingPaperId] = useState<string | null>(null);

  // 更多操作下拉菜单激活的试卷 ID
  const [activeMenuPaperId, setActiveMenuPaperId] = useState<string | null>(null);

  // Toast 提示信息状态
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // 自动持久化到 localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_PAPERS_KEY, JSON.stringify(papers));
    } catch (e) {
      console.error('Failed to save papers to localStorage:', e);
    }
  }, [papers]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 2800);
  };

  // 试卷筛选
  const filteredPapers = papers.filter((p) => {
    const q = searchTerm.trim().toLowerCase();
    const matchesSearch =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.grade.toLowerCase().includes(q) ||
      p.subject.toLowerCase().includes(q) ||
      (p.questions &&
        p.questions.some(
          (item) =>
            item.stem.toLowerCase().includes(q) ||
            Object.values(item.options).some((opt) => opt.toLowerCase().includes(q))
        ));

    const matchesGrade = selectedGrade === '全部年级' || p.grade === selectedGrade;
    const matchesSubject = selectedSubject === '全部科目' || p.subject === selectedSubject;
    return matchesSearch && matchesGrade && matchesSubject;
  });

  // 处理创建试卷
  const handleCreatePaper = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFileName.trim()) {
      showToast('请输入文件名称', 'error');
      return;
    }

    const newPaper: QuestionPaper = {
      id: `p_${Date.now()}`,
      name: newFileName.trim(),
      grade: newGrade,
      subject: newSubject,
      questionCount: 1,
      questions: [
        {
          id: `q_${Date.now()}_1`,
          type: 'single',
          stem: '请在此输入第一道单选题的题干',
          options: {
            A: '选项 A',
            B: '选项 B',
            C: '选项 C',
            D: '选项 D'
          },
          answer: 'A'
        }
      ]
    };

    setPapers([newPaper, ...papers]);
    setIsAddModalOpen(false);
    setNewFileName('');
    showToast(`试卷「${newPaper.name}」已创建`, 'success');

    // 自动打开该试卷题目编辑抽屉，提升教师使用体验
    setTimeout(() => {
      setActiveEditingPaperId(newPaper.id);
    }, 150);
  };

  // 保存题目回写试卷
  const handleSaveQuestions = (paperId: string, updatedQuestions: SingleChoiceQuestion[]) => {
    setPapers((prev) =>
      prev.map((p) =>
        p.id === paperId
          ? {
              ...p,
              questionCount: updatedQuestions.length,
              questions: updatedQuestions,
              updatedAt: new Date().toLocaleString()
            }
          : p
      )
    );
  };

  // 复制试卷
  const handleDuplicatePaper = (paper: QuestionPaper, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveMenuPaperId(null);
    const clone: QuestionPaper = {
      ...JSON.parse(JSON.stringify(paper)),
      id: `p_${Date.now()}_copy`,
      name: `${paper.name} (副本)`
    };
    setPapers([clone, ...papers]);
    showToast(`已成功复制试卷「${clone.name}」`, 'success');
  };

  // 重命名试卷
  const handleRenamePaper = (paper: QuestionPaper, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveMenuPaperId(null);
    const newName = prompt('请输入新的试卷名称：', paper.name);
    if (newName && newName.trim() && newName.trim() !== paper.name) {
      setPapers((prev) =>
        prev.map((p) => (p.id === paper.id ? { ...p, name: newName.trim() } : p))
      );
      showToast(`已重命名为「${newName.trim()}」`, 'success');
    }
  };

  // 删除试卷
  const handleDeletePaper = (paper: QuestionPaper, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveMenuPaperId(null);
    if (confirm(`确定要删除试卷「${paper.name}」吗？此操作不可撤销。`)) {
      setPapers((prev) => prev.filter((p) => p.id !== paper.id));
      if (activeEditingPaperId === paper.id) {
        setActiveEditingPaperId(null);
      }
      showToast(`试卷「${paper.name}」已删除`, 'info');
    }
  };

  const activePaper = papers.find((p) => p.id === activeEditingPaperId) || null;

  return (
    <div className="space-y-6 relative" onClick={() => setActiveMenuPaperId(null)}>
      {/* 顶部醒目操作按钮: + Add File (Exact match to 3.png) */}
      <button
        onClick={() => setIsAddModalOpen(true)}
        className="w-full py-3.5 bg-[#e60067] hover:bg-[#d0005d] text-white font-bold text-base rounded-2xl shadow-md shadow-pink-200 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
      >
        <Plus className="w-5 h-5 stroke-[2.5]" />
        <span>+ Add File</span>
      </button>

      {/* 搜索框与下拉筛选器 (Exact match to 3.png) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        {/* Search */}
        <div className="md:col-span-6 relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="搜索题目文件"
            className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-200 hover:border-gray-300 focus:border-[#e60067] focus:ring-2 focus:ring-[#fde7f0] rounded-2xl text-sm text-gray-800 outline-none transition shadow-2xs"
          />
        </div>

        {/* Grade Filter */}
        <div className="md:col-span-3 relative">
          <select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            className="w-full appearance-none px-4 py-2.5 bg-white border border-gray-200 hover:border-gray-300 focus:border-[#e60067] rounded-2xl text-sm text-gray-700 outline-none cursor-pointer transition shadow-2xs pr-10 font-medium"
          >
            <option>全部年级</option>
            <option>一年级</option>
            <option>二年级</option>
            <option>三年级</option>
            <option>四年级</option>
            <option>五年级</option>
            <option>六年级</option>
            <option>中一</option>
            <option>中二</option>
            <option>中三</option>
            <option>中四</option>
            <option>中五</option>
          </select>
          <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Subject Filter */}
        <div className="md:col-span-3 relative">
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full appearance-none px-4 py-2.5 bg-white border border-gray-200 hover:border-gray-300 focus:border-[#e60067] rounded-2xl text-sm text-gray-700 outline-none cursor-pointer transition shadow-2xs pr-10 font-medium"
          >
            <option>全部科目</option>
            <option>数学</option>
            <option>科学</option>
            <option>英文</option>
            <option>华文</option>
            <option>历史</option>
            <option>地理</option>
            <option>物理</option>
            <option>化学</option>
            <option>生物</option>
          </select>
          <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Section Title: | 我的题目文件 (Exact match to 3.png) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-4.5 bg-[#e60067] rounded-full" />
            <h2 className="text-base font-bold text-gray-800 tracking-tight">
              我的题目文件
            </h2>
          </div>
          <span className="text-xs text-gray-400 font-medium">
            共 {filteredPapers.length} 个文件
          </span>
        </div>

        {/* 试卷卡片列表网格 (Exact match to 3.png) */}
        {filteredPapers.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-dashed border-gray-200 text-gray-400 space-y-2">
            <FileText className="w-10 h-10 mx-auto stroke-1 text-gray-300" />
            <p className="text-sm font-medium">未找到符合条件的题目文件</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedGrade('全部年级');
                setSelectedSubject('全部科目');
              }}
              className="text-xs text-[#e60067] font-semibold underline hover:text-[#d0005d]"
            >
              清空筛选条件
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPapers.map((paper) => {
              const isEditing = activeEditingPaperId === paper.id;
              return (
                <div
                  key={paper.id}
                  onClick={() => setActiveEditingPaperId(paper.id)}
                  className={`bg-white rounded-2xl border transition-all p-5 flex flex-col justify-between group shadow-2xs cursor-pointer relative ${
                    isEditing
                      ? 'border-indigo-500 ring-2 ring-indigo-200 bg-indigo-50/20'
                      : 'border-gray-200/90 hover:border-gray-300 hover:shadow-md'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-purple-50 text-indigo-600 flex items-center justify-center shrink-0 border border-purple-100">
                          <FileText className="w-6 h-6 stroke-[2]" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#e60067] transition-colors">
                            {paper.name}
                          </h3>
                          <div className="flex items-center gap-1.5 mt-1.5">
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-100">
                              {paper.grade}
                            </span>
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                              {paper.subject}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* 更多菜单按钮 (···) */}
                      <div className="relative">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveMenuPaperId(
                              activeMenuPaperId === paper.id ? null : paper.id
                            );
                          }}
                          className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 transition"
                          title="更多操作"
                        >
                          <MoreHorizontal className="w-5 h-5" />
                        </button>

                        {/* 下拉浮层 */}
                        {activeMenuPaperId === paper.id && (
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className="absolute right-0 top-8 w-36 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-20 animate-fade-in"
                          >
                            <button
                              onClick={() => {
                                setActiveMenuPaperId(null);
                                setActiveEditingPaperId(paper.id);
                              }}
                              className="w-full px-3.5 py-2 text-left text-xs font-semibold text-gray-700 hover:bg-purple-50 hover:text-[#e60067] flex items-center gap-2"
                            >
                              <Edit className="w-3.5 h-3.5" />
                              <span>编辑题目</span>
                            </button>
                            <button
                              onClick={(e) => handleRenamePaper(paper, e)}
                              className="w-full px-3.5 py-2 text-left text-xs font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                            >
                              <FileText className="w-3.5 h-3.5" />
                              <span>重命名</span>
                            </button>
                            <button
                              onClick={(e) => handleDuplicatePaper(paper, e)}
                              className="w-full px-3.5 py-2 text-left text-xs font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                            >
                              <Copy className="w-3.5 h-3.5" />
                              <span>复制试卷</span>
                            </button>
                            <div className="h-px bg-gray-100 my-1" />
                            <button
                              onClick={(e) => handleDeletePaper(paper, e)}
                              className="w-full px-3.5 py-2 text-left text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>删除文件</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 底部信息栏 */}
                  <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1.5 font-medium">
                      <FileText className="w-3.5 h-3.5 text-gray-400" />
                      {paper.questions ? paper.questions.length : paper.questionCount} 道题
                    </span>

                    <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 group-hover:border-[#e60067] group-hover:text-white group-hover:bg-[#e60067] transition-all">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 底部提示信息 (Exact match to 3.png) */}
        <div className="text-xs text-gray-400 flex items-center gap-1.5 pt-2">
          <Info className="w-4 h-4" />
          <span>点击文件，编辑题目与答案</span>
        </div>
      </div>

      {/* 新增文件弹窗 Modal (Exact match to 4.png) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px] animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-7 shadow-2xl border border-gray-100 animate-scale-up">
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-indigo-600 flex items-center justify-center border border-purple-100 shrink-0">
                  <FileText className="w-6 h-6 stroke-[2]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">新增题目文件</h3>
                  <p className="text-xs text-gray-400 mt-0.5">填写文件资料，建立后即可添加题目</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreatePaper} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700">
                  文件名称 / File Name
                </label>
                <input
                  type="text"
                  required
                  autoFocus
                  value={newFileName}
                  onChange={(e) => setNewFileName(e.target.value)}
                  placeholder="请输入文件名称"
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 hover:border-gray-300 focus:border-[#e60067] focus:ring-2 focus:ring-[#fde7f0] rounded-xl text-sm text-gray-800 outline-none transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700">年级</label>
                  <div className="relative">
                    <select
                      value={newGrade}
                      onChange={(e) => setNewGrade(e.target.value)}
                      className="w-full appearance-none px-4 py-2.5 bg-white border border-gray-200 hover:border-gray-300 focus:border-[#e60067] rounded-xl text-sm text-gray-800 outline-none cursor-pointer pr-8 font-medium"
                    >
                      <option>一年级</option>
                      <option>二年级</option>
                      <option>三年级</option>
                      <option>四年级</option>
                      <option>五年级</option>
                      <option>六年级</option>
                      <option>中一</option>
                      <option>中二</option>
                      <option>中三</option>
                      <option>中四</option>
                      <option>中五</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700">科目</label>
                  <div className="relative">
                    <select
                      value={newSubject}
                      onChange={(e) => setNewSubject(e.target.value)}
                      className="w-full appearance-none px-4 py-2.5 bg-white border border-gray-200 hover:border-gray-300 focus:border-[#e60067] rounded-xl text-sm text-gray-800 outline-none cursor-pointer pr-8 font-medium"
                    >
                      <option>数学</option>
                      <option>科学</option>
                      <option>英文</option>
                      <option>华文</option>
                      <option>历史</option>
                      <option>地理</option>
                      <option>物理</option>
                      <option>化学</option>
                      <option>生物</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 hover:border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-7 py-2.5 rounded-xl bg-[#e60067] hover:bg-[#d0005d] text-white text-sm font-bold shadow-md shadow-pink-200 active:scale-[0.98] transition"
                >
                  创建文件
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 题目编辑抽屉 Drawer (Exact match to 5.png) */}
      <QuestionDrawer
        paper={activePaper}
        isOpen={Boolean(activeEditingPaperId)}
        onClose={() => setActiveEditingPaperId(null)}
        onSave={handleSaveQuestions}
        showToast={showToast}
      />

      {/* 全局浮动 Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce-subtle pointer-events-none">
          <div
            className={`px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-sm font-semibold text-white ${
              toast.type === 'success'
                ? 'bg-emerald-600'
                : toast.type === 'error'
                ? 'bg-rose-600'
                : 'bg-gray-900'
            }`}
          >
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
};
