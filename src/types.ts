export type Direction = 'left' | 'right' | 'idle' | 'up' | 'down';

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export type ItemType =
  | 'carrot'
  | 'apple'
  | 'banana'
  | 'watermelon'
  | 'strawberry'
  | 'radish'
  | 'mushroom'
  | 'grape'
  | 'pot'
  | 'diamond'
  | 'coin'
  | 'life';

export interface GameItem {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: ItemType;
  points: number;
  collected: boolean;
  isPot?: boolean;
  potOpened?: boolean;
  potContent?: 'diamond' | 'coin' | 'life' | 'snake' | 'fruit';
  animationTick?: number;
}

export interface Spike {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Ladder {
  id: string;
  x: number;
  topY: number;
  bottomY: number;
  width: number;
}

export interface PlatformSegment {
  x: number;
  y: number;
  width: number;
  height: number;
  isHole?: boolean;
}

export type EnemyType = 'caterpillar' | 'snake' | 'bat' | 'ghost';

export interface Enemy {
  id: string;
  type: EnemyType;
  x: number;
  y: number;
  width: number;
  height: number;
  vx: number;
  vy: number;
  floorY: number;
  minX: number;
  maxX: number;
  facing: 'left' | 'right';
  animFrame: number;
  animTick: number;
  isChasing?: boolean;
}

export interface Particle {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  alpha: number;
  life: number;
  maxLife: number;
  text?: string;
}

export interface Player {
  x: number;
  y: number;
  width: number;
  height: number;
  vx: number;
  vy: number;
  facing: 'left' | 'right';
  isGrounded: boolean;
  isJumping: boolean;
  isClimbing: boolean;
  jumpVelocity: number;
  currentFloorIndex: number;
  state: 'idle' | 'walking' | 'jumping' | 'climbing' | 'falling' | 'dead' | 'victory';
  animFrame: number;
  animTick: number;
  invincibleTimer: number;
}

export interface StageConfig {
  stageNumber: number;
  name: string;
  koreanName: string;
  themeColor: string;
  platformColor: string;
  timeLimit: number;
  floors: {
    y: number;
    segments: { startX: number; endX: number }[]; // solid parts
  }[];
  ladders: { x: number; topFloor: number; bottomFloor: number }[];
  items: { x: number; floor: number; type: ItemType }[];
  spikes: { x: number; floor: number }[];
  enemies: {
    type: EnemyType;
    floor: number;
    startX: number;
    minX: number;
    maxX: number;
    speed: number;
  }[];
  pots: { x: number; floor: number; content: 'diamond' | 'coin' | 'life' | 'snake' | 'fruit' }[];
}

export type GameStatus = 'title' | 'playing' | 'paused' | 'stage_clear' | 'game_over' | 'game_complete';

export interface GameSettings {
  soundEnabled: boolean;
  musicEnabled: boolean;
  crtFilter: boolean;
  scanlines: boolean;
  phosphorGlow: boolean;
  difficulty: 'classic' | 'easy' | 'hard';
}
