/** Deterministic “random” copy from string seeds (stable per profile / card). */

import { CHARACTER_NAMES } from '@/lib/characterNames'

export function hashString(str: string): number {
  let h = 2166136261 >>> 0
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function rng(profileKey: string, salt: number) {
  return mulberry32((hashString(profileKey) ^ Math.imul(salt, 0x9e3779b1)) >>> 0)
}

function pick<T>(r: () => number, arr: readonly T[]): T {
  return arr[Math.floor(r() * arr.length)]!
}

const HANDLE_SUFFIX = [
  'glitch',
  'sidequest',
  'thirdspace',
  'irl_only',
  'bubble',
  'neon',
  'grass',
  'cloud',
  'pixel',
  'softboi',
  'main',
  'vibes',
] as const

const SNIPPETS = [
  'Third places > group chats.',
  'Down for thrift, tacos, and honest chaos.',
  'Collecting memories, not streaks.',
  'IRL energy only — no NPC behavior.',
  'Matcha in one hand, friendship score in the other.',
  'Believes the best plans start with “what if we just…”',
  'Will hype your fit and your life choices.',
  'Runs on diner coffee and good lighting.',
  'Here for the silly little hangouts that matter.',
  'Would rather walk somewhere wrong together than scroll alone.',
  'Makes playlists like love letters.',
  'Says “five minutes” and means forty — lovingly.',
] as const

export const SIDEQUEST_NAMES = [
  'Neon arcade crawl',
  'Golden-hour rooftop',
  'Thrift & boba circuit',
  'Lake trail + bad snacks',
  'Karaoke risk night',
  'Museum sprint date',
  'Midnight diner debrief',
  'Beach bonfire debrief',
  'Farmers market heist',
  'Boardwalk photo quest',
  'Mini-golf championship',
  'Cook-off chaos',
  'Sunset bike loop',
  'Record store dive',
  'Climbing gym soft launch',
  'Park picnic speedrun',
  'Food truck rally',
  'Stargazing field trip',
  'Zoo but ironic',
  'Bookstore treasure hunt',
] as const

/** Exclusive end: before local Mar 22, 2026. */
const PAST_RANGE_START = Date.UTC(2025, 0, 1)
const PAST_RANGE_END = Date.UTC(2026, 2, 22)

function formatSidequestDate(ms: number): string {
  return new Date(ms).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function sidequestHeaderForSeed(seedKey: string, slot: number): { title: string; date: string } {
  const r = rng(seedKey, slot + 404)
  const title = pick(r, SIDEQUEST_NAMES)
  const span = PAST_RANGE_END - PAST_RANGE_START
  const t = PAST_RANGE_START + Math.floor(r() * span)
  return { title, date: formatSidequestDate(t) }
}

export type ProfilePageData = {
  displayName: string
  handle: string
  description: string
  likes: number
  flopsPct: string
  sidequests: Array<{
    title: string
    date: string
    imageSlot: number
    attendees: [string, string]
  }>
}

function handleFromDisplayName(displayName: string, suffix: string) {
  const base = displayName
    .replace(/\s+/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .slice(0, 18)
  return `@${base || 'sphere'}_${suffix}`
}

export function getProfilePageData(profileKey: string): ProfilePageData {
  const r0 = rng(profileKey, 0)
  const displayName = pick(r0, CHARACTER_NAMES)
  const suffix = pick(r0, HANDLE_SUFFIX)
  const handle = handleFromDisplayName(displayName, suffix)

  const r1 = rng(profileKey, 1)
  const a = pick(r1, SNIPPETS)
  const b = pick(r1, SNIPPETS)
  const c = pick(r1, SNIPPETS)
  const description = [a, b, c].filter((x, i, arr) => arr.indexOf(x) === i).join(' ')

  const r2 = rng(profileKey, 2)
  const likes = 40 + Math.floor(r2() * 220)
  const flopWhole = 4 + Math.floor(r2() * 18)
  const flopsPct = `${flopWhole}%`

  const sidequests = [0, 1, 2, 3, 4, 5].map((slot) => {
    const r = rng(profileKey, 10 + slot)
    const { title, date } = sidequestHeaderForSeed(`profile:${profileKey}`, slot)
    const imageSlot = slot
    const attendees: [string, string] = [pick(r, CHARACTER_NAMES), pick(r, CHARACTER_NAMES)]
    if (attendees[0] === attendees[1]) attendees[1] = pick(r, CHARACTER_NAMES)
    return { title, date, imageSlot, attendees }
  })

  return {
    displayName,
    handle,
    description,
    likes,
    flopsPct,
    sidequests,
  }
}

export function hangoutCardMedia(seedKey: string, slot: number) {
  return sidequestHeaderForSeed(seedKey, slot)
}
