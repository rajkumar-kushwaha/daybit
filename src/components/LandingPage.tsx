import React, { useState, useRef, useCallback, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Calendar,
  Lock,
  Flame,
  Smartphone,
  ArrowRight,
  Check,
  BookOpen,
  Activity,
  Droplet,
  Menu,
  X as XIcon,
} from 'lucide-react';

// ─── 3D Tilt Hook ───────────────────────────────────────────────────────────
function useTilt(maxDeg = 14) {
  const ref = useRef<HTMLDivElement>(null);
  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotX = ((y - cy) / cy) * -maxDeg;
      const rotY = ((x - cx) / cx) * maxDeg;
      el.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(14px) scale(1.025)`;
    },
    [maxDeg],
  );
  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform =
      'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)';
  }, []);
  return { ref, onMouseMove, onMouseLeave };
}

// ─── TiltCard wrapper ────────────────────────────────────────────────────────
interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxDeg?: number;
  style?: React.CSSProperties;
}
const TiltCard: React.FC<TiltCardProps> = ({ children, className = '', maxDeg = 14, style }) => {
  const { ref, onMouseMove, onMouseLeave } = useTilt(maxDeg);
  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        transition: 'transform 0.35s cubic-bezier(0.17,0.67,0.4,1.2), box-shadow 0.35s ease',
        willChange: 'transform',
        ...style,
      }}
      className={className}
    >
      {children}
    </div>
  );
};

// ─── Scroll-reveal hook (IntersectionObserver) ───────────────────────────────
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

// ─── Props ───────────────────────────────────────────────────────────────────
interface LandingPageProps {
  onStartApp: () => void;
  onOpenAuth?: () => void;
  onBackToApp?: () => void;
}

// ════════════════════════════════════════════════════════════════════════════
export const LandingPage: React.FC<LandingPageProps> = ({
  onStartApp,
  onOpenAuth,
  onBackToApp,
}) => {
  const [habitState, setHabitState] = useState({
    reading: true,
    workout: true,
    water: false,
  });
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // ── Scroll state: parallax + progress bar ──
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let rafId: number;
    const onScroll = () => {
      rafId = requestAnimationFrame(() => {
        const sy = window.scrollY;
        setScrollY(sy);
        const docH = document.documentElement.scrollHeight - window.innerHeight;
        setScrollProgress(docH > 0 ? Math.min((sy / docH) * 100, 100) : 0);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  const handleToggleHabit = (habitKey: 'reading' | 'workout' | 'water') => {
    const nextVal = !habitState[habitKey];
    setHabitState((prev) => ({ ...prev, [habitKey]: nextVal }));
    if (nextVal) {
      try {
        confetti({
          particleCount: 32,
          spread: 50,
          origin: { y: 0.65 },
          colors: ['#f59e0b', '#10b981', '#6366f1', '#06b6d4'],
          disableForReducedMotion: true,
        });
      } catch {
        // silent
      }
    }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // Reveal refs for each section
  const revealHowItWorks = useReveal(0.1);
  const revealFeatures = useReveal(0.08);
  const revealFaq = useReveal(0.1);
  const revealCta = useReveal(0.1);

  const faqItems = [
    {
      q: 'Is Daybit completely free to use?',
      a: 'Yes, 100% free. There are no paywalls, hidden subscriptions, or annoying popups. You get unlimited habits, full monthly views, streak tracking, and offline support completely free.',
    },
    {
      q: 'Does Daybit work offline without internet?',
      a: 'Yes! Daybit is built with local-first technology. It runs smoothly on airplanes, subways, or anywhere with zero signal. All your progress is stored directly on your device.',
    },
    {
      q: 'What is the "Accountability Lock"?',
      a: "The Accountability Lock lets you seal past dates so you can't go back and check off days you missed. It removes the temptation to fake your streaks and keeps you focused on showing up today.",
    },
    {
      q: 'Is my personal habit data private?',
      a: 'Completely. We do not sell your data or track your personal life. Your habits stay on your device. If you optionally choose to sign in with Google or Email, your data is securely synced to your private encrypted cloud backup.',
    },
    {
      q: 'How do I install Daybit on my phone?',
      a: 'Daybit is a Progressive Web App (PWA). On iPhone, open Daybit in Safari, tap the Share button, and select "Add to Home Screen". On Android, open in Chrome and tap "Install App". It opens in full-screen just like a native app.',
    },
    {
      q: 'Can I rearrange or reorder my habits?',
      a: 'Yes! Open the three dots menu (⋮) in the top bar, tap "Reorder Habits", and you can hold and drag any habit up or down with your finger to arrange them however fits your morning or evening routine best.',
    },
  ];

  return (
    <div
      className="text-slate-100 antialiased min-h-screen font-sans selection:bg-amber-500 selection:text-white relative overflow-x-hidden"
      style={{
        background: 'radial-gradient(circle at 50% 0%, #0d1226 0%, #070914 45%, #05060d 100%)',
      }}
    >
      {/* ── Scroll Progress Bar ── */}
      <div
        id="scroll-progress-bar"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* ── PARALLAX DYNAMIC BACKGROUND ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Grid mesh with parallax drift */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(ellipse 90% 80% at 50% 25%, black 20%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse 90% 80% at 50% 25%, black 20%, transparent 80%)',
            transform: `translateY(${scrollY * 0.1}px)`,
            willChange: 'transform',
          }}
        />
        {/* Top radiant beam */}
        <div
          className="absolute top-0 left-1/2 w-[1100px] h-[550px]"
          style={{
            transform: `translate(-50%, ${scrollY * -0.15}px)`,
            background: 'radial-gradient(ellipse 65% 50% at 50% 0%, rgba(245,158,11,0.18) 0%, rgba(249,115,22,0.08) 35%, transparent 70%)',
            filter: 'blur(40px)',
            willChange: 'transform',
          }}
        />
        {/* Hero orb left — Amber */}
        <div
          className="absolute rounded-full"
          style={{
            top: '-50px', left: '-8vw', width: '54vw', height: '54vw',
            background: 'radial-gradient(circle, rgba(245,158,11,0.14) 0%, rgba(249,115,22,0.05) 45%, transparent 70%)',
            filter: 'blur(35px)',
            transform: `translateY(${scrollY * 0.22}px)`,
            willChange: 'transform',
          }}
        />
        {/* Hero orb right — Indigo */}
        <div
          className="absolute rounded-full"
          style={{
            top: '80px', right: '-10vw', width: '46vw', height: '46vw',
            background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, rgba(139,92,246,0.05) 50%, transparent 70%)',
            filter: 'blur(40px)',
            transform: `translateY(${scrollY * 0.16}px)`,
            willChange: 'transform',
          }}
        />
        {/* How It Works — Violet aurora */}
        <div
          className="absolute rounded-full"
          style={{
            top: '950px', left: '10vw', width: '48vw', height: '48vw',
            background: 'radial-gradient(circle, rgba(124,58,237,0.09) 0%, rgba(79,70,229,0.04) 50%, transparent 70%)',
            filter: 'blur(50px)',
            transform: `translateY(${(scrollY - 600) * 0.18}px)`,
            willChange: 'transform',
          }}
        />
        {/* Features — Emerald/Cyan */}
        <div
          className="absolute rounded-full"
          style={{
            top: '1650px', right: '-8vw', width: '50vw', height: '50vw',
            background: 'radial-gradient(circle, rgba(16,185,129,0.10) 0%, rgba(6,182,212,0.06) 45%, transparent 70%)',
            filter: 'blur(50px)',
            transform: `translateY(${(scrollY - 1300) * 0.2}px)`,
            willChange: 'transform',
          }}
        />
        {/* FAQ/CTA — Sunset Amber */}
        <div
          className="absolute rounded-full"
          style={{
            top: '2400px', left: '5vw', width: '55vw', height: '55vw',
            background: 'radial-gradient(circle, rgba(245,158,11,0.12) 0%, rgba(239,68,68,0.06) 45%, transparent 70%)',
            filter: 'blur(55px)',
            transform: `translateY(${(scrollY - 2000) * 0.15}px)`,
            willChange: 'transform',
          }}
        />
      </div>

      {/* ════════════════════════════════════
          STICKY NAV
      ════════════════════════════════════ */}
      <header
        id="landing-sticky-header"
        className="sticky top-0 z-40 backdrop-blur-xl border-b border-white/[0.06] transition-colors duration-300"
        style={{ background: 'rgba(7,9,26,0.82)' }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between">
          <div onClick={scrollToTop} className="flex items-center gap-3 select-none shrink-0 cursor-pointer group">
            <img
              src="/icons/flame-emblem.png"
              alt="Daybit"
              className="w-10 h-10 sm:w-11 sm:h-11 object-contain shrink-0 drop-shadow-[0_0_16px_rgba(245,158,11,0.45)] transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex items-center font-black tracking-[-0.035em] text-[1.5rem] sm:text-[1.75rem] leading-none select-none">
              <span className="text-white">Day</span>
              <span
                className="shimmer-text"
                style={{
                  background: 'linear-gradient(90deg, #fbbf24, #f97316, #fde68a, #f97316, #fbbf24)',
                  backgroundSize: '200% 200%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                bit
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 lg:gap-9 text-[17px] font-medium text-slate-300">
            <a href="#how-it-works" className="relative group hover:text-white transition-colors duration-200">
              How it works
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gradient-to-r from-amber-400 to-orange-400 group-hover:w-full transition-all duration-300" />
            </a>
            <a href="#features" className="relative group hover:text-white transition-colors duration-200">
              Features
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gradient-to-r from-amber-400 to-orange-400 group-hover:w-full transition-all duration-300" />
            </a>
            <a href="#faq" className="relative group hover:text-white transition-colors duration-200">
              FAQ
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gradient-to-r from-amber-400 to-orange-400 group-hover:w-full transition-all duration-300" />
            </a>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            {onBackToApp && (
              <button onClick={onBackToApp} className="hidden sm:block text-xs sm:text-sm font-semibold text-slate-300 hover:text-white px-2.5 py-1.5 transition-colors cursor-pointer">
                Back to Tracker
              </button>
            )}
            {onOpenAuth && (
              <button onClick={onOpenAuth} className="hidden sm:block text-sm font-semibold text-slate-300 hover:text-white px-2.5 py-1.5 transition-colors cursor-pointer">
                Sign In
              </button>
            )}
            <button
              onClick={onStartApp}
              className="relative text-xs sm:text-sm font-bold text-white px-3.5 sm:px-5 py-2 rounded-xl transition-all transform active:scale-95 flex items-center gap-1.5 cursor-pointer overflow-hidden group"
              style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)', boxShadow: '0 4px 20px rgba(249,115,22,0.35)' }}
            >
              <span className="relative z-10">Start Free</span>
              <ArrowRight className="w-3.5 h-3.5 relative z-10" />
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" style={{ background: 'linear-gradient(135deg, #d97706 0%, #ea580c 100%)' }} />
            </button>
            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              onClick={() => setMobileNavOpen(v => !v)}
              aria-label="Menu"
            >
              {mobileNavOpen ? <XIcon className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown nav */}
        {mobileNavOpen && (
          <div
            className="md:hidden border-t border-white/[0.06] px-5 py-4 flex flex-col gap-4 text-sm font-medium text-slate-300 animate-fade-in"
            style={{ background: 'rgba(7,9,26,0.97)' }}
          >
            <a href="#how-it-works" onClick={() => setMobileNavOpen(false)} className="hover:text-amber-400 transition-colors">How it works</a>
            <a href="#features" onClick={() => setMobileNavOpen(false)} className="hover:text-amber-400 transition-colors">Features</a>
            <a href="#faq" onClick={() => setMobileNavOpen(false)} className="hover:text-amber-400 transition-colors">FAQ</a>
            {onOpenAuth && (
              <button onClick={() => { setMobileNavOpen(false); onOpenAuth(); }} className="text-left hover:text-amber-400 transition-colors cursor-pointer">Sign In to Sync</button>
            )}
            {onBackToApp && (
              <button onClick={() => { setMobileNavOpen(false); onBackToApp(); }} className="text-left hover:text-amber-400 transition-colors cursor-pointer">Back to Tracker</button>
            )}
          </div>
        )}
      </header>

      {/* ════════════════════════════════════
          HERO — Staggered entrance animations
      ════════════════════════════════════ */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-14 sm:pt-20 pb-20 text-center">
        {/* Badge — delay 0ms */}
        <div
          className="hero-anim inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-7 text-xs font-bold tracking-wider text-amber-300 border border-amber-500/25"
          style={{ background: 'rgba(245,158,11,0.08)', animationDelay: '0ms' }}
        >
          <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <span>A CALM PLACE FOR YOUR DAILY HABITS</span>
        </div>

        {/* Headline — delay 100ms */}
        <h1
          className="hero-anim text-4xl sm:text-5xl md:text-[3.75rem] font-black tracking-tight leading-[1.1] max-w-3xl mx-auto mb-5"
          style={{ animationDelay: '100ms' }}
        >
          <span className="text-white">Build better habits.</span>
          <br />
          <span
            className="shimmer-text"
            style={{
              background: 'linear-gradient(100deg, #fbbf24 0%, #f97316 30%, #fde68a 60%, #f97316 80%, #fbbf24 100%)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            One day at a time.
          </span>
        </h1>

        {/* Subtitle — delay 200ms */}
        <p
          className="hero-anim text-slate-400 text-sm sm:text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed"
          style={{ animationDelay: '200ms' }}
        >
          No confusing points, coins, or clutter. Just a clean view of your month, your streaks, and your daily progress.
        </p>

        {/* INTERACTIVE MOCKUP — delay 450ms + floating bob */}
        <div
          className="hero-anim max-w-2xl mx-auto text-left relative mt-2"
          style={{ animationDelay: '450ms' }}
        >
          {/* Floating badge top-right */}
          <div
            className="absolute -top-5 -right-2 sm:-right-4 z-20 rounded-2xl px-4 py-2.5 shadow-2xl flex items-center gap-3 hover:scale-105 transition-transform duration-200 border border-white/[0.08]"
            style={{ background: 'rgba(15,22,38,0.95)', backdropFilter: 'blur(12px)' }}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">CONSISTENCY SCORE</span>
              <span className="text-sm sm:text-base font-black text-white flex items-center gap-1.5">
                <span className="text-amber-400">🔥 100%</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">+14 Days</span>
              </span>
            </div>
          </div>

          {/* Main frame — floating bob animation */}
          <div
            className="mock-float rounded-2xl overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.06)] relative z-10"
            style={{ background: 'rgba(10,14,28,0.98)' }}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-white/[0.05]" style={{ background: 'rgba(7,10,20,0.9)' }}>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/[0.07] text-xs font-medium text-slate-400 select-none" style={{ background: 'rgba(18,24,41,0.8)' }}>
                <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="text-slate-200 font-semibold text-xs tracking-wide">Daybit</span>
              </div>
              <div className="text-[11px] font-medium text-slate-500 hidden sm:block">Today • Live Preview</div>
            </div>

            {/* Habit rows */}
            <div className="p-5 sm:p-6 space-y-3">
              {/* Habit 1 */}
              <div className="border border-white/[0.06] rounded-xl p-3 sm:p-3.5 flex items-center justify-between gap-3 transition-colors hover:border-indigo-500/25 cursor-default" style={{ background: 'rgba(18,24,41,0.7)' }}>
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                    <BookOpen className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-white truncate">Read 20 Pages</h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md text-indigo-300 bg-indigo-500/15 border border-indigo-500/20">Learning</span>
                      <span className="text-xs text-slate-400 font-medium">Target: 25 days/mo</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleToggleHabit('reading')}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer shrink-0 ${habitState.reading ? 'bg-indigo-500 border-2 border-indigo-500 shadow-[0_0_0_3px_rgba(99,102,241,0.2),0_2px_10px_rgba(99,102,241,0.35)]' : 'border-2 border-slate-600 hover:border-indigo-400'}`}
                  aria-label="Toggle habit"
                >
                  {habitState.reading && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
                </button>
              </div>

              {/* Habit 2 */}
              <div className="border border-white/[0.06] rounded-xl p-3 sm:p-3.5 flex items-center justify-between gap-3 transition-colors hover:border-emerald-500/25 cursor-default" style={{ background: 'rgba(18,24,41,0.7)' }}>
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                    <Activity className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-white truncate">Morning Workout</h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md text-emerald-300 bg-emerald-500/15 border border-emerald-500/20">Health</span>
                      <span className="text-xs text-slate-400 font-medium">Target: 20 days/mo</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleToggleHabit('workout')}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer shrink-0 ${habitState.workout ? 'bg-emerald-500 border-2 border-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.2),0_2px_10px_rgba(16,185,129,0.35)]' : 'border-2 border-slate-600 hover:border-emerald-400'}`}
                  aria-label="Toggle habit"
                >
                  {habitState.workout && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
                </button>
              </div>

              {/* Habit 3 */}
              <div className="border border-white/[0.06] rounded-xl p-3 sm:p-3.5 flex items-center justify-between gap-3 transition-colors hover:border-cyan-500/25 cursor-default" style={{ background: 'rgba(18,24,41,0.7)' }}>
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                    <Droplet className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-white truncate">Drink 2L Water</h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md text-cyan-300 bg-cyan-500/15 border border-cyan-500/20">Daily Wellness</span>
                      <span className="text-xs text-slate-400 font-medium">Target: 30 days/mo</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleToggleHabit('water')}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer shrink-0 ${habitState.water ? 'bg-cyan-500 border-2 border-cyan-500 shadow-[0_0_0_3px_rgba(6,182,212,0.2),0_2px_10px_rgba(6,182,212,0.35)]' : 'border-2 border-slate-600 hover:border-cyan-400'}`}
                  aria-label="Toggle habit"
                >
                  {habitState.water && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
                </button>
              </div>

              <div className="pt-1.5 text-center">
                <span className="text-xs font-medium text-slate-500">👆 Tap circles to test checking off a habit</span>
              </div>
            </div>
          </div>

          {/* Bottom floating badge */}
          <div
            className="absolute -bottom-4 -right-1 sm:-right-4 z-20 rounded-full px-3.5 py-1.5 shadow-xl flex items-center gap-2 hover:scale-105 transition-transform duration-200 border border-white/[0.07]"
            style={{ background: 'rgba(15,22,38,0.95)', backdropFilter: 'blur(12px)' }}
          >
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">100%</span>
            <span className="text-slate-300 font-medium text-xs">Private & Offline Ready</span>
          </div>
        </div>
      </main>

      {/* ════════════════════════════════════
          HOW IT WORKS — Scroll reveal + staggered cards
      ════════════════════════════════════ */}
      <section
        id="how-it-works"
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-20 text-center"
        style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
      >
        {/* Section heading reveal */}
        <div ref={revealHowItWorks} className="reveal">
          <span
            className="text-xs font-bold tracking-wider uppercase mb-2 block"
            style={{ background: 'linear-gradient(90deg,#fbbf24,#f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
          >
            Simple Routine
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3">
            How it works in 3 simple steps
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto mb-12">
            No steep learning curve. Start building momentum in under a minute.
          </p>
        </div>

        {/* Staggered step cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left">
          {[
            {
              num: '01',
              title: 'Pick your habits',
              desc: 'Choose 3 to 5 habits that matter most. Set custom colors and monthly targets.',
              color: 'rgba(245,158,11,0.08)',
              glow: 'rgba(245,158,11,0.18)',
              numGrad: 'linear-gradient(135deg,#fbbf24,#f97316)',
            },
            {
              num: '02',
              title: 'Check them off today',
              desc: 'Tap the circle as you complete each habit and keep your daily streak alive.',
              color: 'rgba(99,102,241,0.07)',
              glow: 'rgba(99,102,241,0.18)',
              numGrad: 'linear-gradient(135deg,#818cf8,#6366f1)',
            },
            {
              num: '03',
              title: 'Watch consistency grow',
              desc: 'See your month fill with checkmarks. Small daily actions turn into real change.',
              color: 'rgba(16,185,129,0.07)',
              glow: 'rgba(16,185,129,0.18)',
              numGrad: 'linear-gradient(135deg,#34d399,#10b981)',
            },
          ].map((step, i) => (
            <StepCardReveal key={step.num} delay={i * 130}>
              <TiltCard
                maxDeg={12}
                className="p-6 sm:p-7 rounded-2xl space-y-3 border border-white/[0.07] cursor-default h-full"
                style={{
                  background: `radial-gradient(ellipse at 30% 20%, ${step.color} 0%, rgba(10,14,28,0.95) 70%)`,
                  boxShadow: '0 4px 30px rgba(0,0,0,0.5)',
                } as React.CSSProperties}
              >
                <span
                  className="text-2xl font-black"
                  style={{
                    background: step.numGrad,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: `drop-shadow(0 0 10px ${step.glow})`,
                  }}
                >
                  {step.num}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white">{step.title}</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{step.desc}</p>
              </TiltCard>
            </StepCardReveal>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════
          FEATURES — Scroll reveal + stagger
      ════════════════════════════════════ */}
      <section
        id="features"
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-20"
        style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
      >
        {/* Heading */}
        <div ref={revealFeatures} className="reveal text-center max-w-xl mx-auto mb-14">
          <span
            className="text-xs font-bold tracking-wider uppercase mb-2 block"
            style={{ background: 'linear-gradient(90deg,#fbbf24,#f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
          >
            Simple by Design
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3">
            Everything you need. Nothing you don't.
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Four clean features built to help you stay on track every day.
          </p>
        </div>

        {/* Feature cards — 2×2 staggered */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            {
              Icon: Calendar, tag: 'MONTHLY GRID', tagColor: '#fbbf24',
              iconBg: 'rgba(245,158,11,0.1)', iconBorder: 'rgba(245,158,11,0.2)', iconColor: '#fbbf24',
              glowColor: 'rgba(245,158,11,0.09)',
              title: 'See your month at a glance',
              desc: 'See your entire month laid out in a clean calendar grid. Watching checkmarks connect gives you natural momentum to keep going.',
            },
            {
              Icon: Lock, tag: 'STAY HONEST', tagColor: '#fb923c',
              iconBg: 'rgba(249,115,22,0.1)', iconBorder: 'rgba(249,115,22,0.2)', iconColor: '#fb923c',
              glowColor: 'rgba(249,115,22,0.09)',
              title: 'Focus on today, not yesterday',
              desc: 'Lock past dates with a tap so streaks stay 100% honest. When you build a streak in Daybit, you know you truly earned it.',
            },
            {
              Icon: Flame, tag: 'DAILY STREAKS', tagColor: '#fbbf24',
              iconBg: 'rgba(245,158,11,0.1)', iconBorder: 'rgba(245,158,11,0.2)', iconColor: '#fbbf24',
              glowColor: 'rgba(245,158,11,0.09)',
              title: 'Celebrate every single win',
              desc: 'Feel a satisfying tap and celebratory confetti with every checkmark. Reorder habits smoothly to match your daily routine.',
            },
            {
              Icon: Smartphone, tag: 'ALWAYS READY', tagColor: '#34d399',
              iconBg: 'rgba(16,185,129,0.1)', iconBorder: 'rgba(16,185,129,0.2)', iconColor: '#34d399',
              glowColor: 'rgba(16,185,129,0.09)',
              title: 'Works anywhere, even offline',
              desc: 'Installs to your home screen like a native app on iPhone and Android. 100% private and offline-ready, with optional cloud sync.',
            },
          ].map((feat, i) => (
            <StepCardReveal key={feat.tag} delay={i * 100}>
              <TiltCard
                maxDeg={10}
                className="p-6 rounded-2xl border border-white/[0.07] cursor-default group h-full"
                style={{
                  background: `radial-gradient(ellipse at 20% 20%, ${feat.glowColor} 0%, rgba(10,14,28,0.96) 65%)`,
                  boxShadow: '0 4px 30px rgba(0,0,0,0.5)',
                } as React.CSSProperties}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: feat.iconBg, border: `1px solid ${feat.iconBorder}`, boxShadow: `0 0 20px ${feat.glowColor}` }}
                >
                  <feat.Icon className="w-5 h-5" style={{ color: feat.iconColor }} />
                </div>
                <span className="text-[11px] font-bold tracking-wider uppercase" style={{ color: feat.tagColor }}>
                  {feat.tag}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white mt-1 mb-2">{feat.title}</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{feat.desc}</p>
              </TiltCard>
            </StepCardReveal>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════
          FAQ — Scroll reveal
      ════════════════════════════════════ */}
      <section
        id="faq"
        className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 py-20"
        style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
      >
        <div ref={revealFaq} className="reveal text-center mb-12">
          <span
            className="text-xs font-bold tracking-wider uppercase mb-2 block"
            style={{ background: 'linear-gradient(90deg,#34d399,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
          >
            FAQ
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
            The frequent questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">Everything you need to know about Daybit.</p>
        </div>

        <div className="space-y-3">
          {faqItems.map((item, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                onClick={() => toggleFaq(idx)}
                className="rounded-2xl p-4 sm:p-5 transition-all duration-200 cursor-pointer border"
                style={{
                  background: isOpen ? 'rgba(245,158,11,0.05)' : 'rgba(10,14,28,0.9)',
                  borderColor: isOpen ? 'rgba(245,158,11,0.25)' : 'rgba(255,255,255,0.07)',
                  boxShadow: isOpen ? '0 0 30px rgba(245,158,11,0.06)' : 'none',
                }}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm sm:text-base font-semibold" style={{ color: isOpen ? '#fff' : 'rgba(248,250,252,0.9)' }}>
                    {item.q}
                  </span>
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-300"
                    style={{
                      background: isOpen ? 'rgba(245,158,11,0.15)' : 'rgba(30,40,65,0.9)',
                      color: isOpen ? '#fbbf24' : '#64748b',
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                    }}
                  >
                    <span className="text-lg leading-none font-bold">+</span>
                  </div>
                </div>
                {isOpen && (
                  <div
                    className="text-xs sm:text-sm text-slate-400 leading-relaxed mt-3 pt-3 animate-fade-in"
                    style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ════════════════════════════════════
          CLOSING CTA — Scroll reveal
      ════════════════════════════════════ */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center">
        <div ref={revealCta} className="reveal">
          <div
            className="p-8 sm:p-12 rounded-3xl relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(245,158,11,0.12) 0%, rgba(249,115,22,0.08) 50%, rgba(10,14,28,0.95) 100%)',
              border: '1px solid rgba(245,158,11,0.18)',
              boxShadow: '0 0 80px rgba(245,158,11,0.08), 0 30px 80px rgba(0,0,0,0.6)',
            }}
          >
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(245,158,11,0.1) 0%, transparent 70%)' }}
            />
            {/* Small flame icon */}
            <div className="relative flex items-center justify-center mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: 'rgba(245,158,11,0.12)',
                  border: '1px solid rgba(245,158,11,0.25)',
                  boxShadow: '0 0 20px rgba(245,158,11,0.15)',
                }}
              >
                <Flame className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <h2 className="relative text-2xl sm:text-4xl font-black text-white tracking-tight mb-3">
              Ready to start your streak?
            </h2>
            <p className="relative text-xs sm:text-sm text-slate-400 max-w-md mx-auto mb-7">
              It takes less than 30 seconds to set up your first habit. Free forever.
            </p>
            <div className="relative flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={onStartApp}
                className="relative group w-full sm:w-auto px-8 py-3.5 rounded-2xl font-extrabold text-sm text-white overflow-hidden cursor-pointer active:scale-95 transition-transform"
                style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 60%, #ef4444 100%)', boxShadow: '0 8px 32px rgba(249,115,22,0.45)' }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Open Daybit App — Start Free
                  <ArrowRight className="w-4 h-4" />
                </span>
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" style={{ background: 'linear-gradient(135deg, #d97706 0%, #ea580c 60%, #dc2626 100%)' }} />
              </button>
              {onOpenAuth && (
                <button
                  onClick={onOpenAuth}
                  className="text-xs sm:text-sm font-semibold text-slate-300 hover:text-white px-5 py-3.5 rounded-2xl border border-slate-700/60 hover:border-amber-500/40 transition-all cursor-pointer"
                  style={{ background: 'rgba(255,255,255,0.03)' }}
                >
                  Already tracking? Sign In to Sync →
                </button>
              )}
            </div>
            {/* Trust badges */}
            <div className="relative flex items-center justify-center gap-5 mt-6 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                100% Free
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                No sign-up required
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                Works offline
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          FOOTER
      ════════════════════════════════════ */}
      <footer
        id="landing-footer"
        className="relative z-10 mt-6 backdrop-blur-md"
        style={{ borderTop: '1px solid rgba(255,255,255,0.07)', background: 'rgba(5,7,20,0.92)' }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-14 pb-8">

          {/* Top row: Brand + Nav links */}
          <div
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10 pb-10"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
          >
            {/* Brand */}
            <div className="flex flex-col gap-3 max-w-xs">
              <div className="flex items-center gap-3">
                <img
                  src="/icons/flame-emblem.png"
                  alt="Daybit"
                  className="w-9 h-9 object-contain drop-shadow-[0_0_14px_rgba(245,158,11,0.4)]"
                />
                <div className="flex items-center font-black tracking-[-0.035em] text-2xl leading-none">
                  <span className="text-white">Day</span>
                  <span style={{ background: 'linear-gradient(90deg,#fbbf24,#f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>bit</span>
                </div>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Build better habits, one day at a time.<br />
                Free forever. No sign-up needed.
              </p>
            </div>

            {/* Nav columns */}
            <div className="flex flex-wrap gap-8 sm:gap-10 text-xs font-medium w-full md:w-auto">
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-bold tracking-widest uppercase text-slate-600">Product</span>
                <a href="#how-it-works" className="text-slate-400 hover:text-amber-400 transition-colors">How it works</a>
                <a href="#features" className="text-slate-400 hover:text-amber-400 transition-colors">Features</a>
                <a href="#faq" className="text-slate-400 hover:text-amber-400 transition-colors">FAQ</a>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-bold tracking-widest uppercase text-slate-600">Get Started</span>
                <button onClick={onStartApp} className="text-left text-amber-400/90 hover:text-amber-300 font-semibold transition-colors cursor-pointer">Start Free →</button>
                {onOpenAuth && (
                  <button onClick={onOpenAuth} className="text-left text-slate-400 hover:text-amber-400 transition-colors cursor-pointer">Sign In to Sync</button>
                )}
                <button onClick={scrollToTop} className="text-left text-slate-400 hover:text-amber-400 transition-colors cursor-pointer">Back to top ↑</button>
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
            <p>© 2026 Daybit · Built with ❤️ for habit builders everywhere</p>
            <div className="flex items-center gap-4">
              <span
                className="px-2.5 py-1 rounded-full border text-[10px] font-bold tracking-wider"
                style={{ borderColor: 'rgba(16,185,129,0.25)', color: '#34d399', background: 'rgba(16,185,129,0.07)' }}
              >
                100% FREE FOREVER
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// ─── Staggered scroll-reveal wrapper for individual cards ────────────────────
function StepCardReveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(32px)';
    el.style.transition = `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return <div ref={ref}>{children}</div>;
}
