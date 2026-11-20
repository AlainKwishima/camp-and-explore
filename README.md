# Camp & Explorer

> **Culture & Nature Experience Platform**  
> Mount Jali, Jali Sector, Gasabo District, Kigali, Rwanda

A high-performance, modern travel and tours discovery platform built with **Next.js 15+ (App Router)**, **TypeScript**, **React 19**, and **Tailwind CSS**.

---

## Features

- **Paris Tours & Excursions Catalog (`/`)**:
  - Live header search bar with real-time client-side tour filtering.
  - Faceted sidebar filters: keyword search, special highlights (Free Cancellation, Likely to Sell Out), category selectors, dynamic max price range slider, and traveler rating thresholds.
  - Responsive tour card grid with 20 curated experiences, badges, durations, review ratings, pricing, and persistent wishlist favorites (`localStorage`).
  - Mobile-first collapsible filter drawer for optimal small-screen viewing.

- **Interactive Product Detail Page (`/tours/versailles-palace-tour`)**:
  - **Photo Gallery & Lightbox**: 5-photo responsive mosaic with full-screen lightbox modal carousel supporting keyboard shortcuts (`←`, `→`, `Esc`) and thumbnail strip.
  - **Sticky Navigation Tabs**: Top scroll-spy navigation smoothly anchoring across *Overview*, *What's Included*, *Itinerary*, *Meeting Point*, *Reviews*, and *FAQs*.
  - **Interactive Booking Widget**:
    - Preset calendar date picker.
    - Guest incrementer (Adults & Children with automatic 25% discount).
    - Multi-option package selector (*Half-Day Morning, Half-Day Afternoon, Full-Day Complete, Small-Group VIP*).
    - Real-time dynamic total price calculation.
    - Instant reservation confirmation modal.
  - **Itinerary Timeline**: Sequential accordion stops with admission indicators and expandable details.
  - **Traveler Reviews & Breakdown**: Score cards, 5-star distribution histograms, keyword search, and verified traveler filters.
  - **Mobile Sticky Bottom Bar**: Pinned booking CTA with safe-area insets.

- **Design System & Typography**:
  - **Aeonik** brand typeface integrated across all weights (Regular 400, Medium 500, Bold 700, Black 900) with geometric neo-grotesque sans-serif fallbacks.
  - Authentic color palette, shadows, badges, and layout tokens.

---

## Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI & Styling**: [React 19](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Fonts**: Local Aeonik (`.woff2`) via `next/font/local` and `@font-face`

---

## Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/AlainKwishima/camp-and-explore.git
cd camp-and-explore
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or port 3001 if port 3000 is occupied) in your browser.

### 3. Production Build
```bash
npm run build
npm start
```

---

## License

MIT © [Alain Kwishima](https://github.com/AlainKwishima)
