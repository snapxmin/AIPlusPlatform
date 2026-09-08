import { fireEvent, render, screen } from '@testing-library/react'
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

  it('可以通过导航栏切换到基础信息页', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: '基础信息' }))
    expect(screen.getAllByText('生态及合作伙伴')[0]).toBeInTheDocument()
  })

  it('从总览页点击基地的经营信息链接可跳转并选中该基地', () => {
    render(<App />)
    const businessLinks = screen.getAllByRole('button', { name: '查看经营信息' })
    fireEvent.click(businessLinks[1])
    expect(screen.getByRole('combobox', { name: '选择基地' })).toHaveValue('base-002')
    expect(screen.getByText('医学影像三期建设项目')).toBeInTheDocument()
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
