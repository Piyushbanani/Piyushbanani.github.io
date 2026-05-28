/**
 * bg-anim.js — PREMIUM EDITOR BACKGROUND v3
 *
 * Neon-glowing timeline tracks, 3-D keyframe diamonds with specular shine,
 * floating light particles, animated gradient mesh, compound-sine playhead,
 * track-hover glow interaction, and a custom OS-cursor replacement.
 *
 * All motion: compound sinusoids (golden-ratio frequency pairs) → never
 * repeats, always smooth, never linear.
 */
(function () {
  'use strict';

  const TAU = Math.PI * 2;
  const PHI = 1.6180339887;          // golden ratio — stops oscillations beating

  /* ─────────────────────────────────────────────────────────────────────── */
  class PremiumEditorBG {

    constructor () {
      this.canvas = document.getElementById('bg-canvas');
      if (!this.canvas) return;
      this.ctx    = this.canvas.getContext('2d');
      this.W = 0; this.H = 0;
      this.paused = false;
      this.mouse  = { x: -999, y: -999 };

      this.resize();
      this.buildScene();
      this.initMouse();

      window.addEventListener('resize', () => this.resize());
      document.addEventListener('visibilitychange', () => {
        if (!document.hidden && this.paused) {
          this.paused = false;
          requestAnimationFrame(t => this.frame(t));
        }
        this.paused = document.hidden;
      });

      requestAnimationFrame(t => this.frame(t));
    }

    /* ── Resize (DPR-aware) ──────────────────────────────────────────────── */
    resize () {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.W = window.innerWidth;
      this.H = window.innerHeight;
      this.canvas.width  = this.W * dpr;
      this.canvas.height = this.H * dpr;
      this.canvas.style.width  = this.W + 'px';
      this.canvas.style.height = this.H + 'px';
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    /* ── Custom cursor setup ─────────────────────────────────────────────── */
    initMouse () {
      if (!window.matchMedia('(pointer: fine)').matches) return;
      document.body.style.cursor = 'none';
      document.addEventListener('mousemove', e => {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
      });
      document.addEventListener('mouseleave', () => {
        this.mouse.x = -999;
        this.mouse.y = -999;
      });
    }

    /* ── Scene data ──────────────────────────────────────────────────────── */
    buildScene () {

      /* ── 6 timeline tracks ──────────────────────────────────────────── */
      // 3 in top zone, 3 in bottom zone framing the card.
      // Heights graduate inward (smaller at edges, tallest at center)
      // so the layout has visual depth.
      const yFracs  = [0.080, 0.178, 0.285,  0.715, 0.822, 0.920];
      const colors  = ['pink','blue','amber', 'amber','blue','pink'];
      const labels  = ['V3',  'V2',  'V1',   'A1',   'A2',  'A3' ];
      const heights = [ 14,    20,    28,      28,     20,    14  ];

      this.tracks = yFracs.map((yf, ti) => {
        const nClips = 3 + (ti % 2);
        let xCur = 0.035 + ti * 0.048;

        const clips = Array.from({ length: nClips }, (_, ci) => {
          const w = 0.088 + ((ci * PHI * 0.054) % 0.088);
          const clip = {
            bx: Math.min(xCur, 0.94 - w), w,
            // Two oscillation components — ratio = PHI so they never beat
            f1: 1 / (10400 + ti*2300 + ci*3700),
            f2: 1 / ((10400 + ti*2300 + ci*3700) * PHI),
            p1: ti*1.13 + ci*2.37,
            p2: ti*2.29 + ci*1.11,
            a1: 0.052, a2: 0.021,
            // Left/right trim — fully independent oscillators
            ltf: 1/(8600  + ci*2900 + ti*1600), ltp: ti*0.91 + ci*3.17,
            rtf: 1/(12200 + ci*2400 + ti*1300), rtp: ti*1.88 + ci*1.63,
            ltMax: 0.36, rtMax: 0.30,
          };
          xCur += w + 0.030 + ((ci * PHI * 0.018) % 0.018);
          return clip;
        });

        return { yf, h: heights[ti], color: colors[ti], label: labels[ti], clips };
      });

      /* ── 3-D keyframe diamonds ──────────────────────────────────────── */
      const dPos = [
        // Left edge (beside card)
        [0.025,0.44],[0.055,0.54],[0.038,0.36],[0.014,0.63],
        // Right edge
        [0.975,0.46],[0.945,0.56],[0.962,0.38],[0.986,0.64],
        // Near top tracks (full width)
        [0.12,0.11],[0.35,0.21],[0.60,0.10],[0.83,0.20],
        // Near bottom tracks
        [0.17,0.89],[0.44,0.78],[0.65,0.90],[0.88,0.79],
        // Extra accent diamonds
        [0.04,0.31],[0.96,0.30],[0.04,0.69],[0.96,0.70],
      ];

      this.diamonds = dPos.map(([xf,yf], i) => ({
        xf, yf,
        size:  6.0 + (i*1.38)%7.0,
        rf:    1/(3000+(i*790)%4800),  rp: i*0.421,
        ff:    1/(4500+(i*1070)%5400), fp: i*0.719,
        fa:    0.010+(i*0.0028)%0.009,
        op:    0.55+(i*0.030)%0.30,
        color: ['pink','blue','amber','cyan'][i%4],
      }));

      /* ── Floating light particles ────────────────────────────────────── */
      this.particles = Array.from({ length: 32 }, (_, i) => ({
        xf:    (i*PHI)%1.0,
        yf:    0.04+((i*PHI*0.618)%0.92),
        size:  0.7+(i*0.29)%2.3,
        color: ['pink','blue','amber','cyan'][i%4],
        ff:    1/(2700+i*510), fp: i*0.893,
        fa:    0.007+(i*0.0018)%0.013,
        op:    0.22+(i*0.028)%0.30,
        gr:    5+(i*0.7)%9,
      }));

      /* ── Background gradient orbs ────────────────────────────────────── */
      // 5 large drifting radial gradients that form the ambient colour wash.
      this.bgOrbs = [
        { ox:0.18,oy:0.22, ax1:0.13,fx1:1/22000,px1:0.0, ax2:0.05,fx2:1/14300,px2:1.1, ay:0.10,fy:1/17300,py:0.7,
          r:0.55, lc:[255,175,0,0.08], dc:[255,130,0,0.14] },
        { ox:0.82,oy:0.75, ax1:0.10,fx1:1/29000,px1:2.3, ax2:0.04,fx2:1/18700,px2:0.5, ay:0.09,fy:1/21400,py:1.5,
          r:0.50, lc:[30,130,255,0.08], dc:[20,95,255,0.15] },
        { ox:0.60,oy:0.40, ax1:0.08,fx1:1/34000,px1:3.7, ax2:0.03,fx2:1/23000,px2:5.1, ay:0.08,fy:1/26000,py:2.2,
          r:0.40, lc:[220,80,150,0.06], dc:[200,45,135,0.11] },
        { ox:0.25,oy:0.65, ax1:0.07,fx1:1/27000,px1:1.5, ax2:0.02,fx2:1/19000,px2:3.0, ay:0.07,fy:1/23000,py:0.8,
          r:0.36, lc:[0,200,185,0.05], dc:[0,185,165,0.09] },
        { ox:0.75,oy:0.20, ax1:0.07,fx1:1/31000,px1:4.2, ax2:0.03,fx2:1/21000,px2:2.3, ay:0.06,fy:1/28000,py:3.1,
          r:0.34, lc:[155,60,255,0.05], dc:[135,35,255,0.10] },
      ];

      /* ── Tool hint glyphs ────────────────────────────────────────────── */
      this.hints = [
        {g:'Pr', xf:0.060,yf:0.49,T:16000,ph:0.00},
        {g:'Ae', xf:0.940,yf:0.51,T:19500,ph:2.14},
        {g:'Bl', xf:0.054,yf:0.57,T:24000,ph:4.28},
        {g:'✦',  xf:0.946,yf:0.43,T:15500,ph:1.07},
        {g:'⌇',  xf:0.058,yf:0.41,T:28000,ph:3.21},
      ];
    }

    /* ─────────────────────────────────────────────────────────────────────
       COLOUR HELPERS
       ─────────────────────────────────────────────────────────────────── */
    isDark () { return document.body.classList.contains('dark-mode'); }

    // [R, G, B] for each palette key — slightly deeper in light mode
    rgb (key) {
      const d = this.isDark();
      return ({
        pink:  d?[255, 42,150]:[210, 20,115],
        blue:  d?[ 22,125,255]:[ 14, 90,210],
        amber: d?[255,158,  0]:[192,118,  0],
        cyan:  d?[  0,198,180]:[  0,158,140],
        white: d?[255,255,255]:[ 50, 50, 70],
      })[key];
    }

    // rgba() string shorthand
    col (key, a) {
      const [R,G,B] = this.rgb(key);
      return `rgba(${R},${G},${B},${a})`;
    }

    // rgb() shorthand (for shadowColor)
    rgbStr (key) {
      const [R,G,B] = this.rgb(key);
      return `rgb(${R},${G},${B})`;
    }

    /* ── Rounded-rect path helper ─────────────────────────────────────── */
    rr (x, y, w, h, r) {
      r = Math.min(r, Math.abs(w)/2, Math.abs(h)/2);
      const c = this.ctx;
      c.beginPath();
      c.moveTo(x+r, y);
      c.arcTo(x+w,y,   x+w,y+h, r);
      c.arcTo(x+w,y+h, x,  y+h, r);
      c.arcTo(x,  y+h, x,  y,   r);
      c.arcTo(x,  y,   x+r,y,   r);
      c.closePath();
    }

    /* ── Glowing rectangle — 3 draw passes for neon bloom effect ─────── */
    gRect (x, y, w, h, r, key, alpha, gm) {
      if (w < 1 || h < 1) return;
      const c = this.ctx;
      const sc = this.rgbStr(key);
      const [R,G,B] = this.rgb(key);

      c.save();

      // Pass 1 — wide bloom (large shadowBlur, low alpha)
      c.shadowColor = sc;
      c.shadowBlur  = 30 * gm;
      c.fillStyle   = `rgba(${R},${G},${B},${(alpha * 0.40 * gm).toFixed(3)})`;
      this.rr(x, y, w, h, r);
      c.fill();

      // Pass 2 — tight glow + main body
      c.shadowBlur  = 10 * gm;
      c.fillStyle   = `rgba(${R},${G},${B},${(alpha * 0.68).toFixed(3)})`;
      this.rr(x, y, w, h, r);
      c.fill();

      // Pass 3 — gloss highlight (no shadow)
      c.shadowBlur = 0;
      const hi = c.createLinearGradient(0, y, 0, y+h);
      hi.addColorStop(0,   `rgba(255,255,255,${(0.26*gm+0.04).toFixed(2)})`);
      hi.addColorStop(0.5, `rgba(255,255,255,0)`);
      c.fillStyle = hi;
      this.rr(x+1, y+1, Math.max(1,w-2), Math.max(1,h-2), Math.max(1,r));
      c.fill();

      c.shadowBlur = 0;
      c.restore();
    }

    /* ═════════════════════════════════════════════════════════════════════
       DRAW METHODS — called in z-order each frame
       ═════════════════════════════════════════════════════════════════ */

    /* ── 1. Animated gradient background ─────────────────────────────── */
    drawBackground (t) {
      const c = this.ctx;
      const d = this.isDark();

      // Solid base — matches CSS --bg-color so no flash on load
      c.fillStyle = d ? '#0c0c14' : '#f5f5f5';
      c.fillRect(0, 0, this.W, this.H);

      // Layer 5 drifting colour orbs
      for (const orb of this.bgOrbs) {
        const fx = (orb.ox
          + orb.ax1*Math.sin(TAU*t*orb.fx1+orb.px1)
          + orb.ax2*Math.sin(TAU*t*orb.fx2+orb.px2)
        ) * this.W;
        const oy  = orb.oy !== undefined ? orb.oy : 0.50;
        const fy  = (oy + orb.ay*Math.sin(TAU*t*orb.fy+orb.py)) * this.H;
        const fr  = orb.r * Math.max(this.W, this.H);
        const [R,G,B,A] = d ? orb.dc : orb.lc;

        const gr = c.createRadialGradient(fx,fy,0, fx,fy,fr);
        gr.addColorStop(0,   `rgba(${R},${G},${B},${A})`);
        gr.addColorStop(0.5, `rgba(${R},${G},${B},${(A*0.28).toFixed(3)})`);
        gr.addColorStop(1,   'rgba(0,0,0,0)');
        c.fillStyle = gr;
        c.fillRect(0, 0, this.W, this.H);
      }
    }

    /* ── 2. Floating particles (dark mode only) ───────────────────────── */
    drawParticles (t) {
      if (!this.isDark()) return;
      const c = this.ctx;

      for (const p of this.particles) {
        const fy = Math.sin(TAU*t*p.ff+p.fp)*p.fa*this.H;
        const x  = p.xf * this.W;
        const y  = p.yf * this.H + fy;

        c.save();
        c.shadowColor = this.rgbStr(p.color);
        c.shadowBlur  = p.gr;
        c.fillStyle   = this.col(p.color, p.op);
        c.beginPath();
        c.arc(x, y, p.size, 0, TAU);
        c.fill();
        c.shadowBlur = 0;
        c.restore();
      }
    }

    /* ── 3. Timeline tracks with glowing clips ────────────────────────── */
    drawTracks (t) {
      const c   = this.ctx;
      const d   = this.isDark();
      const gm  = d ? 1.0 : 0.20;   // glow intensity multiplier

      for (const tk of this.tracks) {
        const y   = tk.yf * this.H;
        const hh  = tk.h  * 0.5;
        const [R,G,B] = this.rgb(tk.color);
        const sc  = this.rgbStr(tk.color);

        /* Cursor hover proximity ────────────────────────────────────── */
        const dy   = Math.abs(this.mouse.y - y);
        const hZone = hh + 38;
        const hov  = Math.max(0, 1 - dy/hZone);   // 0→1
        const hb   = hov * 0.32;

        /* Track trough (rail) ──────────────────────────────────────── */
        const railA = d ? (0.07+hov*0.05) : (0.04+hov*0.03);
        c.fillStyle = `rgba(${R},${G},${B},${railA})`;
        this.rr(0, y-hh, this.W, tk.h, hh);
        c.fill();

        // Centre rule line — the thin "empty track" indicator
        c.fillStyle = `rgba(${R},${G},${B},${d?0.14:0.07})`;
        c.fillRect(0, y-0.5, this.W, 1);

        /* Track label (V1, A1 …) ────────────────────────────────────── */
        c.save();
        c.font         = `bold 9px "SF Mono","Fira Code",monospace`;
        c.fillStyle    = `rgba(${R},${G},${B},${0.30+hov*0.18})`;
        c.textAlign    = 'right';
        c.textBaseline = 'middle';
        c.fillText(tk.label, 28, y);
        c.restore();

        /* Cursor-position radial glow on track ─────────────────────── */
        if (hov > 0.02 && this.mouse.x > 0) {
          const gr = 60 + hov*35;
          const grd = c.createRadialGradient(this.mouse.x,y,0, this.mouse.x,y,gr);
          grd.addColorStop(0, `rgba(${R},${G},${B},${(hov*0.24*gm).toFixed(3)})`);
          grd.addColorStop(1, 'rgba(0,0,0,0)');
          c.fillStyle = grd;
          c.fillRect(this.mouse.x-gr, y-hh*2, gr*2, tk.h*4);
        }

        /* Clips ─────────────────────────────────────────────────────── */
        for (const cl of tk.clips) {

          // Animated X position — two-component sinusoid
          const dx = (
            0.65*Math.sin(TAU*t*cl.f1+cl.p1)*cl.a1 +
            0.35*Math.sin(TAU*t*cl.f2+cl.p2)*cl.a2
          ) * this.W;

          const cx = cl.bx * this.W + dx;
          const cw = cl.w  * this.W;

          // Trim: positive arc of sine only → natural hold-then-trim behaviour
          const lt = Math.max(0, Math.sin(TAU*t*cl.ltf+cl.ltp)) * cl.ltMax * cw;
          const rt = Math.max(0, Math.sin(TAU*t*cl.rtf+cl.rtp)) * cl.rtMax * cw;

          const L  = cx + lt;
          const R2 = cx + cw - rt;
          if (L >= R2) continue;

          const dL = Math.max(32, L);          // 32 px: space for track labels
          const dR = Math.min(this.W, R2);
          if (dL >= dR) continue;

          const dW = dR - dL;
          const cr = Math.min(5, hh*0.80);

          // ── Draw glowing clip body ─────────────────────────────── */
          this.gRect(dL, y-hh+1, dW, tk.h-2, cr, tk.color, 0.68+hb*0.22, gm);

          // ── Trim handles ───────────────────────────────────────── */
          const hAlpha = (0.88 + hb) * Math.max(0.25, gm);

          c.save();
          c.shadowColor = sc;
          c.shadowBlur  = 12 * gm;
          c.strokeStyle = `rgba(${R},${G},${B},${hAlpha})`;
          c.lineWidth   = 2.5;
          c.lineCap     = 'round';

          if (L > 34 && L < this.W-2) {
            c.beginPath(); c.moveTo(dL, y-hh); c.lineTo(dL, y+hh); c.stroke();
          }
          if (R2 > 34 && R2 < this.W-2) {
            c.beginPath(); c.moveTo(dR, y-hh); c.lineTo(dR, y+hh); c.stroke();
          }
          c.shadowBlur = 0;
          c.restore();
        }
      }
    }

    /* ── 4. Playhead — compound sine, 3 incommensurable frequencies ──── */
    drawPlayhead (t) {
      const c = this.ctx;
      const d = this.isDark();

      const raw =
        0.50*Math.sin(TAU*t/14300) +
        0.30*Math.sin(TAU*t/23700+0.93) +
        0.20*Math.sin(TAU*t/38900+1.86);
      const x = this.W*(0.5+raw*0.36);

      const y0 = this.tracks[0].yf                     *this.H - 28;
      const y1 = this.tracks[this.tracks.length-1].yf  *this.H + 28;

      // Playhead colour: white in dark mode, warm amber in light
      const [PR,PG,PB] = d ? [255,255,255] : [205,125,0];
      const gm = d ? 1.0 : 0.45;

      c.save();

      // Ambient vertical gradient glow strip
      const vGlow = c.createLinearGradient(x-8,0,x+8,0);
      vGlow.addColorStop(0,   'rgba(0,0,0,0)');
      vGlow.addColorStop(0.5, `rgba(${PR},${PG},${PB},${0.12*gm})`);
      vGlow.addColorStop(1,   'rgba(0,0,0,0)');
      c.fillStyle = vGlow;
      c.fillRect(x-8, y0, 16, y1-y0);

      // Outer glow line
      c.shadowColor = `rgba(${PR},${PG},${PB},0.90)`;
      c.shadowBlur  = 22*gm;
      c.strokeStyle = `rgba(${PR},${PG},${PB},${0.16*gm})`;
      c.lineWidth   = 6;
      c.beginPath(); c.moveTo(x,y0); c.lineTo(x,y1); c.stroke();

      // Core line
      c.shadowBlur  = 6*gm;
      c.strokeStyle = `rgba(${PR},${PG},${PB},0.75)`;
      c.lineWidth   = 1.5;
      c.beginPath(); c.moveTo(x,y0); c.lineTo(x,y1); c.stroke();

      // Head triangle (downward-pointing)
      c.shadowColor = `rgb(${PR},${PG},${PB})`;
      c.shadowBlur  = 14*gm;
      c.fillStyle   = `rgba(${PR},${PG},${PB},0.92)`;
      c.beginPath();
      c.moveTo(x-7, y0-12);
      c.lineTo(x+7, y0-12);
      c.lineTo(x,   y0);
      c.closePath();
      c.fill();

      c.shadowBlur = 0;
      c.restore();
    }

    /* ── 5. 3-D rotating keyframe diamonds ────────────────────────────── */
    drawDiamonds (t) {
      const c  = this.ctx;
      const d  = this.isDark();
      const gm = d ? 1.0 : 0.18;

      for (const dm of this.diamonds) {
        const x  = dm.xf * this.W;
        const fy = Math.sin(TAU*t*dm.ff+dm.fp)*dm.fa*this.H;
        const y  = dm.yf * this.H + fy;
        const s  = dm.size;

        // Y-axis rotation — cosA gives horizontal foreshortening
        const angle = TAU*t*dm.rf+dm.rp;
        const cosA  = Math.cos(angle);
        const hw    = s * Math.abs(cosA);
        const front = cosA >= 0;

        const [R,G,B] = this.rgb(dm.color);
        const sc      = this.rgbStr(dm.color);

        const drawPath = () => {
          c.beginPath();
          c.moveTo(x,    y-s);
          c.lineTo(x+hw, y);
          c.lineTo(x,    y+s);
          c.lineTo(x-hw, y);
          c.closePath();
        };

        c.save();

        // Pass 1 — wide bloom
        c.shadowColor = sc;
        c.shadowBlur  = 28*gm;
        c.fillStyle   = `rgba(${R},${G},${B},${(dm.op*0.18*gm).toFixed(3)})`;
        drawPath(); c.fill();

        // Pass 2 — core glow + fill
        c.shadowBlur  = 12*gm;
        c.fillStyle   = `rgba(${R},${G},${B},${(dm.op*(front?0.58:0.20)).toFixed(3)})`;
        drawPath(); c.fill();

        // Crisp outline
        c.shadowBlur  = 4*gm;
        c.strokeStyle = `rgba(${R},${G},${B},${(dm.op*1.25).toFixed(3)})`;
        c.lineWidth   = 0.9;
        drawPath(); c.stroke();

        c.shadowBlur = 0;

        // Specular shine — sweeps as diamond rotates
        if (front && cosA > 0.18) {
          const sa = cosA * dm.op * 0.88;
          const sh = c.createLinearGradient(
            x-hw*0.35, y-s*0.60,
            x+hw*0.50, y+s*0.42
          );
          sh.addColorStop(0,    `rgba(255,255,255,${sa.toFixed(3)})`);
          sh.addColorStop(0.42, `rgba(255,255,255,${(sa*0.17).toFixed(3)})`);
          sh.addColorStop(1,    'rgba(255,255,255,0)');
          c.fillStyle = sh;
          drawPath(); c.fill();
        }

        c.restore();
      }
    }

    /* ── 6. Subliminal tool-name glyphs ───────────────────────────────── */
    drawHints (t) {
      const c = this.ctx;
      const d = this.isDark();

      for (const h of this.hints) {
        const fade = (Math.sin(TAU*t/h.T+h.ph)+1)*0.5;
        const a    = fade*(d?0.055:0.040);
        if (a < 0.005) continue;

        const xd = Math.sin(TAU*t/(h.T*1.41)+h.ph)     *0.010*this.W;
        const yd = Math.sin(TAU*t/(h.T*0.87)+h.ph+1.0) *0.008*this.H;

        c.save();
        c.font         = `bold 15px -apple-system,BlinkMacSystemFont,sans-serif`;
        c.fillStyle    = d?`rgba(255,255,255,${a})`:`rgba(0,0,0,${a})`;
        c.textAlign    = 'center';
        c.textBaseline = 'middle';
        c.fillText(h.g, h.xf*this.W+xd, h.yf*this.H+yd);
        c.restore();
      }
    }

    /* ── 7. Custom OS-arrow cursor ────────────────────────────────────── */
    drawCursor (mx, my) {
      if (mx < -100 || my < -100) return;
      const c = this.ctx;
      const d = this.isDark();
      const s = 22;

      c.save();
      c.translate(Math.round(mx), Math.round(my));

      /*  Classic 7-vertex arrow with zig bottom:
       *   1:(0,0)            tip / hotspot
       *   2:(0, 0.82s)       left-edge bottom
       *   3:(0.27s, 0.63s)   1st zig — inner notch entry
       *   4:(0.41s, 0.97s)   2nd zig — tail bottom (deepest)
       *   5:(0.55s, 0.87s)   3rd zig — tail right side
       *   6:(0.37s, 0.57s)   4th zig — inner junction
       *   7:(0.62s, 0.57s)   right shoulder
       *   close → diagonal hypotenuse back to tip
       */
      c.beginPath();
      c.moveTo(0,         0        );
      c.lineTo(0,         s*0.82   );
      c.lineTo(s*0.27,    s*0.63   );
      c.lineTo(s*0.41,    s*0.97   );
      c.lineTo(s*0.55,    s*0.87   );
      c.lineTo(s*0.37,    s*0.57   );
      c.lineTo(s*0.62,    s*0.57   );
      c.closePath();

      c.fillStyle   = d?'rgba(255,255,255,0.10)':'rgba(10,10,25,0.11)';
      c.fill();

      c.strokeStyle = d?'rgba(255,255,255,0.60)':'rgba(20,20,40,0.54)';
      c.lineWidth   = 1.0;
      c.lineJoin    = 'round';
      c.lineCap     = 'round';
      c.stroke();

      // Hot-spot dot so click-point is obvious
      c.fillStyle = d?'rgba(255,255,255,0.72)':'rgba(20,20,40,0.68)';
      c.beginPath();
      c.arc(0,0,1.3,0,TAU);
      c.fill();

      c.restore();
    }

    /* ── Main animation loop ──────────────────────────────────────────── */
    frame (t) {
      if (this.paused) return;

      const c = this.ctx;
      c.clearRect(0,0,this.W,this.H);

      this.drawBackground(t);    // 1. gradient mesh (bottom)
      this.drawParticles(t);     // 2. floating light specks
      this.drawTracks(t);        // 3. timeline tracks + clips
      this.drawPlayhead(t);      // 4. glowing playhead
      this.drawDiamonds(t);      // 5. 3-D keyframe diamonds
      this.drawHints(t);         // 6. subliminal tool glyphs
      this.drawCursor(           // 7. custom cursor (top)
        this.mouse.x, this.mouse.y
      );

      requestAnimationFrame(nt => this.frame(nt));
    }
  } // end class

  /* ── Boot ─────────────────────────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new PremiumEditorBG());
  } else {
    new PremiumEditorBG();
  }

})();