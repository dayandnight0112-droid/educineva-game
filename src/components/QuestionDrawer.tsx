import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  FileText,
  Upload,
  Shuffle,
  Plus,
  Edit2,
  Trash2,
  Copy,
  Check,
  CheckSquare,
  Square
} from 'lucide-react';
import { QuestionPaper, SingleChoiceQuestion } from '../types';

interface QuestionDrawerProps {
  paper: QuestionPaper | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (paperId: string, questions: SingleChoiceQuestion[]) => void;
  showToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export const QuestionDrawer: React.FC<QuestionDrawerProps> = ({
  paper,
  isOpen,
  onClose,
  onSave,
  showToast
}) => {
  const [questions, setQuestions] = useState<SingleChoiceQuestion[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 当打开抽屉或切换试卷时初始化
  useEffect(() => {
    if (paper && isOpen) {
      const initial = paper.questions && paper.questions.length > 0
        ? JSON.parse(JSON.stringify(paper.questions))
        : [
            {
              id: `q_${Date.now()}_1`,
              type: 'single' as const,
              stem: '3 + 5 = ?',
              options: { A: '6', B: '7', C: '8', D: '9' },
              answer: 'C' as const
            },
            {
              id: `q_${Date.now()}_2`,
              type: 'single' as const,
              stem: '10 - 4 = ?',
              options: { A: '5', B: '6', C: '7', D: '8' },
              answer: 'B' as const
            }
          ];
      setQuestions(initial);
      // 默认选中第一题，与设计图 5.png 保持一致
      setSelectedIds(new Set([initial[0]?.id || '']));
    }
  }, [paper, isOpen]);

  if (!isOpen || !paper) return null;

  // 1. 勾选切换
  const toggleSelect = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedIds(next);
  };

  // 2. 全选 / 取消全选
  const handleToggleSelectAll = () => {
    if (selectedIds.size === questions.length) {
      setSelectedIds(new Set());
      showToast('已取消全选', 'info');
    } else {
      setSelectedIds(new Set(questions.map((q) => q.id)));
      showToast(`已选中全部 ${questions.length} 道题目`, 'info');
    }
  };

  // 3. 打乱顺序
  const handleShuffle = () => {
    if (questions.length <= 1) {
      showToast('题目数量不足，无需打乱', 'info');
      return;
    }
    const shuffled = [...questions];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setQuestions(shuffled);
    showToast('题目顺序已打乱！', 'success');
  };

  // 4. + 新增题目
  const handleAddQuestion = () => {
    const newQ: SingleChoiceQuestion = {
      id: `q_${Date.now()}_${questions.length + 1}`,
      type: 'single',
      stem: '',
      options: { A: '', B: '', C: '', D: '' },
      answer: 'A'
    };
    setQuestions([...questions, newQ]);

    // 滚动至底部
    setTimeout(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
      }
    }, 100);

    showToast('已新增一道单选题', 'info');
  };

  // 5. 复制题目
  const handleDuplicateQuestion = (index: number) => {
    const target = questions[index];
    if (!target) return;
    const clone: SingleChoiceQuestion = {
      ...JSON.parse(JSON.stringify(target)),
      id: `q_${Date.now()}_copy`,
      stem: `${target.stem} (副本)`
    };
    const updated = [...questions];
    updated.splice(index + 1, 0, clone);
    setQuestions(updated);
    showToast('题目复制成功', 'info');
  };

  // 6. 单题删除
  const handleDeleteSingleQuestion = (index: number) => {
    const updated = [...questions];
    const removed = updated.splice(index, 1);
    setQuestions(updated);
    if (removed[0]) {
      const nextSelected = new Set(selectedIds);
      nextSelected.delete(removed[0].id);
      setSelectedIds(nextSelected);
    }
    showToast('题目已删除', 'info');
  };

  // 7. 批量删除
  const handleBatchDelete = () => {
    if (selectedIds.size === 0) {
      showToast('请先勾选需要删除的题目', 'info');
      return;
    }
    if (!confirm(`确定要删除选中的 ${selectedIds.size} 道题目吗？`)) {
      return;
    }
    const updated = questions.filter((q) => !selectedIds.has(q.id));
    const count = selectedIds.size;
    setQuestions(updated);
    setSelectedIds(new Set());
    showToast(`已成功删除 ${count} 道题目`, 'success');
  };

  // 8. 字段输入更新
  const updateStem = (index: number, val: string) => {
    const updated = [...questions];
    updated[index].stem = val;
    setQuestions(updated);
  };

  const updateOption = (index: number, optKey: 'A' | 'B' | 'C' | 'D', val: string) => {
    const updated = [...questions];
    updated[index].options[optKey] = val;
    setQuestions(updated);
  };

  const setAnswer = (index: number, answerKey: 'A' | 'B' | 'C' | 'D') => {
    const updated = [...questions];
    updated[index].answer = answerKey;
    setQuestions(updated);
  };

  // 9. 下载模版
  const handleDownloadTemplate = () => {
    const headers = ['序号', '题目内容(题干)', '选项A', '选项B', '选项C', '选项D', '正确答案(A/B/C/D)'];
    const rows = [
      ['1', '3 + 5 = ?', '6', '7', '8', '9', 'C'],
      ['2', '10 - 4 = ?', '5', '6', '7', '8', 'B'],
      ['3', '地球上最大的大洋是？', '大西洋', '印度洋', '北冰洋', '太平洋', 'D'],
      ['4', 'What is the synonym of "Quick"?', 'Slow', 'Fast', 'Late', 'Heavy', 'B']
    ];

    // 如果全局 window.XLSX 可用，导出真实 .xlsx
    if ((window as any).XLSX) {
      try {
        const XLSX = (window as any).XLSX;
        const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);
        worksheet['!cols'] = [
          { wch: 8 },
          { wch: 32 },
          { wch: 16 },
          { wch: 16 },
          { wch: 16 },
          { wch: 16 },
          { wch: 20 }
        ];
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, '题目模版');
        XLSX.writeFile(workbook, 'Educineva_题目导入模版.xlsx');
        showToast('题目模版(.xlsx)已下载', 'success');
        return;
      } catch (err) {
        console.warn('XLSX export failed, fallback to CSV:', err);
      }
    }

    // 降级为 UTF-8 BOM CSV
    let csv = '\uFEFF' + headers.join(',') + '\r\n';
    rows.forEach((r) => {
      csv += r.map((c) => `"${c.replace(/"/g, '""')}"`).join(',') + '\r\n';
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Educineva_题目导入模版.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('题目模版(.csv)已下载', 'success');
  };

  // 10. 批量导入 Excel / CSV
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    const ext = file.name.split('.').pop()?.toLowerCase();

    if (ext === 'xlsx' || ext === 'xls') {
      if (!(window as any).XLSX) {
        showToast('未加载 Excel 解析器，请尝试 CSV 格式文件', 'error');
        return;
      }
      reader.onload = (evt) => {
        try {
          const XLSX = (window as any).XLSX;
          const data = new Uint8Array(evt.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
          const raw = XLSX.utils.sheet_to_json(firstSheet, { header: 1 }) as string[][];

          const newImported = parseRowsToQuestions(raw);
          if (newImported.length === 0) {
            showToast('文件中未检测到有效题目数据', 'error');
            return;
          }
          setQuestions([...questions, ...newImported]);
          showToast(`成功导入 ${newImported.length} 道题目！`, 'success');
        } catch (err) {
          showToast('Excel 文件解析失败，请检查格式', 'error');
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      // CSV 解析
      reader.onload = (evt) => {
        try {
          const text = evt.target?.result as string;
          const lines = text.split(/\r?\n/).map((l) => l.split(',').map((c) => c.replace(/^"|"$/g, '').trim()));
          const newImported = parseRowsToQuestions(lines);
          if (newImported.length === 0) {
            showToast('CSV 文件中未检测到有效题目', 'error');
            return;
          }
          setQuestions([...questions, ...newImported]);
          showToast(`成功导入 ${newImported.length} 道题目！`, 'success');
        } catch (err) {
          showToast('CSV 解析失败', 'error');
        }
      };
      reader.readAsText(file, 'utf-8');
    }

    e.target.value = '';
  };

  const parseRowsToQuestions = (rows: string[][]): SingleChoiceQuestion[] => {
    const list: SingleChoiceQuestion[] = [];
    // 跳过表头
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (!row || row.length < 2) continue;

      let stem = '';
      let optA = '';
      let optB = '';
      let optC = '';
      let optD = '';
      let answer: 'A' | 'B' | 'C' | 'D' = 'A';

      if (row.length >= 7) {
        stem = String(row[1] || '').trim();
        optA = String(row[2] || '').trim();
        optB = String(row[3] || '').trim();
        optC = String(row[4] || '').trim();
        optD = String(row[5] || '').trim();
        const ans = String(row[6] || 'A').trim().toUpperCase();
        if (['A', 'B', 'C', 'D'].includes(ans)) answer = ans as any;
      } else if (row.length >= 6) {
        stem = String(row[0] || '').trim();
        optA = String(row[1] || '').trim();
        optB = String(row[2] || '').trim();
        optC = String(row[3] || '').trim();
        optD = String(row[4] || '').trim();
        const ans = String(row[5] || 'A').trim().toUpperCase();
        if (['A', 'B', 'C', 'D'].includes(ans)) answer = ans as any;
      }

      if (!stem) continue;

      list.push({
        id: `q_imp_${Date.now()}_${i}`,
        type: 'single',
        stem,
        options: {
          A: optA || '选项 A',
          B: optB || '选项 B',
          C: optC || '选项 C',
          D: optD || '选项 D'
        },
        answer
      });
    }
    return list;
  };

  // 11. 保存并退出
  const handleSave = () => {
    onSave(paper.id, questions);
    showToast(`试卷「${paper.name}」已保存（共 ${questions.length} 题）`, 'success');
    onClose();
  };

  return (
    <>
      {/* 半透明遮罩层 */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/35 backdrop-blur-[2px] z-40 transition-opacity animate-fade-in"
      />

      {/* 右侧滑出抽屉面板 (Exact match to 5.png) */}
      <aside className="fixed inset-y-0 right-0 w-[720px] max-w-full bg-white z-50 shadow-2xl flex flex-col transform transition-transform duration-300 ease-out">
        {/* 抽屉头部 */}
        <div className="px-7 py-5 border-b border-gray-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-indigo-600 flex items-center justify-center shrink-0 border border-purple-100">
              <FileText className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-gray-900 tracking-tight font-sans">
                  {paper.name}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-100">
                  {paper.grade}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                  {paper.subject}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1 font-medium">
                题目编辑 · 共 {questions.length} 道题
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
            title="关闭抽屉"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* 顶部操作区 (Exact match to 5.png) */}
        <div className="px-7 py-3.5 bg-gray-50/70 border-b border-gray-100 space-y-3 shrink-0">
          {/* Row 1: Bulk Import & Download Template */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-white border border-indigo-500 hover:border-indigo-600 text-indigo-600 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-2xs hover:bg-indigo-50/50"
            >
              <Upload className="w-4 h-4 stroke-[2.2]" />
              <span>Bulk Import Excel</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={handleFileUpload}
              className="hidden"
            />

            <button
              onClick={handleDownloadTemplate}
              className="text-xs font-semibold text-indigo-600 underline hover:text-indigo-800 transition"
            >
              下载模版
            </button>
          </div>

          {/* Row 2: 打乱顺序, + 新增题目, 编辑, 删除 */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={handleShuffle}
              className="px-3.5 py-2 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 shadow-2xs hover:bg-gray-50"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>打乱顺序</span>
            </button>

            <button
              onClick={handleAddQuestion}
              className="px-4 py-2 bg-[#e60067] hover:bg-[#d0005d] text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm shadow-pink-200 active:scale-[0.98]"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>新增题目</span>
            </button>

            <button
              onClick={handleToggleSelectAll}
              className="px-3.5 py-2 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 shadow-2xs hover:bg-gray-50"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>编辑</span>
            </button>

            <button
              onClick={handleBatchDelete}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 border shadow-2xs ${
                selectedIds.size > 0
                  ? 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100'
                  : 'bg-white border-gray-200 text-gray-600 hover:text-red-500 hover:border-red-200'
              }`}
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>删除{selectedIds.size > 0 ? ` (${selectedIds.size})` : ''}</span>
            </button>
          </div>
        </div>

        {/* 题目列表区域 (Scrollable) */}
        <div ref={scrollContainerRef} className="flex-1 overflow-y-auto px-7 py-5 space-y-4">
          {questions.length === 0 ? (
            <div className="py-20 text-center text-gray-400 space-y-3">
              <FileText className="w-12 h-12 mx-auto stroke-1 text-gray-300" />
              <p className="text-sm font-medium">试卷中暂无题目</p>
              <button
                onClick={handleAddQuestion}
                className="px-5 py-2 bg-[#e60067] text-white text-xs font-bold rounded-xl shadow-xs"
              >
                + 立即添加第一道题
              </button>
            </div>
          ) : (
            questions.map((q, idx) => {
              const isChecked = selectedIds.has(q.id);
              const numStr = String(idx + 1).padStart(2, '0');

              return (
                <div
                  key={q.id}
                  className={`bg-white rounded-2xl border transition-all p-5 space-y-3.5 ${
                    isChecked
                      ? 'border-indigo-400 ring-2 ring-indigo-50 shadow-xs'
                      : 'border-gray-200 hover:border-gray-300 shadow-2xs'
                  }`}
                >
                  {/* 题目头部: 复选框 + 序号 + 单选题 + 操作按钮 */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => toggleSelect(q.id)}
                        className={`w-5 h-5 rounded-md flex items-center justify-center transition border ${
                          isChecked
                            ? 'bg-indigo-600 border-indigo-600 text-white'
                            : 'border-gray-300 hover:border-gray-400 bg-white'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </button>

                      <span className="text-base font-extrabold text-gray-900 tracking-tight">
                        {numStr}
                      </span>

                      <span className="px-2.5 py-0.5 rounded-lg text-xs font-bold bg-purple-50 text-indigo-600 border border-purple-100">
                        单选题
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleDuplicateQuestion(idx)}
                        title="复制此题"
                        className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteSingleQuestion(idx)}
                        title="删除此题"
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* 题干输入框 */}
                  <div>
                    <input
                      type="text"
                      value={q.stem}
                      onChange={(e) => updateStem(idx, e.target.value)}
                      placeholder="请输入题目内容（题干）"
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 hover:border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 rounded-xl text-sm text-gray-800 font-medium outline-none transition"
                    />
                  </div>

                  {/* 选项 2x2 网格 */}
                  <div className="grid grid-cols-2 gap-3">
                    {(['A', 'B', 'C', 'D'] as const).map((optKey) => (
                      <div
                        key={optKey}
                        className="flex items-center px-3.5 py-1.5 bg-white border border-gray-200 hover:border-gray-300 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 rounded-xl text-sm transition"
                      >
                        <span className="text-xs font-bold text-gray-500 mr-2 select-none">
                          {optKey}.
                        </span>
                        <input
                          type="text"
                          value={q.options[optKey]}
                          onChange={(e) => updateOption(idx, optKey, e.target.value)}
                          placeholder={`选项 ${optKey}`}
                          className="w-full bg-transparent text-sm text-gray-800 outline-none"
                        />
                      </div>
                    ))}
                  </div>

                  {/* 正确答案单选组 (Exact match to 5.png) */}
                  <div className="flex items-center gap-4 pt-1 text-xs">
                    <span className="font-semibold text-gray-600">正确答案</span>
                    <div className="flex items-center gap-5">
                      {(['A', 'B', 'C', 'D'] as const).map((optKey) => {
                        const isSelected = q.answer === optKey;
                        return (
                          <label
                            key={optKey}
                            onClick={() => setAnswer(idx, optKey)}
                            className="flex items-center gap-1.5 cursor-pointer font-bold select-none text-gray-700"
                          >
                            <span
                              className={`w-4 h-4 rounded-full border flex items-center justify-center transition ${
                                isSelected
                                  ? 'border-indigo-600 bg-white ring-2 ring-indigo-100'
                                  : 'border-gray-300 hover:border-gray-400 bg-white'
                              }`}
                            >
                              {isSelected && (
                                <span className="w-2 h-2 rounded-full bg-indigo-600" />
                              )}
                            </span>
                            <span>{optKey}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* 抽屉底部固定栏 (Exact match to 5.png) */}
        <div className="px-7 py-4 border-t border-gray-200 bg-white flex items-center justify-between shrink-0 shadow-lg">
          <span className="text-xs text-gray-400 font-medium">修改后请保存</span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl border border-gray-200 hover:border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
            >
              取消
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-8 py-2.5 rounded-xl bg-[#e60067] hover:bg-[#d0005d] text-white text-sm font-bold shadow-md shadow-pink-200 active:scale-[0.98] transition"
            >
              保存题目
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
