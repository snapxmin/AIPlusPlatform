import { useState } from 'react'
import { Icon } from '../components/Icon'
import { PageHeader } from '../components/PageHeader'
import { baseBasicInfoList } from '../data/mockData'
import { formatComputingPower, formatWan } from '../utils/format'
import type { PageKey } from '../nav'

interface BasicInfoPageProps {
  onNavigate: (key: PageKey, baseId?: string) => void
}

export function BasicInfoPage({ onNavigate }: BasicInfoPageProps) {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('全部状态')
  const [industry, setIndustry] = useState('全部行业')

  const statuses = [...new Set(baseBasicInfoList.map((base) => base.approvalStatus))]
  const industries = [...new Set(baseBasicInfoList.map((base) => base.industry))]
  const visibleBases = baseBasicInfoList.filter((base) => {
    const matchesQuery =
      !query ||
      [base.name, base.region, base.industry].some((value) => value.includes(query.trim()))
    const matchesStatus = status === '全部状态' || base.approvalStatus === status
    const matchesIndustry = industry === '全部行业' || base.industry === industry
    return matchesQuery && matchesStatus && matchesIndustry
  })

  return (
    <div>
      <PageHeader
        eyebrow="BASE DIRECTORY"
        title="基础信息"
        description="集中查看基地申报属性、组织架构、建设规模与生态伙伴，快速定位重点基地。"
      />

      <div className="filter-bar" aria-label="基地筛选">
        <label className="search-field">
          <span className="sr-only">搜索基地</span>
          <Icon name="search" size={18} />
          <input
            type="search"
            aria-label="搜索基地"
            placeholder="搜索基地、地域或行业"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <select aria-label="筛选批复状态" value={status} onChange={(event) => setStatus(event.target.value)}>
          <option>全部状态</option>
          {statuses.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <select aria-label="筛选行业" value={industry} onChange={(event) => setIndustry(event.target.value)}>
          <option>全部行业</option>
          {industries.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <span className="filter-result">共 {visibleBases.length} 个基地</span>
      </div>

      <div className="base-card-list">
        {visibleBases.map((base) => (
          <article className="card base-info-card" key={base.id}>
            <header className="base-info-card__header">
              <div>
                <div className="base-info-card__meta">
                  <span>{base.batch}</span>
                  <span>{base.region}</span>
                  <span>{base.industry}</span>
                </div>
                <h2>{base.name}</h2>
                <p>{base.declarationDirection}</p>
              </div>
              <div className="base-info-card__badges">
                {base.isHuaweiBenchmark && <span className="badge benchmark">{base.benchmarkLevel}</span>}
            <span className={`badge status-${base.approvalStatus}`}>{base.approvalStatus}</span>
              </div>
            </header>

            <div className="base-info-card__body">
              <section className="base-info-section">
                <h3>组织信息</h3>
                <dl className="info-definitions">
                  <div>
                    <dt>主管部委</dt>
                    <dd>{base.ministry}</dd>
                  </div>
                  <div>
                    <dt>申报单位</dt>
                    <dd>{base.applicantUnit}</dd>
                  </div>
                  <div>
                    <dt>承接单位</dt>
                    <dd>{base.undertakingUnit}</dd>
                  </div>
                  <div>
                    <dt>运营单位</dt>
                    <dd>{base.operatingUnit}</dd>
                  </div>
                </dl>
              </section>
              <section className="base-info-section">
                <h3>基地规模</h3>
              <ul className="metric-list">
                <li>
                  <span className="label">建设金额</span>
                  <span className="value">{formatWan(base.scale.constructionAmountWan)}</span>
                </li>
                <li>
                  <span className="label">规划算力规模（总）</span>
                  <span className="value">
                    {formatComputingPower(base.scale.plannedComputingPowerP)}
                  </span>
                </li>
                <li>
                  <span className="label">规划自建规模</span>
                  <span className="value">
                    {formatComputingPower(base.scale.plannedSelfBuiltP)}
                  </span>
                </li>
                <li>
                  <span className="label">规划租赁规模</span>
                  <span className="value">{formatComputingPower(base.scale.plannedLeasedP)}</span>
                </li>
              </ul>
              <button
                type="button"
                className="link-button"
                onClick={() => onNavigate('business', base.id)}
              >
                查看昇腾规模及经营信息 →
              </button>
              </section>
            </div>

            <section className="base-info-section base-info-section--partners">
              <h3>生态及合作伙伴</h3>
              <div className="table-wrap">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>伙伴名称</th>
                      <th>合作方面</th>
                      <th>伙伴类别（七类伙伴定义）</th>
                    </tr>
                  </thead>
                  <tbody>
                    {base.partners.map((partner) => (
                      <tr key={partner.id}>
                        <td>{partner.name}</td>
                        <td>{partner.cooperationArea}</td>
                        <td>
                          <span className="badge category">{partner.category}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </article>
        ))}
        {visibleBases.length === 0 && (
          <div className="card empty-state">
            <Icon name="search" size={24} />
            <span>未找到符合条件的基地</span>
          </div>
        )}
      </div>
    </div>
  )
}
