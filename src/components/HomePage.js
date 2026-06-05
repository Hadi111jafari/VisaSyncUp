import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&family=Vazirmatn:wght@300;400;500;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --teal: #00B8C8;
    --teal-dark: #007A8A;
    --teal-mid: #00979F;
    --teal-light: #E0F7FA;
    --teal-glass: rgba(0,184,200,0.12);
    --white: #ffffff;
    --off-white: #F5FEFF;
    --text-dark: #0D3B42;
    --text-mid: #1A6370;
    --accent-red: #FF4D4D;
    --accent-gold: #FFB830;
  }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--off-white);
    color: var(--text-dark);
    overflow-x: hidden;
  }

  .hp-root {
    min-height: 100vh;
    position: relative;
  }
  [dir="rtl"] .hp-root {
    font-family: 'Vazirmatn', sans-serif;
  }

  /* ─── NAV ─── */
  .hp-nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 24px;
    padding: 0 40px;
    height: 72px;
    background: rgba(255,255,255,0.93);
    backdrop-filter: blur(18px);
    border-bottom: 1px solid rgba(0,184,200,0.15);
    transition: box-shadow 0.3s, transform 0.3s;
  }
  .hp-nav.scrolled {
    box-shadow: 0 14px 40px rgba(15, 23, 42, 0.08);
    transform: translateY(-1px);
  }

  .hp-logo {
    display: flex;
    align-items: center;
    gap: 12px;
    font-family: 'Sora', sans-serif;
    color: var(--text-dark);
  }
  .hp-logo-text {
    display: flex;
    align-items: center;
    gap: 4px;
    font-weight: 800;
    font-size: 1.1rem;
    letter-spacing: -0.5px;
  }
  .hp-logo-text span {
    color: var(--teal-dark);
  }
  [dir="rtl"] .hp-logo,
  [dir="rtl"] .hp-logo-text {
    font-family: 'Vazirmatn', sans-serif;
    letter-spacing: 0;
  }
  .hp-logo-icon {
    width: 38px; height: 38px;
    background: linear-gradient(135deg, var(--teal), var(--teal-dark));
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    color: white;
    font-size: 1.15rem;
    box-shadow: 0 6px 18px rgba(0,184,200,0.28);
  }

  .hp-nav-links {
    display: flex;
    gap: 24px;
    justify-content: center;
    align-items: center;
  }
  .hp-nav-links a {
    color: var(--text-dark);
    text-decoration: none;
    font-size: 0.95rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    transition: color 0.2s ease, transform 0.2s ease;
    white-space: nowrap;
    position: relative;
  }
  .hp-nav-links a:hover {
    color: var(--teal-dark);
    transform: translateY(-1px);
  }
  .hp-nav-links a::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -4px;
    height: 2px;
    width: 0;
    background: var(--teal);
    transition: width 0.2s ease;
  }
  .hp-nav-links a:hover::after {
    width: 100%;
  }

  .hp-nav-toggle {
    display: none;
    border: none;
    background: transparent;
    cursor: pointer;
    padding: 8px;
    width: 42px;
    height: 42px;
    align-items: center;
    justify-content: center;
  }
  .hp-nav-toggle span {
    display: block;
    width: 24px;
    height: 2px;
    margin: 4px auto;
    background: var(--text-dark);
    border-radius: 999px;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }
  .hp-nav-toggle.open span:nth-child(1) {
    transform: translateY(7px) rotate(45deg);
  }
  .hp-nav-toggle.open span:nth-child(2) {
    opacity: 0;
  }
  .hp-nav-toggle.open span:nth-child(3) {
    transform: translateY(-7px) rotate(-45deg);
  }

  .hp-nav-actions { display: flex; gap: 12px; align-items: center; }
  .hp-lang-switch { display: flex; gap: 4px; align-items: center; }

  @media(max-width: 980px) {
    .hp-nav {
      grid-template-columns: auto auto;
      padding: 0 20px;
      gap: 12px;
    }
    .hp-nav-links {
      display: none;
    }
    .hp-nav-links.open {
      display: flex;
      position: absolute;
      top: 72px;
      left: 0;
      right: 0;
      flex-direction: column;
      gap: 16px;
      padding: 22px 24px 24px;
      background: rgba(255,255,255,0.98);
      border-bottom: 1px solid rgba(0,184,200,0.15);
      box-shadow: 0 18px 40px rgba(15,23,42,0.08);
      backdrop-filter: blur(16px);
      z-index: 90;
    }
    .hp-nav-toggle {
      display: flex;
    }
    .hp-nav-actions {
      gap: 10px;
      align-items: center;
    }
    .hp-nav-links a {
      padding: 10px 0;
      font-size: 1rem;
      width: 100%;
    }
    .btn-ghost,
    .btn-primary {
      padding: 8px 14px;
      font-size: 0.88rem;
    }
  }

  @media(max-width: 680px) {
    .hp-nav {
      height: auto;
      padding: 12px 18px;
      gap: 10px;
    }
    .hp-nav-actions {
      flex-wrap: wrap;
      justify-content: flex-end;
    }
  }
  .hp-lang-switch button {
    padding: 4px 10px;
    border: 1.5px solid var(--teal);
    background: transparent;
    color: var(--teal-dark);
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.78rem;
    font-weight: 700;
    font-family: inherit;
    transition: all 0.2s;
  }
  .hp-lang-switch button:hover { background: var(--teal-light); }
  .hp-lang-switch button.active {
    background: linear-gradient(135deg, var(--teal), var(--teal-dark));
    color: white;
    border-color: transparent;
  }

  .btn-ghost {
    padding: 8px 20px;
    border: 1.5px solid var(--teal);
    border-radius: 10px;
    background: transparent;
    color: var(--teal-dark);
    font-family: inherit;
    font-weight: 500;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s;
  }
  .btn-ghost:hover { background: var(--teal-light); }
  .btn-primary {
    padding: 8px 22px;
    border: none;
    border-radius: 10px;
    background: linear-gradient(135deg, var(--teal), var(--teal-dark));
    color: white;
    font-family: inherit;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 4px 14px rgba(0,184,200,0.4);
  }
  .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(0,184,200,0.5); }

  /* ─── HERO ─── */
  .hp-hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 100px 24px 60px;
    overflow: hidden;
    text-align: center;
  }

  .hp-hero-bg {
    position: absolute; inset: 0;
    background: linear-gradient(160deg, #E8FAFC 0%, #C5F0F5 40%, #A0E8EF 70%, #7DDDE6 100%);
    z-index: 0;
  }
  .hp-hero-blob1 {
    position: absolute; width: 600px; height: 600px; border-radius: 50%;
    background: radial-gradient(circle, rgba(0,184,200,0.2) 0%, transparent 70%);
    top: -100px; left: -100px; z-index: 1;
    animation: blobPulse 7s ease-in-out infinite alternate;
  }
  .hp-hero-blob2 {
    position: absolute; width: 500px; height: 500px; border-radius: 50%;
    background: radial-gradient(circle, rgba(0,122,138,0.15) 0%, transparent 70%);
    bottom: -80px; right: -80px; z-index: 1;
    animation: blobPulse 9s ease-in-out infinite alternate-reverse;
  }
  .hp-hero-grid {
    position: absolute; inset: 0; z-index: 1;
    background-image: 
      linear-gradient(rgba(0,184,200,0.07) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,184,200,0.07) 1px, transparent 1px);
    background-size: 48px 48px;
  }
  @keyframes blobPulse { from { transform: scale(1) rotate(0deg); } to { transform: scale(1.15) rotate(10deg); } }

  .hp-hero-content { position: relative; z-index: 2; max-width: 720px; }

  .hp-badge {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 5px 14px;
    background: rgba(255,255,255,0.7);
    border: 1px solid rgba(0,184,200,0.3);
    border-radius: 100px;
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--teal-dark);
    letter-spacing: 0.5px;
    text-transform: uppercase;
    margin-bottom: 24px;
    backdrop-filter: blur(8px);
  }
  [dir="rtl"] .hp-badge {
    letter-spacing: 0;
    text-transform: none;
  }
  .hp-badge-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--accent-red);
    animation: pulse 1.5s ease-in-out infinite;
  }
  @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.4)} }

  .hp-hero h1 {
    font-family: 'Sora', sans-serif;
    font-size: clamp(2.2rem, 5vw, 3.6rem);
    font-weight: 800;
    line-height: 1.1;
    color: var(--text-dark);
    letter-spacing: -1.5px;
    margin-bottom: 20px;
  }
  [dir="rtl"] .hp-hero h1 {
    font-family: 'Vazirmatn', sans-serif;
    letter-spacing: 0;
    line-height: 1.3;
  }
  .hp-hero h1 .hl {
    background: linear-gradient(135deg, var(--teal), var(--teal-dark));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hp-hero-sub {
    font-size: 1.08rem;
    color: var(--text-mid);
    line-height: 1.7;
    max-width: 560px;
    margin: 0 auto 36px;
    font-weight: 400;
  }
  [dir="rtl"] .hp-hero-sub {
    line-height: 1.9;
  }

  .hp-hero-cta { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
  .btn-hero-primary {
    padding: 14px 32px;
    background: linear-gradient(135deg, var(--teal), var(--teal-dark));
    color: white;
    border: none;
    border-radius: 14px;
    font-family: inherit;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 8px 24px rgba(0,184,200,0.4);
    transition: all 0.25s;
  }
  .btn-hero-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(0,184,200,0.5); }
  .btn-hero-secondary {
    padding: 14px 28px;
    background: rgba(255,255,255,0.8);
    color: var(--teal-dark);
    border: 1.5px solid rgba(0,184,200,0.4);
    border-radius: 14px;
    font-family: inherit;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    backdrop-filter: blur(8px);
    transition: all 0.25s;
  }
  .btn-hero-secondary:hover { background: white; border-color: var(--teal); }

  /* ─── STATUS TICKER ─── */
  .hp-status-bar {
    position: relative; z-index: 2;
    margin-top: 52px;
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(255,255,255,0.7);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(0,184,200,0.2);
    border-radius: 100px;
    padding: 10px 20px;
    font-size: 0.82rem;
    color: var(--text-mid);
    font-weight: 500;
  }
  .status-indicator { width:8px;height:8px;border-radius:50%;background:#22C55E;animation:pulse 2s ease-in-out infinite; }
  .status-sep { color: rgba(0,184,200,0.3); margin: 0 4px; }

  /* ─── STATS ─── */
  .hp-stats {
    display: flex;
    justify-content: center;
    gap: 0;
    flex-wrap: wrap;
    margin: 0;
    padding: 0 24px;
    position: relative; z-index: 10;
  }
  .hp-stats-inner {
    display: flex;
    background: white;
    border-radius: 20px;
    box-shadow: 0 8px 48px rgba(0,120,140,0.12);
    border: 1px solid rgba(0,184,200,0.15);
    overflow: hidden;
    max-width: 860px;
    width: 100%;
    transform: translateY(-30px);
  }
  .hp-stat {
    flex: 1;
    padding: 28px 20px;
    text-align: center;
    border-inline-end: 1px solid rgba(0,184,200,0.1);
    transition: background 0.2s;
  }
  .hp-stat:last-child { border-inline-end: none; }
  .hp-stat:hover { background: var(--teal-light); }
  .hp-stat-num {
    font-family: 'Sora', sans-serif;
    font-size: 1.9rem;
    font-weight: 800;
    color: var(--teal-dark);
    letter-spacing: -1px;
    line-height: 1;
  }
  [dir="rtl"] .hp-stat-num {
    font-family: 'Vazirmatn', sans-serif;
    letter-spacing: 0;
  }
  .hp-stat-label { font-size: 0.78rem; color: var(--text-mid); font-weight: 500; margin-top: 4px; }

  /* ─── FEATURES ─── */
  .hp-section {
    padding: 60px 24px 80px;
    max-width: 1100px;
    margin: 0 auto;
  }
  .hp-section-label {
    font-size: 0.78rem; font-weight: 700; letter-spacing: 2px;
    text-transform: uppercase; color: var(--teal); margin-bottom: 10px;
    display: flex; align-items: center; gap: 8px;
  }
  .hp-section-label::before { content:''; display:block; width:24px; height:2px; background:var(--teal); border-radius:2px; }
  [dir="rtl"] .hp-section-label {
    letter-spacing: 0;
    text-transform: none;
  }
  .hp-section-title {
    font-family: 'Sora', sans-serif;
    font-size: clamp(1.6rem, 3vw, 2.4rem);
    font-weight: 800; letter-spacing: -1px;
    color: var(--text-dark); margin-bottom: 12px; line-height: 1.15;
  }
  [dir="rtl"] .hp-section-title {
    font-family: 'Vazirmatn', sans-serif;
    letter-spacing: 0;
    line-height: 1.3;
  }
  .hp-section-sub { font-size: 1rem; color: var(--text-mid); max-width: 520px; line-height: 1.7; margin-bottom: 48px; }
  [dir="rtl"] .hp-section-sub {
    line-height: 1.9;
  }

  .hp-features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
  }
  .hp-feature-card {
    background: white;
    border: 1px solid rgba(0,184,200,0.12);
    border-radius: 20px;
    padding: 28px;
    transition: all 0.25s;
    position: relative;
    overflow: hidden;
  }
  [dir="rtl"] .hp-feature-card {
    text-align: right;
  }
  .hp-feature-card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, var(--teal), var(--teal-dark));
    transform: scaleX(0); transform-origin: inline-start;
    transition: transform 0.3s;
  }
  .hp-feature-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,184,200,0.14); }
  .hp-feature-card:hover::before { transform: scaleX(1); }

  .hp-feature-icon {
    width: 48px; height: 48px; border-radius: 14px;
    background: var(--teal-light);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.4rem; margin-bottom: 18px;
    transition: background 0.2s;
  }
  .hp-feature-card:hover .hp-feature-icon { background: linear-gradient(135deg, var(--teal-light), #B2EFF4); }

  .hp-feature-card h3 {
    font-family: 'Sora', sans-serif;
    font-size: 1.05rem; font-weight: 700;
    color: var(--text-dark); margin-bottom: 8px;
  }
  [dir="rtl"] .hp-feature-card h3 {
    font-family: 'Vazirmatn', sans-serif;
  }
  .hp-feature-card p { font-size: 0.88rem; color: var(--text-mid); line-height: 1.65; }
  [dir="rtl"] .hp-feature-card p {
    line-height: 1.8;
  }

  /* ─── HOW IT WORKS ─── */
  .hp-how { background: linear-gradient(160deg, #E8FAFC 0%, #CCF2F5 100%); padding: 80px 24px; }
  .hp-how-inner { max-width: 1000px; margin: 0 auto; }
  .hp-steps { display: flex; flex-direction: column; gap: 0; position: relative; }
  .hp-step {
    display: flex; align-items: flex-start; gap: 28px;
    padding: 28px 0;
    border-bottom: 1px dashed rgba(0,184,200,0.25);
    position: relative;
  }
  [dir="rtl"] .hp-step {
    text-align: right;
  }
  .hp-step:last-child { border-bottom: none; }
  .hp-step-num {
    flex-shrink: 0;
    width: 48px; height: 48px; border-radius: 50%;
    background: linear-gradient(135deg, var(--teal), var(--teal-dark));
    color: white; font-family: 'Sora', sans-serif; font-weight: 800; font-size: 1rem;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 4px 16px rgba(0,184,200,0.4);
  }
  [dir="rtl"] .hp-step-num {
    font-family: 'Vazirmatn', sans-serif;
  }
  .hp-step-body h4 {
    font-family: 'Sora', sans-serif; font-size: 1.05rem; font-weight: 700;
    color: var(--text-dark); margin-bottom: 6px;
  }
  [dir="rtl"] .hp-step-body h4 {
    font-family: 'Vazirmatn', sans-serif;
  }
  .hp-step-body p { font-size: 0.88rem; color: var(--text-mid); line-height: 1.65; max-width: 520px; }
  [dir="rtl"] .hp-step-body p {
    line-height: 1.8;
  }

  /* ─── MONITOR PANEL ─── */
  .hp-monitor {
    max-width: 1100px; margin: 0 auto;
    padding: 80px 24px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    align-items: center;
  }
  @media(max-width:768px) { .hp-monitor { grid-template-columns: 1fr; } }

  .hp-monitor-visual {
    background: var(--text-dark);
    border-radius: 20px;
    padding: 24px;
    font-family: 'DM Mono', 'Courier New', monospace;
    font-size: 0.78rem;
    line-height: 1.8;
    box-shadow: 0 20px 60px rgba(0,60,80,0.2);
    position: relative;
    overflow: hidden;
    direction: ltr;
  }
  .hp-monitor-visual::before {
    content: '● ● ●';
    color: rgba(255,255,255,0.25);
    font-size: 0.7rem;
    display: block;
    margin-bottom: 14px;
    letter-spacing: 4px;
  }
  .log-line { margin: 2px 0; }
  .log-green { color: #4ADE80; }
  .log-teal { color: #67E8F9; }
  .log-yellow { color: #FDE68A; }
  .log-dim { color: rgba(255,255,255,0.35); }
  .log-white { color: rgba(255,255,255,0.85); }
  .log-cursor { display: inline-block; width: 8px; height: 1em; background: var(--teal); animation: blink 1s step-end infinite; vertical-align: middle; margin-left: 2px; }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

  /* ─── CTA BANNER ─── */
  .hp-cta-banner {
    margin: 0 24px 80px;
    max-width: 1052px;
    margin-left: auto; margin-right: auto;
    background: linear-gradient(135deg, var(--teal-dark) 0%, var(--teal) 60%, #00D4E8 100%);
    border-radius: 24px;
    padding: 56px 48px;
    text-align: center;
    position: relative; overflow: hidden;
    box-shadow: 0 16px 56px rgba(0,184,200,0.35);
  }
  .hp-cta-banner::before {
    content: '';
    position: absolute; top: -60px; right: -60px;
    width: 300px; height: 300px; border-radius: 50%;
    background: rgba(255,255,255,0.07);
  }
  .hp-cta-banner::after {
    content: '';
    position: absolute; bottom: -40px; left: -40px;
    width: 200px; height: 200px; border-radius: 50%;
    background: rgba(255,255,255,0.05);
  }
  .hp-cta-banner h2 {
    font-family: 'Sora', sans-serif; font-size: clamp(1.5rem, 3vw, 2rem);
    font-weight: 800; color: white; letter-spacing: -0.5px; margin-bottom: 12px; position: relative; z-index: 1;
  }
  [dir="rtl"] .hp-cta-banner h2 {
    font-family: 'Vazirmatn', sans-serif;
    letter-spacing: 0;
  }
  .hp-cta-banner p { color: rgba(255,255,255,0.8); font-size: 1rem; margin-bottom: 28px; position: relative; z-index: 1; }
  .btn-cta-white {
    padding: 14px 36px;
    background: white;
    color: var(--teal-dark);
    border: none; border-radius: 14px;
    font-family: inherit; font-weight: 700; font-size: 1rem;
    cursor: pointer; position: relative; z-index: 1;
    transition: all 0.25s;
    box-shadow: 0 4px 20px rgba(0,0,0,0.12);
  }
  .btn-cta-white:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(0,0,0,0.18); }

  /* ─── FOOTER ─── */
  .hp-footer {
    background: var(--text-dark);
    color: rgba(255,255,255,0.5);
    text-align: center;
    padding: 28px 24px;
    font-size: 0.8rem;
  }
  .hp-footer a { color: var(--teal); text-decoration: none; }

  /* ─── ANIMATIONS ─── */
  .fade-up { opacity: 0; transform: translateY(24px); transition: opacity 0.6s, transform 0.6s; }
  .fade-up.visible { opacity: 1; transform: translateY(0); }
  .delay-1 { transition-delay: 0.1s; }
  .delay-2 { transition-delay: 0.2s; }
  .delay-3 { transition-delay: 0.3s; }
  .delay-4 { transition-delay: 0.4s; }
  .delay-5 { transition-delay: 0.5s; }
`;

const FEATURES = [
  { icon: "🤖", key: "autoRegistration" },
  { icon: "📡", key: "monitoring" },
  { icon: "🔔", key: "notifications" },
  { icon: "📋", key: "vault" },
  { icon: "📊", key: "tracker" },
  { icon: "🔄", key: "retry" },
];

const STEPS = [
  { key: "step1" },
  { key: "step2" },
  { key: "step3" },
  { key: "step4" },
];

const LOG_LINES = [
  { cls: "log-dim", text: "── eVisa Traveller Monitor v2.1 ──" },
  { cls: "log-green", text: "[12:34:02] ✓ Ping mfa.ir → 204ms OK" },
  { cls: "log-teal", text: "[12:34:07] ↻ Checking slot availability..." },
  { cls: "log-dim", text: "[12:34:08]   → No slots found (attempt 847)" },
  { cls: "log-green", text: "[12:34:12] ✓ Ping mfa.ir → 198ms OK" },
  { cls: "log-teal", text: "[12:34:17] ↻ Checking slot availability..." },
  { cls: "log-yellow", text: "[12:34:18] ★ SLOT DETECTED — Tourist 30-day" },
  { cls: "log-white", text: "[12:34:18] ▶ Initiating auto-submit sequence" },
  { cls: "log-green", text: "[12:34:19] ✓ Form pre-filled from vault" },
  {
    cls: "log-green",
    text: "[12:34:21] ✓ Application submitted #IRN-2026-04821",
  },
  { cls: "log-yellow", text: "[12:34:21] ✉ Notification sent to user" },
  { cls: "log-dim", text: "   Awaiting confirmation..." },
];

export default function HomePage({ onSignIn, onSignUp }) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "fa";
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
  }, [isRTL, i18n.language]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.15 },
    );
    document
      .querySelectorAll(".fade-up")
      .forEach((el) => observerRef.current.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
  };

  const monitorFeatures =
    t("homepage.monitor.features", { returnObjects: true }) || [];

  return (
    <>
      <style>{styles}</style>
      <div className="hp-root" dir={isRTL ? "rtl" : "ltr"}>
        {/* ── NAV ── */}
        <>
          {/* Backdrop */}
          <div
            className={`fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm transition-opacity duration-200 lg:hidden ${
              mobileMenuOpen
                ? "pointer-events-auto opacity-100"
                : "pointer-events-none opacity-0"
            }`}
            onClick={() => setMobileMenuOpen(false)}
          />

          <nav
            className={`fixed left-4 right-4 top-4 z-50
      rounded-2xl border border-cyan-100
      bg-white/90 shadow-lg
      backdrop-blur-xl transition-all duration-300
      ${scrolled ? "shadow-xl" : ""}
    `}
          >
            <div className="flex h-16 items-center justify-between px-4 lg:px-8">
              {/* Logo */}
              <button
                className="text-xl font-bold tracking-tight"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Visa<span className="text-cyan-600">Sync</span>
              </button>

              {/* Desktop Navigation */}
              <div className="hidden items-center gap-8 lg:flex">
                <a
                  href="#features"
                  className="font-medium text-slate-700 transition hover:text-cyan-600"
                >
                  {t("homepage.nav.features")}
                </a>

                <a
                  href="#steps"
                  className="font-medium text-slate-700 transition hover:text-cyan-600"
                >
                  {t("homepage.nav.howItWorks")}
                </a>

                <a
                  href="#monitor"
                  className="font-medium text-slate-700 transition hover:text-cyan-600"
                >
                  {t("homepage.nav.monitor")}
                </a>

                <a
                  href="#cta"
                  className="font-medium text-slate-700 transition hover:text-cyan-600"
                >
                  {t("homepage.nav.getStarted")}
                </a>
              </div>

              {/* Desktop Actions */}
              <div className="hidden items-center gap-3 lg:flex">
                <div className="flex items-center gap-2">
                  <button
                    className={`rounded-lg border px-3 py-1.5 text-sm font-semibold transition ${
                      i18n.language === "en"
                        ? "border-cyan-600 bg-cyan-600 text-white"
                        : "border-cyan-300 text-cyan-700"
                    }`}
                    onClick={() => changeLang("en")}
                  >
                    EN
                  </button>

                  <button
                    className={`rounded-lg border px-3 py-1.5 text-sm font-semibold transition ${
                      i18n.language === "fa"
                        ? "border-cyan-600 bg-cyan-600 text-white"
                        : "border-cyan-300 text-cyan-700"
                    }`}
                    onClick={() => changeLang("fa")}
                  >
                    FA
                  </button>
                </div>

                <button
                  onClick={onSignIn}
                  className="rounded-xl border border-cyan-300 px-4 py-2 text-cyan-700 transition hover:bg-cyan-50"
                >
                  {t("Login")}
                </button>

                <button
                  onClick={onSignUp}
                  className="rounded-xl bg-cyan-600 px-5 py-2 text-white shadow-md transition hover:bg-cyan-700"
                >
                  {t("Sign Up")}
                </button>
              </div>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex flex-col justify-center gap-1.5 p-2 lg:hidden"
                aria-label="Menu"
              >
                <span
                  className={`block h-0.5 w-6 rounded-full bg-slate-800 transition-all duration-300 ${
                    mobileMenuOpen ? "translate-y-2 rotate-45" : ""
                  }`}
                />

                <span
                  className={`block h-0.5 w-6 rounded-full bg-slate-800 transition-all duration-300 ${
                    mobileMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />

                <span
                  className={`block h-0.5 w-6 rounded-full bg-slate-800 transition-all duration-300 ${
                    mobileMenuOpen ? "-translate-y-2 -rotate-45" : ""
                  }`}
                />
              </button>
            </div>

            {/* Mobile Menu */}
            <div
              className={`overflow-hidden transition-all duration-300 lg:hidden ${
                mobileMenuOpen
                  ? "max-h-[500px] border-t border-cyan-100"
                  : "max-h-0"
              }`}
            >
              <div className="space-y-2 p-4">
                <a
                  href="#features"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-xl bg-cyan-50 px-4 py-3 font-medium"
                >
                  {t("homepage.nav.features")}
                </a>

                <a
                  href="#steps"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-xl bg-cyan-50 px-4 py-3 font-medium"
                >
                  {t("homepage.nav.howItWorks")}
                </a>

                <a
                  href="#monitor"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-xl bg-cyan-50 px-4 py-3 font-medium"
                >
                  {t("homepage.nav.monitor")}
                </a>

                <a
                  href="#cta"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-xl bg-cyan-50 px-4 py-3 font-medium"
                >
                  {t("homepage.nav.getStarted")}
                </a>

                <div className="border-t border-slate-200 pt-3">
                  <div className="mb-3 flex gap-2">
                    <button
                      onClick={() => changeLang("en")}
                      className={`flex-1 rounded-xl py-2 font-medium ${
                        i18n.language === "en"
                          ? "bg-cyan-600 text-white"
                          : "bg-cyan-50"
                      }`}
                    >
                      EN
                    </button>

                    <button
                      onClick={() => changeLang("fa")}
                      className={`flex-1 rounded-xl py-2 font-medium ${
                        i18n.language === "fa"
                          ? "bg-cyan-600 text-white"
                          : "bg-cyan-50"
                      }`}
                    >
                      FA
                    </button>
                  </div>

                  <button
                    onClick={onSignIn}
                    className="mb-2 w-full rounded-xl border border-cyan-300 py-3 text-cyan-700"
                  >
                    {t("Login")}
                  </button>

                  <button
                    onClick={onSignUp}
                    className="w-full rounded-xl bg-cyan-600 py-3 text-white shadow-md"
                  >
                    {t("Sign Up")}
                  </button>
                </div>
              </div>
            </div>
          </nav>
        </>

        {/* ── HERO ── */}
        <section className="hp-hero">
          <div className="hp-hero-bg" />
          <div className="hp-hero-blob1" />
          <div className="hp-hero-blob2" />
          <div className="hp-hero-grid" />

          <div className="hp-hero-content">
            <div className="hp-badge">
              <span className="hp-badge-dot" />
              {t("homepage.hero.badge")}
            </div>
            <h1
              dangerouslySetInnerHTML={{ __html: t("homepage.hero.title") }}
            />
            <p className="hp-hero-sub">{t("homepage.hero.subtitle")}</p>
            <div className="hp-hero-cta">
              <button className="btn-hero-primary" onClick={onSignUp}>
                {t("homepage.hero.ctaPrimary")}
              </button>
              <button className="btn-hero-secondary" onClick={onSignIn}>
                {t("homepage.hero.ctaSecondary")}
              </button>
            </div>
          </div>

          <div className="hp-status-bar">
            <span className="status-indicator" />
            <strong style={{ color: "#155e69" }}>
              {t("homepage.hero.statusOnline")}
            </strong>
            <span className="status-sep">|</span>
            {t("homepage.hero.lastChecked", { seconds: 3 })}
            <span className="status-sep">|</span>
            {t("homepage.hero.checksToday", { count: 847 })}
          </div>
        </section>

        {/* ── STATS ── */}
        <div className="hp-stats">
          <div className="hp-stats-inner">
            {[
              { key: "monitoring" },
              { key: "speed" },
              { key: "applications" },
              { key: "uptime" },
            ].map((s, i) => (
              <div
                className="hp-stat fade-up"
                key={i}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="hp-stat-num">
                  {t(`homepage.stats.${s.key}`)}
                </div>
                <div className="hp-stat-label">
                  {t(`homepage.stats.${s.key}Label`)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── FEATURES ── */}
        <section className="hp-section" id="features">
          <div className="hp-section-label fade-up">
            {t("homepage.features.label")}
          </div>
          <h2
            className="hp-section-title fade-up delay-1"
            dangerouslySetInnerHTML={{ __html: t("homepage.features.title") }}
          />
          <p className="hp-section-sub fade-up delay-2">
            {t("homepage.features.subtitle")}
          </p>
          <div className="hp-features-grid">
            {FEATURES.map((f, i) => (
              <div
                className={`hp-feature-card fade-up delay-${(i % 5) + 1}`}
                key={i}
              >
                <div className="hp-feature-icon">{f.icon}</div>
                <h3>{t(`homepage.features.${f.key}.title`)}</h3>
                <p>{t(`homepage.features.${f.key}.desc`)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <div className="hp-how" id="steps">
          <div className="hp-how-inner">
            <div className="hp-section-label fade-up">
              {t("homepage.steps.label")}
            </div>
            <h2
              className="hp-section-title fade-up delay-1"
              dangerouslySetInnerHTML={{ __html: t("homepage.steps.title") }}
            />
            <p className="hp-section-sub fade-up delay-2">
              {t("homepage.steps.subtitle")}
            </p>
            <div className="hp-steps">
              {STEPS.map((s, i) => (
                <div className={`hp-step fade-up delay-${i + 1}`} key={i}>
                  <div className="hp-step-num">
                    {t(`homepage.steps.${s.key}.num`)}
                  </div>
                  <div className="hp-step-body">
                    <h4>{t(`homepage.steps.${s.key}.title`)}</h4>
                    <p>{t(`homepage.steps.${s.key}.desc`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── MONITOR PANEL ── */}
        <div className="hp-monitor" id="monitor">
          <div className="fade-up">
            <div className="hp-section-label">
              {t("homepage.monitor.label")}
            </div>
            <h2 className="hp-section-title" style={{ marginBottom: 12 }}>
              {t("homepage.monitor.title")}
            </h2>
            <p
              style={{
                color: "var(--text-mid)",
                lineHeight: 1.7,
                marginBottom: 24,
                fontSize: "0.95rem",
              }}
            >
              {t("homepage.monitor.desc")}
            </p>
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              {monitorFeatures.map((item, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    fontSize: "0.9rem",
                    color: "var(--text-mid)",
                    fontWeight: 500,
                  }}
                >
                  <span
                    style={{
                      color: "var(--teal)",
                      fontWeight: 700,
                      fontSize: "1rem",
                    }}
                  >
                    ✓
                  </span>{" "}
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="hp-monitor-visual fade-up delay-2">
            {LOG_LINES.map((l, i) => (
              <div className={`log-line ${l.cls}`} key={i}>
                {l.text}
              </div>
            ))}
            <div className="log-line log-dim">
              [12:34:22] <span className="log-cursor" />
            </div>
          </div>
        </div>

        {/* ── CTA BANNER ── */}
        <div style={{ padding: "0 24px 80px" }} id="cta">
          <div className="hp-cta-banner fade-up">
            <h2>{t("homepage.cta.title")}</h2>
            <p>{t("homepage.cta.subtitle")}</p>
            <button className="btn-cta-white" onClick={onSignUp}>
              {t("homepage.cta.button")}
            </button>
          </div>
        </div>

        {/* ── FOOTER ── */}
        <footer className="hp-footer">
          <p>
            {t("homepage.footer.copyright")}{" "}
            <a
              href="https://evisatraveller.mfa.ir"
              target="_blank"
              rel="noreferrer"
            >
              evisatraveller.mfa.ir
            </a>
          </p>
          <p style={{ marginTop: 6 }}>{t("homepage.footer.disclaimer")}</p>
        </footer>
      </div>
    </>
  );
}
