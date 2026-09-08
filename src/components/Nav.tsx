import { NAV_ITEMS, type PageKey } from '../nav'

interface NavProps {
  current: PageKey
  onNavigate: (key: PageKey) => void
}

export function Nav({ current, onNavigate }: NavProps) {
  return (
    <nav className="app-sidebar">
      <div className="app-brand">AI中试基地看板平台</div>
      <ul className="app-nav">
        {NAV_ITEMS.map((item) => (
          <li key={item.key} className={item.key === current ? 'active' : undefined}>
            <button type="button" onClick={() => onNavigate(item.key)}>
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
