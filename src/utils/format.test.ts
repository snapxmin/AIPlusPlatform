import { describe, expect, it } from 'vitest'
import { baseBusinessInfoList } from '../data/mockData'
import {
  computeRemainingRevenueWan,
  formatComputingPower,
  formatPercent,
  formatWan,
} from './format'

describe('computeRemainingRevenueWan', () => {
  it('计算预期剩余收入 = 预计收入(年度) - 当年已完成收入', () => {
    const business = baseBusinessInfoList[0]
    const expected = business.expectedRevenueAnnualWan - business.revenueCompleted.annualWan
    expect(computeRemainingRevenueWan(business)).toBe(expected)
    expect(computeRemainingRevenueWan(business)).toBe(16000 - 7800)
  })

  it('当已完成收入超过预计收入时应返回负数', () => {
    const business = {
      ...baseBusinessInfoList[0],
      expectedRevenueAnnualWan: 100,
      revenueCompleted: { ...baseBusinessInfoList[0].revenueCompleted, annualWan: 150 },
    }
    expect(computeRemainingRevenueWan(business)).toBe(-50)
  })
})

describe('formatWan', () => {
  it('小于1万时按万元展示', () => {
    expect(formatWan(300)).toBe('300万元')
  })

  it('大于等于1万万元(即1亿)时换算为亿元展示', () => {
    expect(formatWan(25000)).toBe('2.50亿元')
  })
})

describe('formatComputingPower', () => {
  it('附加P单位', () => {
    expect(formatComputingPower(480)).toBe('480P')
  })
})

describe('formatPercent', () => {
  it('将比例转换为百分比字符串', () => {
    expect(formatPercent(0.65)).toBe('65%')
  })
})
