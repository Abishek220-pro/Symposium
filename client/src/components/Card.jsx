import { Clock3, MapPin } from 'lucide-react'

export default function Card({ title, description, time, venue, image, action, children, className = '' }) {
  return (
    <article className={`flex items-start justify-between gap-4 rounded-2xl border border-[#2a2a38] bg-[#15151f] p-5 shadow-lg shadow-black/20 ${className}`}>
      <div className="flex min-w-0 flex-1 items-start gap-4">
        {image ? (
          <img src={image} alt={title} className="h-20 w-20 shrink-0 rounded-xl object-cover" />
        ) : null}
        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            {description ? <p className="text-sm text-[#9a9aa8]">{description}</p> : null}
          </div>
          {(time || venue) ? (
            <div className="mt-3 flex flex-wrap gap-4 text-sm text-[#9a9aa8]">
              {time ? <span className="flex items-center gap-2"><Clock3 size={14} />{time}</span> : null}
              {venue ? <span className="flex items-center gap-2"><MapPin size={14} />{venue}</span> : null}
            </div>
          ) : null}
          {children ? <div className="mt-3">{children}</div> : null}
        </div>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </article>
  )
}
