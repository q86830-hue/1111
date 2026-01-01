
import { GameType, LevelTheme } from './types';

export interface CurriculumItem {
  id: number;
  unit: string;
  title: string;
  type: GameType;
  theme: LevelTheme;
}

export const PEP_CURRICULUM: Record<number, CurriculumItem[]> = {
  1: [
    { id: 1, unit: "数一数", title: "美丽的校园", type: GameType.COUNTING, theme: LevelTheme.FOREST },
    { id: 2, unit: "分与合", title: "数字拆拆乐", type: GameType.DECOMPOSITION, theme: LevelTheme.FOREST },
    { id: 3, unit: "20内加减", title: "口算小达人", type: GameType.ADDITION, theme: LevelTheme.FOREST },
    { id: 4, unit: "认识钟表", title: "时间滴答滴", type: GameType.CLOCK, theme: LevelTheme.FOREST }
  ],
  2: [
    { id: 1, unit: "长度单位", title: "量一量", type: GameType.MEASUREMENT, theme: LevelTheme.FOREST },
    { id: 2, unit: "表内乘法", title: "九九乘法表", type: GameType.MULTIPLICATION, theme: LevelTheme.FOREST },
    { id: 3, unit: "角的认识", title: "小小角大秘密", type: GameType.ANGLES, theme: LevelTheme.FOREST }
  ],
  3: [
    { id: 1, unit: "时分秒", title: "时间单位转换", type: GameType.CLOCK, theme: LevelTheme.OCEAN },
    { id: 2, unit: "周长计算", title: "围篱笆", type: GameType.PERIMETER, theme: LevelTheme.OCEAN },
    { id: 3, unit: "分数初步", title: "分饼游戏", type: GameType.FRACTION, theme: LevelTheme.OCEAN }
  ],
  4: [
    { id: 1, unit: "大数的认识", title: "万以上的世界", type: GameType.PLACE_VALUE, theme: LevelTheme.OCEAN },
    { id: 2, unit: "角的度量", title: "量角器用法", type: GameType.ANGLES, theme: LevelTheme.OCEAN },
    { id: 3, unit: "平行与垂直", title: "线与线的关系", type: GameType.ORIENTATION, theme: LevelTheme.OCEAN }
  ],
  5: [
    { id: 1, unit: "小数乘法", title: "点点变变变", type: GameType.MULTIPLICATION, theme: LevelTheme.SPACE },
    { id: 2, unit: "简易方程", title: "寻找未知数X", type: GameType.ADDITION, theme: LevelTheme.SPACE },
    { id: 3, unit: "多边形面积", title: "土地测量", type: GameType.AREA, theme: LevelTheme.SPACE }
  ],
  6: [
    { id: 1, unit: "分数除法", title: "倒数的力量", type: GameType.DIVISION, theme: LevelTheme.SPACE },
    { id: 2, unit: "圆的知识", title: "圆周率探秘", type: GameType.AREA, theme: LevelTheme.SPACE },
    { id: 3, unit: "百分数", title: "生活中的占比", type: GameType.DECIMAL, theme: LevelTheme.SPACE }
  ]
};

export const LEVEL_DATA = [];
