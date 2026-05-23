import { useState } from 'react'
import PageHeader from '../components/ui/PageHeader'
import Tabs from '../components/ui/Tabs'
import Banner from '../components/ui/Banner'
import HistoryCard from '../components/historial/HistoryCard'
import { ClipboardIcon, LockIcon } from '../assets/icons'
import { useAsync } from '../hooks/useAsync'
import { getHistorialByYear, getHistorialYears } from '../services/historialService'

export default function HistorialPage() {
  const { data: years } = useAsync(getHistorialYears)
  const [activeYear, setActiveYear] = useState('2025')
  const { data: records, loading } = useAsync(() => getHistorialByYear(activeYear), [activeYear])

  const tabs = (years ?? ['2025', '2024', '2023', '2022']).map(y => ({ key: String(y), label: String(y) }))

  return (
    <section className="animate-[fade_.28s_ease_both]">
      <PageHeader title="Mi Historial Clínico" accentColor="bg-azul-oscuro" icon={<ClipboardIcon className="w-[18px] h-[18px]" />} />

      <div className="px-3">
        <Banner type="priv" icon={<LockIcon className="w-[18px] h-[18px]" />}>
          Tu información es <strong>confidencial</strong> y está protegida.
        </Banner>
      </div>

      <Tabs tabs={tabs} active={activeYear} onChange={setActiveYear} />

      <div className="flex flex-col gap-3 px-3 py-1 pb-4">
        {loading ? (
          <p className="text-center text-gris-texto py-8 text-[15px]">Cargando historial…</p>
        ) : (records ?? []).length === 0 ? (
          <p className="text-center text-gris-texto py-8 text-[15px]">No hay registros para este año.</p>
        ) : (
          (records ?? []).map(r => <HistoryCard key={r.id} record={r} />)
        )}
      </div>
    </section>
  )
}
