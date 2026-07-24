import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GradientButton from '../../components/GradientButton'
import client from '../../api/client'

export default function AddVolunteer() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' })
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await client.post('/auth/register', { ...form, role: 'volunteer' })
    navigate('/organizer')
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] px-6 py-10 text-white">
      <div className="mx-auto max-w-2xl rounded-2xl border border-[#2a2a38] bg-[#15151f] p-8">
        <h1 className="text-2xl font-semibold">Add a volunteer</h1>
        <p className="mt-2 text-sm text-[#9a9aa8]">Create an organizer-managed volunteer account.</p>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <input className="w-full rounded-xl border border-[#2a2a38] bg-[#1c1c28] px-4 py-3 text-white outline-none" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input className="w-full rounded-xl border border-[#2a2a38] bg-[#1c1c28] px-4 py-3 text-white outline-none" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input className="w-full rounded-xl border border-[#2a2a38] bg-[#1c1c28] px-4 py-3 text-white outline-none" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <input type="password" className="w-full rounded-xl border border-[#2a2a38] bg-[#1c1c28] px-4 py-3 text-white outline-none" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <GradientButton type="submit">Create volunteer</GradientButton>
        </form>
      </div>
    </div>
  )
}
