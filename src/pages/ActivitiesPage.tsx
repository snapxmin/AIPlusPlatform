import { useMemo, useState } from 'react'
import { MetricCard } from '../components/MetricCard'
import { PageHeader } from '../components/PageHeader'
import {
  baseBasicInfoList,
  keyActivityList,
  scenarioList,
  trialPlatformList,
} from '../data/mockData'

type ActivitySection = 'scenario' | 'platform' | 'ecosystem'

const sections: { id: ActivitySection; label: string }[] = [
  { id: 'scenario', label: '场景全景图' },
  { id: 'platform', label: '中试平台' },
  { id: 'ecosystem', label: '关键生态活动' },
]

export function ActivitiesPage() {
  const [activeSection, setActiveSection] = useState<ActivitySection>('scenario')
  const [scenarioFilter, setScenarioFilter] = useState<'all' | 'key'>('all')

  const visibleScenarios = useMemo(
    () =>
      scenarioFilter === 'key'
        ? scenarioList.filter((scenario) => scenario.isKeyScenario)
        : scenarioList,
    [scenarioFilter],
  )
  const groupedScenarios = useMemo(
    () =>
      Object.entries(
        visibleScenarios.reduce<Record<string, typeof scenarioList>>((groups, scenario) => {
          const categoryScenarios = groups[scenario.category] ?? []
          categoryScenarios.push(scenario)
          groups[scenario.category] = categoryScenarios
          return groups
        }, {}),
      ),
    [visibleScenarios],
  )
  const keyScenarioCount = scenarioList.filter((scenario) => scenario.isKeyScenario).length
  const architectureCounts = trialPlatformList.reduce<Record<string, number>>(
    (counts, platform) => {
      counts[platform.architecture] = (counts[platform.architecture] ?? 0) + 1
      return counts
    },
    {},
  )
  const sortedActivities = [...keyActivityList].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div className="activities-page">
      <PageHeader
        eyebrow="Activity Portfolio"
        title="三大关键活动"
        description="统筹场景全景、中试平台建设与生态活动，持续跟踪关键进展"
      />

      <div className="dashboard-grid dashboard-grid--metrics activity-metrics">
        <MetricCard
          label="场景总数"
          value={scenarioList.length}
          icon="activities"
          detail="覆盖重点行业应用"
        />
        <MetricCard
          label="重点场景"
          value={keyScenarioCount}
          icon="star"
          tone="warning"
          detail={`占全部场景 ${((keyScenarioCount / scenarioList.length) * 100).toFixed(0)}%`}
        />
        <MetricCard
          label="平台覆盖"
          value={trialPlatformList.length}
          icon="cpu"
          tone="cyan"
          detail="中试平台建设情况"
        />
        <MetricCard
          label="生态活动数"
          value={keyActivityList.length}
          icon="calendar"
          tone="success"
          detail="启动、联结与成果发布"
        />
      </div>

      <div className="section-tabs" role="tablist" aria-label="关键活动视图">
        {sections.map((section) => (
          <button
            key={section.id}
            id={`activity-tab-${section.id}`}
            type="button"
            role="tab"
            aria-selected={activeSection === section.id}
            aria-controls="activity-panel"
            onClick={() => setActiveSection(section.id)}
          >
            {section.label}
          </button>
        ))}
      </div>

      <section
        id="activity-panel"
        className="activity-panel"
        role="tabpanel"
        aria-labelledby={`activity-tab-${activeSection}`}
      >
        {activeSection === 'scenario' && (
          <>
            <div className="activity-panel__heading">
              <div>
                <h2>行业场景分布</h2>
                <p>按行业查看场景、合作伙伴与建设重点</p>
              </div>
              <div className="segmented-filter" aria-label="场景范围">
                <button
                  type="button"
                  aria-pressed={scenarioFilter === 'all'}
                  onClick={() => setScenarioFilter('all')}
                >
                  全部
                </button>
                <button
                  type="button"
                  aria-pressed={scenarioFilter === 'key'}
                  onClick={() => setScenarioFilter('key')}
                >
                  华为重点
                </button>
              </div>
            </div>

            <div className="scenario-grid">
              {groupedScenarios.map(([category, scenarios]) => (
                <article className="scenario-card" key={category}>
                  <header>
                    <div>
                      <span className="scenario-card__eyebrow">行业场景</span>
                      <h3>{category}</h3>
                    </div>
                    <strong>{scenarios.length}</strong>
                  </header>
                  <div className="scenario-card__list">
                    {scenarios.map((scenario) => (
                      <div className="scenario-card__item" key={scenario.id}>
                        <div>
                          <h4>{scenario.name}</h4>
                          {scenario.isKeyScenario && (
                            <span className="badge benchmark">重点场景</span>
                          )}
                        </div>
                        <p>{scenario.notes ?? '建设信息待补充'}</p>
                        <span>合作伙伴：{scenario.partnersIntroduced.join('、') || '待引入'}</span>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </>
        )}

        {activeSection === 'platform' && (
          <>
            <div className="activity-panel__heading">
              <div>
                <h2>参考架构覆盖</h2>
                <p>跟踪架构落位、客户建设进度及华为参与状态</p>
              </div>
              <div className="architecture-summary" aria-label="参考架构平台数量">
                {Object.entries(architectureCounts).map(([architecture, count]) => (
                  <span key={architecture}>
                    {architecture} <strong>{count}</strong>
                  </span>
                ))}
              </div>
            </div>
            <div className="architecture-grid">
              {trialPlatformList.map((platform) => {
                const base = baseBasicInfoList.find((item) => item.id === platform.baseId)
                return (
                  <article className="architecture-card" key={platform.id}>
                    <header>
                      <span className="badge architecture">{platform.architecture}</span>
                      <span>平台建设进度</span>
                    </header>
                    <h3>{base?.name ?? platform.baseId}</h3>
                    <dl>
                      <div>
                        <dt>客户进度</dt>
                        <dd>{platform.customerProgress}</dd>
                      </div>
                      <div>
                        <dt>华为参与状态</dt>
                        <dd>{platform.huaweiParticipation}</dd>
                      </div>
                    </dl>
                  </article>
                )
              })}
            </div>
          </>
        )}

        {activeSection === 'ecosystem' && (
          <>
            <div className="activity-panel__heading">
              <div>
                <h2>生态活动时间线</h2>
                <p>按时间倒序呈现启动、生态联结与成果发布动态</p>
              </div>
            </div>
            <div className="timeline">
              {sortedActivities.map((activity) => {
                const [year, month, day] = activity.date.split('-')
                return (
                  <article className="timeline__item" key={activity.id}>
                    <time dateTime={activity.date}>
                      <strong>
                        {Number(month)}月{Number(day)}日
                      </strong>
                      <span>{year}</span>
                    </time>
                    <div className="timeline__marker" aria-hidden="true" />
                    <div className="timeline__content">
                      <span className="badge category">{activity.type}</span>
                      <h3>{activity.title}</h3>
                      <p>{activity.description}</p>
                      <span>{activity.location}</span>
                    </div>
                  </article>
                )
              })}
            </div>
          </>
        )}
      </section>
    </div>
  )
}
