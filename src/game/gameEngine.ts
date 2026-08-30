import { soundManager } from '../audio/soundManager';
import {
  Direction,
  Enemy,
  GameItem,
  GameSettings,
  GameStatus,
  ItemType,
  Ladder,
  Particle,
  PlatformSegment,
  Player,
  Spike,
  StageConfig,
} from '../types';
import { STAGES } from './stages';

export const CANVAS_WIDTH = 640;
export const CANVAS_HEIGHT = 480;
export const PLAYER_WIDTH = 30;
export const PLAYER_HEIGHT = 32;
const GRAVITY = 0.40;
const JUMP_POWER = -5.8;
const MOVE_SPEED = 2.8;
const CLIMB_SPEED = 2.2;

export class GameEngine {
  public player: Player;
  public stageIndex: number = 0;
  public currentStage: StageConfig;
  public items: GameItem[] = [];
  public spikes: Spike[] = [];
  public ladders: Ladder[] = [];
  public enemies: Enemy[] = [];
  public particles: Particle[] = [];
  public score: number = 0;
  public highScore: number = 0;
  public lives: number = 3;
  public timeLeft: number = 50;
  public remainingFoodCount: number = 0;
  public totalFoodCount: number = 0;
  public status: GameStatus = 'title';
  public settings: GameSettings;

  private timeAccumulator: number = 0;
  private timeWarningPlayed: boolean = false;
  private isGhostSpawned: boolean = false;
  public jumpBufferTimer: number = 0;

  // Input states
  public keys = {
    left: false,
    right: false,
    up: false,
    down: false,
    jump: false,
  };

  private onStateChangeCallback?: () => void;

  constructor(settings: GameSettings, onStateChange?: () => void) {
    this.settings = settings;
    this.onStateChangeCallback = onStateChange;

    // Load High Score from localStorage
    try {
      const saved = localStorage.getItem('ponpoko_high_score');
      if (saved) {
        this.highScore = parseInt(saved, 10) || 0;
      }
    } catch {
      this.highScore = 0;
    }

    this.currentStage = STAGES[0];
    this.player = this.createDefaultPlayer();
  }

  public setOnStateChange(cb: () => void) {
    this.onStateChangeCallback = cb;
  }

  private notify() {
    if (this.onStateChangeCallback) {
      this.onStateChangeCallback();
    }
  }

  private createDefaultPlayer(): Player {
    const bottomFloor = this.currentStage.floors[this.currentStage.floors.length - 1];
    return {
      x: 80,
      y: bottomFloor.y - PLAYER_HEIGHT,
      width: PLAYER_WIDTH,
      height: PLAYER_HEIGHT,
      vx: 0,
      vy: 0,
      facing: 'right',
      isGrounded: true,
      isJumping: false,
      isClimbing: false,
      jumpVelocity: 0,
      currentFloorIndex: this.currentStage.floors.length - 1,
      state: 'idle',
      animFrame: 0,
      animTick: 0,
      invincibleTimer: 2.0,
    };
  }

  public startGame(stageIdx: number = 0) {
    this.stageIndex = stageIdx % STAGES.length;
    this.score = 0;
    this.lives = 3;
    this.status = 'playing';
    this.loadStage(this.stageIndex);
    soundManager.startBGM();
    this.notify();
  }

  public restartGame() {
    this.startGame(0);
  }

  public loadStage(stageIdx: number) {
    this.stageIndex = stageIdx % STAGES.length;
    this.currentStage = STAGES[this.stageIndex];
    this.timeLeft = this.currentStage.timeLimit;
    this.timeAccumulator = 0;
    this.timeWarningPlayed = false;
    this.isGhostSpawned = false;
    this.particles = [];

    // Load ladders
    this.ladders = this.currentStage.ladders.map((l, i) => {
      const topF = this.currentStage.floors[l.topFloor];
      const botF = this.currentStage.floors[l.bottomFloor];
      return {
        id: `ladder_${i}`,
        x: l.x,
        topY: topF.y,
        bottomY: botF.y,
        width: 28,
      };
    });

    // Load Items (Food)
    const foodItems: GameItem[] = this.currentStage.items.map((item, i) => {
      const floor = this.currentStage.floors[item.floor];
      let pts = 100;
      if (item.type === 'banana' || item.type === 'apple') pts = 200;
      if (item.type === 'watermelon' || item.type === 'strawberry') pts = 300;
      if (item.type === 'grape' || item.type === 'mushroom') pts = 400;
      if (item.type === 'diamond') pts = 800;

      return {
        id: `item_${i}`,
        x: item.x,
        y: floor.y - 24,
        width: 22,
        height: 22,
        type: item.type,
        points: pts,
        collected: false,
        animationTick: Math.floor(Math.random() * 30),
      };
    });

    // Load Mystery Pots
    const potItems: GameItem[] = this.currentStage.pots.map((pot, i) => {
      const floor = this.currentStage.floors[pot.floor];
      return {
        id: `pot_${i}`,
        x: pot.x,
        y: floor.y - 26,
        width: 26,
        height: 26,
        type: 'pot',
        points: 0,
        collected: false,
        isPot: true,
        potOpened: false,
        potContent: pot.content,
        animationTick: 0,
      };
    });

    this.items = [...foodItems, ...potItems];
    this.remainingFoodCount = foodItems.length;
    this.totalFoodCount = foodItems.length;

    // Load Spikes
    this.spikes = this.currentStage.spikes.map((spk, i) => {
      const floor = this.currentStage.floors[spk.floor];
      return {
        id: `spike_${i}`,
        x: spk.x,
        y: floor.y - 14,
        width: 26,
        height: 14,
      };
    });

    // Load Enemies
    this.enemies = this.currentStage.enemies.map((en, i) => {
      const floor = this.currentStage.floors[en.floor];
      const speed = en.speed * (this.settings.difficulty === 'hard' ? 1.3 : this.settings.difficulty === 'easy' ? 0.8 : 1.0);
      const isBat = en.type === 'bat';

      return {
        id: `enemy_${i}`,
        type: en.type,
        x: en.startX,
        y: isBat ? floor.y - 45 : floor.y - 18,
        width: isBat ? 26 : 28,
        height: isBat ? 18 : 18,
        vx: speed,
        vy: 0,
        floorY: floor.y,
        minX: en.minX,
        maxX: en.maxX,
        facing: 'right',
        animFrame: 0,
        animTick: 0,
      };
    });

    // Reset Player position on bottom floor
    const bottomFloor = this.currentStage.floors[this.currentStage.floors.length - 1];
    this.player = {
      x: 80,
      y: bottomFloor.y - PLAYER_HEIGHT,
      width: PLAYER_WIDTH,
      height: PLAYER_HEIGHT,
      vx: 0,
      vy: 0,
      facing: 'right',
      isGrounded: true,
      isJumping: false,
      isClimbing: false,
      jumpVelocity: 0,
      currentFloorIndex: this.currentStage.floors.length - 1,
      state: 'idle',
      animFrame: 0,
      animTick: 0,
      invincibleTimer: 2.0,
    };
  }

  public update(dt: number) {
    if (this.status !== 'playing') {
      this.updateParticles(dt);
      return;
    }

    // 1. Timer logic
    this.timeAccumulator += dt;
    if (this.timeAccumulator >= 1.0) {
      this.timeAccumulator -= 1.0;
      if (this.timeLeft > 0) {
        this.timeLeft--;
        if (this.timeLeft <= 10 && !this.timeWarningPlayed) {
          soundManager.playTimeWarning();
        }
      } else if (!this.isGhostSpawned) {
        // Time over! Spawn Ghost Grim Reaper to chase player!
        this.spawnGrimReaper();
      }
    }

    // 2. Update Invincible Timer & Jump Buffer
    if (this.player.invincibleTimer > 0) {
      this.player.invincibleTimer -= dt;
      if (this.player.invincibleTimer < 0) this.player.invincibleTimer = 0;
    }
    if (this.jumpBufferTimer > 0) {
      this.jumpBufferTimer -= dt;
      if (this.jumpBufferTimer < 0) this.jumpBufferTimer = 0;
    }

    // 3. Player Input & Physics Update
    this.updatePlayer(dt);

    // 4. Update Enemies
    this.updateEnemies(dt);

    // 5. Update Items Animation
    this.items.forEach((item) => {
      item.animationTick = (item.animationTick || 0) + 1;
    });

    // 6. Check Collisions (Items, Spikes, Enemies)
    this.checkCollisions();

    // 7. Update Particle effects
    this.updateParticles(dt);
  }

  public triggerJump() {
    this.jumpBufferTimer = 0.20; // 200ms jump buffer
    if (this.player.isGrounded && !this.player.isJumping && !this.player.isClimbing && this.player.state !== 'dead') {
      this.executeJump();
    }
  }

  private executeJump() {
    const p = this.player;
    p.isJumping = true;
    p.isGrounded = false;
    p.isClimbing = false;
    p.vy = JUMP_POWER;
    p.state = 'jumping';
    this.jumpBufferTimer = 0;
    soundManager.playJump();

    // Calculate jump forward velocity based on current input
    if (this.keys.left) {
      p.jumpVelocity = -MOVE_SPEED;
      p.facing = 'left';
    } else if (this.keys.right) {
      p.jumpVelocity = MOVE_SPEED;
      p.facing = 'right';
    } else {
      p.jumpVelocity = 0;
    }

    // Spawn jump dust
    this.spawnDust(p.x + p.width / 2, p.y + p.height);
  }

  private updatePlayer(dt: number) {
    const p = this.player;
    if (p.state === 'dead') return;

    p.animTick++;

    // Determine ladder user direction
    let ladderDirection: 'up' | 'down' | undefined = undefined;
    if (this.keys.up) ladderDirection = 'up';
    else if (this.keys.down) ladderDirection = 'down';

    // Check if on Ladder
    const touchingLadder = this.getTouchingLadder(p, ladderDirection);

    // Ladder climbing logic
    if (touchingLadder && !p.isJumping) {
      if (this.keys.up || this.keys.down) {
        p.isClimbing = true;
        p.isGrounded = false;
        p.vx = 0;
        // Snap X to center of ladder
        p.x = touchingLadder.x + (touchingLadder.width - p.width) / 2;

        if (this.keys.up) {
          p.vy = -CLIMB_SPEED;
          p.state = 'climbing';
          if (p.animTick % 10 === 0) soundManager.playLadderStep();
        } else if (this.keys.down) {
          p.vy = CLIMB_SPEED;
          p.state = 'climbing';
          if (p.animTick % 10 === 0) soundManager.playLadderStep();
        }
      } else if (p.isClimbing) {
        // Paused on ladder
        p.vy = 0;
        // Allow dismounting left/right if near top or bottom floor
        if (this.keys.left || this.keys.right) {
          if (Math.abs(p.y + p.height - touchingLadder.topY) < 12) {
            p.y = touchingLadder.topY - p.height;
            p.isClimbing = false;
            p.isGrounded = true;
            p.state = 'idle';
          } else if (Math.abs(p.y + p.height - touchingLadder.bottomY) < 12) {
            p.y = touchingLadder.bottomY - p.height;
            p.isClimbing = false;
            p.isGrounded = true;
            p.state = 'idle';
          }
        }
      }
    } else {
      if (p.isClimbing) {
        p.isClimbing = false;
      }
    }

    // If climbing, update Y and dismount at floor boundaries
    if (p.isClimbing && touchingLadder) {
      p.y += p.vy;

      // Dismount at top of ladder (ONLY when climbing UP)
      if (p.vy < 0 && p.y + p.height <= touchingLadder.topY + 2) {
        p.y = touchingLadder.topY - p.height;
        p.isClimbing = false;
        p.isGrounded = true;
        p.vy = 0;
        p.state = 'idle';
      }
      // Dismount at bottom of ladder (ONLY when climbing DOWN)
      else if (p.vy > 0 && p.y + p.height >= touchingLadder.bottomY) {
        p.y = touchingLadder.bottomY - p.height;
        p.isClimbing = false;
        p.isGrounded = true;
        p.vy = 0;
        p.state = 'idle';
      }
      return;
    }

    // Horizontal Movement
    if (!p.isClimbing) {
      if (p.isJumping) {
        // In air: continue with jump velocity
        p.x += p.jumpVelocity;
      } else {
        if (this.keys.left) {
          p.vx = -MOVE_SPEED;
          p.facing = 'left';
          p.state = 'walking';
        } else if (this.keys.right) {
          p.vx = MOVE_SPEED;
          p.facing = 'right';
          p.state = 'walking';
        } else {
          p.vx = 0;
          if (p.isGrounded) {
            p.state = 'idle';
          }
        }
        p.x += p.vx;
      }

      // Screen boundary constraints
      if (p.x < 30) p.x = 30;
      if (p.x + p.width > CANVAS_WIDTH - 30) p.x = CANVAS_WIDTH - 30 - p.width;

      // Jump Trigger (Checks both active key hold & buffered press for instant response)
      if ((this.keys.jump || this.jumpBufferTimer > 0) && p.isGrounded && !p.isJumping) {
        this.executeJump();
      }

      // Apply Gravity
      p.vy += GRAVITY;
      if (p.vy > 9.0) p.vy = 9.0;
      p.y += p.vy;

      // Check Platform Collisions & Holes
      this.handlePlatformCollisions(p);

      // Check falling into bottom void
      if (p.y > CANVAS_HEIGHT + 20) {
        this.handlePlayerDeath('fall');
      }
    }
  }

  private handlePlatformCollisions(p: Player) {
    p.isGrounded = false;

    // 1. Ceiling collision check: prevent jumping through the underside of the floor above
    if (p.vy < 0) {
      for (let fIdx = 0; fIdx < this.currentStage.floors.length; fIdx++) {
        const floor = this.currentStage.floors[fIdx];
        const floorY = floor.y;
        // Check if player's head penetrates ceiling from below
        if (p.y <= floorY + 6 && p.y >= floorY - 14) {
          const playerCenterX = p.x + p.width / 2;
          const hasSolidCeiling = floor.segments.some(
            (seg) => playerCenterX >= seg.startX - 4 && playerCenterX <= seg.endX + 4
          );
          if (hasSolidCeiling) {
            p.y = floorY + 7;
            p.vy = 0; // head bump, fall smoothly
            break;
          }
        }
      }
    }

    // 2. Landing collision check
    for (let fIdx = 0; fIdx < this.currentStage.floors.length; fIdx++) {
      const floor = this.currentStage.floors[fIdx];
      const floorY = floor.y;

      // Check if player feet crosses floor line from above
      const playerFeet = p.y + p.height;
      const prevFeet = playerFeet - p.vy;

      if (prevFeet <= floorY + 6 && playerFeet >= floorY - 4 && p.vy >= 0) {
        // Check if player X is on a solid segment (not in a hole!)
        const playerCenterX = p.x + p.width / 2;
        const onSolidSegment = floor.segments.some(
          (seg) => playerCenterX >= seg.startX && playerCenterX <= seg.endX
        );

        if (onSolidSegment) {
          // Landed successfully on floor
          p.y = floorY - p.height;
          p.vy = 0;
          p.isGrounded = true;
          p.isJumping = false;
          p.jumpVelocity = 0;
          p.currentFloorIndex = fIdx;
          if (p.state === 'jumping' || p.state === 'falling') {
            p.state = p.vx !== 0 ? 'walking' : 'idle';
            this.spawnDust(p.x + p.width / 2, p.y + p.height);
          }
          return;
        }
      }
    }

    if (!p.isGrounded && !p.isClimbing) {
      p.state = 'falling';
    }
  }

  private getTouchingLadder(p: Player, direction?: 'up' | 'down'): Ladder | undefined {
    const pCenterX = p.x + p.width / 2;
    const pFeet = p.y + p.height;

    const candidates = this.ladders.filter((lad) => {
      const xMatch = pCenterX >= lad.x - 10 && pCenterX <= lad.x + lad.width + 10;
      // Vertically intersecting: from top floor to bottom floor
      const yMatch = pFeet >= lad.topY - 4 && p.y <= lad.bottomY + 4;
      return xMatch && yMatch;
    });

    if (candidates.length === 0) return undefined;
    if (candidates.length === 1) return candidates[0];

    // If multiple candidates, pick best match based on intended climbing direction
    if (direction === 'up') {
      return candidates.find((lad) => lad.topY < pFeet - 10) || candidates[0];
    } else if (direction === 'down') {
      return candidates.find((lad) => lad.bottomY > pFeet + 10) || candidates[0];
    }

    return candidates[0];
  }

  private updateEnemies(dt: number) {
    this.enemies.forEach((enemy) => {
      enemy.animTick++;

      if (enemy.type === 'caterpillar' || enemy.type === 'snake') {
        enemy.x += enemy.vx;
        if (enemy.x <= enemy.minX) {
          enemy.x = enemy.minX;
          enemy.vx = Math.abs(enemy.vx);
          enemy.facing = 'right';
        } else if (enemy.x + enemy.width >= enemy.maxX) {
          enemy.x = enemy.maxX - enemy.width;
          enemy.vx = -Math.abs(enemy.vx);
          enemy.facing = 'left';
        }
      } else if (enemy.type === 'bat') {
        // Bat flies horizontally across and oscillates vertically
        enemy.x += enemy.vx;
        enemy.y = enemy.floorY - 45 + Math.sin(enemy.animTick * 0.08) * 14;

        if (enemy.x <= enemy.minX) {
          enemy.x = enemy.minX;
          enemy.vx = Math.abs(enemy.vx);
          enemy.facing = 'right';
        } else if (enemy.x + enemy.width >= enemy.maxX) {
          enemy.x = enemy.maxX - enemy.width;
          enemy.vx = -Math.abs(enemy.vx);
          enemy.facing = 'left';
        }
      } else if (enemy.type === 'ghost') {
        // Grim Reaper slowly tracks player position
        const dx = this.player.x - enemy.x;
        const dy = this.player.y - enemy.y;
        const dist = Math.hypot(dx, dy);
        if (dist > 2) {
          enemy.x += (dx / dist) * 1.6;
          enemy.y += (dy / dist) * 1.6;
        }
        enemy.facing = dx > 0 ? 'right' : 'left';
      }
    });
  }

  private spawnGrimReaper() {
    this.isGhostSpawned = true;
    this.enemies.push({
      id: 'ghost_reaper',
      type: 'ghost',
      x: 320,
      y: 40,
      width: 24,
      height: 24,
      vx: 1.5,
      vy: 1.5,
      floorY: 60,
      minX: 20,
      maxX: CANVAS_WIDTH - 20,
      facing: 'left',
      animFrame: 0,
      animTick: 0,
      isChasing: true,
    });
    this.spawnScoreText(320, 60, 'TIME OVER! 사신 등장!', '#EF4444');
  }

  private checkCollisions() {
    const p = this.player;
    if (p.state === 'dead') return;

    // 1. Items Collision
    this.items.forEach((item) => {
      if (item.collected) return;

      if (this.isOverlap(p, item)) {
        if (item.isPot) {
          // Mystery Pot interaction
          if (!item.potOpened) {
            item.potOpened = true;
            this.handlePotOpen(item);
          }
        } else {
          // Food Item Collection
          item.collected = true;
          this.remainingFoodCount--;
          this.score += item.points;
          this.checkHighScore();
          soundManager.playCollect(item.points);

          // Spawn sparkle particles & text
          this.spawnSparkles(item.x + item.width / 2, item.y + item.height / 2, '#FACC15');
          this.spawnScoreText(item.x + 4, item.y - 10, `+${item.points}`, '#FEF08A');

          // Check Stage Clear
          if (this.remainingFoodCount <= 0) {
            this.handleStageClear();
          }
        }
      }
    });

    if (p.invincibleTimer > 0) return;

    // 2. Spikes Collision (Only hits if player feet is aligned with spike base floor)
    const playerFeet = p.y + p.height;
    for (const spike of this.spikes) {
      const spikeBase = spike.y + spike.height;
      const vertDist = Math.abs(playerFeet - spikeBase);
      // Spike only damages if player is near its floor level (< 16px) and horizontally overlapping
      if (vertDist < 16 && this.isOverlap(p, spike, 3)) {
        this.handlePlayerDeath('spike');
        return;
      }
    }

    // 3. Enemies Collision
    for (const enemy of this.enemies) {
      if (enemy.type === 'ghost') {
        // Grim Reaper has global flying collision
        if (this.isOverlap(p, enemy, 4)) {
          this.handlePlayerDeath('enemy');
          return;
        }
      } else {
        // Ground & Bat enemies: check vertical proximity so leaping underneath upper floor enemies won't trigger death
        const enemyBase = enemy.y + enemy.height;
        const vertDist = Math.abs(playerFeet - enemyBase);
        if (vertDist < 24 && this.isOverlap(p, enemy, 4)) {
          this.handlePlayerDeath('enemy');
          return;
        }
      }
    }
  }

  private handlePotOpen(pot: GameItem) {
    const content = pot.potContent || 'fruit';

    if (content === 'snake') {
      soundManager.playSnakeHiss();
      this.spawnScoreText(pot.x, pot.y - 15, '뱀 출현!', '#EF4444');
      // Spawn new snake enemy on this floor
      const currentFloor = this.currentStage.floors.find((f) => Math.abs(f.y - 26 - pot.y) < 10);
      const floorY = currentFloor ? currentFloor.y : pot.y + 26;

      this.enemies.push({
        id: `snake_pot_${Date.now()}`,
        type: 'snake',
        x: pot.x,
        y: floorY - 18,
        width: 28,
        height: 16,
        vx: 1.6,
        vy: 0,
        floorY: floorY,
        minX: Math.max(40, pot.x - 120),
        maxX: Math.min(CANVAS_WIDTH - 40, pot.x + 120),
        facing: 'right',
        animFrame: 0,
        animTick: 0,
      });
    } else if (content === 'diamond') {
      this.score += 1000;
      this.checkHighScore();
      soundManager.playPotSuccess();
      this.spawnSparkles(pot.x + 13, pot.y + 13, '#38BDF8');
      this.spawnScoreText(pot.x, pot.y - 15, '+1000 다이아!', '#38BDF8');
    } else if (content === 'coin') {
      this.score += 500;
      this.checkHighScore();
      soundManager.playPotSuccess();
      this.spawnSparkles(pot.x + 13, pot.y + 13, '#EAB308');
      this.spawnScoreText(pot.x, pot.y - 15, '+500 금화!', '#FDE047');
    } else if (content === 'life') {
      this.lives++;
      soundManager.playPotSuccess();
      this.spawnSparkles(pot.x + 13, pot.y + 13, '#EC4899');
      this.spawnScoreText(pot.x, pot.y - 15, '1UP! 목숨 +1', '#F472B6');
    } else {
      // Fruit
      this.score += 300;
      this.checkHighScore();
      soundManager.playCollect(300);
      this.spawnSparkles(pot.x + 13, pot.y + 13, '#4ADE80');
      this.spawnScoreText(pot.x, pot.y - 15, '+300 보너스!', '#4ADE80');
    }
  }

  private handlePlayerDeath(cause: 'spike' | 'enemy' | 'fall') {
    if (this.player.state === 'dead') return;

    this.player.state = 'dead';
    this.player.vx = 0;
    this.player.vy = -4.5; // little death hop
    soundManager.playDeath();

    this.lives--;
    this.spawnScoreText(this.player.x, this.player.y - 20, 'MISS!', '#EF4444');

    setTimeout(() => {
      if (this.lives > 0) {
        // Respawn
        this.respawnPlayer();
      } else {
        // Game Over
        this.status = 'game_over';
        soundManager.stopBGM();
        this.notify();
      }
    }, 1400);
  }

  private respawnPlayer() {
    const bottomFloor = this.currentStage.floors[this.currentStage.floors.length - 1];
    this.player = {
      x: 80,
      y: bottomFloor.y - PLAYER_HEIGHT,
      width: PLAYER_WIDTH,
      height: PLAYER_HEIGHT,
      vx: 0,
      vy: 0,
      facing: 'right',
      isGrounded: true,
      isJumping: false,
      isClimbing: false,
      jumpVelocity: 0,
      currentFloorIndex: this.currentStage.floors.length - 1,
      state: 'idle',
      animFrame: 0,
      animTick: 0,
      invincibleTimer: 2.5,
    };
  }

  private handleStageClear() {
    this.status = 'stage_clear';
    soundManager.stopBGM();
    soundManager.playStageClear();

    // Calculate time bonus
    const timeBonus = this.timeLeft * 50;
    this.score += timeBonus;
    this.checkHighScore();

    this.spawnScoreText(CANVAS_WIDTH / 2 - 60, 200, `CLEAR! +${timeBonus} PTS`, '#FACC15');
    this.spawnFireworks();

    setTimeout(() => {
      if (this.stageIndex + 1 < STAGES.length) {
        this.stageIndex++;
        this.loadStage(this.stageIndex);
        this.status = 'playing';
        soundManager.startBGM();
        this.notify();
      } else {
        // All stages cleared! Game Complete!
        this.status = 'game_complete';
        this.notify();
      }
    }, 2800);
  }

  private checkHighScore() {
    if (this.score > this.highScore) {
      this.highScore = this.score;
      try {
        localStorage.setItem('ponpoko_high_score', this.highScore.toString());
      } catch {
        // ignore
      }
    }
  }

  private isOverlap(
    a: { x: number; y: number; width: number; height: number },
    b: { x: number; y: number; width: number; height: number },
    padding: number = 2
  ): boolean {
    return (
      a.x + padding < b.x + b.width - padding &&
      a.x + a.width - padding > b.x + padding &&
      a.y + padding < b.y + b.height - padding &&
      a.y + a.height - padding > b.y + padding
    );
  }

  // Particle System Helpers
  public spawnDust(x: number, y: number) {
    for (let i = 0; i < 4; i++) {
      this.particles.push({
        id: `dust_${Date.now()}_${Math.random()}`,
        x: x + (Math.random() - 0.5) * 12,
        y: y - 2,
        vx: (Math.random() - 0.5) * 1.5,
        vy: -Math.random() * 1.2,
        color: '#E2E8F0',
        size: 3 + Math.random() * 2,
        alpha: 0.8,
        life: 0,
        maxLife: 15,
      });
    }
  }

  public spawnSparkles(x: number, y: number, color: string = '#FDE047') {
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const speed = 1.2 + Math.random() * 1.8;
      this.particles.push({
        id: `sparkle_${Date.now()}_${Math.random()}`,
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: color,
        size: 2.5 + Math.random() * 2,
        alpha: 1.0,
        life: 0,
        maxLife: 20,
      });
    }
  }

  public spawnScoreText(x: number, y: number, text: string, color: string = '#FEF08A') {
    this.particles.push({
      id: `text_${Date.now()}_${Math.random()}`,
      x: x,
      y: y,
      vx: 0,
      vy: -0.8,
      color: color,
      size: 11,
      alpha: 1.0,
      life: 0,
      maxLife: 35,
      text: text,
    });
  }

  public spawnFireworks() {
    const colors = ['#EF4444', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'];
    for (let f = 0; f < 4; f++) {
      setTimeout(() => {
        const cx = 100 + Math.random() * (CANVAS_WIDTH - 200);
        const cy = 80 + Math.random() * 180;
        const color = colors[Math.floor(Math.random() * colors.length)];
        for (let i = 0; i < 16; i++) {
          const angle = (i / 16) * Math.PI * 2;
          const spd = 2.0 + Math.random() * 2.5;
          this.particles.push({
            id: `fw_${Date.now()}_${Math.random()}`,
            x: cx,
            y: cy,
            vx: Math.cos(angle) * spd,
            vy: Math.sin(angle) * spd,
            color: color,
            size: 3 + Math.random() * 2.5,
            alpha: 1.0,
            life: 0,
            maxLife: 30,
          });
        }
      }, f * 300);
    }
  }

  private updateParticles(dt: number) {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.life++;
      p.x += p.vx;
      p.y += p.vy;
      p.alpha = Math.max(0, 1.0 - p.life / p.maxLife);

      if (p.life >= p.maxLife) {
        this.particles.splice(i, 1);
      }
    }
  }
}
