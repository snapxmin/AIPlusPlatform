import { useMemo, useState } from 'react'
import {
  baseBasicInfoList,
  keyActivityList,
  scenarioList,
  trialPlatformList,
} from '../data/mockData'

const architectureLabel: Record<string, string> = {
  AKDI: 'AKDI',
  DIMAK: 'DIMAK',
}

export function ActivitiesPage() {
  const [scenarioFilter, setScenarioFilter] = useState<'all' | 'key'>('all')

  const visibleScenarios = useMemo(
    () =>
      scenarioFilter === 'key' ? scenarioList.filter((s) => s.isKeyScenario) : scenarioList,
    [scenarioFilter],
  )

  return (
    <div>
      <h1 className="page-title">三大关键活动</h1>
      <p className="page-subtitle">场景全景图、中试平台建设情况、关键生态活动动态</p>

      <div className="card">
        <div className="card-title">
          <span>场景全景图</span>
          <span>
            <button
              type="button"
              className="link-button"
              style={{ marginRight: 12 }}
              onClick={() => setScenarioFilter('all')}
            >
              全部场景
            </button>
            <button type="button" className="link-button" onClick={() => setScenarioFilter('key')}>
              仅看重点场景
            </button>
          </span>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>场景名称</th>
              <th>所属分类</th>
              <th>是否重点场景</th>
              <th>场景引入的伙伴</th>
              <th>其他信息</th>
            </tr>
          </thead>
          <tbody>
            {visibleScenarios.map((scenario) => (
              <tr key={scenario.id}>
                <td>{scenario.name}</td>
                <td>{scenario.category}</td>
                <td>
                  {scenario.isKeyScenario ? (
                    <span className="badge benchmark">重点场景</span>
                  ) : (
                    '普通场景'
                  )}
                </td>
                <td>{scenario.partnersIntroduced.join('、') || '—'}</td>
                <td>{scenario.notes ?? '待补充'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <div className="card-title">中试平台建设情况</div>
        <table className="data-table">
          <thead>
            <tr>
              <th>所属基地</th>
              <th>参考架构</th>
              <th>客户已完成情况</th>
              <th>华为参与情况</th>
            </tr>
          </thead>
          <tbody>
            {trialPlatformList.map((tp) => {
              const base = baseBasicInfoList.find((b) => b.id === tp.baseId)
              return (
                <tr key={tp.id}>
                  <td>{base?.name ?? tp.baseId}</td>
                  <td>{architectureLabel[tp.architecture]}</td>
                  <td>{tp.customerProgress}</td>
                  <td>{tp.huaweiParticipation}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="card">
        <div className="card-title">关键生态活动</div>
        <p className="page-subtitle" style={{ marginBottom: 12 }}>
          启动会、生态联结会、成果发布、参与各种大会发布
        </p>
        {keyActivityList.map((activity) => (
          <div className="news-item" key={activity.id}>
            <span className="badge category">{activity.type}</span>{' '}
            <strong>{activity.title}</strong>
            <div className="news-meta">
              {activity.date} · {activity.location}
            </div>
            <div>{activity.description}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
