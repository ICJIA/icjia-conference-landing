# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

## [1.0.0] - 2026-08-09

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
