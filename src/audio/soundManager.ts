/**
 * 1980s Retro Arcade 8-Bit Sound Synthesizer using Web Audio API
 */

class SoundManager {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;
  private musicEnabled: boolean = true;
  private bgmInterval: number | null = null;
  private isBgmPlaying: boolean = false;
  private currentNoteIndex: number = 0;

  constructor() {
    // AudioContext will be initialized on first user gesture
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setSoundEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
  }

  public setMusicEnabled(enabled: boolean) {
    this.musicEnabled = enabled;
    if (!enabled) {
      this.stopBGM();
    } else if (this.isBgmPlaying) {
      this.startBGM();
    }
  }

  public isSoundOn() {
    return this.soundEnabled;
  }

  public isMusicOn() {
    return this.musicEnabled;
  }

  /**
   * Classic retro jump sound - frequency sweep up
   */
  public playJump() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    const now = this.ctx.currentTime;

    osc.frequency.setValueAtTime(160, now);
    osc.frequency.exponentialRampToValueAtTime(620, now + 0.16);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.18);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.18);
  }

  /**
   * Fruit / Item Collect Chime
   */
  public playCollect(points: number = 100) {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = points > 400 ? [523.25, 659.25, 783.99, 1046.5] : [587.33, 880, 1174.66];
    const duration = 0.06;

    notes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, now + idx * duration);

      gain.gain.setValueAtTime(0.15, now + idx * duration);
      gain.gain.exponentialRampToValueAtTime(0.001, now + (idx + 1) * duration + 0.02);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + idx * duration);
      osc.stop(now + (idx + 1) * duration + 0.02);
    });
  }

  /**
   * Pot Open - Mystery Treasure
   */
  public playPotSuccess() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const chords = [440, 554.37, 659.25, 880, 1108.73];
    chords.forEach((freq, i) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + i * 0.04);
      gain.gain.setValueAtTime(0.2, now + i * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.04 + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + i * 0.04);
      osc.stop(now + i * 0.04 + 0.15);
    });
  }

  /**
   * Pot Open - Snake Hiss / Hazard
   */
  public playSnakeHiss() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.linearRampToValueAtTime(140, now + 0.25);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.3);
  }

  /**
   * Ladder climbing step
   */
  public playLadderStep() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(240, now);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.04);
  }

  /**
   * Death / Hit Hazard Sound (Classic 80s arcade fail)
   */
  public playDeath() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [440, 392, 349.23, 311.13, 261.63, 196, 130.81];

    notes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      const t = now + idx * 0.08;

      osc.frequency.setValueAtTime(freq, t);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.9, t + 0.08);

      gain.gain.setValueAtTime(0.25, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.09);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.09);
    });
  }

  /**
   * Stage Clear Fanfare
   */
  public playStageClear() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // C, E, G, high C, rest, G, high C
    const melody = [
      { f: 523.25, d: 0.12 },
      { f: 659.25, d: 0.12 },
      { f: 783.99, d: 0.12 },
      { f: 1046.5, d: 0.28 },
      { f: 783.99, d: 0.14 },
      { f: 1046.5, d: 0.45 },
    ];

    let t = now;
    melody.forEach((note) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(note.f, t);

      gain.gain.setValueAtTime(0.2, t);
      gain.gain.linearRampToValueAtTime(0.01, t + note.d);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + note.d);

      t += note.d + 0.02;
    });
  }

  /**
   * Time warning beep
   */
  public playTimeWarning() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(880, now);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.08);
  }

  /**
   * Background Music: 8-bit retro bouncy melody
   */
  public startBGM() {
    this.isBgmPlaying = true;
    if (!this.musicEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    this.stopBGM();

    // 80s arcade rhythmic melody notes (Ponpoko style jaunty tune)
    // C4, E4, G4, A4, G4, E4, C4, D4, etc.
    const notes = [
      523.25, 0, 523.25, 659.25, 783.99, 0, 659.25, 0,
      523.25, 0, 440.00, 0, 392.00, 0, 440.00, 493.88,
      523.25, 0, 523.25, 659.25, 783.99, 880.00, 783.99, 0,
      659.25, 587.33, 523.25, 0, 392.00, 0, 523.25, 0,
      587.33, 0, 587.33, 659.25, 587.33, 0, 440.00, 0,
      523.25, 0, 523.25, 659.25, 523.25, 0, 392.00, 0,
      440.00, 0, 493.88, 0, 523.25, 659.25, 783.99, 0,
      880.00, 783.99, 659.25, 587.33, 523.25, 0, 0, 0
    ];

    const bassNotes = [
      261.63, 261.63, 329.63, 329.63, 392.00, 392.00, 329.63, 329.63,
      220.00, 220.00, 196.00, 196.00, 220.00, 220.00, 246.94, 246.94,
      261.63, 261.63, 329.63, 329.63, 392.00, 392.00, 329.63, 329.63,
      220.00, 220.00, 261.63, 261.63, 196.00, 196.00, 261.63, 261.63,
      293.66, 293.66, 293.66, 293.66, 220.00, 220.00, 220.00, 220.00,
      261.63, 261.63, 261.63, 261.63, 196.00, 196.00, 196.00, 196.00,
      220.00, 220.00, 246.94, 246.94, 261.63, 261.63, 329.63, 329.63,
      392.00, 392.00, 293.66, 293.66, 261.63, 261.63, 261.63, 261.63
    ];

    const stepDuration = 125; // ms per 16th note (~120 bpm)
    this.currentNoteIndex = 0;

    this.bgmInterval = window.setInterval(() => {
      if (!this.musicEnabled || !this.ctx) return;

      const now = this.ctx.currentTime;
      const leadFreq = notes[this.currentNoteIndex];
      const bassFreq = bassNotes[this.currentNoteIndex];

      // Play Lead
      if (leadFreq > 0) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(leadFreq, now);

        gain.gain.setValueAtTime(0.04, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.11);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.11);
      }

      // Play Bass
      if (bassFreq > 0 && this.currentNoteIndex % 2 === 0) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(bassFreq, now);

        gain.gain.setValueAtTime(0.06, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.22);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.22);
      }

      this.currentNoteIndex = (this.currentNoteIndex + 1) % notes.length;
    }, stepDuration);
  }

  public stopBGM() {
    if (this.bgmInterval !== null) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }
}

export const soundManager = new SoundManager();
