/** Public URLs (via /public/assets → repo assets). Encode spaces for img/src and CSS url(). */
const A = (name: string) => `/assets/${encodeURIComponent(name)}`

/** Nested path under `/assets/` with each segment encoded (slashes preserved). */
export function assetPath(...segments: string[]): string {
  return '/assets/' + segments.map((s) => encodeURIComponent(s)).join('/')
}

/** Hangout / sidequest cover photos (`assets/carousel-images/`). */
export const carouselImageUrls = [
  assetPath('carousel-images', '41234a4116d931eba45576f86c5ce582.jpg'),
  assetPath('carousel-images', 'c1df736a8da7a2056adc975b4dcb1513.jpg'),
  assetPath('carousel-images', 'fdc467a3c9e5bb9d38ad2304e7f6cbf4.jpg'),
] as const

export function carouselImageAt(index: number): string {
  return carouselImageUrls[index % carouselImageUrls.length]!
}

/** Background music (`assets/music/`). */
export const musicUrl = {
  closer: assetPath('music', 'The Chainsmokers - Closer (Lyric) ft. Halsey.mp3'),
  lastFriday: assetPath('music', 'Katy Perry - Last Friday Night (Lyrics).mp3'),
  house: assetPath('music', 'Panic! At The Disco - House of Memories (Lyrics).mp3'),
} as const

export type MusicTrackKey = keyof typeof musicUrl

/** Explore / Local Spots (`assets/business-images/`). */
export const businessImageUrl = {
  cafe: assetPath('business-images', 'cafe.webp'),
  cinema: assetPath('business-images', 'cinema.webp'),
  restaurant: assetPath('business-images', 'restaraunt.webp'),
  park: assetPath('business-images', 'park.webp'),
  arcade: assetPath('business-images', 'arcade.webp'),
} as const

export const assetUrl = {
  grassOverlay: A('grass-overlay.png'),
  sphere: A('sphere.png'),
  outline: A('outline.png'),
  largeOutline: A('large-outline.png'),
  header: A('header.png'),
  musicStatus: A('music status.png'),
  arrow: A('arrow.png'),
  avatar: A('avatar.png'),
  face1: A('face1.png'),
  face2: A('face2.png'),
  face3: A('face3.png'),
  face4: A('face4.png'),
  face5: A('face5.png'),
  backSpaceIcon: A('back-space-icon.png'),
  flops: A('flops.png'),
  likes: A('likes.png'),
  palmTreeLeft: A('palm-tree-left.png'),
  palmTreeRight: A('palm-tree-right.png'),
  divider: A('divider.png'),
  fileColour: (n: 1 | 2 | 3 | 4 | 5 | 6) => A(`file colour ${n}.png`),
  sloopFont: A('Sloop-font.ttf'),
  agrandirRegular: A('Agrandir-font/Agrandir-Regular.otf'),
  agrandirTextBold: A('Agrandir-font/Agrandir-TextBold.otf'),
  agrandirItalic: A('Agrandir-font/Agrandir-ThinItalic.otf'),
  retroPixel: A('retro_pixel-font/Retro Pixel.otf'),
} as const
