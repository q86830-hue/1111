
class AudioController {
  private ctx: AudioContext | null = null;
  private enabled: boolean = true;

  private initContext() {
    if (!this.ctx) {
      const Ctor = (window.AudioContext || (window as any).webkitAudioContext);
      if (Ctor) {
        this.ctx = new Ctor();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  playTone(freq: number, type: OscillatorType, duration: number, startTime: number = 0) {
    const ctx = this.initContext();
    if (!ctx) return;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime + startTime);
    
    gain.gain.setValueAtTime(0.1, ctx.currentTime + startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + startTime + duration);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(ctx.currentTime + startTime);
    osc.stop(ctx.currentTime + startTime + duration);
  }

  playClick() {
    this.playTone(800, 'sine', 0.05);
  }

  playCorrect() {
    this.playTone(523.25, 'sine', 0.2, 0);
    this.playTone(659.25, 'sine', 0.2, 0.1);
    this.playTone(783.99, 'sine', 0.4, 0.2);
  }

  playWrong() {
    this.playTone(150, 'sawtooth', 0.3);
    this.playTone(130, 'sawtooth', 0.3, 0.1);
  }

  playWin() {
    const now = 0;
    this.playTone(523.25, 'square', 0.1, now);
    this.playTone(523.25, 'square', 0.1, now + 0.1);
    this.playTone(523.25, 'square', 0.1, now + 0.2);
    this.playTone(783.99, 'square', 0.6, now + 0.3);
  }

  playTimeUp() {
    this.playTone(400, 'sawtooth', 0.2, 0);
    this.playTone(300, 'sawtooth', 0.4, 0.2);
  }
}

export const audio = new AudioController();
