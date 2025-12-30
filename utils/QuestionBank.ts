
import { GameType, LevelData, LevelTheme } from '../types';

const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const range = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * 核心题库生成器 - 100% 同步 PEP (人教版) 一年级上册进度
 */
export const generateLevelData = (levelId: number, grade: number): LevelData => {
  const unitId = levelId % 100;
  let qType = GameType.EQUATION;
  let qText = "";
  let config: any = {};
  let theme = LevelTheme.FOREST;

  // 根据人教版一年级上册教学大纲进行分发
  if (grade === 1) {
    theme = LevelTheme.FOREST;
    switch(unitId) {
      case 1: // 准备课：数一数
        config = { count: range(3, 10), visual: 'apple', ans: 0 };
        qType = GameType.COUNTING;
        qText = "数一数，图中有多少个苹果？";
        config.ans = config.count;
        break;
      case 2: // 准备课：比多少 (比大小认识)
        const a12 = range(4, 9);
        const b12 = range(1, 4);
        config = { left: a12, right: b12, ans: a12 > b12 ? '左边多' : '右边多' };
        qType = GameType.EQUATION;
        qText = `左边 ${a12} 个，右边 ${b12} 个，哪边更多？`;
        break;
      case 3: // 1-5的认识和加减法
        const a13 = range(1, 4);
        const b13 = range(1, 5 - a13);
        config = { left: a13, right: b13, ans: a13 + b13 };
        qType = GameType.ADDITION;
        qText = `计算：${a13} + ${b13} = ?`;
        break;
      case 4: // 认识图形 (一)
        const s14 = pick(['circle', 'square', 'triangle', 'rectangle']);
        config = { shape: s14, ans: s14 === 'circle' ? '圆形' : s14 === 'square' ? '正方形' : s14 === 'triangle' ? '三角形' : '长方形' };
        qType = GameType.SHAPES;
        qText = `哪个是 ${config.ans}？`;
        break;
      case 5: // 6-10的认识和加减法
        const a15 = range(6, 10);
        const b15 = range(1, 5);
        config = { left: a15, right: b15, ans: a15 - b15 };
        qType = GameType.SUBTRACTION;
        qText = `计算：${a15} - ${b15} = ?`;
        break;
      case 6: // 11-20各数的认识 (组成)
        const a16 = range(11, 19);
        config = { ans: a16 };
        qType = GameType.EQUATION;
        qText = `10 和 ${a16 - 10} 合起来是多少？`;
        break;
      case 7: // 认识钟表
        const h17 = range(1, 12);
        config = { ans: h17, type: 'clock' };
        qType = GameType.EQUATION;
        qText = `分针对准12，时针对准 ${h17}，现在是几点？`;
        break;
      case 8: // 20以内的进位加法 (凑十法)
        const a18 = range(7, 9);
        const b18 = range(4, 6);
        config = { left: a18, right: b18, ans: a18 + b18 };
        qType = GameType.ADDITION;
        qText = `${a18} + ${b18} = ? (试试凑十法)`;
        break;
      default:
        qText = "基础挑战";
        config = { left: 1, right: 1, ans: 2 };
    }
  } 
  else {
    // 简单填充其他年级，防止报错
    const base = grade * 10;
    config = { left: base, right: range(1, 9), ans: base + 1 };
    qText = `同步练习：${config.left} + ${config.right} = ?`;
    config.ans = config.left + config.right;
  }

  return {
    id: levelId,
    grade: grade,
    title: `第${unitId}单元`,
    theme: theme,
    type: qType,
    question: qText,
    config: config,
    stars: 0,
    locked: false,
    uniqueId: `${grade}-${unitId}-${Date.now()}`
  } as LevelData;
};
