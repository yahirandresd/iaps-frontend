import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { toast } from 'sonner'
import { useAuth } from '../context/AuthContext'
import PageHeader from '../components/ui/PageHeader'
import Button from '../components/ui/Button'
import { CalendarIcon, ClockIcon, UserIcon, HomeIcon, FileTextIcon, ChevronRightIcon, CheckCircleIcon } from '../assets/icons'
import { agendarCita } from '../services/citasService'

const MEDICOS = {
  'Medicina General':      ['Dr. Carlos Ruiz Pérez', 'Dra. Sandra Morales Cano', 'Dr. Julián Ospina Ríos'],
  'Odontología':           ['Dra. Laura Mejía Torres', 'Dr. Andrés Palacio Gil', 'Dra. Camila Vargas Duque'],
  'Cardiología':           ['Dr. Hernán Vélez Arango', 'Dra. Patricia Salazar Luna', 'Dr. Roberto Cano Ossa'],
  'Pediatría':             ['Dra. Marcela Giraldo Reyes', 'Dr. Felipe Montoya Soto', 'Dra. Isabel Ríos Peña'],
  'Ginecología':           ['Dra. Alejandra Cuartas Mora', 'Dra. Natalia Herrera Pinto', 'Dr. Diego Agudelo Vélez'],
  'Psicología':            ['Dra. Valentina Lozano Hoyos', 'Dr. Sebastián Arango Zuluaga', 'Dra. Paola Estrada Calle'],
  'Nutrición y Dietética': ['Dra. Paola Ríos Salazar', 'Dr. Mauricio Betancur Gómez', 'Dra. Diana Correa López'],
  'Dermatología':          ['Dr. Iván Zapata Cardona', 'Dra. Gloria Naranjo Sierra', 'Dr. Luis Castaño Muñoz'],
  'Oftalmología':          ['Dra. Adriana Parra Vásquez', 'Dr. Germán Flórez Uribe', 'Dra. Susana Tobón Restrepo'],
  'Ortopedia':             ['Dr. Jaime Cárdenas Londoño', 'Dra. Beatriz Toro Álvarez', 'Dr. Nelson Gómez Marín'],
  'Otra especialidad':     ['Dr. Ricardo Duque Serna', 'Dra. Carolina Bedoya Ríos', 'Dr. Álvaro Mejía Castro'],
}

const TIPOS = Object.keys(MEDICOS)

const HORAS = [
  '07:00 AM','07:30 AM','08:00 AM','08:30 AM','09:00 AM','09:30 AM',
  '10:00 AM','10:30 AM','11:00 AM','11:30 AM','12:00 PM','12:30 PM',
  '01:00 PM','01:30 PM','02:00 PM','02:30 PM','03:00 PM','03:30 PM',
  '04:00 PM','04:30 PM','05:00 PM','05:30 PM',
]

const today = new Date().toISOString().split('T')[0]

const fieldCls = (hasError = false) =>
  `w-full min-h-[52px] rounded-[14px] border-2 bg-white font-nunito text-[16px] px-4 py-3 text-texto
   transition-colors focus:outline-none focus:border-azul focus:shadow-[0_0_0_4px_rgba(21,101,192,.15)]
   ${hasError ? 'border-rojo bg-rojo-suave' : 'border-gris-borde'}`

function Label({ children }) {
  return <p className="text-[13px] font-extrabold text-texto mb-1.5 uppercase tracking-wide">{children}</p>
}

function FieldError({ msg }) {
  return msg ? <p className="text-[13px] text-rojo font-bold mt-1">{msg}</p> : null
}

const schema = yup.object({
  tipo:   yup.string().required('Selecciona la especialidad'),
  medico: yup.string().required('Selecciona un médico'),
  fecha:  yup.string().required('Selecciona la fecha').test('min-date', 'La fecha no puede ser anterior a hoy', v => !!v && v >= today),
  hora:   yup.string().required('Selecciona la hora'),
  lugar:  yup.string(),
  notas:  yup.string(),
})

export default function NuevaCitaPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [selectedTipo, setSelectedTipo] = useState('')
  const [selectedMedico, setSelectedMedico] = useState('')

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { lugar: user?.eps ?? '' },
  })

  const handleTipoChange = (e) => {
    const tipo = e.target.value
    setSelectedTipo(tipo)
    setSelectedMedico('')
    setValue('medico', '', { shouldValidate: false })
    setValue('tipo', tipo, { shouldValidate: true })
  }

  const handleMedicoSelect = (nombre) => {
    setSelectedMedico(nombre)
    setValue('medico', nombre, { shouldValidate: true })
  }

  const onSubmit = async (data) => {
    const { data: cita, error } = await agendarCita(data)
    if (error) { toast.error(error); return }
    toast.success('¡Cita agendada correctamente!')
    navigate('/citas')
    void cita
  }

  const medicos = MEDICOS[selectedTipo] ?? []

  return (
    <section className="animate-[fade_.28s_ease_both] pb-10">
      <PageHeader title="Nueva cita" icon={<CalendarIcon className="w-[18px] h-[18px]" />} />

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="px-4 flex flex-col gap-5 mt-3">

        {/* Especialidad */}
        <div>
          <Label><FileTextIcon className="w-4 h-4 inline mr-1 -mt-0.5" />Especialidad</Label>
          <div className="relative">
            <select
              {...register('tipo')}
              onChange={handleTipoChange}
              className={`${fieldCls(!!errors.tipo)} appearance-none pr-10`}
            >
              <option value="">Selecciona una especialidad…</option>
              {TIPOS.map(t => <option key={t}>{t}</option>)}
            </select>
            <ChevronRightIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gris-texto rotate-90 pointer-events-none" />
          </div>
          <FieldError msg={errors.tipo?.message} />
        </div>

        {/* Médico */}
        {selectedTipo && (
          <div>
            <Label><UserIcon className="w-4 h-4 inline mr-1 -mt-0.5" />Médico disponible</Label>
            <input type="hidden" {...register('medico')} />
            <div className="flex flex-col gap-2">
              {medicos.map((nombre) => {
                const active = selectedMedico === nombre
                return (
                  <button
                    key={nombre}
                    type="button"
                    onClick={() => handleMedicoSelect(nombre)}
                    className={`flex items-center gap-3 w-full text-left px-4 py-3.5 rounded-[14px] border-2 transition-all
                      ${active ? 'border-azul bg-azul-suave' : 'border-gris-borde bg-white'}`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 shrink-0 grid place-items-center
                      ${active ? 'border-azul bg-azul' : 'border-gris-borde bg-white'}`}>
                      {active && <span className="w-2 h-2 rounded-full bg-white block" />}
                    </div>
                    <div>
                      <p className={`font-extrabold text-[15px] leading-tight ${active ? 'text-azul-oscuro' : 'text-texto'}`}>{nombre}</p>
                      <p className={`text-[13px] ${active ? 'text-azul' : 'text-gris-texto'}`}>{selectedTipo}</p>
                    </div>
                    {active && <CheckCircleIcon className="w-5 h-5 text-azul ml-auto shrink-0" />}
                  </button>
                )
              })}
            </div>
            <FieldError msg={errors.medico?.message} />
          </div>
        )}

        {/* Fecha y Hora — side by side */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label><CalendarIcon className="w-4 h-4 inline mr-1 -mt-0.5" />Fecha</Label>
            <input
              {...register('fecha')}
              type="date"
              min={today}
              className={fieldCls(!!errors.fecha)}
            />
            <FieldError msg={errors.fecha?.message} />
          </div>
          <div>
            <Label><ClockIcon className="w-4 h-4 inline mr-1 -mt-0.5" />Hora</Label>
            <div className="relative">
              <select {...register('hora')} className={`${fieldCls(!!errors.hora)} appearance-none pr-8`}>
                <option value="">Hora…</option>
                {HORAS.map(h => <option key={h}>{h}</option>)}
              </select>
              <ChevronRightIcon className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gris-texto rotate-90 pointer-events-none" />
            </div>
            <FieldError msg={errors.hora?.message} />
          </div>
        </div>

        {/* Lugar */}
        <div>
          <Label><HomeIcon className="w-4 h-4 inline mr-1 -mt-0.5" />Lugar / IPS <span className="normal-case text-gris-texto font-semibold">(opcional)</span></Label>
          <input
            {...register('lugar')}
            type="text"
            placeholder="Ej. Clínica Las Américas"
            className={fieldCls(false)}
          />
        </div>

        {/* Observaciones */}
        <div>
          <Label><FileTextIcon className="w-4 h-4 inline mr-1 -mt-0.5" />Observaciones <span className="normal-case text-gris-texto font-semibold">(opcional)</span></Label>
          <textarea
            {...register('notas')}
            rows={3}
            placeholder="Síntomas, motivo de consulta…"
            className={`${fieldCls(false)} resize-none`}
          />
        </div>

        {/* Botones */}
        <div className="flex gap-3">
          <Button type="button" variant="ghost" className="flex-1" onClick={() => navigate('/citas')}>
            Cancelar
          </Button>
          <Button type="submit" variant="verde" disabled={isSubmitting} className="flex-1">
            {isSubmitting ? 'Agendando…' : 'Agendar cita'}
          </Button>
        </div>

      </form>
    </section>
  )
}
