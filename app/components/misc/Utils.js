export function hintRep(h) {
  const count = h.count === 10 ? 'INF' : h.count
  return `${h.hint.toUpperCase()} ${count}`
}
