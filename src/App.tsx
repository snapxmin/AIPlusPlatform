import { useState } from 'react'
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
      <Nav current={page} onNavigate={(key) => handleNavigate(key)} />
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
  )
}

export default App
