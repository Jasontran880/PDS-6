import type { FaceId } from '@/components/ui/AvatarBubble'

export type SocialCircleFriendRow = {
  id: string
  label: string
  tint: string
  face: FaceId
  score: number
}

/** Mock friends for Innersphere (social circle) — shared by the canvas lobby and any list UI. */
export const SOCIAL_CIRCLE_FRIENDS: SocialCircleFriendRow[] = [
  { id: '1', label: 'friend #1', tint: '#ff9ec8', face: 1, score: 10 },
  { id: '2', label: 'friend #2', tint: '#7eb8ff', face: 2, score: 9 },
  { id: '3', label: 'friend #3', tint: '#c9a8ff', face: 3, score: 8 },
  { id: '4', label: 'friend #4', tint: '#ffb87e', face: 4, score: 7 },
  { id: '5', label: 'friend #5', tint: '#7dffb0', face: 5, score: 6 },
  { id: '6', label: 'friend #6', tint: '#ff9ec8', face: 1, score: 5 },
  { id: '7', label: 'friend #7', tint: '#7eb8ff', face: 2, score: 4 },
  { id: '8', label: 'friend #8', tint: '#c9a8ff', face: 3, score: 3 },
  { id: '9', label: 'friend #9', tint: '#ff9ec8', face: 4, score: 2 },
  { id: '10', label: 'friend #10', tint: '#7eb8ff', face: 5, score: 1 },
  { id: '11', label: 'friend #11', tint: '#7dffb0', face: 1, score: 1 },
  { id: '12', label: 'friend #12', tint: '#ffb87e', face: 2, score: 1 },
]

export const SOCIAL_CIRCLE_YOU = {
  tint: '#7dffb0',
  face: 1 as FaceId,
  label: 'YOU',
}

export function getSocialFriendById(id: string | undefined): SocialCircleFriendRow | null {
  if (id == null) return null
  return SOCIAL_CIRCLE_FRIENDS.find((f) => f.id === id) ?? null
}
