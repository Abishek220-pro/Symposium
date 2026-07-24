import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GradientButton from '../components/GradientButton'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const { login, setError, error } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const user = await login(form.email, form.password)
      if (user.role === 'participant') navigate('/participant')
      else if (user.role === 'organizer') navigate('/organizer')
      else if (user.role === 'volunteer') navigate('/volunteer')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] px-6 py-20 text-white">
      <div className="mx-auto flex max-w-md flex-col rounded-2xl border border-[#2a2a38] bg-[#15151f] p-8 shadow-2xl">
        <h1 className="text-2xl font-semibold">Welcome back</h1>
        <p className="mt-2 text-sm text-[#9a9aa8]">Continue to your symposium dashboard.</p>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <input className="w-full rounded-xl border border-[#2a2a38] bg-[#1c1c28] px-4 py-3 text-white outline-none" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input type="password" className="w-full rounded-xl border border-[#2a2a38] bg-[#1c1c28] px-4 py-3 text-white outline-none" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          {error ? <p className="text-sm text-rose-400">{error}</p> : null}
          <GradientButton type="submit">Log in</GradientButton>
        </form>
      </div>
    </div>
  )
}
