# NCE Summit 2026 — Landing Page Concepts

Two landing-page design concepts for the **National Community Engagement
Summit 2026**, plus a master demo page for showing both to non-technical
stakeholders. Built as a Vite multi-page project with Tailwind CSS v4 and a
Vitest suite, so there is a real dev server, a production build step, and room
for dependencies as the chosen concept grows into the real site.

Versioned as a `0.x` pre-release while the client is choosing a concept; the
first tagged version of the real site will be `1.0.0`.

## The demo

`index.html` is the client-facing entry point. A segmented control switches the
viewport between the two concepts (rendered full-page in an iframe), remembers
the last choice, and an **Open standalone** link opens the selected concept as
a full browser page.

| Concept | File | Look |
|---|---|---|
| Modernist | `pages/modernist.html` | Archivo, warm charcoal + signal orange, hard 2px grid |
| Industry | `pages/industry.html` | Barlow / Barlow Condensed, blueprint-blue duotone, drafting registration marks |

Each concept has its own light/dark toggle (persisted per concept in
`localStorage`, dark by default).

## Requirements

- Node 22 (`nvm use` picks it up from `.nvmrc`)

## Getting started

```bash
npm install
npm run dev        # dev server with the demo switcher at /
```

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Vite dev server |
| `npm run build` | Production build of all three pages to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm test` | Run the Vitest suite once |
| `npm run test:watch` | Vitest in watch mode |

## Project structure

```
├── index.html            # master demo page (concept switcher)
├── pages/
│   ├── modernist.html    # concept A
│   └── industry.html     # concept B
├── src/
│   ├── fonts/            # self-hosted woff2 subsets (only the weights in use)
│   ├── styles/main.css   # Tailwind v4 entry: @font-face, concept palettes, custom utilities
│   ├── theme.js          # light/dark toggle for the concept pages
│   └── demo.js           # concept switcher for the demo index
├── tests/
│   └── pages.test.js     # roster, portrait-diversity and wiring checks
├── vite.config.js        # Tailwind plugin + multi-page build inputs
├── .nvmrc                # Node 22
├── CHANGELOG.md
└── LICENSE               # MIT
```

## Deployment

The site deploys to Netlify as a static site (`netlify.toml`): the Vitest
suite runs as a deploy gate, the Vite build publishes from `dist/`, hashed
assets are cached immutably, and every response carries security headers —
including a hash-based Content-Security-Policy (no `unsafe-inline`). If the
inline theme-bootstrap scripts in `pages/*.html` change, recompute the two
script hashes in `netlify.toml`.

## Production notes

The concept pages are written as production code, not comps:

- Semantic HTML (landmarks, heading hierarchy, `dl`/`ul` data, real links),
  a skip link, labelled nav, and `aria-pressed` toggle states.
- No inline styles and no inline event handlers — behaviour lives in module
  scripts, so the pages work under a strict Content-Security-Policy (the only
  inline script is the tiny theme bootstrap in `<head>`, which a CSP can hash).
- The "What's new" accordion is native `<details name="news">` — exclusive
  open, keyboard accessible, and fully functional without JavaScript.
- Images carry `alt` text, dimensions and responsive `srcset`/`sizes`;
  below-the-fold images lazy-load, the hero is `fetchpriority="high"`.
- Fonts are self-hosted woff2 subsets (`src/fonts/`, hashed into the build)
  with the critical faces preloaded per page — no third-party requests and
  no render-blocking font stylesheet.
- Theming is CSS-token based: each concept defines its palette as custom
  properties (dark default, `.light` override) mapped into Tailwind utilities
  via `@theme inline`.

## Testing

The suite checks that each concept renders the four-speaker roster with alt
text, that every speaker is named, that each page includes the three verified
portraits of African American speakers (Dr. Amara Whitfield, Nia Okonjo-Ward
and Marcus Ellison), that the news accordion is present, and that no page uses
inline event handlers. It also pins the accessibility and performance
hardening: the AA-verified light-theme accent values, photo captions on solid
chips, self-hosted fonts (no third-party font requests), and responsive
`srcset` on every photo. Finally, it confirms the demo page wires up both
concepts.

## Imagery

All people and contact details on these pages are fictional placeholders. The
four speaker portraits are Unsplash stock photos chosen to match the fictional
roster and verified visually — three African American speakers (Dr. Whitfield,
Nia Okonjo-Ward, Marcus Ellison) and one Latino speaker (Luis Berrocal). Hero
and venue photography is Unsplash stock, delivered responsively via
`srcset`. Fonts (Archivo, Barlow, Barlow Condensed) are self-hosted woff2
subsets in `src/fonts/`, downloaded from Google Fonts and served first-party.

## License

[MIT](LICENSE)
