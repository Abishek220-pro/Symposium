import { Clock3, MapPin } from 'lucide-react'

export default function Card({ title, description, time, venue, image, action, children, className = '' }) {
  return (
    <article className={`rounded-2xl border border-[#2a2a38] bg-[#15151f] p-5 shadow-lg shadow-black/20 ${className}`}>
      <div className="flex gap-4">
        {image ? (
          <img src={image} alt={title} className="h-24 w-24 rounded-xl object-cover" />
        ) : null}
        <div className="flex-1">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              {description ? <p className="mt-2 text-sm text-[#9a9aa8]">{description}</p> : null}
            </div>
            {action ? <div className="shrink-0">{action}</div> : null}
          </div>
          {(time || venue) ? (
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-[#9a9aa8]">
              {time ? <span className="flex items-center gap-2"><Clock3 size={14} />{time}</span> : null}
              {venue ? <span className="flex items-center gap-2"><MapPin size={14} />{venue}</span> : null}
            </div>
          ) : null}
          {children ? <div className="mt-4">{children}</div> : null}
        </div>
      </div>
    </article>
  )
}
