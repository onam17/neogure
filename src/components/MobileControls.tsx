import React from 'react';
import { ArrowLeft, ArrowRight, ArrowUp, ArrowDown } from 'lucide-react';
import { GameEngine } from '../game/gameEngine';

interface MobileControlsProps {
  engine: GameEngine;
}

export const MobileControls: React.FC<MobileControlsProps> = ({ engine }) => {
  const setKeyState = (key: 'left' | 'right' | 'up' | 'down' | 'jump', active: boolean) => {
    if (key === 'jump') {
      engine.keys.jump = active;
      if (active) {
        engine.triggerJump();
      }
    } else {
      engine.keys[key] = active;
    }
  };

  return (
    <div
      id="mobile-virtual-controls"
      className="w-full shrink-0 max-w-2xl mx-auto px-3 sm:px-6 py-1.5 sm:py-2 flex items-center justify-between gap-2 select-none touch-none"
    >
      {/* Directional D-Pad */}
      <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center shrink-0">
        {/* Up (Ladder Up) */}
        <button
          id="btn-ctrl-up"
          type="button"
          onTouchStart={(e) => { e.preventDefault(); setKeyState('up', true); }}
          onTouchEnd={(e) => { e.preventDefault(); setKeyState('up', false); }}
          onTouchCancel={(e) => { e.preventDefault(); setKeyState('up', false); }}
          onMouseDown={(e) => { e.preventDefault(); setKeyState('up', true); }}
          onMouseUp={(e) => { e.preventDefault(); setKeyState('up', false); }}
          onMouseLeave={(e) => { e.preventDefault(); setKeyState('up', false); }}
          className="absolute top-0 left-9 sm:left-10 w-10 sm:w-12 h-10 sm:h-12 bg-zinc-800 active:bg-amber-600 border border-zinc-700 active:border-amber-400 rounded-t-lg flex items-center justify-center text-zinc-300 active:text-white shadow active:scale-95 transition-transform cursor-pointer"
          aria-label="Up Ladder"
        >
          <ArrowUp size={20} />
        </button>

        {/* Down (Ladder Down) */}
        <button
          id="btn-ctrl-down"
          type="button"
          onTouchStart={(e) => { e.preventDefault(); setKeyState('down', true); }}
          onTouchEnd={(e) => { e.preventDefault(); setKeyState('down', false); }}
          onTouchCancel={(e) => { e.preventDefault(); setKeyState('down', false); }}
          onMouseDown={(e) => { e.preventDefault(); setKeyState('down', true); }}
          onMouseUp={(e) => { e.preventDefault(); setKeyState('down', false); }}
          onMouseLeave={(e) => { e.preventDefault(); setKeyState('down', false); }}
          className="absolute bottom-0 left-9 sm:left-10 w-10 sm:w-12 h-10 sm:h-12 bg-zinc-800 active:bg-amber-600 border border-zinc-700 active:border-amber-400 rounded-b-lg flex items-center justify-center text-zinc-300 active:text-white shadow active:scale-95 transition-transform cursor-pointer"
          aria-label="Down Ladder"
        >
          <ArrowDown size={20} />
        </button>

        {/* Left */}
        <button
          id="btn-ctrl-left"
          type="button"
          onTouchStart={(e) => { e.preventDefault(); setKeyState('left', true); }}
          onTouchEnd={(e) => { e.preventDefault(); setKeyState('left', false); }}
          onTouchCancel={(e) => { e.preventDefault(); setKeyState('left', false); }}
          onMouseDown={(e) => { e.preventDefault(); setKeyState('left', true); }}
          onMouseUp={(e) => { e.preventDefault(); setKeyState('left', false); }}
          onMouseLeave={(e) => { e.preventDefault(); setKeyState('left', false); }}
          className="absolute left-0 top-9 sm:top-10 w-10 sm:w-12 h-10 sm:h-12 bg-zinc-800 active:bg-amber-600 border border-zinc-700 active:border-amber-400 rounded-l-lg flex items-center justify-center text-zinc-300 active:text-white shadow active:scale-95 transition-transform cursor-pointer"
          aria-label="Move Left"
        >
          <ArrowLeft size={20} />
        </button>

        {/* Right */}
        <button
          id="btn-ctrl-right"
          type="button"
          onTouchStart={(e) => { e.preventDefault(); setKeyState('right', true); }}
          onTouchEnd={(e) => { e.preventDefault(); setKeyState('right', false); }}
          onTouchCancel={(e) => { e.preventDefault(); setKeyState('right', false); }}
          onMouseDown={(e) => { e.preventDefault(); setKeyState('right', true); }}
          onMouseUp={(e) => { e.preventDefault(); setKeyState('right', false); }}
          onMouseLeave={(e) => { e.preventDefault(); setKeyState('right', false); }}
          className="absolute right-0 top-9 sm:top-10 w-10 sm:w-12 h-10 sm:h-12 bg-zinc-800 active:bg-amber-600 border border-zinc-700 active:border-amber-400 rounded-r-lg flex items-center justify-center text-zinc-300 active:text-white shadow active:scale-95 transition-transform cursor-pointer"
          aria-label="Move Right"
        >
          <ArrowRight size={20} />
        </button>

        {/* Center Pivot */}
        <div className="w-10 sm:w-12 h-10 sm:h-12 bg-zinc-900 border border-zinc-700/50 rounded-sm flex items-center justify-center text-[8px] font-bold text-zinc-500 pointer-events-none">
          D-PAD
        </div>
      </div>

      {/* Middle instructions reminder */}
      <div className="hidden sm:flex flex-col items-center justify-center text-center text-zinc-500 text-[10px] font-mono leading-tight">
        <div className="text-amber-400 font-bold">오락실 조작 가이드</div>
        <div>← → 이동 | ↑ ↓ 사다리</div>
        <div>SPACEBAR / JUMP 점프</div>
      </div>

      {/* Action / Jump Button */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          id="btn-ctrl-jump"
          type="button"
          onTouchStart={(e) => { e.preventDefault(); setKeyState('jump', true); }}
          onTouchEnd={(e) => { e.preventDefault(); setKeyState('jump', false); }}
          onTouchCancel={(e) => { e.preventDefault(); setKeyState('jump', false); }}
          onMouseDown={(e) => { e.preventDefault(); setKeyState('jump', true); }}
          onMouseUp={(e) => { e.preventDefault(); setKeyState('jump', false); }}
          onMouseLeave={(e) => { e.preventDefault(); setKeyState('jump', false); }}
          className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-b from-red-500 to-red-700 active:from-red-600 active:to-red-800 border-3 sm:border-4 border-red-900 active:border-amber-400 rounded-full flex flex-col items-center justify-center text-white font-black shadow-lg shadow-red-950/60 active:scale-90 transition-transform cursor-pointer"
          aria-label="Jump Button"
        >
          <span className="text-xs sm:text-sm font-mono tracking-tighter leading-none">JUMP</span>
          <span className="text-[9px] sm:text-[10px] text-red-200 leading-tight">점프</span>
        </button>
      </div>
    </div>
  );
};
