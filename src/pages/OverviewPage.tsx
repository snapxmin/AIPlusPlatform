import { baseBasicInfoList, baseBusinessInfoList } from '../data/mockData'
import { formatComputingPower, formatWan } from '../utils/format'
import type { PageKey } from '../nav'

interface OverviewPageProps {
  onNavigate: (key: PageKey, baseId?: string) => void
}

export function OverviewPage({ onNavigate }: OverviewPageProps) {
  const totalBases = baseBasicInfoList.length
  const approvedBases = baseBasicInfoList.filter((b) => b.approvalStatus === '已批复').length
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

  return (
    <div>
      <h1 className="page-title">看板总览</h1>
      <p className="page-subtitle">全面查看AI中试基地/平台的发展现状与统计，辅助经营决策</p>

      <div className="summary-cards">
        <div className="summary-card">
          <div className="label">基地总数</div>
          <div className="value">{totalBases}</div>
        </div>
        <div className="summary-card">
          <div className="label">已批复基地数</div>
          <div className="value">{approvedBases}</div>
        </div>
        <div className="summary-card">
          <div className="label">华为标杆基地数</div>
          <div className="value">{benchmarkBases}</div>
        </div>
        <div className="summary-card">
          <div className="label">规划建设金额</div>
          <div className="value">{formatWan(totalConstructionAmount)}</div>
        </div>
        <div className="summary-card">
          <div className="label">规划算力规模</div>
          <div className="value">{formatComputingPower(totalPlannedPower)}</div>
        </div>
        <div className="summary-card">
          <div className="label">昇腾算力规模（实际）</div>
          <div className="value">{formatComputingPower(totalAscendScale)}</div>
        </div>
        <div className="summary-card">
          <div className="label">年度预计总收入</div>
          <div className="value">{formatWan(totalExpectedRevenue)}</div>
        </div>
        <div className="summary-card">
          <div className="label">年度已完成总收入</div>
          <div className="value">{formatWan(totalRevenueCompleted)}</div>
        </div>
      </div>

      <div className="card">
        <div className="card-title">基地现状一览</div>
        <table className="data-table">
          <thead>
            <tr>
              <th>基地名称</th>
              <th>批次</th>
              <th>行业</th>
              <th>地域</th>
              <th>批复状态</th>
              <th>华为标杆</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {baseBasicInfoList.map((base) => (
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
    </div>
  )
}
