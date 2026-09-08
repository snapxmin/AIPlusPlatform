import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('渲染看板总览页并展示基地统计信息', () => {
    render(<App />)
    expect(screen.getByText('国家人工智能中试基地')).toBeInTheDocument()
    expect(screen.getByText('经营决策驾驶舱')).toBeInTheDocument()
    expect(screen.getByText('数据更新于')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '看板总览' })).toBeInTheDocument()
    expect(screen.getByText('基地现状一览')).toBeInTheDocument()
    expect(screen.getByText('华东智能制造AI中试基地')).toBeInTheDocument()
  })

  it('移动端品牌条在导航之前', () => {
    render(<App />)
    const mobileBrand = screen.getByText('AI 中试基地').closest('.mobile-brand')
    expect(mobileBrand?.nextElementSibling).toBe(screen.getByRole('navigation'))
  })

  it('用 aria-current 标记当前菜单', () => {
    render(<App />)
    const overview = screen.getByRole('button', { name: '看板总览' })
    const basic = screen.getByRole('button', { name: '基础信息' })
    const currentNavigationItems = () =>
      screen
        .getByRole('navigation')
        .querySelectorAll('.app-nav button[aria-current="page"]')

    expect(overview).toHaveAttribute('aria-current', 'page')
    expect(basic).not.toHaveAttribute('aria-current')
    expect(currentNavigationItems()).toHaveLength(1)

    fireEvent.click(basic)
    expect(overview).not.toHaveAttribute('aria-current')
    expect(basic).toHaveAttribute('aria-current', 'page')
    expect(currentNavigationItems()).toHaveLength(1)
  })

  it('可以通过导航栏切换到基础信息页', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: '基础信息' }))
    expect(screen.getAllByText('生态及合作伙伴')[0]).toBeInTheDocument()
  })

  it('从总览页点击基地的经营信息链接可跳转并选中该基地', () => {
    render(<App />)
    const baseRow = screen.getByText('华南智慧医疗AI中试基地').closest('tr') as HTMLElement
    fireEvent.click(within(baseRow).getByRole('button', { name: '查看经营信息' }))
    expect(screen.getByRole('combobox', { name: '选择基地' })).toHaveValue('base-002')
    expect(screen.getByText('医学影像三期建设项目')).toBeInTheDocument()
  })

  it('从总览页下钻基础信息时置顶并标记目标基地', () => {
    render(<App />)
    const baseRow = screen.getByText('华南智慧医疗AI中试基地').closest('tr') as HTMLElement

    fireEvent.click(within(baseRow).getByRole('button', { name: '查看基础信息' }))

    const firstBaseCard = screen.getAllByRole('article')[0]
    expect(within(firstBaseCard).getByRole('heading', { name: '华南智慧医疗AI中试基地' }))
      .toBeInTheDocument()
    expect(within(firstBaseCard).getByText('目标基地')).toBeInTheDocument()
  })

  it('可以切换到三大关键活动与政策/行业动态页', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: '三大关键活动' }))
    expect(screen.getByText('场景全景图')).toBeInTheDocument()
    expect(screen.getByText('中试平台建设情况')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: '政策/行业动态' }))
    expect(screen.getByText('动态资讯')).toBeInTheDocument()
  })
})
