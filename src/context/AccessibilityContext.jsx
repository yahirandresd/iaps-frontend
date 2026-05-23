import { createContext, useContext, useState } from 'react'

const AccessibilityContext = createContext(null)

export function AccessibilityProvider({ children }) {
  const [textSize, setTextSize] = useState('md')   // md | lg | xl
  const [contrast, setContrast] = useState('normal') // normal | high

  const changeTextSize = (size) => {
    setTextSize(size)
    const html = document.documentElement
    html.removeAttribute('data-text')
    if (size !== 'md') html.setAttribute('data-text', size)
  }

  const changeContrast = (level) => {
    setContrast(level)
    const html = document.documentElement
    html.removeAttribute('data-contrast')
    if (level !== 'normal') html.setAttribute('data-contrast', level)
  }

  return (
    <AccessibilityContext.Provider value={{ textSize, contrast, changeTextSize, changeContrast }}>
      {children}
    </AccessibilityContext.Provider>
  )
}

export const useAccessibility = () => useContext(AccessibilityContext)
