import PageHeader from '../components/ui/PageHeader'
import Banner from '../components/ui/Banner'
import Card from '../components/ui/Card'
import { FileTextIcon, InfoIcon, AlertIcon, GlobeIcon } from '../assets/icons'

export default function AdresPage() {
  const steps = [
    'Haz clic en el botón de abajo.',
    <>Ingresa con tu <strong>cédula</strong> y <strong>fecha de nacimiento</strong>.</>,
    'Descarga e imprime tu certificado.',
  ]

  return (
    <section className="animate-[fade_.28s_ease_both]">
      <PageHeader title="Certificado ADRES" accentColor="bg-rojo" icon={<FileTextIcon className="w-[18px] h-[18px]" />} />

      <div className="px-4 pt-2">
        <Banner type="info" icon={<InfoIcon className="w-[22px] h-[22px]" />}>
          El certificado de afiliación al sistema de salud lo expide <strong>ADRES</strong> (antes Fosyga). Es <strong>gratis</strong> y puedes descargarlo en línea.
        </Banner>

        <Card className="mb-3.5">
          <h3 className="m-0 mb-2 text-[17px] font-extrabold">¿Para qué sirve?</h3>
          <ul className="m-0 pl-[18px] leading-[1.8] text-[15px]">
            <li>Trámites laborales y pensionales</li>
            <li>Solicitudes de crédito</li>
            <li>Trámites ante entidades del Estado</li>
            <li>Visas y procesos migratorios</li>
          </ul>
        </Card>

        <Card className="mb-3.5">
          <h3 className="m-0 mb-3 text-[17px] font-extrabold">Sigue estos pasos</h3>
          <ol className="list-none p-0 m-0 flex flex-col gap-3">
            {steps.map((s, i) => (
              <li key={i} className="flex gap-3 items-start">
                <div className="w-9 h-9 rounded-[12px] bg-azul-suave text-azul-oscuro grid place-items-center font-extrabold text-base shrink-0">{i + 1}</div>
                <div className="text-[15px] pt-1.5">{s}</div>
              </li>
            ))}
          </ol>
        </Card>

        <a href="https://www.adres.gov.co" target="_blank" rel="noopener noreferrer"
          className="min-h-[52px] w-full rounded-[14px] bg-rojo text-white font-extrabold text-base inline-flex items-center justify-center gap-2.5 no-underline shadow-[0_4px_10px_rgba(211,47,47,.25)] mb-3.5">
          <GlobeIcon className="w-[18px] h-[18px]" /> Ir al portal ADRES
        </a>

        <Banner type="warn" icon={<AlertIcon className="w-[22px] h-[22px]" />}>
          Si tienes problemas para acceder, también puedes llamar al <strong>57(1) 482 4410</strong> · Línea gratuita: <strong>01800-113774</strong>.
        </Banner>
      </div>
    </section>
  )
}
