# 🎯 VALORANT DESIGN GUIDELINES
## Near-Future Tactical Visual System — PPT Slide Edition

> *"Precision is beautiful. Every pixel is a decision. Every element has a mission."*

Dokumen ini adalah panduan desain komprehensif yang terinspirasi dari identitas visual **VALORANT** oleh Riot Games. Dibangun untuk memandu pembuatan slide presentasi (PPT) dengan karakter **near-future tactical**, sentuhan **urban graffiti/cyberpunk ringan**, bentuk **geometris bersudut tajam**, dan UI yang **minimalis namun berani (edgy)**.

---

## BAB 1 — FILOSOFI & VISI DESAIN

### 1.1 Manifesto Visual

Desain VALORANT bukan sekadar estetika — ia adalah **senjata komunikasi**. Setiap elemen visual harus terasa seperti briefing misi: **tajam, presisi, tanpa noise**.

Tiga pilar utama:

| Pilar | Deskripsi |
|---|---|
| **TACTICAL PRECISION** | Setiap elemen ditempatkan dengan tujuan. Tidak ada dekorasi tanpa fungsi. Grid yang ketat, alignment yang absolut. |
| **CONTROLLED CHAOS** | Di balik struktur yang rapi, ada energi liar — spray paint, glitch, distorsi terkontrol. Keteraturan yang menyimpan pemberontakan. |
| **BOLD MINIMALISM** | Sedikit elemen, dampak maksimal. Warna berani, tipografi besar, white space yang agresif. |

### 1.2 Mood & Tone

```
KEYWORDS:
Futuristik · Taktis · Urban · Edgy · Presisi · Berani · Gelap · Berenergi
```

- **Bukan** lembut, organik, atau playful
- **Bukan** corporate-clean atau steril
- **Adalah** tajam, gelap, percaya diri, dan penuh intensitas
- Bayangkan: *briefing room seorang agent di markas rahasia, dengan layar hologram dan grafiti di dinding*

### 1.3 Prinsip Desain

1. **"LESS IS LETHAL"** — Kurangi elemen, tingkatkan dampak. Satu headline besar lebih mematikan dari sepuluh bullet point.
2. **"ANGULAR OVER ORGANIC"** — Gunakan sudut 45° dan potongan diagonal. Hindari lengkungan halus.
3. **"DARK CANVAS, BRIGHT STRIKE"** — Latar gelap sebagai arena, warna terang sebagai serangan visual.
4. **"EVERY SLIDE IS A ROUND"** — Setiap slide harus punya satu objektif yang jelas, seperti satu ronde dalam game.

---

## BAB 2 — PALET WARNA

### 2.1 Warna Primer (Core Colors)

```css
:root {
  /* === CORE PALETTE === */
  --val-red:        #FF4655;   /* VALORANT Red — Warna signature. Aksen utama, CTA, highlight kritis */
  --val-dark:       #0F1923;   /* Abyss Dark — Background utama, canvas gelap */
  --val-black:      #000000;   /* Void Black — Elemen terdalam, shadow, overlay */
  --val-white:      #ECE8E1;   /* Warm Ivory — Teks utama di atas dark bg, bukan putih murni */
}
```

### 2.2 Warna Sekunder (Support Colors)

```css
:root {
  /* === SECONDARY PALETTE === */
  --val-teal:       #00D4AA;   /* Radianite Teal — Data, statistik, elemen positif */
  --val-cyan:       #1AFBF0;   /* Neon Cyan — UI accent, garis scanner, efek hologram */
  --val-gold:       #F5A623;   /* Rank Gold — Penekanan premium, badge, highlight spesial */
  --val-steel:      #3B4F5B;   /* Gunmetal Steel — Border, separator, elemen sekunder */
}
```

### 2.3 Warna Utilitas

```css
:root {
  /* === UTILITY === */
  --val-gray-100:   #768691;   /* Smoke Gray — Body text sekunder, caption */
  --val-gray-200:   #2C3E4A;   /* Charcoal — Card background, panel */
  --val-gray-300:   #1A2730;   /* Deep Navy — Subtle divider, layering */
  --val-gradient-red: linear-gradient(135deg, #FF4655 0%, #BD3944 100%);
  --val-gradient-dark: linear-gradient(180deg, #0F1923 0%, #000000 100%);
  --val-gradient-teal: linear-gradient(135deg, #00D4AA 0%, #008F73 100%);
}
```

### 2.4 Aturan Penggunaan Warna

| Konteks | Warna | Catatan |
|---|---|---|
| Background slide | `--val-dark` atau `--val-black` | 80% slide harus ber-bg gelap |
| Background alternatif | `--val-red` (full bleed) | Maksimal 1–2 slide per deck |
| Headline text | `--val-white` | Di atas background gelap |
| Headline di bg merah | `--val-black` atau `--val-white` | Sesuaikan kontras |
| Aksen / highlight keyword | `--val-red` | Gunakan untuk 1–3 kata per slide |
| Data / angka statistik | `--val-teal` atau `--val-cyan` | Agar terasa "digital/tactical" |
| Border & garis dekoratif | `--val-steel` | Tipis: 1–2px |
| Caption / sub-text | `--val-gray-100` | Jangan terlalu terang |

> ⚠️ **ATURAN KONTRAS:** Rasio kontras minimum 4.5:1 untuk teks body, 3:1 untuk teks display besar. `--val-red` di atas `--val-dark` = ✅ Aman. `--val-red` di atas `--val-gray-200` = ❌ Hindari.

---

## BAB 3 — TIPOGRAFI

### 3.1 Font Primer — Display / Headline

```
FONT: "Tungsten" atau "Druk Wide"
FALLBACK: "Anton", "Impact", "Arial Black", sans-serif
```

- **Penggunaan:** Judul slide, headline besar, statement utama
- **Style:** Bold / Black (900)
- **Case:** `text-transform: uppercase;` — SELALU KAPITAL
- **Line-height:** `0.85 – 0.95` (sangat rapat)
- **Letter-spacing:** `-0.02em` hingga `0.05em`
- **Ukuran:** 60–120pt untuk headline utama (skala sesuai viewport)

```css
.slide-headline {
  font-family: "Tungsten", "Anton", "Impact", sans-serif;
  font-weight: 700;
  font-size: clamp(3rem, 8vw, 7.5rem);
  text-transform: uppercase;
  line-height: 0.9;
  letter-spacing: 0.02em;
  color: var(--val-white);
}
```

> 💡 **Alternatif gratis:** Gunakan **"Anton"** (Google Fonts) sebagai pengganti Tungsten, atau **"Bebas Neue"** untuk karakter yang lebih bersih.

### 3.2 Font Sekunder — Body / Subheading

```
FONT: "DIN 2014" atau "Inter"
FALLBACK: "Roboto", "Helvetica Neue", sans-serif
```

- **Penggunaan:** Body text, deskripsi, caption, label
- **Style:** Regular (400) untuk body, Medium (500) untuk label, SemiBold (600) untuk subheading
- **Case:** Sentence case atau UPPERCASE untuk label kecil
- **Line-height:** `1.5 – 1.7`
- **Letter-spacing:** `0` hingga `0.08em` (untuk label uppercase)
- **Ukuran:** 14–20pt untuk body, 10–12pt untuk caption

```css
.slide-body {
  font-family: "DIN 2014", "Inter", "Roboto", sans-serif;
  font-weight: 400;
  font-size: clamp(0.875rem, 1.2vw, 1.25rem);
  line-height: 1.6;
  color: var(--val-gray-100);
}

.slide-label {
  font-family: "DIN 2014", "Inter", sans-serif;
  font-weight: 600;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--val-teal);
}
```

### 3.3 Font Aksen — Tactical / Monospace

```
FONT: "Share Tech Mono" atau "JetBrains Mono"
FALLBACK: "Courier New", monospace
```

- **Penggunaan:** Kode, data mentah, label taktis, countdown, nomor slide
- **Ukuran:** 12–16pt
- **Efek opsional:** Glow tipis `text-shadow: 0 0 8px rgba(26,251,240,0.3);`

### 3.4 Hierarki Tipografi (Cheat Sheet)

| Level | Font | Weight | Size | Transform | Warna |
|---|---|---|---|---|---|
| H1 — Hero | Tungsten/Anton | 700–900 | 72–120pt | UPPERCASE | `--val-white` |
| H2 — Section | Tungsten/Anton | 700 | 42–60pt | UPPERCASE | `--val-white` / `--val-red` |
| H3 — Subtitle | DIN/Inter | 600 | 24–32pt | Sentence | `--val-white` |
| Body | DIN/Inter | 400 | 16–20pt | Sentence | `--val-gray-100` |
| Label | DIN/Inter | 600 | 10–14pt | UPPERCASE | `--val-teal` |
| Data/Code | Share Tech Mono | 400 | 12–16pt | Normal | `--val-cyan` |

---

## BAB 4 — ELEMEN GRAFIS

### 4.1 Garis & Bentuk Geometris

#### Garis Tajam (Sharp Lines)
- Gunakan garis diagonal **45°** sebagai elemen dekoratif utama
- Ketebalan: 1px untuk subtle divider, 2–3px untuk aksen, 4–6px untuk border statement
- Warna garis: `--val-steel` (default), `--val-red` (highlight), `--val-cyan` (data)
- Garis TIDAK PERNAH melengkung — selalu lurus dan bersudut

```css
/* Contoh: Diagonal Slash Accent */
.slash-accent::before {
  content: '';
  position: absolute;
  width: 120px;
  height: 3px;
  background: var(--val-red);
  transform: rotate(-45deg);
  top: -20px;
  left: -30px;
}
```

#### Bentuk Angular
- **Clipped corners** — Gunakan `clip-path` untuk memotong sudut elemen
- **Parallelogram** untuk badge dan tag
- **Hexagonal hints** untuk ikon atau penanda

```css
/* Card dengan sudut terpotong — signature Valorant */
.tactical-card {
  background: var(--val-gray-200);
  clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px));
  padding: 2rem;
  border: 1px solid var(--val-steel);
}

/* Badge parallelogram */
.agent-badge {
  background: var(--val-red);
  clip-path: polygon(10% 0, 100% 0, 90% 100%, 0 100%);
  padding: 0.5rem 1.5rem;
  font-family: "DIN 2014", sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
```

### 4.2 Tekstur & Efek Visual

#### Grunge / Spray Paint Texture
- Overlay tekstur noise/grain halus di atas background gelap: `opacity: 0.03 – 0.08`
- Efek spray paint sebagai aksen di belakang headline besar
- Distressed edges pada foto atau image frame

```css
/* Noise texture overlay */
.slide::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url('noise-texture.png');
  opacity: 0.04;
  mix-blend-mode: overlay;
  pointer-events: none;
  z-index: 1;
}
```

#### Glitch & Scan Lines
- Efek scanline tipis untuk nuansa monitor taktis
- Glitch effect pada transisi antar slide (opsional, jangan berlebihan)

```css
/* Scanline overlay */
.scanlines::before {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.05) 2px,
    rgba(0, 0, 0, 0.05) 4px
  );
  pointer-events: none;
  z-index: 2;
}
```

### 4.3 Elemen UI Taktis

#### HUD-Style Elements
- **Crosshair markers** di sudut gambar atau card
- **Bracket frames** `[ ]` di sekitar angka penting
- **Progress bars** bergaya loading amunisi
- **Corner notch** — potongan kecil di sudut card

```css
/* Crosshair corner markers */
.tactical-frame {
  position: relative;
  padding: 2rem;
}
.tactical-frame::before,
.tactical-frame::after {
  content: '';
  position: absolute;
  width: 24px;
  height: 24px;
  border-color: var(--val-red);
  border-style: solid;
}
.tactical-frame::before {
  top: 0; left: 0;
  border-width: 2px 0 0 2px;  /* Top-left corner */
}
.tactical-frame::after {
  bottom: 0; right: 0;
  border-width: 0 2px 2px 0;  /* Bottom-right corner */
}
```

#### Label & Kodifikasi
- Nomor slide ditampilkan sebagai kode misi: `// 01`, `// 02`, `// 03`
- Section label menggunakan format: `[INTEL]`, `[DEBRIEF]`, `[OVERVIEW]`
- Status indicator: titik kecil berwarna (merah = aktif, gelap = non-aktif)

```
Contoh penggunaan di slide:

  // 01
  [MISSION BRIEF]

  JUDUL BESAR
  YANG MENARIK

  Deskripsi singkat di sini.
                ◆  ← corner mark
```

### 4.4 Ikonografi

- Gaya ikon: **Outline/Stroke**, bukan filled
- Stroke width: 1.5–2px
- Warna default: `--val-white` atau `--val-teal`
- Bentuk: Geometris, tajam, bersudut — hindari ikon bulat/rounded
- Sumber rekomendasi: **Phosphor Icons** (style: bold), **Heroicons** (outline), atau custom SVG

---

## BAB 5 — ATURAN TATA LETAK (LAYOUT) & WHITE SPACE

### 5.1 Grid System

```
GRID: 12 kolom
GUTTER: 32px (desktop) | 16px (mobile)
MARGIN: 80px (desktop) | 24px (mobile)
```

- Konten utama menempati **8–10 kolom** dari 12
- Sidebar/accent elements menempati **2–4 kolom**
- Gunakan **asymmetric layouts** — hindari center-center yang membosankan
- Konten boleh "break the grid" sesekali untuk efek dramatis

### 5.2 White Space (Negative Space)

> *"White space bukan ruang kosong — ia adalah ruang bernapas untuk senjata visual Anda."*

| Zona | Jarak Minimum |
|---|---|
| Antara headline dan body text | 32–48px |
| Antara section dalam satu slide | 64–80px |
| Padding dalam card | 32–48px |
| Margin slide (dari tepi viewport) | 80–120px |
| Antara elemen grid (gap) | 24–32px |

**Prinsip utama:**
- **70/30 Rule** — 70% area slide adalah white space (atau dark space), 30% adalah konten
- Jangan takut menyisakan area kosong yang besar — itu menambah bobot pada elemen yang ada
- Headline besar + banyak ruang kosong = IMPACT MAKSIMAL

### 5.3 Layout Patterns untuk Slide PPT

#### Pattern A — "The Statement"
```
┌─────────────────────────────────────┐
│  // 01  [SECTION LABEL]            │
│                                     │
│     SATU KALIMAT                    │
│     YANG SANGAT                     │
│     POWERFUL                        │
│                                     │
│                        — subtitle   │
└─────────────────────────────────────┘
```
*Gunakan untuk: Opening slide, quote, transition*

#### Pattern B — "The Split"
```
┌──────────────────┬──────────────────┐
│                  │                  │
│  HEADLINE        │  • Point satu    │
│  BESAR           │  • Point dua     │
│  DI KIRI         │  • Point tiga    │
│                  │                  │
│  [LABEL]         │  Caption text    │
└──────────────────┴──────────────────┘
```
*Gunakan untuk: Konten + penjelasan, data + narasi*

#### Pattern C — "The Grid"
```
┌─────────────────────────────────────┐
│  // 03  [OVERVIEW]                  │
│                                     │
│  ┌─────────┐  ┌─────────┐          │
│  │ CARD 01 │  │ CARD 02 │          │
│  └─────────┘  └─────────┘          │
│  ┌─────────┐  ┌─────────┐          │
│  │ CARD 03 │  │ CARD 04 │          │
│  └─────────┘  └─────────┘          │
└─────────────────────────────────────┘
```
*Gunakan untuk: Multi-point, perbandingan, fitur*

#### Pattern D — "The Data"
```
┌─────────────────────────────────────┐
│  // 04  [INTEL REPORT]              │
│                                     │
│     ┌──[ 87% ]──┐                   │
│     │  ANGKA     │   Penjelasan      │
│     │  BESAR     │   detail data     │
│     └────────────┘                   │
└─────────────────────────────────────┘
```
*Gunakan untuk: Statistik, data highlight, KPI*

### 5.4 Spacing & Alignment Rules

```css
/* Spacing system — kelipatan 8px */
:root {
  --space-xs:   8px;
  --space-sm:   16px;
  --space-md:   24px;
  --space-lg:   32px;
  --space-xl:   48px;
  --space-2xl:  64px;
  --space-3xl:  96px;
  --space-4xl:  128px;
}
```

- **SELALU** gunakan kelipatan 8px untuk spacing
- Alignment: **Left-aligned** sebagai default. Center hanya untuk hero/statement slide
- Vertikal rhythm harus konsisten di seluruh deck

### 5.5 Aturan Animasi & Transisi (Untuk Web-Based PPT)

```css
:root {
  --ease-tactical: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-sharp:    cubic-bezier(0.77, 0, 0.175, 1);
  --duration-fast:  200ms;
  --duration-base:  400ms;
  --duration-slow:  800ms;
}
```

| Elemen | Animasi | Durasi | Easing |
|---|---|---|---|
| Headline masuk | Slide up + fade in | 600ms | `--ease-tactical` |
| Card masuk | Stagger slide up | 400ms + 100ms delay | `--ease-tactical` |
| Background shift | Color transition | 800ms | ease-in-out |
| Hover pada card | Scale 1.02 + border glow | 200ms | ease |
| Garis dekoratif | Draw-in dari kiri | 600ms | `--ease-sharp` |

---

## LAMPIRAN — QUICK REFERENCE

### CSS Variables Lengkap (Copy-Paste Ready)

```css
:root {
  /* Colors — Core */
  --val-red:        #FF4655;
  --val-dark:       #0F1923;
  --val-black:      #000000;
  --val-white:      #ECE8E1;

  /* Colors — Secondary */
  --val-teal:       #00D4AA;
  --val-cyan:       #1AFBF0;
  --val-gold:       #F5A623;
  --val-steel:      #3B4F5B;

  /* Colors — Utility */
  --val-gray-100:   #768691;
  --val-gray-200:   #2C3E4A;
  --val-gray-300:   #1A2730;

  /* Gradients */
  --val-gradient-red:  linear-gradient(135deg, #FF4655 0%, #BD3944 100%);
  --val-gradient-dark: linear-gradient(180deg, #0F1923 0%, #000000 100%);
  --val-gradient-teal: linear-gradient(135deg, #00D4AA 0%, #008F73 100%);

  /* Typography */
  --font-display:  "Tungsten", "Anton", "Impact", sans-serif;
  --font-body:     "DIN 2014", "Inter", "Roboto", sans-serif;
  --font-mono:     "Share Tech Mono", "JetBrains Mono", monospace;

  /* Spacing (8px base) */
  --space-xs:   8px;
  --space-sm:   16px;
  --space-md:   24px;
  --space-lg:   32px;
  --space-xl:   48px;
  --space-2xl:  64px;
  --space-3xl:  96px;
  --space-4xl:  128px;

  /* Animation */
  --ease-tactical: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-sharp:    cubic-bezier(0.77, 0, 0.175, 1);
  --duration-fast:  200ms;
  --duration-base:  400ms;
  --duration-slow:  800ms;
}
```

### Do's and Don'ts

| ✅ DO | ❌ DON'T |
|---|---|
| Gunakan background gelap dominan | Membuat semua slide putih polos |
| Headline UPPERCASE besar + bold | Menggunakan font script/handwriting |
| Potong sudut card dengan clip-path | Menggunakan border-radius bulat besar |
| Sisakan 70% white/dark space | Memenuhi slide dengan teks |
| Gunakan `--val-red` sebagai aksen | Menggunakan merah di mana-mana |
| Tambahkan corner marks & label taktis | Menambahkan drop shadow tebal |
| Animasi halus & purposeful | Animasi berlebihan/bouncy |
| Garis diagonal & sudut tajam | Bentuk organik & wave/blob |

---

> 📌 **Dokumen ini adalah sumber kebenaran visual (single source of truth) untuk seluruh slide deck bertema Valorant. Setiap keputusan desain harus merujuk kembali ke panduan ini.**

*Prepared by Art Direction — v1.0 | Juni 2026*
