export type PageKey = 'overview' | 'basic' | 'business' | 'activities' | 'news'

export interface NavItem {
  key: PageKey
  label: string
}

export const NAV_ITEMS: NavItem[] = [
  { key: 'overview', label: '看板总览' },
  { key: 'basic', label: '基础信息' },
  { key: 'business', label: '经营信息' },
  { key: 'activities', label: '三大关键活动' },
  { key: 'news', label: '政策/行业动态' },
]
