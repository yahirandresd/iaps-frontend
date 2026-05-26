import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../components/ui/PageHeader'
import Tabs from '../components/ui/Tabs'
import Button from '../components/ui/Button'
import AppointmentCard from '../components/citas/AppointmentCard'
import { CalendarIcon, PlusIcon } from '../assets/icons'
import { useAsync } from '../hooks/useAsync'
import { getCitas, cancelarCita } from '../services/citasService'

const TABS = [
  { key: 'proximas',   label: 'Próximas' },
  { key: 'pasadas',    label: 'Pasadas'  },
  { key: 'canceladas', label: 'Canceladas' },
]

export default function CitasPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('proximas')
  const { data: citas, loading } = useAsync(getCitas)

  const [localCitas, setLocalCitas] = useState(null)
  const citasData = localCitas ?? citas

  const handleCancel = async (id) => {
    const { error } = await cancelarCita(id)
    if (error) { toast.error(error); return }
    setLocalCitas(prev => {
      const base = prev ?? citas
      const cita = base.proximas.find(c => c.id === id)
      if (!cita) return base
      const cancelled = { ...cita, estado: { label: 'CANCELADA', cls: 'red' } }
      return {
        ...base,
        proximas:   base.proximas.filter(c => c.id !== id),
        canceladas: [cancelled, ...(base.canceladas ?? [])],
      }
    })
  }

  const items = citasData?.[activeTab] ?? []
  const proximasCount = citasData?.proximas?.length ?? 0

  const tabsWithCount = TABS.map(t =>
    t.key === 'proximas' ? { ...t, label: `Próximas (${proximasCount})` } : t
  )

  return (
    <section className="animate-[fade_.28s_ease_both]">
      <PageHeader title="Mis Citas" icon={<CalendarIcon className="w-[18px] h-[18px]" />} />

      <div className="p-3 pb-1">
        <Button variant="verde" onClick={() => navigate('/citas/nueva')}>
          <PlusIcon className="w-5 h-5" /> Agendar nueva cita
        </Button>
      </div>

      <Tabs tabs={tabsWithCount} active={activeTab} onChange={setActiveTab} />

      <div className="flex flex-col gap-3 px-3 py-1 pb-4">
        {loading ? (
          <p className="text-center text-gris-texto py-8 text-[15px]">Cargando citas…</p>
        ) : items.length === 0 ? (
          <p className="text-center text-gris-texto py-8 text-[15px]">No hay citas en esta sección.</p>
        ) : (
          items.map(cita => (
            <AppointmentCard key={cita.id} cita={cita} onCancel={handleCancel} />
          ))
        )}
      </div>
    </section>
  )
}
