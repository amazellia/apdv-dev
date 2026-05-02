import { useEffect, useRef, useCallback } from 'react';
import styles from '../styles/Home.module.scss';

interface StarFieldProps {
  title?: string;
  greeting?: string;
  subtitles?: string[];
}

interface Star {
  x: number; y: number;
  baseX: number; baseY: number;
  size: number;
  baseOpacity: number; opacity: number;
  twinkleSpeed: number; twinkleOffset: number;
  vx: number; vy: number;
}

interface Sparkle {
  x: number; y: number;
  vx: number; vy: number;
  life: number;  // 1 → 0
  size: number;
}

interface ShootingStar {
  x: number; y: number;
  vx: number; vy: number;
  speed: number;
  trail: number;
  opacity: number;
  sparkles: Sparkle[];
}

const INTERACTION_RADIUS = 120;
const PUSH_STRENGTH = 6;
const FRICTION = 0.82;
const RETURN_SPEED = 0.04;
const GLOW_RADIUS = 150;
const GRADIENT_COLORS = ['#ec5b9b', '#ac60ab', '#6a60a0', '#385880'];
const PINK = '#ec5b9b';

// Shooting stars
const SS_DEFLECT_RADIUS = 90;
const SS_SPAWN_MIN = 3500; // ms
const SS_SPAWN_MAX = 7000; // ms

// Subtitle timing (ms)
const IN_DUR   = 600;
const HOLD_DUR = 2400;
const OUT_DUR  = 450;
const FLY_PX   = 72; // horizontal slide distance

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInCubic  = (t: number) => t * t * t;

const EXO2_URL = 'https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400&display=swap';

export default function StarField({
  title = 'AmanDA patrICIa VIraY',
  greeting = "[ hello world - my name is ]",
  subtitles = [
    '[ creative technologist by day ]',
    '[ story and game gobbler by night ]',
    '[ touch grass by twilight ]',
  ],
}: StarFieldProps) {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const starsRef     = useRef<Star[]>([]);
  const mouseRef     = useRef({ x: -9999, y: -9999 });
  const rafRef       = useRef<number>(0);
  const titleFontRef = useRef<string>('sans-serif');
  const exo2Ref      = useRef(false);

  const subRef          = useRef({ lineIndex: 0, phase: 'in' as 'in' | 'hold' | 'out', phaseStart: -1 });
  const shootingStars   = useRef<ShootingStar[]>([]);
  const lastSpawnRef    = useRef(-1);
  const nextSpawnDelay  = useRef(SS_SPAWN_MIN);

  const buildStars = useCallback((w: number, h: number) => {
    const count = Math.max(80, Math.min(Math.floor((w * h) / 7000), 280));
    starsRef.current = Array.from({ length: count }, () => {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const baseOpacity = 0.25 + Math.random() * 0.75;
      return {
        x, y, baseX: x, baseY: y,
        size: 0.4 + Math.random() * 2.2,
        baseOpacity, opacity: baseOpacity,
        twinkleSpeed: 0.4 + Math.random() * 1.8,
        twinkleOffset: Math.random() * Math.PI * 2,
        vx: 0, vy: 0,
      };
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cssFont = getComputedStyle(canvas).getPropertyValue('--sunroll-font').trim();
    titleFontRef.current = cssFont || 'sans-serif';

    // Load Exo 2 via Google Fonts <link> — reliable cross-browser approach
    if (!document.querySelector(`link[href="${EXO2_URL}"]`)) {
      const link = Object.assign(document.createElement('link'), {
        rel: 'stylesheet', href: EXO2_URL,
      });
      link.onload = () => document.fonts.ready.then(() => { exo2Ref.current = true; });
      document.head.appendChild(link);
    } else {
      document.fonts.ready.then(() => { exo2Ref.current = true; });
    }

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      buildStars(canvas.width, canvas.height);
      subRef.current = { lineIndex: 0, phase: 'in', phaseStart: -1 };
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement ?? canvas);

    const tick = (t: number) => {
      const { width: w, height: h } = canvas;
      ctx.clearRect(0, 0, w, h);
      const { x: mx, y: my } = mouseRef.current;

      // ── Stars ──
      for (const s of starsRef.current) {
        const dx = s.x - mx, dy = s.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < INTERACTION_RADIUS && dist > 0) {
          const force = ((INTERACTION_RADIUS - dist) / INTERACTION_RADIUS) ** 2;
          s.vx += (dx / dist) * force * PUSH_STRENGTH;
          s.vy += (dy / dist) * force * PUSH_STRENGTH;
        }
        s.vx *= FRICTION; s.vy *= FRICTION;
        s.x += s.vx + (s.baseX - s.x) * RETURN_SPEED;
        s.y += s.vy + (s.baseY - s.y) * RETURN_SPEED;
        const tw = Math.sin(t * 0.001 * s.twinkleSpeed + s.twinkleOffset);
        s.opacity = s.baseOpacity * (0.55 + 0.45 * tw);
        const gd = Math.sqrt((s.x - mx) ** 2 + (s.y - my) ** 2);
        const gt = gd < GLOW_RADIUS ? 1 - gd / GLOW_RADIUS : 0;
        const alpha = Math.min(1, s.opacity + gt * 0.6);
        const r     = s.size * (1 + gt * 1.2);
        ctx.beginPath();
        ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.fill();
        if (gt > 0.05) {
          const hr = r * 5;
          const g  = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, hr);
          g.addColorStop(0, `rgba(190,160,255,${gt * 0.35})`);
          g.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.beginPath(); ctx.arc(s.x, s.y, hr, 0, Math.PI * 2);
          ctx.fillStyle = g; ctx.fill();
        }
      }

      // ── Shooting stars ──
      if (lastSpawnRef.current < 0) lastSpawnRef.current = t;

      if (t - lastSpawnRef.current > nextSpawnDelay.current) {
        lastSpawnRef.current = t;
        nextSpawnDelay.current = SS_SPAWN_MIN + Math.random() * (SS_SPAWN_MAX - SS_SPAWN_MIN);

        // Spawn from a random edge, direction aimed generally across the canvas
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.2 + Math.random() * 1.4;
        const edge  = Math.floor(Math.random() * 4);
        const sx = edge === 1 ? w + 10 : edge === 3 ? -10 : Math.random() * w;
        const sy = edge === 0 ? -10   : edge === 2 ? h + 10 : Math.random() * h;
        shootingStars.current.push({
          x: sx, y: sy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          speed,
          trail: 70 + Math.random() * 80,
          opacity: 0,
          sparkles: [],
        });
      }

      for (let i = shootingStars.current.length - 1; i >= 0; i--) {
        const sh = shootingStars.current[i];

        // Hover deflection — redirect trajectory away from cursor
        const dxm = sh.x - mx, dym = sh.y - my;
        const dm  = Math.sqrt(dxm * dxm + dym * dym);
        if (dm < SS_DEFLECT_RADIUS && dm > 0) {
          const force = (1 - dm / SS_DEFLECT_RADIUS) * 0.5;
          sh.vx += (dxm / dm) * force;
          sh.vy += (dym / dm) * force;
          const spd = Math.sqrt(sh.vx * sh.vx + sh.vy * sh.vy);
          if (spd > 0) { sh.vx = (sh.vx / spd) * sh.speed; sh.vy = (sh.vy / spd) * sh.speed; }
        }

        sh.x += sh.vx;
        sh.y += sh.vy;

        // Remove once fully off-screen
        const margin = sh.trail + 20;
        if (sh.x < -margin || sh.x > w + margin || sh.y < -margin || sh.y > h + margin) {
          shootingStars.current.splice(i, 1);
          continue;
        }

        // Fade in, fade out near edges
        sh.opacity = Math.min(sh.opacity + 0.04, 1);
        const edgeFade    = Math.min(1, Math.min(sh.x, w - sh.x, sh.y, h - sh.y) / 60);
        const finalOpacity = sh.opacity * Math.max(0, edgeFade);

        ctx.save();

        // ── Trail ──
        const nx = sh.vx / sh.speed, ny = sh.vy / sh.speed;
        const tx = sh.x - nx * sh.trail, ty = sh.y - ny * sh.trail;
        const grad = ctx.createLinearGradient(tx, ty, sh.x, sh.y);
        grad.addColorStop(0,   'rgba(255,255,255,0)');
        grad.addColorStop(0.6, `rgba(255,255,255,${finalOpacity * 0.25})`);
        grad.addColorStop(1,   `rgba(255,255,255,${finalOpacity * 0.7})`);
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(sh.x, sh.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth   = 1.2;
        ctx.stroke();

        // ── Glowing head ──
        // Outer soft halo
        const halo = ctx.createRadialGradient(sh.x, sh.y, 0, sh.x, sh.y, 10);
        halo.addColorStop(0,   `rgba(220,235,255,${finalOpacity * 0.9})`);
        halo.addColorStop(0.4, `rgba(180,210,255,${finalOpacity * 0.4})`);
        halo.addColorStop(1,   'rgba(180,210,255,0)');
        ctx.beginPath();
        ctx.arc(sh.x, sh.y, 10, 0, Math.PI * 2);
        ctx.fillStyle = halo;
        ctx.fill();
        // Bright core
        ctx.beginPath();
        ctx.arc(sh.x, sh.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${finalOpacity})`;
        ctx.fill();

        // ── Emit sparkles along trail ──
        if (finalOpacity > 0.1 && Math.random() < 0.7) {
          const perp = Math.atan2(sh.vy, sh.vx) + Math.PI / 2;
          const jitter = (Math.random() - 0.5) * 1.4;
          // Spawn anywhere along the rear 60% of the trail
          const t2 = 0.3 + Math.random() * 0.7;
          sh.sparkles.push({
            x:    sh.x - nx * sh.trail * t2,
            y:    sh.y - ny * sh.trail * t2,
            vx:   Math.cos(perp) * jitter + (Math.random() - 0.5) * 0.4,
            vy:   Math.sin(perp) * jitter + (Math.random() - 0.5) * 0.4,
            life: 0.7 + Math.random() * 0.5,
            size: 0.4 + Math.random() * 1.0,
          });
        }

        // ── Update & draw sparkles ──
        for (let j = sh.sparkles.length - 1; j >= 0; j--) {
          const sp = sh.sparkles[j];
          sp.life -= 0.028;
          if (sp.life <= 0) { sh.sparkles.splice(j, 1); continue; }
          sp.x += sp.vx;
          sp.y += sp.vy;
          sp.vx *= 0.92;
          sp.vy *= 0.92;
          const sa = sp.life * finalOpacity;
          // Tiny glow per sparkle
          const sg = ctx.createRadialGradient(sp.x, sp.y, 0, sp.x, sp.y, sp.size * 3);
          sg.addColorStop(0, `rgba(255,255,255,${sa})`);
          sg.addColorStop(1, 'rgba(255,255,255,0)');
          ctx.beginPath();
          ctx.arc(sp.x, sp.y, sp.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = sg;
          ctx.fill();
          // Core dot
          ctx.beginPath();
          ctx.arc(sp.x, sp.y, sp.size * 0.6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${sa})`;
          ctx.fill();
        }

        ctx.restore();
      }

      // ── Title + greeting ──
      const isMobile = w < 600;

      // Auto-fit title: start from viewport-relative size, shrink if text overflows
      let titleSize = Math.min(w * 0.075, 90);
      const subFont = exo2Ref.current ? "'Exo 2'" : 'monospace';
      ctx.font = `bold ${titleSize}px ${titleFontRef.current}`;
      const measured = ctx.measureText(title).width;
      if (measured > w * 0.88) titleSize = Math.floor(titleSize * (w * 0.88 / measured));
      titleSize = Math.max(isMobile ? 22 : 30, titleSize);

      // Subtitle/greeting size: proportional, tighter floor on mobile
      const subSize = Math.max(isMobile ? 9 : 11, Math.min(w * 0.022, 16));

      // Fly distance scales with screen width
      const flyPx = Math.min(FLY_PX, w * 0.17);

      const titleY = h * 0.44;
      const gap    = titleSize * 1.1 + (isMobile ? 14 : 20);
      const greetY = titleY - gap;

      // Greeting above title
      ctx.font         = `300 ${subSize}px ${subFont}`;
      ctx.textAlign    = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle    = 'rgba(240,232,248,0.85)';
      ctx.fillText(greeting, w / 2, greetY);

      // Title
      ctx.font = `bold ${titleSize}px ${titleFontRef.current}`;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      const cy = (Math.sin(t * 0.001 * (Math.PI / 3.5)) + 1) / 2;
      const gw = w * 2.5, xo = -w * 0.75 + cy * w * 1.5;
      const tg = ctx.createLinearGradient(xo, h * 0.35, xo + gw, h * 0.65);
      GRADIENT_COLORS.forEach((c, i) => tg.addColorStop(i / (GRADIENT_COLORS.length - 1), c));
      ctx.fillStyle = tg;
      ctx.fillText(title, w / 2, titleY);

      // ── Subtitle fly-in / hold / fly-out ──
      const ss = subRef.current;
      if (ss.phaseStart < 0) ss.phaseStart = t;

      const elapsed = t - ss.phaseStart;
      const dur = ss.phase === 'in' ? IN_DUR : ss.phase === 'hold' ? HOLD_DUR : OUT_DUR;

      if (elapsed >= dur) {
        if      (ss.phase === 'in')   ss.phase = 'hold';
        else if (ss.phase === 'hold') ss.phase = 'out';
        else {
          ss.lineIndex = (ss.lineIndex + 1) % subtitles.length;
          ss.phase = 'in';
        }
        ss.phaseStart = t;
      }

      const p = Math.min((t - ss.phaseStart) / dur, 1);
      let xOff  = 0;
      let alpha = 1;

      if (ss.phase === 'in') {
        xOff  = -flyPx * (1 - easeOutCubic(p));
        alpha = easeOutCubic(p);
      } else if (ss.phase === 'out') {
        xOff  = flyPx * easeInCubic(p);
        alpha = 1 - easeInCubic(p);
      }

      const subY = titleY + gap;

      // Clip so the sliding text doesn't overflow into adjacent regions
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, subY - subSize * 1.2, w, subSize * 2.4);
      ctx.clip();

      ctx.font         = `300 ${subSize}px ${subFont}`;
      ctx.textAlign    = 'center';
      ctx.textBaseline = 'middle';
      // Parse PINK to rgba with current alpha
      ctx.fillStyle    = `rgba(240,232,248,0.85)`;
      ctx.fillText(subtitles[ss.lineIndex], w / 2 + xOff, subY);

      ctx.restore();

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect(); };
  }, [buildStars, title, subtitles]);

  const updateMouse = useCallback((x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = { x: x - rect.left, y: y - rect.top };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={styles.starField}
      onMouseMove={e => updateMouse(e.clientX, e.clientY)}
      onMouseLeave={() => { mouseRef.current = { x: -9999, y: -9999 }; }}
      onTouchMove={e => { e.preventDefault(); updateMouse(e.touches[0].clientX, e.touches[0].clientY); }}
      onTouchEnd={() => { mouseRef.current = { x: -9999, y: -9999 }; }}
    />
  );
}
