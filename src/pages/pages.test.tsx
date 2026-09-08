import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { ActivitiesPage } from './ActivitiesPage'
import { BasicInfoPage } from './BasicInfoPage'
import { BusinessInfoPage } from './BusinessInfoPage'
import { NewsPage } from './NewsPage'
import { OverviewPage } from './OverviewPage'
import { aggregateRegions, sortByCompletionRate } from './overviewModel'

function getMetricCard(label: string) {
  return screen
    .getAllByText(label)
    .find((element) => element.closest('.metric-card'))
    ?.closest('.metric-card') as HTMLElement
}

describe('dashboard pages', () => {
  it('可按关键字筛选基地', () => {
    render(<BasicInfoPage onNavigate={vi.fn()} />)
    fireEvent.change(screen.getByRole('searchbox', { name: '搜索基地' }), {
      target: { value: '医疗' },
    })
    expect(screen.getByText('华南智慧医疗AI中试基地')).toBeInTheDocument()
    expect(screen.queryByText('华东智能制造AI中试基地')).not.toBeInTheDocument()
  })

  it('可组合批复状态与行业筛选基地', () => {
    render(<BasicInfoPage onNavigate={vi.fn()} />)
    fireEvent.change(screen.getByRole('combobox', { name: '筛选批复状态' }), {
      target: { value: '审核中' },
    })
    fireEvent.change(screen.getByRole('combobox', { name: '筛选行业' }), {
      target: { value: '智慧医疗' },
    })

    expect(screen.getByText('未找到符合条件的基地')).toBeInTheDocument()
    expect(screen.queryByText('华南智慧医疗AI中试基地')).not.toBeInTheDocument()

    fireEvent.change(screen.getByRole('combobox', { name: '筛选批复状态' }), {
      target: { value: '已批复' },
    })

    expect(screen.getByText('华南智慧医疗AI中试基地')).toBeInTheDocument()
    expect(screen.queryByText('华东智能制造AI中试基地')).not.toBeInTheDocument()
  })

  it('筛选无匹配基地时展示空状态', () => {
    render(<BasicInfoPage onNavigate={vi.fn()} />)
    fireEvent.change(screen.getByRole('searchbox', { name: '搜索基地' }), {
      target: { value: '不存在的基地' },
    })

    expect(screen.getByText('未找到符合条件的基地')).toBeInTheDocument()
  })

  it('从基础信息页下钻时传入当前基地 ID', () => {
    const onNavigate = vi.fn()
    render(<BasicInfoPage onNavigate={onNavigate} />)
    const baseCard = screen.getByText('华南智慧医疗AI中试基地').closest('article') as HTMLElement

    fireEvent.click(within(baseCard).getByRole('button', { name: '查看昇腾规模及经营信息 →' }))

    expect(onNavigate).toHaveBeenCalledWith('business', 'base-002')
  })

  it('展示经营收入完成度与算力结构', () => {
    render(<BusinessInfoPage selectedBaseId="base-002" />)
    expect(screen.getByText('收入完成度')).toBeInTheDocument()
    expect(screen.getByText('算力结构')).toBeInTheDocument()
    expect(screen.getByText('预期剩余收入')).toBeInTheDocument()
  })

  it('展示 base-002 年度经营收入、完成率与剩余值', () => {
    render(<BusinessInfoPage selectedBaseId="base-002" />)

    expect(within(getMetricCard('年度预计收入')).getByText('9,000万元')).toBeInTheDocument()
    expect(within(getMetricCard('年度已完成')).getByText('4,200万元')).toBeInTheDocument()
    expect(within(getMetricCard('年度已完成')).getByText('收入完成度 46.7%')).toBeInTheDocument()
    expect(within(getMetricCard('预期剩余收入')).getByText('4,800万元')).toBeInTheDocument()
  })

  it('算力结构仅堆叠自建与租赁并单独展示昇腾覆盖率', () => {
    render(<BusinessInfoPage selectedBaseId="base-002" />)

    const structure = screen.getByRole('img', {
      name: '实际算力结构：自建 210P，租赁 130P，总计 340P',
    })
    expect(structure.children).toHaveLength(2)
    expect(screen.getByRole('progressbar', { name: '昇腾覆盖实际算力' })).toHaveAttribute(
      'aria-valuenow',
      '76.47058823529412',
    )
    expect(screen.queryByText('600P')).not.toBeInTheDocument()
  })

  it('实际算力为零时昇腾覆盖率安全归零', () => {
    render(<BusinessInfoPage selectedBaseId="base-004" />)

    expect(screen.getByRole('progressbar', { name: '昇腾覆盖实际算力' })).toHaveAttribute(
      'aria-valuenow',
      '0',
    )
  })

  it('展示 8 个经过计算的总览决策指标', () => {
    const { container } = render(<OverviewPage onNavigate={vi.fn()} />)

    expect(container.querySelectorAll('.metric-card')).toHaveLength(8)
    const expectedMetrics = [
      ['基地总数', '4'],
      ['批复率', '50.0%'],
      ['华为标杆基地', '2'],
      ['规划建设金额', '6.40亿元'],
      ['规划算力规模', '1,750P'],
      ['实际昇腾算力', '850P'],
      ['年度预计总收入', '2.97亿元'],
      ['年度收入完成率', '44.1%'],
    ]

    expectedMetrics.forEach(([label, value]) => {
      expect(within(getMetricCard(label)).getByText(value)).toBeInTheDocument()
    })
  })

  it('对打乱的基地进展按收入完成率完整降序排列', () => {
    const shuffledRows = [
      { id: 'middle', completionRate: 46.7 },
      { id: 'last', completionRate: 0 },
      { id: 'first', completionRate: 48.8 },
      { id: 'third', completionRate: 34.4 },
    ]

    expect(sortByCompletionRate(shuffledRows).map(({ id }) => id)).toEqual([
      'first',
      'middle',
      'third',
      'last',
    ])
  })

  it('展示完整排行并支持经营下钻', () => {
    const onNavigate = vi.fn()
    render(<OverviewPage onNavigate={onNavigate} />)
    expect(screen.getByText('基地地域分布')).toBeInTheDocument()
    const ranking = screen.getByText('重点基地进展').closest('section') as HTMLElement

    expect(within(ranking).getAllByRole('button', { name: '查看经营' })).toHaveLength(4)
    expect(
      within(ranking)
        .getAllByRole('button', { name: '查看经营' })
        .map((button) => button.parentElement?.textContent),
    ).toEqual([
      expect.stringContaining('48.8%'),
      expect.stringContaining('46.7%'),
      expect.stringContaining('34.4%'),
      expect.stringContaining('0.0%'),
    ])
    fireEvent.click(within(ranking).getAllByRole('button', { name: '查看经营' })[0])
    expect(onNavigate).toHaveBeenCalledWith('business', 'base-001')
  })

  it('展示新增经营字段并支持基础信息下钻', () => {
    const onNavigate = vi.fn()
    render(<OverviewPage onNavigate={onNavigate} />)

    expect(screen.getByRole('columnheader', { name: '建设金额' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: '实际/昇腾算力' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: '年度收入完成度' })).toBeInTheDocument()
    const baseRow = screen.getByText('华南智慧医疗AI中试基地').closest('tr') as HTMLElement
    expect(within(baseRow).getByText('1.80亿元')).toBeInTheDocument()
    expect(within(baseRow).getByText('340P / 260P')).toBeInTheDocument()
    expect(within(baseRow).getByText('46.7%')).toBeInTheDocument()
    fireEvent.click(screen.getAllByRole('button', { name: '查看基础信息' })[1])
    expect(onNavigate).toHaveBeenCalledWith('basic', 'base-002')
  })

  it('按大区聚合不同城市的基地数量', () => {
    const bases = [
      { region: '华南（深圳）' },
      { region: '华东（上海）' },
      { region: '华南（广州）' },
      { region: '西南（成都）' },
    ]

    expect(aggregateRegions(bases)).toEqual([
      ['华南', 2],
      ['华东', 1],
      ['西南', 1],
    ])
  })

  it('为年度收入进度提供完整的无障碍数值', () => {
    render(<OverviewPage onNavigate={vi.fn()} />)

    expect(screen.getByRole('progressbar', { name: '年度收入目标完成进度' })).toHaveAttribute(
      'aria-valuemin',
      '0',
    )
    expect(screen.getByRole('progressbar', { name: '年度收入目标完成进度' })).toHaveAttribute(
      'aria-valuemax',
      '100',
    )
    expect(screen.getByRole('progressbar', { name: '年度收入目标完成进度' })).toHaveAttribute(
      'aria-valuenow',
      '44.107744107744104',
    )
  })

  it('切换三大关键活动视图', () => {
    render(<ActivitiesPage />)
    fireEvent.click(screen.getByRole('tab', { name: '中试平台' }))
    expect(screen.getByText('参考架构覆盖')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('tab', { name: '关键生态活动' }))
    expect(screen.getByText('华东智能制造AI中试基地启动会')).toBeInTheDocument()
  })

  it('为活动标签页和场景筛选提供可访问状态', () => {
    render(<ActivitiesPage />)
    expect(screen.getByRole('tablist', { name: '关键活动视图' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: '场景全景图' })).toHaveAttribute(
      'aria-selected',
      'true',
    )
    fireEvent.click(screen.getByRole('button', { name: '华为重点' }))
    expect(screen.queryByText('农业遥感监测')).not.toBeInTheDocument()
  })

  it('按分类筛选动态资讯', () => {
    render(<NewsPage />)
    fireEvent.click(screen.getByRole('button', { name: '行业动态' }))
    expect(screen.getByText('智能制造行业AI质检渗透率持续提升')).toBeInTheDocument()
    expect(screen.queryByText('多地发布算力券补贴政策')).not.toBeInTheDocument()
  })

  it('以可访问资讯门户展示分类状态和文章', () => {
    const { container } = render(<NewsPage />)
    expect(screen.getByRole('button', { name: '全部' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getAllByRole('article')).toHaveLength(8)
    expect(container.querySelectorAll('.news-featured')).toHaveLength(1)
    expect(screen.getByText('2024年9月1日')).toBeInTheDocument()
  })
})
