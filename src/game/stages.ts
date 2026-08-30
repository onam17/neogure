import { StageConfig } from '../types';

export const STAGES: StageConfig[] = [
  // ==========================================
  // STAGE 1: 추억의 초원 (The Meadow) - Intro
  // ==========================================
  {
    stageNumber: 1,
    name: 'The Meadow',
    koreanName: '1스테이지: 평화로운 초원',
    themeColor: '#166534',
    platformColor: '#15803D',
    timeLimit: 50,
    floors: [
      {
        y: 100, // Floor 0 (Top)
        segments: [{ startX: 40, endX: 600 }],
      },
      {
        y: 185, // Floor 1
        segments: [
          { startX: 40, endX: 250 },
          { startX: 300, endX: 600 }, // Hole between 250 and 300
        ],
      },
      {
        y: 270, // Floor 2
        segments: [
          { startX: 40, endX: 400 },
          { startX: 460, endX: 600 }, // Hole between 400 and 460
        ],
      },
      {
        y: 355, // Floor 3
        segments: [
          { startX: 40, endX: 200 },
          { startX: 260, endX: 600 }, // Hole between 200 and 260
        ],
      },
      {
        y: 440, // Floor 4 (Bottom)
        segments: [{ startX: 40, endX: 600 }],
      },
    ],
    ladders: [
      { x: 120, topFloor: 0, bottomFloor: 1 },
      { x: 500, topFloor: 1, bottomFloor: 2 },
      { x: 150, topFloor: 2, bottomFloor: 3 },
      { x: 480, topFloor: 3, bottomFloor: 4 },
    ],
    items: [
      // Food to collect
      { x: 80, floor: 0, type: 'carrot' },
      { x: 280, floor: 0, type: 'carrot' },
      { x: 450, floor: 0, type: 'carrot' },
      { x: 120, floor: 1, type: 'apple' },
      { x: 420, floor: 1, type: 'apple' },
      { x: 220, floor: 2, type: 'banana' },
      { x: 340, floor: 2, type: 'banana' },
      { x: 100, floor: 3, type: 'carrot' },
      { x: 400, floor: 3, type: 'radish' },
      { x: 180, floor: 4, type: 'apple' },
      { x: 360, floor: 4, type: 'banana' },
    ],
    spikes: [
      { x: 360, floor: 0 },
      { x: 180, floor: 1 },
      { x: 280, floor: 3 },
      { x: 260, floor: 4 },
    ],
    pots: [
      { x: 540, floor: 0, content: 'diamond' },
      { x: 80, floor: 2, content: 'coin' },
      { x: 520, floor: 4, content: 'fruit' },
    ],
    enemies: [
      {
        type: 'caterpillar',
        floor: 1,
        startX: 380,
        minX: 310,
        maxX: 580,
        speed: 1.2,
      },
      {
        type: 'caterpillar',
        floor: 3,
        startX: 320,
        minX: 270,
        maxX: 560,
        speed: 1.3,
      },
    ],
  },

  // ==========================================
  // STAGE 2: 과수원 (The Orchard) - More Jars & Holes
  // ==========================================
  {
    stageNumber: 2,
    name: 'The Orchard',
    koreanName: '2스테이지: 싱싱한 과수원',
    themeColor: '#854D0E',
    platformColor: '#A16207',
    timeLimit: 50,
    floors: [
      {
        y: 100,
        segments: [
          { startX: 40, endX: 320 },
          { startX: 380, endX: 600 },
        ],
      },
      {
        y: 185,
        segments: [
          { startX: 40, endX: 180 },
          { startX: 240, endX: 450 },
          { startX: 510, endX: 600 },
        ],
      },
      {
        y: 270,
        segments: [
          { startX: 40, endX: 300 },
          { startX: 360, endX: 600 },
        ],
      },
      {
        y: 355,
        segments: [
          { startX: 40, endX: 220 },
          { startX: 280, endX: 500 },
          { startX: 550, endX: 600 },
        ],
      },
      {
        y: 440,
        segments: [{ startX: 40, endX: 600 }],
      },
    ],
    ladders: [
      { x: 480, topFloor: 0, bottomFloor: 1 },
      { x: 120, topFloor: 1, bottomFloor: 2 },
      { x: 420, topFloor: 2, bottomFloor: 3 },
      { x: 160, topFloor: 3, bottomFloor: 4 },
      { x: 520, topFloor: 3, bottomFloor: 4 },
    ],
    items: [
      { x: 100, floor: 0, type: 'strawberry' },
      { x: 220, floor: 0, type: 'watermelon' },
      { x: 540, floor: 0, type: 'strawberry' },
      { x: 100, floor: 1, type: 'banana' },
      { x: 320, floor: 1, type: 'apple' },
      { x: 160, floor: 2, type: 'grape' },
      { x: 480, floor: 2, type: 'watermelon' },
      { x: 100, floor: 3, type: 'strawberry' },
      { x: 380, floor: 3, type: 'grape' },
      { x: 260, floor: 4, type: 'apple' },
      { x: 420, floor: 4, type: 'banana' },
    ],
    spikes: [
      { x: 160, floor: 0 },
      { x: 380, floor: 1 },
      { x: 220, floor: 2 },
      { x: 460, floor: 3 },
      { x: 320, floor: 4 },
    ],
    pots: [
      { x: 260, floor: 0, content: 'snake' },
      { x: 550, floor: 1, content: 'diamond' },
      { x: 80, floor: 3, content: 'coin' },
      { x: 540, floor: 4, content: 'life' },
    ],
    enemies: [
      {
        type: 'caterpillar',
        floor: 0,
        startX: 120,
        minX: 50,
        maxX: 300,
        speed: 1.4,
      },
      {
        type: 'caterpillar',
        floor: 2,
        startX: 400,
        minX: 370,
        maxX: 580,
        speed: 1.5,
      },
      {
        type: 'caterpillar',
        floor: 4,
        startX: 180,
        minX: 60,
        maxX: 500,
        speed: 1.6,
      },
    ],
  },

  // ==========================================
  // STAGE 3: 지하 동굴 (Underground Cavern) - Bats & Snakes
  // ==========================================
  {
    stageNumber: 3,
    name: 'Underground Cavern',
    koreanName: '3스테이지: 신비한 지하 동굴',
    themeColor: '#1E1B4B',
    platformColor: '#3730A3',
    timeLimit: 45,
    floors: [
      {
        y: 100,
        segments: [{ startX: 40, endX: 600 }],
      },
      {
        y: 185,
        segments: [
          { startX: 40, endX: 200 },
          { startX: 270, endX: 430 },
          { startX: 490, endX: 600 },
        ],
      },
      {
        y: 270,
        segments: [
          { startX: 40, endX: 330 },
          { startX: 390, endX: 600 },
        ],
      },
      {
        y: 355,
        segments: [
          { startX: 40, endX: 180 },
          { startX: 250, endX: 600 },
        ],
      },
      {
        y: 440,
        segments: [
          { startX: 40, endX: 420 },
          { startX: 480, endX: 600 },
        ],
      },
    ],
    ladders: [
      { x: 100, topFloor: 0, bottomFloor: 1 },
      { x: 520, topFloor: 0, bottomFloor: 1 },
      { x: 320, topFloor: 1, bottomFloor: 2 },
      { x: 120, topFloor: 2, bottomFloor: 3 },
      { x: 500, topFloor: 2, bottomFloor: 3 },
      { x: 300, topFloor: 3, bottomFloor: 4 },
    ],
    items: [
      { x: 200, floor: 0, type: 'mushroom' },
      { x: 380, floor: 0, type: 'watermelon' },
      { x: 120, floor: 1, type: 'grape' },
      { x: 380, floor: 1, type: 'mushroom' },
      { x: 540, floor: 1, type: 'radish' },
      { x: 220, floor: 2, type: 'strawberry' },
      { x: 440, floor: 2, type: 'grape' },
      { x: 100, floor: 3, type: 'mushroom' },
      { x: 420, floor: 3, type: 'apple' },
      { x: 180, floor: 4, type: 'carrot' },
      { x: 360, floor: 4, type: 'watermelon' },
    ],
    spikes: [
      { x: 280, floor: 0 },
      { x: 450, floor: 0 },
      { x: 150, floor: 2 },
      { x: 340, floor: 3 },
      { x: 220, floor: 4 },
    ],
    pots: [
      { x: 300, floor: 0, content: 'fruit' },
      { x: 80, floor: 2, content: 'snake' },
      { x: 540, floor: 3, content: 'diamond' },
      { x: 80, floor: 4, content: 'coin' },
    ],
    enemies: [
      {
        type: 'bat',
        floor: 0,
        startX: 300,
        minX: 80,
        maxX: 560,
        speed: 1.8,
      },
      {
        type: 'caterpillar',
        floor: 1,
        startX: 330,
        minX: 280,
        maxX: 420,
        speed: 1.5,
      },
      {
        type: 'caterpillar',
        floor: 3,
        startX: 400,
        minX: 260,
        maxX: 580,
        speed: 1.7,
      },
    ],
  },

  // ==========================================
  // STAGE 4: 위험한 고탑 (The Perilous Tower)
  // ==========================================
  {
    stageNumber: 4,
    name: 'Perilous Tower',
    koreanName: '4스테이지: 위험천만 고탑',
    themeColor: '#701A75',
    platformColor: '#86198F',
    timeLimit: 45,
    floors: [
      {
        y: 100,
        segments: [
          { startX: 40, endX: 250 },
          { startX: 320, endX: 600 },
        ],
      },
      {
        y: 185,
        segments: [
          { startX: 40, endX: 180 },
          { startX: 240, endX: 400 },
          { startX: 460, endX: 600 },
        ],
      },
      {
        y: 270,
        segments: [
          { startX: 40, endX: 280 },
          { startX: 350, endX: 520 },
          { startX: 560, endX: 600 },
        ],
      },
      {
        y: 355,
        segments: [
          { startX: 40, endX: 220 },
          { startX: 280, endX: 440 },
          { startX: 500, endX: 600 },
        ],
      },
      {
        y: 440,
        segments: [{ startX: 40, endX: 600 }],
      },
    ],
    ladders: [
      { x: 140, topFloor: 0, bottomFloor: 1 },
      { x: 500, topFloor: 0, bottomFloor: 1 },
      { x: 300, topFloor: 1, bottomFloor: 2 },
      { x: 120, topFloor: 2, bottomFloor: 3 },
      { x: 420, topFloor: 2, bottomFloor: 3 },
      { x: 220, topFloor: 3, bottomFloor: 4 },
      { x: 540, topFloor: 3, bottomFloor: 4 },
    ],
    items: [
      { x: 80, floor: 0, type: 'diamond' },
      { x: 400, floor: 0, type: 'apple' },
      { x: 550, floor: 0, type: 'carrot' },
      { x: 100, floor: 1, type: 'banana' },
      { x: 320, floor: 1, type: 'grape' },
      { x: 540, floor: 1, type: 'watermelon' },
      { x: 180, floor: 2, type: 'strawberry' },
      { x: 420, floor: 2, type: 'mushroom' },
      { x: 100, floor: 3, type: 'radish' },
      { x: 360, floor: 3, type: 'carrot' },
      { x: 120, floor: 4, type: 'apple' },
      { x: 380, floor: 4, type: 'banana' },
    ],
    spikes: [
      { x: 200, floor: 0 },
      { x: 460, floor: 0 },
      { x: 120, floor: 1 },
      { x: 220, floor: 2 },
      { x: 340, floor: 3 },
      { x: 280, floor: 4 },
      { x: 460, floor: 4 },
    ],
    pots: [
      { x: 540, floor: 0, content: 'snake' },
      { x: 250, floor: 1, content: 'coin' },
      { x: 80, floor: 2, content: 'life' },
      { x: 550, floor: 2, content: 'diamond' },
      { x: 80, floor: 4, content: 'snake' },
    ],
    enemies: [
      {
        type: 'caterpillar',
        floor: 0,
        startX: 360,
        minX: 330,
        maxX: 580,
        speed: 1.8,
      },
      {
        type: 'bat',
        floor: 1,
        startX: 200,
        minX: 60,
        maxX: 560,
        speed: 2.0,
      },
      {
        type: 'caterpillar',
        floor: 3,
        startX: 320,
        minX: 290,
        maxX: 430,
        speed: 1.7,
      },
      {
        type: 'caterpillar',
        floor: 4,
        startX: 200,
        minX: 50,
        maxX: 560,
        speed: 1.8,
      },
    ],
  },

  // ==========================================
  // STAGE 5: 용암 봉우리 (Volcano Peak) - High Speed
  // ==========================================
  {
    stageNumber: 5,
    name: 'Volcano Peak',
    koreanName: '5스테이지: 이글거리는 용암 봉우리',
    themeColor: '#7F1D1D',
    platformColor: '#991B1B',
    timeLimit: 40,
    floors: [
      {
        y: 100,
        segments: [
          { startX: 40, endX: 200 },
          { startX: 260, endX: 440 },
          { startX: 500, endX: 600 },
        ],
      },
      {
        y: 185,
        segments: [
          { startX: 40, endX: 280 },
          { startX: 340, endX: 600 },
        ],
      },
      {
        y: 270,
        segments: [
          { startX: 40, endX: 190 },
          { startX: 250, endX: 420 },
          { startX: 480, endX: 600 },
        ],
      },
      {
        y: 355,
        segments: [
          { startX: 40, endX: 320 },
          { startX: 380, endX: 600 },
        ],
      },
      {
        y: 440,
        segments: [{ startX: 40, endX: 600 }],
      },
    ],
    ladders: [
      { x: 120, topFloor: 0, bottomFloor: 1 },
      { x: 380, topFloor: 0, bottomFloor: 1 },
      { x: 520, topFloor: 1, bottomFloor: 2 },
      { x: 140, topFloor: 2, bottomFloor: 3 },
      { x: 360, topFloor: 2, bottomFloor: 3 },
      { x: 260, topFloor: 3, bottomFloor: 4 },
      { x: 500, topFloor: 3, bottomFloor: 4 },
    ],
    items: [
      { x: 80, floor: 0, type: 'strawberry' },
      { x: 300, floor: 0, type: 'watermelon' },
      { x: 540, floor: 0, type: 'grape' },
      { x: 160, floor: 1, type: 'apple' },
      { x: 420, floor: 1, type: 'strawberry' },
      { x: 100, floor: 2, type: 'banana' },
      { x: 320, floor: 2, type: 'diamond' },
      { x: 540, floor: 2, type: 'mushroom' },
      { x: 180, floor: 3, type: 'radish' },
      { x: 460, floor: 3, type: 'carrot' },
      { x: 100, floor: 4, type: 'watermelon' },
      { x: 380, floor: 4, type: 'strawberry' },
    ],
    spikes: [
      { x: 160, floor: 0 },
      { x: 340, floor: 0 },
      { x: 200, floor: 1 },
      { x: 460, floor: 1 },
      { x: 280, floor: 2 },
      { x: 140, floor: 3 },
      { x: 420, floor: 3 },
      { x: 320, floor: 4 },
    ],
    pots: [
      { x: 180, floor: 0, content: 'life' },
      { x: 80, floor: 1, content: 'snake' },
      { x: 400, floor: 2, content: 'diamond' },
      { x: 80, floor: 3, content: 'fruit' },
      { x: 540, floor: 4, content: 'coin' },
    ],
    enemies: [
      {
        type: 'bat',
        floor: 0,
        startX: 300,
        minX: 50,
        maxX: 580,
        speed: 2.3,
      },
      {
        type: 'caterpillar',
        floor: 1,
        startX: 380,
        minX: 350,
        maxX: 580,
        speed: 2.0,
      },
      {
        type: 'caterpillar',
        floor: 2,
        startX: 280,
        minX: 260,
        maxX: 410,
        speed: 2.0,
      },
      {
        type: 'caterpillar',
        floor: 4,
        startX: 200,
        minX: 50,
        maxX: 580,
        speed: 2.2,
      },
    ],
  },

  // ==========================================
  // STAGE 6: 너구리의 황금성 (Golden Castle) - Grand Master
  // ==========================================
  {
    stageNumber: 6,
    name: 'Golden Castle',
    koreanName: '6스테이지: 너구리의 황금성',
    themeColor: '#78350F',
    platformColor: '#B45309',
    timeLimit: 40,
    floors: [
      {
        y: 100,
        segments: [
          { startX: 40, endX: 180 },
          { startX: 240, endX: 420 },
          { startX: 480, endX: 600 },
        ],
      },
      {
        y: 185,
        segments: [
          { startX: 40, endX: 160 },
          { startX: 220, endX: 380 },
          { startX: 440, endX: 600 },
        ],
      },
      {
        y: 270,
        segments: [
          { startX: 40, endX: 260 },
          { startX: 320, endX: 500 },
          { startX: 560, endX: 600 },
        ],
      },
      {
        y: 355,
        segments: [
          { startX: 40, endX: 200 },
          { startX: 260, endX: 440 },
          { startX: 500, endX: 600 },
        ],
      },
      {
        y: 440,
        segments: [{ startX: 40, endX: 600 }],
      },
    ],
    ladders: [
      { x: 100, topFloor: 0, bottomFloor: 1 },
      { x: 320, topFloor: 0, bottomFloor: 1 },
      { x: 540, topFloor: 0, bottomFloor: 1 },
      { x: 260, topFloor: 1, bottomFloor: 2 },
      { x: 480, topFloor: 1, bottomFloor: 2 },
      { x: 120, topFloor: 2, bottomFloor: 3 },
      { x: 380, topFloor: 2, bottomFloor: 3 },
      { x: 220, topFloor: 3, bottomFloor: 4 },
      { x: 520, topFloor: 3, bottomFloor: 4 },
    ],
    items: [
      { x: 80, floor: 0, type: 'diamond' },
      { x: 280, floor: 0, type: 'coin' },
      { x: 520, floor: 0, type: 'diamond' },
      { x: 100, floor: 1, type: 'grape' },
      { x: 300, floor: 1, type: 'watermelon' },
      { x: 520, floor: 1, type: 'strawberry' },
      { x: 180, floor: 2, type: 'apple' },
      { x: 420, floor: 2, type: 'banana' },
      { x: 100, floor: 3, type: 'diamond' },
      { x: 360, floor: 3, type: 'carrot' },
      { x: 140, floor: 4, type: 'strawberry' },
      { x: 380, floor: 4, type: 'grape' },
    ],
    spikes: [
      { x: 140, floor: 0 },
      { x: 360, floor: 0 },
      { x: 120, floor: 1 },
      { x: 340, floor: 1 },
      { x: 220, floor: 2 },
      { x: 460, floor: 2 },
      { x: 160, floor: 3 },
      { x: 320, floor: 3 },
      { x: 280, floor: 4 },
      { x: 440, floor: 4 },
    ],
    pots: [
      { x: 400, floor: 0, content: 'diamond' },
      { x: 60, floor: 1, content: 'snake' },
      { x: 50, floor: 2, content: 'diamond' },
      { x: 550, floor: 3, content: 'life' },
      { x: 80, floor: 4, content: 'coin' },
    ],
    enemies: [
      {
        type: 'bat',
        floor: 0,
        startX: 200,
        minX: 50,
        maxX: 580,
        speed: 2.5,
      },
      {
        type: 'caterpillar',
        floor: 1,
        startX: 280,
        minX: 230,
        maxX: 370,
        speed: 2.2,
      },
      {
        type: 'caterpillar',
        floor: 2,
        startX: 400,
        minX: 330,
        maxX: 490,
        speed: 2.2,
      },
      {
        type: 'caterpillar',
        floor: 3,
        startX: 320,
        minX: 270,
        maxX: 430,
        speed: 2.2,
      },
      {
        type: 'caterpillar',
        floor: 4,
        startX: 300,
        minX: 60,
        maxX: 580,
        speed: 2.4,
      },
    ],
  },
];
