import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'

// Visually verified Unsplash portraits matching each fictional speaker:
// Black women for Dr. Amara Whitfield and Nia Okonjo-Ward, a Black man for
// Marcus Ellison, and a Latino man for Luis Berrocal.
const AMARA_PORTRAIT = 'photo-1531123897727-8f129e1688ce'
const NIA_PORTRAIT = 'photo-1573496358961-3c82861ab8f4'
const MARCUS_PORTRAIT = 'photo-1531384441138-2736e62e0919'
const LUIS_PORTRAIT = 'photo-1622626426572-c268eb006092'

const SPEAKERS = ['Dr. Amara Whitfield', 'Luis Berrocal', 'Nia Okonjo-Ward', 'Marcus Ellison']

const concepts = [
  ['modernist', readFileSync('pages/modernist.html', 'utf8')],
  ['industry', readFileSync('pages/industry.html', 'utf8')],
]

const index = readFileSync('index.html', 'utf8')

describe.each(concepts)('%s concept', (name, html) => {
  it('renders four speaker portraits, each with alt text', () => {
    expect(html.match(/alt="Portrait of /g)).toHaveLength(4)
  })

  it('includes three African American speaker portraits', () => {
    expect(html).toContain(AMARA_PORTRAIT)
    expect(html).toContain(NIA_PORTRAIT)
    expect(html).toContain(MARCUS_PORTRAIT)
  })

  it('lists all four speakers by name', () => {
    for (const speaker of SPEAKERS) expect(html).toContain(speaker)
  })

  it('gives every speaker a verified portrait, with no generic placeholders left', () => {
    expect(html).toContain(LUIS_PORTRAIT)
    expect(html).not.toContain('i.pravatar.cc')
  })

  it('renders the six-item news accordion', () => {
    expect(html.match(/<details name="news"/g)).toHaveLength(6)
  })

  it('uses the shared Tailwind stylesheet and theme script', () => {
    expect(html).toContain('/src/styles/main.css')
    expect(html).toContain('/src/theme.js')
  })

  it('uses no inline event handlers (CSP-friendly)', () => {
    expect(html).not.toMatch(/\son(click|load|error|input|change)=/i)
  })

  it('self-hosts fonts — no third-party font requests', () => {
    expect(html).not.toContain('fonts.googleapis.com')
    expect(html).not.toContain('fonts.gstatic.com')
    expect(html).toMatch(/rel="preload" href="[^"]*\/fonts\/[^"]+\.woff2" as="font"/)
  })

  it('ships responsive srcset/sizes on every photo', () => {
    expect(html.match(/srcset="/g)).toHaveLength(6)
    expect(html.match(/sizes="/g)).toHaveLength(6)
  })

  it('uses real h3 headings for card and tier names, not styled paragraphs', () => {
    // 3 agenda days + 4 speakers + 3 registration tiers + 1 venue name
    expect(html.match(/<h3\b/g)).toHaveLength(11)
    expect(html).toContain('<aside aria-label="Publication details"')
  })
})

describe('theme tokens', () => {
  const css = readFileSync('src/styles/main.css', 'utf8')

  it('keeps the AA-verified light-theme accents', () => {
    // Both values audited ≥4.5:1 against their light --page (and under
    // --on-accent text) on 2026-08-14. Re-verify contrast before changing.
    expect(css).toContain('--accent: #c9280f')
    expect(css).toContain('--accent: #4a6c8f')
  })

  it('keeps photo captions on a solid chip, not bare text over the image', () => {
    for (const [, html] of concepts) {
      expect(html).not.toMatch(/text-shadow/)
      expect(html.match(/<figcaption[^>]*bg-\[#/g)).toHaveLength(2)
    }
  })
})

describe('demo index', () => {
  it('wires up both concepts', () => {
    expect(index).toContain('pages/modernist.html')
    expect(index).toContain('data-concept="modernist"')
    expect(index).toContain('data-concept="industry"')
    expect(index).toContain('/src/demo.js')
  })

  it('uses no inline event handlers (CSP-friendly)', () => {
    expect(index).not.toMatch(/\son(click|load|error|input|change)=/i)
  })
})

describe('demo script', () => {
  const demo = readFileSync('src/demo.js', 'utf8')

  it('routes to both concept pages', () => {
    expect(demo).toContain('pages/modernist.html')
    expect(demo).toContain('pages/industry.html')
  })
})
