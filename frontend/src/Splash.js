import { useState, useEffect} from "react";

/* ═══════════════════════════════════════════════════════════
   DESIGN TOKENS & GLOBAL STYLES
═══════════════════════════════════════════════════════════ */
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&family=Outfit:wght@300;400;500;600;700;800&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --void: #040609;
  --s0: #070b12;
  --s1: #0b1120;
  --s2: #101828;
  --s3: rgba(255,255,255,0.035);
  --b0: rgba(255,255,255,0.05);
  --b1: rgba(255,255,255,0.10);
  --b2: rgba(99,179,237,0.28);
  --t1: #eef4ff;
  --t2: #7b92b8;
  --t3: #3d4f6e;
  --cyan:    #00e5ff;
  --cyan-g:  rgba(0,229,255,0.15);
  --cyan-d:  rgba(0,229,255,0.06);
  --violet:  #b06aff;
  --violet-g:rgba(176,106,255,0.15);
  --neon:    #39ff14;
  --neon-g:  rgba(57,255,20,0.12);
  --sapphire:#3b82f6;
  --sap-g:   rgba(59,130,246,0.15);
  --amber:   #f59e0b;
  --amb-g:   rgba(245,158,11,0.13);
  --emerald: #10b981;
  --em-g:    rgba(16,185,129,0.13);
  --rose:    #f43f5e;
  --r-sm: 10px; --r-md: 16px; --r-lg: 22px; --r-xl: 30px;
  --f-display: 'Syne', sans-serif;
  --f-body: 'Outfit', sans-serif;
  --f-mono: 'Space Mono', monospace;
}

html { scroll-behavior: smooth; }
body {
  margin: 0;
  background: var(--void);
  font-family: var(--f-body);
  color: var(--t1);

  display: flex;
  justify-content: center;
  align-items: center;

  height: 100vh;
  overflow: hidden;  
}

/* ── Scrollbar ── */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(0,229,255,0.18); border-radius: 99px; }

/* ── Grain overlay ── */
.grain {
  position: fixed; inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
  pointer-events: none; z-index: 9999; opacity: 0.5;
}

/* ══════════════════════════════════════════
   SPLASH SCREEN
══════════════════════════════════════════ */
.splash {
  width: 100%;
  height: 100vh;   
  position: fixed; 
  inset: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  overflow: hidden;
  background: #040609;
}

.splash-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.splash-orb-1 {
  position: absolute; width: 700px; height: 700px;
  top: -250px; left: -200px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0,229,255,0.08) 0%, transparent 60%);
  filter: blur(60px); pointer-events: none;
  animation: orbFloat 14s ease-in-out infinite alternate;
}
.splash-orb-2 {
  position: absolute; width: 600px; height: 600px;
  bottom: -200px; right: -150px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(176,106,255,0.10) 0%, transparent 60%);
  filter: blur(70px); pointer-events: none;
  animation: orbFloat 18s ease-in-out infinite alternate-reverse;
}
.splash-orb-3 {
  position: absolute; width: 300px; height: 300px;
  top: 35%; left: 40%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(57,255,20,0.05) 0%, transparent 65%);
  filter: blur(50px); pointer-events: none;
}
@keyframes orbFloat {
  from { transform: translate(0,0) scale(1); }
  to { transform: translate(40px, 30px) scale(1.08); }
}

/* Hex ring decoration */
.splash-hex-ring {
  position: absolute;
  width: 520px; height: 520px;
  border-radius: 50%;
  border: 1px solid rgba(0,229,255,0.07);
  animation: spinSlow 40s linear infinite;
  pointer-events: none;
}
.splash-hex-ring::before {
  content: '';
  position: absolute; inset: 20px;
  border-radius: 50%;
  border: 1px dashed rgba(176,106,255,0.06);
}
@keyframes spinSlow { to { transform: rotate(360deg); } }

.splash-content {
  position: relative;
  z-index: 10;

  width: 100%;
  max-width: 390px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  min-height: 100vh;
  padding: 20px;
}

@keyframes splashIn {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}

.splash-badge {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 7px 18px;
  border-radius: 99px;
  border: 1px solid rgba(0,229,255,0.25);
  background: rgba(0,229,255,0.06);
  font-family: var(--f-mono);
  font-size: 11px; letter-spacing: 0.16em;
  color: var(--cyan);
  margin-bottom: 32px;
  backdrop-filter: blur(10px);
  margin-top: 40px;
}
.splash-badge-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--cyan);
  box-shadow: 0 0 8px var(--cyan);
  animation: blink 1.8s ease-in-out infinite;
}
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.2} }

.splash-title {
  font-family: var(--f-display);
  font-size: clamp(52px, 7vw, 88px);
  font-weight: 700;
  line-height: 1.0;
  letter-spacing: -0.04em;
  margin-bottom: 8px;
  align-items: center;
}
.splash-title-line1 {
  display: block;
  background: linear-gradient(120deg, #eef4ff 0%, #a5c8ff 50%, var(--cyan) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  align-items: center;
}
.splash-title-line2 {
  display: block;
  background: linear-gradient(120deg, var(--violet) 0%, #e879f9 50%, var(--cyan) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: none;
  align-items: center;
}

.splash-sub {
  font-size: 17px; color: var(--t2); font-weight: 400;
  max-width: 480px; line-height: 1.7;
  margin-bottom: 52px; margin-top: 18px;
  text-align: center;
}

/* ── Unlock Button ── */
.unlock-wrap {
  position: relative; display: flex;
  align-items: center; justify-content: center;
  margin-bottom: 40px;
}

.unlock-outer {
  width: 120px; height: 120px; border-radius: 50%;
  border: 1px solid rgba(0,229,255,0.12);
  display: flex; align-items: center; justify-content: center;
  animation: pulseRing 3s ease-in-out infinite;
  position: relative;
  margin-top: -30px;
}
@keyframes pulseRing {
  0%,100% { box-shadow: 0 0 0 0 rgba(0,229,255,0.15); }
  50% { box-shadow: 0 0 0 20px rgba(0,229,255,0); }
}
.unlock-outer::before {
  content: ''; position: absolute; inset: -12px;
  border-radius: 50%;
  border: 1px dashed rgba(176,106,255,0.12);
  animation: spinSlow 20s linear infinite;
}
.unlock-outer::after {
  content: ''; position: absolute; inset: -26px;
  border-radius: 50%;
  border: 1px dashed rgba(0,229,255,0.06);
  animation: spinSlow 35s linear infinite reverse;
}

.unlock-btn {
  width: 120px; height: 120px; border-radius: 50%;
  background: linear-gradient(135deg, rgba(0,229,255,0.12) 0%, rgba(176,106,255,0.18) 100%);
  border: 1.5px solid rgba(0,229,255,0.35);
  cursor: pointer;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 6px;
  transition: all 0.3s ease;
  backdrop-filter: blur(16px);
  position: relative; overflow: hidden;
  box-shadow: 0 0 40px rgba(0,229,255,0.1), inset 0 1px 0 rgba(255,255,255,0.1);
}
.unlock-btn::before {
  content: ''; position: absolute; inset: 0;
  border-radius: 50%;
  background: radial-gradient(circle at 40% 30%, rgba(255,255,255,0.12), transparent 60%);
}
.unlock-btn:hover {
  border-color: var(--cyan);
  box-shadow: 0 0 60px rgba(0,229,255,0.3), 0 0 120px rgba(0,229,255,0.1), inset 0 1px 0 rgba(255,255,255,0.15);
  transform: scale(1.05);
}
.unlock-btn:active { transform: scale(0.97); }
.unlock-icon { font-size: 30px; line-height: 1; }
.unlock-label {
  font-family: var(--f-mono); font-size: 9px;
  letter-spacing: 0.18em; color: var(--cyan);
  text-transform: uppercase;
}

.splash-stats {
  display: flex; gap: 40px;
  align-items: center;
}
.splash-stat {
  display: flex; flex-direction: column; align-items: center; gap: 4px;
}
.splash-stat-val {
  font-family: var(--f-display); font-size: 22px; font-weight: 700;
  background: linear-gradient(120deg, var(--t1), var(--cyan));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.splash-stat-lbl {
  font-family: var(--f-mono); font-size: 10px;
  color: var(--t3); letter-spacing: 0.1em;
}
.splash-stat-div { width: 1px; height: 32px; background: var(--b1); }

/* Transition overlay */
.splash-exit {
  animation: splashExit 0.6s ease forwards;
}
@keyframes splashExit {
  to { opacity: 0; pointer-events: none; }
}

/* ══════════════════════════════════════════
   APP SHELL
══════════════════════════════════════════ */
.app-shell {
  display: flex; min-height: 100vh;
  background: var(--void);
}
.app-shell-orb1 {
  position: fixed; width: 700px; height: 700px;
  top: -200px; left: -150px; border-radius: 50%;
  background: radial-gradient(circle, rgba(0,229,255,0.07) 0%, transparent 60%);
  filter: blur(80px); pointer-events: none; z-index: 0;
}
.app-shell-orb2 {
  position: fixed; width: 500px; height: 500px;
  bottom: -120px; right: -100px; border-radius: 50%;
  background: radial-gradient(circle, rgba(176,106,255,0.08) 0%, transparent 60%);
  filter: blur(70px); pointer-events: none; z-index: 0;
}

/* ── Bottom Tab Bar (Mobile-first navigation) ── */
.tab-bar {
  position: fixed; bottom: 0; left: 0; right: 0;
  height: 72px;
  background: rgba(7,11,18,0.92);
  backdrop-filter: blur(24px);
  border-top: 1px solid var(--b0);
  display: flex; align-items: center; justify-content: space-around;
  padding: 0 8px 8px;
  z-index: 200;
}
.tab-item {
  display: flex; flex-direction: column;
  align-items: center; gap: 4px;
  padding: 8px 16px; border-radius: var(--r-md);
  cursor: pointer; transition: all 0.2s;
  border: 1px solid transparent;
  min-width: 56px;
}
.tab-item.active {
  background: rgba(0,229,255,0.07);
  border-color: rgba(0,229,255,0.16);
}
.tab-icon { font-size: 20px; line-height: 1; }
.tab-label {
  font-family: var(--f-mono); font-size: 9px;
  letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--t3);
}
.tab-item.active .tab-label { color: var(--cyan); }

/* ── Topbar ── */
.topbar {
  position: fixed; top: 0; left: 0; right: 0;
  height: 60px;
  background: rgba(7,11,18,0.88);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--b0);
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 20px;
  z-index: 200;
}
.topbar-logo {
  display: flex; align-items: center; gap: 10px;
}
.topbar-mark {
  width: 34px; height: 34px; border-radius: 10px;
  background: linear-gradient(135deg, var(--cyan), var(--violet));
  display: flex; align-items: center; justify-content: center;
  font-size: 16px;
  box-shadow: 0 0 20px rgba(0,229,255,0.25);
}
.topbar-name {
  font-family: var(--f-display); font-size: 16px; font-weight: 700;
  background: linear-gradient(90deg, var(--t1), var(--cyan));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.topbar-right {
  display: flex; align-items: center; gap: 10px;
}
.topbar-chip {
  display: flex; align-items: center; gap: 6px;
  padding: 6px 12px; border-radius: 99px;
  background: rgba(16,185,129,0.08);
  border: 1px solid rgba(16,185,129,0.2);
  font-family: var(--f-mono); font-size: 10px;
  color: var(--emerald);
}
.topbar-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--emerald);
  box-shadow: 0 0 6px var(--emerald);
  animation: blink 2s ease-in-out infinite;
}
.avatar {
  width: 34px; height: 34px; border-radius: 50%;
  background: linear-gradient(135deg, var(--sapphire), var(--violet));
  display: flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: 700; color: #fff;
  border: 2px solid rgba(176,106,255,0.3);
  box-shadow: 0 0 12px rgba(176,106,255,0.2);
  cursor: pointer;
}
.back-btn {
  display: flex; align-items: center; gap: 6px;
  padding: 6px 12px; border-radius: var(--r-sm);
  background: var(--s3); border: 1px solid var(--b0);
  color: var(--t2); font-family: var(--f-body); font-size: 13px;
  cursor: pointer; transition: all 0.2s;
}
.back-btn:hover { border-color: var(--b1); color: var(--t1); }

/* ── Main Content ── */
.main-content {
  flex: 1;
  padding-top: 60px;
  padding-bottom: 88px;
  position: relative; z-index: 1;
  min-height: 100vh;
}
.page { padding: 24px 20px; max-width: 480px; margin: 0 auto; }
 .splash-content{
  position: relative;
  z-index: 100;
}

.unlock-btn{
  position: relative;
  z-index: 101;
}

  body {
  margin: 0;
  display: flex;
  justify-content: center;
  background: #000;
}

#root {
  width: 100%;
  max-width: 390px;
  min-height: 100vh;
  overflow-x: hidden;
  margin: 0 auto;
}
`;

/* ═══════════════════════════════════════════════════════════
   SPLASH SCREEN
═══════════════════════════════════════════════════════════ */
function Splash({ onEnter }) {
  const [exiting, setExiting] = useState(false);

    useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = GLOBAL_CSS;
    document.head.appendChild(style);

    return () => document.head.removeChild(style);
  }, []);

  const handleUnlock = () => {

  setExiting(true);

  setTimeout(() => {
    onEnter();
  }, 580);
};

  return (
    <div className={`splash ${exiting ? "splash-exit" : ""}`}>
      <div className="splash-grid" />
      <div className="splash-orb-1" />
      <div className="splash-orb-2" />
      <div className="splash-orb-3" />
      <div className="splash-hex-ring" />

      <div className="splash-content">
        <div className="splash-badge">
          <div className="splash-badge-dot" />
          AI-POWERED CAREER INTELLIGENCE
        </div>

        <div className="splash-title">
          <span className="splash-title-line1">RESUME</span>
          <span className="splash-title-line2">ANALYZER</span>
        </div>

        <p className="splash-sub">
          Your intelligent career co-pilot. Analyze resumes, rewrite content, rank candidates and ace interviews — all in one premium workspace.
        </p>

        <div className="unlock-wrap">
          <div className="unlock-outer">
            <button
  className="unlock-btn"
  onClick={() => {
    handleUnlock();
  }}
>
              <span className="unlock-icon">⬡</span>
              <span className="unlock-label">Enter</span>
            </button>
          </div>
        </div>

        <div className="splash-stats">
          <div className="splash-stat">
            <span className="splash-stat-val">98%</span>
            <span className="splash-stat-lbl">ATS Accuracy</span>
          </div>
          <div className="splash-stat-div" />
          <div className="splash-stat">
            <span className="splash-stat-val">6</span>
            <span className="splash-stat-lbl">AI Tools</span>
          </div>
          <div className="splash-stat-div" />
          <div className="splash-stat">
            <span className="splash-stat-val">10s</span>
            <span className="splash-stat-lbl">Analysis</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Splash;