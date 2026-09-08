# AI 中试基地高保真看板 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将现有前端模拟数据原型重构为面向管理层汇报与日常经营查看的高保真响应式看板。

**Architecture:** 保留单页 React 状态导航和现有模拟数据源，将通用视觉元素拆为小型 UI 组件，各页面自行管理筛选状态并使用纯函数计算派生指标。图表使用语义化 HTML、SVG 与 CSS 绘制，不引入图表或路由依赖。

**Tech Stack:** React 19、TypeScript 6、Vite 8、原生 CSS/SVG、Vitest、Testing Library、oxlint

## Global Constraints

- 本阶段继续使用前端模拟数据，不实现 API、数据库、认证、权限或在线编辑。
- 采用浅灰蓝背景、白色卡片、深蓝导航、红色关键强调的明亮经营驾驶舱风格。
- 完整覆盖看板总览、基础信息、经营信息、三大关键活动、政策/行业/产业动态。
- 桌面、平板和移动端均可使用；窄屏表格允许横向滚动。
- 图表不得新增第三方依赖。
- 保留从总览和基础信息下钻到指定基地经营信息的能力。

## File Structure

- `src/components/Icon.tsx`：集中提供界面使用的轻量 SVG 图标。
- `src/components/PageHeader.tsx`：统一页面眉题、说明和操作区。
- `src/components/MetricCard.tsx`：统一 KPI 卡片与趋势提示。
- `src/components/Nav.tsx`：品牌、主导航、年度和用户区域。
- `src/pages/OverviewPage.tsx`：总览聚合、图表和基地现状。
- `src/pages/BasicInfoPage.tsx`：基地搜索筛选与基础信息卡片。
- `src/pages/BusinessInfoPage.tsx`：基地经营收入、机会点与算力拆分。
- `src/pages/ActivitiesPage.tsx`：场景、中试平台、生态活动。
- `src/pages/NewsPage.tsx`：动态分类指标、筛选和资讯卡片。
- `src/index.css`：设计令牌、布局、组件和响应式规则。
- `src/App.test.tsx`：跨页面导航和下钻行为。
- `src/pages/pages.test.tsx`：页面筛选与关键派生指标。

---

### Task 1: 全局设计系统与应用框架

**Files:**
- Create: `src/components/Icon.tsx`
- Create: `src/components/PageHeader.tsx`
- Create: `src/components/MetricCard.tsx`
- Modify: `src/components/Nav.tsx`
- Modify: `src/App.tsx`
- Modify: `src/index.css`
- Test: `src/App.test.tsx`

**Interfaces:**
- Produces: `Icon({ name, size? })`，其中 `name` 为导航和指标使用的联合类型。
- Produces: `PageHeader({ eyebrow?, title, description, actions? })`。
- Produces: `MetricCard({ label, value, icon, tone?, detail?, progress? })`。
- Preserves: `NavProps.current: PageKey` 与 `NavProps.onNavigate(key: PageKey): void`。

- [ ] **Step 1: 写出应用框架失败测试**

在 `src/App.test.tsx` 的首个测试中加入：

```tsx
expect(screen.getByText('国家人工智能中试基地')).toBeInTheDocument()
expect(screen.getByText('经营决策驾驶舱')).toBeInTheDocument()
expect(screen.getByText('数据更新于')).toBeInTheDocument()
```

- [ ] **Step 2: 运行测试并确认失败**

Run: `npm test -- src/App.test.tsx`

Expected: FAIL，提示找不到“国家人工智能中试基地”。

- [ ] **Step 3: 实现共享组件**

`PageHeader` 使用以下接口和结构：

```tsx
import type { ReactNode } from 'react'

interface PageHeaderProps {
  eyebrow?: string
  title: string
  description: string
  actions?: ReactNode
}

export function PageHeader({ eyebrow, title, description, actions }: PageHeaderProps) {
  return (
    <header className="page-header">
      <div>
        {eyebrow && <div className="page-eyebrow">{eyebrow}</div>}
        <h1 className="page-title">{title}</h1>
        <p className="page-subtitle">{description}</p>
      </div>
      {actions && <div className="page-actions">{actions}</div>}
    </header>
  )
}
```

`MetricCard` 必须输出 `.metric-card`、`.metric-card__value`、可选 `.metric-card__progress`，并对 `progress` 使用 `Math.max(0, Math.min(100, progress))`。`Icon` 使用内联 `<svg viewBox="0 0 24 24" aria-hidden="true">`，支持 `overview | basic | business | activities | news | building | check | star | cpu | revenue | trend | map | calendar | search | arrow`。

- [ ] **Step 4: 重构导航与全局样式**

`Nav` 品牌区显示“国家人工智能中试基地”和“经营决策驾驶舱”，菜单项前展示图标，底部展示“2026 年度”和“AI 项目组”。`App` 增加顶部移动端品牌条和数据更新时间。`index.css` 定义：

```css
:root {
  --bg: #f3f6fa;
  --surface: #ffffff;
  --nav: #14233b;
  --nav-deep: #0d192b;
  --primary: #d91f2a;
  --primary-soft: #fff0f1;
  --text: #172033;
  --muted: #687386;
  --border: #e5eaf1;
  --success: #199968;
  --warning: #db8b18;
  --cyan: #1589a8;
  --shadow: 0 10px 30px rgba(28, 45, 74, 0.07);
}
```

应用框架桌面为 248px 固定侧栏与可滚动主区；`@media (max-width: 820px)` 下改为顶部品牌和横向导航；按钮必须有 `:focus-visible` 样式。

- [ ] **Step 5: 运行应用测试**

Run: `npm test -- src/App.test.tsx`

Expected: PASS。

- [ ] **Step 6: 提交**

```bash
git add src/components/Icon.tsx src/components/PageHeader.tsx src/components/MetricCard.tsx src/components/Nav.tsx src/App.tsx src/index.css src/App.test.tsx
git commit -m "feat: establish dashboard design system"
```

---

### Task 2: 重构管理总览

**Files:**
- Modify: `src/pages/OverviewPage.tsx`
- Modify: `src/index.css`
- Test: `src/pages/pages.test.tsx`

**Interfaces:**
- Consumes: `PageHeader`、`MetricCard`、`Icon`。
- Preserves: `OverviewPageProps.onNavigate(key: PageKey, baseId?: string): void`。
- Produces: 批复率、年度收入完成率、地区分布和重点基地排行的只读视图。

- [ ] **Step 1: 写出总览失败测试**

创建 `src/pages/pages.test.tsx`：

```tsx
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
```

- [ ] **Step 2: 运行测试并确认失败**

Run: `npm test -- src/pages/pages.test.tsx`

Expected: FAIL，缺少“年度收入完成率”。

- [ ] **Step 3: 实现 KPI 与决策图表**

计算：

```ts
const approvalRate = totalBases === 0 ? 0 : (approvedBases / totalBases) * 100
const revenueRate =
  totalExpectedRevenue === 0 ? 0 : (totalRevenueCompleted / totalExpectedRevenue) * 100
const regionRows = Object.entries(
  baseBasicInfoList.reduce<Record<string, number>>((acc, base) => {
    const region = base.region.split('（')[0]
    acc[region] = (acc[region] ?? 0) + 1
    return acc
  }, {}),
)
```

首屏展示 8 个 `MetricCard`；第二行展示年度收入目标完成条、4 个季度趋势 SVG、地区水平条、批复状态环形图；“重点基地进展”按年度收入完成率降序；底部表格增加建设金额、实际/昇腾算力和年度收入完成度。

- [ ] **Step 4: 添加图表和表格样式**

在 `index.css` 增加 `.dashboard-grid`、`.chart-card`、`.bar-list`、`.donut`、`.ranking-list`、`.progress-track`、`.table-wrap`。环形图使用：

```css
.donut {
  background: conic-gradient(var(--primary) var(--donut-value), #edf1f6 0);
}
```

- [ ] **Step 5: 运行总览和应用测试**

Run: `npm test -- src/pages/pages.test.tsx src/App.test.tsx`

Expected: PASS。

- [ ] **Step 6: 提交**

```bash
git add src/pages/OverviewPage.tsx src/pages/pages.test.tsx src/index.css
git commit -m "feat: build executive overview dashboard"
```

---

### Task 3: 重构基础信息与经营信息

**Files:**
- Modify: `src/pages/BasicInfoPage.tsx`
- Modify: `src/pages/BusinessInfoPage.tsx`
- Modify: `src/index.css`
- Test: `src/pages/pages.test.tsx`
- Test: `src/App.test.tsx`

**Interfaces:**
- Consumes: `PageHeader`、`MetricCard`、现有 `computeRemainingRevenueWan` 与格式化函数。
- Preserves: 基础信息页的 `onNavigate('business', base.id)`。
- Preserves: 经营页的 `selectedBaseId?: string` 和 `aria-label="选择基地"`。

- [ ] **Step 1: 写出筛选与经营指标失败测试**

追加：

```tsx
it('可按关键字筛选基地', async () => {
  render(<BasicInfoPage onNavigate={vi.fn()} />)
  fireEvent.change(screen.getByRole('searchbox', { name: '搜索基地' }), {
    target: { value: '医疗' },
  })
  expect(screen.getByText('华南智慧医疗AI中试基地')).toBeInTheDocument()
  expect(screen.queryByText('华东智能制造AI中试基地')).not.toBeInTheDocument()
})

it('展示经营收入完成度与算力结构', () => {
  render(<BusinessInfoPage selectedBaseId="base-002" />)
  expect(screen.getByText('收入完成度')).toBeInTheDocument()
  expect(screen.getByText('算力结构')).toBeInTheDocument()
  expect(screen.getByText('预期剩余收入')).toBeInTheDocument()
})
```

并导入 `BasicInfoPage`、`BusinessInfoPage`。

- [ ] **Step 2: 运行测试并确认失败**

Run: `npm test -- src/pages/pages.test.tsx`

Expected: FAIL，缺少搜索框。

- [ ] **Step 3: 实现基础信息筛选和信息卡**

`BasicInfoPage` 新增 `query`、`status` 和 `industry` 状态。可见项条件：

```ts
const visibleBases = baseBasicInfoList.filter((base) => {
  const matchesQuery =
    !query || [base.name, base.region, base.industry].some((value) => value.includes(query.trim()))
  const matchesStatus = status === '全部状态' || base.approvalStatus === status
  const matchesIndustry = industry === '全部行业' || base.industry === industry
  return matchesQuery && matchesStatus && matchesIndustry
})
```

每个基地卡片分为身份摘要、组织信息、基地规模和伙伴表；无结果时显示“未找到符合条件的基地”。

- [ ] **Step 4: 实现经营驾驶舱**

选择基地后展示项目/客户级别、年度预计收入、年度已完成、预期剩余和昇腾建设金额。完成率：

```ts
const revenueRate =
  business.expectedRevenueAnnualWan === 0
    ? 0
    : (business.revenueCompleted.annualWan / business.expectedRevenueAnnualWan) * 100
```

使用堆叠条展示自建、租赁和昇腾算力；机会点使用独立标签；订货和收入拆分并排显示，窄屏堆叠。

- [ ] **Step 5: 运行测试**

Run: `npm test -- src/pages/pages.test.tsx src/App.test.tsx`

Expected: PASS，且原有下钻测试仍选中 `base-002`。

- [ ] **Step 6: 提交**

```bash
git add src/pages/BasicInfoPage.tsx src/pages/BusinessInfoPage.tsx src/pages/pages.test.tsx src/index.css src/App.test.tsx
git commit -m "feat: upgrade base and business intelligence views"
```

---

### Task 4: 重构三大关键活动与动态资讯

**Files:**
- Modify: `src/pages/ActivitiesPage.tsx`
- Modify: `src/pages/NewsPage.tsx`
- Modify: `src/index.css`
- Test: `src/pages/pages.test.tsx`

**Interfaces:**
- Consumes: `PageHeader`、`MetricCard`、现有场景/平台/活动/资讯模拟数据。
- Preserves: 场景全部/重点筛选和资讯分类筛选。
- Produces: `role="tablist"` 的三个活动视图与可访问的动态分类按钮。

- [ ] **Step 1: 写出活动切换与资讯筛选失败测试**

追加：

```tsx
it('切换三大关键活动视图', () => {
  render(<ActivitiesPage />)
  fireEvent.click(screen.getByRole('tab', { name: '中试平台' }))
  expect(screen.getByText('参考架构覆盖')).toBeInTheDocument()
  fireEvent.click(screen.getByRole('tab', { name: '关键生态活动' }))
  expect(screen.getByText('华东智能制造AI中试基地启动会')).toBeInTheDocument()
})

it('按分类筛选动态资讯', () => {
  render(<NewsPage />)
  fireEvent.click(screen.getByRole('button', { name: '行业动态' }))
  expect(screen.getByText('智能制造行业AI质检渗透率持续提升')).toBeInTheDocument()
  expect(screen.queryByText('多地发布算力券补贴政策')).not.toBeInTheDocument()
})
```

- [ ] **Step 2: 运行测试并确认失败**

Run: `npm test -- src/pages/pages.test.tsx`

Expected: FAIL，缺少 `role="tab"`。

- [ ] **Step 3: 实现活动分区**

`ActivitiesPage` 使用 `activeSection: 'scenario' | 'platform' | 'ecosystem'`。顶部展示场景总数、重点场景、平台覆盖、生态活动数。三个 `role="tab"` 按钮设置 `aria-selected`；场景以行业分组卡片展示并保留“全部/华为重点”筛选；平台显示 AKDI/DIMAK 标签、客户进度和华为参与状态；生态活动按日期倒序形成时间线。

- [ ] **Step 4: 实现资讯门户**

顶部按三类资讯计算数量，筛选区保留“全部、政策动态、行业动态、产业动态”。每条资讯使用 `<article>`，显示分类、标题、摘要、来源和格式化日期；首条可见资讯加 `.news-featured`。

- [ ] **Step 5: 添加活动和资讯样式**

新增 `.section-tabs`、`.scenario-grid`、`.scenario-card`、`.architecture-card`、`.timeline`、`.news-grid`、`.news-card`；移动端切为单列。

- [ ] **Step 6: 运行测试**

Run: `npm test -- src/pages/pages.test.tsx src/App.test.tsx`

Expected: PASS。

- [ ] **Step 7: 提交**

```bash
git add src/pages/ActivitiesPage.tsx src/pages/NewsPage.tsx src/pages/pages.test.tsx src/index.css
git commit -m "feat: redesign activities and intelligence feeds"
```

---

### Task 5: 响应式、可访问性与最终验收

**Files:**
- Modify: `src/index.css`
- Modify: `README.md`
- Test: `src/App.test.tsx`
- Test: `src/pages/pages.test.tsx`

**Interfaces:**
- Preserves: 所有前述组件公开接口。
- Produces: 桌面和移动端均可操作的最终演示版。

- [ ] **Step 1: 增加语义状态测试**

在 `src/App.test.tsx` 增加：

```tsx
it('当前导航项具有可访问状态', () => {
  render(<App />)
  expect(screen.getByRole('button', { name: '看板总览' })).toHaveAttribute(
    'aria-current',
    'page',
  )
  fireEvent.click(screen.getByRole('button', { name: '经营信息' }))
  expect(screen.getByRole('button', { name: '经营信息' })).toHaveAttribute(
    'aria-current',
    'page',
  )
})
```

- [ ] **Step 2: 运行测试并确认失败**

Run: `npm test -- src/App.test.tsx`

Expected: FAIL，导航按钮缺少 `aria-current`。

- [ ] **Step 3: 完成可访问和响应式规则**

为当前导航按钮添加 `aria-current="page"`。确保所有输入均有关联标签或 `aria-label`。在 1100px 下将四列网格降为两列；820px 下切换顶部导航；560px 下 KPI、页面头部、筛选栏和图表切为单列，主区内边距降为 16px。

- [ ] **Step 4: 更新 README**

将 README 的说明更新为“高保真交互演示版”，列出搜索/分类筛选、基地经营下钻、场景/平台/活动切换、响应式支持，并明确当前仍使用模拟数据。

- [ ] **Step 5: 执行自动化验证**

Run: `npm test && npm run lint && npm run build`

Expected: Vitest 全部通过，oxlint 退出码 0，TypeScript 与 Vite 构建成功。

- [ ] **Step 6: 浏览器验证**

启动 `npm run dev -- --host 0.0.0.0`。在 1440×900 和 390×844 检查：

- 首屏 KPI、图表和现状表无重叠。
- 移动端导航可横向访问，页面无整页横向溢出。
- 基础信息搜索“医疗”只保留华南基地。
- 总览下钻到华南基地后经营选择器值为 `base-002`。
- 活动页三个标签和动态页分类筛选均可点击。

- [ ] **Step 7: 提交**

```bash
git add src/index.css src/components/Nav.tsx src/App.test.tsx src/pages/pages.test.tsx README.md
git commit -m "test: finalize responsive dashboard experience"
```
