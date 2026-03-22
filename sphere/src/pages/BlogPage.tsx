import { useNavigate } from 'react-router-dom'
import { assetUrl } from '@/lib/paths'
import { DragonBackButton } from '@/components/ui/DragonBackButton'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { SplitHeading } from '@/components/ui/SplitHeading'

/** Top row: pink, yellow, green — Bottom: blue, purple, red (per prompt + visual mapping) */
const folders = {
  public: [
    { id: 1 as const, n: 1 as const },
    { id: 2 as const, n: 3 as const },
    { id: 3 as const, n: 2 as const },
  ],
  private: [
    { id: 4 as const, n: 5 as const },
    { id: 5 as const, n: 6 as const },
    { id: 6 as const, n: 4 as const },
  ],
}

export function BlogPage() {
  const navigate = useNavigate()
  return (
    <div className="page-enter mx-auto max-w-3xl px-4 pb-32 pt-10">
      <SplitHeading text="Blog" as="h1" className="mb-8 text-4xl sm:text-5xl" />
      <GlassPanel large>
        <div className="relative mb-4">
          <p
            className="absolute right-0 top-0 text-xs font-bold uppercase tracking-widest text-white"
            style={{ fontFamily: "'Agrandir', sans-serif" }}
          >
            PUBLIC
          </p>
          <div className="grid grid-cols-3 gap-6 pt-8">
            {folders.public.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => navigate(`/blog/folder/${f.id}`)}
                className="border-0 bg-transparent p-2 transition hover:scale-105"
              >
                <img src={assetUrl.fileColour(f.n)} alt="" className="mx-auto w-full max-w-[100px]" />
              </button>
            ))}
          </div>
        </div>
        <img src={assetUrl.divider} alt="" className="my-6 w-full opacity-90" />
        <div className="relative">
          <p
            className="absolute left-0 top-0 text-xs font-bold uppercase tracking-widest text-white"
            style={{ fontFamily: "'Agrandir', sans-serif" }}
          >
            PRIVATE
          </p>
          <div className="grid grid-cols-3 gap-6 pt-8">
            {folders.private.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => navigate(`/blog/folder/${f.id}`)}
                className="border-0 bg-transparent p-2 transition hover:scale-105"
              >
                <img src={assetUrl.fileColour(f.n)} alt="" className="mx-auto w-full max-w-[100px]" />
              </button>
            ))}
          </div>
        </div>
      </GlassPanel>
      <DragonBackButton to="/social" />
    </div>
  )
}
