import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GradientButton from '../../components/GradientButton'
import Card from '../../components/Card'
import StatusBadge from '../../components/StatusBadge'
import client from '../../api/client'
import { useAuth } from '../../context/AuthContext'

export default function ParticipantDashboard() {
  const [events, setEvents] = useState([])
  const [registrations, setRegistrations] = useState([])
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }

    const load = async () => {
      setLoading(true)
      try {
        const [eventsRes, regsRes] = await Promise.all([
          client.get('/events'),
          client.get('/me/registrations'),
        ])
        setEvents(eventsRes.data)
        setRegistrations(regsRes.data)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [navigate, user])

  const registeredIds = useMemo(() => new Set(registrations.map((item) => item.event?._id || item.event)), [registrations])

  const handleRegister = async (eventId) => {
    try {
      await client.post('/registrations', { eventId })
      const regsRes = await client.get('/me/registrations')
      setRegistrations(regsRes.data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[#db2777]">Participant Dashboard</p>
            <h1 className="mt-2 text-3xl font-semibold">Register for your favorite symposium events</h1>
          </div>
        </div>
        {loading ? <p className="text-[#9a9aa8]">Loading events...</p> : null}
        <div className="grid gap-4">
          {events.map((event) => {
            const registered = registeredIds.has(event._id)
            return (
              <Card
                key={event._id}
                title={event.title}
                description={event.description}
                time={new Date(event.startTime).toLocaleString()}
                venue={event.venue}
                action={
                  <div className="flex items-center gap-3">
                    {registered ? <StatusBadge status="paid" /> : null}
                    <GradientButton onClick={() => handleRegister(event._id)}>Register</GradientButton>
                  </div>
                }
              >
                <div className="flex items-center justify-between text-sm text-[#9a9aa8]">
                  <span>Fee: ₹{event.fee}</span>
                  <span>Seats: {event.maxSeats}</span>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
