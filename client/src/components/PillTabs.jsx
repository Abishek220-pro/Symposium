export default function PillTabs({ tabs, activeTab, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.value
        return (
          <button
            key={tab.value}
            type="button"
            onClick={() => onChange(tab.value)}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              isActive
                ? 'border-transparent bg-gradient-to-r from-[#7c3aed] to-[#db2777] text-white'
                : 'border-[#2a2a38] bg-transparent text-[#9a9aa8] hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
