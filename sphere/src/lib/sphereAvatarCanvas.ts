import { assetUrl } from '@/lib/paths'
import type { FaceId } from '@/components/ui/AvatarBubble'

const faceSrc: Record<Exclude<FaceId, 'none'>, string> = {
  1: assetUrl.face1,
  2: assetUrl.face2,
  3: assetUrl.face3,
  4: assetUrl.face4,
  5: assetUrl.face5,
}

function loadImg(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.decoding = 'async'
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error(`Failed to load ${src}`))
    img.src = src
  })
}

export function sphereAvatarCanvasKey(tint: string, face: FaceId): string {
  return `${tint}::${face}`
}

const syncCache = new Map<string, HTMLCanvasElement>()
const inflight = new Map<string, Promise<HTMLCanvasElement>>()

export function getSphereAvatarCanvas(bodyTint: string, face: FaceId): HTMLCanvasElement | null {
  return syncCache.get(sphereAvatarCanvasKey(bodyTint, face)) ?? null
}

/**
 * Renders the same asset stack as AvatarBubble (sphere + tinted body + face) to a canvas for the lobby.
 */
export function renderSphereAvatarToCanvas(
  bodyTint: string,
  face: FaceId,
  displaySize = 64,
): Promise<HTMLCanvasElement> {
  const key = sphereAvatarCanvasKey(bodyTint, face)
  const hit = syncCache.get(key)
  if (hit) return Promise.resolve(hit)
  const pending = inflight.get(key)
  if (pending) return pending

  const p = (async () => {
    const dpr = Math.min(2, typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1)
    const s = displaySize
    const canvas = document.createElement('canvas')
    canvas.width = Math.round(s * dpr)
    canvas.height = Math.round(s * dpr)
    const ctx = canvas.getContext('2d')!
    ctx.scale(dpr, dpr)

    const [sphereImg, avatarImg] = await Promise.all([loadImg(assetUrl.sphere), loadImg(assetUrl.avatar)])
    const faceImg = face !== 'none' ? await loadImg(faceSrc[face]) : null

    const cx = s / 2
    const cy = s / 2
    const clipR = s * 0.38

    ctx.save()
    ctx.beginPath()
    ctx.arc(cx, cy, clipR, 0, Math.PI * 2)
    ctx.clip()

    const avScale = 1.18
    const side = s * avScale
    ctx.drawImage(avatarImg, cx - side / 2, cy - side / 2, side, side)

    if (bodyTint && bodyTint !== 'transparent') {
      ctx.globalCompositeOperation = 'multiply'
      ctx.fillStyle = bodyTint
      ctx.globalAlpha = 0.55
      ctx.fillRect(0, 0, s, s)
      ctx.globalAlpha = 1
      ctx.globalCompositeOperation = 'source-over'
      ctx.fillStyle = bodyTint
      ctx.globalAlpha = 0.4
      ctx.fillRect(0, 0, s, s)
      ctx.globalAlpha = 1
    }
    ctx.restore()

    ctx.drawImage(sphereImg, 0, 0, s, s)

    if (faceImg) {
      const maxW = s * 0.88
      const maxH = s * 0.52
      const nw = faceImg.naturalWidth || maxW
      const nh = faceImg.naturalHeight || maxH
      const scale = Math.min(maxW / nw, maxH / nh)
      const dw = nw * scale
      const dh = nh * scale
      const padTop = s * 0.05
      const fx = cx - dw / 2
      const fy = padTop
      ctx.drawImage(faceImg, fx, fy, dw, dh)
    }

    syncCache.set(key, canvas)
    return canvas
  })()
    .finally(() => {
      inflight.delete(key)
    })

  inflight.set(key, p)
  return p
}

export async function preloadSphereAvatars(
  configs: { bodyTint: string; face: FaceId }[],
): Promise<void> {
  const keys = new Set<string>()
  const unique: { bodyTint: string; face: FaceId }[] = []
  for (const c of configs) {
    const k = sphereAvatarCanvasKey(c.bodyTint, c.face)
    if (!keys.has(k)) {
      keys.add(k)
      unique.push(c)
    }
  }
  await Promise.all(unique.map((c) => renderSphereAvatarToCanvas(c.bodyTint, c.face, 64)))
}
