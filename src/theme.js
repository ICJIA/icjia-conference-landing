/*
 * Light/dark toggle for a concept page. Buttons opt in with
 * data-set-theme="light|dark"; the choice is stored per concept
 * (body[data-concept]) so the two spec pages don't fight over one key.
 */
const key = `nces-theme-${document.body.dataset.concept ?? 'concept'}`
const buttons = document.querySelectorAll('[data-set-theme]')

function apply(mode) {
  document.documentElement.classList.toggle('light', mode === 'light')
  for (const button of buttons) {
    button.setAttribute('aria-pressed', String(button.dataset.setTheme === mode))
  }
}

let mode = 'dark'
try {
  mode = localStorage.getItem(key) ?? mode
} catch {
  /* storage unavailable (private mode, sandboxed iframe) — keep default */
}

apply(mode)

for (const button of buttons) {
  button.addEventListener('click', () => {
    mode = button.dataset.setTheme
    apply(mode)
    try {
      localStorage.setItem(key, mode)
    } catch {
      /* non-fatal */
    }
  })
}
