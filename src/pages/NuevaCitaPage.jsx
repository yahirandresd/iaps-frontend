import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { toast } from 'sonner'
import { useAuth } from '../context/AuthContext'
import PageHeader from '../components/ui/PageHeader'
import FormField, { inputCls } from '../components/ui/FormField'
import Button from '../components/ui/Button'
import { CalendarIcon, ClockIcon, UserIcon, HomeIcon, FileTextIcon } from '../assets/icons'
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

const schema = yup.object({
  tipo:   yup.string().required('Selecciona el tipo de consulta'),
  fecha:  yup.string().min(today, 'La fecha no puede ser anterior a hoy').required('Selecciona la fecha'),
  hora:   yup.string().required('Selecciona la hora'),
  medico: yup.string().required('Selecciona un médico'),
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
    <section className="animate-[fade_.28s_ease_both] pb-8">
      <PageHeader title="Nueva cita" icon={<CalendarIcon className="w-[18px] h-[18px]" />} />

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="px-3 flex flex-col gap-0.5 mt-1">

        <FormField label="Tipo de consulta" error={errors.tipo?.message} icon={<FileTextIcon className="w-[18px] h-[18px]" />}>
          <select
            {...register('tipo')}
            onChange={handleTipoChange}
            className={`${inputCls(true, !!errors.tipo)} appearance-none`}
          >
            <option value="">Selecciona una especialidad…</option>
            {TIPOS.map(t => <option key={t}>{t}</option>)}
          </select>
        </FormField>

        {/* Doctor selection — aparece al elegir especialidad */}
        {selectedTipo && (
          <FormField label="Médico disponible" error={errors.medico?.message} icon={<UserIcon className="w-[18px] h-[18px]" />}>
            <input type="hidden" {...register('medico')} />
            <div className="flex flex-col gap-2 pt-1">
              {medicos.map((nombre) => (
                <button
                  key={nombre}
                  type="button"
                  onClick={() => handleMedicoSelect(nombre)}
                  className={`w-full text-left px-4 py-3 rounded-[14px] border-2 font-bold text-[15px] transition-all
                    ${selectedMedico === nombre
                      ? 'border-azul bg-azul-suave text-azul-oscuro'
                      : 'border-gris-borde bg-white text-texto hover:border-azul'}`}
                >
                  <span className="block">{nombre}</span>
                  <span className={`text-[13px] font-semibold ${selectedMedico === nombre ? 'text-azul' : 'text-gris-texto'}`}>
                    {selectedTipo}
                  </span>
                </button>
              ))}
            </div>
          </FormField>
        )}

        <FormField label="Fecha" error={errors.fecha?.message} icon={<CalendarIcon className="w-[18px] h-[18px]" />}>
          <input
            {...register('fecha')}
            type="date"
            min={today}
            className={inputCls(true, !!errors.fecha)}
          />
        </FormField>

        <FormField label="Hora" error={errors.hora?.message} icon={<ClockIcon className="w-[18px] h-[18px]" />}>
          <select {...register('hora')} className={`${inputCls(true, !!errors.hora)} appearance-none`}>
            <option value="">Selecciona una hora…</option>
            {HORAS.map(h => <option key={h}>{h}</option>)}
          </select>
        </FormField>

        <FormField
          label={<>Lugar / IPS <span className="text-gris-texto font-semibold">(opcional)</span></>}
          error={errors.lugar?.message}
          icon={<HomeIcon className="w-[18px] h-[18px]" />}
        >
          <input
            {...register('lugar')}
            type="text"
            placeholder="Ej. Clínica Las Américas"
            className={inputCls(true, !!errors.lugar)}
          />
        </FormField>

        <FormField
          label={<>Observaciones <span className="text-gris-texto font-semibold">(opcional)</span></>}
          icon={<FileTextIcon className="w-[18px] h-[18px]" />}
        >
          <textarea
            {...register('notas')}
            rows={3}
            placeholder="Síntomas, motivo de consulta…"
            className={`${inputCls(true, false)} resize-none`}
          />
        </FormField>

        <div className="flex gap-2.5 mt-2">
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
