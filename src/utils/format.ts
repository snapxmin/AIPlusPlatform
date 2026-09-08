import type { BaseBusinessInfo } from '../types'

/**
 * 预期剩余收入 = 预计收入（年度） - 当年已完成收入
 */
export function computeRemainingRevenueWan(business: BaseBusinessInfo): number {
  return Math.max(0, business.expectedRevenueAnnualWan - business.revenueCompleted.annualWan)
}

/**
 * 将“万元”数值格式化为带单位的字符串，超过 10000 万元时换算为“亿元”展示。
 */
export function formatWan(amountWan: number): string {
  if (Math.abs(amountWan) >= 10000) {
    return `${(amountWan / 10000).toFixed(2)}亿元`
  }
  return `${amountWan.toLocaleString('zh-CN')}万元`
}

/**
 * 格式化算力规模，单位统一为 P。
 */
export function formatComputingPower(valueP: number): string {
  return `${valueP.toLocaleString('zh-CN')}P`
}

/**
 * 格式化百分比，输入为 0-1 的比例。
 */
export function formatPercent(ratio: number): string {
  return `${(ratio * 100).toFixed(0)}%`
}
