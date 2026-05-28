/**
 * bg-anim.js — Editor Background Animation
 *
 * All motion uses compound sine waves with the golden ratio (PHI) as a
 * frequency multiplier so nothing ever exactly repeats or feels predictable.
 * No CSS keyframes — everything is driven by requestAnimationFrame.
 */
(function () {
  'use strict';

  const TAU = Math.PI * 2;
  const PHI = 1.6180339887; // Golden ratio — two sines at ratio PHI never beat

  class EditorBackground {
    constructor() {
      this.canvas = document.getElementById('bg-canvas');
      if (!this.canvas) return;
      this.ctx  = this.canvas.getContext('2d');
      this.W    = 0;
      this.H    = 0;
      this.paused = false;

      this.resize();
      this.buildScene();

      window.addEventListener('resize', () => this.resize());

      // Pause animation when tab is hidden (saves battery)
      document.addEventListener('visibilitychange', () => {
        if (!document.hidden && this.paused) {
          this.paused = false;
          requestAnimationFrame(t => this.frame(t));
        }
        this.paused = document.hidden;
      });

      requestAnimationFrame(t => this.frame(t));
    }

    // ─── SETUP ───────────────────────────────────────────────────────────────

    resize() {
      // DPR support so it's crisp on retina, capped at 2x for perf
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.W = window.innerWidth;
      this.H = window.innerHeight;
      this.canvas.width  = this.W * dpr;
      this.canvas.height = this.H * dpr;
      this.canvas.style.width  = this.W + 'px';
      this.canvas.style.height = this.H + 'px';
      // setTransform resets then scales — safe to call on every resize
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    buildScene() {

      // ── 6 timeline tracks ─────────────────────────────────────────────────
      // 3 in top zone (card is middle ~40-60% vertically)
      // 3 in bottom zone
      const yFracs  = [0.07, 0.165, 0.265, 0.735, 0.835, 0.930];
      const colors  = ['pink', 'blue', 'amber', 'blue', 'amber', 'pink'];
      const heights = [6, 9, 12, 12, 9, 6]; // px — tallest in middle for depth

      this.tracks = yFracs.map((yf, ti) => {
        const nClips = 3 + (ti % 2); // alternates 3 and 4
        let xCur = 0.02 + ti * 0.055; // stagger starting position per track

        const clips = Array.from({ length: nClips }, (_, ci) => {
          // Clip width varies via PHI — no two clips the same, no uniform grid
          const w = 0.088 + ((ci * PHI * 0.054) % 0.088);

          const clip = {
            bx:   Math.min(xCur, 0.94 - w), // base X (fraction of W)
            w,                               // width (fraction of W)

            // Two oscillation components — second frequency is 1/PHI slower
            // This ensures the combined waveform never exactly repeats
            f1: 1 / (10400 + ti * 2300 + ci * 3700),
            f2: 1 / ((10400 + ti * 2300 + ci * 3700) * PHI),
            p1: ti * 1.13 + ci * 2.37,  // phase offsets spread motion across scene
            p2: ti * 2.29 + ci * 1.11,
            a1: 0.052, // amplitude as fraction of W
            a2: 0.021,

            // Left & right trim are completely independent oscillators
            // using max(0, sin) → only trims, never overshoots; holds at full extend
            ltf: 1 / (8600 + ci * 2900 + ti * 1600),
            ltp: ti * 0.91 + ci * 3.17,
            rtf: 1 / (12200 + ci * 2400 + ti * 1300),
            rtp: ti * 1.88 + ci * 1.63,
            ltMax: 0.38, // max left-trim (fraction of clip width)
            rtMax: 0.32,
          };

          xCur += w + 0.032 + ((ci * PHI * 0.019) % 0.019);
          return clip;
        });

        return { yf, h: heights[ti], color: colors[ti], clips };
      });

      // ── 3D keyframe diamonds ──────────────────────────────────────────────
      // Placed at edges (left/right of where card sits) and near tracks
      const dPos = [
        // Left edge — where card doesn't cover
        [0.028, 0.44], [0.055, 0.54], [0.040, 0.36], [0.016, 0.63],
        // Right edge
        [0.972, 0.46], [0.945, 0.56], [0.960, 0.38], [0.984, 0.64],
        // Along top tracks (scattered across full width)
        [0.13,  0.11], [0.37,  0.21], [0.61,  0.10], [0.84,  0.20],
        // Along bottom tracks
        [0.16,  0.89], [0.43,  0.78], [0.66,  0.90], [0.87,  0.79],
      ];

      this.diamonds = dPos.map(([xf, yf], i) => ({
        xf, yf,
        size: 5.0 + (i * 1.38) % 6.5,      // 5–11.5 px
        rf:   1 / (3100 + (i * 790) % 4600), // rotation frequency
        rp:   i * 0.421,                     // rotation phase — spreads them out
        ff:   1 / (4700 + (i * 1070) % 5200),// float frequency
        fp:   i * 0.719,
        fa:   0.010 + (i * 0.0028) % 0.009, // float amplitude (fraction of H)
        op:   0.11  + (i * 0.036)  % 0.11,  // base opacity
        color: ['pink', 'blue', 'amber', 'white'][i % 4],
      }));

      // ── Subliminal tool hints ─────────────────────────────────────────────
      // Very faint text that fades in/out over long cycles — ~3-5% opacity max
      // Positioned at far left/right where the card won't cover them
      this.hints = [
        { g: 'Pr', xf: 0.060, yf: 0.49, T: 16000, ph: 0.00 }, // Premiere Pro
        { g: 'Ae', xf: 0.940, yf: 0.51, T: 19500, ph: 2.14 }, // After Effects
        { g: 'Bl', xf: 0.054, yf: 0.57, T: 24000, ph: 4.28 }, // Blender
        { g: '✦',  xf: 0.946, yf: 0.43, T: 15500, ph: 1.07 }, // Gemini
        { g: '⌇',  xf: 0.058, yf: 0.41, T: 28000, ph: 3.21 }, // Claude
      ];
    }

    // ─── HELPERS ─────────────────────────────────────────────────────────────

    isDark() {
      return document.body.classList.contains('dark-mode');
    }

    // Color getter — adapts to current theme
    col(key, a) {
      const d = this.isDark();
      return ({
        pink:  d ? `rgba(255, 98,162,${a})` : `rgba(200,35,105,${a})`,
        blue:  d ? `rgba( 70,150,255,${a})` : `rgba( 28,100,200,${a})`,
        amber: d ? `rgba(255,174,  0,${a})` : `rgba(185,125,  0,${a})`,
        white: d ? `rgba(255,255,255,${a})` : `rgba( 55, 55, 80,${a})`,
      })[key];
    }

    // Rounded rectangle path — safe for any size
    rr(x, y, w, h, r) {
      r = Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2);
      const c = this.ctx;
      c.beginPath();
      c.moveTo(x + r, y);
      c.arcTo(x + w, y,     x + w, y + h, r);
      c.arcTo(x + w, y + h, x,     y + h, r);
      c.arcTo(x,     y + h, x,     y,     r);
      c.arcTo(x,     y,     x + w, y,     r);
      c.closePath();
    }

    // ─── DRAW CALLS ──────────────────────────────────────────────────────────

    drawTracks(t) {
      const c = this.ctx;
      const d = this.isDark();

      for (const tk of this.tracks) {
        const y  = tk.yf * this.H;
        const hh = tk.h * 0.5;

        // Track rail (subtle trough)
        c.fillStyle = d ? 'rgba(255,255,255,0.033)' : 'rgba(0,0,0,0.033)';
        this.rr(0, y - hh, this.W, tk.h, hh);
        c.fill();

        for (const cl of tk.clips) {

          // ── Clip position ── two-component oscillation
          const dx = (
            0.65 * Math.sin(TAU * t * cl.f1 + cl.p1) * cl.a1 +
            0.35 * Math.sin(TAU * t * cl.f2 + cl.p2) * cl.a2
          ) * this.W;

          const cx = cl.bx * this.W + dx;
          const cw = cl.w  * this.W;

          // ── Trim ── max(0, sin) → only positive arc
          // When sine is negative the clip is fully extended; feels like a
          // natural hold before the next trim event
          const lt = Math.max(0, Math.sin(TAU * t * cl.ltf + cl.ltp)) * cl.ltMax * cw;
          const rt = Math.max(0, Math.sin(TAU * t * cl.rtf + cl.rtp)) * cl.rtMax * cw;

          const L = cx + lt;
          const R = cx + cw - rt;
          if (L >= R) continue;

          // Clamp to viewport edges (clips naturally continue off-screen)
          const dL = Math.max(0,      L);
          const dR = Math.min(this.W, R);
          if (dL >= dR) continue;

          c.save();

          // Clip fill
          c.fillStyle = this.col(tk.color, 0.13);
          this.rr(dL, y - hh, dR - dL, tk.h, 3);
          c.fill();

          // Clip border
          c.strokeStyle = this.col(tk.color, 0.26);
          c.lineWidth   = 0.8;
          c.stroke();

          // Trim handles — bright vertical bars at in/out points
          // Only draw when they're inside the viewport
          c.lineWidth   = 1.5;
          c.strokeStyle = this.col(tk.color, 0.48);

          if (L > 2 && L < this.W - 2) {
            c.beginPath();
            c.moveTo(dL, y - hh);
            c.lineTo(dL, y + hh);
            c.stroke();
          }
          if (R > 2 && R < this.W - 2) {
            c.beginPath();
            c.moveTo(dR, y - hh);
            c.lineTo(dR, y + hh);
            c.stroke();
          }

          c.restore();
        }
      }
    }

    drawPlayhead(t) {
      const c = this.ctx;
      const d = this.isDark();

      // ── Three incommensurable periods ──
      // Their ratio is irrational so the playhead never returns to the same
      // position at the same phase — feels like watching a real editor scrub
      const raw =
        0.50 * Math.sin(TAU * t / 14300) +
        0.30 * Math.sin(TAU * t / 23700 + 0.93) +
        0.20 * Math.sin(TAU * t / 38900 + 1.86);

      // Map [-1, 1] to [14%, 86%] of viewport width
      const x  = this.W * (0.5 + raw * 0.36);

      // Span from first track to last
      const y0 = this.tracks[0].yf                      * this.H - 18;
      const y1 = this.tracks[this.tracks.length - 1].yf * this.H + 18;

      c.save();

      c.strokeStyle = d ? 'rgba(255,255,255,0.24)' : 'rgba(0,0,0,0.14)';
      c.lineWidth   = 1.2;
      c.beginPath();
      c.moveTo(x, y0);
      c.lineTo(x, y1);
      c.stroke();

      // Playhead head — small downward triangle
      c.fillStyle = d ? 'rgba(255,255,255,0.36)' : 'rgba(0,0,0,0.22)';
      c.beginPath();
      c.moveTo(x - 5, y0 - 7);
      c.lineTo(x + 5, y0 - 7);
      c.lineTo(x,     y0);
      c.closePath();
      c.fill();

      c.restore();
    }

    drawDiamonds(t) {
      const c = this.ctx;

      for (const d of this.diamonds) {
        const x  = d.xf * this.W;
        // Float: gentle vertical oscillation
        const fy = Math.sin(TAU * t * d.ff + d.fp) * d.fa * this.H;
        const y  = d.yf * this.H + fy;
        const s  = d.size;

        // Y-axis rotation in 3D
        // cosA gives the foreshortening of the horizontal extent
        const angle = TAU * t * d.rf + d.rp;
        const cosA  = Math.cos(angle);
        const hw    = s * Math.abs(cosA); // projected half-width
        const front = cosA >= 0;          // are we seeing the front face?

        c.save();

        // ── Diamond path ──
        c.beginPath();
        c.moveTo(x,      y - s); // top
        c.lineTo(x + hw, y);     // right
        c.lineTo(x,      y + s); // bottom
        c.lineTo(x - hw, y);     // left
        c.closePath();

        // Fill — front face is brighter, back face is dim
        c.fillStyle = this.col(d.color, front ? d.op * 0.65 : d.op * 0.18);
        c.fill();

        // Outline
        c.strokeStyle = this.col(d.color, d.op * 1.4);
        c.lineWidth   = 0.7;
        c.stroke();

        // ── Specular shine ──
        // A linear gradient that sweeps across the face as it rotates.
        // Only visible when front face has substantial area (cosA > 0.2)
        if (front && cosA > 0.20) {
          const sh = c.createLinearGradient(
            x - hw * 0.35, y - s * 0.55, // gradient start (top-left)
            x + hw * 0.45, y + s * 0.35  // gradient end (bottom-right)
          );
          const sa = cosA * d.op * 0.82; // shine intensity tied to rotation angle
          sh.addColorStop(0,    `rgba(255,255,255,${sa})`);
          sh.addColorStop(0.40, `rgba(255,255,255,${(sa * 0.18).toFixed(3)})`);
          sh.addColorStop(1,    `rgba(255,255,255,0)`);
          c.fillStyle = sh;
          c.fill();
        }

        c.restore();
      }
    }

    drawHints(t) {
      const c = this.ctx;
      const d = this.isDark();

      for (const h of this.hints) {
        // Long slow fade — each hint has its own period so they don't all
        // appear/disappear simultaneously
        const fade = (Math.sin(TAU * t / h.T + h.ph) + 1) * 0.5;
        const a    = fade * (d ? 0.052 : 0.040);
        if (a < 0.005) continue; // skip imperceptibly faint draws

        // Subtle drift so they don't feel pasted-on
        const xDr = Math.sin(TAU * t / (h.T * 1.41) + h.ph)      * 0.010 * this.W;
        const yDr = Math.sin(TAU * t / (h.T * 0.87) + h.ph + 1.0) * 0.008 * this.H;

        c.save();
        c.font         = `bold 15px -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif`;
        c.fillStyle    = d ? `rgba(255,255,255,${a})` : `rgba(0,0,0,${a})`;
        c.textAlign    = 'center';
        c.textBaseline = 'middle';
        c.fillText(h.g, h.xf * this.W + xDr, h.yf * this.H + yDr);
        c.restore();
      }
    }

    // ─── MAIN LOOP ────────────────────────────────────────────────────────────

    frame(t) {
      if (this.paused) return;
      const c = this.ctx;
      c.clearRect(0, 0, this.W, this.H);
      this.drawTracks(t);
      this.drawPlayhead(t);
      this.drawDiamonds(t);
      this.drawHints(t);
      requestAnimationFrame(nt => this.frame(nt));
    }
  }

  // Boot — works whether script loads sync or defer
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new EditorBackground());
  } else {
    new EditorBackground();
  }

})();
