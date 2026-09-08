import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { OverviewPage } from './OverviewPage'

describe('dashboard pages', () => {
  it('展示总览决策指标并支持经营下钻', () => {
    const onNavigate = vi.fn()
    render(<OverviewPage onNavigate={onNavigate} />)
    expect(screen.getByText('年度收入完成率')).toBeInTheDocument()
    expect(screen.getByText('基地地域分布')).toBeInTheDocument()
    expect(screen.getByText('重点基地进展')).toBeInTheDocument()
    fireEvent.click(screen.getAllByRole('button', { name: /查看经营/ })[0])
    expect(onNavigate).toHaveBeenCalledWith('business', 'base-001')
  })
})
