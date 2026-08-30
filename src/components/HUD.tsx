import React from 'react';
import { Volume2, VolumeX, Music, HelpCircle, Pause, Play, Monitor, Sparkles } from 'lucide-react';
import { GameEngine } from '../game/gameEngine';
import { soundManager } from '../audio/soundManager';

interface HUDProps {
  engine: GameEngine;
  onOpenHelp: () => void;
  onTogglePause: () => void;
  isPaused: boolean;
  onToggleCRT: () => void;
  crtEnabled: boolean;
}

export const HUD: React.FC<HUDProps> = ({
  engine,
  onOpenHelp,
  onTogglePause,
  isPaused,
  onToggleCRT,
  crtEnabled,
}) => {
  const [soundOn, setSoundOn] = React.useState(soundManager.isSoundOn());
  const [musicOn, setMusicOn] = React.useState(soundManager.isMusicOn());

  const toggleSound = () => {
    const next = !soundOn;
    soundManager.setSoundEnabled(next);
    setSoundOn(next);
  };

  const toggleMusic = () => {
    const next = !musicOn;
    soundManager.setMusicEnabled(next);
    setMusicOn(next);
  };

  // Pad score with leading zeros (e.g. 004500)
  const formatScore = (num: number) => num.toString().padStart(6, '0');

  // Time warning color
  const timeColor =
    engine.timeLeft <= 10
      ? 'text-red-500 animate-pulse'
      : engine.timeLeft <= 20
      ? 'text-yellow-400'
      : 'text-emerald-400';

  return (
    <div id="game-hud" className="w-full shrink-0 bg-zinc-900 border-b border-amber-600/60 px-2 sm:px-3 py-1 sm:py-1.5 text-white select-none">
      {/* Top Retro Info Bar */}
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-1 sm:gap-2 text-[10px] sm:text-xs font-mono">
        {/* Score & High Score */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div>
            <div className="text-amber-400 font-bold text-[8px] sm:text-[10px] tracking-wider leading-none">1P</div>
            <div className="text-xs sm:text-sm font-black tracking-wider text-yellow-300 font-mono leading-tight">
              {formatScore(engine.score)}
            </div>
          </div>

          <div className="hidden xs:block">
            <div className="text-red-400 font-bold text-[8px] sm:text-[10px] tracking-wider leading-none">HIGH</div>
            <div className="text-xs sm:text-sm font-black tracking-wider text-red-300 font-mono leading-tight">
              {formatScore(engine.highScore)}
            </div>
          </div>
        </div>

        {/* Stage & Items remaining & Time */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="text-center">
            <div className="text-cyan-400 font-bold text-[8px] sm:text-[10px] tracking-wider leading-none">STG</div>
            <div className="text-xs sm:text-sm font-black text-cyan-200 leading-tight">
              {engine.stageIndex + 1}
            </div>
          </div>

          <div className="text-center">
            <div className="text-emerald-400 font-bold text-[8px] sm:text-[10px] tracking-wider leading-none">음식</div>
            <div className="text-xs sm:text-sm font-black text-emerald-300 flex items-center justify-center gap-0.5 leading-tight">
              <span>🍎</span>
              <span>{engine.remainingFoodCount}</span>
            </div>
          </div>

          <div className="text-center">
            <div className="text-orange-400 font-bold text-[8px] sm:text-[10px] tracking-wider leading-none">TIME</div>
            <div className={`text-xs sm:text-sm font-black font-mono leading-tight ${timeColor}`}>
              {engine.timeLeft.toString().padStart(2, '0')}s
            </div>
          </div>

          {/* Lives display */}
          <div className="flex items-center gap-0.5 bg-zinc-950/80 px-1.5 py-0.5 rounded border border-amber-500/40">
            <span className="text-[9px] text-amber-400 font-bold mr-0.5">REST</span>
            {Array.from({ length: Math.min(3, Math.max(0, engine.lives)) }).map((_, idx) => (
              <span key={idx} className="text-xs" title="Raccoon Life">
                🦝
              </span>
            ))}
            {engine.lives > 3 && <span className="text-[10px] text-amber-300 font-bold">+{engine.lives - 3}</span>}
            {engine.lives <= 0 && <span className="text-[9px] text-red-400">0</span>}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1">
          <button
            id="hud-toggle-sound"
            onClick={toggleSound}
            className={`p-1 sm:p-1.5 rounded transition-colors ${
              soundOn ? 'bg-zinc-800 text-yellow-400 hover:bg-zinc-700' : 'bg-zinc-800 text-zinc-500'
            }`}
            title={soundOn ? '효과음 끄기' : '효과음 켜기'}
          >
            {soundOn ? <Volume2 size={13} /> : <VolumeX size={13} />}
          </button>

          <button
            id="hud-toggle-music"
            onClick={toggleMusic}
            className={`p-1 sm:p-1.5 rounded transition-colors hidden sm:block ${
              musicOn ? 'bg-zinc-800 text-cyan-400 hover:bg-zinc-700' : 'bg-zinc-800 text-zinc-500'
            }`}
            title={musicOn ? 'BGM 끄기' : 'BGM 켜기'}
          >
            <Music size={13} />
          </button>

          <button
            id="hud-toggle-crt"
            onClick={onToggleCRT}
            className={`p-1 sm:p-1.5 rounded transition-colors hidden md:block ${
              crtEnabled ? 'bg-amber-600/30 text-amber-300 border border-amber-500/50' : 'bg-zinc-800 text-zinc-400'
            }`}
            title="CRT 모니터 효과 토글"
          >
            <Monitor size={13} />
          </button>

          <button
            id="hud-toggle-pause"
            onClick={onTogglePause}
            className="p-1 sm:p-1.5 rounded bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-colors"
            title={isPaused ? '게임 재개' : '일시정지 (P)'}
          >
            {isPaused ? <Play size={13} /> : <Pause size={13} />}
          </button>

          <button
            id="hud-open-help"
            onClick={onOpenHelp}
            className="p-1 sm:p-1.5 rounded bg-amber-600 hover:bg-amber-500 text-zinc-950 font-bold transition-colors"
            title="게임 설명서 (조작법 & 아이템)"
          >
            <HelpCircle size={13} />
          </button>
        </div>
      </div>
    </div>
  );
};
