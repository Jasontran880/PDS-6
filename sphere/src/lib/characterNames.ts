/** Canonical mock character names (shared across Outersphere, hangouts, profiles, explore). */
export const CHARACTER_NAMES = [
  'Jacob Sartorius',
  'Cameron Dallas',
  'Baby Ariel',
  'MaddyB',
  'Markiplier',
  'Pewdiepie',
  'Ricegum',
  'Jake Paul',
  'Alyssa Violet',
  'Johny Orlando',
  'Abby Lee Miller',
  'Jojo Siwa',
  'King Bach',
  'DanTDM',
  'danielle cohn',
  'Lila singh',
  'Danielle Bregoli',
  'Jason Tran',
  'Zlata Honchar',
  'Scarlett Ho',
] as const

export type CharacterName = (typeof CHARACTER_NAMES)[number]
