import { useMemo, useState } from 'react'
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

  const activeBaseId = selectedBaseId ?? baseId
  const base = baseBasicInfoList.find((b) => b.id === activeBaseId)
  const business = useMemo(() => getBusinessInfoById(activeBaseId), [activeBaseId])

  return (
    <div>
      <h1 className="page-title">经营信息</h1>
      <p className="page-subtitle">
        关联机会点、项目/客户级别、预计收入、已完成订货/收入、预期剩余收入、算力规模（含昇腾规模）
      </p>

      <div className="base-selector">
        <select
          value={activeBaseId}
          onChange={(e) => setBaseId(e.target.value)}
          aria-label="选择基地"
        >
          {baseBasicInfoList.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>
      </div>

      {!business || !base ? (
        <div className="card">暂无经营信息数据</div>
      ) : (
        <>
          <div className="grid-2">
            <div className="card">
              <div className="card-title">基本经营属性</div>
              <ul className="metric-list">
                <li>
                  <span className="label">关联机会点</span>
                  <span className="value">{business.opportunityPoints.join('、')}</span>
                </li>
                <li>
                  <span className="label">项目级别</span>
                  <span className="value">{business.projectLevel}</span>
                </li>
                <li>
                  <span className="label">客户级别</span>
                  <span className="value">{business.customerLevel}</span>
                </li>
                <li>
                  <span className="label">预计收入（年度）</span>
                  <span className="value">{formatWan(business.expectedRevenueAnnualWan)}</span>
                </li>
                <li>
                  <span className="label">昇腾建设份额</span>
                  <span className="value">{formatPercent(business.ascendShareRatio)}</span>
                </li>
                <li>
                  <span className="label">昇腾建设金额</span>
                  <span className="value">{formatWan(business.ascendAmountWan)}</span>
                </li>
                <li>
                  <span className="label">预期剩余收入</span>
                  <span className="value">
                    {formatWan(computeRemainingRevenueWan(business))}
                  </span>
                </li>
              </ul>
            </div>

            <div className="card">
              <div className="card-title">算力规模</div>
              <ul className="metric-list">
                <li>
                  <span className="label">实际算力规模</span>
                  <span className="value">
                    {formatComputingPower(business.actualComputingPowerP)}
                  </span>
                </li>
                <li>
                  <span className="label">自建规模</span>
                  <span className="value">{formatComputingPower(business.selfBuiltP)}</span>
                </li>
                <li>
                  <span className="label">租赁规模</span>
                  <span className="value">{formatComputingPower(business.leasedP)}</span>
                </li>
                <li>
                  <span className="label">昇腾规模</span>
                  <span className="value">{formatComputingPower(business.ascendScaleP)}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="card">
            <div className="card-title">已完成订货（区分产品）</div>
            <ul className="metric-list">
              <li>
                <span className="label">累计已完成</span>
                <span className="value">{formatWan(business.ordersCompleted.cumulativeWan)}</span>
              </li>
              <li>
                <span className="label">年度已完成</span>
                <span className="value">{formatWan(business.ordersCompleted.annualWan)}</span>
              </li>
            </ul>
            <table className="data-table">
              <thead>
                <tr>
                  <th>产品</th>
                  <th>累计已完成</th>
                  <th>年度已完成</th>
                </tr>
              </thead>
              <tbody>
                {business.ordersCompleted.byProduct.map((p) => (
                  <tr key={p.product}>
                    <td>{p.product}</td>
                    <td>{formatWan(p.cumulative)}</td>
                    <td>{formatWan(p.annual)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="card">
            <div className="card-title">已完成收入（区分产品）</div>
            <ul className="metric-list">
              <li>
                <span className="label">累计已完成</span>
                <span className="value">{formatWan(business.revenueCompleted.cumulativeWan)}</span>
              </li>
              <li>
                <span className="label">年度已完成</span>
                <span className="value">{formatWan(business.revenueCompleted.annualWan)}</span>
              </li>
            </ul>
            <table className="data-table">
              <thead>
                <tr>
                  <th>产品</th>
                  <th>累计已完成</th>
                  <th>年度已完成</th>
                </tr>
              </thead>
              <tbody>
                {business.revenueCompleted.byProduct.map((p) => (
                  <tr key={p.product}>
                    <td>{p.product}</td>
                    <td>{formatWan(p.cumulative)}</td>
                    <td>{formatWan(p.annual)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}
