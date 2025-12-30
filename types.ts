
export enum AppView {
  HOME = 'HOME',
  ADVENTURE_MAP = 'ADVENTURE_MAP',
  GAME_LEVEL = 'GAME_LEVEL',
  TOOLS_MENU = 'TOOLS_MENU',
  TOOL_MAKE_TEN = 'TOOL_MAKE_TEN',
  PARENT_DASHBOARD = 'PARENT_DASHBOARD',
}

export enum GameType {
  COUNTING = 'COUNTING',       
  COMPARING = 'COMPARING',     
  POSITIONING = 'POSITIONING', 
  ORIENTATION = 'ORIENTATION', 
  COORDINATES = 'COORDINATES', 
  TRANSFORM = 'TRANSFORM',     
  DECOMPOSITION = 'DECOMPOSITION', 
  ADDITION = 'ADDITION',       
  SUBTRACTION = 'SUBTRACTION', 
  SHAPES_3D = 'SHAPES_3D',     
  SHAPES_2D = 'SHAPES_2D',     
  ANGLES = 'ANGLES',           
  PLACE_VALUE = 'PLACE_VALUE', 
  CLOCK = 'CLOCK',             
  MAKE_TEN = 'MAKE_TEN',       
  MULTIPLICATION = 'MULTIPLICATION', 
  FRACTION = 'FRACTION',       
  AREA = 'AREA',               
  DECIMAL = 'DECIMAL',         
  VOLUME = 'VOLUME',           
  RATIO = 'RATIO',             
  PERIMETER = 'PERIMETER',
  MEASUREMENT = 'MEASUREMENT',
  STATISTICS = 'STATISTICS' // 新增统计学类型
}

export enum LevelTheme {
  FOREST = 'FOREST',
  OCEAN = 'OCEAN',
  CITY = 'CITY',
  SPACE = 'SPACE',
  DETECTIVE = 'DETECTIVE'
}

export interface LevelData {
  id: number;
  grade: number;
  title: string;
  unit: string;
  theme: LevelTheme;
  type: GameType;
  question: string;
  config: any;
  stars: number;
  locked: boolean;
  uniqueId: string;
}

export interface Reward {
  id: string;
  name: string;
  cost: number;
  icon: string;
}

export interface Task {
  id: string;
  name: string;
  value: number;
  icon: string;
}
