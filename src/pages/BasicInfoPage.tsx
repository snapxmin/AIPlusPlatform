import { baseBasicInfoList } from '../data/mockData'
import { formatComputingPower, formatWan } from '../utils/format'
import type { PageKey } from '../nav'

interface BasicInfoPageProps {
  onNavigate: (key: PageKey, baseId?: string) => void
}

export function BasicInfoPage({ onNavigate }: BasicInfoPageProps) {
  return (
    <div>
      <h1 className="page-title">基础信息</h1>
      <p className="page-subtitle">
        批次、行业、部委、申报方向、地域、批复状态、申报/承接/运营单位、华为标杆及生态合作伙伴、基地规模
      </p>

      {baseBasicInfoList.map((base) => (
        <div className="card" key={base.id}>
          <div className="card-title">
            <span>{base.name}</span>
            <span className={`badge status-${base.approvalStatus}`}>{base.approvalStatus}</span>
          </div>

          <div className="grid-2">
            <ul className="metric-list">
              <li>
                <span className="label">批次</span>
                <span className="value">{base.batch}</span>
              </li>
              <li>
                <span className="label">行业</span>
                <span className="value">{base.industry}</span>
              </li>
              <li>
                <span className="label">部委</span>
                <span className="value">{base.ministry}</span>
              </li>
              <li>
                <span className="label">申报方向</span>
                <span className="value">{base.declarationDirection}</span>
              </li>
              <li>
                <span className="label">地域</span>
                <span className="value">{base.region}</span>
              </li>
              <li>
                <span className="label">申报单位</span>
                <span className="value">{base.applicantUnit}</span>
              </li>
              <li>
                <span className="label">承接单位</span>
                <span className="value">{base.undertakingUnit}</span>
              </li>
              <li>
                <span className="label">运营单位</span>
                <span className="value">{base.operatingUnit}</span>
              </li>
              <li>
                <span className="label">是否华为标杆</span>
                <span className="value">
                  {base.isHuaweiBenchmark ? `是（${base.benchmarkLevel}）` : '否'}
                </span>
              </li>
            </ul>

            <div>
              <div className="card-title" style={{ fontSize: 13 }}>
                基地规模
              </div>
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
            </div>
          </div>

          <div className="card-title" style={{ fontSize: 13, marginTop: 16 }}>
            生态及合作伙伴
          </div>
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
      ))}
    </div>
  )
}
