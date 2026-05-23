import * as RadixAlertDialog from '@radix-ui/react-alert-dialog'

export default function AlertDialog({ trigger, title, description, confirmLabel = 'Confirmar', confirmVariant = 'rojo', onConfirm, cancelLabel = 'Cancelar' }) {
  const confirmColors = {
    rojo:    'bg-rojo text-white hover:brightness-95',
    verde:   'bg-verde text-white hover:brightness-95',
    primary: 'bg-azul text-white hover:brightness-95',
  }

  return (
    <RadixAlertDialog.Root>
      <RadixAlertDialog.Trigger asChild>{trigger}</RadixAlertDialog.Trigger>

      <RadixAlertDialog.Portal>
        <RadixAlertDialog.Overlay className="fixed inset-0 bg-black/50 z-[95] data-[state=open]:animate-[fade-in_.2s_ease]" />
        <RadixAlertDialog.Content
          className="
            fixed z-[96]
            bottom-0 left-0 right-0 mx-auto
            md:bottom-auto md:top-1/2 md:-translate-y-1/2
            w-full max-w-[480px] md:max-w-[480px]
            bg-white rounded-t-[28px] md:rounded-[28px]
            p-[18px_18px_28px] md:p-7
            shadow-lg
          "
        >
          <div className="w-11 h-[5px] rounded-full bg-[#D6DBE3] mx-auto mb-4 md:hidden" />
          <RadixAlertDialog.Title className="text-xl font-extrabold mb-1.5">
            {title}
          </RadixAlertDialog.Title>
          <RadixAlertDialog.Description className="text-[15px] text-gris-texto mb-5">
            {description}
          </RadixAlertDialog.Description>
          <div className="flex gap-2.5">
            <RadixAlertDialog.Cancel asChild>
              <button className="flex-1 min-h-[48px] rounded-[14px] border-2 border-azul text-azul bg-white font-extrabold text-base transition-all">
                {cancelLabel}
              </button>
            </RadixAlertDialog.Cancel>
            <RadixAlertDialog.Action asChild>
              <button
                onClick={onConfirm}
                className={`flex-1 min-h-[48px] rounded-[14px] font-extrabold text-base transition-all ${confirmColors[confirmVariant]}`}
              >
                {confirmLabel}
              </button>
            </RadixAlertDialog.Action>
          </div>
        </RadixAlertDialog.Content>
      </RadixAlertDialog.Portal>
    </RadixAlertDialog.Root>
  )
}
