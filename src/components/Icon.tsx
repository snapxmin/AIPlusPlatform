export type IconName =
  | 'overview'
  | 'basic'
  | 'business'
  | 'activities'
  | 'news'
  | 'building'
  | 'check'
  | 'star'
  | 'cpu'
  | 'revenue'
  | 'trend'
  | 'map'
  | 'calendar'
  | 'search'
  | 'arrow'

interface IconProps {
  name: IconName
  size?: number
}

const paths: Record<IconName, string> = {
  overview: 'M4 13h6V4H4v9Zm10 7h6v-9h-6v9ZM4 20h6v-3H4v3Zm10-13h6V4h-6v3Z',
  basic: 'M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm3 5h8M8 12h8M8 16h5',
  business: 'M4 7h16v12H4V7Zm4 0V4h8v3m-4 4v4m-8-3h16',
  activities: 'M12 3v18m9-9H3m3.6-5.4 10.8 10.8m0-10.8L6.6 17.4',
  news: 'M5 4h14v16H5V4Zm3 4h8M8 12h8M8 16h5',
  building: 'M4 21V8l8-5 8 5v13M8 21v-5h8v5M8 10h1m3 0h1m3 0h1m-9 3h1m3 0h1m3 0h1',
  check: 'm5 12 4 4L19 6',
  star: 'm12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z',
  cpu: 'M7 7h10v10H7V7Zm3 3h4v4h-4v-4ZM9 3v4m6-4v4M9 17v4m6-4v4M3 9h4m-4 6h4m10-6h4m-4 6h4',
  revenue: 'M12 3v18m4-14H9.5a3 3 0 0 0 0 6h5a3 3 0 0 1 0 6H7',
  trend: 'm4 17 6-6 4 4 6-8m-5 0h5v5',
  map: 'm3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Zm6-3v15m6-12v15',
  calendar: 'M5 5h14v15H5V5Zm3-2v4m8-4v4M5 10h14',
  search: 'm20 20-4.5-4.5m2.5-5A7.5 7.5 0 1 1 3 10a7.5 7.5 0 0 1 15 0Z',
  arrow: 'm9 5 7 7-7 7',
}

export function Icon({ name, size = 20 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={paths[name]} />
    </svg>
  )
}
