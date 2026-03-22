import type { FaceId } from '@/components/ui/AvatarBubble'
import { CHARACTER_NAMES } from '@/lib/characterNames'

export type SocialCircleFriendRow = {
  id: string
  label: string
  tint: string
  face: FaceId
  score: number
}

const TINTS = ['#ff9ec8', '#7eb8ff', '#c9a8ff', '#ffb87e', '#7dffb0'] as const
const FACES: FaceId[] = [1, 2, 3, 4, 5]

/** Mock friends for Outersphere social circle — shared by the canvas lobby and any list UI. */
export const SOCIAL_CIRCLE_FRIENDS: SocialCircleFriendRow[] = CHARACTER_NAMES.map((label, i) => ({
  id: String(i + 1),
  label,
  tint: TINTS[i % TINTS.length],
  face: FACES[i % FACES.length],
  score: CHARACTER_NAMES.length - i,
}))

export const SOCIAL_CIRCLE_YOU = {
  tint: '#7dffb0',
  face: 1 as FaceId,
  label: 'YOU',
}

export function getSocialFriendById(id: string | undefined): SocialCircleFriendRow | null {
  if (id == null) return null
  return SOCIAL_CIRCLE_FRIENDS.find((f) => f.id === id) ?? null
}
