# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.1] - 2026-08-14

### Fixed

- Resolved everything flagged by an axe DevTools Pro scan run with
  best-practice and experimental rules enabled (the pages already passed the
  default WCAG AA ruleset): speaker names, registration tier names and the
  venue name are real `<h3>` headings instead of bold paragraphs
  (`p-as-heading`); the "Official conference site" strip is a labelled
  `<aside>` landmark so no content sits outside landmarks (`region`); and
  the demo header carries an `aria-label` so it stays distinguishable from
  the framed concept page's header (`landmark-unique`). Rendering is
  unchanged — heading styles live entirely in the utility classes — and the
  new heading structure is pinned by the test suite.

## [0.2.0] - 2026-08-14

### Changed

- Fonts are now self-hosted as woff2 latin subsets in `src/fonts/`, hashed
  into the immutably-cached build assets, replacing the render-blocking
  Google Fonts stylesheet (which also cost two extra connections). Only the
  weights actually used ship: Archivo as one variable file (covers 400 and
  800), Barlow 400 and 500, and Barlow Condensed 600 — ~81 KB total, with
  the critical faces preloaded per page. The CSP tightens to
  `style-src 'self'; font-src 'self'`.
- Every Unsplash photo now carries `srcset`/`sizes`, so phones stop
  downloading desktop-resolution imagery (Lighthouse measured ~100–170 KB
  over-delivery per page). Rendition sets are pinned by the test suite.
- Adopted pre-release `0.x` versioning for the concept phase: the initial
  release below is renumbered `1.0.0` → `0.1.0` (it was never tagged or
  published under the old number), and this release is tagged `v0.2.0`.

### Fixed

- Light-theme contrast now meets WCAG 2.1 AA. The Modernist light accent
  darkens `#ec3013` → `#c9280f` (3.75:1 → 4.9:1 against the page) and the
  Industry light accent `#5980a6` → `#4a6c8f` (3.7:1 → 4.9:1); each fix
  covers both accent-as-text and white-on-accent buttons, clearing all 38
  failures found by a pixel-level audit of the light themes. Both values are
  now pinned by the test suite.
- Photo captions in both concepts sit on a solid dark chip instead of relying
  on a text shadow. The Industry duotone left its captions at 2.8:1 in dark
  mode, and any caption over a photo was one image swap away from failing;
  the chip keeps them ≥10:1 regardless of the underlying image.

## [0.1.0] - 2026-08-09

### Added

- Vite multi-page build (`dev` / `build` / `preview`) covering the demo index
  and both design concepts, with Tailwind CSS v4 via `@tailwindcss/vite`.
- Master demo page (`index.html`) for client review: switch between the
  Modernist and Industry concepts full-page, with a persistent selection and an
  "Open standalone" link.
- Shared theming layer (`src/styles/main.css`): per-concept colour tokens with
  dark/light variants, plus custom utilities for the duotone photo treatment,
  hatched image backgrounds, and the Industry concept's drafting registration
  marks.
- Vitest suite (`tests/pages.test.js`) covering the speaker roster, the
  diversity of the speaker portraits, the news accordion, CSP-safety (no
  inline event handlers), and the demo page wiring.
- Project scaffolding: `package.json`, `vite.config.js`, `.nvmrc` (Node 22),
  `.gitignore`, MIT `LICENSE`, `README.md`, and this changelog.
- Netlify deployment config (`netlify.toml`): static publish of `dist/` with
  the test suite as a deploy gate, immutable caching for hashed assets, and
  security headers including a hash-based Content-Security-Policy.

### Changed

- Recreated both concept pages as production-quality HTML/Tailwind: semantic
  landmarks and heading structure, skip links, real anchor navigation, native
  `<details>` news accordion (works without JavaScript), `aria-pressed` theme
  toggles driven by module scripts instead of inline handlers, lazy-loaded and
  dimensioned imagery, and mailto/tel contact links.
- Moved the landing pages out of `docs/` to build-friendly paths:
  `docs/Summit Landing - Modernist.html` → `pages/modernist.html` and
  `docs/Summit Landing - Industry.html` → `pages/industry.html`.
- Rebuilt the speaker roster in both concepts with visually verified Unsplash
  portraits matching each fictional name (the original pravatar placeholders
  all depicted white people): Black women for Dr. Amara Whitfield and Nia
  Okonjo-Ward, and a Latino man for Luis Berrocal. The fourth card, Sam
  Redhorse (Tribal Liaison), was replaced by a new fictional speaker, Marcus
  Ellison (Founder, Southside Story Lab), with a verified portrait of a Black
  man — each concept now features three African American speakers. The keynote
  news item was reworded to match the new closing speaker.
