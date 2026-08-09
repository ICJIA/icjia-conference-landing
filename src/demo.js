/*
 * Concept chooser for the demo index: swaps the full-page iframe between the
 * two spec pages, keeps the "Open standalone" link in sync, and remembers the
 * last choice.
 */
const PAGES = {
  modernist: 'pages/modernist.html',
  industry: 'pages/industry.html',
}

const frame = document.getElementById('frame')
const standalone = document.getElementById('standalone')
const buttons = document.querySelectorAll('[data-concept]')

function select(concept) {
  if (!(concept in PAGES)) concept = 'modernist'
  frame.src = PAGES[concept]
  standalone.href = PAGES[concept]
  for (const button of buttons) {
    button.setAttribute('aria-pressed', String(button.dataset.concept === concept))
  }
  try {
    localStorage.setItem('nces-concept', concept)
  } catch {
    /* non-fatal */
  }
}

let initial = 'modernist'
try {
  initial = localStorage.getItem('nces-concept') ?? initial
} catch {
  /* storage unavailable — fall through to default */
}

select(initial)

for (const button of buttons) {
  button.addEventListener('click', () => select(button.dataset.concept))
}
