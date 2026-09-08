export function sortByCompletionRate<T extends { completionRate: number }>(rows: T[]): T[] {
  return [...rows].sort((a, b) => b.completionRate - a.completionRate)
}
