import { useState } from 'react'
import PageHeader from '../components/ui/PageHeader'
import Tabs from '../components/ui/Tabs'
import Banner from '../components/ui/Banner'
import AuthorizationCard from '../components/autorizaciones/AuthorizationCard'
import { CheckCircleIcon, AlertIcon } from '../assets/icons'
import { useAsync } from '../hooks/useAsync'
import { getAutorizaciones } from '../services/autorizacionesService'

const TABS = [
  { key: 'todas',     label: 'Todas'      },
  { key: 'aprobadas', label: 'Aprobadas'  },
  { key: 'revision',  label: 'En revisión'},
  { key: 'negadas',   label: 'Negadas'    },
]

export default function AutorizacionesPage() {
  const [activeTab, setActiveTab] = useState('todas')
  const { data: autorizaciones, loading } = useAsync(getAutorizaciones)

  const items = !autorizaciones ? [] : activeTab === 'todas'
    ? autorizaciones
    : autorizaciones.filter(a => a.estado.key === activeTab)

  const hasNegadas = autorizaciones?.some(a => a.estado.key === 'negadas') ?? false

  return (
    <section className="animate-[fade_.28s_ease_both]">
      <PageHeader title="Mis Autorizaciones" accentColor="bg-verde" icon={<CheckCircleIcon className="w-[18px] h-[18px]" />} />

      <Tabs tabs={TABS} active={activeTab} onChange={setActiveTab} />

      <div className="px-3">
        {hasNegadas && (
          <Banner type="danger" icon={<AlertIcon className="w-[22px] h-[22px]" />}>
            <strong>¿Tienes dudas sobre una negación?</strong>{' '}
            Puedes interponer una tutela.{' '}
            <button className="text-rojo font-extrabold bg-transparent border-0 p-0 text-[15px]">
              Saber cómo
            </button>
          </Banner>
        )}

        <div className="flex flex-col gap-3 py-1 pb-4">
          {loading ? (
            <p className="text-center text-gris-texto py-8 text-[15px]">Cargando autorizaciones…</p>
          ) : items.length === 0 ? (
            <p className="text-center text-gris-texto py-8 text-[15px]">No hay autorizaciones en esta sección.</p>
          ) : (
            items.map(auth => <AuthorizationCard key={auth.id} auth={auth} />)
          )}
        </div>
      </div>
    </section>
  )
}
