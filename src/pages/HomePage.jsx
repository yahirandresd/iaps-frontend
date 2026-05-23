import Greeting from '../components/home/Greeting'
import NextAppointmentBanner from '../components/home/NextAppointmentBanner'
import MenuGrid from '../components/home/MenuGrid'

export default function HomePage() {
  return (
    <section className="p-4 pb-6 animate-[fade_.28s_ease_both]">
      <Greeting />
      <NextAppointmentBanner />
      <div role="list">
        <MenuGrid />
      </div>
    </section>
  )
}
