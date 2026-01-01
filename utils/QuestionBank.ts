
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
        item = { q: `小猫在小狗的${pos}面，谁在${pos}面？`, ans: isAlt ? "小猫" : "小狗", unit: "位置", config: { visualType: "TEXT_ONLY", opts: ["小猫", "小狗", "小兔"] } };
      } else if (slotId <= 6) {
        const total = isAlt ? 5 : 4; const p1 = rnd(seed, total - 1, 1);
        item = { q: `${total}可以分成${p1}和几？`, ans: String(total - p1), unit: "分与合", config: { total, p1, visualType: "DECOMP_VISUAL", opts: [String(total-p1), "1", "2"] } };
      } else if (slotId <= 8) {
        const n1 = rnd(seed, 3, 1); const n2 = rnd(seed + 1, 2, 1);
        item = { q: isAlt ? `计算：${n1+n2} - ${n1} = ?` : `计算：${n1} + ${n2} = ?`, ans: isAlt ? String(n2) : String(n1+n2), unit: "5以内加减", config: { n1: isAlt ? n1+n2 : n1, n2: isAlt ? n1 : n2, symbol: isAlt ? '-' : '+', visualType: "BASIC_CALC", opts: [isAlt ? String(n2) : String(n1+n2), "3", "5"] } };
      } else if (slotId <= 10) {
        const s = SHAPES[rnd(seed, 3)];
        item = { q: `找一找：哪一个是“${s}”？`, ans: s, unit: "认识图形", config: { visualType: "GEOMETRY_VISUAL", shape: s.toLowerCase(), opts: SHAPES } };
      } else if (slotId <= 12) {
        const c = isAlt ? 10 : 8;
        item = { q: `${c}的前一个数是？`, ans: String(c-1), unit: "6-10的认识", config: { visualType: "TEXT_ONLY", opts: [String(c-1), String(c+1), String(c-2)] } };
      } else if (slotId <= 14) {
        const res = isAlt ? 7 : 10;
        item = { q: isAlt ? `10 - 3 = ?` : `6 + 4 = ?`, ans: String(res), unit: "10以内加减", config: { n1: isAlt ? 10 : 6, n2: isAlt ? 3 : 4, symbol: isAlt ? '-' : '+', visualType: "BASIC_CALC", opts: ["7", "10", "8"] } };
      } else if (slotId <= 16) {
        const n = isAlt ? 15 : 12;
        item = { q: `${n}是由1个十和( )个一组成的`, ans: String(n-10), unit: "11-20的认识", config: { visualType: "TEXT_ONLY", opts: [String(n-10), "1", "0"] } };
      } else if (slotId <= 18) {
        const h = isAlt ? 6 : 3;
        item = { q: isAlt ? `看钟表：现在是${h}时半吗？` : `看钟表：现在是几时？`, ans: isAlt ? `${h}时半` : `${h}时`, unit: "认识钟表", config: { hour: h, minute: isAlt ? 30 : 0, visualType: "CLOCK_VISUAL", opts: [`${h}时`, `${h}时半`, `12时`] } };
      } else {
        const n2 = isAlt ? 5 : 4;
        item = { q: `凑十法计算：9 + ${n2} = ?`, ans: String(9+n2), unit: "进位加法", config: { n1: 9, n2: n2, visualType: "MAKE_TEN_MINI", opts: [String(9+n2), String(8+n2), "10"] } };
      }
      break;

    case 2:
      if (slotId <= 4) {
        const val = isAlt ? 200 : 3;
        item = { q: isAlt ? `200厘米 = ( )米` : `3米 = ( )厘米`, ans: isAlt ? "2" : "300", unit: "长度单位", config: { visualType: "TEXT_ONLY", opts: ["2", "300", "20", "30"] } };
      } else if (slotId <= 8) {
        const n1 = isAlt ? 45 : 32; const n2 = isAlt ? 28 : 17;
        item = { q: `${n1} + ${n2} = ?`, ans: String(n1+n2), unit: "100内加减", config: { visualType: "BASIC_CALC", n1, n2, symbol: '+', opts: [String(n1+n2), String(n1+n2-1), String(n1+n2+1)] } };
      } else if (slotId <= 10) {
        item = { q: `直角比锐角( )`, ans: "大", unit: "角的认识", config: { visualType: "TEXT_ONLY", opts: ["大", "小", "一样"] } };
      } else if (slotId <= 16) {
        const n1 = isAlt ? 6 : 4; const n2 = isAlt ? 8 : 7;
        item = { q: `${n1} × ${n2} = ?`, ans: String(n1*n2), unit: "表内乘法", config: { visualType: "BASIC_CALC", n1, n2, symbol: '×', opts: [String(n1*n2), String(n1*n2-n1), String(n1*n2+n1)] } };
      } else {
        const m = isAlt ? 45 : 15;
        item = { q: `8时过${m}分是？`, ans: `8:${m}`, unit: "认识时间", config: { hour: 8, minute: m, visualType: "CLOCK_VISUAL", opts: [`8:${m}`, `9:${m}`, `8:00`] } };
      }
      break;

    case 3:
      if (slotId <= 4) {
        const s = isAlt ? 120 : 60;
        item = { q: `${s}秒 = ( )分`, ans: String(s/60), unit: "时分秒", config: { visualType: "TEXT_ONLY", opts: [String(s/60), "10", "6"] } };
      } else if (slotId <= 8) {
        item = { q: isAlt ? `540 - 370 = ?` : `280 + 450 = ?`, ans: isAlt ? "170" : "730", unit: "万内加减", config: { visualType: "BASIC_CALC", n1: isAlt ? 540 : 280, n2: isAlt ? 370 : 450, symbol: isAlt ? '-' : '+', opts: ["170", "730", "210"] } };
      } else if (slotId <= 12) {
        const a = isAlt ? 5 : 8;
        const res = isAlt ? a*4 : (a+2)*2;
        item = { q: isAlt ? `边长${a}的正方形周长是？` : `长${a}宽2的长方形周长？`, ans: String(res), unit: "周长计算", config: { visualType: "GEOMETRY_VISUAL", shape: isAlt ? "square" : "rect", side: a, opts: [String(res), "10", "16"] } };
      } else {
        const res = isAlt ? "3/4" : "2/3";
        item = { q: isAlt ? `1/4 + 2/4 = ?` : `1 - 1/3 = ?`, ans: res, unit: "分数初步", config: { visualType: "TEXT_ONLY", opts: ["3/4", "2/3", "1/2", "1/3"] } };
      }
      break;

    case 4:
      if (slotId <= 6) {
        item = { q: `5080000 改写成以“万”为单位是？`, ans: "508万", unit: "大数认识", config: { visualType: "TEXT_ONLY", opts: ["508万", "50.8万", "5080万"] } };
      } else if (slotId <= 10) {
        item = { q: isAlt ? `1个周角 = ( )个平角` : `直角的2倍是( )度`, ans: isAlt ? "2" : "180", unit: "角的度量", config: { visualType: "TEXT_ONLY", opts: ["2", "180", "90", "360"] } };
      } else if (slotId <= 15) {
        const res = isAlt ? 4800 : 9;
        item = { q: isAlt ? `120 × 40 = ?` : `810 ÷ 90 = ?`, ans: String(res), unit: "三位数乘两位数", config: { visualType: "BASIC_CALC", n1: isAlt ? 120 : 810, n2: isAlt ? 40 : 90, symbol: isAlt ? '×' : '÷', opts: [String(res), "480", "90"] } };
      } else {
        item = { q: `长方形相邻的两条边( )`, ans: "互相垂直", unit: "平行与垂直", config: { visualType: "TEXT_ONLY", opts: ["互相垂直", "互相平行", "重合"] } };
      }
      break;

    case 5:
      if (slotId <= 6) {
        const res = isAlt ? "1" : "0.36";
        item = { q: isAlt ? `0.25 × 4 = ?` : `1.2 × 0.3 = ?`, ans: res, unit: "小数乘法", config: { visualType: "BASIC_CALC", n1: isAlt ? 0.25 : 1.2, n2: isAlt ? 4 : 0.3, symbol: '×', opts: [res, "0.4", "3.6"] } };
      } else if (slotId <= 10) {
        item = { q: `点A(2, 3)向右平移3格后的坐标是？`, ans: "(5, 3)", unit: "位置", config: { visualType: "TEXT_ONLY", opts: ["(5, 3)", "(2, 6)", "(3, 3)"] } };
      } else if (slotId <= 15) {
        const x = isAlt ? 15 : 8;
        item = { q: isAlt ? `3x = 45, x = ?` : `x + 12 = 20, x = ?`, ans: String(x), unit: "简易方程", config: { visualType: "TEXT_ONLY", opts: [String(x), "10", "5"] } };
      } else {
        item = { q: `底6高4的三角形面积是？`, ans: "12", unit: "多边形面积", config: { visualType: "GEOMETRY_VISUAL", shape: "triangle", side: 6, h: 4, opts: ["12", "24", "10"] } };
      }
      break;

    case 6:
      if (slotId <= 6) {
        const res = isAlt ? "6" : "1/6";
        item = { q: isAlt ? `3/8 × 16 = ?` : `1/2 × 1/3 = ?`, ans: res, unit: "分数乘法", config: { visualType: "TEXT_ONLY", opts: [res, "1/5", "8"] } };
      } else if (slotId <= 10) {
        const res = isAlt ? "1/3" : "4";
        item = { q: isAlt ? `2/3 ÷ 2 = ?` : `1 ÷ 1/4 = ?`, ans: res, unit: "分数除法", config: { visualType: "TEXT_ONLY", opts: [res, "2", "1/4"] } };
      } else if (slotId <= 14) {
        const res = isAlt ? "1:3" : "0.25";
        item = { q: isAlt ? `4 : 12 化简比是？` : `0.5 : 2 的比值是？`, ans: res, unit: "比", config: { visualType: "TEXT_ONLY", opts: [res, "3:1", "4"] } };
      } else {
        const radius = isAlt ? 3 : 2; // 半径3 -> 周长 6pi; 直径4 -> 半径2 -> 面积 4pi
        const res = isAlt ? String(radius * 2) : String(radius * radius);
        item = { 
          q: isAlt ? `半径${radius}cm的圆周长是( )π cm` : `直径4cm的圆面积是( )π cm²`, 
          ans: res, 
          unit: "圆的知识", 
          config: { 
            visualType: "GEOMETRY_VISUAL", 
            shape: "circle", 
            radius: radius,
            label: isAlt ? "r" : "d",
            opts: ["6", "4", "3", "8"] 
          } 
        };
      }
      break;
  }

  // 改进的选项混淆逻辑：确保正确答案必选，然后再随机挑选其他干扰项
  const uniqueDistractors = Array.from(new Set(item.config.opts.filter((o: any) => String(o) !== String(item.ans))));
  const selectedDistractors = uniqueDistractors.sort(() => rnd(seed + 88, 100) / 100 - 0.5).slice(0, 2);
  const finalOptions = [String(item.ans), ...selectedDistractors].sort(() => rnd(seed + 99, 100) / 100 - 0.5);

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
