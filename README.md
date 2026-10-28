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
- **Page transitions** — light opacity/slide crossfade between pages (each page
  is code-split with `React.lazy`), staggered card entrances,
  count-up numbers on Properties, hover lift (`y: -5`) on cards
- **Pure-SVG visuals** — charts, gauge, rings and building illustrations are
  hand-drawn SVG components; no image assets
- **Lucide icons** everywhere, **Plus Jakarta Sans** typography

## Cara mengganti tema

Semua warna, radius kartu, dan bayangan kartu didefinisikan sebagai token di
blok `@theme` dalam `app/src/index.css` (sumber nilainya: `DESIGN_SPEC.md` §1).
Untuk mengubah tema, cukup edit nilai token di sana — misalnya `--color-cream`
untuk latar, `--color-sage-900`/`--color-sage-700` untuk aksen hijau, atau
`--radius-card`/`--shadow-card` untuk bentuk kartu — lalu build ulang.
Komponen tidak memakai hex literal; semuanya merujuk token
(`bg-surface-soft`, `text-ink-2`, `bg-up-bg`, `rounded-card`, `shadow-card`, …).
Satu-satunya pengecualian adalah palet ilustrasi per properti di
`app/src/data/properties.js`, yang memang data.

## Cara menambah halaman

1. Buat komponen halaman di `app/src/pages/` (ikuti pola halaman yang ada:
   preset gerak dari `app/src/lib/motion.js`, data dari `app/src/data/`).
2. Daftarkan di `app/src/App.jsx`: impor dengan `React.lazy()`, tambahkan ke
   peta `PAGE_COMPONENTS`, dan tambahkan judul/subjudulnya ke `PAGES` di
   `app/src/data/sage.js`.
3. Tambahkan ikon navigasinya ke daftar `NAV` di
   `app/src/components/Sidebar.jsx` bila halaman perlu muncul di rail samping.

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
  App.jsx               shell: topbar, sidebar, lazy routing, ⌘K, Sage panel
  data/                 demo data per domain (properties, wallet, home, guests,
                        bookings, analytics, sage) + index.js re-export
  lib/                  motion.js (preset gerak) & chart.js (helper SVG)
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
