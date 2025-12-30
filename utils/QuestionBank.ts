
import { GameType, LevelData, LevelTheme } from '../types';
import { PEP_CURRICULUM } from '../constants';

const range = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export const generateLevelData = (levelId: number, grade: number): LevelData => {
  const unitId = levelId % 100;
  const curriculum = PEP_CURRICULUM[grade]?.find(u => u.id === unitId);
  
  if (!curriculum) {
    throw new Error(`Curriculum missing for G${grade} L${unitId}`);
  }

  const { type, constraints, title } = curriculum;
  let config: any = { options: [] };
  let ans: any = "";
  let question = "";

  const MAX = constraints?.max || 10;
  const MIN = constraints?.min || 0;

  // 严格同步逻辑：每一类 GameType 必须对应一个明确的可视化组件
  switch (type) {
    case GameType.COUNTING:
      const count = range(Math.max(MIN, 1), MAX);
      ans = count;
      question = `数一数图中一共有多少个物体？`;
      config = { count, items: ['🦊', '🐻', '🐰', '🦁', '🐼'], visualType: "COUNT_ITEMS" };
      break;

    case GameType.ADDITION:
      if (grade === 1) {
        const sum = range(2, MAX);
        const a1 = range(0, sum);
        ans = sum;
        config = { n1: a1, n2: sum - a1, symbol: '+', visualType: "BASIC_CALC" };
      } else {
        const sum = range(100, MAX > 10 ? MAX : 1000);
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

    case GameType.MULTIPLICATION:
      const f1 = grade === 2 ? range(2, 5) : range(10, 50);
      const f2 = grade === 2 ? range(2, 5) : range(2, 9);
      ans = f1 * f2;
      question = `请算出乘法结果：${f1} × ${f2} = ?`;
      config = { n1: f1, n2: f2, symbol: '×', visualType: "BASIC_CALC" };
      break;

    case GameType.PLACE_VALUE:
      if (grade === 1) {
        const o = range(0, 9), t = 1;
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
      question = `看图识数：图中表示的数是多少？`;
      break;

    case GameType.AREA:
      if (title.includes("公顷") || title.includes("km")) {
        const val = pick([1, 2, 5, 10]);
        ans = val * 100;
        question = `${val} 平方千米 (km²) 等于多少公顷 (hm²)？`;
        config = { value: val, unit: 'km²', visualType: "UNIT_CONVERSION" };
      } else {
        const w = range(3, 5), h = range(2, 4);
        ans = w * h;
        question = `计算下面长方形的面积（每小格1cm²）。`;
        config = { w, h, visualType: "AREA_GRID" };
      }
      break;

    case GameType.VOLUME:
      const vc = range(6, 15);
      ans = vc;
      question = `数一数，这个立体图形由多少个小正方体组成？`;
      config = { count: vc, visualType: "VOLUME_CUBES" };
      break;

    case GameType.CLOCK:
      const hr = range(1, 12);
      ans = hr;
      question = `观察钟面，现在是几时整？`;
      config = { h: hr, m: 0, visualType: "ANALOG_CLOCK" };
      break;

    case GameType.FRACTION:
      const den = pick([2, 4, 8]);
      const num = range(1, den - 1);
      ans = `${num}/${den}`;
      question = `阴影部分占整个图形的几分之几？`;
      config = { colored: num, total: den, visualType: "FRACTION_PIE" };
      break;

    case GameType.ANGLES:
      const atype = pick(['直角', '锐角', '钝角']);
      ans = atype;
      question = `观察下图，这个角是什么角？`;
      const dgr = atype === '直角' ? 90 : atype === '锐角' ? 45 : 135;
      config = { angle: dgr, visualType: "ANGLE_VIEW" };
      break;

    case GameType.ORIENTATION:
      const direction = pick(['东', '南', '西', '北']);
      ans = direction;
      question = `观察指南针，箭头指向的是什么方向？`;
      config = { targetDir: direction, visualType: "COMPASS_VIEW" };
      break;

    case GameType.PERIMETER:
      const rectW = range(4, 6), rectH = range(3, 4);
      ans = (rectW + rectH) * 2;
      question = `计算这个长方形的周长是多少厘米？`;
      config = { w: rectW, h: rectH, visualType: "PERIMETER_RECT" };
      break;

    case GameType.DECIMAL:
      const decimalVal = (range(1, 9) / 10).toFixed(1);
      ans = decimalVal;
      question = `看图写数，请用小数表示。`;
      config = { val: decimalVal, visualType: "DECIMAL_SLIDER" };
      break;

    case GameType.RATIO:
      const ratio1 = range(1, 4), ratio2 = range(1, 4);
      ans = `${ratio1}:${ratio2}`;
      question = `图中红球与蓝球的数量比是多少？`;
      config = { n1: ratio1, n2: ratio2, visualType: "RATIO_VISUAL" };
      break;

    case GameType.COORDINATES:
      const coordX = range(1, 5), coordY = range(1, 5);
      ans = `(${coordX}, ${coordY})`;
      question = `观察网格，礼物盒的位置（数对）是多少？`;
      config = { x: coordX, y: coordY, visualType: "COORDINATE_GRID" };
      break;

    case GameType.STATISTICS:
      const dataPoints = [range(20, 40), range(50, 80), range(30, 60), range(60, 90)];
      ans = Math.max(...dataPoints);
      question = `观察折线图，数值最高的一项是多少？`;
      config = { data: dataPoints, visualType: "LINE_GRAPH" };
      break;

    case GameType.DECOMPOSITION:
      const decompTotal = range(3, 10);
      const decompP1 = range(1, decompTotal - 1);
      ans = decompTotal - decompP1;
      question = `${decompTotal} 可以分成 ${decompP1} 和几？`;
      config = { total: decompTotal, part1: decompP1, visualType: "NUMBER_BOND" };
      break;

    case GameType.MAKE_TEN:
      const mt1 = pick([7, 8, 9]);
      const mt2 = range(4, 9);
      ans = mt1 + mt2;
      question = `${mt1} + ${mt2} = ? (使用凑十法思考)`;
      config = { n1: mt1, n2: mt2, visualType: "MAKE_TEN_VISUAL" };
      break;

    case GameType.POSITIONING:
      const posType = pick(['上', '下', '左', '右']);
      ans = posType;
      question = `小猫在箱子的哪个位置？`;
      config = { target: '🐱', pos: posType, visualType: "POSITION_GRID" };
      break;

    case GameType.SHAPES_3D:
      const s3d = pick(['长方体', '正方体', '圆柱', '球']);
      ans = s3d;
      question = `观察物体，它属于哪种立体图形？`;
      config = { shape: s3d, visualType: "SHAPE_3D_VIEW" };
      break;

    case GameType.SHAPES_2D:
      const s2d = pick(['平行四边形', '梯形', '三角形']);
      ans = s2d;
      question = `这个图形是什么形状？`;
      config = { shape: s2d, visualType: "SHAPE_2D_VIEW" };
      break;

    case GameType.MEASUREMENT:
      const measureLen = range(2, 12);
      ans = measureLen;
      question = `量一量：图中铅笔的长度是多少厘米？`;
      config = { length: measureLen, visualType: "RULER_MEASURE" };
      break;

    case GameType.COMPARING:
      const compareVal = range(1, 10);
      ans = compareVal;
      question = `挑战：找出与图中数量相同的选项。`;
      config = { count: compareVal, items: ['💎'], visualType: "COUNT_ITEMS" };
      break;

    case GameType.TRANSFORM:
      const trans = pick(['平移', '旋转']);
      ans = trans;
      question = `观察图形的变化，它是属于平移还是旋转？`;
      config = { type: trans, visualType: "TRANSFORM_VIEW" };
      break;

    default:
      ans = range(1, 5);
      question = `知识点挑战：${title}`;
      config = { count: ans, items: ['🌟'], visualType: "COUNT_ITEMS" };
  }

  config.ans = ans;
  let options = [ans.toString()];
  while (options.length < 3) {
    let wrong = "";
    if (typeof ans === 'number') {
      wrong = (ans + pick([-2, -1, 1, 2, 3])).toString();
    } else if (ans.toString().includes('/')) {
      wrong = `${range(1, 8)}/${ans.split('/')[1]}`;
    } else if (ans.toString().includes(':')) {
      wrong = `${range(1, 5)}:${range(1, 5)}`;
    } else if (ans.toString().includes('(')) {
      wrong = `(${range(1, 5)}, ${range(1, 5)})`;
    } else if (type === GameType.ANGLES) {
      wrong = pick(['直角', '锐角', '钝角']);
    } else if (type === GameType.ORIENTATION) {
      wrong = pick(['东', '南', '西', '北']);
    } else if (type === GameType.SHAPES_3D) {
      wrong = pick(['长方体', '正方体', '圆柱', '球']);
    } else if (type === GameType.SHAPES_2D) {
      wrong = pick(['平行四边形', '梯形', '三角形', '长方形']);
    } else if (type === GameType.TRANSFORM) {
      wrong = pick(['平移', '旋转', '对称']);
    } else if (type === GameType.POSITIONING) {
      wrong = pick(['上', '下', '左', '右']);
    } else {
      wrong = `选项 ${options.length + 1}`;
    }
    if (wrong && wrong !== ans.toString() && !options.includes(wrong) && !wrong.startsWith('-')) {
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
