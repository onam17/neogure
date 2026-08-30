import React from 'react';
import { Trophy, RotateCcw, Sparkles } from 'lucide-react';
import { GameEngine } from '../game/gameEngine';

interface VictoryModalProps {
  engine: GameEngine;
  onRestart: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({ engine, onRestart }) => {
  return (
    <div
      id="modal-victory"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div className="bg-zinc-900 border-2 border-yellow-500 rounded-xl max-w-md w-full shadow-2xl p-6 text-white text-center animate-in fade-in zoom-in-95 duration-200">
        {/* Victory Icon & Title */}
        <div className="space-y-1 mb-6">
          <div className="text-5xl mb-2 animate-bounce">👑🦝🎉</div>
          <h2 className="text-2xl font-black text-yellow-400 font-mono tracking-wider uppercase">
            ALL STAGES CLEARED!
          </h2>
          <p className="text-xs text-amber-200">축하합니다! 1980년대 너구리 전 스테이지를 정복하셨습니다!</p>
        </div>

        {/* Score Box */}
        <div className="bg-zinc-950 p-4 rounded-lg border border-yellow-500/30 space-y-3 mb-6 font-mono text-sm">
          <div className="flex justify-between items-center text-zinc-400 border-b border-zinc-800 pb-2">
            <span>클리어 스테이지</span>
            <span className="text-emerald-400 font-bold">전체 6개 완료</span>
          </div>
          <div className="flex justify-between items-center text-zinc-400 border-b border-zinc-800 pb-2">
            <span>최종 영광의 점수</span>
            <span className="text-yellow-400 font-black text-xl">{engine.score.toLocaleString()} PTS</span>
          </div>
          <div className="flex justify-between items-center text-zinc-400">
            <span>남은 목숨 보너스</span>
            <span className="text-pink-400 font-bold">{engine.lives} LIVES</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          id="btn-victory-restart"
          onClick={onRestart}
          className="w-full py-3.5 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-zinc-950 font-black rounded-lg shadow-lg font-mono text-base flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer"
        >
          <RotateCcw size={18} />
          처음부터 다시 플레이 (LOOP)
        </button>
      </div>
    </div>
  );
};
