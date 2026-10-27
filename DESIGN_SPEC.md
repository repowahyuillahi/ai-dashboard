# DESIGN_SPEC.md — Template React "ai-dashboard"

Spesifikasi desain hasil bedah frame-per-frame dari video Reel **"Ai Dashboard" (Code XR)**.
Produk di dalam video: dashboard manajemen properti dengan asisten AI bernama **Sage**, pengguna demo bernama **Codexr**.

Sumber bukti: `ref/frames/f01–f06.png` (frame utuh) + `ref/crop-f02/f04/f05/f06.png` (crop resolusi tinggi).
Konvensi penanda di dokumen ini:

- **(sampel)** = hex diambil langsung dari piksel frame (mode warna area solid, toleransi ±3 karena kompresi video).
- **(visual)** = perkiraan dari tampilan, tidak bisa disampel bersih (teks anti-alias / tertutup elemen lain).
- **⚠ tebakan** = tidak terlihat jelas di frame; keputusan wajar yang harus diambil developer.

> Catatan penting soal overlay kode di video: potongan kode JSX yang tampil di semua frame
> (`StatsCard`, `glass-card p-6 rounded-2xl`, `text-white/60`, `emerald-400`) adalah kode stok/template
> dan **tidak cocok** dengan UI final berwarna terang. Yang boleh dipercaya dari overlay itu hanya:
> (1) stack = React + **framer-motion** + **lucide-react** + Tailwind, (2) perilaku `whileHover={{ y: -5 }}`,
> (3) daftar ikon yang diimpor: `ShoppingBag, Users, DollarSign, ArrowUpRight`.
> Untuk warna & layout, **piksel frame selalu menang atas overlay kode**.

---

## 1. Token Warna

### 1.1 Warna dasar

| Token | Hex | Bukti | Pemakaian |
|---|---|---|---|
| `--bg` | `#EAE8E1` | sampel area kosong: `#E7E5DF` (kompresi video menggelapkan ±2 tingkat; nilai desain kemungkinan `#EFEEE9`–`#ECEAE3`) | Latar halaman (krim hangat kehijauan sangat muda) |
| `--surface` | `#FFFFFF` | sampel | Semua kartu, sidebar rail, pill topbar |
| `--surface-soft` | `#F3F1EF` | sampel | Tile di dalam kartu (Money in/out, tile statistik properti, wadah segmented control) |
| `--inset-sage` | `#EBEDE8` | sampel | Panel inset di belakang tumpukan kartu kredit (halaman Wallet) |
| `--ink` | `#1E2420` | visual (teks judul hampir hitam kehijauan) | Teks primer, judul halaman, angka besar |
| `--black` | `#1D1C1F` | sampel (tombol search bundar) | Tombol bundar search, lingkaran ikon aktif sidebar, tombol "New transfer", pill "Ask Sage" |
| `--ink-2` | `#5C665E` | visual | Teks sekunder (subjudul kartu, konteks transfer) |
| `--muted` | `#979D95` | visual | Label kecil, timestamp, placeholder search |
| `--hairline` | `#EFEDE8` | visual | Garis pemisah antar-baris transfer |

### 1.2 Hijau sage (warna merek)

| Token | Hex | Bukti | Pemakaian |
|---|---|---|---|
| `--sage-900` | `#5F7161` | konteks + dekat sampel `#5F7C6A` | Ujung gelap gradien kartu Activity, garis grafik, ring progres properti |
| `--sage-700` | `#6A8775` | sampel (tombol Add card) | Tombol primer hijau ("Add New Card", "+ Add card", "Update Your Security") |
| `--sage-500` | `#778873` | konteks | Logo asterisk, ikon chip, aksen menengah |
| `--sage-grad-a` | `#789581` | sampel (sudut kartu Activity) | Awal gradien kartu Activity (kiri-atas, lebih terang) |
| `--sage-grad-b` | `#5F7C6A` | sampel (badan kartu Activity) | Akhir gradien kartu Activity (kanan-bawah, lebih gelap) |
| `--sage-100` | `#E4EAE1` | sampel sekitar `#E3E8E2`–`#E7ECE8` | Latar chip naik (+%), lingkaran ikon Money in, chip statistik |
| `--sage-chip-text` | `#4E7A5A` | visual | Teks chip positif (+$240.00, +5.56%) |

Gradien kartu **Activity**: linear diagonal ±135°, `#789581` → `#5F7C6A`. Teks di atasnya putih.

### 1.3 Chip naik / turun

| Token | Hex | Pemakaian |
|---|---|---|
| `--up-bg` | `#E3EDE2` (sampel ≈ `#E7ECE8`) | Chip +5.56%, +5.6%, +$240.00, +$312.75 |
| `--up-text` | `#4E7A5A` (visual) | Teks chip positif |
| `--down-bg` | `#F8E6E1` (visual) | Chip −1.35%, −$120.50 |
| `--down-text` | `#C65A4A` (visual) | Teks & ikon panah chip negatif |
| `--peach-chip` | `#F5E7D3` (visual) | Lingkaran ikon "Earnings today" (ikon kantong uang) |

### 1.4 Orb AI "Sage"

Bola gradien 3D (±64–72px di halaman Home, versi mini ±22px di pill "Ask Sage"):

- Atas: biru langit `#3FC1F2`–`#38BDF8` (visual)
- Tengah: biru royal / indigo `#4F6DF5`–`#6366F1` (visual)
- Bawah: ungu violet `#6952FC` (**sampel** di tepi bawah orb), tepi bawah lain `#7C6FFA` (sampel)
- Dua "mata": kapsul vertikal putih murni ±6×14px, berjarak ±16px, di tengah orb.
- Bayangan/glow: elips lembut ungu-biru transparan di bawah orb (`box-shadow: 0 18px 35px rgba(99,91,255,.45)` — ⚠ tebakan nilai).
- Saat transisi halaman (f03) mata menyipit menjadi dua garis datar (kedip / "tidur").

### 1.5 Aksen pastel per properti (header kartu properti)

Semua header = gradien vertikal dari warna pastel (atas) memudar ke hampir putih (bawah).
Lingkaran "matahari" = lingkaran solid di kanan-atas header. Gedung utama selalu jendela kuning hangat `#F2C66D` (visual).

| # | Properti | Header gradien (atas) | Matahari | Gedung utama | Gedung samping |
|---|---|---|---|---|---|
| 1 | Ocean View Loft | `#CDEBDD` (sampel `#D2EBDF`) | `#9FEBC8` (sampel) | `#4A7462` (sampel) | `#7FA08D` |
| 2 | Maple Court | `#EEDCD3` (sampel) | `#F0C19E` (sampel) | `#86705A` (visual, cokelat taupe) | `#B39F8D` |
| 3 | Cedar Heights | `#D1E2EE` (sampel) | `#9FD1EF` (sampel) | `#496A84` (visual, slate navy) | `#7E97A8` |
| 4 | Palm Residency | `#EDE3D1` (sampel) | `#EFD29B` (sampel) | `#78654A` (sampel di campuran) | `#A08B6D` |
| 5 | Linden House | `#E2D8F3` (visual lavender) | `#B79CED` (visual ungu) | `#6E5A9E` (visual ungu) | `#9A86C4` |
| 6 | Harbor Point | `#D3EAF6` (visual biru es) | `#8FD0F0` (visual) | `#4E7A8C` (visual teal-slate) | `#83A7B5` |
| 7 | Olive Gardens | `#DFEDD2` (visual hijau pucat) | `#AEE59A` (visual) | `#6C8A52` (visual olive) | `#97B07E` |
| 8 | Birch Studios | `#F2DAE6` (visual pink) | `#F2A0C4` (visual) | `#8A5570` (visual mauve) | `#B18399` |

Ring okupansi: lintasan `#E7EDE6`, progres hijau sage gelap `#4E6B58` (visual), angka persen di tengah ring.

---

## 2. Tipografi

**Font (⚠ tebakan terkuat): "Plus Jakarta Sans"** — sans geometris-humanis, `g` satu lantai,
angka tabular rapi; alternatif sangat dekat: **Outfit** atau **Sora**. Hindari Inter (terlalu netral,
bentuk `a`/`g`-nya beda rasa). Satu famili untuk semua teks; bobot 400/500/600/700/800.

Skala relatif (patokan viewport desain ±1440px, dari proporsi crop):

| Elemen | Ukuran | Bobot | Catatan |
|---|---|---|---|
| Judul halaman ("Hey, Codexr!") | 26–28px | 700 | tracking −0.02em |
| Subjudul halaman | 13px | 400 | `--muted`/`--ink-2` |
| Angka saldo besar (Wallet) | 30px | 800 | `$34,101.94` |
| Angka nilai Earnings | 22px | 800 | |
| Nilai kartu statistik Home | 20px | 800 | `$8,216.24`, `230`, `$398.15`, `$116.99` |
| Nilai statistik mini Properties | 17–18px | 700 | `104 / 132`, `79%` |
| Judul kartu ("Balance", "Earnings") | 15px | 700 | |
| Nama properti | 14.5px | 700 | |
| Label statistik / label kecil | 11–12px | 500 | `--muted`, kadang huruf kapital tidak dipakai (sentence case) |
| Isi/teks sekunder | 12–13px | 400–500 | |
| Nama transfer | 13px | 600 | |
| Chip (+/− %) | 11px | 600–700 | pill penuh |
| Tooltip sidebar | 11.5px | 600 | putih di atas hitam |
| Placeholder search | 13px | 400 | |
| Tombol | 13px | 600 | |

---

## 3. Kerangka Global (semua halaman)

### 3.1 Topbar (tetap di semua halaman)

Dari kiri ke kanan:

1. **Logo**: asterisk/starburst hijau sage (`--sage-500`–`--sage-900`) — bentuknya seperti tanda
   bintang `*` dengan ±12–16 jari-jari tipis memanjang (SVG kustom; **bukan** ikon Lucide standar —
   ⚠ tebakan: SVG asterisk kustom). Ukuran ±34px.
2. **Judul halaman + subjudul** (berubah per halaman, lihat §4).
3. Kanan: **grup search** berbentuk pill putih memanjang (±330px, radius penuh, bayangan lembut):
   - placeholder `Search or ask Sage...`
   - chip kbd kecil abu muda `⌘K` (di frame terbaca sebagai chip "⌘K" mungil)
   - tombol bundar **hitam** `#1D1C1F` (±38px) berisi ikon `Search` putih, menempel di ujung kanan pill.
4. Tombol bundar putih (±44px) ikon `MessageCircle` hitam + **titik merah** di kanan-atas (badge tanpa angka).
5. Tombol bundar putih (±44px) ikon `Bell` hitam + **badge hijau angka `9`** (teks putih) di kanan-atas.

### 3.2 Sidebar rail

- Pil vertikal putih, lebar ±68px, radius penuh (ujung atas/bawah setengah lingkaran), melayang:
  margin kiri ±18px, mulai di bawah topbar, memanjang hampir sepenuh tinggi viewport.
  Bayangan sangat lembut. Ikon ±20px, jarak antar-ikon ±26–30px, warna ikon nonaktif abu-hijau tua `#6B7268` (visual).
- **State aktif**: ikon berada di dalam **lingkaran hitam penuh** (±44px) dengan ikon putih.
- **Hover**: muncul **tooltip pill hitam** di kanan ikon (teks putih 11.5px, radius ±8px, jarak ±10px dari rail).
- Urutan ikon (atas → bawah), nama Lucide adalah tebakan kecuali yang tooltipnya terbaca:

| # | Ikon (Lucide) | Tooltip | Bukti |
|---|---|---|---|
| 1 | `LayoutGrid` | ⚠ "Home" / "Overview" | aktif di halaman Home (f02) |
| 2 | `Wallet` | **"Wallet"** ✓ terbaca | f02, f03 |
| 3 | `ChartColumn` (alias `BarChart3`) | ⚠ "Analytics" | bentuk 4 batang naik |
| 4 | `Building2` | **"Properties"** ✓ terbaca | f05 |
| 5 | `Users` | ⚠ "Clients" / "Tenants" | dua sosok orang |
| 6 | `CalendarCheck` (alternatif `BriefcaseBusiness`) | ⚠ "Bookings" | ikon kalender/tas kecil berkait di atas |
| — | (spacer fleksibel) | | |
| 7 | `Sun` | ⚠ toggle tema terang/gelap | |
| 8 | `Settings` | ⚠ "Settings" | roda gigi |
| 9 | `LogOut` | ⚠ "Log out" | panah keluar dari kotak/pintu |
| 10 | **Avatar memoji** pengguna (±40px, lingkaran, latar krem) | — | selalu di dasar rail |

### 3.3 Orb Sage & pill "Ask Sage"

- Di halaman Home orb tampil **besar di tengah area konten** (melayang di atas kartu Balance/Earnings),
  disertai gelembung ucapan putih: `I'm Sage, your dashboard AI` — kata **Sage** ditebalkan.
- Di halaman Wallet & Properties orb menyusut menjadi **pill hitam fixed kanan-bawah**:
  lingkaran orb mini + teks `Ask Sage` (putih, 13px, 600). Pill punya bayangan besar & border putih tipis.
- Klik orb/pill membuka panel chat Sage — **panelnya tidak pernah tampil utuh di frame** (⚠ tebakan:
  panel meluncur dari kanan bawah, berisi riwayat chat + input).

### 3.4 Kartu secara umum

- Latar `#FFFFFF`, radius **±24px** (kartu besar) / ±20px (kartu statistik mini), padding 20–24px.
- Bayangan: sangat lembut, hangat — ⚠ tebakan `0 12px 32px rgba(96,100,84,.07)` + border 1px `rgba(0,0,0,.03)`.
- Grid konten: 12 kolom, gap ±18px, padding halaman ±28px.
- Hover kartu statistik: **naik −5px** (`whileHover={{ y: -5 }}`, terbukti dari overlay kode).

---

## 4. Halaman 1 — Home ("Hey, Codexr!")

Judul: `Hey, Codexr!` — Subjudul: `Explore information and activity about your property`

### 4.1 Baris statistik (4 kartu mini, lebar sama)

Struktur umum: label kecil `--muted` di atas, nilai 800 di bawah.
Tiga varian visual + satu varian gelap:

1. **Spent this month** — `$8,216.24`
   Varian *bar chart mini*: di kanan ada 5 batang vertikal (tinggi naik lalu turun di ujung),
   warna batang hijau sage gelap `#5F7161`, batang terakhir lebih muda/abu. Ujung batang membulat.
2. **New clients** — `230`
   Varian *ikon chip + sparkline*: lingkaran chip hijau pucat `#E4EAE1` (±44px) berisi ikon `Users`
   hijau tua; label kecil di kanannya terbaca dua baris: `New clients` lalu `230`;
   kata `today` tidak ada di kartu ini. Di kanan: **sparkline** garis tipis abu-sage bergelombang (±70×24px).
   (Label terbaca persis: baris kecil pertama `New clients`, di bawahnya nilai `230`.)
3. **Earnings** `today` — `$398.15`
   Varian *ikon chip saja*: lingkaran chip **peach** `#F5E7D3` berisi ikon kantong uang
   (⚠ tebakan: SVG kantong kustom / `HandCoins`). Label dua baris: `Earnings` + kata `today`
   lebih kecil & lebih muda di sebelahnya; nilai `$398.15`.
   Pola label sama terlihat di kartu 2 Properties ("Revenue this month").
4. **Activity** — kartu **hijau gelap gradien** (satu-satunya kartu gelap di baris ini):
   - Baris atas: teks `Activity` (putih) + chip mini translucent `• Live` (titik putih + teks 10px).
   - Nilai `$116.99` (putih, 800), di bawahnya `Net profit today` (putih 70%, 11px).
   - Kanan: **sparkline putih** lebih besar & berombak (±90×30px).

### 4.2 Baris tengah

#### Kartu Balance (lebar 6/12)

- Header: `Balance` (700) + ikon `CircleCheck` kecil + teks `On track` (12px, `--ink-2`);
  kanan: pemilih `Monthly` dengan `ChevronDown` (13px, `--muted`).
- Dua tile melayang di atas grafik (latar putih, bayangan lembut, radius ±14px, padding 12–16px):
  - Tile **Saves**: label `Saves`, nilai `29.69%`, chip kanan `--down-bg` teks `−1.35%`.
  - Tile **Balance**: label `Balance`, nilai `$36,973`, chip `--up-bg` teks `+5.56%`.
- Grafik **garis** hijau sage (`#5F7161`, ±2px, tanpa fill): naik landai → puncak → **turun tajam
  membentuk lembah V** di ±35% lebar → naik bertahap ke kanan. Tanpa sumbu/grid.
- Di frame f02, orb Sage melayang menutupi ujung kanan grafik + gelembung ucapannya menutupi
  sebagian kartu Earnings.

#### Kartu Earnings (lebar 3/12)

- Judul `Earnings`.
- Label kecil kanan-atas area nilai: `revenue this month` (`--muted`, 11px).
- Nilai: `$10,842.74` (digit awal sebagian tertutup gelembung Sage di f02 — dibaca `$10,842.74`).
- Teks: `Profit is 2% more than last month` (12px, `--ink-2`).
- **Gauge setengah lingkaran (180°)** di bawah: lintasan `#E6EDE4`, isi gradien hijau sage
  (`#8FAE94` → `#5F7161`) sebesar **35%**, ada jarum/tanda kecil di ujung busur.
  Di tengah bawah gauge: `35%` (18px, 800) dan `of $21,000` (10.5px, `--muted`).

#### Kartu Profil (lebar 3/12)

- Avatar memoji besar (±84px) di tengah atas: pria berjanggut, **kacamata hitam kuning/oranye**,
  kaus hijau tua, latar lingkaran krem `#F1E8D8` (visual) + **cincin tipis** melingkar di luarnya
  (border 1.5px `#D8DCD2` dengan offset — ⚠ tebakan detail cincin).
- Nama `Codexr` (16px, 700, center), email `codexr@gmail.com` (12px, `--muted`, center).
- Baris statistik 3 kolom (label 11px `--muted` di atas, angka 16px 700 di bawah):
  `Projects 17` · `Followers 182` · `Following 21`.

### 4.3 Baris bawah

#### Kartu "Available Credit Card in Wallet" (lebar 6/12)

- Judul dua baris: `Available Credit Card in Wallet` (16px, 700).
- Teks (12.5px, `--ink-2`, persis dari frame):
  `3 cards linked to payouts and expenses. Hover to fan the stack, tap any card to bring it to the front.`
- Tombol hijau sage (`--sage-700`, pill, teks putih): `Add New Card` + ikon `Plus`.
- Kanan: panel inset `--surface-soft` (radius ±18px) berisi visual kartu kredit putih miring 3D
  (perspektif ±−12°): nomor timbul `1234  1234  1234  1234` abu, logo **Mastercard**
  (dua lingkaran merah-oranye) di kanan-bawah kartu. Di Home hanya kartu teratas yang jelas;
  tumpukan penuh terlihat di halaman Wallet.

#### Kartu "Your Transfers" (lebar 3/12)

- Header: judul `Your Transfers` + tombol bundar abu sangat muda berisi `ArrowUpRight` di kanan.
- Tiap baris: **batang aksen vertikal hitam** ±3×26px di kiri, lalu nama (600) & waktu (11px `--muted`),
  chip nominal pill di kanan:
  1. `From Anna Jones` — `Today, 16:21` — chip hijau `+$240.00`
  2. `To Carlos Brown III` — `Today, 15:24` — chip merah muda `−$120.50`
  3. `From Joel Cannan` — `Today, 13:29` — chip hijau `+$312.75`

#### Kartu keamanan (lebar 3/12)

- Ikon besar di tengah atas: **panah melingkar** hijau sage (±36px; ⚠ tebakan: `RefreshCcw`/`RotateCw`
  kustom — bentuknya busur lingkaran terputus dengan ujung panah).
- Judul: `Keep you safe!` (15px, 700, center).
- Teks: `Update your security password` (12px, `--muted`, center).
- Tombol hijau sage pill (center): `Update Your Security`.

---

## 5. Halaman 2 — Wallet ("Wallet & transfers")

Judul: `Wallet & transfers` — Subjudul: `Cards, balance and every dollar in or out`
Ikon sidebar aktif: `Wallet`. Orb menjadi pill `Ask Sage` kanan-bawah.

### 5.1 Baris atas

#### Kartu Available balance (lebar ±5/12)

- Label `Available balance` (12px, `--muted`).
- Nilai `$34,101.94` (30px, 800).
- Chip `--up-bg` `+5.6%` + teks `in the last 30 days` (12px, `--muted`).
- Grafik garis hijau sage **dengan fill gradien** di bawah garis (sage ±12% → transparan);
  bentuk gelombang sama dengan grafik Balance di Home (ada lembah V khas di ±35%).
- Dua tile `--surface-soft` berdampingan (radius ±16px):
  - **Money in**: lingkaran `#E4EAE1` ikon `ArrowDown` hijau; label `Money in`; nilai `$1,605.15` (700).
  - **Money out**: lingkaran `#F8E6E1` ikon `ArrowUpRight` merah muda; label `Money out`; nilai `$892.80`.
- Tombol **hitam** selebar kartu (radius ±14px, teks putih): ikon `Send` (pesawat kertas) + `New transfer`.

#### Kartu "Cards in wallet" (lebar ±7/12)

- Header: judul `Cards in wallet` (700); subjudul `3 linked · tap a card to bring it forward` (12px, `--muted`);
  kanan: tombol hijau `+ Add card` (ikon `Plus` + teks, pill).
- Panel inset `#EBEDE8` (radius ±20px, tinggi ±230px) berisi **tumpukan 3 kartu kredit 3D**
  (miring perspektif, bayangan lembut besar), dari depan ke belakang:
  1. **Putih/perak** — teks kecil kiri-atas nama pemegang `LANA STEINER`; kanan-atas `Master Card`
     + angka mungil (tidak terbaca); tengah: `1234  1234  1234  1234`; logo Mastercard di tepi kanan.
  2. **Hijau sage** (`#778873`–`#6A8775`) — hanya tepi kanan & logo Mastercard yang menyembul.
  3. **Hitam** (`#232323`) — paling belakang/bawah, tepi kanan + logo Mastercard menyembul.
- Di bawah panel: **3 baris ringkas kartu** (tile `--surface-soft`, radius ±14px), masing-masing:
  thumbnail mini kartu (sesuai warna kartu) + `•••• 1234` (700, 13px) + baris kecil `--muted`
  `Nama · MM/YY` + ikon `Trash2` abu di kanan:
  1. (thumb putih) `•••• 1234` — `Lana Steiner · 06/…` (tahun terpotong di frame)
  2. (thumb hijau) `•••• 1234` — `Olivia Rhye · 09/27`
  3. (thumb hitam) `•••• 1234` — `Phoenix Baker · 11/…` (tahun terpotong di frame)

### 5.2 Kartu "All transfers" (lebar penuh)

- Header: judul `All transfers` (17px, 700); subjudul `Money in from bookings, money out to vendors`.
- Kanan: **segmented control** pill `--surface-soft`: opsi `All` (terpilih: pill putih + lencana
  hitungan abu `10`), `In`, `Out` (teks `--muted`).
- Baris transfer (dipisah hairline), pola: lingkaran ikon ±36px → nama + konteks → kanan: waktu + chip:
  1. ikon `ArrowDown` (lingkaran hijau pucat) — `From Anna Jones` / `Booking · Ocean View Loft` —
     `Today, 16:21` — chip hijau `+$240.00`
  2. ikon `ArrowUpRight` (lingkaran merah muda) — `To Carlos Brown III` / `Cleaning service` —
     `Today, 15:24` — chip merah muda `−$120.50` (sebagian tertutup pill Ask Sage di f04)
  3. ikon `ArrowDown` — `From Joel Cannan` / `Booking · Maple Court` —
     `Today, 13:29` — chip hijau `+$312.75`
- Hanya 3 baris teratas yang terlihat di frame; daftar penuh (10 item sesuai lencana) tidak tampil — ⚠ tebakan sisanya mengikuti pola sama.

---

## 6. Halaman 3 — Properties ("Your properties")

Judul: `Your properties` — Subjudul: `Occupancy, revenue and ratings per building`
Ikon sidebar aktif: `Building2` (tooltip `Properties`). Orb = pill `Ask Sage` kanan-bawah.

### 6.1 Baris statistik mini (4 kartu, lebar sama)

Pola: chip ikon persegi membulat (±38px, radius 12px, latar `#EDF1EA`, ikon hijau tua 18px) di kiri;
di kanannya label kecil `--muted` di atas nilai (700). Nilai final (f06):

| Ikon (⚠ tebakan Lucide) | Label | Nilai final |
|---|---|---|
| `Building2` | `Properties` | `8` |
| `CircleCheck` | `Units booked` | `104 / 132` |
| `TrendingUp` | `Occupancy` | `79%` |
| kantong uang (sama seperti Earnings) | `Revenue this month` | `$14,474` |

Nilai **tengah-animasi** yang tertangkap di f05 (count-up sedang berjalan, kartu masih blur):
`Properties 6`, `Units booked 69 / 132`, `Occupancy 44%`, Revenue buram ±`$8.0xx` (tidak pasti).
→ Statistik halaman ini **menghitung naik (count-up)** dari nilai awal ke nilai final saat halaman dibuka.

### 6.2 Grid kartu properti (4 kolom × 2 baris)

Anatomi satu kartu (latar putih, radius ±24px, padding ±10px):

1. **Header ilustrasi** (radius ±18px, tinggi ±120px): gradien pastel per properti (§1.5);
   **matahari** = lingkaran solid ±26px di kanan-atas; **ilustrasi gedung flat** menempel di dasar header:
   gedung utama (persegi, sudut atas membulat ±6px) dengan **grid jendela 3 kolom × 4–5 baris**
   berwarna kuning `#F2C66D`, sebagian jendela lebih redup (variasi acak); di kanan gedung utama ada
   **gedung pendamping** lebih pendek & lebih pucat (tanpa jendela jelas). Gaya: flat, tanpa garis tepi,
   bayangan nyaris nol.
2. **Nama + kota**: nama (700) di kiri; di bawahnya ikon `MapPin` 11px + nama kota (12px, `--muted`).
3. **Ring okupansi** (±52px) di kanan nama: persen di tengah (12.5px, 700).
4. **3 tile statistik** `--surface-soft` (radius ±12px, padding 8–10px), label 10.5px `--muted` di atas nilai 13px 700:
   `This month $…` · `Units a/b` · `Rating ★ x.x` (bintang kuning `Star` terisi).
5. **Tombol ghost** selebar kartu (border 1px `#E7EAE3`, radius ±12px, teks 12.5px):
   ikon `Sparkles` kecil + `Ask Sage about it`.

Data 8 properti (persis dari f06/crop-f06; baris 2 bagian bawah terpotong frame):

| Properti | Kota | Ring | This month | Units | Rating |
|---|---|---|---|---|---|
| Ocean View Loft | Lisbon | 92% | $2,790 | 11/12 | ★ 4.9 |
| Maple Court | Toronto | 79% | $2,660 | 19/24 | ★ 4.7 |
| Cedar Heights | Denver | 89% | $2,236 | 16/18 | ★ 4.8 |
| Palm Residency | Dubai | 73% | $1,984 | 22/30 | ★ 4.6 |
| Linden House | Berlin | 90% | ⚠ terpotong frame | ⚠ | ⚠ |
| Harbor Point | Sydney | 75% | ⚠ terpotong frame | ⚠ | ⚠ |
| Olive Gardens | Athens | 71% | ⚠ terpotong frame | ⚠ | ⚠ |
| Birch Studios | Oslo | ⚠ tertutup pill Ask Sage | ⚠ terpotong frame | ⚠ | ⚠ |

---

## 7. Komponen — ringkasan spesifikasi

| Komponen | Spesifikasi kunci |
|---|---|
| `Sidebar` | Rail pil putih 68px; ikon 20px; aktif = lingkaran hitam 44px + ikon putih; tooltip pill hitam saat hover; avatar memoji di dasar |
| `Topbar` | Logo asterisk sage + judul/subjudul per halaman; search pill putih + chip `⌘K` + tombol bundar hitam `Search`; tombol bundar putih `MessageCircle` (titik merah) & `Bell` (badge hijau `9`) |
| `StatsCard` (Home) | Label + nilai; 3 varian visual (bar mini / chip+sparkline / chip saja) + 1 varian gelap gradien (Activity, sparkline putih, chip `• Live`); hover naik −5px |
| `MiniStat` (Properties) | Chip ikon persegi `#EDF1EA` + label di atas nilai; nilai count-up |
| `BalanceCard` | Header + status `On track` + pemilih `Monthly`; 2 tile melayang (Saves 29.69% −1.35% / Balance $36,973 +5.56%); grafik garis sage tanpa sumbu, lembah V khas |
| `EarningsCard` | Nilai revenue + gauge setengah lingkaran 35% dari $21,000 |
| `ProfileCard` | Memoji + nama + email + 3 statistik (Projects/Followers/Following) |
| `CreditCardStack` | Tumpukan 3 kartu miring 3D (putih/hijau sage/hitam, semua Mastercard); hover = kipas membuka; klik = kartu ke depan; di Wallet ditambah panel inset + 3 baris ringkas ber-ikon `Trash2` |
| `TransferList` | Dua pola baris: Home = batang aksen vertikal + chip; Wallet = lingkaran ikon arah + konteks booking/vendor + filter All/In/Out |
| `SecurityCard` | Ikon panah melingkar + `Keep you safe!` + tombol `Update Your Security` |
| `PropertyCard` | Header pastel + matahari + gedung flat jendela kuning; ring okupansi; 3 tile; tombol `Ask Sage about it` |
| `SageOrb` | Bola gradien biru→ungu bermata putih; mode besar (Home, + gelembung ucapan) & mode pill hitam `Ask Sage` (halaman lain) |
| `AskSagePanel` | ⚠ Tidak terlihat di frame — asumsikan panel chat meluncur dari kanan-bawah |

---

## 8. Interaksi & Motion (yang terlihat / terbukti dari frame)

1. **Pemuatan awal (f01)**: kartu muncul sebagai blok putih kosong (skeleton) dengan ikon sidebar
   pudar, lalu konten memudar masuk — halaman dirender bertahap dengan efek blur→tajam.
2. **Hover kartu statistik**: kartu **naik −5px** (framer-motion `whileHover={{ y: -5 }}` — terbukti dari overlay kode).
3. **Tooltip sidebar**: pill hitam muncul di kanan ikon saat hover (terlihat di f02 `Wallet`, f05 `Properties`),
   kemungkinan dengan animasi fade+geser kecil (⚠ tebakan easing).
4. **Transisi antar-halaman (f03)**: konten lama memudar keluar, **judul halaman blur-crossfade**
   (`Hey, Codexr!` → `Wallet & transfers`), orb Sage **bergerak ke tengah layar** dan matanya
   **menyipit jadi garis** (kedip), lalu halaman baru masuk dan orb menyusut jadi pill `Ask Sage`.
5. **Orb melayang**: animasi bobbing halus naik-turun + glow berdenyut (terlihat dari bayangan
   elips di bawah orb pada f01–f03).
6. **Count-up statistik Properties (f05 → f06)**: angka menghitung naik (6→8, 69→104, 44%→79%,
   revenue → $14,474); kartu properti masuk **berjenjang** — di f05 header pastel baris 2 sudah tampil
   tapi gedung & teksnya belum (fade/slide masuk menyusul).
7. **Tumpukan kartu kredit**: sesuai teks di kartunya sendiri — **hover membuat tumpukan membuka
   seperti kipas**, **klik/ketuk membawa kartu itu ke depan** (rotasi urutan tumpukan).
8. **Grafik & gauge**: ⚠ tebakan wajar — garis grafik tergambar (draw-in) saat kartu masuk;
   gauge Earnings menyapu dari 0% ke 35%.
9. **⌘K**: menekan `Cmd/Ctrl+K` diasumsikan membuka palet pencarian/ask-Sage (⚠ tidak terlihat di frame;
   chip `⌘K` di search pill adalah satu-satunya bukti).
10. **Pill Ask Sage**: mengambang tetap (fixed) kanan-bawah di halaman Wallet & Properties;
    di f06 kursor terlihat mengklik orb mini di dalamnya — klik membuka panel chat Sage (⚠ panel tak terlihat).

---

## 9. Daftar Tebakan (tidak terlihat jelas di frame)

1. Font persisnya — tebakan terkuat Plus Jakarta Sans; alternatif Outfit/Sora.
2. Nilai hex `--bg` persis (kompresi video): sampel `#E7E5DF`, niat desain kemungkinan `#EFEEE9`.
3. Nama/tooltip ikon sidebar #1, #3, #5, #6 dan fungsi ikon #6 (`CalendarCheck` vs `BriefcaseBusiness`).
4. Ikon kantong uang (Earnings/Revenue) — bisa SVG kustom, `HandCoins`, atau `CircleDollarSign` versi lain.
5. Ikon keamanan (panah melingkar) — bisa `RefreshCcw` yang digambar ulang.
6. Angka tahun kedaluwarsa kartu baris 1 & 3 di Wallet (terpotong: `06/…`, `11/…`); angka mungil di kartu kredit teratas.
7. Statistik 4 properti baris kedua (terpotong frame) & ring Birch Studios (tertutup pill Ask Sage).
8. Bentuk panel Ask Sage, isi palet ⌘K, dan halaman untuk ikon sidebar #3, #5, #6 (tidak pernah ditampilkan).
9. Detail cincin di sekeliling avatar profil & nilai bayangan kartu (diestimasi dari kesan visual).
10. Perilaku responsif/mobile — video hanya menampilkan tampilan desktop lebar.

---

## 10. Checklist fidelitas untuk developer

- [ ] Latar krim `#EAE8E1`-ish, kartu putih murni, radius kartu 24px, gap grid ±18px.
- [ ] Sidebar pil putih dengan lingkaran hitam untuk ikon aktif + tooltip hitam.
- [ ] Topbar: asterisk sage, search pill + `⌘K` + tombol hitam, chat titik merah, bell badge hijau `9`.
- [ ] Home = grid 6/3/3 dua baris + baris statistik 4 kartu (1 gelap gradien).
- [ ] Orb Sage gradien biru→ungu bermata putih; gelembung `I'm Sage, your dashboard AI`.
- [ ] Wallet = saldo + tumpukan 3 kartu (putih/sage/hitam) + All transfers berfilter.
- [ ] Properties = 4 statistik count-up + grid 4×2 kartu pastel bergaya flat-illustration.
- [ ] Motion: hover −5px, transisi halaman blur + orb ke tengah, count-up, tumpukan kartu kipas.
