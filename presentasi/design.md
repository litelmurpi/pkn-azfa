# DESIGN SYSTEM & PRESENTATION STRUCTURE
## Inspired by Good Secrets (goodsecrets.co)

This design document outlines the visual language, typography, color tokens, layout specifications, and slide structure for a web-based, scroll-driven presentation deck on the topic **"Rasa Bangga pada Negara Indonesia"** (with the study case **"Solidaritas Diaspora Indonesia"**).

---

## 1. DESIGN TOKENS (CSS VARIABLES)

```css
:root {
  /* Colors */
  --color-lime: #d3ed6b;      /* Primary hero, high-impact background, accents */
  --color-indigo: #6464ff;    /* Secondary background, transitions */
  --color-dark: #0e0e0e;      /* Deep neutral, footer, sidebar, slide bg */
  --color-offwhite: #efefef;  /* Text readability, high-contrast light slides */
  --color-pure-black: #000000;
  
  /* Accent Colors (for inline glyphs/icons) */
  --color-pink: #db53e2;
  --color-mint: #58ba98;
  --color-coral: #f1584b;
  
  /* Typography */
  --font-display: "Spoof", "Arial Black", sans-serif; /* Condensed, heavy, geometric */
  --font-body: "Inter", "Helvetica Neue", sans-serif;
  
  /* Animations & Transitions */
  --transition-smooth: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  --transition-color: background-color 0.8s ease, color 0.8s ease;
}
```

---

## 2. TYPOGRAPHY & TEXT STYLING

To replicate the high-impact, bold aesthetic of Good Secrets:
* **Headers (Display Typography):**
  * Case: `text-transform: uppercase;`
  * Weight: Heavy / Black (900)
  * Line Height: `line-height: 0.9` (extremely tight)
  * Letter Spacing: `letter-spacing: -0.05em` (tight tracking)
  * Fonts: Ultra-condensed sans-serif
* **Highlighting:** Interspersed text wrapping. Highlighting key phrases with vibrant background blocks or high-contrast color shifts (e.g., lime text on black background).
* **Inline Glyphs:** Integrating stylized, colorful vector icons directly within the text flow (e.g., a small palm tree icon next to "Melbourne Bergerak", a megaphone next to "Tuntutan").

---

## 3. LAYOUT & INTERACTIVE ELEMENTS

### A. Navigation & UI Chrome
* **Minimalist Floating Menu (Top Left):** A simple hamburger menu icon that slides out a slanted black navigation drawer containing slide bookmarks.
* **Butterfly Icon / Slide Progress (Top Center):** A minimalist center emblem that changes style or indicates slide number.
* **Action Buttons (Top Right):** Minimalist social-style circular icons linking back to references.

### B. Slide Behavior
* **Vertical Scroll Snapping:** Full viewport slides (`100vh`) with CSS Scroll Snap.
* **Scroll-Linked Background Shifts:** As the user scrolls to the next slide, the body background color transitions smoothly:
  * Slide 1: `var(--color-lime)`
  * Slide 2: `var(--color-indigo)`
  * Slide 3: `var(--color-dark)`
  * Slide 4: `var(--color-lime)`
  * Slide 5: `var(--color-indigo)`
  * Slide 6: `var(--color-offwhite)`
  * Slide 7: `var(--color-dark)`

---

## 4. SLIDE-BY-SLIDE CONTENT & DESIGN SPECIFICATION

### Slide 1: Cover (The Hero)
* **Background:** `var(--color-lime)`
* **Typography Color:** `var(--color-pure-black)`
* **Layout:** Centered large text blocks filling the viewport.
* **Main Text:**
  ```text
  RASA BANGGA
  PADA NEGARA
  INDONESIA
  ```
* **Sub-label:** A rotating circular badge in the bottom-right: *"Tugas Pendidikan Kewarganegaraan (PKN) • Universitas Gadjah Mada"*

---

### Slide 2: Latar Belakang & Studi Kasus (Intro)
* **Background:** `var(--color-indigo)`
* **Typography Color:** `var(--color-offwhite)`
* **Layout:** Left-aligned split screen. Left side holds large display text, right side holds a summary card.
* **Main Text:**
  ```text
  SOLIDARITAS DIASPORA
  BERGERAK DARI JAUH
  ```
* **Summary Content:**
  * Alih-alih merayakan kebanggaan secara pasif (batik, makanan, wisata), studi kasus ini menyoroti diaspora Indonesia di 4 benua (2024–2025) yang mengekspresikan kecintaan tanah air melalui **aksi bela demokrasi dari luar negeri**.
  * Data: Terdapat antara **6–9 juta WNI** yang tinggal di luar negeri.

---

### Slide 3: Peta & Kronologi Gerakan (The Timeline)
* **Background:** `var(--color-dark)`
* **Typography Color:** `var(--color-offwhite)`
* **Layout:** Horizontal timeline view with bold hover cards.
* **Main Text:**
  ```text
  LINIMASA AKSI SOLIDARITAS
  ```
* **Timeline Points:**
  * **Agustus 2024 (Melbourne):** Lahirnya gerakan *"Melbourne Bergerak"* di depan KJRI Melbourne, dipimpin mahasiswa doktoral secara mandiri.
  * **Maret 2025 (Jerman & Australia):** Aksi serentak *"Indonesia Gelap"* di Gerbang Brandenburg (Berlin) & State Library of Victoria.
  * **September 2025 (Global):** Puncak aksi di Federation Square (400+ WNI) menyuarakan *17+8 Tuntutan Rakyat*, meluas ke New York, London, dan Rotterdam.

---

### Slide 4: Karakteristik & Cara Aksi
* **Background:** `var(--color-lime)`
* **Typography Color:** `var(--color-dark)`
* **Layout:** Multi-column grid containing minimal cards.
* **Main Text:**
  ```text
  KREATIF & BERMARTABAT
  ```
* **Grid Items:**
  * **Seni & Puisi:** Pembacaan puisi perjuangan sebagai bentuk protes artistik.
  * **Musik:** Lagu-lagu perjuangan Indonesia dikumandangkan di ruang publik asing.
  * **Advokasi:** Menulis surat terbuka, petisi, dan kampanye media sosial lintas negara.
  * **Lokal & Global:** Kolaborasi dengan aktivis internasional untuk membawa isu Indonesia ke dunia.

---

### Slide 5: Konsep Patriotisme Kritis
* **Background:** `var(--color-indigo)`
* **Typography Color:** `var(--color-offwhite)`
* **Layout:** Large typography statement with embedded vector icons.
* **Main Text:**
  ```text
  PATRIOTISME KRITIS
  ```
* **Concept Explanation:**
  * Kebanggaan sejati tidak selalu didekorasi dengan senyuman dan pujian pasif.
  * *Patriotisme Kritis* adalah wujud cinta tanah air terdalam: **ketika rasa bangga mendorong seseorang bersuara untuk memperbaiki kondisi bangsanya.**
  * Relevansi UUD 1945 & Pancasila: Memperjuangkan keadilan sosial (Sila ke-5) adalah perwujudan bela negara yang konkret.

---

### Slide 6: Refleksi Diri (Tanya-Jawab)
* **Background:** `var(--color-offwhite)`
* **Typography Color:** `var(--color-dark)`
* **Layout:** A clean, minimal FAQ card design.
* **Main Text:**
  ```text
  REFLEKSI DIRI:
  APAKAH SAYA BANGGA?
  ```
* **QA Content:**
  * **Tanya:** Apakah Anda bangga menjadi warga negara Indonesia?
  * **Jawab:** Ya, saya sangat bangga.
  * **Penjelasan:** Kebanggaan saya bukan hanya pada alam atau budaya masa lalu, tetapi pada **karakter masyarakatnya yang tidak apatis**. Solidaritas diaspora membuktikan bahwa empati terhadap nasib bangsa melampaui batas geografis. Saya bangga memiliki sesama warga negara yang kritis, aktif, dan berani mengawal jalannya demokrasi demi keadilan bersama.

---

### Slide 7: Penutup
* **Background:** `var(--color-dark)`
* **Typography Color:** `var(--color-lime)`
* **Layout:** Heavy center-aligned text.
* **Main Text:**
  ```text
  WOW. YES. SOLD.
  TERIMA KASIH
  ```
* **Footer Info:**
  * *"Rasa bangga yang sejati adalah yang mendorong perbaikan."*
  * Referensi: Kompas, Tempo, VOA, CNBC, ABC News.
