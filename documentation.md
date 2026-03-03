# Zakaria Elass — Architecte | Khouribga, Maroc

## Overview
A luxury dark-themed architecture portfolio website for **Zakaria Elass**, an architect based in Khouribga, Morocco. Features animated Moroccan geometric patterns (8-pointed stars, horseshoe arches, tessellations), a custom cursor, dramatic intro sequence, and French-language content honoring Moroccan architectural heritage.

## Files
| File | Description |
|------|-------------|
| `index.html` | Complete HTML with SVG intro star, canvas background, all sections |
| `styles.css` | Dark luxury CSS with Moroccan copper accents, all animations |
| `script.js` | Canvas Moroccan geometry, custom cursor, intro, scroll reveals |

## Brand Identity
- **Name**: Zakaria Elass (ZE monogram)
- **Title**: Architecte
- **Location**: Khouribga 25000, Maroc
- **Tagline**: "Where Heritage Shapes Tomorrow"
- **Language**: French (content), English (hero headline)

## Design System
### Colors (Dark Luxury + Moroccan Copper)
| Token | Hex | Usage |
|-------|-----|-------|
| `--bg` | `#0c0b09` | Main background (warm near-black) |
| `--bg-elevated` | `#151311` | About, contact sections |
| `--text` | `#ede8e0` | Primary text (warm ivory) |
| `--text-muted` | `#908a82` | Secondary text |
| `--accent` | `#c8956c` | Moroccan copper (primary accent) |
| `--accent-hover` | `#daa882` | Lighter copper (hover) |
| `--accent-deep` | `#a07548` | Deep copper (borders, subtle) |

### Typography
- **Serif**: Cormorant Garamond (headings, numbers, monogram)
- **Sans-serif**: Archivo (body, labels, buttons)

## Sections
1. **Intro Animation** — SVG Moroccan 8-pointed star draws itself (two overlapping squares with stroke-dashoffset), outer/inner circles, ZE monogram reveal, "ZAKARIA ELASS" letter-by-letter stagger, "ARCHITECTE" + "KHOURIBGA, MAROC" fade in, corner accents, progress bar
2. **Hero** — Full-screen parallax with gradient overlay, decorative rotating Moroccan star, "Where Heritage Shapes Tomorrow" headline, description, CTA button with wipe-fill hover
3. **Marquee** — Continuous horizontal scroll: "Architecture — Design — Patrimoine — Innovation" with Moroccan star separators (&#10022;)
4. **Projets** — 6 Morocco-specific projects in staggered 2-column grid (alternating large/small cards), hover overlay with "Voir le projet"
5. **À Propos** — Image with offset frame + rotating star decoration, French bio text, stats (10+ ans, 60+ projets, 8 prix, 3 régions)
6. **Services** — 4 accordion items in French (Conception Architecturale, Architecture d'Intérieur, Urbanisme, Rénovation & Patrimoine)
7. **Contact** — French form (Nom, Email, Type de projet, Message) + contact info (ze-architecte.ma, Khouribga address)
8. **Footer** — ZE logo, French tagline, navigation, social links, rotating star accent

## Projects (Morocco-themed)
| # | Name | Type | Location | Year |
|---|------|------|----------|------|
| 01 | Riad Amane | Résidentiel | Khouribga | 2024 |
| 02 | Villa Atlas | Résidentiel | Béni Mellal | 2024 |
| 03 | Dar Al Maarifa | Culturel | Khouribga | 2023 |
| 04 | Souk El Jadid | Commercial | Oued Zem | 2023 |
| 05 | Maison Phosphate | Rénovation | Khouribga | 2022 |
| 06 | Complexe Zenith | Bureaux | Casablanca | 2022 |

## Animated Canvas Background
Four layers of Moroccan-inspired elements rendered on a fixed `<canvas>`:

1. **Tessellation Grid** — A repeating grid of small 8-pointed Moroccan stars with dashed connection lines. Slowly rotates. Glows brighter near the cursor.
2. **Floating Arches** — 6 Moroccan horseshoe arch outlines drifting upward with gentle sway.
3. **Floating Stars** — 14 larger 8-pointed stars at various sizes, rotating individually, pulsing opacity, mouse-proximity glow.
4. **Gold Dust** — 35 tiny pulsing particles like gold dust floating across the viewport.

All elements use subtle opacity (0.01–0.08) in copper tone `#c8956c`. Animation pauses when tab is hidden.

## Interactive Features
- **Custom Cursor** — 6px copper dot (precise) + 40px ring (follows with lag). Both grow on hover over interactive elements. Hidden on touch devices.
- **SVG Intro Star** — Two squares + two circles animate via `stroke-dashoffset` CSS animation to draw the classic Moroccan khatam (8-pointed star).
- **Marquee** — Infinite CSS scroll animation (25s loop).
- **Button Hover** — `::before` pseudo-element wipe-fill from left.
- **Project Cards** — Image zoom + dark overlay + "Voir le projet" label on hover. Staggered grid with even cards offset down.
- **Scroll Reveals** — Elements fade up with staggered delays.
- **Counter Animation** — Stats count from 0 with easeOutQuart.
- **Parallax** — Hero image shifts on scroll. Canvas elements have layered parallax depths.
- **Navigation** — Blur/darken on scroll. Mobile hamburger with smooth transitions.

## Responsive Breakpoints
- **1024px**: Hero decoration hidden, reduced gaps
- **768px**: Mobile nav, single-column grids, uniform card aspect ratios
- **480px**: Simplified footer, smaller intro monogram

## Images
Unsplash URLs used as placeholders. Replace with actual project photos for production.

## Usage
Open `index.html` in a browser. No build tools or dependencies required.
