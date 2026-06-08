import type { Page } from '@/types'

import { RenderBlocks } from '@/block'
import { RenderHero } from '@/hero'

/** Public tenant route renderer (matches `(frontend)/[slug]` article layout). */
export function RenderTenantPage({ data }: { data: Page }) {
  const { hero, layout } = data

  return (
    <article className="pt-16 pb-24">
      <RenderHero {...hero} />
      <RenderBlocks blocks={layout} />
    </article>
  )
}
