import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MetricCard } from './MetricCard'

describe('MetricCard', () => {
  it('显示数值为 0 的详情', () => {
    render(<MetricCard label="年度收入" value="1.31亿元" icon="revenue" detail={0} />)

    expect(screen.getByText('0')).toHaveClass('metric-card__detail')
  })
})
