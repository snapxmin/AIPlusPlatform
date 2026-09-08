import { useState } from 'react'
import { Icon } from './components/Icon'
import { Nav } from './components/Nav'
import type { PageKey } from './nav'
import { OverviewPage } from './pages/OverviewPage'
import { BasicInfoPage } from './pages/BasicInfoPage'
import { BusinessInfoPage } from './pages/BusinessInfoPage'
import { ActivitiesPage } from './pages/ActivitiesPage'
import { NewsPage } from './pages/NewsPage'

function App() {
  const [page, setPage] = useState<PageKey>('overview')
  const [selectedBaseId, setSelectedBaseId] = useState<string | undefined>(undefined)

  function handleNavigate(nextPage: PageKey, baseId?: string) {
    setPage(nextPage)
    setSelectedBaseId(baseId)
  }

  return (
    <div className="app-shell">
      <div className="mobile-brand">
        <span className="mobile-brand__mark">
          <Icon name="building" size={20} />
        </span>
        <span>AI 中试基地</span>
      </div>
      <Nav current={page} onNavigate={(key) => handleNavigate(key)} />
      <div className="app-workspace">
        <div className="app-updated">
          <span>数据更新于</span>
          <time dateTime="2026-03-01T09:00:00+08:00">2026-03-01 09:00</time>
        </div>
        <main className="app-main">
          {page === 'overview' && <OverviewPage onNavigate={handleNavigate} />}
          {page === 'basic' && <BasicInfoPage onNavigate={handleNavigate} />}
          {page === 'business' && (
            <BusinessInfoPage key={selectedBaseId ?? 'default'} selectedBaseId={selectedBaseId} />
          )}
          {page === 'activities' && <ActivitiesPage />}
          {page === 'news' && <NewsPage />}
        </main>
      </div>
    </div>
  )
}

export default App
