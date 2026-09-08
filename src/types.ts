// 七类生态合作伙伴定义 (Seven ecosystem partner categories)
export type PartnerCategory =
  | '技术使能伙伴'
  | '解决方案伙伴'
  | '渠道分销伙伴'
  | '服务集成伙伴'
  | '投融资伙伴'
  | '人才发展伙伴'
  | '资源合作伙伴'

export interface EcosystemPartner {
  id: string
  name: string
  /** 具体合作的方面, e.g. 联合研发、场景落地、渠道分销 */
  cooperationArea: string
  /** 伙伴所属类别，基于七类伙伴定义 */
  category: PartnerCategory
}

export type ApprovalStatus = '已批复' | '审核中' | '待申报' | '未通过'

export type HuaweiBenchmarkLevel = '集团级标杆' | '军团级标杆' | '地区部级标杆' | '非标杆'

export interface BaseScale {
  /** 建设金额（万元） */
  constructionAmountWan: number
  /** 规划算力规模（P，FP16/INT8等统一口径） */
  plannedComputingPowerP: number
  /** 规划自建算力规模（P） */
  plannedSelfBuiltP: number
  /** 规划租赁算力规模（P） */
  plannedLeasedP: number
}

export interface BaseBasicInfo {
  id: string
  name: string
  /** 批次 */
  batch: string
  /** 行业 */
  industry: string
  /** 部委 */
  ministry: string
  /** 申报方向 */
  declarationDirection: string
  /** 地域 */
  region: string
  /** 批复状态 */
  approvalStatus: ApprovalStatus
  /** 申报单位 */
  applicantUnit: string
  /** 承接单位 */
  undertakingUnit: string
  /** 运营单位 */
  operatingUnit: string
  /** 是否华为公司标杆 */
  isHuaweiBenchmark: boolean
  /** 标杆级别 */
  benchmarkLevel: HuaweiBenchmarkLevel
  /** 生态及合作伙伴 */
  partners: EcosystemPartner[]
  /** 基地规模 */
  scale: BaseScale
}

export type ProjectLevel = 'S级' | 'A级' | 'B级' | 'C级'
export type CustomerLevel = '战略客户' | '重点客户' | '普通客户'

export interface ProductBreakdown {
  product: string
  cumulative: number
  annual: number
}

export interface BaseBusinessInfo {
  /** 关联的基地 id */
  baseId: string
  /** 关联机会点 */
  opportunityPoints: string[]
  /** 项目级别 */
  projectLevel: ProjectLevel
  /** 客户级别 */
  customerLevel: CustomerLevel
  /** 预计收入（年度，万元） */
  expectedRevenueAnnualWan: number
  /** 昇腾建设份额（占预计收入的比例，0-1） */
  ascendShareRatio: number
  /** 昇腾建设金额（万元） */
  ascendAmountWan: number
  /** 已完成订货：累计已完成、年度已完成，区分产品 */
  ordersCompleted: {
    cumulativeWan: number
    annualWan: number
    byProduct: ProductBreakdown[]
  }
  /** 已完成收入：累计已完成、年度已完成，区分产品 */
  revenueCompleted: {
    cumulativeWan: number
    annualWan: number
    byProduct: ProductBreakdown[]
  }
  /** 实际算力规模（P） */
  actualComputingPowerP: number
  /** 自建规模（P） */
  selfBuiltP: number
  /** 租赁规模（P） */
  leasedP: number
  /** 昇腾规模（P） */
  ascendScaleP: number
}

export interface ScenarioItem {
  id: string
  name: string
  /** 场景所属分类，用于场景全景图 */
  category: string
  /** 是否华为及华为伙伴参与的重点场景 */
  isKeyScenario: boolean
  /** 场景引入的伙伴 */
  partnersIntroduced: string[]
  /** 其他信息待定 */
  notes?: string
}

export type ReferenceArchitecture = 'AKDI' | 'DIMAK'

export interface TrialPlatformItem {
  id: string
  baseId: string
  /** 参考架构 */
  architecture: ReferenceArchitecture
  /** 客户已完成情况 */
  customerProgress: string
  /** 华为参与情况 */
  huaweiParticipation: string
}

export type KeyActivityType = '启动会' | '生态联结会' | '成果发布' | '大会发布'

export interface KeyActivity {
  id: string
  type: KeyActivityType
  title: string
  date: string
  location: string
  description: string
}

export type NewsCategory = '政策动态' | '行业动态' | '产业动态'

export interface NewsItem {
  id: string
  category: NewsCategory
  title: string
  date: string
  source: string
  summary: string
}
