/**
 * Educineva 教师管理后台 - 题目管理核心业务逻辑
 */

// 全局应用状态
const State = {
  papers: [],
  filters: {
    search: '',
    grade: 'ALL',
    subject: 'ALL'
  },
  activePaperId: null,
  editingQuestions: [],
  selectedQuestionIds: new Set(),
  activeView: 'questions' // 'questions' | 'games'
};

// 本地存储键名
const STORAGE_KEY = 'educineva_papers_data_v1';

// 初始化
function initApp() {
  loadPapers();
  initFilterDropdowns();
  bindEvents();
  renderPapers();
}

/**
 * 加载试卷数据（优先 localStorage，没有则使用 sampleData）
 */
function loadPapers() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      State.papers = JSON.parse(saved);
    } else {
      State.papers = JSON.parse(JSON.stringify(DEFAULT_PAPERS));
      savePapersToStorage();
    }
  } catch (e) {
    console.error('Failed to load papers from localStorage:', e);
    State.papers = JSON.parse(JSON.stringify(DEFAULT_PAPERS));
  }
}

/**
 * 持久化到 localStorage
 */
function savePapersToStorage() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(State.papers));
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
    showToast('保存到本地存储失败', 'error');
  }
}

/**
 * 初始化年级与科目下拉选项
 */
function initFilterDropdowns() {
  const gradeSelect = document.getElementById('filterGrade');
  const subjectSelect = document.getElementById('filterSubject');
  const modalGradeSelect = document.getElementById('modalGrade');
  const modalSubjectSelect = document.getElementById('modalSubject');

  // 渲染主筛选年级下拉
  GRADE_OPTIONS.forEach(g => {
    const opt = document.createElement('option');
    opt.value = g;
    opt.textContent = g;
    gradeSelect.appendChild(opt);

    const modalOpt = document.createElement('option');
    modalOpt.value = g;
    modalOpt.textContent = g;
    modalGradeSelect.appendChild(modalOpt);
  });

  // 渲染主筛选科目下拉
  SUBJECT_OPTIONS.forEach(s => {
    const opt = document.createElement('option');
    opt.value = s;
    opt.textContent = s;
    subjectSelect.appendChild(opt);

    const modalOpt = document.createElement('option');
    modalOpt.value = s;
    modalOpt.textContent = s;
    modalSubjectSelect.appendChild(modalOpt);
  });
}

/**
 * 事件绑定
 */
function bindEvents() {
  // 视图切换（侧边栏 Games 与 Question）
  document.getElementById('navQuestion').addEventListener('click', () => switchView('questions'));
  document.getElementById('navGames').addEventListener('click', () => switchView('games'));

  // 搜索框输入
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', (e) => {
    State.filters.search = e.target.value.trim().toLowerCase();
    renderPapers();
  });

  // 年级筛选
  document.getElementById('filterGrade').addEventListener('change', (e) => {
    State.filters.grade = e.target.value;
    renderPapers();
  });

  // 科目筛选
  document.getElementById('filterSubject').addEventListener('change', (e) => {
    State.filters.subject = e.target.value;
    renderPapers();
  });

  // 顶部 + Add File 按钮
  document.getElementById('btnAddFileBanner').addEventListener('click', openAddModal);

  // 新增弹窗关闭与取消
  document.getElementById('btnCloseModal').addEventListener('click', closeAddModal);
  document.getElementById('btnCancelModal').addEventListener('click', closeAddModal);
  document.getElementById('modalOverlay').addEventListener('click', (e) => {
    if (e.target === document.getElementById('modalOverlay')) {
      closeAddModal();
    }
  });

  // 新增弹窗表单提交
  document.getElementById('addFileForm').addEventListener('submit', handleCreatePaper);

  // 抽屉关闭与取消
  document.getElementById('btnCloseDrawer').addEventListener('click', closeDrawer);
  document.getElementById('btnCancelDrawer').addEventListener('click', closeDrawer);
  document.getElementById('drawerOverlay').addEventListener('click', closeDrawer);

  // 抽屉操作区功能
  // 1. Bulk Import Excel 批量导入
  const fileInput = document.getElementById('excelFileInput');
  document.getElementById('btnBulkImport').addEventListener('click', () => {
    fileInput.click();
  });
  fileInput.addEventListener('change', handleExcelUpload);

  // 2. 下载模版
  document.getElementById('linkDownloadTemplate').addEventListener('click', (e) => {
    e.preventDefault();
    ExcelHelper.downloadTemplate('xlsx');
    showToast('已开始下载题目模版文件', 'info');
  });

  // 3. 打乱顺序
  document.getElementById('btnShuffle').addEventListener('click', handleShuffleQuestions);

  // 4. + 新增题目
  document.getElementById('btnAddQuestion').addEventListener('click', handleAddQuestion);

  // 5. 编辑（全选/反选）
  document.getElementById('btnToggleSelectAll').addEventListener('click', handleToggleSelectAll);

  // 6. 批量删除
  document.getElementById('btnBatchDelete').addEventListener('click', handleBatchDelete);

  // 7. 保存题目
  document.getElementById('btnSaveQuestions').addEventListener('click', handleSaveQuestions);

  // 点击空白处关闭试卷卡片的更多菜单
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.card-more-btn') && !e.target.closest('.pop-menu')) {
      document.querySelectorAll('.pop-menu.show').forEach(m => m.classList.remove('show'));
    }
  });

  // 键盘快捷键 ESC 关闭弹窗或抽屉
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAddModal();
      closeDrawer();
      document.querySelectorAll('.pop-menu.show').forEach(m => m.classList.remove('show'));
    }
  });
}

/**
 * 视图切换 (题目管理 vs 游戏管理)
 */
function switchView(viewName) {
  State.activeView = viewName;
  const navQuestion = document.getElementById('navQuestion');
  const navGames = document.getElementById('navGames');
  const questionView = document.getElementById('questionManagementView');
  const gamesView = document.getElementById('gamesManagementView');

  if (viewName === 'questions') {
    navQuestion.classList.add('active');
    navGames.classList.remove('active');
    questionView.classList.remove('hidden-view');
    gamesView.classList.remove('active');
  } else {
    navQuestion.classList.remove('active');
    navGames.classList.add('active');
    questionView.classList.add('hidden-view');
    gamesView.classList.add('active');
  }
}

/**
 * 渲染试卷卡片列表
 */
function renderPapers() {
  const container = document.getElementById('papersGrid');
  const countEl = document.getElementById('sectionCount');
  
  // 筛选试卷
  const filtered = State.papers.filter(p => {
    // 搜索关键词
    if (State.filters.search) {
      const q = State.filters.search;
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchGrade = p.grade.toLowerCase().includes(q);
      const matchSubject = p.subject.toLowerCase().includes(q);
      const matchQuestions = p.questions && p.questions.some(item => 
        (item.stem && item.stem.toLowerCase().includes(q)) ||
        Object.values(item.options || {}).some(opt => opt.toLowerCase().includes(q))
      );
      if (!matchTitle && !matchGrade && !matchSubject && !matchQuestions) {
        return false;
      }
    }

    // 年级筛选
    if (State.filters.grade !== 'ALL' && p.grade !== State.filters.grade) {
      return false;
    }

    // 科目筛选
    if (State.filters.subject !== 'ALL' && p.subject !== State.filters.subject) {
      return false;
    }

    return true;
  });

  countEl.textContent = `共 ${filtered.length} 个文件`;
  container.innerHTML = '';

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <svg class="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <div class="empty-state-title">未找到相关题目文件</div>
        <div class="empty-state-sub">可以尝试清空筛选条件或点击上方「+ Add File」创建新文件</div>
        <button class="clear-filter-btn" onclick="resetFilters()">重置筛选条件</button>
      </div>
    `;
    return;
  }

  filtered.forEach(paper => {
    const isEditing = State.activePaperId === paper.id;
    const card = document.createElement('div');
    card.className = `paper-card ${isEditing ? 'active-editing' : ''}`;
    card.dataset.paperId = paper.id;

    card.innerHTML = `
      <div class="card-top">
        <div class="card-title-group">
          <div class="paper-icon-box">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          </div>
          <div class="paper-meta">
            <h3 class="paper-name">${escapeHtml(paper.title)}</h3>
            <div class="paper-badges">
              <span class="badge badge-lavender">${escapeHtml(paper.grade)}</span>
              <span class="badge badge-lavender">${escapeHtml(paper.subject)}</span>
            </div>
          </div>
        </div>
        <div style="position: relative;">
          <button class="card-more-btn" title="更多操作" onclick="toggleCardMenu(event, '${paper.id}')">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="1.5"></circle>
              <circle cx="19" cy="12" r="1.5"></circle>
              <circle cx="5" cy="12" r="1.5"></circle>
            </svg>
          </button>
          <div class="pop-menu" id="menu-${paper.id}">
            <div class="pop-menu-item" onclick="openDrawer('${paper.id}')">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
              编辑题目
            </div>
            <div class="pop-menu-item" onclick="renamePaperPrompt('${paper.id}')">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="14 2 18 6 7 17 3 17 3 13 14 2"></polygon><line x1="3" y1="22" x2="21" y2="22"></line></svg>
              重命名
            </div>
            <div class="pop-menu-item" onclick="duplicatePaper('${paper.id}')">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              复制试卷
            </div>
            <div class="pop-menu-item danger" onclick="deletePaper('${paper.id}')">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              删除文件
            </div>
          </div>
        </div>
      </div>
      <div class="card-bottom">
        <div class="question-count">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
          </svg>
          <span>${paper.questions ? paper.questions.length : 0} 道题</span>
        </div>
        <button class="enter-arrow-btn" title="点击编辑题目">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
      </div>
    `;

    // 点击卡片本体打开抽屉（除点击更多按钮外）
    card.addEventListener('click', (e) => {
      if (e.target.closest('.card-more-btn') || e.target.closest('.pop-menu')) {
        return;
      }
      openDrawer(paper.id);
    });

    container.appendChild(card);
  });
}

/**
 * 重置筛选
 */
function resetFilters() {
  State.filters.search = '';
  State.filters.grade = 'ALL';
  State.filters.subject = 'ALL';
  document.getElementById('searchInput').value = '';
  document.getElementById('filterGrade').value = 'ALL';
  document.getElementById('filterSubject').value = 'ALL';
  renderPapers();
}

/**
 * 切换卡片更多操作菜单
 */
function toggleCardMenu(event, paperId) {
  event.stopPropagation();
  const allMenus = document.querySelectorAll('.pop-menu');
  const targetMenu = document.getElementById(`menu-${paperId}`);
  const isShown = targetMenu.classList.contains('show');

  allMenus.forEach(m => m.classList.remove('show'));
  if (!isShown) {
    targetMenu.classList.add('show');
  }
}

/**
 * 打开新增文件弹窗
 */
function openAddModal() {
  const modalOverlay = document.getElementById('modalOverlay');
  document.getElementById('modalFileName').value = '';
  document.getElementById('modalGrade').value = '';
  document.getElementById('modalSubject').value = '';
  modalOverlay.classList.add('open');
  setTimeout(() => {
    document.getElementById('modalFileName').focus();
  }, 100);
}

/**
 * 关闭新增文件弹窗
 */
function closeAddModal() {
  document.getElementById('modalOverlay').classList.remove('open');
}

/**
 * 处理新增试卷表单提交
 */
function handleCreatePaper(e) {
  e.preventDefault();
  const nameInput = document.getElementById('modalFileName');
  const gradeSelect = document.getElementById('modalGrade');
  const subjectSelect = document.getElementById('modalSubject');

  const title = nameInput.value.trim();
  const grade = gradeSelect.value;
  const subject = subjectSelect.value;

  if (!title) {
    showToast('请输入试卷文件名称', 'error');
    nameInput.focus();
    return;
  }
  if (!grade) {
    showToast('请选择适用年级', 'error');
    gradeSelect.focus();
    return;
  }
  if (!subject) {
    showToast('请选择对应科目', 'error');
    subjectSelect.focus();
    return;
  }

  // 创建新试卷对象，默认带一道示例题
  const newPaper = {
    id: 'paper-' + Date.now(),
    title: title,
    grade: grade,
    subject: subject,
    updatedAt: new Date().toLocaleString(),
    questions: [
      {
        id: 'q-' + Date.now() + '-1',
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

  State.papers.unshift(newPaper);
  savePapersToStorage();
  closeAddModal();
  renderPapers();
  showToast(`试卷「${title}」创建成功！`, 'success');

  // 直接打开该试卷的题目编辑抽屉，方便老师快速添加
  setTimeout(() => {
    openDrawer(newPaper.id);
  }, 200);
}

/**
 * 打开题目编辑抽屉
 */
function openDrawer(paperId) {
  const paper = State.papers.find(p => p.id === paperId);
  if (!paper) return;

  State.activePaperId = paperId;
  // 深拷贝题目数据到编辑工作区
  State.editingQuestions = JSON.parse(JSON.stringify(paper.questions || []));
  State.selectedQuestionIds.clear();

  // 更新抽屉头部
  document.getElementById('drawerPaperTitle').textContent = paper.title;
  document.getElementById('drawerGradeBadge').textContent = paper.grade;
  document.getElementById('drawerSubjectBadge').textContent = paper.subject;
  updateDrawerCountHeader();

  // 渲染题目列表
  renderDrawerQuestions();

  // 打开抽屉动画与高亮主视图卡片
  document.getElementById('drawerOverlay').classList.add('open');
  document.getElementById('drawerPanel').classList.add('open');

  // 更新主卡片高亮
  renderPapers();
}

/**
 * 关闭题目编辑抽屉
 */
function closeDrawer() {
  document.getElementById('drawerOverlay').classList.remove('open');
  document.getElementById('drawerPanel').classList.remove('open');
  State.activePaperId = null;
  State.editingQuestions = [];
  State.selectedQuestionIds.clear();
  renderPapers();
}

/**
 * 更新抽屉头部题数显示
 */
function updateDrawerCountHeader() {
  const count = State.editingQuestions.length;
  document.getElementById('drawerCountBadge').textContent = `题目编辑 · 共 ${count} 道题`;
}

/**
 * 渲染抽屉内的题目列表
 */
function renderDrawerQuestions() {
  const listContainer = document.getElementById('drawerQuestionsList');
  updateDrawerCountHeader();
  listContainer.innerHTML = '';

  if (State.editingQuestions.length === 0) {
    listContainer.innerHTML = `
      <div class="empty-state" style="margin-top: 40px;">
        <svg class="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M12 20h9"></path>
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
        </svg>
        <div class="empty-state-title">当前试卷暂无题目</div>
        <div class="empty-state-sub">点击上方「+ 新增题目」或使用「Bulk Import Excel」批量导入题目</div>
        <button class="btn-primary-pink" onclick="handleAddQuestion()" style="margin-top: 10px;">
          + 立即新增一道题目
        </button>
      </div>
    `;
    return;
  }

  State.editingQuestions.forEach((q, index) => {
    const card = document.createElement('div');
    const isChecked = State.selectedQuestionIds.has(q.id);
    card.className = `question-item-card ${isChecked ? 'is-selected' : ''}`;
    card.id = `q-card-${q.id}`;

    const numStr = String(index + 1).padStart(2, '0');

    card.innerHTML = `
      <div class="question-header">
        <div class="question-header-left">
          <div class="custom-checkbox ${isChecked ? 'checked' : ''}" onclick="toggleQuestionSelect('${q.id}')">
            ${isChecked ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5"><polyline points="20 6 9 17 4 12"></polyline></svg>` : ''}
          </div>
          <span class="question-num">${numStr}</span>
          <span class="badge-single">单选题</span>
        </div>
        <div class="question-header-actions">
          <button class="btn-icon-subtle" title="复制此题" onclick="duplicateQuestion(${index})">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          </button>
          <button class="btn-icon-subtle delete" title="删除此题" onclick="deleteSingleQuestion(${index})">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          </button>
        </div>
      </div>

      <!-- 题干输入 -->
      <div class="stem-input-wrap">
        <input 
          type="text" 
          class="stem-input" 
          value="${escapeHtml(q.stem || '')}" 
          placeholder="请输入题目内容（题干）" 
          oninput="updateQuestionStem(${index}, this.value)"
        />
      </div>

      <!-- 选项 2x2 网格 -->
      <div class="options-grid">
        <div class="option-input-group">
          <span class="option-prefix">A.</span>
          <input 
            type="text" 
            class="option-input" 
            value="${escapeHtml((q.options && q.options.A) || '')}" 
            placeholder="选项 A" 
            oninput="updateQuestionOption(${index}, 'A', this.value)"
          />
        </div>
        <div class="option-input-group">
          <span class="option-prefix">B.</span>
          <input 
            type="text" 
            class="option-input" 
            value="${escapeHtml((q.options && q.options.B) || '')}" 
            placeholder="选项 B" 
            oninput="updateQuestionOption(${index}, 'B', this.value)"
          />
        </div>
        <div class="option-input-group">
          <span class="option-prefix">C.</span>
          <input 
            type="text" 
            class="option-input" 
            value="${escapeHtml((q.options && q.options.C) || '')}" 
            placeholder="选项 C" 
            oninput="updateQuestionOption(${index}, 'C', this.value)"
          />
        </div>
        <div class="option-input-group">
          <span class="option-prefix">D.</span>
          <input 
            type="text" 
            class="option-input" 
            value="${escapeHtml((q.options && q.options.D) || '')}" 
            placeholder="选项 D" 
            oninput="updateQuestionOption(${index}, 'D', this.value)"
          />
        </div>
      </div>

      <!-- 正确答案行 -->
      <div class="answer-row">
        <span class="answer-label">正确答案</span>
        <div class="radio-group">
          ${['A', 'B', 'C', 'D'].map(key => {
            const isSelected = q.answer === key;
            return `
              <div class="radio-item" onclick="setQuestionAnswer(${index}, '${key}')">
                <div class="radio-circle ${isSelected ? 'checked' : ''}">
                  <div class="radio-dot"></div>
                </div>
                <span>${key}</span>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    listContainer.appendChild(card);
  });
}

/**
 * 题目输入更新联动
 */
function updateQuestionStem(index, value) {
  if (State.editingQuestions[index]) {
    State.editingQuestions[index].stem = value;
  }
}

function updateQuestionOption(index, key, value) {
  if (State.editingQuestions[index]) {
    if (!State.editingQuestions[index].options) {
      State.editingQuestions[index].options = {};
    }
    State.editingQuestions[index].options[key] = value;
  }
}

function setQuestionAnswer(index, answerKey) {
  if (State.editingQuestions[index]) {
    State.editingQuestions[index].answer = answerKey;
    // 局部刷新该卡片的单选按钮状态
    const card = document.getElementById(`q-card-${State.editingQuestions[index].id}`);
    if (card) {
      const radioCircles = card.querySelectorAll('.radio-item');
      radioCircles.forEach((item, i) => {
        const key = ['A', 'B', 'C', 'D'][i];
        const circle = item.querySelector('.radio-circle');
        if (key === answerKey) {
          circle.classList.add('checked');
        } else {
          circle.classList.remove('checked');
        }
      });
    }
  }
}

/**
 * 选中/取消选中题目
 */
function toggleQuestionSelect(qId) {
  if (State.selectedQuestionIds.has(qId)) {
    State.selectedQuestionIds.delete(qId);
  } else {
    State.selectedQuestionIds.add(qId);
  }
  
  // 更新卡片样式
  const card = document.getElementById(`q-card-${qId}`);
  if (card) {
    const isChecked = State.selectedQuestionIds.has(qId);
    card.classList.toggle('is-selected', isChecked);
    const cb = card.querySelector('.custom-checkbox');
    cb.classList.toggle('checked', isChecked);
    cb.innerHTML = isChecked ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5"><polyline points="20 6 9 17 4 12"></polyline></svg>` : '';
  }

  updateBatchDeleteButtonState();
}

/**
 * 全选 / 取消全选
 */
function handleToggleSelectAll() {
  if (State.selectedQuestionIds.size === State.editingQuestions.length) {
    State.selectedQuestionIds.clear();
    showToast('已取消全选', 'info');
  } else {
    State.editingQuestions.forEach(q => State.selectedQuestionIds.add(q.id));
    showToast(`已选中全部 ${State.editingQuestions.length} 道题目`, 'info');
  }
  renderDrawerQuestions();
  updateBatchDeleteButtonState();
}

function updateBatchDeleteButtonState() {
  const btn = document.getElementById('btnBatchDelete');
  const count = State.selectedQuestionIds.size;
  if (count > 0) {
    btn.innerHTML = `
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
      删除 (${count})
    `;
    btn.classList.add('btn-toolbar-danger');
  } else {
    btn.innerHTML = `
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
      删除
    `;
    btn.classList.remove('btn-toolbar-danger');
  }
}

/**
 * + 新增题目
 */
function handleAddQuestion() {
  const newQuestion = {
    id: 'q-' + Date.now() + '-' + (State.editingQuestions.length + 1),
    type: 'single',
    stem: '',
    options: {
      A: '',
      B: '',
      C: '',
      D: ''
    },
    answer: 'A'
  };

  State.editingQuestions.push(newQuestion);
  renderDrawerQuestions();

  // 滚动到底部并聚焦新题目输入框
  const body = document.getElementById('drawerBody');
  setTimeout(() => {
    body.scrollTop = body.scrollHeight;
    const lastCard = document.getElementById(`q-card-${newQuestion.id}`);
    if (lastCard) {
      const input = lastCard.querySelector('.stem-input');
      if (input) input.focus();
    }
  }, 100);

  showToast('已新增一道单选题', 'info');
}

/**
 * 复制单个题目
 */
function duplicateQuestion(index) {
  const target = State.editingQuestions[index];
  if (!target) return;

  const clone = JSON.parse(JSON.stringify(target));
  clone.id = 'q-' + Date.now() + '-copy';
  clone.stem = (clone.stem || '') + ' (副本)';

  State.editingQuestions.splice(index + 1, 0, clone);
  renderDrawerQuestions();
  showToast('题目复制成功', 'info');
}

/**
 * 单题删除
 */
function deleteSingleQuestion(index) {
  State.editingQuestions.splice(index, 1);
  renderDrawerQuestions();
  showToast('题目已删除', 'info');
}

/**
 * 批量删除选中的题目
 */
function handleBatchDelete() {
  if (State.selectedQuestionIds.size === 0) {
    showToast('请先勾选需要删除的题目', 'info');
    return;
  }

  const deleteCount = State.selectedQuestionIds.size;
  if (!confirm(`确定要删除选中的 ${deleteCount} 道题目吗？`)) {
    return;
  }

  State.editingQuestions = State.editingQuestions.filter(q => !State.selectedQuestionIds.has(q.id));
  State.selectedQuestionIds.clear();
  renderDrawerQuestions();
  updateBatchDeleteButtonState();
  showToast(`已成功删除 ${deleteCount} 道题目`, 'success');
}

/**
 * 打乱题目顺序
 */
function handleShuffleQuestions() {
  if (State.editingQuestions.length <= 1) {
    showToast('题目数量不足，无需打乱', 'info');
    return;
  }

  // Fisher-Yates 洗牌算法
  for (let i = State.editingQuestions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [State.editingQuestions[i], State.editingQuestions[j]] = [State.editingQuestions[j], State.editingQuestions[i]];
  }

  renderDrawerQuestions();
  showToast('题目顺序已打乱！', 'success');
}

/**
 * 处理 Excel / CSV 批量导入
 */
async function handleExcelUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  try {
    showToast('正在解析题目文件...', 'info');
    const importedQuestions = await ExcelHelper.parseQuestionsFile(file);
    
    if (importedQuestions.length === 0) {
      showToast('未在文件中识别到有效题目', 'error');
      return;
    }

    State.editingQuestions = State.editingQuestions.concat(importedQuestions);
    renderDrawerQuestions();
    showToast(`成功导入 ${importedQuestions.length} 道题目！`, 'success');
  } catch (err) {
    console.error('Import failed:', err);
    showToast(err.message || '文件解析失败，请检查格式', 'error');
  } finally {
    // 清空 input 允许再次选择同一文件
    e.target.value = '';
  }
}

/**
 * 保存抽屉中的题目数据
 */
function handleSaveQuestions() {
  const paper = State.papers.find(p => p.id === State.activePaperId);
  if (!paper) {
    showToast('未找到当前试卷', 'error');
    return;
  }

  // 更新试卷题目及时间戳
  paper.questions = JSON.parse(JSON.stringify(State.editingQuestions));
  paper.updatedAt = new Date().toLocaleString();

  savePapersToStorage();
  renderPapers();
  updateDrawerCountHeader();

  showToast(`试卷「${paper.title}」已成功保存！(共 ${paper.questions.length} 道题)`, 'success');
  closeDrawer();
}

/**
 * 试卷重命名
 */
function renamePaperPrompt(paperId) {
  const paper = State.papers.find(p => p.id === paperId);
  if (!paper) return;

  const newTitle = prompt('请输入新的试卷名称：', paper.title);
  if (newTitle && newTitle.trim() && newTitle.trim() !== paper.title) {
    paper.title = newTitle.trim();
    savePapersToStorage();
    renderPapers();
    showToast(`试卷已更名为「${paper.title}」`, 'success');
  }
}

/**
 * 复制试卷
 */
function duplicatePaper(paperId) {
  const paper = State.papers.find(p => p.id === paperId);
  if (!paper) return;

  const clone = JSON.parse(JSON.stringify(paper));
  clone.id = 'paper-' + Date.now();
  clone.title = `${paper.title} (副本)`;
  clone.updatedAt = new Date().toLocaleString();

  State.papers.unshift(clone);
  savePapersToStorage();
  renderPapers();
  showToast(`已成功复制试卷「${clone.title}」`, 'success');
}

/**
 * 删除试卷
 */
function deletePaper(paperId) {
  const paper = State.papers.find(p => p.id === paperId);
  if (!paper) return;

  if (confirm(`确定要删除试卷「${paper.title}」吗？此操作不可撤销。`)) {
    State.papers = State.papers.filter(p => p.id !== paperId);
    if (State.activePaperId === paperId) {
      closeDrawer();
    }
    savePapersToStorage();
    renderPapers();
    showToast(`试卷「${paper.title}」已删除`, 'info');
  }
}

/**
 * 浮动 Toast 提示
 */
function showToast(message, type = 'info', duration = 3000) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  let icon = '';
  if (type === 'success') {
    icon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
  } else if (type === 'error') {
    icon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
  } else {
    icon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ec4899" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
  }

  toast.innerHTML = `
    ${icon}
    <span>${escapeHtml(message)}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.25s ease';
    setTimeout(() => {
      if (toast.parentElement) toast.parentElement.removeChild(toast);
    }, 250);
  }, duration);
}

/**
 * 转义 HTML 特殊字符，防 XSS
 */
function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// 页面加载完成后启动
document.addEventListener('DOMContentLoaded', initApp);
