import { NAV_ITEMS, type PageKey } from '../nav'
import { Icon, type IconName } from './Icon'

interface NavProps {
  current: PageKey
  onNavigate: (key: PageKey) => void
}

const navIcons: Record<PageKey, IconName> = {
  overview: 'overview',
  basic: 'basic',
  business: 'business',
  activities: 'activities',
  news: 'news',
}

export function Nav({ current, onNavigate }: NavProps) {
  return (
    <nav className="app-sidebar">
      <div className="app-brand">
        <div className="app-brand__mark">
          <Icon name="building" size={23} />
        </div>
        <div>
          <div className="app-brand__title">国家人工智能中试基地</div>
          <div className="app-brand__subtitle">经营决策驾驶舱</div>
        </div>
      </div>
      <ul className="app-nav">
        {NAV_ITEMS.map((item) => (
          <li key={item.key} className={item.key === current ? 'active' : undefined}>
            <button
              type="button"
              aria-current={item.key === current ? 'page' : undefined}
              onClick={() => onNavigate(item.key)}
            >
              <Icon name={navIcons[item.key]} size={19} />
              {item.label}
            </button>
          </li>
        ))}
      </ul>
      <div className="app-sidebar__footer">
        <span>2026 年度</span>
        <span>AI 项目组</span>
      </div>
    </nav>
  )
}
