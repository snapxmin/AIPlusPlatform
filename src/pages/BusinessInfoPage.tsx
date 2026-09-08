import { useMemo, useState } from 'react'
import { MetricCard } from '../components/MetricCard'
import { PageHeader } from '../components/PageHeader'
import { baseBasicInfoList, getBusinessInfoById } from '../data/mockData'
import {
  computeRemainingRevenueWan,
  formatComputingPower,
  formatPercent,
  formatWan,
} from '../utils/format'

interface BusinessInfoPageProps {
  selectedBaseId?: string
}

export function BusinessInfoPage({ selectedBaseId }: BusinessInfoPageProps) {
  const [baseId, setBaseId] = useState<string>(selectedBaseId ?? baseBasicInfoList[0]?.id ?? '')

  const base = baseBasicInfoList.find((item) => item.id === baseId)
  const business = useMemo(() => getBusinessInfoById(baseId), [baseId])
  const revenueRate =
    !business || business.expectedRevenueAnnualWan === 0
      ? 0
      : (business.revenueCompleted.annualWan / business.expectedRevenueAnnualWan) * 100
  const revenueRateLabel = `${revenueRate.toFixed(1)}%`
  const ascendCoverageRate =
    !business || business.actualComputingPowerP === 0
      ? 0
      : (business.ascendScaleP / business.actualComputingPowerP) * 100

  return (
    <div>
      <PageHeader
        eyebrow="BUSINESS COCKPIT"
        title="经营信息"
        description="跟踪基地年度收入目标、订货与收入结构，以及自建、租赁和昇腾算力投入。"
        actions={
          <label className="base-selector">
            <span>当前基地</span>
            <select
              value={baseId}
              onChange={(event) => setBaseId(event.target.value)}
              aria-label="选择基地"
            >
              {baseBasicInfoList.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
        }
      />

      {!business || !base ? (
        <div className="card empty-state">暂无经营信息数据</div>
      ) : (
        <>
          <section className="business-identity card">
            <div>
              <span className="business-identity__eyebrow">{base.region} · {base.industry}</span>
              <h2>{base.name}</h2>
            </div>
            <div className="business-levels">
              <span>项目级别 <strong>{business.projectLevel}</strong></span>
              <span>客户级别 <strong>{business.customerLevel}</strong></span>
            </div>
            <div className="opportunity-list" aria-label="关联机会点">
              {business.opportunityPoints.map((point) => (
                <span className="opportunity-tag" key={point}>{point}</span>
              ))}
            </div>
          </section>

          <div className="business-metrics">
            <MetricCard
              label="年度预计收入"
              value={formatWan(business.expectedRevenueAnnualWan)}
              icon="revenue"
              detail="年度经营目标"
            />
            <MetricCard
              label="年度已完成"
              value={formatWan(business.revenueCompleted.annualWan)}
              icon="check"
              tone="success"
              detail={`收入完成度 ${revenueRateLabel}`}
              progress={revenueRate}
            />
            <MetricCard
              label="预期剩余收入"
              value={formatWan(computeRemainingRevenueWan(business))}
              icon="trend"
              tone="warning"
              detail="按年度预计收入扣减"
            />
            <MetricCard
              label="昇腾建设金额"
              value={formatWan(business.ascendAmountWan)}
              icon="cpu"
              tone="cyan"
              detail={`建设份额 ${formatPercent(business.ascendShareRatio)}`}
            />
          </div>

          <section className="card business-analysis">
            <div className="business-analysis__heading">
              <div>
                <div className="card-title">收入完成度</div>
                <p>年度收入已完成 {formatWan(business.revenueCompleted.annualWan)}</p>
              </div>
              <strong>{revenueRateLabel}</strong>
            </div>
            <div
              className="revenue-progress"
              role="progressbar"
              aria-label="年度收入完成度"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={revenueRate}
            >
              <span style={{ width: `${Math.min(revenueRate, 100)}%` }} />
            </div>
          </section>

          <section className="card business-analysis">
            <div className="card-title">算力结构</div>
            <div
              className="computing-stack"
              role="img"
              aria-label={`实际算力结构：自建 ${business.selfBuiltP}P，租赁 ${business.leasedP}P，总计 ${business.actualComputingPowerP}P`}
            >
              {business.actualComputingPowerP > 0 && (
                <>
                  <span className="computing-stack__self" style={{ width: `${business.selfBuiltP / business.actualComputingPowerP * 100}%` }} />
                  <span className="computing-stack__leased" style={{ width: `${business.leasedP / business.actualComputingPowerP * 100}%` }} />
                </>
              )}
            </div>
            <div className="computing-legend">
              <span><i className="legend-dot legend-dot--self" />自建 <strong>{formatComputingPower(business.selfBuiltP)}</strong></span>
              <span><i className="legend-dot legend-dot--leased" />租赁 <strong>{formatComputingPower(business.leasedP)}</strong></span>
              <span>实际算力 <strong>{formatComputingPower(business.actualComputingPowerP)}</strong></span>
            </div>
            <div className="ascend-coverage">
              <div className="ascend-coverage__heading">
                <div>
                  <strong>昇腾覆盖实际算力</strong>
                  <span>
                    {formatComputingPower(business.ascendScaleP)} /{' '}
                    {formatComputingPower(business.actualComputingPowerP)}
                  </span>
                </div>
                <strong>{ascendCoverageRate.toFixed(1)}%</strong>
              </div>
              <div
                className="ascend-coverage__progress"
                role="progressbar"
                aria-label="昇腾覆盖实际算力"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={ascendCoverageRate}
              >
                <span style={{ width: `${Math.min(ascendCoverageRate, 100)}%` }} />
              </div>
            </div>
          </section>

          <div className="business-breakdowns">
            <section className="card">
              <div className="card-title">已完成订货（区分产品）</div>
              <div className="breakdown-totals">
                <span>累计 <strong>{formatWan(business.ordersCompleted.cumulativeWan)}</strong></span>
                <span>年度 <strong>{formatWan(business.ordersCompleted.annualWan)}</strong></span>
              </div>
              <div className="table-wrap">
                <table className="data-table">
                  <thead>
                    <tr><th>产品</th><th>累计已完成</th><th>年度已完成</th></tr>
                  </thead>
                  <tbody>
                    {business.ordersCompleted.byProduct.map((product) => (
                      <tr key={product.product}>
                        <td>{product.product}</td>
                        <td>{formatWan(product.cumulative)}</td>
                        <td>{formatWan(product.annual)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
            <section className="card">
              <div className="card-title">已完成收入（区分产品）</div>
              <div className="breakdown-totals">
                <span>累计 <strong>{formatWan(business.revenueCompleted.cumulativeWan)}</strong></span>
                <span>年度 <strong>{formatWan(business.revenueCompleted.annualWan)}</strong></span>
              </div>
              <div className="table-wrap">
                <table className="data-table">
                  <thead>
                    <tr><th>产品</th><th>累计已完成</th><th>年度已完成</th></tr>
                  </thead>
                  <tbody>
                    {business.revenueCompleted.byProduct.map((product) => (
                      <tr key={product.product}>
                        <td>{product.product}</td>
                        <td>{formatWan(product.cumulative)}</td>
                        <td>{formatWan(product.annual)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </>
      )}
    </div>
  )
}
