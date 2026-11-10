// lib/sound.ts
// Web Audio API sound synthesizer & Custom MP3 Audio Player for Next.js

class WebAudioSoundController {
  private ctx: AudioContext | null = null;
  private bgmPlaying = false;
  private bgmInterval: any = null;
  private isMuted = false;
  private customAudio: HTMLAudioElement | null = null;
  private isCustomPlaying = false;

  private initCtx() {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Windows Warning Dialog chime
  playWindowsAlert() {
    const ctx = this.initCtx();
    if (!ctx || this.isMuted) return;
    try {
      const now = ctx.currentTime;
      [440, 880].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);
        gain.gain.setValueAtTime(0.2, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.25);
      });
    } catch (e) {
      console.warn(e);
    }
  }

  // Sound: Dodging Button Whoosh / Boing
  playDodge() {
    const ctx = this.initCtx();
    if (!ctx || this.isMuted) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(850, now + 0.12);
      osc.frequency.exponentialRampToValueAtTime(420, now + 0.22);

      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.22);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.22);
    } catch (e) {
      console.warn(e);
    }
  }

  // Sound: Error / Wrong Beep
  playErrorBeep() {
    const ctx = this.initCtx();
    if (!ctx || this.isMuted) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(70, ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch (e) {
      console.warn(e);
    }
  }

  // Sound: Dramatic Alarm Siren
  playAlarm(pitch = 580) {
    const ctx = this.initCtx();
    if (!ctx || this.isMuted) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(pitch, now);
      osc.frequency.linearRampToValueAtTime(pitch + 160, now + 0.15);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    } catch (e) {
      console.warn(e);
    }
  }

  // Sound: Heartbeat Thump
  playHeartbeat() {
    const ctx = this.initCtx();
    if (!ctx || this.isMuted) return;
    try {
      const playThump = (time: number, freq: number, duration: number) => {
        if (!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, time);
        osc.frequency.exponentialRampToValueAtTime(25, time + duration);

        gain.gain.setValueAtTime(0.4, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(time);
        osc.stop(time + duration);
      };

      const now = ctx.currentTime;
      playThump(now, 75, 0.18);
      playThump(now + 0.22, 65, 0.22);
    } catch (e) {
      console.warn(e);
    }
  }

  // Sound: Romantic Chime Sparkle
  playRomanticChime() {
    const ctx = this.initCtx();
    if (!ctx || this.isMuted) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
      const now = ctx.currentTime;
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0.18, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.7);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.7);
      });
    } catch (e) {
      console.warn(e);
    }
  }

  // Sound: Voucher / Stamp
  playClaimSound() {
    const ctx = this.initCtx();
    if (!ctx || this.isMuted) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.15);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    } catch (e) {
      console.warn(e);
    }
  }

  // Play Music: Plays Custom MP3 if available, otherwise falls back to Music Box Synthesizer
  playMusic(customUrl?: string) {
    if (this.isMuted) return;

    if (customUrl) {
      try {
        if (this.customAudio) {
          this.customAudio.pause();
          this.customAudio = null;
        }

        const audio = new Audio(customUrl);
        audio.loop = true;
        audio.volume = 0.6;

        audio.addEventListener('error', () => {
          // If custom MP3 fails to load or 404, fall back to synthesizer
          this.isCustomPlaying = false;
          this.startRomanticBGM();
        });

        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              this.customAudio = audio;
              this.isCustomPlaying = true;
              this.stopRomanticBGM();
            })
            .catch(() => {
              // Autoplay blocked or file not found -> fall back to synthesizer
              this.isCustomPlaying = false;
              this.startRomanticBGM();
            });
        }
        return;
      } catch (e) {
        console.warn('Error loading custom audio, falling back to synth', e);
      }
    }

    // Default: play synthesized acoustic BGM
    this.startRomanticBGM();
  }

  // Stop all music (both custom MP3 and synthesizer)
  stopMusic() {
    if (this.customAudio) {
      this.customAudio.pause();
      this.customAudio = null;
    }
    this.isCustomPlaying = false;
    this.stopRomanticBGM();
  }

  // Romantic Music Box BGM Synthesizer (Zero asset dependency fallback)
  startRomanticBGM() {
    if (this.bgmPlaying || this.isCustomPlaying) return;
    const ctx = this.initCtx();
    if (!ctx) return;
    this.bgmPlaying = true;

    const chordProgressions = [
      [261.63, 329.63, 392.00, 523.25], // C
      [196.00, 246.94, 293.66, 392.00], // G
      [220.00, 261.63, 329.63, 440.00], // Am
      [174.61, 218.27, 261.63, 349.23], // F
      [164.81, 196.00, 246.94, 329.63], // Em
      [174.61, 261.63, 349.23, 440.00], // F
      [196.00, 293.66, 392.00, 493.88], // G
      [261.63, 329.63, 392.00, 523.25], // C
    ];

    let chordIndex = 0;
    let noteIndex = 0;

    const playNextNote = () => {
      if (!this.bgmPlaying || this.isMuted || !this.ctx) return;
      try {
        const chord = chordProgressions[chordIndex];
        const freq = chord[noteIndex % chord.length];

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        const now = this.ctx.currentTime;
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.07, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.5);

        if (noteIndex === 0 && Math.random() > 0.4) {
          const bellOsc = this.ctx.createOscillator();
          const bellGain = this.ctx.createGain();
          bellOsc.type = 'triangle';
          bellOsc.frequency.setValueAtTime(freq * 2, now);
          bellGain.gain.setValueAtTime(0.025, now);
          bellGain.gain.exponentialRampToValueAtTime(0.0005, now + 0.8);
          bellOsc.connect(bellGain);
          bellGain.connect(this.ctx.destination);
          bellOsc.start(now);
          bellOsc.stop(now + 0.8);
        }

        noteIndex++;
        if (noteIndex >= chord.length) {
          noteIndex = 0;
          chordIndex = (chordIndex + 1) % chordProgressions.length;
        }
      } catch (e) {
        console.warn(e);
      }
    };

    this.bgmInterval = setInterval(playNextNote, 250);
  }

  stopRomanticBGM() {
    this.bgmPlaying = false;
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.customAudio) {
      this.customAudio.muted = this.isMuted;
    }
    return this.isMuted;
  }

  getIsMuted() {
    return this.isMuted;
  }

  getIsCustomPlaying() {
    return this.isCustomPlaying;
  }
}

export const soundCtrl = new WebAudioSoundController();
