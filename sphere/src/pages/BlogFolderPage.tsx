import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { CHARACTER_NAMES } from '@/lib/characterNames'
import { assetUrl } from '@/lib/paths'
import { DragonBackButton } from '@/components/ui/DragonBackButton'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { UsernamePill } from '@/components/ui/UsernamePill'

const idToColour: Record<string, 1 | 2 | 3 | 4 | 5 | 6> = {
  '1': 1,
  '2': 3,
  '3': 2,
  '4': 5,
  '5': 6,
  '6': 4,
}

export function BlogFolderPage() {
  const { folderId } = useParams()
  const colourNum = useMemo(() => idToColour[folderId ?? '1'] ?? 1, [folderId])

  return (
    <div className="page-enter mx-auto max-w-2xl px-4 pb-32 pt-10">
      <GlassPanel large>
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <img
            src={assetUrl.fileColour(colourNum)}
            alt=""
            className="h-14 w-auto object-contain sm:h-16"
          />
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="font-bold text-white"
              style={{ fontFamily: "'Agrandir', sans-serif" }}
            >
              created by
            </span>
            <UsernamePill name={CHARACTER_NAMES[0]} />
            <UsernamePill name={CHARACTER_NAMES[1]} />
          </div>
        </div>
        <div
          className="min-h-[200px] rounded-2xl border border-white/35 bg-[var(--sphere-glass-chip)] p-8 text-center text-lg font-bold text-white backdrop-blur-md"
          style={{ fontFamily: "'Agrandir', sans-serif" }}
        >
          This ends up being a collaboration of photos & paragraphs
        </div>
      </GlassPanel>
      <DragonBackButton to="/blog" />
    </div>
  )
}
