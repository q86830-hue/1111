
import { GameType, LevelData, LevelTheme } from '../types';
import { PEP_CURRICULUM } from '../constants';

const range = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export const generateLevelData = (levelId: number, grade: number): LevelData => {
  const unitId = levelId % 100;
  const currGrade = PEP_CURRICULUM[grade] || PEP_CURRICULUM[1];
  const curriculum = currGrade.find(u => u.id === unitId) || currGrade[0];
  
  const { type, constraints, title } = curriculum;
  let config: any = { options: [] };
  let ans: any = "";
  let question = "";

  const MAX = constraints?.max || 10;
  const MIN = constraints?.min || 0;

  try {
    switch (type) {
      case GameType.COUNTING:
        const count = range(Math.max(MIN, 1), MAX);
        ans = count;
        question = `数一数图中一共有多少个物体？`;
        config = { count, items: ['🦊', '🐻', '🐰', '🦁', '🐼'], visualType: "COUNT_ITEMS" };
        break;

      case GameType.ADDITION:
        const sum = range(Math.max(MIN, 2), MAX);
        const a1 = range(0, sum);
        ans = sum;
        config = { n1: a1, n2: sum - a1, symbol: '+', visualType: "BASIC_CALC" };
        question = `请算出算式结果：${config.n1} + ${config.n2} = ?`;
        break;

      case GameType.DECOMPOSITION:
        const dTotal = range(Math.max(MIN, 2), MAX);
        const dP1 = range(1, dTotal - 1);
        ans = dTotal - dP1;
        question = `${dTotal} 可以分成 ${dP1} 和几？`;
        config = { total: dTotal, part1: dP1, visualType: "NUMBER_BOND" };
        break;

      case GameType.PLACE_VALUE:
        const ones = range(0, 9);
        const tens = 1; // 针对一上 11-20 单元
        ans = tens * 10 + ones;
        config = { tens, ones, visualType: "PLACE_VALUE_BLOCKS" };
        question = `图中表示的数是多少？`;
        break;

      case GameType.MAKE_TEN:
        const m1 = range(7, 9);
        const m2 = range(3, 9);
        ans = m1 + m2;
        config = { n1: m1, n2: m2, visualType: "MAKE_TEN_VISUAL" };
        question = `利用凑十法，计算 ${m1} + ${m2} 的结果：`;
        break;

      case GameType.CLOCK:
        const hour = range(1, 12);
        ans = hour;
        config = { h: hour, m: 0, visualType: "ANALOG_CLOCK" };
        question = `现在时针指向几时？（整时）`;
        break;

      default:
        ans = range(1, 5);
        question = `数一数：`;
        config = { count: ans, items: ['🍎'], visualType: "COUNT_ITEMS" };
    }

    config.ans = ans;
    let options = [ans.toString()];
    while (options.length < 3) {
      const wrong = typeof ans === 'number' 
        ? (ans + range(-2, 2)).toString() 
        : "其他";
      if (wrong !== ans.toString() && !options.includes(wrong) && parseInt(wrong) >= 0) {
        options.push(wrong);
      }
    }

    return {
      id: levelId,
      grade,
      title,
      unit: curriculum.unit,
      theme: curriculum.theme,
      type,
      question,
      config: { ...config, options: options.sort(() => Math.random() - 0.5) },
      stars: 0,
      locked: false,
      uniqueId: `${grade}-${unitId}-${Date.now()}`
    };
  } catch (e) {
    // 兜底生成逻辑
    return {
      id: levelId, grade, title: "魔法测验", unit: "一上", theme: LevelTheme.FOREST, type: GameType.COUNTING,
      question: "数一数有几个星星？", config: { count: 3, items: ['⭐'], ans: 3, options: ['2','3','4'], visualType: 'COUNT_ITEMS' },
      stars: 0, locked: false, uniqueId: 'fallback'
    };
  }
};
