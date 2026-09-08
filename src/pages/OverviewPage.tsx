import type { CSSProperties } from 'react'
import { Icon } from '../components/Icon'
import { MetricCard } from '../components/MetricCard'
import { PageHeader } from '../components/PageHeader'
import { baseBasicInfoList, baseBusinessInfoList } from '../data/mockData'
import { formatComputingPower, formatWan } from '../utils/format'
import type { PageKey } from '../nav'

interface OverviewPageProps {
  onNavigate: (key: PageKey, baseId?: string) => void
}

export function OverviewPage({ onNavigate }: OverviewPageProps) {
  const totalBases = baseBasicInfoList.length
  const approvedBases = baseBasicInfoList.filter((b) => b.approvalStatus === '已批复').length
  const approvalRate = totalBases === 0 ? 0 : (approvedBases / totalBases) * 100
  const benchmarkBases = baseBasicInfoList.filter((b) => b.isHuaweiBenchmark).length
  const totalConstructionAmount = baseBasicInfoList.reduce(
    (sum, b) => sum + b.scale.constructionAmountWan,
    0,
  )
  const totalPlannedPower = baseBasicInfoList.reduce(
    (sum, b) => sum + b.scale.plannedComputingPowerP,
    0,
  )
  const totalAscendScale = baseBusinessInfoList.reduce((sum, b) => sum + b.ascendScaleP, 0)
  const totalExpectedRevenue = baseBusinessInfoList.reduce(
    (sum, b) => sum + b.expectedRevenueAnnualWan,
    0,
  )
  const totalRevenueCompleted = baseBusinessInfoList.reduce(
    (sum, b) => sum + b.revenueCompleted.annualWan,
    0,
  )
  const revenueRate =
    totalExpectedRevenue === 0 ? 0 : (totalRevenueCompleted / totalExpectedRevenue) * 100
  const regionRows = Object.entries(
    baseBasicInfoList.reduce<Record<string, number>>((acc, base) => {
      const region = base.region.split('（')[0]
      acc[region] = (acc[region] ?? 0) + 1
      return acc
    }, {}),
  )
  const maxRegionCount = Math.max(...regionRows.map(([, count]) => count), 1)
  const statusRows = Object.entries(
    baseBasicInfoList.reduce<Record<string, number>>((acc, base) => {
      acc[base.approvalStatus] = (acc[base.approvalStatus] ?? 0) + 1
      return acc
    }, {}),
  )
  const baseRows = baseBasicInfoList.map((base) => {
    const business = baseBusinessInfoList.find((item) => item.baseId === base.id)
    const completionRate =
      !business || business.expectedRevenueAnnualWan === 0
        ? 0
        : (business.revenueCompleted.annualWan / business.expectedRevenueAnnualWan) * 100

    return { base, business, completionRate }
  })
  const rankingRows = [...baseRows].sort((a, b) => b.completionRate - a.completionRate)
  const quarterValues = [1, 2, 3, 4].map((quarter) =>
    Math.round((totalExpectedRevenue * quarter) / 4),
  )
  const quarterMax = Math.max(...quarterValues, 1)
  const quarterPoints = quarterValues
    .map((value, index) => `${24 + index * 78},${104 - (value / quarterMax) * 76}`)
    .join(' ')

  return (
    <div className="overview-page">
      <PageHeader
        eyebrow="Executive Dashboard"
        title="看板总览"
        description="聚焦批复、建设、算力与收入进展，为基地经营决策提供统一视图"
      />

      <div className="dashboard-grid dashboard-grid--metrics">
        <MetricCard label="基地总数" value={totalBases} icon="building" detail="纳入管理范围" />
        <MetricCard
          label="批复率"
          value={`${approvalRate.toFixed(1)}%`}
          icon="check"
          tone="success"
          detail={`${approvedBases} 个基地已批复`}
          progress={approvalRate}
        />
        <MetricCard
          label="华为标杆基地"
          value={benchmarkBases}
          icon="star"
          tone="warning"
          detail={`占全部基地 ${totalBases === 0 ? '0.0' : ((benchmarkBases / totalBases) * 100).toFixed(1)}%`}
        />
        <MetricCard
          label="规划建设金额"
          value={formatWan(totalConstructionAmount)}
          icon="revenue"
          detail="全部基地规划合计"
        />
        <MetricCard
          label="规划算力规模"
          value={formatComputingPower(totalPlannedPower)}
          icon="cpu"
          tone="cyan"
          detail="规划自建与租赁算力"
        />
        <MetricCard
          label="实际昇腾算力"
          value={formatComputingPower(totalAscendScale)}
          icon="cpu"
          tone="success"
          detail="经营数据实际规模"
        />
        <MetricCard
          label="年度预计总收入"
          value={formatWan(totalExpectedRevenue)}
          icon="calendar"
          detail="年度经营目标"
        />
        <MetricCard
          label="年度收入完成率"
          value={`${revenueRate.toFixed(1)}%`}
          icon="trend"
          tone="warning"
          detail={`已完成 ${formatWan(totalRevenueCompleted)}`}
          progress={revenueRate}
        />
      </div>

      <div className="dashboard-grid dashboard-grid--charts">
        <section className="chart-card">
          <div className="card-title">
            <span>年度收入目标</span>
            <Icon name="revenue" size={18} />
          </div>
          <div className="chart-value">{formatWan(totalRevenueCompleted)}</div>
          <div className="chart-caption">目标 {formatWan(totalExpectedRevenue)}</div>
          <div className="progress-track" role="progressbar" aria-label="年度收入目标完成进度">
            <span style={{ width: `${Math.min(revenueRate, 100)}%` }} />
          </div>
          <strong className="progress-label">{revenueRate.toFixed(1)}%</strong>
        </section>

        <section className="chart-card">
          <div className="card-title">
            <span>季度目标趋势</span>
            <Icon name="trend" size={18} />
          </div>
          <svg
            className="quarter-chart"
            viewBox="0 0 280 130"
            role="img"
            aria-label="四个季度累计收入目标趋势"
          >
            {[1, 2, 3, 4].map((quarter, index) => (
              <g key={quarter}>
                <line x1={24 + index * 78} y1="20" x2={24 + index * 78} y2="108" />
                <text x={24 + index * 78} y="126">
                  Q{quarter}
                </text>
              </g>
            ))}
            <polyline points={quarterPoints} />
            {quarterValues.map((value, index) => (
              <circle
                key={value}
                cx={24 + index * 78}
                cy={104 - (value / quarterMax) * 76}
                r="4"
              />
            ))}
          </svg>
        </section>

        <section className="chart-card">
          <div className="card-title">
            <span>基地地域分布</span>
            <Icon name="map" size={18} />
          </div>
          <div className="bar-list">
            {regionRows.map(([region, count]) => (
              <div className="bar-list__row" key={region}>
                <span>{region}</span>
                <div className="progress-track">
                  <span style={{ width: `${(count / maxRegionCount) * 100}%` }} />
                </div>
                <strong>{count}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="chart-card chart-card--donut">
          <div className="card-title">
            <span>批复状态</span>
            <Icon name="check" size={18} />
          </div>
          <div
            className="donut"
            style={{ '--donut-value': `${approvalRate}%` } as CSSProperties}
            role="img"
            aria-label={`基地批复率 ${approvalRate.toFixed(1)}%`}
          >
            <span>{approvalRate.toFixed(0)}%</span>
          </div>
          <div className="donut-legend">
            {statusRows.map(([status, count]) => (
              <span key={status}>
                {status} <strong>{count}</strong>
              </span>
            ))}
          </div>
        </section>
      </div>

      <section className="chart-card ranking-card">
        <div className="card-title">重点基地进展</div>
        <div className="ranking-list">
          {rankingRows.map(({ base, completionRate }, index) => (
            <div className="ranking-list__item" key={base.id}>
              <span className="ranking-list__index">{index + 1}</span>
              <div>
                <strong>{base.name.replace('AI中试基地', '基地')}</strong>
                <div className="progress-track">
                  <span style={{ width: `${Math.min(completionRate, 100)}%` }} />
                </div>
              </div>
              <span>{completionRate.toFixed(1)}%</span>
              <button type="button" onClick={() => onNavigate('business', base.id)}>
                查看经营
                <Icon name="arrow" size={14} />
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="chart-card">
        <div className="card-title">基地现状一览</div>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>基地名称</th>
                <th>批次</th>
                <th>行业</th>
                <th>地域</th>
                <th>批复状态</th>
                <th>华为标杆</th>
                <th>建设金额</th>
                <th>实际/昇腾算力</th>
                <th>年度收入完成度</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {baseRows.map(({ base, business, completionRate }) => (
                <tr key={base.id}>
                  <td>{base.name}</td>
                  <td>{base.batch}</td>
                  <td>{base.industry}</td>
                  <td>{base.region}</td>
                  <td>
                    <span className={`badge status-${base.approvalStatus}`}>
                      {base.approvalStatus}
                    </span>
                  </td>
                  <td>
                    {base.isHuaweiBenchmark ? (
                      <span className="badge benchmark">{base.benchmarkLevel}</span>
                    ) : (
                      '否'
                    )}
                  </td>
                  <td>{formatWan(base.scale.constructionAmountWan)}</td>
                  <td>
                    {formatComputingPower(business?.actualComputingPowerP ?? 0)} /{' '}
                    {formatComputingPower(business?.ascendScaleP ?? 0)}
                  </td>
                  <td>
                    <div className="table-progress">
                      <div className="progress-track">
                        <span style={{ width: `${Math.min(completionRate, 100)}%` }} />
                      </div>
                      <span>{completionRate.toFixed(1)}%</span>
                    </div>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="link-button"
                      onClick={() => onNavigate('basic', base.id)}
                    >
                      查看基础信息
                    </button>{' '}
                    /{' '}
                    <button
                      type="button"
                      className="link-button"
                      onClick={() => onNavigate('business', base.id)}
                    >
                      查看经营信息
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
