import React, { useEffect, useRef } from 'react';
import { GameEngine, CANVAS_WIDTH, CANVAS_HEIGHT } from '../game/gameEngine';
import { drawEnemy, drawItem, drawLadder, drawPlatform, drawRaccoon, drawSpikes } from '../game/sprites';

interface GameCanvasProps {
  engine: GameEngine;
  isPaused: boolean;
  onTogglePause: () => void;
  onStartGame: () => void;
  crtEnabled: boolean;
}

export const GameCanvas: React.FC<GameCanvasProps> = ({
  engine,
  isPaused,
  onTogglePause,
  onStartGame,
  crtEnabled,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Keyboard Event Handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent browser default scrolling for game keys
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' ', 'Space', 'Spacebar'].includes(e.key)) {
        e.preventDefault();
      }

      if (e.key === 'p' || e.key === 'P') {
        onTogglePause();
        return;
      }

      if (engine.status === 'title' && (e.key === ' ' || e.key === 'Space' || e.key === 'Enter')) {
        onStartGame();
        return;
      }

      switch (e.key) {
        case 'ArrowLeft':
        case 'a':
        case 'A':
          engine.keys.left = true;
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          engine.keys.right = true;
          break;
        case 'ArrowUp':
        case 'w':
        case 'W':
          engine.keys.up = true;
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          engine.keys.down = true;
          break;
        case ' ':
        case 'Space':
        case 'Spacebar':
        case 'z':
        case 'Z':
        case 'k':
        case 'K':
          engine.keys.jump = true;
          engine.triggerJump();
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
        case 'a':
        case 'A':
          engine.keys.left = false;
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          engine.keys.right = false;
          break;
        case 'ArrowUp':
        case 'w':
        case 'W':
          engine.keys.up = false;
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          engine.keys.down = false;
          break;
        case ' ':
        case 'Space':
        case 'Spacebar':
        case 'z':
        case 'Z':
        case 'k':
        case 'K':
          engine.keys.jump = false;
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [engine, onTogglePause, onStartGame]);

  // Main Render & Game Loop
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const render = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          // 1. Update Game Engine (if not paused)
          if (!isPaused) {
            engine.update(dt);
          }

          // 2. Draw Background
          ctx.fillStyle = '#09090B'; // Dark background
          ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

          // Subtle retro background grid dots
          ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
          for (let x = 20; x < CANVAS_WIDTH; x += 40) {
            for (let y = 20; y < CANVAS_HEIGHT; y += 40) {
              ctx.fillRect(x, y, 2, 2);
            }
          }

          // Stage Title Watermark in Background
          ctx.save();
          ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
          ctx.font = 'bold 36px "Press Start 2P", monospace';
          ctx.textAlign = 'center';
          ctx.fillText(`STAGE ${engine.stageIndex + 1}`, CANVAS_WIDTH / 2, 60);
          ctx.restore();

          // 3. Draw Side Border Pillars
          ctx.fillStyle = '#27272A';
          ctx.fillRect(0, 0, 30, CANVAS_HEIGHT);
          ctx.fillRect(CANVAS_WIDTH - 30, 0, 30, CANVAS_HEIGHT);

          // Yellow/Black Caution Stripes on Pillars
          ctx.fillStyle = '#EAB308';
          for (let y = 0; y < CANVAS_HEIGHT; y += 30) {
            ctx.fillRect(4, y, 8, 12);
            ctx.fillRect(CANVAS_WIDTH - 12, y, 8, 12);
          }

          // 4. Draw Ladders
          engine.ladders.forEach((ladder) => {
            drawLadder(ctx, ladder);
          });

          // 5. Draw Platforms (Floors)
          engine.currentStage.floors.forEach((floor) => {
            floor.segments.forEach((seg) => {
              drawPlatform(
                ctx,
                seg.startX,
                floor.y,
                seg.endX - seg.startX,
                14,
                engine.currentStage.platformColor
              );
            });
          });

          // 6. Draw Spikes
          engine.spikes.forEach((spike) => {
            drawSpikes(ctx, spike);
          });

          // 7. Draw Items & Pots
          engine.items.forEach((item) => {
            drawItem(ctx, item);
          });

          // 8. Draw Enemies
          engine.enemies.forEach((enemy) => {
            drawEnemy(ctx, enemy);
          });

          // 9. Draw Player (Raccoon)
          if (engine.status === 'playing' || engine.status === 'stage_clear') {
            drawRaccoon(ctx, engine.player);
          }

          // 10. Draw Floating Particles & Score Texts
          engine.particles.forEach((p) => {
            ctx.save();
            ctx.globalAlpha = p.alpha;
            if (p.text) {
              ctx.fillStyle = p.color;
              ctx.font = `bold ${p.size}px "Press Start 2P", monospace`;
              ctx.textAlign = 'center';
              ctx.fillText(p.text, p.x, p.y);
            } else {
              ctx.fillStyle = p.color;
              ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
            }
            ctx.restore();
          });

          // 11. Overlays
          if (engine.status === 'title') {
            // Nostalgic Title Screen Overlay
            ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
            ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

            ctx.fillStyle = '#FACC15';
            ctx.font = 'bold 36px "DungGeunMo", "Press Start 2P", monospace';
            ctx.textAlign = 'center';
            ctx.fillText('1982 너 구 리', CANVAS_WIDTH / 2, 140);

            ctx.fillStyle = '#38BDF8';
            ctx.font = '14px "Press Start 2P", monospace';
            ctx.fillText('PONPOKO ARCADE', CANVAS_WIDTH / 2, 180);

            // Draw cute preview raccoon in center
            ctx.fillStyle = '#FEF08A';
            ctx.font = '13px "DungGeunMo", sans-serif';
            ctx.fillText('과일을 전부 먹고 가시와 뱀을 피해 탈출하세요!', CANVAS_WIDTH / 2, 240);

            // Blinking Insert Coin / Press Start prompt
            if (Math.floor(currentTime / 500) % 2 === 0) {
              ctx.fillStyle = '#EF4444';
              ctx.font = 'bold 16px "Press Start 2P", monospace';
              ctx.fillText('PRESS SPACE TO START', CANVAS_WIDTH / 2, 330);
            }

            ctx.fillStyle = '#71717A';
            ctx.font = '10px "Press Start 2P", monospace';
            ctx.fillText('© 1982 SIGMA ENTERPRISES / RETRO REMAKE', CANVAS_WIDTH / 2, 420);
          } else if (isPaused) {
            // Paused Overlay
            ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

            ctx.fillStyle = '#FACC15';
            ctx.font = 'bold 24px "Press Start 2P", monospace';
            ctx.textAlign = 'center';
            ctx.fillText('PAUSED', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 10);

            ctx.fillStyle = '#A1A1AA';
            ctx.font = '11px "Press Start 2P", monospace';
            ctx.fillText('PRESS P TO RESUME', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 25);
          } else if (engine.status === 'stage_clear') {
            // Stage Clear banner
            ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
            ctx.fillRect(0, CANVAS_HEIGHT / 2 - 40, CANVAS_WIDTH, 80);

            ctx.fillStyle = '#4ADE80';
            ctx.font = 'bold 22px "Press Start 2P", monospace';
            ctx.textAlign = 'center';
            ctx.fillText('STAGE CLEAR!', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 8);
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [engine, isPaused]);

  return (
    <div className="relative w-full flex-1 min-h-0 flex items-center justify-center p-0.5 sm:p-2 overflow-hidden">
      {/* Game Canvas Container with retro border */}
      <div className="relative overflow-hidden rounded-md sm:rounded-lg shadow-2xl bg-zinc-950 border-2 sm:border-4 border-zinc-800 flex items-center justify-center max-h-full max-w-full aspect-[4/3]">
        <canvas
          id="game-canvas"
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="block max-h-full max-w-full w-auto h-auto aspect-[4/3] object-contain image-rendering-pixelated cursor-pointer"
          onClick={() => {
            if (engine.status === 'title') {
              onStartGame();
            }
          }}
        />

        {/* CRT Scanlines and Glow filter */}
        {crtEnabled && (
          <div
            id="crt-scanline-overlay"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px] opacity-75 mix-blend-overlay"
          />
        )}
      </div>
    </div>
  );
};
