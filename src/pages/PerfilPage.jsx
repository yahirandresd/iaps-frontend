import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useAuth } from '../context/AuthContext'
import AlertDialog from '../components/ui/AlertDialog'
import StatusBadge from '../components/ui/StatusBadge'
import Button from '../components/ui/Button'
import { UserIcon, IdCardIcon, CalendarIcon, PhoneIcon, MailIcon, HomeIcon, ClipboardIcon, MapPinIcon, UsersIcon, BellIcon, LockIcon, FileTextIcon, LogOutIcon, EditIcon } from '../assets/icons'
import { USER } from '../data/mockData'

function DataRow({ icon: Icon, label, children }) {
  return (
    <div className="grid grid-cols-[28px_1fr] gap-3 items-start py-3.5 px-4 border-b border-gris-borde last:border-0">
      <Icon className="w-[22px] h-[22px] text-azul-oscuro mt-0.5" />
      <div>
        <div className="text-[13px] text-gris-texto font-bold">{label}</div>
        <div className="text-base font-bold text-texto mt-0.5">{children}</div>
      </div>
    </div>
  )
}

export default function PerfilPage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const u = { ...USER, ...user }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <section className="animate-[fade_.28s_ease_both] pb-6" style={{ paddingTop: 0 }}>
      <div className="bg-gradient-to-b from-azul-suave to-transparent px-4 pt-5 pb-1.5 text-center">
        <div className="w-24 h-24 mx-auto mb-2.5 rounded-full bg-gradient-to-br from-[#5e96d1] to-azul text-white grid place-items-center text-[36px] font-extrabold shadow-md border-4 border-white">
          {u.initials ?? 'MF'}
        </div>
        <h2 className="m-0 mt-1 font-extrabold text-[22px]">{u.nombre}</h2>
        <div className="text-gris-texto text-sm mb-3">Afiliada · Régimen {u.regimen ?? 'Contributivo'}</div>
        <Button variant="ghost" size="sm" className="inline-flex w-auto min-w-[200px]" onClick={() => toast.info('Modo edición disponible próximamente.')}>
          <EditIcon className="w-[18px] h-[18px]" /> Editar información
        </Button>
      </div>

      <div className="px-3">
        <div className="text-[12px] font-extrabold text-gris-texto tracking-[1.5px] uppercase mx-1 mt-4 mb-2">Datos personales</div>
        <div className="bg-white border border-gris-borde rounded-lg overflow-hidden shadow-sm">
          <DataRow icon={UserIcon} label="Nombre completo">{u.nombre}</DataRow>
          <DataRow icon={IdCardIcon} label="Cédula de ciudadanía">{u.cedula}</DataRow>
          <DataRow icon={CalendarIcon} label="Fecha de nacimiento">{u.bday} <span className="text-gris-texto font-semibold">({u.edad} años)</span></DataRow>
          <DataRow icon={PhoneIcon} label="Teléfono">{u.phone}</DataRow>
          <DataRow icon={MailIcon} label="Correo electrónico">{u.email}</DataRow>
        </div>

        <div className="text-[12px] font-extrabold text-gris-texto tracking-[1.5px] uppercase mx-1 mt-4 mb-2">Afiliación al sistema de salud</div>
        <div className="bg-white border border-gris-borde rounded-lg overflow-hidden shadow-sm">
          <DataRow icon={HomeIcon} label="EPS">{u.eps}</DataRow>
          <DataRow icon={ClipboardIcon} label="Tipo de régimen">
            <StatusBadge cls="green" label={u.regimen ?? 'Contributivo'} />
          </DataRow>
          <div className="grid grid-cols-[28px_1fr] gap-3 items-start py-3.5 px-4 border-b border-gris-borde">
            <HomeIcon className="w-[22px] h-[22px] text-azul-oscuro mt-0.5" />
            <div>
              <div className="text-[13px] text-gris-texto font-bold">IPS asignada</div>
              <div className="text-base font-bold text-texto mt-0.5">{u.ips}</div>
              <div className="text-gris-texto text-sm mt-0.5">{u.ipsDir}</div>
              <div className="flex gap-2 mt-2.5">
                <a href="tel:+5743451010" className="flex-1 min-h-11 rounded-[12px] bg-verde text-white font-extrabold text-sm inline-flex items-center justify-center gap-1.5 no-underline">
                  <PhoneIcon className="w-[18px] h-[18px]" /> Llamar
                </a>
                <button onClick={() => toast.info('Abriendo mapa…')} className="flex-1 min-h-11 rounded-[12px] border-2 border-azul text-azul bg-white font-extrabold text-sm">
                  <MapPinIcon className="w-[18px] h-[18px] inline mr-1" /> Ver mapa
                </button>
              </div>
            </div>
          </div>
          <DataRow icon={IdCardIcon} label="Número de afiliado">{u.afiliado}</DataRow>
        </div>

        <div className="text-[12px] font-extrabold text-gris-texto tracking-[1.5px] uppercase mx-1 mt-4 mb-2">Contacto de emergencia</div>
        <div className="bg-white border border-gris-borde rounded-lg overflow-hidden shadow-sm">
          <DataRow icon={UsersIcon} label="Persona">{u.emergContacto}</DataRow>
          <DataRow icon={PhoneIcon} label="Teléfono">{u.emergTel}</DataRow>
        </div>
        <div className="py-2.5 px-1">
          <Button variant="ghost" size="sm" onClick={() => toast.info('Editor de contacto próximamente.')}>Actualizar contacto</Button>
        </div>

        <div className="text-[12px] font-extrabold text-gris-texto tracking-[1.5px] uppercase mx-1 mt-4 mb-2">Acciones</div>
        <div className="flex flex-col gap-2.5 px-1">
          <Button variant="ghost" onClick={() => toast.info('Configuración de notificaciones próximamente.')}>
            <BellIcon className="w-[18px] h-[18px]" /> Configurar notificaciones
          </Button>
          <Button variant="ghost" onClick={() => toast.info('Cambio de contraseña próximamente.')}>
            <LockIcon className="w-[18px] h-[18px]" /> Cambiar contraseña
          </Button>
          <Button variant="ghost" onClick={() => navigate('/adres')}>
            <FileTextIcon className="w-[18px] h-[18px]" /> Descargar certificado ADRES
          </Button>
          <AlertDialog
            trigger={
              <button className="w-full min-h-[52px] rounded-[14px] bg-rojo text-white font-extrabold text-base inline-flex items-center justify-center gap-2.5 border-0 shadow-[0_4px_10px_rgba(211,47,47,.25)]">
                <LogOutIcon className="w-[18px] h-[18px]" /> Cerrar sesión
              </button>
            }
            title="¿Cerrar sesión?"
            description="Se cerrará tu sesión actual y tendrás que volver a iniciarla."
            confirmLabel="Cerrar sesión"
            confirmVariant="rojo"
            onConfirm={handleLogout}
          />
        </div>
      </div>
    </section>
  )
}
