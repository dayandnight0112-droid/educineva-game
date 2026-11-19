/**
 * Educineva 题目管理 - Excel & CSV 模版与批量导入工具
 */

const ExcelHelper = {
  // 模版默认数据
  templateRows: [
    {
      index: 1,
      stem: '3 + 5 = ?',
      optionA: '6',
      optionB: '7',
      optionC: '8',
      optionD: '9',
      answer: 'C'
    },
    {
      index: 2,
      stem: '10 - 4 = ?',
      optionA: '5',
      optionB: '6',
      optionC: '7',
      optionD: '8',
      answer: 'B'
    },
    {
      index: 3,
      stem: '地球上最大的大洋是？',
      optionA: '大西洋',
      optionB: '印度洋',
      optionC: '北冰洋',
      optionD: '太平洋',
      answer: 'D'
    },
    {
      index: 4,
      stem: 'What is the opposite of "Hot"?',
      optionA: 'Cold',
      optionB: 'Warm',
      optionC: 'Cool',
      optionD: 'Dry',
      answer: 'A'
    }
  ],

  /**
   * 下载题目模版 (优先 XLSX，降级为带 UTF-8 BOM 的 CSV)
   */
  downloadTemplate(format = 'xlsx') {
    const headers = ['序号', '题目内容(题干)', '选项A', '选项B', '选项C', '选项D', '正确答案(A/B/C/D)'];
    
    // 如果全局加载了 XLSX (SheetJS)
    if (window.XLSX && format === 'xlsx') {
      try {
        const data = [
          headers,
          ...this.templateRows.map(r => [r.index, r.stem, r.optionA, r.optionB, r.optionC, r.optionD, r.answer])
        ];
        const worksheet = window.XLSX.utils.aoa_to_sheet(data);
        
        // 设置列宽
        worksheet['!cols'] = [
          { wch: 8 },
          { wch: 35 },
          { wch: 18 },
          { wch: 18 },
          { wch: 18 },
          { wch: 18 },
          { wch: 20 }
        ];

        const workbook = window.XLSX.utils.book_new();
        window.XLSX.utils.book_append_sheet(workbook, worksheet, 'Educineva题目模版');
        window.XLSX.writeFile(workbook, 'Educineva_题目导入模版.xlsx');
        return true;
      } catch (err) {
        console.warn('XLSX export failed, fallback to CSV:', err);
      }
    }

    // 纯 CSV 模版生成 (UTF-8 with BOM 兼容 Excel 打开无乱码)
    let csvContent = '\uFEFF';
    csvContent += headers.map(h => `"${h.replace(/"/g, '""')}"`).join(',') + '\r\n';
    
    this.templateRows.forEach(row => {
      const line = [
        row.index,
        `"${row.stem.replace(/"/g, '""')}"`,
        `"${row.optionA.replace(/"/g, '""')}"`,
        `"${row.optionB.replace(/"/g, '""')}"`,
        `"${row.optionC.replace(/"/g, '""')}"`,
        `"${row.optionD.replace(/"/g, '""')}"`,
        `"${row.answer.replace(/"/g, '""')}"`
      ].join(',');
      csvContent += line + '\r\n';
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Educineva_题目导入模版.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    return true;
  },

  /**
   * 解析用户上传的 Excel 或 CSV 文件
   * @param {File} file 
   * @returns {Promise<Array>} 解析得到的题目对象列表
   */
  async parseQuestionsFile(file) {
    const ext = file.name.split('.').pop().toLowerCase();
    
    if (ext === 'xlsx' || ext === 'xls') {
      if (!window.XLSX) {
        throw new Error('未加载 Excel 解析器，请尝试使用 CSV 文件或检查网络连接！');
      }
      return this.parseXlsxFile(file);
    } else if (ext === 'csv' || ext === 'txt') {
      return this.parseCsvFile(file);
    } else {
      throw new Error('不支持的文件格式，请上传 .xlsx, .xls 或 .csv 文件');
    }
  },

  /**
   * 使用 SheetJS 解析 Excel
   */
  parseXlsxFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = window.XLSX.read(data, { type: 'array' });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const rawRows = window.XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          
          if (!rawRows || rawRows.length < 2) {
            return reject(new Error('文件中未检测到有效的题目数据'));
          }

          const parsedQuestions = this.normalizeRows(rawRows.slice(1));
          resolve(parsedQuestions);
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = () => reject(new Error('读取文件失败'));
      reader.readAsArrayBuffer(file);
    });
  },

  /**
   * 解析 CSV 纯文本
   */
  parseCsvFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const text = e.target.result;
          const rows = this.parseCsvText(text);
          if (!rows || rows.length < 2) {
            return reject(new Error('CSV 文件中未检测到有效题目'));
          }
          const parsedQuestions = this.normalizeRows(rows.slice(1));
          resolve(parsedQuestions);
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = () => reject(new Error('读取 CSV 失败'));
      reader.readAsText(file, 'utf-8');
    });
  },

  /**
   * 规范化行数据为标准 Educineva 题目结构
   */
  normalizeRows(rows) {
    const list = [];
    rows.forEach((row, i) => {
      if (!row || row.length === 0) return;
      
      // 判断是否有序号列
      // 列形式可能是: [序号, 题干, A, B, C, D, 答案] 或者 [题干, A, B, C, D, 答案]
      let stem = '';
      let optA = '';
      let optB = '';
      let optC = '';
      let optD = '';
      let answer = 'A';

      if (row.length >= 7) {
        stem = String(row[1] || '').trim();
        optA = String(row[2] || '').trim();
        optB = String(row[3] || '').trim();
        optC = String(row[4] || '').trim();
        optD = String(row[5] || '').trim();
        answer = String(row[6] || 'A').trim().toUpperCase();
      } else if (row.length >= 6) {
        stem = String(row[0] || '').trim();
        optA = String(row[1] || '').trim();
        optB = String(row[2] || '').trim();
        optC = String(row[3] || '').trim();
        optD = String(row[4] || '').trim();
        answer = String(row[5] || 'A').trim().toUpperCase();
      } else if (row.length >= 2) {
        stem = String(row[0] || '').trim();
        optA = String(row[1] || '').trim();
      }

      // 如果题干为空，跳过
      if (!stem) return;

      // 规范化答案
      if (!['A', 'B', 'C', 'D'].includes(answer)) {
        answer = 'A';
      }

      list.push({
        id: 'q-import-' + Date.now() + '-' + (i + 1),
        type: 'single',
        stem: stem,
        options: {
          A: optA || '选项 A',
          B: optB || '选项 B',
          C: optC || '选项 C',
          D: optD || '选项 D'
        },
        answer: answer
      });
    });

    return list;
  },

  /**
   * 稳健的 CSV 行文本解析器（支持双引号包裹、换行与逗号）
   */
  parseCsvText(text) {
    const lines = [];
    let row = [];
    let cell = '';
    let inQuotes = false;
    
    // 移除 BOM
    if (text.charCodeAt(0) === 0xFEFF) {
      text = text.slice(1);
    }

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const nextChar = text[i + 1];

      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          cell += '"';
          i++; // 跳过下一个转义引号
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        row.push(cell);
        cell = '';
      } else if ((char === '\r' || char === '\n') && !inQuotes) {
        if (char === '\r' && nextChar === '\n') {
          i++;
        }
        row.push(cell);
        lines.push(row);
        row = [];
        cell = '';
      } else {
        cell += char;
      }
    }
    
    if (cell || row.length > 0) {
      row.push(cell);
      lines.push(row);
    }

    return lines;
  }
};
