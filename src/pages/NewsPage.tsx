import { useMemo, useState } from 'react'
import { MetricCard } from '../components/MetricCard'
import { PageHeader } from '../components/PageHeader'
import { newsList } from '../data/mockData'
import type { NewsCategory } from '../types'

const categories: (NewsCategory | 'all')[] = ['all', '政策动态', '行业动态', '产业动态']
const categoryLabel: Record<NewsCategory | 'all', string> = {
  all: '全部',
  政策动态: '政策动态',
  行业动态: '行业动态',
  产业动态: '产业动态',
}

export function NewsPage() {
  const [category, setCategory] = useState<NewsCategory | 'all'>('all')
  const categoryCounts = newsList.reduce<Record<NewsCategory, number>>(
    (counts, news) => {
      counts[news.category] += 1
      return counts
    },
    { 政策动态: 0, 行业动态: 0, 产业动态: 0 },
  )

  const visibleNews = useMemo(
    () =>
      newsList
        .filter((news) => category === 'all' || news.category === category)
        .sort((a, b) => b.date.localeCompare(a.date)),
    [category],
  )

  return (
    <div className="news-page">
      <PageHeader
        eyebrow="Intelligence Center"
        title="政策/行业动态"
        description="汇聚政策、行业与产业信号，为基地建设和经营判断提供资讯参考"
      />

      <div className="dashboard-grid dashboard-grid--metrics news-metrics">
        <MetricCard
          label="资讯总量"
          value={newsList.length}
          icon="news"
          detail="当前收录动态"
        />
        <MetricCard
          label="政策动态"
          value={categoryCounts.政策动态}
          icon="check"
          tone="primary"
          detail="政策与支持措施"
        />
        <MetricCard
          label="行业动态"
          value={categoryCounts.行业动态}
          icon="trend"
          tone="cyan"
          detail="行业趋势与应用进展"
        />
        <MetricCard
          label="产业动态"
          value={categoryCounts.产业动态}
          icon="building"
          tone="warning"
          detail="产业链与生态观察"
        />
      </div>

      <section className="news-portal" aria-labelledby="news-feed-title">
        <div className="news-portal__header">
          <div>
            <span className="page-eyebrow">Latest Intelligence</span>
            <h2 id="news-feed-title">动态资讯</h2>
          </div>
          <div className="news-filters" aria-label="资讯分类">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                aria-label={categoryLabel[item]}
                aria-pressed={category === item}
                onClick={() => setCategory(item)}
              >
                {categoryLabel[item]}
                <span>{item === 'all' ? newsList.length : categoryCounts[item]}</span>
              </button>
            ))}
          </div>
        </div>

        {visibleNews.length === 0 ? (
          <p className="empty-state">暂无相关动态</p>
        ) : (
          <div className="news-grid">
            {visibleNews.map((news, index) => {
              const [year, month, day] = news.date.split('-')
              return (
                <article
                  className={`news-card${index === 0 ? ' news-featured' : ''}`}
                  key={news.id}
                >
                  <div className="news-card__meta">
                    <span className="badge category">{news.category}</span>
                    <time dateTime={news.date}>
                      {year}年{Number(month)}月{Number(day)}日
                    </time>
                  </div>
                  <h3>{news.title}</h3>
                  <p>{news.summary}</p>
                  <footer>
                    <span>来源</span>
                    <strong>{news.source}</strong>
                  </footer>
                </article>
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}
