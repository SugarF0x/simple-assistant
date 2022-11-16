export function padArrayEnd<T>(array: T[], length: number, fill: T): T[] {
  if (array.length >= length) return array
  return [...array, ...Array(length - array.length).fill(fill)]
}

export function padArrayStart<T>(array: T[], length: number, fill: T): T[] {
  if (array.length >= length) return array
  return [...Array(length - array.length).fill(fill), ...array]
}
