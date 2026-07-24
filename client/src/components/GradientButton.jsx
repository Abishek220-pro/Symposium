import { ArrowRight } from 'lucide-react'

export default function GradientButton({ children, onClick, type = 'button', disabled = false, className = '' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#db2777] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-fuchsia-900/20 transition duration-200 hover:scale-[1.02] hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
    >
      <span>{children}</span>
      <ArrowRight size={16} />
    </button>
  )
}
