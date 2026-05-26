import { supabase } from '../lib/supabaseClient'

const authEmail = (cedula) => `${cedula}@iaps.app`

export async function login(cedula, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: authEmail(cedula),
    password,
  })
  if (error) throw new Error('Cédula o contraseña incorrectos.')

  // Obtenemos el perfil usando el cliente ya autenticado con la sesión activa
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', data.user.id)
    .single()

  const base = profile ?? { id: data.user.id, email: data.user.email }
  const initials = base.nombre?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() ?? ''
  return { ...base, initials }
}

export async function register(formData) {
  try {
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email: authEmail(formData.numDoc),
      password: formData.pwd,
    })
    if (signUpError) throw new Error(signUpError.message)

    const userId = authData.user?.id
    if (!userId) throw new Error('No se pudo crear la cuenta. Intenta de nuevo.')

    const { error: profileError } = await supabase.from('profiles').insert({
      id:               userId,
      cedula:           formData.numDoc,
      tipo_doc:         formData.docType,
      fecha_exp:        formData.docDate,
      nombre:           formData.nombre,
      fecha_nac:        formData.bday,
      genero:           formData.gender,
      telefono:         formData.phone,
      email:            formData.email,
      eps:              formData.eps,
      regimen:          formData.regimen,
      estado:           formData.estado,
      tipo_afiliado:    formData.tipo_afiliado,
      fecha_afiliacion: formData.fecha_afiliacion,
      fecha_fin:        formData.fecha_fin || null,
    })
    if (profileError) throw new Error(profileError.message)

    const initials = formData.nombre.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    return {
      data: {
        id:               userId,
        cedula:           formData.numDoc,
        tipo_doc:         formData.docType,
        fecha_exp:        formData.docDate,
        nombre:           formData.nombre,
        fecha_nac:        formData.bday,
        genero:           formData.gender,
        telefono:         formData.phone,
        email:            formData.email,
        eps:              formData.eps,
        regimen:          formData.regimen,
        estado:           formData.estado,
        tipo_afiliado:    formData.tipo_afiliado,
        fecha_afiliacion: formData.fecha_afiliacion,
        fecha_fin:        formData.fecha_fin || null,
        initials,
      },
      error: null,
    }
  } catch (e) {
    return { data: null, error: e.message ?? 'Error al registrar' }
  }
}

export async function logout() {
  await supabase.auth.signOut()
}
