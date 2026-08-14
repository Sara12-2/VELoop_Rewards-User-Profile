# VELOOP Rewards — User Profile Redesign

A completely reimagined `/user-profile` experience for **VELOOP Rewards**, combining gamification, fintech-grade trust, and rewards tracking into a single personal dashboard.

> 🚧 **Status:** In development — part of the VELOOP Rewards Internship Program (Task 14).

---

## 🎯 Project Overview

The redesigned profile brings together:

- **Identity** — who the user is (avatar, ID, email, referral code, level)
- **Rewards** — what they've earned (VEs, SVEs, Gems, Tokens, XP)
- **Progress** — how far they've come (level, XP, achievements)
- **Withdrawals** — what they've redeemed (requests, approvals, totals)
- **Referrals** — how they're growing the network
- **Quick Actions** — what they can do next

---

## ✨ Features

- [ ] Profile Hero (avatar, name, level, XP progress)
- [ ] Reward Assets — VEs, SVEs, Gems, Tokens, XP (distinct visual identity each)
- [ ] Level & Achievement progression
- [ ] Withdrawal Overview with status visualization
- [ ] Quick Actions (interactive hover cards)
- [ ] Referral Snapshot & milestone tracking
- [ ] Recent Activity feed
- [ ] Expandable Account Information
- [ ] Loading, empty, and error states
- [ ] Fully responsive (320px → 1920px+)
- [ ] Accessible (keyboard nav, focus states, no color-only indicators)

---

## 🛠 Tech Stack

- React.js + Vite
- Bootstrap
- CSS Modules
- React Hooks
- React Icons / Lucide React

---

## 📁 Folder Structure

```
src/
├── components/
│   ├── ProfileHero/
│   ├── ProfileIdentity/
│   ├── RewardAssets/
│   │   ├── VEsCard/
│   │   ├── SVEsCard/
│   │   ├── GemsCard/
│   │   ├── TokensCard/
│   │   └── XPCard/
│   ├── LevelProgress/
│   ├── AchievementCard/
│   ├── WithdrawalOverview/
│   ├── QuickActions/
│   ├── ReferralSnapshot/
│   ├── RecentActivity/
│   ├── AccountInformation/
│   └── ProfileEmptyState/
├── pages/
│   └── UserProfile/
├── data/
├── hooks/
├── assets/
└── styles/
```

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/<your-username>/veloop-rewards-user-profile.git
cd veloop-rewards-user-profile

# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

---

## 📱 Responsive Breakpoints

| Device | Width |
|---|---|
| Mobile | 320px+ |
| Tablet | 768px+ |
| Laptop | 1280px+ |
| Desktop | 1440px+ |
| Large screens | 1920px+ |

---

## 🖼 Screenshots

_Coming soon — will be added once core sections are built._

---

## 🔗 Live Demo

_Coming soon — will be deployed via Vercel._

---

## 👩‍💻 Author

**Sara** — Frontend Development Intern, VELOOP Rewards
