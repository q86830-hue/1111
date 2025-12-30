
import { GameType, LevelTheme } from './types';

export interface CurriculumItem {
  id: number;
  unit: string;
  title: string;
  type: GameType;
  theme: LevelTheme;
  constraints?: {
    max?: number;
    min?: number;
    fixedQuestion?: string;
  };
}

export const PEP_CURRICULUM: Record<number, CurriculumItem[]> = {
  1: [
    { id: 1, unit: "一上 U1", title: "数一数：森林伙伴", type: GameType.COUNTING, theme: LevelTheme.FOREST, constraints: { max: 10 } },
    { id: 2, unit: "一上 U2", title: "位置：上下左右", type: GameType.POSITIONING, theme: LevelTheme.CITY },
    { id: 3, unit: "一上 U3", title: "1-5的分与合", type: GameType.DECOMPOSITION, theme: LevelTheme.OCEAN, constraints: { max: 5 } },
    { id: 4, unit: "一上 U3", title: "5以内的加法", type: GameType.ADDITION, theme: LevelTheme.OCEAN, constraints: { max: 5 } },
    { id: 5, unit: "一上 U4", title: "认识立体图形", type: GameType.SHAPES_3D, theme: LevelTheme.CITY },
    { id: 6, unit: "一上 U5", title: "6-10的认识", type: GameType.COUNTING, theme: LevelTheme.FOREST, constraints: { min: 6, max: 10 } },
    { id: 7, unit: "一上 U6", title: "11-20各数认识", type: GameType.PLACE_VALUE, theme: LevelTheme.SPACE, constraints: { min: 11, max: 20 } },
    { id: 8, unit: "一上 U7", title: "认识钟表：整时", type: GameType.CLOCK, theme: LevelTheme.DETECTIVE },
    { id: 9, unit: "一上 U8", title: "20以内进位加法", type: GameType.MAKE_TEN, theme: LevelTheme.SPACE, constraints: { max: 20 } },
    { id: 10, unit: "一上 复习", title: "10以内减法意义", type: GameType.SUBTRACTION, theme: LevelTheme.FOREST, constraints: { max: 10 } }
  ],
  2: [
    { id: 1, unit: "二上 U1", title: "长度单位：厘米", type: GameType.MEASUREMENT, theme: LevelTheme.FOREST, constraints: { max: 12 } },
    { id: 2, unit: "二上 U2", title: "100以内加法", type: GameType.ADDITION, theme: LevelTheme.CITY, constraints: { max: 100 } },
    { id: 3, unit: "二上 U3", title: "角的初步认识", type: GameType.ANGLES, theme: LevelTheme.DETECTIVE },
    { id: 4, unit: "二上 U4", title: "表内乘法：2-5", type: GameType.MULTIPLICATION, theme: LevelTheme.OCEAN, constraints: { max: 5 } },
    { id: 5, unit: "二上 U6", title: "表内乘法：6-9", type: GameType.MULTIPLICATION, theme: LevelTheme.SPACE, constraints: { max: 9 } },
    { id: 6, unit: "二下 U2", title: "除法初步认识", type: GameType.DECOMPOSITION, theme: LevelTheme.OCEAN, constraints: { max: 15 } },
    { id: 7, unit: "二下 U3", title: "图形旋转与平移", type: GameType.TRANSFORM, theme: LevelTheme.SPACE },
    { id: 8, unit: "二下 U4", title: "100以内连加减", type: GameType.ADDITION, theme: LevelTheme.DETECTIVE, constraints: { max: 100 } },
    { id: 9, unit: "二下 U5", title: "有余数除法", type: GameType.DECOMPOSITION, theme: LevelTheme.FOREST, constraints: { max: 30 } },
    { id: 10, unit: "二下 U7", title: "万以内数认识", type: GameType.PLACE_VALUE, theme: LevelTheme.SPACE, constraints: { max: 9999 } }
  ],
  3: [
    { id: 1, unit: "三上 U1", title: "时分秒的认识", type: GameType.CLOCK, theme: LevelTheme.DETECTIVE },
    { id: 2, unit: "三上 U2", title: "万以内加减法", type: GameType.ADDITION, theme: LevelTheme.CITY, constraints: { max: 1000 } },
    { id: 3, unit: "三上 U3", title: "测量：千米/吨", type: GameType.MEASUREMENT, theme: LevelTheme.FOREST, constraints: { max: 1000 } },
    { id: 4, unit: "三上 U4", title: "两位数乘两位数", type: GameType.MULTIPLICATION, theme: LevelTheme.SPACE, constraints: { max: 99 } },
    { id: 5, unit: "三上 U5", title: "倍的认识", type: GameType.DECOMPOSITION, theme: LevelTheme.OCEAN, constraints: { max: 20 } },
    { id: 6, unit: "三上 U6", title: "多位数乘一位数", type: GameType.MULTIPLICATION, theme: LevelTheme.CITY, constraints: { max: 9 } },
    { id: 7, unit: "三上 U7", title: "长方形周长", type: GameType.PERIMETER, theme: LevelTheme.CITY },
    { id: 8, unit: "三上 U8", title: "分数的初步认识", type: GameType.FRACTION, theme: LevelTheme.OCEAN },
    { id: 9, unit: "三下 U1", title: "位置与方向", type: GameType.ORIENTATION, theme: LevelTheme.FOREST },
    { id: 10, unit: "三下 U4", title: "面积的计算", type: GameType.AREA, theme: LevelTheme.CITY }
  ],
  4: [
    { id: 1, unit: "四上 U1", title: "大数的认识", type: GameType.PLACE_VALUE, theme: LevelTheme.SPACE, constraints: { max: 9999999 } },
    { id: 2, unit: "四上 U2", title: "面积：公顷/平方千米", type: GameType.AREA, theme: LevelTheme.FOREST },
    { id: 3, unit: "四上 U3", title: "角的度量", type: GameType.ANGLES, theme: LevelTheme.DETECTIVE },
    { id: 4, unit: "四上 U4", title: "三位数乘两位数", type: GameType.MULTIPLICATION, theme: LevelTheme.CITY, constraints: { max: 99 } },
    { id: 5, unit: "四上 U5", title: "平行四边形与梯形", type: GameType.SHAPES_2D, theme: LevelTheme.OCEAN },
    { id: 6, unit: "四上 U6", title: "除数是两位数除法", type: GameType.DECOMPOSITION, theme: LevelTheme.SPACE, constraints: { max: 99 } },
    { id: 7, unit: "四下 U1", title: "四则运算综合", type: GameType.ADDITION, theme: LevelTheme.DETECTIVE, constraints: { max: 1000 } },
    { id: 8, unit: "四下 U4", title: "小数的意义性质", type: GameType.DECIMAL, theme: LevelTheme.SPACE },
    { id: 9, unit: "四下 U5", title: "三角形认识", type: GameType.SHAPES_2D, theme: LevelTheme.OCEAN },
    { id: 10, unit: "四下 U7", title: "图形运动（二）", type: GameType.TRANSFORM, theme: LevelTheme.SPACE }
  ],
  5: [
    { id: 1, unit: "五上 U1", title: "小数乘法", type: GameType.MULTIPLICATION, theme: LevelTheme.SPACE },
    { id: 2, unit: "五上 U2", title: "确定位置：数对", type: GameType.COORDINATES, theme: LevelTheme.CITY },
    { id: 3, unit: "五上 U3", title: "小数除法", type: GameType.DECOMPOSITION, theme: LevelTheme.OCEAN },
    { id: 4, unit: "五上 U5", title: "简易方程", type: GameType.ADDITION, theme: LevelTheme.DETECTIVE },
    { id: 5, unit: "五上 U6", title: "多边形面积", type: GameType.AREA, theme: LevelTheme.CITY },
    { id: 6, unit: "五下 U2", title: "因数与倍数", type: GameType.DECOMPOSITION, theme: LevelTheme.FOREST },
    { id: 7, unit: "五下 U3", title: "长方体正方体", type: GameType.VOLUME, theme: LevelTheme.CITY },
    { id: 8, unit: "五下 U4", title: "分数的意义性质", type: GameType.FRACTION, theme: LevelTheme.OCEAN },
    { id: 9, unit: "五下 U6", title: "折线统计图", type: GameType.STATISTICS, theme: LevelTheme.FOREST },
    { id: 10, unit: "五下 U8", title: "数学广角：找次品", theme: LevelTheme.DETECTIVE, type: GameType.COMPARING }
  ],
  6: [
    { id: 1, unit: "六上 U1", title: "分数乘法", type: GameType.MULTIPLICATION, theme: LevelTheme.OCEAN },
    { id: 2, unit: "六上 U2", title: "位置与方向（二）", type: GameType.ORIENTATION, theme: LevelTheme.CITY },
    { id: 3, unit: "六上 U3", title: "分数除法", type: GameType.DECOMPOSITION, theme: LevelTheme.SPACE },
    { id: 4, unit: "六上 U4", title: "比的认识", type: GameType.RATIO, theme: LevelTheme.DETECTIVE },
    { id: 5, unit: "六上 U5", title: "圆的认识计算", type: GameType.AREA, theme: LevelTheme.OCEAN },
    { id: 6, unit: "六上 U6", title: "百分数（一）", type: GameType.DECIMAL, theme: LevelTheme.CITY },
    { id: 7, unit: "六上 U7", title: "扇形统计图", type: GameType.STATISTICS, theme: LevelTheme.FOREST },
    { id: 8, unit: "六下 U1", title: "负数认识", type: GameType.ADDITION, theme: LevelTheme.SPACE },
    { id: 9, unit: "六下 U2", title: "百分数（二）：折扣", type: GameType.DECIMAL, theme: LevelTheme.CITY },
    { id: 10, unit: "六下 U3", title: "圆柱与圆锥", type: GameType.VOLUME, theme: LevelTheme.SPACE }
  ]
};

export const LEVEL_DATA = [];
