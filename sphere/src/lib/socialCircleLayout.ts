export function clampToPlaza(
  x: number,
  y: number,
  cx: number,
  cy: number,
  plazaRadius: number,
): [number, number] {
  const dx = x - cx
  const dy = y - cy
  const dist = Math.hypot(dx, dy)
  if (dist > plazaRadius) {
    const scale = plazaRadius / dist
    return [cx + dx * scale, cy + dy * scale]
  }
  return [x, y]
}

/** Golden-angle distribution so friends stay grouped but not stacked. */
export function layoutFriendsInPlaza<T extends Record<string, unknown>>(
  items: T[],
  cx: number,
  cy: number,
  minRadius: number,
  maxRadius: number,
  plazaRadius: number,
): (T & { homeX: number; homeY: number; x: number; y: number })[] {
  const golden = Math.PI * (3 - Math.sqrt(5))
  return items.map((item, i) => {
    const idx = i + 1
    const r = minRadius + (maxRadius - minRadius) * Math.sqrt(idx / (items.length + 1))
    const theta = i * golden
    const rawX = cx + Math.cos(theta) * r
    const rawY = cy + Math.sin(theta) * r
    const [hx, hy] = clampToPlaza(rawX, rawY, cx, cy, plazaRadius - 24)
    return { ...item, homeX: hx, homeY: hy, x: hx, y: hy }
  })
}
