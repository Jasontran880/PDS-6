import { useCallback, useEffect, useRef, useState } from 'react'
import type { FaceId } from '@/components/ui/AvatarBubble'
import { clampToPlaza, layoutFriendsInPlaza } from '@/lib/socialCircleLayout'
import type { SocialCircleFriendRow } from '@/lib/socialCircleFriends'
import { getSphereAvatarCanvas, preloadSphereAvatars } from '@/lib/sphereAvatarCanvas'

const WORLD_SIZE = 640
const AVATAR_SIZE = 56
const MIN_RADIUS = 64
const MAX_RADIUS = 188
const PLAZA_RADIUS = WORLD_SIZE / 2 - 44

type YouConfig = { tint: string; face: FaceId; label: string }

type WalkState = {
  targetX: number
  targetY: number
  speed: number
  idleTimer: number
  isMoving: boolean
  bobPhase: number
  rngCounter: number
}

type TooltipData = { x: number; y: number; friend: SocialCircleFriendRow }

type LobbyFriend = SocialCircleFriendRow & { homeX: number; homeY: number; x: number; y: number }

function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807 + 0) % 2147483647
    return s / 2147483647
  }
}

function updateWalkState(friend: LobbyFriend, ws: WalkState, plazaCx: number, plazaCy: number) {
  if (!ws.isMoving) {
    ws.idleTimer--
    if (ws.idleTimer <= 0) {
      ws.rngCounter++
      const rng = seededRandom(ws.rngCounter * 7919 + friend.id.charCodeAt(friend.id.length - 1) * 131)
      const wanderRadius = 28
      const angle = rng() * Math.PI * 2
      const dist = rng() * wanderRadius
      const rawX = friend.homeX + Math.cos(angle) * dist
      const rawY = friend.homeY + Math.sin(angle) * dist
      const [clampedX, clampedY] = clampToPlaza(rawX, rawY, plazaCx, plazaCy, PLAZA_RADIUS)
      ws.targetX = clampedX
      ws.targetY = clampedY
      ws.isMoving = true
    }
    return
  }

  const dx = ws.targetX - friend.x
  const dy = ws.targetY - friend.y
  const dist = Math.hypot(dx, dy)

  if (dist < 1.2) {
    ws.isMoving = false
    ws.rngCounter++
    const rng = seededRandom(ws.rngCounter * 4219 + friend.id.charCodeAt(friend.id.length - 1) * 97)
    ws.idleTimer = Math.floor(100 + rng() * 220)
    return
  }

  const moveX = (dx / dist) * ws.speed
  const moveY = (dy / dist) * ws.speed
  const [nx, ny] = clampToPlaza(friend.x + moveX, friend.y + moveY, plazaCx, plazaCy, PLAZA_RADIUS)
  friend.x = nx
  friend.y = ny
}

type Props = {
  friends: SocialCircleFriendRow[]
  you: YouConfig
  className?: string
  onPick: (target: { kind: 'you' } | { kind: 'friend'; id: string }) => void
}

export function SocialCircleLobby({ friends, you, className = '', onPick }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const onPickRef = useRef(onPick)
  onPickRef.current = onPick

  const [tooltip, setTooltip] = useState<TooltipData | null>(null)
  const [assetsReady, setAssetsReady] = useState(false)

  const stateRef = useRef({
    friends: [] as LobbyFriend[],
    walkStates: [] as WalkState[],
    camera: { x: WORLD_SIZE / 2, y: WORLD_SIZE / 2, zoom: 1 },
    isDragging: false,
    hasDragged: false,
    dragStart: { x: 0, y: 0 },
    cameraStart: { x: 0, y: 0 },
    animFrame: 0,
    time: 0,
    pointerId: null as number | null,
  })

  useEffect(() => {
    const cx = WORLD_SIZE / 2
    const cy = WORLD_SIZE / 2
    const positioned = layoutFriendsInPlaza(friends, cx, cy, MIN_RADIUS, MAX_RADIUS, PLAZA_RADIUS)
    const state = stateRef.current
    state.friends = positioned
    state.walkStates = positioned.map((f, i) => {
      const rng = seededRandom(i * 31 + 17)
      return {
        targetX: f.homeX,
        targetY: f.homeY,
        speed: 0.18 + rng() * 0.26,
        idleTimer: Math.floor(rng() * 180) + 40,
        isMoving: false,
        bobPhase: rng() * Math.PI * 2,
        rngCounter: Math.floor(rng() * 10000),
      }
    })
    state.camera.x = cx
    state.camera.y = cy
    state.camera.zoom = 1
  }, [friends])

  useEffect(() => {
    let cancelled = false
    const configs = [
      ...friends.map((f) => ({ bodyTint: f.tint, face: f.face })),
      { bodyTint: you.tint, face: you.face },
    ]
    preloadSphereAvatars(configs).then(() => {
      if (!cancelled) setAssetsReady(true)
    })
    return () => {
      cancelled = true
    }
  }, [friends, you.tint, you.face])

  useEffect(() => {
    if (!canvasRef.current) return
    const rawCtx = canvasRef.current.getContext('2d')
    if (!rawCtx) return
    const ctx: CanvasRenderingContext2D = rawCtx
    let running = true

    function resize() {
      const surf = canvasRef.current
      const container = containerRef.current
      if (!surf || !container) return
      const w = container.clientWidth
      const h = container.clientHeight
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      surf.width = Math.max(1, Math.floor(w * dpr))
      surf.height = Math.max(1, Math.floor(h * dpr))
      surf.style.width = `${w}px`
      surf.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize)
    if (containerRef.current) ro.observe(containerRef.current)
    window.addEventListener('resize', resize)

    function animate() {
      if (!running) return
      const state = stateRef.current
      state.time++

      const surf = canvasRef.current
      if (!surf) return
      const w = surf.clientWidth
      const h = surf.clientHeight
      const cam = state.camera

      ctx.clearRect(0, 0, w, h)
      ctx.save()

      ctx.translate(w / 2, h / 2)
      ctx.scale(cam.zoom, cam.zoom)
      ctx.translate(-cam.x, -cam.y)

      drawGround(ctx)
      if (assetsReady) {
        drawYou(ctx, state.time, you)
        const indexed = state.friends.map((f, i) => ({ f, i }))
        indexed.sort((a, b) => a.f.y - b.f.y)
        const pcx = WORLD_SIZE / 2
        const pcy = WORLD_SIZE / 2
        for (const { f, i } of indexed) {
          const ws = state.walkStates[i]
          updateWalkState(f, ws, pcx, pcy)
          drawFriend(ctx, f, ws, state.time)
        }
        drawSparkles(ctx, state.time, pcx, pcy)
      }

      ctx.restore()

      state.animFrame = requestAnimationFrame(animate)
    }

    stateRef.current.animFrame = requestAnimationFrame(animate)

    return () => {
      running = false
      cancelAnimationFrame(stateRef.current.animFrame)
      ro.disconnect()
      window.removeEventListener('resize', resize)
    }
  }, [assetsReady, you])

  const hitTestFriend = (worldX: number, worldY: number): SocialCircleFriendRow | null => {
    for (const friend of stateRef.current.friends) {
      const dx = worldX - friend.x
      const dy = worldY - friend.y
      if (Math.hypot(dx, dy) < AVATAR_SIZE / 2 + 6) return friend
    }
    return null
  }

  const hitTestYou = (worldX: number, worldY: number): boolean => {
    const cx = WORLD_SIZE / 2
    const cy = WORLD_SIZE / 2
    return Math.hypot(worldX - cx, worldY - cy) < AVATAR_SIZE / 2 + 6
  }

  const screenToWorld = (clientX: number, clientY: number): [number, number] => {
    const c = canvasRef.current!
    const rect = c.getBoundingClientRect()
    const cam = stateRef.current.camera
    const canvasCenterX = rect.left + rect.width / 2
    const canvasCenterY = rect.top + rect.height / 2
    return [
      (clientX - canvasCenterX) / cam.zoom + cam.x,
      (clientY - canvasCenterY) / cam.zoom + cam.y,
    ]
  }

  const onPointerDown = useCallback((clientX: number, clientY: number) => {
    const state = stateRef.current
    state.isDragging = true
    state.hasDragged = false
    state.dragStart = { x: clientX, y: clientY }
    state.cameraStart = { x: state.camera.x, y: state.camera.y }
    setTooltip(null)
  }, [])

  const onPointerMove = useCallback((clientX: number, clientY: number) => {
    const state = stateRef.current
    if (state.isDragging) {
      const dx = clientX - state.dragStart.x
      const dy = clientY - state.dragStart.y
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) state.hasDragged = true
      state.camera.x = state.cameraStart.x - dx / state.camera.zoom
      state.camera.y = state.cameraStart.y - dy / state.camera.zoom
      return
    }

    const [wx, wy] = screenToWorld(clientX, clientY)
    const c = canvasRef.current
    if (!c) return
    const friend = hitTestFriend(wx, wy)
    if (friend) {
      setTooltip({ x: clientX, y: clientY, friend })
      c.style.cursor = 'pointer'
    } else if (hitTestYou(wx, wy)) {
      setTooltip(null)
      c.style.cursor = 'pointer'
    } else {
      setTooltip(null)
      c.style.cursor = 'grab'
    }
  }, [])

  const onPointerUp = useCallback((clientX: number, clientY: number) => {
    const state = stateRef.current
    const wasDragging = state.isDragging
    const didDrag = state.hasDragged
    state.isDragging = false
    state.hasDragged = false

    if (wasDragging && !didDrag) {
      const [wx, wy] = screenToWorld(clientX, clientY)
      const friend = hitTestFriend(wx, wy)
      if (friend) {
        onPickRef.current({ kind: 'friend', id: friend.id })
        setTooltip(null)
        return
      }
      if (hitTestYou(wx, wy)) {
        onPickRef.current({ kind: 'you' })
        setTooltip(null)
      }
    }
  }, [])

  const handleMouseDown = (e: React.MouseEvent) => onPointerDown(e.clientX, e.clientY)
  const handleMouseMove = (e: React.MouseEvent) => onPointerMove(e.clientX, e.clientY)
  const handleMouseUp = (e: React.MouseEvent) => onPointerUp(e.clientX, e.clientY)

  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (!e.ctrlKey && !e.metaKey) return
    e.preventDefault()
    const state = stateRef.current
    const zoomFactor = e.deltaY > 0 ? 0.92 : 1.08
    state.camera.zoom = Math.max(0.55, Math.min(2.2, state.camera.zoom * zoomFactor))
  }, [])

  const getTooltipPos = (clientX: number, clientY: number) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return { x: clientX, y: clientY }
    return { x: clientX - rect.left, y: clientY - rect.top }
  }

  return (
    <div
      ref={containerRef}
      className={[
        'relative w-full overflow-hidden rounded-3xl border border-white/25 bg-gradient-to-b from-sky-200/40 via-fuchsia-100/25 to-emerald-200/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]',
        'min-h-[280px] touch-none',
        className,
      ].join(' ')}
    >
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => {
          stateRef.current.isDragging = false
          setTooltip(null)
        }}
        onWheel={handleWheel}
        onTouchStart={(e) => {
          if (e.touches.length !== 1) return
          const t = e.touches[0]
          stateRef.current.pointerId = t.identifier
          onPointerDown(t.clientX, t.clientY)
        }}
        onTouchMove={(e) => {
          const id = stateRef.current.pointerId
          if (id == null) return
          const t = Array.from(e.touches).find((x) => x.identifier === id)
          if (!t) return
          e.preventDefault()
          onPointerMove(t.clientX, t.clientY)
        }}
        onTouchEnd={(e) => {
          const id = stateRef.current.pointerId
          if (id == null) return
          const t = e.changedTouches[0]
          if (t?.identifier !== id) return
          stateRef.current.pointerId = null
          onPointerUp(t.clientX, t.clientY)
        }}
        className="block h-full w-full cursor-grab select-none"
        aria-label="Friend plaza — drag to pan, tap a friend for profile"
      />

      {tooltip && (() => {
        const pos = getTooltipPos(tooltip.x, tooltip.y)
        return (
          <div
            className="pointer-events-none absolute z-10 max-w-[200px] rounded-xl border border-white/30 bg-[var(--sphere-glass-bg-strong)] px-3 py-2 text-left text-white shadow-lg backdrop-blur-md"
            style={{ left: pos.x + 12, top: pos.y - 8, fontFamily: "'Agrandir', sans-serif" }}
          >
            <div className="text-sm font-bold">{tooltip.friend.label}</div>
            <div className="text-xs text-white/75">Friendship score · {tooltip.friend.score}</div>
            <div className="mt-1 text-[10px] text-white/50">Tap to open profile</div>
          </div>
        )
      })()}

      <p
        className="pointer-events-none absolute bottom-2 left-3 right-3 text-center text-[9px] uppercase tracking-wide text-white/50"
        style={{ fontFamily: "'Retro Pixel', monospace" }}
      >
        Drag to pan · ⌃ scroll to zoom · tap bubble for profile
      </p>
    </div>
  )
}

function drawGround(ctx: CanvasRenderingContext2D) {
  const cx = WORLD_SIZE / 2
  const cy = WORLD_SIZE / 2
  const skyGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, PLAZA_RADIUS + 60)
  skyGrad.addColorStop(0, 'rgba(255, 255, 255, 0.55)')
  skyGrad.addColorStop(0.45, 'rgba(190, 228, 252, 0.5)')
  skyGrad.addColorStop(1, 'rgba(200, 235, 210, 0.45)')
  ctx.fillStyle = skyGrad
  ctx.fillRect(0, 0, WORLD_SIZE, WORLD_SIZE)

  ctx.save()
  ctx.beginPath()
  ctx.arc(cx, cy, PLAZA_RADIUS, 0, Math.PI * 2)
  ctx.clip()
  const tile = 28
  for (let x = 0; x < WORLD_SIZE; x += tile) {
    for (let y = 0; y < WORLD_SIZE; y += tile) {
      const tx = Math.floor(x / tile)
      const ty = Math.floor(y / tile)
      const light = (tx + ty) % 2 === 0
      const dx = x + tile / 2 - cx
      const dy = y + tile / 2 - cy
      const d = Math.hypot(dx, dy)
      if (d > PLAZA_RADIUS) continue
      const fade = Math.max(0, 1 - d / (PLAZA_RADIUS - 16))
      ctx.globalAlpha = fade * 0.35
      ctx.fillStyle = light ? 'rgba(255,255,255,0.5)' : 'rgba(230, 240, 255, 0.35)'
      ctx.fillRect(x, y, tile, tile)
    }
  }
  ctx.globalAlpha = 1
  ctx.restore()

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.arc(cx, cy, PLAZA_RADIUS, 0, Math.PI * 2)
  ctx.stroke()
}

function drawYou(ctx: CanvasRenderingContext2D, time: number, you: YouConfig) {
  const cx = WORLD_SIZE / 2
  const cy = WORLD_SIZE / 2
  const bob = Math.sin(time * 0.03) * 2
  const img = getSphereAvatarCanvas(you.tint, you.face)
  if (!img) return

  ctx.fillStyle = 'rgba(0,0,0,0.12)'
  ctx.beginPath()
  ctx.ellipse(cx, cy + AVATAR_SIZE / 2 + 4, AVATAR_SIZE / 3, 5, 0, 0, Math.PI * 2)
  ctx.fill()

  ctx.font = '14px system-ui, sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('🌸🌸', cx, cy - AVATAR_SIZE / 2 - 18 + bob)
  ctx.fillStyle = 'rgba(255,255,255,0.95)'
  ctx.font = 'bold 10px "Retro Pixel", monospace'
  ctx.fillText(you.label, cx, cy - AVATAR_SIZE / 2 - 4 + bob)

  ctx.drawImage(img, cx - AVATAR_SIZE / 2, cy - AVATAR_SIZE / 2 + bob, AVATAR_SIZE, AVATAR_SIZE)
}

function drawFriend(ctx: CanvasRenderingContext2D, friend: LobbyFriend, ws: WalkState, time: number) {
  const { x, y } = friend
  const bobAmount = ws.isMoving
    ? Math.sin(time * 0.12 + ws.bobPhase) * 2.5
    : Math.sin(time * 0.025 + ws.bobPhase) * 1

  const img = getSphereAvatarCanvas(friend.tint, friend.face)
  if (!img) return

  ctx.fillStyle = 'rgba(0,0,0,0.12)'
  ctx.beginPath()
  ctx.ellipse(x, y + AVATAR_SIZE / 2 + 4, AVATAR_SIZE / 3, 5, 0, 0, Math.PI * 2)
  ctx.fill()

  ctx.drawImage(img, x - AVATAR_SIZE / 2, y - AVATAR_SIZE / 2 + bobAmount, AVATAR_SIZE, AVATAR_SIZE)

  ctx.fillStyle = 'rgba(55, 45, 75, 0.9)'
  ctx.font = '9px "Retro Pixel", monospace'
  ctx.textAlign = 'center'
  ctx.fillText(friend.label, x, y + AVATAR_SIZE / 2 + 14 + bobAmount)
}

function drawSparkles(ctx: CanvasRenderingContext2D, time: number, cx: number, cy: number) {
  for (let i = 0; i < 18; i++) {
    const rng = seededRandom(i * 71)
    const angle = rng() * Math.PI * 2 + time * 0.001 * (i % 2 === 0 ? 1 : -1)
    const radius = 80 + rng() * (PLAZA_RADIUS - 40)
    const x = cx + Math.cos(angle) * radius
    const y = cy + Math.sin(angle) * radius
    const size = 1.5 + rng() * 2
    const alpha = 0.15 + Math.sin(time * 0.03 + i) * 0.1

    ctx.save()
    ctx.globalAlpha = alpha
    ctx.fillStyle = i % 3 === 0 ? '#fff8e7' : i % 3 === 1 ? '#ffd6ef' : '#d6f0ff'
    drawStar(ctx, x, y, size)
    ctx.restore()
  }
}

function drawStar(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  ctx.beginPath()
  for (let i = 0; i < 4; i++) {
    const angle = (i / 4) * Math.PI * 2 - Math.PI / 2
    const outerX = x + Math.cos(angle) * size
    const outerY = y + Math.sin(angle) * size
    if (i === 0) ctx.moveTo(outerX, outerY)
    else ctx.lineTo(outerX, outerY)
    const innerAngle = angle + Math.PI / 4
    ctx.lineTo(x + Math.cos(innerAngle) * (size * 0.3), y + Math.sin(innerAngle) * (size * 0.3))
  }
  ctx.closePath()
  ctx.fill()
}
