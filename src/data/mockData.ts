import type {
  BaseBasicInfo,
  BaseBusinessInfo,
  KeyActivity,
  NewsItem,
  ScenarioItem,
  TrialPlatformItem,
} from '../types'

export const baseBasicInfoList: BaseBasicInfo[] = [
  {
    id: 'base-001',
    name: '华东智能制造AI中试基地',
    batch: '第一批',
    industry: '智能制造',
    ministry: '工业和信息化部',
    declarationDirection: '工业质检与设备预测性维护',
    region: '华东（上海）',
    approvalStatus: '已批复',
    applicantUnit: '上海临港智能制造研究院',
    undertakingUnit: '上海临港经济发展集团',
    operatingUnit: '临港AI中试运营有限公司',
    isHuaweiBenchmark: true,
    benchmarkLevel: '集团级标杆',
    partners: [
      {
        id: 'p-001',
        name: '海康威视',
        cooperationArea: '工业视觉质检算法联合研发',
        category: '技术使能伙伴',
      },
      {
        id: 'p-002',
        name: '树根互联',
        cooperationArea: '工业互联网平台集成',
        category: '解决方案伙伴',
      },
      {
        id: 'p-003',
        name: '中软国际',
        cooperationArea: '行业解决方案交付与实施',
        category: '服务集成伙伴',
      },
    ],
    scale: {
      constructionAmountWan: 25000,
      plannedComputingPowerP: 800,
      plannedSelfBuiltP: 500,
      plannedLeasedP: 300,
    },
  },
  {
    id: 'base-002',
    name: '华南智慧医疗AI中试基地',
    batch: '第二批',
    industry: '智慧医疗',
    ministry: '国家卫生健康委员会',
    declarationDirection: '医学影像辅助诊断',
    region: '华南（深圳）',
    approvalStatus: '已批复',
    applicantUnit: '深圳市医疗大数据研究院',
    undertakingUnit: '深圳市医疗集团',
    operatingUnit: '深圳AI医疗中试运营中心',
    isHuaweiBenchmark: true,
    benchmarkLevel: '军团级标杆',
    partners: [
      {
        id: 'p-004',
        name: '联影医疗',
        cooperationArea: '医学影像设备与数据联合创新',
        category: '技术使能伙伴',
      },
      {
        id: 'p-005',
        name: '东软集团',
        cooperationArea: '医疗信息化系统集成',
        category: '服务集成伙伴',
      },
      {
        id: 'p-006',
        name: '深创投',
        cooperationArea: '产业基金投融资合作',
        category: '投融资伙伴',
      },
    ],
    scale: {
      constructionAmountWan: 18000,
      plannedComputingPowerP: 450,
      plannedSelfBuiltP: 250,
      plannedLeasedP: 200,
    },
  },
  {
    id: 'base-003',
    name: '西南智慧农业AI中试基地',
    batch: '第二批',
    industry: '智慧农业',
    ministry: '农业农村部',
    declarationDirection: '农业大模型与遥感监测',
    region: '西南（成都）',
    approvalStatus: '审核中',
    applicantUnit: '四川省农业科学院',
    undertakingUnit: '成都天府农业投资集团',
    operatingUnit: '天府智慧农业运营公司',
    isHuaweiBenchmark: false,
    benchmarkLevel: '非标杆',
    partners: [
      {
        id: 'p-007',
        name: '大疆农业',
        cooperationArea: '农业遥感与无人机数据采集',
        category: '技术使能伙伴',
      },
      {
        id: 'p-008',
        name: '四川农业大学',
        cooperationArea: '农业人才联合培养',
        category: '人才发展伙伴',
      },
    ],
    scale: {
      constructionAmountWan: 9000,
      plannedComputingPowerP: 200,
      plannedSelfBuiltP: 120,
      plannedLeasedP: 80,
    },
  },
  {
    id: 'base-004',
    name: '华北金融科技AI中试基地',
    batch: '第三批',
    industry: '金融科技',
    ministry: '中国人民银行',
    declarationDirection: '智能风控与反欺诈',
    region: '华北（北京）',
    approvalStatus: '待申报',
    applicantUnit: '北京金融科技研究院',
    undertakingUnit: '北京金融控股集团',
    operatingUnit: '北京金融AI运营中心',
    isHuaweiBenchmark: false,
    benchmarkLevel: '非标杆',
    partners: [
      {
        id: 'p-009',
        name: '恒生电子',
        cooperationArea: '金融科技软件联合研发',
        category: '解决方案伙伴',
      },
      {
        id: 'p-010',
        name: '中关村科技租赁',
        cooperationArea: '算力资源租赁合作',
        category: '资源合作伙伴',
      },
    ],
    scale: {
      constructionAmountWan: 12000,
      plannedComputingPowerP: 300,
      plannedSelfBuiltP: 150,
      plannedLeasedP: 150,
    },
  },
]

export const baseBusinessInfoList: BaseBusinessInfo[] = [
  {
    baseId: 'base-001',
    opportunityPoints: ['工业质检算力扩容项目', '设备预测性维护二期项目'],
    projectLevel: 'S级',
    customerLevel: '战略客户',
    expectedRevenueAnnualWan: 16000,
    ascendShareRatio: 0.65,
    ascendAmountWan: 10400,
    ordersCompleted: {
      cumulativeWan: 21000,
      annualWan: 9000,
      byProduct: [
        { product: '昇腾AI服务器', cumulative: 14000, annual: 6000 },
        { product: '存储', cumulative: 4000, annual: 1800 },
        { product: '网络设备', cumulative: 3000, annual: 1200 },
      ],
    },
    revenueCompleted: {
      cumulativeWan: 18500,
      annualWan: 7800,
      byProduct: [
        { product: '昇腾AI服务器', cumulative: 12500, annual: 5200 },
        { product: '存储', cumulative: 3500, annual: 1600 },
        { product: '网络设备', cumulative: 2500, annual: 1000 },
      ],
    },
    actualComputingPowerP: 620,
    selfBuiltP: 400,
    leasedP: 220,
    ascendScaleP: 480,
  },
  {
    baseId: 'base-002',
    opportunityPoints: ['医学影像三期建设项目'],
    projectLevel: 'A级',
    customerLevel: '重点客户',
    expectedRevenueAnnualWan: 9000,
    ascendShareRatio: 0.55,
    ascendAmountWan: 4950,
    ordersCompleted: {
      cumulativeWan: 12000,
      annualWan: 5000,
      byProduct: [
        { product: '昇腾AI服务器', cumulative: 7000, annual: 3000 },
        { product: '存储', cumulative: 3000, annual: 1200 },
        { product: '网络设备', cumulative: 2000, annual: 800 },
      ],
    },
    revenueCompleted: {
      cumulativeWan: 10500,
      annualWan: 4200,
      byProduct: [
        { product: '昇腾AI服务器', cumulative: 6200, annual: 2500 },
        { product: '存储', cumulative: 2600, annual: 1000 },
        { product: '网络设备', cumulative: 1700, annual: 700 },
      ],
    },
    actualComputingPowerP: 340,
    selfBuiltP: 210,
    leasedP: 130,
    ascendScaleP: 260,
  },
  {
    baseId: 'base-003',
    opportunityPoints: ['农业大模型训练平台建设'],
    projectLevel: 'B级',
    customerLevel: '普通客户',
    expectedRevenueAnnualWan: 3200,
    ascendShareRatio: 0.4,
    ascendAmountWan: 1280,
    ordersCompleted: {
      cumulativeWan: 2600,
      annualWan: 1500,
      byProduct: [
        { product: '昇腾AI服务器', cumulative: 1400, annual: 800 },
        { product: '存储', cumulative: 700, annual: 400 },
        { product: '网络设备', cumulative: 500, annual: 300 },
      ],
    },
    revenueCompleted: {
      cumulativeWan: 1900,
      annualWan: 1100,
      byProduct: [
        { product: '昇腾AI服务器', cumulative: 1000, annual: 600 },
        { product: '存储', cumulative: 550, annual: 300 },
        { product: '网络设备', cumulative: 350, annual: 200 },
      ],
    },
    actualComputingPowerP: 150,
    selfBuiltP: 90,
    leasedP: 60,
    ascendScaleP: 110,
  },
  {
    baseId: 'base-004',
    opportunityPoints: ['智能风控算力预研项目'],
    projectLevel: 'C级',
    customerLevel: '普通客户',
    expectedRevenueAnnualWan: 1500,
    ascendShareRatio: 0.3,
    ascendAmountWan: 450,
    ordersCompleted: {
      cumulativeWan: 300,
      annualWan: 300,
      byProduct: [
        { product: '昇腾AI服务器', cumulative: 200, annual: 200 },
        { product: '存储', cumulative: 60, annual: 60 },
        { product: '网络设备', cumulative: 40, annual: 40 },
      ],
    },
    revenueCompleted: {
      cumulativeWan: 0,
      annualWan: 0,
      byProduct: [
        { product: '昇腾AI服务器', cumulative: 0, annual: 0 },
        { product: '存储', cumulative: 0, annual: 0 },
        { product: '网络设备', cumulative: 0, annual: 0 },
      ],
    },
    actualComputingPowerP: 0,
    selfBuiltP: 0,
    leasedP: 0,
    ascendScaleP: 0,
  },
]

export const scenarioList: ScenarioItem[] = [
  {
    id: 'sc-001',
    name: '工业质检缺陷检测',
    category: '智能制造',
    isKeyScenario: true,
    partnersIntroduced: ['海康威视', '树根互联'],
    notes: '覆盖3C、汽车零部件缺陷检测场景',
  },
  {
    id: 'sc-002',
    name: '设备预测性维护',
    category: '智能制造',
    isKeyScenario: true,
    partnersIntroduced: ['树根互联'],
  },
  {
    id: 'sc-003',
    name: '医学影像辅助诊断',
    category: '智慧医疗',
    isKeyScenario: true,
    partnersIntroduced: ['联影医疗', '东软集团'],
    notes: '肺结节、脑卒中影像辅助诊断',
  },
  {
    id: 'sc-004',
    name: '农业遥感监测',
    category: '智慧农业',
    isKeyScenario: false,
    partnersIntroduced: ['大疆农业'],
  },
  {
    id: 'sc-005',
    name: '智能风控反欺诈',
    category: '金融科技',
    isKeyScenario: false,
    partnersIntroduced: ['恒生电子'],
  },
]

export const trialPlatformList: TrialPlatformItem[] = [
  {
    id: 'tp-001',
    baseId: 'base-001',
    architecture: 'AKDI',
    customerProgress: '已完成一期昇腾算力集群部署及3个质检模型上线',
    huaweiParticipation: '联合交付团队进驻，提供参考架构设计与调优支持',
  },
  {
    id: 'tp-002',
    baseId: 'base-002',
    architecture: 'DIMAK',
    customerProgress: '完成影像数据平台建设，2个辅助诊断模型进入临床验证',
    huaweiParticipation: '提供DIMAK参考架构咨询及联合创新实验室支持',
  },
  {
    id: 'tp-003',
    baseId: 'base-003',
    architecture: 'AKDI',
    customerProgress: '完成农业大模型训练环境搭建，试点2个遥感识别场景',
    huaweiParticipation: '提供架构选型建议，尚未派驻联合交付团队',
  },
]

export const keyActivityList: KeyActivity[] = [
  {
    id: 'act-001',
    type: '启动会',
    title: '华东智能制造AI中试基地启动会',
    date: '2024-03-15',
    location: '上海临港',
    description: '基地正式挂牌启动，发布首批合作伙伴名单',
  },
  {
    id: 'act-002',
    type: '生态联结会',
    title: '智慧医疗AI生态联结会',
    date: '2024-06-20',
    location: '深圳',
    description: '联合联影医疗、东软集团等伙伴召开生态联结会',
  },
  {
    id: 'act-003',
    type: '成果发布',
    title: '工业质检大模型成果发布会',
    date: '2024-09-10',
    location: '上海临港',
    description: '发布工业质检大模型阶段性成果及标杆案例',
  },
  {
    id: 'act-004',
    type: '大会发布',
    title: '华为全联接大会中试基地专题发布',
    date: '2024-09-25',
    location: '上海',
    description: '在华为全联接大会上发布中试基地建设进展',
  },
]

export const newsList: NewsItem[] = [
  {
    id: 'news-001',
    category: '政策动态',
    title: '工信部印发《人工智能中试基地建设指南》',
    date: '2024-08-01',
    source: '工业和信息化部',
    summary: '明确中试基地建设标准、评估指标及支持政策',
  },
  {
    id: 'news-002',
    category: '行业动态',
    title: '智能制造行业AI质检渗透率持续提升',
    date: '2024-08-15',
    source: '行业研究报告',
    summary: '2024年上半年智能制造行业AI质检渗透率同比提升12个百分点',
  },
  {
    id: 'news-003',
    category: '产业动态',
    title: '国产算力产业链持续完善',
    date: '2024-08-22',
    source: '产业协会',
    summary: '国产算力芯片、服务器、存储等产业链配套能力持续增强',
  },
  {
    id: 'news-004',
    category: '政策动态',
    title: '多地发布算力券补贴政策',
    date: '2024-09-01',
    source: '地方政府',
    summary: '通过算力券形式降低企业使用国产算力的门槛',
  },
]

export function getBasicInfoById(baseId: string): BaseBasicInfo | undefined {
  return baseBasicInfoList.find((item) => item.id === baseId)
}

export function getBusinessInfoById(baseId: string): BaseBusinessInfo | undefined {
  return baseBusinessInfoList.find((item) => item.baseId === baseId)
}

export function getTrialPlatformsByBaseId(baseId: string): TrialPlatformItem[] {
  return trialPlatformList.filter((item) => item.baseId === baseId)
}
