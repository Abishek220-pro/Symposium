import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Card from '../../components/Card'
import GradientButton from '../../components/GradientButton'
import PillTabs from '../../components/PillTabs'
import StatusBadge from '../../components/StatusBadge'
import client from '../../api/client'
import { useAuth } from '../../context/AuthContext'

const tabs = [
  { label: 'All', value: 'all' },
  { label: 'Draft', value: 'draft' },
  { label: 'Published', value: 'published' },
  { label: 'Closed', value: 'closed' },
]

export default function OrganizerDashboard() {
  const [events, setEvents] = useState([])
  const [filter, setFilter] = useState('all')
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    venue: '',
    startTime: '',
    fee: '',
    maxSeats: '',
    status: 'draft',
  })
  const { user } = useAuth()

  useEffect(() => {
    client.get('/admin/events').then((res) => setEvents(res.data)).catch(() => setEvents([]))
  }, [])

  const filteredEvents = useMemo(() => {
    if (filter === 'all') return events
    return events.filter((event) => (event.status || 'draft').toLowerCase() === filter)
  }, [events, filter])

  const handleCreate = async (e) => {
    e.preventDefault()
    await client.post('/admin/events', {
      ...form,
      fee: Number(form.fee),
      maxSeats: Number(form.maxSeats),
    })
    const res = await client.get('/admin/events')
    setEvents(res.data)
    setForm({ title: '', description: '', category: '', venue: '', startTime: '', fee: '', maxSeats: '', status: 'draft' })
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[#db2777]">Organizer Dashboard</p>
            <h1 className="mt-2 text-3xl font-semibold">Manage symposium events</h1>
          </div>
          <Link to="/organizer/add-volunteer"><GradientButton>Add Volunteer</GradientButton></Link>
        </div>

        <div className="mb-6 rounded-2xl border border-[#2a2a38] bg-[#15151f] p-6">
          <h2 className="text-xl font-semibold">Create event</h2>
          <form className="mt-4 grid gap-4 md:grid-cols-2" onSubmit={handleCreate}>
            <input className="rounded-xl border border-[#2a2a38] bg-[#1c1c28] px-4 py-3 text-white outline-none" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <input className="rounded-xl border border-[#2a2a38] bg-[#1c1c28] px-4 py-3 text-white outline-none" placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
            <input className="rounded-xl border border-[#2a2a38] bg-[#1c1c28] px-4 py-3 text-white outline-none" placeholder="Venue" value={form.venue} onChange={(e) => setForm({ ...form, venue: e.target.value })} />
            <input type="datetime-local" className="rounded-xl border border-[#2a2a38] bg-[#1c1c28] px-4 py-3 text-white outline-none" value={form.startTime} onChange={(e) => setForm({ ...form, startTime: e.target.value })} />
            <input type="number" className="rounded-xl border border-[#2a2a38] bg-[#1c1c28] px-4 py-3 text-white outline-none" placeholder="Fee" value={form.fee} onChange={(e) => setForm({ ...form, fee: e.target.value })} />
            <input type="number" className="rounded-xl border border-[#2a2a38] bg-[#1c1c28] px-4 py-3 text-white outline-none" placeholder="Max seats" value={form.maxSeats} onChange={(e) => setForm({ ...form, maxSeats: e.target.value })} />
            <select className="rounded-xl border border-[#2a2a38] bg-[#1c1c28] px-4 py-3 text-white outline-none" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="closed">Closed</option>
            </select>
            <textarea className="md:col-span-2 rounded-xl border border-[#2a2a38] bg-[#1c1c28] px-4 py-3 text-white outline-none" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <div className="md:col-span-2"><GradientButton type="submit">Create event</GradientButton></div>
          </form>
        </div>

        <PillTabs tabs={tabs} activeTab={filter} onChange={setFilter} />

        <div className="mt-6 grid gap-4">
          {filteredEvents.map((event) => (
            <Card
              key={event._id}
              title={event.title}
              description={event.description}
              time={event.startTime ? new Date(event.startTime).toLocaleString() : 'TBA'}
              venue={event.venue}
              action={<StatusBadge status={event.status} />}
            >
              <div className="flex items-center justify-between text-sm text-[#9a9aa8]">
                <span>Category: {event.category}</span>
                <span>Fee: ₹{event.fee}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
