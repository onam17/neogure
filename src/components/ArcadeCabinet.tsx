import React from 'react';
import { GameEngine } from '../game/gameEngine';
import { STAGES } from '../game/stages';
import { Gamepad2 } from 'lucide-react';

interface ArcadeCabinetProps {
  engine: GameEngine;
  onSelectStage: (stageIdx: number) => void;
  children: React.ReactNode;
}

export const ArcadeCabinet: React.FC<ArcadeCabinetProps> = ({ engine, onSelectStage, children }) => {
  return (
    <div className="h-[100dvh] max-h-[100dvh] w-full bg-zinc-950 text-white flex flex-col items-center justify-between overflow-hidden font-sans select-none">
      {/* Top Arcade Marquee */}
      <header className="w-full shrink-0 bg-gradient-to-b from-zinc-900 via-zinc-950 to-zinc-900 border-b-2 border-amber-600/80 shadow-md py-1.5 sm:py-2.5 px-3 sm:px-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
          {/* Logo / Title */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-md bg-gradient-to-br from-amber-500 to-orange-700 flex items-center justify-center text-lg sm:text-xl shadow border border-amber-300/40 shrink-0">
              🦝
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h1 className="text-base sm:text-xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-500 font-mono leading-none">
                  너구리 <span className="text-[10px] sm:text-xs text-cyan-400 font-normal">PONPOKO</span>
                </h1>
                <span className="px-1.5 py-0.2 text-[9px] font-bold bg-red-600/90 text-white rounded uppercase tracking-tighter animate-pulse">
                  1982
                </span>
              </div>
            </div>
          </div>

          {/* Stage Selector (Scrollable / Compact on mobile) */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5 max-w-[200px] sm:max-w-none">
            <span className="text-[10px] text-amber-400 font-bold font-mono mr-1 hidden md:inline">
              STAGE:
            </span>
            {STAGES.map((stg, idx) => (
              <button
                key={stg.stageNumber}
                id={`btn-stage-select-${idx}`}
                onClick={() => onSelectStage(idx)}
                className={`px-2 py-0.5 text-[11px] sm:text-xs font-mono font-bold rounded transition-all cursor-pointer shrink-0 ${
                  engine.stageIndex === idx
                    ? 'bg-amber-500 text-zinc-950 shadow-sm shadow-amber-500/50 scale-105 font-black'
                    : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
                }`}
                title={stg.koreanName}
              >
                ST{idx + 1}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Game Screen Center */}
      <main className="w-full flex-1 min-h-0 flex flex-col items-center justify-center p-1 sm:p-2 overflow-hidden">
        {children}
      </main>

      {/* Retro Arcade Bottom Footer - Compact on mobile */}
      <footer className="w-full shrink-0 bg-zinc-950 border-t border-zinc-900 px-3 py-1 text-center text-[10px] text-zinc-500 hidden sm:flex items-center justify-between max-w-4xl mx-auto">
        <div className="flex items-center gap-1.5">
          <Gamepad2 size={13} className="text-amber-500" />
          <span>키보드: 방향키/WASD 이동, SPACEBAR 점프, P 일시정지</span>
        </div>
        <div className="font-mono text-[10px] text-zinc-400">
          신비의 항아리(🏺)에서 다이아몬드/보너스 목숨 획득!
        </div>
      </footer>
    </div>
  );
};
