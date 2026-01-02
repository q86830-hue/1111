import { LevelData, LevelTheme, GameType } from '../types';

const EMOJIS = ['🍎', '🍓', '🍒', '⭐', '🎈', '🎁', '🍦', '🍩', '🏀', '🚗', '🐱', '🐼', '🦊', '🦒', '🦋', '🌈'];
const SHAPES = ['长方体', '正方体', '圆柱', '球'];

const rnd = (seed: number, max: number, min: number = 0) => {
  const x = Math.sin(seed) * 10000;
  return Math.floor((x - Math.floor(x)) * (max - min + 1)) + min;
};

export const generateLevelFromPool = (grade: number, slotId: number, pageIndex: number): LevelData => {
  const seed = (grade * 10000) + (slotId * 100) + (pageIndex * 7);
  const itemEmoji = EMOJIS[rnd(seed, EMOJIS.length - 1)];
  let item: any = { q: "", ans: "", unit: "教材同步", config: { visualType: "TEXT_ONLY", opts: [] } };

  const isAlt = slotId % 2 === 0;

  switch (grade) {
    case 1:
      if (slotId <= 2) {
        const c = isAlt ? rnd(seed, 10, 6) : rnd(seed, 5, 1);
        item = { q: `数一数：有几个 ${itemEmoji}？`, ans: String(c), unit: "准备课", config: { count: c, items: [itemEmoji], visualType: "COUNT_ITEMS", opts: [String(c), String(c+1), String(c+2)] } };
      } else if (slotId <= 4) {
        const pos = isAlt ? "后" : "前";
        item = { q: `观察队伍，谁排在最${pos}面？`, ans: isAlt ? "小猫" : "小狗", unit: "位置", config: { visualType: "POSITION_VISUAL", pos, opts: ["小猫", "小狗", "小兔"] } };
      } else if (slotId <= 6) {
        const total = isAlt ? 5 : 4; 
        const p1 = rnd(seed, total - 1, 1);
        item = { q: `${total}可以分成${p1}和几？`, ans: String(total - p1), unit: "分与合", config: { total, p1, visualType: "DECOMP_VISUAL", opts: [String(total-p1), "1", "2"] } };
      } else if (slotId <= 10) {
        const s = SHAPES[rnd(seed, 3)];
        item = { q: `找一找：哪一个是“${s}”？`, ans: s, unit: "认识图形", config: { visualType: "GEOMETRY_VISUAL", shape: s, opts: SHAPES } };
      } else if (slotId <= 15) {
        const n1 = rnd(seed, 8, 2);
        const n2 = rnd(seed + 1, 10 - n1, 1);
        item = { q: `算一算：${n1} + ${n2} = ?`, ans: String(n1+n2), unit: "10以内加法", config: { n1, n2, symbol: '+', visualType: "BASIC_CALC", opts: [String(n1+n2), String(n1+n2+1), String(n1+n2-1)] } };
      } else {
        const n2 = isAlt ? 5 : 4;
        item = { q: `凑十法计算：9 + ${n2} = ?`, ans: String(9+n2), unit: "20以内进位加", config: { n1: 9, n2: n2, visualType: "MAKE_TEN_MINI", opts: [String(9+n2), "12", "15"] } };
      }
      break;
    default:
      // 其他年级简化处理，确保不报错
      item = { q: `${grade}年级练习：${slotId} + 5 = ?`, ans: String(slotId + 5), unit: "综合练习", config: { opts: [String(slotId+5), String(slotId+6), "10"] } };
  }

  const finalOptions = item.config.opts.sort(() => rnd(seed + 99, 100) / 100 - 0.5);

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