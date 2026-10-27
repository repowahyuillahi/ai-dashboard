# ai-dashboard — Sage · AI Property Dashboard Template

A React admin/dashboard template for property management with a built-in AI
assistant ("Sage"). Warm cream background, sage-green accents, white rounded
cards, a floating pill sidebar, and butter-smooth motion throughout.

**Live preview:** https://repowahyuillahi.github.io/ai-dashboard/

![stack](https://img.shields.io/badge/React-19-61dafb) ![vite](https://img.shields.io/badge/Vite-8-a855f7) ![tailwind](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8) ![motion](https://img.shields.io/badge/framer--motion-14-ff4d8d)

## Pages

| Page | What's inside |
| --- | --- |
| **Home** | 4 stat cards (mini bar chart, sparkline, icon chip, dark "Activity · Live" card), Balance card with floating Saves/Balance tiles over an area chart, Earnings card with a 35% semicircle gauge, profile card, credit-card stack preview, latest transfers, security card, and the big floating Sage orb with its speech bubble |
| **Wallet & transfers** | Available balance with trend chart, Money in / Money out tiles, black "New transfer" button, 3D credit-card stack (hover to fan, click to bring forward), card list, and a full transfer table with All / In / Out filter |
| **Analytics** | Revenue trend with range switcher (30D / 6M / 1Y), top-occupancy bars, booking-channel breakdown |
| **Properties** | 4 count-up stats + 8 property cards with flat building illustrations (per-property pastel palettes), occupancy rings, revenue/units/rating tiles, "Ask Sage about it" |
| **Guests / Bookings / Settings** | Searchable guest list, upcoming check-ins & weekly planner, working settings switches |

## Highlights

- **Ask Sage** — floating orb/pill opens a chat panel with a built-in demo brain
  (ask about *occupancy*, *revenue*, *balance*, *properties*…)
- **⌘K command palette** — search pages, properties and actions; the topbar
  search pill opens it too
- **Page transitions** — blur-crossfade between pages, staggered card entrances,
  count-up numbers on Properties, hover lift (`y: -5`) on cards
- **Pure-SVG visuals** — charts, gauge, rings and building illustrations are
  hand-drawn SVG components; no image assets
- **Lucide icons** everywhere, **Plus Jakarta Sans** typography

## Run locally

```bash
cd app
npm install
npm run dev        # http://127.0.0.1:5180/ai-dashboard/
npm run build      # production build → app/dist
npm run deploy     # publish dist to GitHub Pages (gh-pages branch)
```

## Structure

```
app/src/
  App.jsx               shell: topbar, sidebar, routing state, ⌘K, Sage panel
  data.js               all demo data (properties, transfers, cards, stats)
  components/
    Topbar.jsx  Sidebar.jsx  StatsCard.jsx  ActivityCard.jsx
    CreditStack.jsx  TransferList.jsx  BuildingArt.jsx  AvatarMemoji.jsx
    AskSage.jsx  CommandPalette.jsx
    charts/  Sparkline · MiniBars · BalanceChart · Gauge · Ring
  pages/
    Home.jsx  Wallet.jsx  Analytics.jsx  Properties.jsx  Others.jsx
```

Design notes and the frame-by-frame reference analysis live in
[`DESIGN_SPEC.md`](DESIGN_SPEC.md).
