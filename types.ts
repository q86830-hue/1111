export enum AppView {
  HOME = 'HOME',
  ADVENTURE_MAP = 'ADVENTURE_MAP',
  GAME_LEVEL = 'GAME_LEVEL',
  TOOLS_MENU = 'TOOLS_MENU',
  TOOL_MAKE_TEN = 'TOOL_MAKE_TEN',
  PARENT_DASHBOARD = 'PARENT_DASHBOARD',
}

export enum GameType {
  COUNTING = 'COUNTING', // Count items and pick number
  DECOMPOSITION = 'DECOMPOSITION', // 5 is 2 and ?
  ADDITION = 'ADDITION', // 2 + 3 = ?
  SUBTRACTION = 'SUBTRACTION', // 5 - 2 = ?
  MULTIPLICATION = 'MULTIPLICATION', // 2 x 3 = ?
  DIVISION = 'DIVISION', // 6 / 2 = ?
  SHAPES = 'SHAPES', // Pick the Square
  FRACTION = 'FRACTION', // Identify 1/2, 1/3 etc.
  EQUATION = 'EQUATION', // Abstract math for higher grades (e.g. 15 + 25 = ?)
}

export enum LevelTheme {
  FOREST = 'FOREST',       // Grade 1-2: Nature, Elves
  OCEAN = 'OCEAN',         // Grade 1-2: Sea, Bubbles
  DETECTIVE = 'DETECTIVE', // Grade 3-4: Mystery, Paper
  SPACE = 'SPACE',         // Grade 5-6: Sci-fi, Dark
  CITY = 'CITY'            // Grade 5-6: Blueprint, Tech
}

export interface LevelData {
  id: number;
  grade: number; // 1-6
  title: string;
  theme: LevelTheme;
  type: GameType;
  question: string;
  hint?: string; // Optional hint for the mascot to say on error
  config: any; // Flexible config based on type
  stars: number; // 0 if locked, 1-3 if completed
  locked: boolean;
  bestTime?: number; // Best completion time in seconds
  timeLimit?: number; // Time limit in seconds (default 120s if undefined)
  // Fix: added uniqueId to LevelData to allow unique identification of level instances for React keying and effect triggering
  uniqueId?: string;
}

export interface ShapeOption {
  id: string;
  type: 'circle' | 'square' | 'triangle' | 'rectangle' | 'star' | 'pentagon';
  color: string;
}

export interface Reward {
  id: string;
  name: string;
  cost: number;
  icon: string; // Emoji
}

export interface Task {
  id: string;
  name: string;
  value: number; // Positive for reward, Negative for punishment
  icon: string;
}