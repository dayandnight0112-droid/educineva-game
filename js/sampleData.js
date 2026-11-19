/**
 * Educineva 题目管理 - 初始数据
 * 精确匹配设计图中的默认试卷与题目
 */

const DEFAULT_PAPERS = [
  {
    id: 'paper-1',
    title: 'Paper 1',
    grade: '一年级',
    subject: '数学',
    updatedAt: '2026-11-05 14:30',
    questions: [
      {
        id: 'q-1-1',
        type: 'single',
        stem: '3 + 5 = ?',
        options: {
          A: '6',
          B: '7',
          C: '8',
          D: '9'
        },
        answer: 'C'
      },
      {
        id: 'q-1-2',
        type: 'single',
        stem: '10 - 4 = ?',
        options: {
          A: '5',
          B: '6',
          C: '7',
          D: '8'
        },
        answer: 'B'
      },
      {
        id: 'q-1-3',
        type: 'single',
        stem: '7 + 6 = ?',
        options: {
          A: '12',
          B: '13',
          C: '14',
          D: '15'
        },
        answer: 'B'
      },
      {
        id: 'q-1-4',
        type: 'single',
        stem: '15 - 8 = ?',
        options: {
          A: '6',
          B: '7',
          C: '8',
          D: '9'
        },
        answer: 'B'
      },
      {
        id: 'q-1-5',
        type: 'single',
        stem: '9 + 9 = ?',
        options: {
          A: '18',
          B: '17',
          C: '19',
          D: '20'
        },
        answer: 'A'
      },
      {
        id: 'q-1-6',
        type: 'single',
        stem: '20 - 7 = ?',
        options: {
          A: '12',
          B: '13',
          C: '14',
          D: '11'
        },
        answer: 'B'
      },
      {
        id: 'q-1-7',
        type: 'single',
        stem: '4 + 8 = ?',
        options: {
          A: '11',
          B: '12',
          C: '13',
          D: '14'
        },
        answer: 'B'
      },
      {
        id: 'q-1-8',
        type: 'single',
        stem: '16 - 9 = ?',
        options: {
          A: '6',
          B: '7',
          C: '8',
          D: '5'
        },
        answer: 'B'
      },
      {
        id: 'q-1-9',
        type: 'single',
        stem: '5 + 7 = ?',
        options: {
          A: '11',
          B: '12',
          C: '13',
          D: '10'
        },
        answer: 'B'
      },
      {
        id: 'q-1-10',
        type: 'single',
        stem: '18 - 9 = ?',
        options: {
          A: '8',
          B: '9',
          C: '10',
          D: '7'
        },
        answer: 'B'
      },
      {
        id: 'q-1-11',
        type: 'single',
        stem: '2 + 9 = ?',
        options: {
          A: '10',
          B: '11',
          C: '12',
          D: '13'
        },
        answer: 'B'
      },
      {
        id: 'q-1-12',
        type: 'single',
        stem: '14 - 6 = ?',
        options: {
          A: '7',
          B: '8',
          C: '9',
          D: '6'
        },
        answer: 'B'
      },
      {
        id: 'q-1-13',
        type: 'single',
        stem: '8 + 8 = ?',
        options: {
          A: '15',
          B: '16',
          C: '17',
          D: '18'
        },
        answer: 'B'
      },
      {
        id: 'q-1-14',
        type: 'single',
        stem: '12 - 5 = ?',
        options: {
          A: '6',
          B: '7',
          C: '8',
          D: '9'
        },
        answer: 'B'
      },
      {
        id: 'q-1-15',
        type: 'single',
        stem: '6 + 9 = ?',
        options: {
          A: '14',
          B: '15',
          C: '16',
          D: '13'
        },
        answer: 'B'
      },
      {
        id: 'q-1-16',
        type: 'single',
        stem: '17 - 8 = ?',
        options: {
          A: '8',
          B: '9',
          C: '10',
          D: '7'
        },
        answer: 'B'
      },
      {
        id: 'q-1-17',
        type: 'single',
        stem: '3 + 12 = ?',
        options: {
          A: '14',
          B: '15',
          C: '16',
          D: '17'
        },
        answer: 'B'
      },
      {
        id: 'q-1-18',
        type: 'single',
        stem: '19 - 6 = ?',
        options: {
          A: '12',
          B: '13',
          C: '14',
          D: '15'
        },
        answer: 'B'
      },
      {
        id: 'q-1-19',
        type: 'single',
        stem: '5 + 11 = ?',
        options: {
          A: '15',
          B: '16',
          C: '17',
          D: '18'
        },
        answer: 'B'
      },
      {
        id: 'q-1-20',
        type: 'single',
        stem: '11 - 3 = ?',
        options: {
          A: '7',
          B: '8',
          C: '9',
          D: '6'
        },
        answer: 'B'
      }
    ]
  },
  {
    id: 'paper-2',
    title: 'Paper 2',
    grade: '二年级',
    subject: '数学',
    updatedAt: '2026-11-04 16:20',
    questions: Array.from({ length: 25 }, (_, idx) => {
      const a = (idx + 2) * 3;
      const b = (idx + 1) * 2;
      return {
        id: `q-2-${idx + 1}`,
        type: 'single',
        stem: `${a} + ${b} = ?`,
        options: {
          A: `${a + b - 1}`,
          B: `${a + b}`,
          C: `${a + b + 1}`,
          D: `${a + b + 2}`
        },
        answer: 'B'
      };
    })
  },
  {
    id: 'paper-3',
    title: '科学小测',
    grade: '三年级',
    subject: '科学',
    updatedAt: '2026-11-03 11:15',
    questions: [
      {
        id: 'q-3-1',
        type: 'single',
        stem: '植物进行光合作用需要吸收哪种气体？',
        options: {
          A: '氧气',
          B: '二氧化碳',
          C: '氮气',
          D: '氢气'
        },
        answer: 'B'
      },
      {
        id: 'q-3-2',
        type: 'single',
        stem: '以下哪种动物属于哺乳动物？',
        options: {
          A: '金鱼',
          B: '鸽子',
          C: '海豚',
          D: '蝴蝶'
        },
        answer: 'C'
      },
      {
        id: 'q-3-3',
        type: 'single',
        stem: '太阳从哪个方向升起？',
        options: {
          A: '东方',
          B: '西方',
          C: '南方',
          D: '北方'
        },
        answer: 'A'
      },
      {
        id: 'q-3-4',
        type: 'single',
        stem: '水在常温常压下的沸点是多少度？',
        options: {
          A: '80℃',
          B: '90℃',
          C: '100℃',
          D: '120℃'
        },
        answer: 'C'
      },
      {
        id: 'q-3-5',
        type: 'single',
        stem: '磁铁能吸引以下哪种物质？',
        options: {
          A: '塑料尺',
          B: '铁钉',
          C: '木块',
          D: '纸张'
        },
        answer: 'B'
      },
      ...Array.from({ length: 10 }, (_, i) => ({
        id: `q-3-${i + 6}`,
        type: 'single',
        stem: `科学基础知识训练第 ${i + 6} 题：物体受热通常会？`,
        options: {
          A: '膨胀',
          B: '收缩',
          C: '消失',
          D: '不变'
        },
        answer: 'A'
      }))
    ]
  },
  {
    id: 'paper-4',
    title: '词汇练习',
    grade: '四年级',
    subject: '英文',
    updatedAt: '2026-11-02 09:40',
    questions: [
      {
        id: 'q-4-1',
        type: 'single',
        stem: 'Choose the correct synonym for "Happy":',
        options: {
          A: 'Sad',
          B: 'Joyful',
          C: 'Angry',
          D: 'Tired'
        },
        answer: 'B'
      },
      {
        id: 'q-4-2',
        type: 'single',
        stem: 'Which word is the opposite of "Ancient"?',
        options: {
          A: 'Modern',
          B: 'Old',
          C: 'Historic',
          D: 'Past'
        },
        answer: 'A'
      },
      ...Array.from({ length: 28 }, (_, i) => ({
        id: `q-4-${i + 3}`,
        type: 'single',
        stem: `Vocabulary Practice Question ${i + 3}: Select the correct word form.`,
        options: {
          A: 'Quick',
          B: 'Quickly',
          C: 'Quicker',
          D: 'Quickest'
        },
        answer: 'B'
      }))
    ]
  },
  {
    id: 'paper-5',
    title: '单元复习',
    grade: '五年级',
    subject: '华文',
    updatedAt: '2026-11-01 15:00',
    questions: [
      {
        id: 'q-5-1',
        type: 'single',
        stem: '下列词语中字形完全正确的一项是？',
        options: {
          A: '按步就班',
          B: '循规蹈矩',
          C: '再接再励',
          D: '迫不急待'
        },
        answer: 'B'
      },
      {
        id: 'q-5-2',
        type: 'single',
        stem: '“温故而知新”出自哪部古代经典？',
        options: {
          A: '《道德经》',
          B: '《论语》',
          C: '《孟子》',
          D: '《史记》'
        },
        answer: 'B'
      },
      ...Array.from({ length: 18 }, (_, i) => ({
        id: `q-5-${i + 3}`,
        type: 'single',
        stem: `华文阅读与理解专项复习第 ${i + 3} 题`,
        options: {
          A: '比喻',
          B: '拟人',
          C: '排比',
          D: '夸张'
        },
        answer: 'A'
      }))
    ]
  },
  {
    id: 'paper-6',
    title: 'Sejarah Bab 1',
    grade: '中四',
    subject: '历史',
    updatedAt: '2026-10-30 17:10',
    questions: [
      {
        id: 'q-6-1',
        type: 'single',
        stem: 'Apakah ciri utama negara bangsa Kesultanan Melayu Melaka?',
        options: {
          A: 'Sistem Raja Berperlembagaan',
          B: 'Kedaulatan dan Undang-undang',
          C: 'Demokrasi Berparlimen',
          D: 'Republik'
        },
        answer: 'B'
      },
      {
        id: 'q-6-2',
        type: 'single',
        stem: 'Undang-undang manakah yang mengandungi 44 fasal dalam Kesultanan Melayu Melaka?',
        options: {
          A: 'Hukum Kanun Melaka',
          B: 'Undang-Undang Laut Melaka',
          C: 'Undang-Undang 99 Perak',
          D: 'Undang-Undang Pahang'
        },
        answer: 'A'
      },
      ...Array.from({ length: 16 }, (_, i) => ({
        id: `q-6-${i + 3}`,
        type: 'single',
        stem: `Soalan Latihan Sejarah Tingkatan 4 No. ${i + 3}`,
        options: {
          A: 'Pilihan A',
          B: 'Pilihan B',
          C: 'Pilihan C',
          D: 'Pilihan D'
        },
        answer: 'A'
      }))
    ]
  }
];

const GRADE_OPTIONS = [
  '一年级',
  '二年级',
  '三年级',
  '四年级',
  '五年级',
  '六年级',
  '中一',
  '中二',
  '中三',
  '中四',
  '中五'
];

const SUBJECT_OPTIONS = [
  '数学',
  '科学',
  '英文',
  '华文',
  '历史',
  '地理',
  '物理',
  '化学',
  '生物',
  '道德与公民'
];
