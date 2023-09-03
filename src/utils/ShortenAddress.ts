export function shortenAddress(a: string) {
  if (a.length <= 8) {
    return a
  }
  const firstFour = a.slice(0, 4)
  const lastFour = a.slice(-4)
  return `${firstFour}...${lastFour}`
}
