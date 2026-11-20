# 🔥 Daybit — Build Better Habits, One Day at a Time

> A clean, calm, and free habit tracker. No points. No coins. No clutter. Just your habits and your month.

![Daybit](https://img.shields.io/badge/version-0.1.0-orange?style=flat-square)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=flat-square&logo=tailwindcss)
![Supabase](https://img.shields.io/badge/Supabase-Cloud%20Sync-3ECF8E?style=flat-square&logo=supabase)
![PWA](https://img.shields.io/badge/PWA-Ready-5A0FC8?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

---

## ✨ What is Daybit?

**Daybit** is a minimal, local-first habit tracker built as a Progressive Web App (PWA). It gives you a clean monthly grid view of your habits — so you can see at a glance how consistent you've been.

No subscriptions. No sign-up required. Free forever.

---

## 🚀 Features

| Feature | Description |
|---|---|
| 📅 **Monthly Grid** | See your entire month in a clean calendar. Checkmarks connect to form streaks naturally. |
| 🔥 **Daily Streaks** | Satisfying confetti animation every time you check off a habit. |
| 🔒 **Accountability Lock** | Lock past dates so you can't fake streaks. Keep it honest. |
| 📱 **PWA — Installs like a native app** | Add to Home Screen on iPhone (Safari) or Android (Chrome). Works offline. |
| 🌙 **Dark / Light Mode** | Full dark and light theme support, picks your system preference. |
| 🔄 **Reorder Habits** | Drag and drop to arrange habits in your preferred order. |
| ☁️ **Optional Cloud Sync** | Sign in with Google or Email to sync habits across all your devices via Supabase. |
| 🔑 **100% Private** | No tracking. No ads. Data stays on your device unless you choose to sync. |
| 📊 **Stats Dashboard** | Monthly completion rate, perfect days, check-ins, and active habit count. |

---

## 🛠️ Tech Stack

```
Frontend     →  React 18 + TypeScript + Vite 6
Styling      →  Tailwind CSS v3 + custom animations
Backend      →  Supabase (Auth + PostgreSQL + Realtime)
Charts       →  Recharts
Icons        →  Lucide React
Animations   →  Canvas Confetti
PWA          →  Vite PWA Plugin + Service Worker
Deployment   →  Vercel
```

---

## 📂 Project Structure

```
daybit/
├── public/
│   └── icons/              # App icons & PWA assets
├── src/
│   ├── components/
│   │   ├── LandingPage.tsx      # Marketing / About page
│   │   ├── SetupScreen.tsx      # Onboarding (3-step setup)
│   │   ├── HabitGrid.tsx        # Main habit tracker grid
│   │   ├── HabitStats.tsx       # Monthly stats cards
│   │   ├── HabitChart.tsx       # Recharts visualizations
│   │   ├── Header.tsx           # Top nav + month navigator
│   │   ├── AddHabitModal.tsx    # Add new habit modal
│   │   ├── EditHabitModal.tsx   # Edit existing habit
│   │   ├── AuthModal.tsx        # Sign in / Sign up modal
│   │   ├── GreetingBanner.tsx   # Personalized greeting
│   │   ├── MobileBottomBar.tsx  # Mobile tab navigation
│   │   └── PWAInstallModal.tsx  # PWA install prompt
│   ├── data/
│   │   └── initialHabits.ts     # Default starter habits
│   ├── hooks/
│   │   ├── useTheme.ts          # Dark/light theme hook
│   │   └── usePWAInstall.ts     # PWA install prompt hook
│   ├── lib/
│   │   └── supabase.ts          # Supabase client + helpers
│   ├── types/
│   │   └── habit.ts             # TypeScript interfaces
│   ├── utils/
│   │   └── dateUtils.ts         # Date calculation helpers
│   ├── App.tsx                  # Root component + app state
│   └── main.tsx                 # Entry point
├── supabase/                    # Supabase migrations & config
├── index.html
├── vite.config.ts
├── tailwind.config.js
└── vercel.json
```

---

## 🏁 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- A Supabase project (optional — only needed for cloud sync)

### 1. Clone the repo

```bash
git clone https://github.com/rkushwaha-commits/daybit.git
cd daybit
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> **Note:** Without Supabase keys, the app still works fully in local/offline mode. Cloud sync is optional.

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📦 Build & Deploy

```bash
# Production build
npm run build

# Preview the production build locally
npm run preview
```

The app is configured for **Vercel** deployment via `vercel.json`. Just connect your GitHub repo to Vercel and it deploys automatically on every push.

---

## 🧭 App Flow

```
First Visit
    ↓
Landing Page (About Daybit)
    ↓  click "Open Daybit"
Setup Screen (3 steps: Welcome → Pick Habits → Theme)
    ↓  click "Start Tracking"
Main Habit Tracker ✅

Returning Visit
    ↓
Directly → Main Habit Tracker ✅

From Tracker → "About Daybit" (header)
    ↓
Landing Page → "Open Daybit" → Directly back to Tracker ✅
```

---

## 📱 Installing as a PWA

**iPhone (Safari):**
1. Open the app in Safari
2. Tap the **Share** button (box with arrow)
3. Select **"Add to Home Screen"**
4. Tap **Add** — done! Opens full-screen like a native app.

**Android (Chrome):**
1. Open the app in Chrome
2. Tap the **three-dot menu**
3. Select **"Install App"** or **"Add to Home Screen"**

---

## ☁️ Cloud Sync (Optional)

Daybit uses **Supabase** for optional cross-device sync:

- Sign in with **Google** or **Email/Password**
- Your habits are encrypted and synced to your private cloud
- Realtime sync — changes on one device appear instantly on another
- Sign out anytime — your data stays local

---

## 🗂️ Default Starter Habits

When you first set up Daybit, these 3 habits are pre-selected:

| Habit | Category | Target |
|---|---|---|
| 💧 Drink 2.5L Water | Health | 28 days/month |
| 🏃 Morning Workout / Walk | Fitness | 22 days/month |
| 📖 Read 20 Mins | Learning | 25 days/month |

You can keep, remove, or add your own custom habits at any time.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

1. Fork the repo
2. Create your branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

MIT © 2026 [Raj Kumar Kushwaha](https://github.com/rkushwaha-commits)

---

<div align="center">
  <strong>🔥 Daybit — Build better habits, one day at a time.</strong><br/>
  <sub>Free forever. No sign-up needed. Works offline.</sub>
</div>
