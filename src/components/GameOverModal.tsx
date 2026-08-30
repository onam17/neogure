import React from 'react';
import { RotateCcw, Trophy, Award } from 'lucide-react';
import { GameEngine } from '../game/gameEngine';

interface GameOverModalProps {
  engine: GameEngine;
  onRestart: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({ engine, onRestart }) => {
  const isNewRecord = engine.score >= engine.highScore && engine.score > 0;

  return (
    <div
      id="modal-game-over"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div className="bg-zinc-900 border-2 border-red-500/80 rounded-xl max-w-md w-full shadow-2xl p-6 text-white text-center animate-in fade-in zoom-in-95 duration-200">
        {/* Title */}
        <div className="space-y-1 mb-6">
          <div className="text-4xl mb-2">💀</div>
          <h2 className="text-3xl font-black text-red-500 font-mono tracking-widest uppercase">GAME OVER</h2>
          <p className="text-xs text-zinc-400">너구리가 지쳐서 쓰러졌습니다!</p>
        </div>

        {/* Record Badge */}
        {isNewRecord && (
          <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 border border-amber-400 text-amber-300 text-xs font-bold rounded-full animate-bounce">
            <Trophy size={14} /> NEW HIGH SCORE 달성!
          </div>
        )}

        {/* Score Box */}
        <div className="bg-zinc-950 p-4 rounded-lg border border-zinc-800 space-y-3 mb-6 font-mono text-sm">
          <div className="flex justify-between items-center text-zinc-400 border-b border-zinc-800/80 pb-2">
            <span>도달 스테이지</span>
            <span className="text-cyan-400 font-bold text-base">{engine.stageIndex + 1} STAGE</span>
          </div>
          <div className="flex justify-between items-center text-zinc-400 border-b border-zinc-800/80 pb-2">
            <span>최종 점수 (FINAL)</span>
            <span className="text-yellow-400 font-black text-lg">{engine.score.toLocaleString()} PTS</span>
          </div>
          <div className="flex justify-between items-center text-zinc-400">
            <span>역대 최고 기록 (BEST)</span>
            <span className="text-red-400 font-bold">{engine.highScore.toLocaleString()} PTS</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          id="btn-game-over-restart"
          onClick={onRestart}
          className="w-full py-3.5 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-black rounded-lg shadow-lg font-mono text-base flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer"
        >
          <RotateCcw size={18} />
          다시 도전하기 (RETRY)
        </button>
      </div>
    </div>
  );
};
