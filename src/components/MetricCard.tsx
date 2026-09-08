import type { ReactNode } from 'react'
import { Icon, type IconName } from './Icon'

type MetricTone = 'primary' | 'success' | 'warning' | 'cyan'

interface MetricCardProps {
  label: string
  value: ReactNode
  icon: IconName
  tone?: MetricTone
  detail?: ReactNode
  progress?: number
}

export function MetricCard({
  label,
  value,
  icon,
  tone = 'primary',
  detail,
  progress,
}: MetricCardProps) {
  const normalizedProgress =
    progress === undefined ? undefined : Math.max(0, Math.min(100, progress))

  return (
    <article className={`metric-card metric-card--${tone}`}>
      <div className="metric-card__top">
        <div className="metric-card__content">
          <div className="metric-card__label">{label}</div>
          <div className="metric-card__value">{value}</div>
        </div>
        <div className="metric-card__icon">
          <Icon name={icon} size={22} />
        </div>
      </div>
      {detail && <div className="metric-card__detail">{detail}</div>}
      {normalizedProgress !== undefined && (
        <div
          className="metric-card__progress"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={normalizedProgress}
        >
          <span style={{ width: `${normalizedProgress}%` }} />
        </div>
      )}
    </article>
  )
}
