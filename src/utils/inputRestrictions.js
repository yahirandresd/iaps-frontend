const ALLOWED_KEYS = ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'Home', 'End']

export const onlyNumbers = (e) => {
  if (ALLOWED_KEYS.includes(e.key) || (e.ctrlKey || e.metaKey)) return
  if (!/^\d$/.test(e.key)) e.preventDefault()
}

export const onlyLetters = (e) => {
  if (ALLOWED_KEYS.includes(e.key) || (e.ctrlKey || e.metaKey)) return
  if (!/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]$/.test(e.key)) e.preventDefault()
}
