
import { LevelData, LevelTheme, GameType } from '../types';

const EMOJIS = ['🍎', '🍓', '🍒', '⭐', '🎈', '🎁', '🍦', '🍩', '🏀', '🚗', '🐱', '🐼', '🦊', '🦒', '🦋', '🌈'];
const SHAPES = ['长方体', '正方体', '圆柱', '球'];
const ANIMALS = ['🐶', '🐱', '🐰', '🦁', '🐼', '🦊'];

const rnd = (seed: number, max: number, min: number = 0) => {
  const x = Math.sin(seed) * 10000;
  return Math.floor((x - Math.floor(x)) * (max - min + 1)) + min;
};

export const generateLevelFromPool = (grade: number, slotId: number, pageIndex: number): LevelData => {
  const seed = (grade * 10000) + (slotId * 100) + (pageIndex * 7);
  const itemEmoji = EMOJIS[rnd(seed, EMOJIS.length - 1)];
  let item: any = { q: "", ans: "", unit: "数学乐园", config: { visualType: "ARITHMETIC_CARD", opts: [] } };

  switch (grade) {
    case 1: // 一年级：数数、位置、图形、分与合、钟表、20内加法
      if (slotId <= 4) {
        const count = rnd(seed, 10, 1);
        item = {
          q: `数一数：一共有几个 ${itemEmoji}？`,
          ans: String(count),
          unit: "一上：数一数",
          config: { visualType: "COUNT_ITEMS", count, items: [itemEmoji], opts: [String(count), String(count+1), String(count-1)] }
        };
      } else if (slotId <= 8) {
        const hr = rnd(seed, 12, 1);
        const isHalf = rnd(seed + 1, 1) === 1;
        item = {
          q: `认识钟表：现在是几时？`,
          ans: isHalf ? `${hr}时半` : `${hr}时整`,
          unit: "一上：认识钟表",
          config: { visualType: "CLOCK_VISUAL", hour: hr, isHalf, opts: [`${hr}时整`, `${hr}时半`, `${hr === 12 ? 1 : hr + 1}时整`] }
        };
      } else {
        const n1 = rnd(seed, 9, 6);
        const n2 = rnd(seed + 2, 9, 5);
        item = {
          q: `凑十法：${n1} + ${n2} = ?`,
          ans: String(n1 + n2),
          unit: "一上：20内加法",
          config: { visualType: "MAKE_TEN_MINI", n1, n2, opts: [String(n1 + n2), String(n1+n2-1), String(n1+n2+1)] }
        };
      }
      break;

    case 2: // 二年级：乘法初步、长度、角、观察物体
      if (slotId <= 10) {
        const n1 = rnd(seed, 5, 2);
        const n2 = rnd(seed + 1, 5, 2);
        item = {
          q: `乘法含义：${n1} × ${n2} = ?`,
          ans: String(n1 * n2),
          unit: "二上：表内乘法",
          config: { visualType: "MULT_ARRAY", r: n1, c: n2, emoji: itemEmoji, opts: [String(n1 * n2), String(n1 * n2 + n1), String(n1 * n2 - n1)] }
        };
      } else {
        item = {
          q: "测量单位：1米等于多少厘米？",
          ans: "100厘米",
          unit: "二上：长度单位",
          config: { visualType: "ARITHMETIC_CARD", n1: "1米", op: "=", n2: "? 厘米", ans: "100", opts: ["10厘米", "100厘米", "1000厘米"] }
        };
      }
      break;

    case 3: // 三年级：万以内加减、倍、分数初步、周长
      if (slotId <= 10) {
        const den = rnd(seed, 8, 2);
        const num = rnd(seed + 1, den - 1, 1);
        item = {
          q: `认识分数：阴影部分占整个圆的几分之几？`,
          ans: `${num}/${den}`,
          unit: "三上：分数的初步认识",
          config: { visualType: "FRACTION_PIE", num, den, opts: [`${num}/${den}`, `${den - num}/${den}`, `1/${den}`] }
        };
      } else {
        const l = rnd(seed, 10, 5);
        const w = rnd(seed + 1, 4, 2);
        item = {
          q: `计算周长：长${l}cm，宽${w}cm的长方形周长是？`,
          ans: String((l + w) * 2),
          unit: "三上：长方形周长",
          config: { visualType: "ARITHMETIC_CARD", n1: `长${l}`, op: "周长", n2: `宽${w}`, opts: [String((l + w) * 2), String(l * w), String(l + w)] }
        };
      }
      break;

    case 4: // 四年级：大数认识、公顷、角、乘除法
      if (slotId <= 10) {
        const base = rnd(seed, 999, 100);
        item = {
          q: `大数的读法：${base}万里有几个万？`,
          ans: String(base),
          unit: "四上：大数的认识",
          config: { visualType: "PLACE_VALUE", val: base * 10000, opts: [String(base), String(base * 10), String(base / 10)] }
        };
      } else {
        item = {
          q: "几何基础：平角是多少度？",
          ans: "180",
          unit: "四上：角的度量",
          config: { visualType: "ARITHMETIC_CARD", n1: "平角", op: "=", n2: "? 度", opts: ["90", "180", "360"] }
        };
      }
      break;

    case 5: // 五年级：小数乘除、方程、多边形面积
      const x = rnd(seed, 10, 2);
      const b = rnd(seed + 1, 20, 5);
      item = {
        q: `简易方程：x + ${b} = ${x + b}，则 x = ?`,
        ans: String(x),
        unit: "五上：简易方程",
        config: { visualType: "ARITHMETIC_CARD", n1: "x", op: "+", n2: b, opts: [String(x), String(x + 2), String(Math.abs(x - 2))] }
      };
      break;

    case 6: // 六年级：分数乘除、圆、百分数、比
      if (slotId <= 10) {
        const r = rnd(seed, 10, 2);
        item = {
          q: `圆的周长：半径为 ${r}cm 的圆，周长是多少π cm？`,
          ans: String(2 * r),
          unit: "六上：圆",
          config: { visualType: "ARITHMETIC_CARD", n1: `r=${r}`, op: "C=", n2: "?π", opts: [String(2 * r), String(r * r), String(r)] }
        };
      } else {
        item = {
          q: "百分数应用：50% 化成小数是多少？",
          ans: "0.5",
          unit: "六上：百分数",
          config: { visualType: "ARITHMETIC_CARD", n1: "50%", op: "→", n2: "小数", opts: ["0.5", "0.05", "5.0"] }
        };
      }
      break;
  }

  const finalOptions = Array.from(new Set([item.ans, ...item.config.opts]))
    .sort(() => rnd(seed + 99, 100) / 100 - 0.5);

  return {
    id: slotId,
    grade,
    title: `第 ${slotId} 关`,
    unit: item.unit,
    theme: grade <= 2 ? LevelTheme.FOREST : grade <= 4 ? LevelTheme.OCEAN : LevelTheme.SPACE,
    type: GameType.ADDITION,
    question: item.q,
    config: { ...item.config, ans: item.ans, options: finalOptions },
    stars: 0,
    locked: false,
    uniqueId: `G${grade}-S${slotId}-P${pageIndex}-V${seed}`
  };
};
