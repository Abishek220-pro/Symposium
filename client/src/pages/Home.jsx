import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import GradientButton from '../components/GradientButton'
import Card from '../components/Card'
import client from '../api/client'

export default function Home() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    client.get('/events').then((res) => setEvents(res.data)).catch(() => setEvents([]))
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <header className="border-b border-[#2a2a38] bg-[#0a0a0f/90]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="text-xl font-semibold">SYMCRYPT 2K26</div>
          <nav className="hidden gap-6 text-sm text-[#9a9aa8] md:flex">
            <a href="#events" className="hover:text-white">Events</a>
            <a href="#about" className="hover:text-white">About</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </nav>
          <Link to="/signup"><GradientButton>Register Now</GradientButton></Link>
        </div>
      </header>

      <main>
        <section className="mx-auto grid max-w-7xl gap-8 px-6 py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[#db2777]">National Level Technical Symposium</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">Secure Today, Stronger Tomorrow</h1>
            <p className="mt-6 max-w-2xl text-lg text-[#9a9aa8]">
              SYMCRYPT 2K26 by the Department of CSE (Cyber Security), Muthayammal Engineering College, Rasipuram, is a one-day celebration of innovation and digital security.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/signup"><GradientButton>Register Now</GradientButton></Link>
              <a href="#events" className="rounded-full border border-[#2a2a38] px-5 py-2.5 text-sm text-[#9a9aa8]">Explore Events</a>
            </div>
            <div className="mt-8 flex flex-wrap gap-6 rounded-2xl border border-[#2a2a38] bg-[#15151f] p-4 text-sm text-[#9a9aa8]">
              <span>31 July 2026</span>
              <span>₹200 per head</span>
              <span>Muthayammal Engineering College</span>
            </div>
          </div>
          <div className="rounded-3xl border border-[#2a2a38] bg-gradient-to-br from-[#7c3aed]/20 to-[#db2777]/20 p-8">
            <h2 className="text-2xl font-semibold">What to expect</h2>
            <ul className="mt-4 space-y-3 text-[#9a9aa8]">
              <li>• Cutting-edge cyber security talks</li>
              <li>• Hands-on workshops and coding challenges</li>
              <li>• Networking with student innovators and industry mentors</li>
            </ul>
          </div>
        </section>

        <section id="events" className="mx-auto max-w-7xl px-6 py-12">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-[#db2777]">Featured Events</p>
              <h2 className="mt-2 text-3xl font-semibold">Explore the symposium highlights</h2>
            </div>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {events.map((event) => (
              <Card
                key={event._id}
                title={event.title}
                description={event.description}
                time={new Date(event.startTime).toLocaleString()}
                venue={event.venue}
                action={<Link to="/signup"><GradientButton>Register</GradientButton></Link>}
              />
            ))}
          </div>
        </section>

        <section id="about" className="mx-auto max-w-7xl px-6 py-16">
          <div className="rounded-3xl border border-[#2a2a38] bg-gradient-to-r from-[#7c3aed]/20 to-[#db2777]/20 p-8 text-center">
            <h2 className="text-3xl font-semibold">Register today and secure your spot at the symposium</h2>
            <p className="mx-auto mt-3 max-w-2xl text-[#9a9aa8]">Be part of a national-level gathering focused on cyber security, innovation, and student excellence.</p>
            <Link to="/signup" className="mt-6 inline-block"><GradientButton>Get Started</GradientButton></Link>
          </div>
        </section>
      </main>

      <footer id="contact" className="border-t border-[#2a2a38] bg-[#0a0a0f] px-6 py-10 text-center text-sm text-[#9a9aa8]">
        <p className="font-semibold text-white">Department of CSE (Cyber Security)</p>
        <p>Muthayammal Engineering College, Rasipuram</p>
      </footer>
    </div>
  )
}
