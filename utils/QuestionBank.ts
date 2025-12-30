
import { GameType, LevelData, LevelTheme } from '../types';

const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const range = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export const generateLevelData = (levelId: number, grade: number): LevelData => {
  const unitId = levelId % 100;
  let qType = GameType.EQUATION;
  let qText = "";
  let config: any = {};
  let theme = LevelTheme.FOREST;

  // ---------------------------------------------------------
  // 1-6年级 全量单元逻辑硬编码映射 (严格对照 PEP_CURRICULUM)
  // ---------------------------------------------------------

  if (grade === 1) {
    theme = LevelTheme.FOREST;
    switch(unitId) {
      case 1: config = { count: range(5,10), visual: 'apple', ans: 0 }; qType = GameType.COUNTING; qText = "数一数，图中有多少个苹果？"; config.ans = config.count; break;
      case 2: const a2 = range(4, 8); const b2 = range(2, 4); config = { left: a2, right: b2, ans: a2 > b2 ? '左边多' : '右边多' }; qType = GameType.EQUATION; qText = `左边有 ${a2} 个，右边有 ${b2} 个，哪边更多？`; break;
      case 3: const a3 = range(1,4); const b3 = range(1, 5-a3); config = { left: a3, right: b3, ans: a3 + b3 }; qType = GameType.ADDITION; qText = `${a3} + ${b3} = ?`; break;
      case 4: const s4 = pick(['circle', 'square', 'triangle', 'rectangle']); config = { shape: s4, ans: s4 === 'circle' ? '圆形' : s4 === 'square' ? '正方形' : s4 === 'triangle' ? '三角形' : '长方形' }; qType = GameType.SHAPES; qText = `这是什么图形？`; break;
      case 5: const a5 = range(6,10); const b5 = range(1, 5); config = { left: a5, right: b5, ans: a5 - b5 }; qType = GameType.SUBTRACTION; qText = `${a5} - ${b5} = ?`; break;
      case 6: const a6 = range(11, 20); config = { ans: a6 }; qType = GameType.EQUATION; qText = `一个十和 ${a6 - 10} 个一合起来是多少？`; break;
      case 7: const h7 = range(1, 12); config = { ans: h7 }; qType = GameType.EQUATION; qText = `分针对准 12，时针对准 ${h7}，现在是几点？`; break;
      case 8: const a8 = range(7,9); const b8 = range(4,6); config = { left: a8, right: b8, ans: a8 + b8 }; qType = GameType.ADDITION; qText = `${a8} + ${b8} = ?`; break;
    }
  } 
  else if (grade === 2) {
    theme = LevelTheme.OCEAN;
    switch(unitId) {
      case 1: const cm = range(2, 5); config = { ans: cm * 100 }; qType = GameType.EQUATION; qText = `${cm} 米 = ( ) 厘米`; break;
      case 2: const a22 = range(30, 70); const b22 = range(15, 25); config = { left: a22, right: b22, ans: a22 + b22 }; qType = GameType.ADDITION; qText = `计算：${a22} + ${b22} = ?`; break;
      case 3: config = { ans: '钝角' }; qType = GameType.EQUATION; qText = "比直角大的角叫做什么角？"; break;
      case 4: const a24 = range(2, 5); const b24 = range(2, 5); config = { left: a24, right: b24, ans: a24 * b24 }; qType = GameType.MULTIPLICATION; qText = `${a24} × ${b24} = ?`; break;
      case 5: const cubes = range(3, 6); config = { count: cubes, visual: 'cube_stack', ans: cubes }; qType = GameType.COUNTING; qText = "观察这个立方体组合，是由几个小正方体拼成的？"; break;
      case 6: const a26 = range(6, 9); const b26 = range(2, 9); config = { left: a26, right: b26, ans: a26 * b26 }; qType = GameType.MULTIPLICATION; qText = `${a26} × ${b26} = ?`; break;
    }
  }
  else if (grade === 3) {
    theme = LevelTheme.DETECTIVE;
    switch(unitId) {
      case 1: config = { ans: 180 }; qType = GameType.EQUATION; qText = "3 分钟等于多少秒？"; break;
      case 2: const a32 = range(1000, 5000); const b32 = range(500, 2000); config = { left: a32, right: b32, ans: a32 + b32 }; qType = GameType.ADDITION; qText = `计算：${a32} + ${b32} = ?`; break;
      case 3: const km3 = range(2, 8); config = { ans: km3 * 1000 }; qType = GameType.EQUATION; qText = `${km3} 千米 = ( ) 米`; break;
      case 4: const base = range(3, 7); config = { ans: base * 4 }; qType = GameType.EQUATION; qText = `${base} 的 4 倍是多少？`; break;
      case 5: // 多位数乘一位数 (修复核心点)
        const multi = range(100, 300); const single = range(2, 4);
        config = { left: multi, right: single, ans: multi * single };
        qType = GameType.MULTIPLICATION;
        qText = `多位数乘法：${multi} × ${single} = ?`;
        break;
      case 6: config = { top: 1, bottom: 8, ans: '1/8' }; qType = GameType.FRACTION; qText = "把一个圆平均分成 8 份，其中 1 份是多少？"; break;
    }
  }
  else if (grade === 4) {
    theme = LevelTheme.CITY;
    switch(unitId) {
      case 1: config = { ans: '20000000' }; qType = GameType.EQUATION; qText = "两千万 写成数字是？"; break;
      case 2: // 乘法计算
        const a42 = range(10, 50); const b42 = range(10, 20);
        config = { left: a42, right: b42, ans: a42 * b42 };
        qType = GameType.MULTIPLICATION;
        qText = `两位数乘法：${a42} × ${b42} = ?`;
        break;
      case 3: config = { ans: '垂直' }; qType = GameType.EQUATION; qText = "两条直线相交成直角，就说这两条直线互相( )？"; break;
      case 4: const dr4 = range(15, 25); const dq4 = range(10, 15); config = { left: dr4 * dq4, right: dr4, ans: dq4 }; qType = GameType.DIVISION; qText = `${dr4 * dq4} ÷ ${dr4} = ?`; break;
      case 5: config = { ans: '0.01' }; qType = GameType.EQUATION; qText = "百分之一 写成小数是？"; break;
    }
  }
  else if (grade === 5) {
    theme = LevelTheme.SPACE;
    switch(unitId) {
      case 1: const fa51 = (range(10, 30)/10).toFixed(1); const fb51 = range(2, 5); config = { ans: (parseFloat(fa51)*fb51).toFixed(1) }; qType = GameType.EQUATION; qText = `小数乘法：${fa51} × ${fb51} = ?`; break;
      case 2: const fa52 = 1.2; const fb52 = 0.4; config = { ans: 3 }; qType = GameType.EQUATION; qText = `小数除法：1.2 ÷ 0.4 = ?`; break;
      case 3: const x5 = range(20, 40); config = { ans: x5 }; qType = GameType.EQUATION; qText = `方程 x + 10 = ${x5 + 10}，求 x 的值？`; break;
      case 4: config = { ans: 30 }; qType = GameType.EQUATION; qText = "底 10cm，高 6cm 的三角形面积是( )平方厘米？"; break;
    }
  }
  else if (grade === 6) {
    theme = LevelTheme.SPACE;
    switch(unitId) {
      case 1: config = { ans: '1/4' }; qType = GameType.FRACTION; qText = "1/2 乘 1/2 等于多少？"; break;
      case 2: config = { ans: '2' }; qType = GameType.FRACTION; qText = "1 除以 1/2 等于多少？"; break;
      case 3: config = { ans: '12.56' }; qType = GameType.EQUATION; qText = "半径为 2cm 的圆，面积是多少？(π=3.14)"; break;
      case 4: config = { ans: '50' }; qType = GameType.EQUATION; qText = "100 的 50% 是多少？"; break;
    }
  }

  // 严密的兜底逻辑：如果 qText 为空（说明 PEP_CURRICULUM 中有新增单元但此处未定义），生成一个与标题相称的计算题
  if (!qText) {
    const fallbackA = range(10, 50);
    const fallbackB = range(2, 9);
    config = { left: fallbackA, right: fallbackB, ans: fallbackA + fallbackB };
    qType = GameType.ADDITION;
    qText = `综合练习：${fallbackA} + ${fallbackB} = ?`;
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
    uniqueId: `${grade}-${unitId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  } as LevelData;
};
