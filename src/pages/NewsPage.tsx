import { useMemo, useState } from 'react'
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

  const visibleNews = useMemo(
    () => (category === 'all' ? newsList : newsList.filter((n) => n.category === category)),
    [category],
  )

  return (
    <div>
      <h1 className="page-title">政策/行业动态</h1>
      <p className="page-subtitle">政策动态、行业动态、产业动态</p>

      <div className="card">
        <div className="card-title">
          <span>动态资讯</span>
          <span>
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                className="link-button"
                style={{ marginLeft: 12 }}
                onClick={() => setCategory(c)}
              >
                {categoryLabel[c]}
                {category === c ? ' ✓' : ''}
              </button>
            ))}
          </span>
        </div>
        {visibleNews.length === 0 ? (
          <p>暂无相关动态</p>
        ) : (
          visibleNews.map((news) => (
            <div className="news-item" key={news.id}>
              <span className="badge category">{news.category}</span> <strong>{news.title}</strong>
              <div className="news-meta">
                {news.date} · 来源：{news.source}
              </div>
              <div>{news.summary}</div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
