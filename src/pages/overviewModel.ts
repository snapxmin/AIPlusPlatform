export function sortByCompletionRate<T extends { completionRate: number }>(rows: T[]): T[] {
  return [...rows].sort((a, b) => b.completionRate - a.completionRate)
}

export function aggregateRegions(bases: readonly { region: string }[]): [string, number][] {
  return Object.entries(
    bases.reduce<Record<string, number>>((acc, base) => {
      const region = base.region.split('（')[0]
      acc[region] = (acc[region] ?? 0) + 1
      return acc
    }, {}),
  )
}
