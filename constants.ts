
import { GameType, LevelData, LevelTheme } from './types';

// 人教版全学段单元配置
export const PEP_CURRICULUM: Record<number, {id: number, title: string, type: GameType, theme: LevelTheme}[]> = {
  1: [
    { id: 1, title: "1. 数一数", type: GameType.COUNTING, theme: LevelTheme.FOREST },
    { id: 2, title: "2. 位置比多少", type: GameType.COUNTING, theme: LevelTheme.FOREST },
    { id: 3, title: "3. 1-5加减法", type: GameType.ADDITION, theme: LevelTheme.OCEAN },
    { id: 4, title: "4. 认识图形", type: GameType.SHAPES, theme: LevelTheme.CITY },
    { id: 5, title: "5. 6-10加减法", type: GameType.SUBTRACTION, theme: LevelTheme.FOREST },
    { id: 6, title: "6. 11-20认识", type: GameType.COUNTING, theme: LevelTheme.SPACE },
    { id: 7, title: "7. 认识钟表", type: GameType.EQUATION, theme: LevelTheme.DETECTIVE },
    { id: 8, title: "8. 20内进位加", type: GameType.ADDITION, theme: LevelTheme.SPACE }
  ],
  2: [
    { id: 1, title: "1. 长度单位", type: GameType.EQUATION, theme: LevelTheme.FOREST },
    { id: 2, title: "2. 100内加减", type: GameType.ADDITION, theme: LevelTheme.OCEAN },
    { id: 3, title: "3. 角的认识", type: GameType.SHAPES, theme: LevelTheme.CITY },
    { id: 4, title: "4. 表内乘法(一)", type: GameType.MULTIPLICATION, theme: LevelTheme.FOREST },
    { id: 5, title: "5. 观察物体", type: GameType.SHAPES, theme: LevelTheme.DETECTIVE },
    { id: 6, title: "6. 表内乘法(二)", type: GameType.MULTIPLICATION, theme: LevelTheme.SPACE }
  ],
  3: [
    { id: 1, title: "1. 时分秒", type: GameType.EQUATION, theme: LevelTheme.DETECTIVE },
    { id: 2, title: "2. 万内加减", type: GameType.ADDITION, theme: LevelTheme.FOREST },
    { id: 3, title: "3. 测量", type: GameType.EQUATION, theme: LevelTheme.CITY },
    { id: 4, title: "4. 倍的认识", type: GameType.MULTIPLICATION, theme: LevelTheme.OCEAN },
    { id: 5, title: "5. 多位数乘一", type: GameType.MULTIPLICATION, theme: LevelTheme.SPACE },
    { id: 6, title: "6. 分数初步", type: GameType.FRACTION, theme: LevelTheme.OCEAN }
  ],
  4: [
    { id: 1, title: "1. 大数认识", type: GameType.EQUATION, theme: LevelTheme.SPACE },
    { id: 2, title: "2. 乘法计算", type: GameType.MULTIPLICATION, theme: LevelTheme.CITY },
    { id: 3, title: "3. 平行与垂直", type: GameType.SHAPES, theme: LevelTheme.CITY },
    { id: 4, title: "4. 除法计算", type: GameType.DIVISION, theme: LevelTheme.FOREST },
    { id: 5, title: "5. 小数意义", type: GameType.FRACTION, theme: LevelTheme.OCEAN }
  ],
  5: [
    { id: 1, title: "1. 小数乘法", type: GameType.MULTIPLICATION, theme: LevelTheme.SPACE },
    { id: 2, title: "2. 小数除法", type: GameType.DIVISION, theme: LevelTheme.SPACE },
    { id: 3, title: "3. 简易方程", type: GameType.EQUATION, theme: LevelTheme.DETECTIVE },
    { id: 4, title: "4. 多边形面积", type: GameType.EQUATION, theme: LevelTheme.CITY }
  ],
  6: [
    { id: 1, title: "1. 分数乘法", type: GameType.FRACTION, theme: LevelTheme.OCEAN },
    { id: 2, title: "2. 分数除法", type: GameType.FRACTION, theme: LevelTheme.OCEAN },
    { id: 3, title: "3. 圆的奥秘", type: GameType.EQUATION, theme: LevelTheme.CITY },
    { id: 4, title: "4. 百分数", type: GameType.EQUATION, theme: LevelTheme.SPACE }
  ]
};

// 初始化的占位数据（会被 generateLevelData 覆盖）
export const LEVEL_DATA: LevelData[] = [];
