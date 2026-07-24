import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GradientButton from '../components/GradientButton'
import { useAuth } from '../context/AuthContext'

export default function Signup() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    college: '',
    department: '',
    year: '',
  })
  const { register, setError, error } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const user = await register({ ...form, role: 'participant' })
      if (user.role === 'participant') navigate('/participant')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] px-6 py-20 text-white">
      <div className="mx-auto flex max-w-2xl flex-col rounded-2xl border border-[#2a2a38] bg-[#15151f] p-8 shadow-2xl">
        <h1 className="text-2xl font-semibold">Create your participant account</h1>
        <p className="mt-2 text-sm text-[#9a9aa8]">Register for SYMCRYPT 2K26 and reserve your seat.</p>
        <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
          <input className="rounded-xl border border-[#2a2a38] bg-[#1c1c28] px-4 py-3 text-white outline-none" placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input className="rounded-xl border border-[#2a2a38] bg-[#1c1c28] px-4 py-3 text-white outline-none" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input className="rounded-xl border border-[#2a2a38] bg-[#1c1c28] px-4 py-3 text-white outline-none" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <input type="password" className="rounded-xl border border-[#2a2a38] bg-[#1c1c28] px-4 py-3 text-white outline-none" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <input className="rounded-xl border border-[#2a2a38] bg-[#1c1c28] px-4 py-3 text-white outline-none" placeholder="College" value={form.college} onChange={(e) => setForm({ ...form, college: e.target.value })} />
          <input className="rounded-xl border border-[#2a2a38] bg-[#1c1c28] px-4 py-3 text-white outline-none" placeholder="Department" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} />
          <input className="rounded-xl border border-[#2a2a38] bg-[#1c1c28] px-4 py-3 text-white outline-none" placeholder="Year" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} />
          <div className="md:col-span-2">
            {error ? <p className="mb-3 text-sm text-rose-400">{error}</p> : null}
            <GradientButton type="submit">Create account</GradientButton>
          </div>
        </form>
      </div>
    </div>
  )
}
