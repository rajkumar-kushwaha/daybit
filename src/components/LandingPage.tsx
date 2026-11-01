import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Calendar,
  Lock,
  Flame,
  Smartphone,
  ArrowRight,
  ArrowUp,
  Check,
  BookOpen,
  Activity,
  Droplet,
} from 'lucide-react';

interface LandingPageProps {
  onStartApp: () => void;
  onOpenAuth?: () => void;
  onBackToApp?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartApp,
  onOpenAuth,
  onBackToApp,
}) => {
  // State for interactive habits mockup
  const [habitState, setHabitState] = useState({
    reading: true,
    workout: true,
    water: false,
  });

  // State for open FAQ accordion items
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  const handleToggleHabit = (habitKey: 'reading' | 'workout' | 'water') => {
    const nextVal = !habitState[habitKey];
    setHabitState((prev) => ({ ...prev, [habitKey]: nextVal }));

    if (nextVal) {
      try {
        confetti({
          particleCount: 28,
          spread: 45,
          origin: { y: 0.65 },
          colors: ['#f59e0b', '#10b981', '#6366f1', '#06b6d4'],
          disableForReducedMotion: true,
        });
      } catch {
        // Fallback silently if confetti is unavailable
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

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
    <div className="theme-alloy text-slate-100 antialiased min-h-screen font-sans selection:bg-amber-500 selection:text-white">
      {/* ALWAYS VISIBLE STICKY TOP NAVIGATION BAR */}
      <header
        id="landing-sticky-header"
        className="sticky top-0 z-40 backdrop-blur-xl bg-[#090e1a]/88 border-b border-slate-700/40 transition-colors duration-300"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between">
          <div
            onClick={scrollToTop}
            className="flex items-center gap-3 select-none shrink-0 cursor-pointer group"
          >
            {/* Official App Flame Emblem Logo */}
            <img
              src="/icons/flame-emblem.png"
              alt="Daybit"
              className="w-10 h-10 sm:w-11 sm:h-11 object-contain shrink-0 drop-shadow-[0_0_16px_rgba(245,158,11,0.45)] transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex items-center font-black tracking-[-0.035em] text-[1.5rem] sm:text-[1.75rem] leading-none select-none">
              <span className="text-white">Day</span>
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-xs">
                bit
              </span>
            </div>
          </div>

          {/* Center Navigation Links */}
          <div className="hidden md:flex items-center gap-8 lg:gap-9 text-[17px] font-medium text-slate-200">
            <a href="#how-it-works" className="hover:text-amber-400 transition-colors">
              How it works
            </a>
            <a href="#features" className="hover:text-amber-400 transition-colors">
              Features
            </a>
            <a href="#faq" className="hover:text-amber-400 transition-colors">
              FAQ
            </a>
          </div>

          {/* Top Right Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {onBackToApp && (
              <button
                onClick={onBackToApp}
                className="text-xs sm:text-sm font-semibold text-slate-300 hover:text-white px-2.5 py-1.5 transition-colors cursor-pointer"
              >
                Back to Tracker
              </button>
            )}

            {onOpenAuth && (
              <button
                onClick={onOpenAuth}
                className="text-sm font-semibold text-slate-300 hover:text-white px-2.5 py-1.5 transition-colors cursor-pointer"
              >
                Sign In
              </button>
            )}

            <button
              onClick={onStartApp}
              className="text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 px-3.5 sm:px-4 py-2 rounded-xl shadow-md shadow-orange-500/25 transition-all transform active:scale-95 flex items-center gap-1.5 cursor-pointer"
            >
              <span>Start Free</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-16 text-center relative overflow-hidden">
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-semibold mb-6 shadow-xs tracking-wide">
          <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <span>A CALM PLACE FOR YOUR DAILY HABITS</span>
        </div>

        {/* Clean, High-Impact Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.15] max-w-3xl mx-auto mb-5 text-white">
          Build better habits. <br />
          <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-300 bg-clip-text text-transparent">
            One day at a time.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-slate-400 text-sm sm:text-base md:text-lg max-w-xl mx-auto mb-8 font-normal leading-relaxed">
          No confusing points, coins, or clutter. Just a clean view of your month, your streaks, and your daily progress.
        </p>

        {/* INTERACTIVE MOCKUP SHOWCASE */}
        <div className="max-w-2xl mx-auto text-left relative mt-4">
          {/* Top Right Floating Card */}
          <div className="absolute -top-5 -right-2 sm:-right-4 z-20 bg-[#0f1626] border border-slate-700/60 rounded-2xl px-4 py-2.5 shadow-xl flex items-center gap-3 transform hover:scale-105 transition-all duration-200">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                CONSISTENCY SCORE
              </span>
              <span className="text-sm sm:text-base font-black text-white flex items-center gap-1.5">
                <span className="text-amber-400">🔥 100%</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                  +14 Days
                </span>
              </span>
            </div>
          </div>

          {/* Main Browser Frame */}
          <div className="alloy-card rounded-2xl overflow-hidden shadow-2xl relative z-10">
            {/* Top Bar */}
            <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-slate-800 bg-[#080c16]">
              {/* Traffic Light Dots */}
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
              </div>

              {/* Centered Brand Pill */}
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#121829] border border-slate-800 text-xs font-medium text-slate-400 select-none">
                <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="text-slate-200 font-semibold text-xs tracking-wide">Daybit</span>
              </div>

              {/* Status */}
              <div className="text-[11px] font-medium text-slate-500 hidden sm:block">
                Today • Live Preview
              </div>
            </div>

            {/* Interactive Habit Rows */}
            <div className="p-5 sm:p-6 space-y-3">
              {/* Habit 1: Read 20 Pages */}
              <div className="bg-[#121829] border border-slate-800 rounded-xl p-3 sm:p-3.5 flex items-center justify-between gap-3 transition-all hover:border-slate-700">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                    <BookOpen className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-white truncate">Read 20 Pages</h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md text-indigo-300 bg-indigo-500/15 border border-indigo-500/20">
                        Learning
                      </span>
                      <span className="text-xs text-slate-400 font-medium">Target: 25 days/mo</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleToggleHabit('reading')}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                    habitState.reading
                      ? 'bg-indigo-500 border-2 border-indigo-500 shadow-[0_0_0_3px_rgba(99,102,241,0.2),0_2px_10px_rgba(99,102,241,0.35)]'
                      : 'border-2 border-slate-600 hover:border-indigo-400'
                  }`}
                  aria-label="Toggle habit"
                >
                  {habitState.reading && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
                </button>
              </div>

              {/* Habit 2: Morning Workout */}
              <div className="bg-[#121829] border border-slate-800 rounded-xl p-3 sm:p-3.5 flex items-center justify-between gap-3 transition-all hover:border-slate-700">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                    <Activity className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-white truncate">Morning Workout</h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md text-emerald-300 bg-emerald-500/15 border border-emerald-500/20">
                        Health
                      </span>
                      <span className="text-xs text-slate-400 font-medium">Target: 20 days/mo</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleToggleHabit('workout')}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                    habitState.workout
                      ? 'bg-emerald-500 border-2 border-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.2),0_2px_10px_rgba(16,185,129,0.35)]'
                      : 'border-2 border-slate-600 hover:border-emerald-400'
                  }`}
                  aria-label="Toggle habit"
                >
                  {habitState.workout && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
                </button>
              </div>

              {/* Habit 3: Drink 2L Water */}
              <div className="bg-[#121829] border border-slate-800 rounded-xl p-3 sm:p-3.5 flex items-center justify-between gap-3 transition-all hover:border-slate-700">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                    <Droplet className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-white truncate">Drink 2L Water</h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md text-cyan-300 bg-cyan-500/15 border border-cyan-500/20">
                        Daily Wellness
                      </span>
                      <span className="text-xs text-slate-400 font-medium">Target: 30 days/mo</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleToggleHabit('water')}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                    habitState.water
                      ? 'bg-cyan-500 border-2 border-cyan-500 shadow-[0_0_0_3px_rgba(6,182,212,0.2),0_2px_10px_rgba(6,182,212,0.35)]'
                      : 'border-2 border-slate-600 hover:border-cyan-400'
                  }`}
                  aria-label="Toggle habit"
                >
                  {habitState.water && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
                </button>
              </div>

              {/* Hint */}
              <div className="pt-1.5 text-center">
                <span className="text-xs font-medium text-slate-400">
                  👆 Tap circles to test checking off a habit
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Right Floating Badge */}
          <div className="absolute -bottom-4 -right-1 sm:-right-4 z-20 bg-[#0f1626] border border-slate-700/60 rounded-full px-3.5 py-1.5 shadow-xl flex items-center gap-2 text-xs transform hover:scale-105 transition-all duration-200">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
              100%
            </span>
            <span className="text-slate-300 font-medium text-xs">Private & Offline Ready</span>
          </div>
        </div>
      </main>

      {/* HOW IT WORKS SECTION */}
      <section
        id="how-it-works"
        className="max-w-4xl mx-auto px-4 sm:px-6 py-16 border-t border-slate-800/80 text-center"
      >
        <span className="text-xs font-bold text-amber-400 tracking-wider uppercase mb-2 block">
          Simple Routine
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-2.5">
          How it works in 3 simple steps
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto mb-10">
          No steep learning curve. Start building momentum in under a minute.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left">
          <div className="p-5 sm:p-6 rounded-2xl bg-[#0f1626] border border-slate-700/40 space-y-2.5 hover:border-slate-600 transition-colors">
            <span className="text-2xl font-black text-amber-400/80">01</span>
            <h3 className="text-sm sm:text-base font-bold text-white">Pick your habits</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Choose 3 to 5 habits that matter most. Set custom colors and monthly targets.
            </p>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-[#0f1626] border border-slate-700/40 space-y-2.5 hover:border-slate-600 transition-colors">
            <span className="text-2xl font-black text-amber-400/80">02</span>
            <h3 className="text-sm sm:text-base font-bold text-white">Check them off today</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Tap the circle as you complete each habit and keep your daily streak alive.
            </p>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-[#0f1626] border border-slate-700/40 space-y-2.5 hover:border-slate-600 transition-colors">
            <span className="text-2xl font-black text-amber-400/80">03</span>
            <h3 className="text-sm sm:text-base font-bold text-white">Watch consistency grow</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              See your month fill with checkmarks. Small daily actions turn into real change.
            </p>
          </div>
        </div>
      </section>

      {/* FOUR SIMPLE FEATURES */}
      <section id="features" className="max-w-5xl mx-auto px-4 sm:px-6 py-16 border-t border-slate-800/80">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-bold text-amber-400 tracking-wider uppercase mb-2 block">
            Simple by Design
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-2.5">
            Everything you need. Nothing you don’t.
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Four clean features built to help you stay on track every day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Feature 1 */}
          <div className="p-6 rounded-2xl bg-[#0f1626] border border-slate-700/40 hover:border-amber-500/40 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Calendar className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-amber-400 tracking-wider uppercase">
              MONTHLY GRID
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white mt-1 mb-2">
              See your month at a glance
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              See your entire month laid out in a clean calendar grid. Watching checkmarks connect gives you natural momentum to keep going.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 rounded-2xl bg-[#0f1626] border border-slate-700/40 hover:border-orange-500/40 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Lock className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-orange-400 tracking-wider uppercase">
              STAY HONEST
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white mt-1 mb-2">
              Focus on today, not yesterday
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Lock past dates with a tap so streaks stay 100% honest. When you build a streak in Daybit, you know you truly earned it.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 rounded-2xl bg-[#0f1626] border border-slate-700/40 hover:border-amber-500/40 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Flame className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-amber-400 tracking-wider uppercase">
              DAILY STREAKS
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white mt-1 mb-2">
              Celebrate every single win
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Feel a satisfying tap and celebratory confetti with every checkmark. Reorder habits smoothly to match your daily routine.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="p-6 rounded-2xl bg-[#0f1626] border border-slate-700/40 hover:border-emerald-500/40 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Smartphone className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-emerald-400 tracking-wider uppercase">
              ALWAYS READY
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white mt-1 mb-2">
              Works anywhere, even offline
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Installs to your home screen like a native app on iPhone and Android. 100% private and offline-ready, with optional cloud sync.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="max-w-2xl mx-auto px-4 sm:px-6 py-16 border-t border-slate-800/80">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-emerald-400 tracking-wider uppercase mb-2 block">
            FAQ
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
            The frequent questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Everything you need to know about Daybit.
          </p>
        </div>

        {/* Accordion Cards List */}
        <div className="space-y-3">
          {faqItems.map((item, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                onClick={() => toggleFaq(idx)}
                className="faq-item rounded-2xl border border-slate-800 bg-[#0f1626] p-4 sm:p-5 transition-all duration-200 hover:border-slate-700 cursor-pointer"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm sm:text-base font-semibold text-white">
                    {item.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-slate-800 text-emerald-400 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                  >
                    <span className="text-lg leading-none font-bold">+</span>
                  </div>
                </div>
                {isOpen && (
                  <div className="text-xs sm:text-sm text-slate-400 leading-relaxed mt-3 pt-2 border-t border-slate-800/60 animate-fade-in">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* CLOSING CALL TO ACTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#0f1626] border border-slate-700/50 shadow-xl relative overflow-hidden space-y-4">
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Ready to start your streak?
          </h2>

          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
            It takes less than 30 seconds to set up your first habit. Free forever.
          </p>

          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onStartApp}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-extrabold text-sm shadow-xl shadow-orange-500/25 hover:from-amber-600 hover:to-orange-600 transition-all transform active:scale-95 cursor-pointer"
            >
              Open Daybit App — Start Free
            </button>
          </div>

          {onOpenAuth && (
            <div className="pt-1.5">
              <button
                onClick={onOpenAuth}
                className="text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                Already tracking? Sign In to Sync →
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CLEAN MINIMALIST FOOTER */}
      <footer
        id="landing-footer"
        className="border-t border-slate-800/80 bg-[#070b14]/80 backdrop-blur-md transition-colors mt-12"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/60">
            {/* Left: Logo & Wordmark */}
            <div className="flex items-center gap-3">
              <img
                src="/icons/flame-emblem.png"
                alt="Daybit"
                className="w-8 h-8 object-contain drop-shadow-[0_0_12px_rgba(245,158,11,0.35)]"
              />
              <div className="flex items-center font-black tracking-[-0.035em] text-xl leading-none">
                <span className="text-white">Day</span>
                <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                  bit
                </span>
              </div>
              <span className="hidden sm:inline-block text-slate-700 mx-1">|</span>
              <span className="text-xs text-slate-400 hidden sm:inline-block">
                Build better habits, one day at a time.
              </span>
            </div>

            {/* Right: Inline Navigation Links */}
            <div className="flex items-center gap-6 text-xs font-medium text-slate-400">
              <a href="#how-it-works" className="hover:text-amber-400 transition-colors">
                How it works
              </a>
              <a href="#features" className="hover:text-amber-400 transition-colors">
                Features
              </a>
              <a href="#faq" className="hover:text-amber-400 transition-colors">
                FAQ
              </a>
              <button
                onClick={onStartApp}
                className="text-amber-400/90 hover:text-amber-300 font-semibold transition-colors cursor-pointer"
              >
                Start Free →
              </button>
            </div>
          </div>

          {/* Bottom Row: Copyright & Back to Top */}
          <div className="pt-6 flex items-center justify-between text-xs text-slate-500">
            <p>© 2026 Daybit</p>
            <button
              onClick={scrollToTop}
              className="hover:text-amber-400 transition-colors flex items-center gap-1.5 font-medium cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
