/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { GameEngine } from './game/gameEngine';
import { GameSettings } from './types';
import { HUD } from './components/HUD';
import { GameCanvas } from './components/GameCanvas';
import { MobileControls } from './components/MobileControls';
import { GameOverModal } from './components/GameOverModal';
import { VictoryModal } from './components/VictoryModal';
import { HowToPlayModal } from './components/HowToPlayModal';
import { ArcadeCabinet } from './components/ArcadeCabinet';

export default function App() {
  const [settings, setSettings] = useState<GameSettings>({
    soundEnabled: true,
    musicEnabled: true,
    crtFilter: true,
    scanlines: true,
    phosphorGlow: true,
    difficulty: 'classic',
  });

  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [showHelp, setShowHelp] = useState<boolean>(false);
  const [, setTick] = useState<number>(0);

  // Maintain persistent GameEngine instance
  const engineRef = useRef<GameEngine | null>(null);
  if (!engineRef.current) {
    engineRef.current = new GameEngine(settings, () => {
      setTick((t) => t + 1);
    });
  }

  const engine = engineRef.current;

  // Force re-render on engine state change
  useEffect(() => {
    engine.setOnStateChange(() => {
      setTick((t) => t + 1);
    });
  }, [engine]);

  const handleStartGame = () => {
    setIsPaused(false);
    engine.startGame(0);
    setTick((t) => t + 1);
  };

  const handleRestart = () => {
    setIsPaused(false);
    engine.restartGame();
    setTick((t) => t + 1);
  };

  const handleSelectStage = (stageIdx: number) => {
    setIsPaused(false);
    engine.startGame(stageIdx);
    setTick((t) => t + 1);
  };

  const handleTogglePause = () => {
    if (engine.status === 'playing' || engine.status === 'paused') {
      const next = !isPaused;
      setIsPaused(next);
      engine.status = next ? 'paused' : 'playing';
      setTick((t) => t + 1);
    }
  };

  const handleToggleCRT = () => {
    setSettings((prev) => ({
      ...prev,
      crtFilter: !prev.crtFilter,
    }));
  };

  return (
    <ArcadeCabinet engine={engine} onSelectStage={handleSelectStage}>
      {/* Game Content Container */}
      <div className="w-full h-full max-w-4xl flex flex-col justify-between items-center overflow-hidden">
        {/* Game HUD Bar */}
        <HUD
          engine={engine}
          onOpenHelp={() => setShowHelp(true)}
          onTogglePause={handleTogglePause}
          isPaused={isPaused}
          onToggleCRT={handleToggleCRT}
          crtEnabled={settings.crtFilter}
        />

        {/* Retro Game Canvas */}
        <GameCanvas
          engine={engine}
          isPaused={isPaused}
          onTogglePause={handleTogglePause}
          onStartGame={handleStartGame}
          crtEnabled={settings.crtFilter}
        />

        {/* Touch & Mobile Virtual Controls */}
        <MobileControls engine={engine} />
      </div>

      {/* Modals */}
      {showHelp && <HowToPlayModal onClose={() => setShowHelp(false)} />}
      {engine.status === 'game_over' && <GameOverModal engine={engine} onRestart={handleRestart} />}
      {engine.status === 'game_complete' && <VictoryModal engine={engine} onRestart={handleRestart} />}
    </ArcadeCabinet>
  );
}
