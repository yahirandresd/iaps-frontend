import PageHeader from '../components/ui/PageHeader'
import Banner from '../components/ui/Banner'
import MedicationCard from '../components/medicamentos/MedicationCard'
import { PillIcon, InfoIcon } from '../assets/icons'
import { useAsync } from '../hooks/useAsync'
import { getMedicamentos } from '../services/medicamentosService'

export default function MedicamentosPage() {
  const { data: medicamentos, loading } = useAsync(getMedicamentos)

  return (
    <section className="animate-[fade_.28s_ease_both]">
      <PageHeader title="Medicamentos" accentColor="bg-naranja" icon={<PillIcon className="w-[18px] h-[18px]" />} />

      <div className="px-3">
        <Banner type="info" icon={<InfoIcon className="w-[22px] h-[22px]" />}>
          Estos medicamentos están listos para recoger en tu farmacia asignada.
        </Banner>

        <div className="flex flex-col gap-3 pb-4">
          {loading ? (
            <p className="text-center text-gris-texto py-8 text-[15px]">Cargando medicamentos…</p>
          ) : (
            (medicamentos ?? []).map(med => <MedicationCard key={med.id} med={med} />)
          )}
        </div>
      </div>
    </section>
  )
}
