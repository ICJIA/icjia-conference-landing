# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
