
class AudioController {
  private ctx: AudioContext | null = null;
  private enabled: boolean = true;
  private initialized: boolean = false;
  private supported: boolean = true;

  private initContext() {
    if (this.initialized) {
      return this.ctx;
    }
    
    this.initialized = true;
    
    try {
      const Ctor = (window.AudioContext || (window as any).webkitAudioContext);
      if (!Ctor) {
        console.warn('AudioContext is not supported in this browser');
        this.supported = false;
        return null;
      }
      
      this.ctx = new Ctor();
      console.log('AudioContext initialized successfully');
    } catch (error) {
      console.error('Failed to initialize AudioContext:', error);
      this.supported = false;
      this.ctx = null;
    }
    
    return this.ctx;
  }

  private ensureContextResumed() {
    if (this.ctx && this.ctx.state === 'suspended') {
      try {
        this.ctx.resume();
      } catch (error) {
        console.error('Failed to resume AudioContext:', error);
      }
    }
  }

  playTone(freq: number, type: OscillatorType, duration: number, startTime: number = 0) {
    if (!this.enabled || !this.supported) return;
    
    try {
      const ctx = this.initContext();
      if (!ctx) return;
      
      this.ensureContextResumed();
      
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
    } catch (error) {
      console.error('Failed to play tone:', error);
      // 静默失败，不影响应用其他功能
    }
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

  // 添加启用/禁用音频的方法
  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  // 检查音频是否支持
  isSupported() {
    return this.supported;
  }
}

export const audio = new AudioController();

// 确保在用户交互时初始化音频上下文
// 这是为了遵守浏览器的自动播放政策
document.addEventListener('click', () => {
  audio.playClick();
}, { once: true });
document.addEventListener('touchstart', () => {
  audio.playClick();
}, { once: true });
