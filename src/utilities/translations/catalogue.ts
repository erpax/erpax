import type { Translation } from '@/utilities/translation'

/** One row of the translations seed (src/seed/content/fixtures/translations.json). */
export interface CatalogueEntry {
  readonly atom: string
  readonly path: string
  readonly translations: readonly Translation[]
}
