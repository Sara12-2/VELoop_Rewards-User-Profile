# VELOOP Rewards — User Profile Redesign

A completely reimagined `/user-profile` experience for **VELOOP Rewards**, combining gamification, fintech-grade trust, and rewards tracking into a single personal dashboard.

> Built as part of Task 14 — VELOOP Rewards Internship Program.

🔗 **Live Demo:** [your-vercel-url-here.vercel.app](#)
📦 **GitHub Repository:** [https://github.com/Sara12-2/VELoop_Rewards-User-Profile](#)

---

## 🎯 Project Overview

The redesigned profile reimagines the user's identity, rewards, progress, and activity as a single command center — moving away from a plain settings-style page toward a **digital wallet + achievement dashboard** experience.

It brings together:

- **Identity** — who the user is
- **Rewards** — what they've earned
- **Progress** — how far they've come
- **Achievements** — what they've unlocked
- **Withdrawals** — what they've redeemed
- **Referrals** — how they're growing the network
- **Actions** — what they can do next

The design direction intentionally balances two things that are often at odds: **gamification** (XP bars, levels, badges, milestones) and **fintech-grade trust** (clean typography, muted status colors, no neon/confetti/casino-style visuals).

---

## ✨ Features

### Identity & Profile
- Profile Hero with avatar (image / initials fallback), name, level badge, and animated XP progress bar
- Account status indicator ("Account Active ✓")
- Dedicated Profile Information cards — User ID, Email, Referral Code, Current Level
- Copy-to-clipboard on User ID and Referral Code with a "Copied!" toast

### Reward Assets
- Five distinct reward types — **VEs, SVEs, Gems, Tokens, XP** — each with its own color identity, icon, and animated count-up value
- Hover-triggered `[i]` info tooltips explaining each reward type

### Gamification
- Level Progress card with animated XP bar and "XP to next level" indicator
- Current Achievement card (unlocked badge + "View Achievements" CTA)
- Next Achievement preview with its own progress bar, to encourage return visits

### Withdrawals
- Withdrawal Overview with Total Requests, Approved, Pending, and Total Amount Withdrawn
- Status-based color coding (soft green / warm amber / muted red — no neon)
- Empty state for users with no withdrawal history yet

### Engagement
- Quick Actions grid — Get More Gems, Earn More Rewards, Watch Ads, Refer Friends, Redeem Rewards, Achievements — as interactive hover cards, not plain buttons
- Referral Snapshot with milestone progress bar and referral stats
- Recent Activity feed showing recent credits/debits

### UX & Trust
- Loading skeleton (shimmer effect) so the page is never blank while data loads
- Simulated fetch with error state + working "Try Again" retry
- Expandable Account Information section
- Empty states for Referral and Withdrawal sections when there's no data yet

### Accessibility
- Visible keyboard focus states (`:focus-visible`) throughout
- `role="progressbar"` with `aria-valuenow`/`aria-valuemin`/`aria-valuemax` on all progress bars
- `aria-label`s on icon-only buttons (copy buttons, info tooltips)
- Touch-friendly tap targets (44px+) on small icon buttons
- Respects `prefers-reduced-motion` for users who've disabled animations
- Status is never conveyed by color alone (icons/text accompany all status indicators)

### Responsive Design
Fully responsive from 320px mobile up through 1920px+ large screens, with layout order optimized per device rather than simply shrinking the desktop view.

---

## 🛠 Tech Stack

| Category | Technology |
|---|---|
| Framework | React.js (Vite) |
| Styling | CSS Modules + Bootstrap |
| Icons | Lucide React |
| State | React Hooks (`useState`, `useEffect`, `useCallback`) |
| Custom Hooks | `useCountUp`, `useCopyToClipboard` |

---

## 📁 Folder Structure

```
src/
├── components/
│   ├── ProfileHero/
│   ├── ProfileIdentity/
│   ├── RewardAssets/
│   │   ├── RewardAssets.jsx
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
│   ├── ProfileEmptyState/
│   └── ProfileSkeleton/
├── pages/
│   └── UserProfile/
├── data/
│   ├── userData.js
│   ├── rewardsData.js
│   ├── withdrawalData.js
│   └── activityData.js
├── hooks/
│   ├── useCountUp.js
│   └── useCopyToClipboard.js
├── assets/
├── index.css
├── App.jsx
├── App.css
└── main.jsx
```

Every component is self-contained with its own `.jsx` and `.module.css` pair, keeping styles scoped and avoiding one large monolithic file.

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/your-username/veloop-rewards-user-profile.git
cd veloop-rewards-user-profile

# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview the production build locally
npm run preview
```

---

## 🔄 Data Handling

All sections currently render from dummy data in `src/data/`, structured to mirror what a real API response would look like:

```js
{
  user: { name, email, userId, referralCode, level },
  rewards: { ves, sves, gems, tokens, xp },
  withdrawals: { totalRequests, pending, approved, totalAmount },
  activity: [...],
  referral: { code, totalReferrals, referralRewards, referralXP }
}
```

The page (`UserProfile.jsx`) fetches this through a simulated async function (`fetchProfileData`) with realistic loading and error states — swapping in a real API call means replacing that one function, with no changes needed to any component.

> ⚠️ Dummy values (e.g. 3,850 VEs, ₹2,450 withdrawn) are for frontend development only and do not represent real user data.

---

## 📱 Responsive Breakpoints

| Device | Width |
|---|---|
| Mobile | 320px+ |
| Tablet | 768px+ |
| Laptop | 1280px+ |
| Desktop | 1440px+ |
| Large screens | 1920px+ |

Mobile layout order: Hero → Identity → Reward Assets → Level/Achievements → Withdrawal Overview → Quick Actions → Referral → Recent Activity → Account Information.

---

## 🖼 Screenshots

| Desktop | Tablet | Mobile |
|---|---|---|
| _add screenshot_ | _add screenshot_ | _add screenshot_ |

| Profile Hero | Reward Assets | Level Progress |
|---|---|---|
| _add screenshot_ | _add screenshot_ | _add screenshot_ |

| Withdrawal Overview | Quick Actions | Loading State |
|---|---|---|
| _add screenshot_ | _add screenshot_ | _add screenshot_ |

---

## 🎨 Design Direction

- **Background:** `#161827` deep navy, consistent across the whole app
- **Palette:** gold, warm yellow, silver, soft blue, muted purple, soft green — no neon, no rainbow gradients
- **Philosophy:** "Premium Gamification" — motivating without tipping into casino-style visuals

---

## 👩‍💻 Author

**Sara** — Frontend Development Intern, VELOOP Rewards

---

## 📄 License

This project was built for internal evaluation as part of the VELOOP Rewards Internship Program.
