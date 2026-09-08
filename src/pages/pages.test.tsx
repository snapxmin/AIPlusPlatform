import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { OverviewPage } from './OverviewPage'
import { sortByCompletionRate } from './overviewModel'

function getMetricCard(label: string) {
  return screen.getByText(label).closest('.metric-card') as HTMLElement
}

describe('dashboard pages', () => {
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
    fireEvent.click(screen.getAllByRole('button', { name: '查看基础信息' })[1])
    expect(onNavigate).toHaveBeenCalledWith('basic', 'base-002')
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
})
