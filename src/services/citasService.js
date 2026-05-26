import { supabase } from '../lib/supabaseClient'
import { CITAS as MOCK_CITAS } from '../data/mockData'

function mapEstado(estado) {
  const map = {
    confirmada: { label: 'CONFIRMADA', cls: 'green'  },
    pendiente:  { label: 'PENDIENTE',  cls: 'orange' },
    realizada:  { label: 'REALIZADA',  cls: 'gray'   },
    cancelada:  { label: 'CANCELADA',  cls: 'red'    },
  }
  return map[estado] ?? { label: estado.toUpperCase(), cls: 'gray' }
}

function formatFecha(fecha) {
  if (!fecha) return ''
  const [y, m, d] = fecha.split('-')
  const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre']
  return `${parseInt(d)} de ${meses[parseInt(m) - 1]} de ${y}`
}

function toCitaUI(row) {
  return {
    id:        row.id,
    tipo:      row.tipo,
    medico:    row.medico ?? 'Por asignar',
    fecha:     formatFecha(row.fecha),
    fechaRaw:  row.fecha,
    hora:      row.hora,
    lugar:     row.lugar ?? '—',
    direccion: row.direccion,
    notas:     row.notas,
    estado:    mapEstado(row.estado),
  }
}

export async function getCitas() {
  const { data, error } = await supabase
    .from('citas')
    .select('*')
    .order('fecha', { ascending: true })

  const rows = error ? [] : (data ?? [])

  const proximas   = rows.filter(c => ['pendiente', 'confirmada'].includes(c.estado)).map(toCitaUI)
  const pasadas    = rows.filter(c => c.estado === 'realizada').map(toCitaUI)
  const canceladas = rows.filter(c => c.estado === 'cancelada').map(toCitaUI)

  return {
    proximas:   [...proximas,   ...MOCK_CITAS.proximas],
    pasadas:    [...pasadas,    ...MOCK_CITAS.pasadas],
    canceladas: [...canceladas, ...MOCK_CITAS.canceladas],
  }
}

export async function agendarCita(payload) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { data: null, error: 'No autenticado' }

  const { data, error } = await supabase.from('citas').insert({
    user_id:   user.id,
    tipo:      payload.tipo,
    medico:    payload.medico || null,
    fecha:     payload.fecha,
    hora:      payload.hora,
    lugar:     payload.lugar || null,
    direccion: payload.direccion || null,
    notas:     payload.notas || null,
    estado:    'pendiente',
  }).select().single()

  if (error) return { data: null, error: error.message }
  return { data: toCitaUI(data), error: null }
}

export async function cancelarCita(id) {
  const { error } = await supabase
    .from('citas')
    .update({ estado: 'cancelada' })
    .eq('id', id)

  if (error) return { data: null, error: error.message }
  return { data: null, error: null }
}
