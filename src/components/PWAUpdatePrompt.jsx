import { useEffect } from 'react'
import { useRegisterSW } from 'virtual:pwa-register/react'
import { toast } from 'sonner'

export default function PWAUpdatePrompt() {
  const { needRefresh: [needRefresh], updateServiceWorker } = useRegisterSW()

  useEffect(() => {
    if (!needRefresh) return
    toast('Nueva versión disponible', {
      duration: Infinity,
      action: {
        label: 'Actualizar',
        onClick: () => updateServiceWorker(true),
      },
    })
  }, [needRefresh, updateServiceWorker])

  return null
}
