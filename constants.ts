
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
    { id: 1, unit: "一上 U1", title: "准备课：数一数", type: GameType.COUNTING, theme: LevelTheme.FOREST, constraints: { max: 10 } },
    { id: 2, unit: "一上 U2", title: "位置：上下左右", type: GameType.POSITIONING, theme: LevelTheme.CITY },
    { id: 3, unit: "一上 U3", title: "1-5的认识和加减法", type: GameType.DECOMPOSITION, theme: LevelTheme.OCEAN, constraints: { max: 5 } },
    { id: 4, unit: "一上 U4", title: "认识立体图形", type: GameType.SHAPES_3D, theme: LevelTheme.CITY },
    { id: 5, unit: "一上 U5", title: "6-10的认识和加减法", type: GameType.ADDITION, theme: LevelTheme.FOREST, constraints: { min: 6, max: 10 } },
    { id: 6, unit: "一上 U6", title: "11-20各数的认识", type: GameType.PLACE_VALUE, theme: LevelTheme.SPACE, constraints: { min: 11, max: 20 } },
    { id: 7, unit: "一上 U7", title: "认识钟表：整时", type: GameType.CLOCK, theme: LevelTheme.DETECTIVE },
    { id: 8, unit: "一上 U8", title: "20以内的进位加法", type: GameType.MAKE_TEN, theme: LevelTheme.SPACE, constraints: { max: 20 } }
  ],
  2: [
    { id: 1, unit: "二上 U1", title: "长度单位：厘米/米", type: GameType.MEASUREMENT, theme: LevelTheme.FOREST },
    { id: 2, unit: "二上 U2", title: "100以内加法和减法", type: GameType.ADDITION, theme: LevelTheme.CITY, constraints: { max: 100 } }
  ]
};

export const LEVEL_DATA = [];
