import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, CalendarDays, Clock3, Cpu, Globe2, Mail, MapPin, Phone, ShieldCheck, Sparkles, Trophy, Users } from 'lucide-react'
import GradientButton from '../components/GradientButton'
import Card from '../components/Card'
import PillTabs from '../components/PillTabs'
import StatusBadge from '../components/StatusBadge'
import client from '../api/client'

const fallbackEvents = [
  { title: 'Paper Presentation', description: 'A high-impact stage for innovative research and secure system ideas.', time: '10:00 AM', venue: 'Main Seminar Hall', fee: '₹200', prizes: '₹4K+', category: 'Technical' },
  { title: 'IdeaForge', description: 'Pitch bold concepts that marry cybersecurity with future-ready digital products.', time: '11:30 AM', venue: 'Innovation Lab', fee: '₹200', prizes: '₹4K+', category: 'Technical' },
  { title: 'WebWhiz', description: 'A rapid-fire web development sprint for sharp minds and precise execution.', time: '01:30 PM', venue: 'Computer Center', fee: '₹200', prizes: '₹4K+', category: 'Coding Challenge' },
  { title: 'Ctrl+Z Quest', description: 'Test logic, debugging skill, and composure under pressure.', time: '03:00 PM', venue: 'Programming Arena', fee: '₹200', prizes: '₹4K+', category: 'Coding Challenge' },
  { title: 'Capture The Flag', description: 'Compete in attack-and-defense scenarios powered by real-world security puzzles.', time: '04:15 PM', venue: 'Security Lab', fee: '₹200', prizes: '₹6K+', category: 'Technical' },
  { title: 'Hackathon', description: 'Build immersive solutions under time pressure with a futuristic tech stack.', time: '05:30 PM', venue: 'Maker Bay', fee: '₹200', prizes: '₹8K+', category: 'Technical' },
  { title: 'Bug Bounty', description: 'Uncover vulnerabilities through an intelligent challenge-driven hunt.', time: '06:00 PM', venue: 'Ethical Lab', fee: '₹200', prizes: '₹5K+', category: 'Coding Challenge' },
  { title: 'AI Challenge', description: 'Solve AI-driven security tasks at the edge of innovation.', time: '06:45 PM', venue: 'AI Studio', fee: '₹200', prizes: '₹5K+', category: 'Technical' },
]

const tabs = [
  { value: 'all', label: 'All Events' },
  { value: 'technical', label: 'Technical' },
  { value: 'coding', label: 'Coding Challenge' },
]

const stats = [
  { label: 'Participants', value: '800+', icon: Users },
  { label: 'Technical Events', value: '12+', icon: Cpu },
  { label: 'Workshops', value: '6', icon: Sparkles },
  { label: 'Prize Pool', value: '₹50K', icon: Trophy },
  { label: 'Certificates', value: '100%', icon: ShieldCheck },
]

const timeline = [
  { time: '09:00', title: 'Opening Ceremony', detail: 'Live launch sequence and keynote briefing' },
  { time: '10:30', title: 'Technical Showcase', detail: 'Research, ideation, and cyber challenges' },
  { time: '01:30', title: 'Hands-on Workshops', detail: 'Labs, demos, and strategy sessions' },
  { time: '04:00', title: 'Finale & Awards', detail: 'Prize distribution and closing ceremony' },
]

const sponsors = ['NEXUS', 'QUANTIX', 'AURORA', 'SYNTH', 'HEXCORE', 'VECTOR']

function buildThumbnail(title) {
  const palette = [
    ['#38BDF8', '#00E5FF'],
    ['#3B82F6', '#06B6D4'],
    ['#8B5CF6', '#22D3EE'],
    ['#0EA5E9', '#2563EB'],
  ]
  const [start, end] = palette[Math.abs(title.length % palette.length)]
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
      <rect width="120" height="120" rx="24" fill="#05070D"/>
      <rect x="12" y="12" width="96" height="96" rx="22" fill="url(#g)"/>
      <path d="M35 82L60 38L85 82" stroke="#F8FAFC" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="60" cy="38" r="10" fill="#F8FAFC"/>
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${start}" />
          <stop offset="100%" stop-color="${end}" />
        </linearGradient>
      </defs>
    </svg>
  `

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

export default function Home() {
  const navigate = useNavigate()
  const [events, setEvents] = useState(fallbackEvents)
  const [activeTab, setActiveTab] = useState('all')

  useEffect(() => {
    client
      .get('/events')
      .then((res) => {
        const payload = Array.isArray(res?.data) ? res.data : []
        if (payload.length > 0) {
          setEvents(
            payload.slice(0, 8).map((event, index) => ({
              _id: event._id || index,
              title: event.title || fallbackEvents[index].title,
              description: event.description || fallbackEvents[index].description,
              time: event.startTime ? new Date(event.startTime).toLocaleString() : fallbackEvents[index].time,
              venue: event.venue || fallbackEvents[index].venue,
              fee: event.registrationFee || event.fee || fallbackEvents[index].fee,
              prizes: event.prizes || fallbackEvents[index].prizes,
              category: event.category || fallbackEvents[index].category,
            })),
          )
        }
      })
      .catch(() => setEvents(fallbackEvents))
  }, [])

  const visibleEvents = events.filter((event) => {
    if (activeTab === 'all') return true
    if (activeTab === 'technical') return event.category !== 'Coding Challenge'
    return event.category === 'Coding Challenge'
  })

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#05070D] text-slate-100">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(0,229,255,0.15),_transparent_30%),linear-gradient(135deg,_#05070D_0%,_#07101c_45%,_#05070D_100%)]" />
        <div className="cyber-grid absolute inset-0 opacity-40" />
        <div className="scan-lines absolute inset-0 opacity-20" />
      </div>

      <header className="sticky top-0 z-50 border-b border-cyan-400/20 bg-[#05070D]/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="#home" className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.35em] text-white">
            <span className="text-cyan-400">[</span> SYMCRYPT 2K26 <span className="text-cyan-400">]</span>
          </a>
          <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            <a href="#home" className="transition hover:text-cyan-300">Home</a>
            <a href="#about" className="transition hover:text-cyan-300">About</a>
            <a href="#events" className="transition hover:text-cyan-300">Events</a>
            <a href="#schedule" className="transition hover:text-cyan-300">Schedule</a>
            <a href="#sponsors" className="transition hover:text-cyan-300">Sponsors</a>
            <a href="#contact" className="transition hover:text-cyan-300">Contact</a>
          </nav>
          <GradientButton onClick={() => navigate('/signup')}>Register</GradientButton>
        </div>
      </header>

      <main id="home" className="relative">
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="max-w-3xl">
              <p className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs uppercase tracking-[0.35em] text-cyan-300">National Level Technical Symposium</p>
              <h1 className="mt-6 font-['Orbitron'] text-3xl font-black uppercase leading-tight text-white sm:text-4xl lg:text-5xl">SYMCRYPT 2K26</h1>
              <p className="mt-4 text-2xl font-semibold tracking-[0.2em] text-cyan-300 sm:text-3xl">Secure Today. Stronger Tomorrow.</p>
              <p className="mt-6 max-w-2xl text-lg text-slate-300">
                Department of Computer Science and Engineering (Cyber Security) • Muthayammal Engineering College
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <GradientButton onClick={() => navigate('/signup')}>Register Now</GradientButton>
                <button type="button" onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })} className="rounded-full border border-cyan-400/40 bg-transparent px-6 py-3 text-sm font-semibold text-cyan-200 transition hover:border-cyan-300 hover:bg-cyan-400/10">
                  Explore Events
                </button>
              </div>
              <div className="mt-8 grid gap-3 rounded-[24px] border border-cyan-400/20 bg-[#0B1220]/80 p-4 shadow-[0_0_40px_rgba(56,189,248,0.12)] backdrop-blur md:grid-cols-3">
                <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-3">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Date</p>
                  <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-white"><CalendarDays size={16} className="text-cyan-300" />31 July 2026</p>
                </div>
                <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-3">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Venue</p>
                  <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-white"><MapPin size={16} className="text-cyan-300" />MEC, Rasipuram</p>
                </div>
                <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-3">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Fee</p>
                  <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-white"><ShieldCheck size={16} className="text-cyan-300" />₹200</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 rounded-[32px] bg-cyan-400/20 blur-3xl" />
              <div className="relative rounded-[32px] border border-cyan-400/30 bg-[#0B1220]/80 p-6 shadow-[0_0_70px_rgba(56,189,248,0.18)] backdrop-blur">
                <div className="rounded-[28px] border border-cyan-400/20 bg-[#101827]/90 p-6">
                  <div className="grid gap-4">
                    <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4">
                      <div className="flex items-center gap-2 text-cyan-300"><ShieldCheck size={18} /> Secure Infrastructure</div>
                      <p className="mt-2 text-sm text-slate-300">A premium symposium built to feel like a next-gen security command center.</p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-2xl border border-cyan-400/20 bg-[#05070D]/80 p-4">
                        <div className="flex items-center gap-2 text-cyan-300"><Cpu size={18} /> Live Challenges</div>
                        <p className="mt-2 text-sm text-slate-400">Capture the Flag, Hackathon, AI Challenge and more.</p>
                      </div>
                      <div className="rounded-2xl border border-cyan-400/20 bg-[#05070D]/80 p-4">
                        <div className="flex items-center gap-2 text-cyan-300"><Sparkles size={18} /> Holographic Experience</div>
                        <p className="mt-2 text-sm text-slate-400">Immersive panels, neon glow, and cinematic atmosphere.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <Card key={stat.label} title={stat.label} description="" className="!flex-col !items-center !justify-center border-cyan-400/20 bg-[#101827]/90 text-center">
                  <div className="rounded-full border border-cyan-400/30 bg-cyan-400/10 p-3 text-cyan-300"><Icon size={18} /></div>
                  <p className="mt-3 text-2xl font-semibold text-white">{stat.value}</p>
                </Card>
              )
            })}
          </div>
        </section>

        <section id="events" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">Events Catalogue</p>
              <h2 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">Explore Events</h2>
            </div>
            <PillTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
          </div>

          <div className="space-y-4">
            {visibleEvents.map((event, index) => (
              <Card
                key={event._id || `${event.title}-${index}`}
                title={event.title}
                description={event.description}
                time={event.time}
                venue={event.venue}
                image={buildThumbnail(event.title)}
                action={<GradientButton onClick={() => navigate('/signup')}>Register</GradientButton>}
                className="border-cyan-400/20 bg-[#101827]/90 shadow-[0_0_35px_rgba(56,189,248,0.08)] transition duration-300 hover:-translate-y-1 hover:border-cyan-300/70"
              >
                <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400">
                  <span className="font-semibold text-cyan-200">Fee: {event.fee}</span>
                  <span className="font-semibold text-cyan-100">Prize: {event.prizes}</span>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section id="schedule" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-[32px] border border-cyan-400/20 bg-[#0B1220]/80 p-6 shadow-[0_0_60px_rgba(56,189,248,0.12)] backdrop-blur">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">Schedule</p>
                <h2 className="mt-2 text-3xl font-semibold text-white">Glowing Timeline</h2>
              </div>
              <div className="hidden rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200 sm:block">31 July 2026 • Friday</div>
            </div>
            <div className="space-y-4">
              {timeline.map((item, index) => (
                <div key={item.time} className="relative rounded-2xl border border-cyan-400/20 bg-[#101827]/80 p-4 pl-8">
                  <div className={`absolute left-3 top-6 h-3 w-3 rounded-full ${index === 0 ? 'bg-cyan-300' : 'bg-cyan-500/60'} shadow-[0_0_14px_rgba(56,189,248,0.8)]`} />
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">{item.time}</p>
                      <p className="mt-1 text-lg font-semibold text-white">{item.title}</p>
                    </div>
                    <p className="text-sm text-slate-400">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[32px] border border-cyan-400/20 bg-[#0B1220]/80 p-8 shadow-[0_0_60px_rgba(56,189,248,0.12)]">
              <div className="flex items-center gap-3 text-cyan-300"><Trophy size={24} /> <span className="text-lg font-semibold uppercase tracking-[0.25em]">Prize Pool</span></div>
              <h3 className="mt-4 text-4xl font-semibold text-white">₹50,000 Prize Pool</h3>
              <p className="mt-3 text-slate-400">From innovation awards to launch-day recognition, the symposium rewards excellence across every track.</p>
              <div className="mt-6 grid gap-3">
                <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4 text-sm text-slate-300">Winner • ₹25,000</div>
                <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4 text-sm text-slate-300">Runner-up • ₹15,000</div>
                <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4 text-sm text-slate-300">Special Awards • ₹10,000</div>
              </div>
            </div>
            <div id="sponsors" className="rounded-[32px] border border-cyan-400/20 bg-[#0B1220]/80 p-8 shadow-[0_0_60px_rgba(56,189,248,0.12)]">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">Sponsors</p>
              <h3 className="mt-2 text-3xl font-semibold text-white">Powered by Visionary Partners</h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {sponsors.map((sponsor) => (
                  <div key={sponsor} className="rounded-2xl border border-cyan-400/20 bg-[#101827]/90 p-4 text-center text-lg font-semibold uppercase tracking-[0.25em] text-slate-200">
                    {sponsor}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="rounded-[32px] border border-cyan-400/20 bg-[#0B1220]/80 p-8 shadow-[0_0_60px_rgba(56,189,248,0.12)]">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">Committee</p>
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <div>
                <h3 className="text-2xl font-semibold text-white">Faculty Coordinators</h3>
                <div className="mt-4 flex flex-wrap gap-3">
                  {['Dr. P. Muthusamy', 'Dr. S. Kavitha', 'Mr. R. Kumar'].map((name) => (
                    <div key={name} className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-slate-200">{name}</div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white">Student Coordinators</h3>
                <div className="mt-4 flex flex-wrap gap-3">
                  {['R.I. Aravindharaja', 'V. Abinesh', 'M. Aakash'].map((name) => (
                    <div key={name} className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-slate-200">{name}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-[32px] border border-cyan-400/20 bg-[#0B1220]/80 p-8 shadow-[0_0_60px_rgba(56,189,248,0.12)]">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">Registration</p>
            <h3 className="mt-2 text-3xl font-semibold text-white">Secure your access now</h3>
            <p className="mt-3 text-slate-400">Register before the portal closes and reserve your place among the best minds in cyber security.</p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-300">
              <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-2">Fee: ₹200</span>
              <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-2">Starts: 09:00 AM</span>
            </div>
            <GradientButton onClick={() => navigate('/signup')} className="mt-6">Register Now</GradientButton>
          </div>
        </section>
      </main>

      <footer id="contact" className="relative border-t border-cyan-400/20 bg-[#04060a]/90 px-4 py-12 text-sm text-slate-400 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-4">
          <div>
            <h4 className="text-lg font-semibold uppercase tracking-[0.25em] text-white">SYMCRYPT 2K26</h4>
            <p className="mt-3 max-w-xs text-sm">A futuristic symposium blending cyber security, innovation, and creative problem-solving.</p>
            <div className="mt-4 flex gap-3">
              <a href="#home" className="rounded-full border border-cyan-400/20 bg-cyan-400/10 p-2 text-cyan-300 transition hover:border-cyan-300">in</a>
              <a href="#home" className="rounded-full border border-cyan-400/20 bg-cyan-400/10 p-2 text-cyan-300 transition hover:border-cyan-300">X</a>
              <a href="#home" className="rounded-full border border-cyan-400/20 bg-cyan-400/10 p-2 text-cyan-300 transition hover:border-cyan-300">IG</a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="mt-3 space-y-2">
              <li><a href="#home" className="transition hover:text-cyan-300">Home</a></li>
              <li><a href="#events" className="transition hover:text-cyan-300">Events</a></li>
              <li><a href="#schedule" className="transition hover:text-cyan-300">Schedule</a></li>
              <li><a href="#contact" className="transition hover:text-cyan-300">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white">Venue</h4>
            <p className="mt-3 text-sm">Department of CSE (Cyber Security)</p>
            <p className="mt-2 text-sm">Muthayammal Engineering College (Autonomous)</p>
            <p className="mt-2 text-sm">Rasipuram - 637408, Namakkal (Dt), Tamil Nadu</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white">Contact</h4>
            <ul className="mt-3 space-y-3 text-sm">
              <li className="flex items-start gap-2"><Mail size={16} className="mt-0.5 text-cyan-300" /> symcrypt2k26@gmail.com</li>
              <li className="flex items-start gap-2"><Phone size={16} className="mt-0.5 text-cyan-300" /> +91 9787537367</li>
              <li className="flex items-start gap-2"><Globe2 size={16} className="mt-0.5 text-cyan-300" /> mec.edu.in</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  )
}
