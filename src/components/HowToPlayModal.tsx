import React from 'react';
import { X, Sparkles, HelpCircle, AlertTriangle, ShieldCheck } from 'lucide-react';

interface HowToPlayModalProps {
  onClose: () => void;
}

export const HowToPlayModal: React.FC<HowToPlayModalProps> = ({ onClose }) => {
  return (
    <div
      id="modal-how-to-play"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div className="bg-zinc-900 border-2 border-amber-500 rounded-xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 text-white text-sm">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🦝</span>
            <div>
              <h2 className="text-lg font-bold text-amber-400 font-mono">1980s 너구리 게임 설명서</h2>
              <p className="text-xs text-zinc-400">오리지널 Ponpoko 아케이드 룰 & 비기 가이드</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 pt-4">
          {/* Mission Objective */}
          <div className="bg-zinc-950 p-3 rounded-lg border border-amber-500/30">
            <h3 className="font-bold text-amber-300 text-xs uppercase mb-1 flex items-center gap-1.5">
              <Sparkles size={14} /> 게임 목표
            </h3>
            <p className="text-zinc-300 text-xs leading-relaxed">
              너구리를 조작하여 맵에 흩어져 있는 <strong>모든 과일과 채소</strong>를 전부 획득하면 다음 스테이지로
              넘어갑니다! 제한 시간 내에 함정과 적을 피해 탈출하세요!
            </p>
          </div>

          {/* Controls */}
          <div>
            <h3 className="font-bold text-cyan-300 text-xs uppercase mb-2">🎮 기본 조작법</h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-zinc-800/80 p-2.5 rounded border border-zinc-700">
                <span className="text-amber-400 font-bold">← / → (A / D)</span>
                <p className="text-zinc-400 text-[11px] mt-0.5">좌우로 이동합니다.</p>
              </div>
              <div className="bg-zinc-800/80 p-2.5 rounded border border-zinc-700">
                <span className="text-amber-400 font-bold">↑ / ↓ (W / S)</span>
                <p className="text-zinc-400 text-[11px] mt-0.5">사다리를 오르내립니다.</p>
              </div>
              <div className="bg-zinc-800/80 p-2.5 rounded border border-zinc-700">
                <span className="text-amber-400 font-bold">SPACE / ↑ (점프 버튼)</span>
                <p className="text-zinc-400 text-[11px] mt-0.5">압정과 구멍을 뛰어넘는 포물선 점프!</p>
              </div>
              <div className="bg-zinc-800/80 p-2.5 rounded border border-zinc-700">
                <span className="text-amber-400 font-bold">P 키</span>
                <p className="text-zinc-400 text-[11px] mt-0.5">게임 일시 정지 및 재개</p>
              </div>
            </div>
          </div>

          {/* Items & Points */}
          <div>
            <h3 className="font-bold text-emerald-300 text-xs uppercase mb-2">🍎 아이템 & 점수 표</h3>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="bg-zinc-800/60 p-2 rounded flex items-center gap-2">
                <span className="text-lg">🥕</span>
                <div>
                  <div className="font-bold text-orange-400">당근/무</div>
                  <div className="text-zinc-400 text-[10px]">100 PTS</div>
                </div>
              </div>
              <div className="bg-zinc-800/60 p-2 rounded flex items-center gap-2">
                <span className="text-lg">🍎</span>
                <div>
                  <div className="font-bold text-red-400">사과/바나나</div>
                  <div className="text-zinc-400 text-[10px]">200 PTS</div>
                </div>
              </div>
              <div className="bg-zinc-800/60 p-2 rounded flex items-center gap-2">
                <span className="text-lg">🍉</span>
                <div>
                  <div className="font-bold text-green-400">수박/딸기</div>
                  <div className="text-zinc-400 text-[10px]">300 PTS</div>
                </div>
              </div>
              <div className="bg-zinc-800/60 p-2 rounded flex items-center gap-2">
                <span className="text-lg">🍇</span>
                <div>
                  <div className="font-bold text-purple-400">포도/버섯</div>
                  <div className="text-zinc-400 text-[10px]">400 PTS</div>
                </div>
              </div>
              <div className="bg-zinc-800/60 p-2 rounded flex items-center gap-2">
                <span className="text-lg">💎</span>
                <div>
                  <div className="font-bold text-cyan-400">다이아몬드</div>
                  <div className="text-zinc-400 text-[10px]">800~1000 PTS</div>
                </div>
              </div>
              <div className="bg-zinc-800/60 p-2 rounded flex items-center gap-2">
                <span className="text-lg">🏺</span>
                <div>
                  <div className="font-bold text-yellow-500">신비의 항아리</div>
                  <div className="text-zinc-400 text-[10px]">보너스 or 뱀!?</div>
                </div>
              </div>
            </div>
          </div>

          {/* Hazards */}
          <div>
            <h3 className="font-bold text-red-400 text-xs uppercase mb-2 flex items-center gap-1">
              <AlertTriangle size={14} /> 위험 요소 & 장애물
            </h3>
            <ul className="space-y-1.5 text-xs text-zinc-300">
              <li className="flex items-start gap-2 bg-red-950/20 p-2 rounded border border-red-900/30">
                <span className="text-base">📍</span>
                <div>
                  <strong className="text-red-300">압정 (가시)</strong>: 밟으면 즉시 목숨을 잃습니다. 타이밍에 맞춰
                  점프로 넘어가세요.
                </div>
              </li>
              <li className="flex items-start gap-2 bg-red-950/20 p-2 rounded border border-red-900/30">
                <span className="text-base">🐛</span>
                <div>
                  <strong className="text-yellow-300">애벌레 & 뱀</strong>: 바닥을 기어다니는 적입니다. 접촉 시 MISS가
                  발생합니다.
                </div>
              </li>
              <li className="flex items-start gap-2 bg-red-950/20 p-2 rounded border border-red-900/30">
                <span className="text-base">🕳️</span>
                <div>
                  <strong className="text-zinc-300">낭떠러지 (구멍)</strong>: 바닥 사이 뚫린 구멍으로 떨어지면 아래 층으로
                  추락하며, 맨 아래 구멍으로 떨어지면 낙사합니다.
                </div>
              </li>
              <li className="flex items-start gap-2 bg-red-950/20 p-2 rounded border border-red-900/30">
                <span className="text-base">👻</span>
                <div>
                  <strong className="text-purple-300">사신 (타임오버)</strong>: 제한 시간이 다 되면 플레이어를 끝까지 쫓아오는
                  유령이 등장합니다!
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Button */}
        <div className="mt-5 pt-3 border-t border-zinc-800 text-center">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold rounded-lg shadow-lg font-mono text-sm transition-transform active:scale-95"
          >
            게임 시작하기! (CLOSE)
          </button>
        </div>
      </div>
    </div>
  );
};
