
import { GameType, LevelData, LevelTheme } from '../types';
import { PEP_CURRICULUM } from '../constants';

const range = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export const generateLevelData = (levelId: number, grade: number): LevelData => {
  const unitId = levelId % 100;
  const currGrade = PEP_CURRICULUM[grade] || PEP_CURRICULUM[1]; // Fallback to G1
  const curriculum = currGrade.find(u => u.id === unitId) || currGrade[0];
  
  const { type, constraints, title } = curriculum;
  let config: any = { options: [] };
  let ans: any = "";
  let question = "";

  const MAX = constraints?.max || 10;
  const MIN = constraints?.min || 0;

  switch (type) {
    case GameType.COUNTING:
      const count = range(Math.max(MIN, 1), MAX);
      ans = count;
      question = `数一数图中一共有多少个物体？`;
      config = { count, items: ['🦊', '🐻', '🐰', '🦁', '🐼'], visualType: "COUNT_ITEMS" };
      break;

    case GameType.ADDITION:
      if (grade === 1) {
        const sum = range(2, Math.min(MAX, 10));
        const a1 = range(0, sum);
        ans = sum;
        config = { n1: a1, n2: sum - a1, symbol: '+', visualType: "BASIC_CALC" };
      } else {
        const sum = range(100, Math.max(MAX, 1000));
        const a1 = range(50, sum - 10);
        ans = sum;
        config = { n1: a1, n2: sum - a1, symbol: '+', visualType: "BASIC_CALC" };
      }
      question = `请算出算式结果：${config.n1} + ${config.n2} = ?`;
      break;

    case GameType.SUBTRACTION:
      const v1 = range(Math.max(MIN, 5), MAX);
      const v2 = range(0, v1);
      ans = v1 - v2;
      question = `请算出算式结果：${v1} - ${v2} = ?`;
      config = { n1: v1, n2: v2, symbol: '-', visualType: "BASIC_CALC" };
      break;

    case GameType.DECOMPOSITION:
      const decompTotal = range(Math.max(MIN, 3), Math.min(MAX, 10));
      const decompP1 = range(1, decompTotal - 1);
      ans = decompTotal - decompP1;
      question = `${decompTotal} 可以分成 ${decompP1} 和几？`;
      config = { total: decompTotal, part1: decompP1, visualType: "NUMBER_BOND" };
      break;

    case GameType.PLACE_VALUE:
      if (grade === 1) {
        const o = range(0, 9);
        const t = range(1, 1); // For 11-20
        ans = t * 10 + o;
        config = { tens: t, ones: o, visualType: "PLACE_VALUE_BLOCKS" };
      } else if (grade >= 4) {
        const val = range(100000, 999999);
        ans = val;
        config = { value: val, visualType: "PLACE_VALUE_CARDS_LARGE" };
      } else {
        const t = range(1, 9), o = range(0, 9);
        ans = t * 10 + o;
        config = { tens: t, ones: o, visualType: "PLACE_VALUE_BLOCKS" };
      }
      question = `图中表示的数是多少？`;
      break;

    case GameType.SHAPES_3D:
      const s3d = pick(['长方体', '正方体', '圆柱', '球']);
      ans = s3d;
      question = `观察物体，它属于哪种立体图形？`;
      config = { shape: s3d, visualType: "SHAPE_3D_VIEW" };
      break;

    default:
      // Generic fallback for any unhandled type
      const fallbackVal = range(1, 10);
      ans = fallbackVal;
      question = `知识点挑战：${title}`;
      config = { count: ans, items: ['🌟'], visualType: "COUNT_ITEMS" };
  }

  config.ans = ans;
  let options = [ans.toString()];
  
  // Safe option generation
  let attempts = 0;
  while (options.length < 3 && attempts < 20) {
    attempts++;
    let wrong = "";
    if (typeof ans === 'number') {
      wrong = (ans + pick([-2, -1, 1, 2, 3])).toString();
    } else if (type === GameType.SHAPES_3D) {
      wrong = pick(['长方体', '正方体', '圆柱', '球']);
    } else if (type === GameType.DECOMPOSITION) {
      wrong = (range(1, 10)).toString();
    } else {
      wrong = `选项 ${options.length + 1}`;
    }

    if (wrong && wrong !== ans.toString() && !options.includes(wrong) && parseInt(wrong) >= 0) {
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
};
