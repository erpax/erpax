import type { Payload } from 'payload'
import type { Standard } from '@/types'
import { STANDARDS_CATALOGUE } from './catalogue'

/**
 * Seed `standards` from the shared catalogue — the payload half of the shared
 * index.
 *
 * Standards are facts (like the SNA/COFOG taxonomies in `sectors/seed.ts`), so
 * they are seeded from the curated `registry.ts`; the *usage* (which modules
 * cite each, with section pins) is the `@standard` vocabulary dissolved across
 * src/, re-collected per standard by `scripts/standards-catalogue.mjs`. The
 * SAME `catalogue.ts` renders the vitepress index (`SKILL.md`) — one scan, two
 * indices, logic meets here.
 *
 * Idempotent on `standardId`. Regenerate the catalogue after adding banners:
 *   node scripts/standards-catalogue.mjs
 *
 * @standard ISO-19011:2018 §6.4 audit-evidence (citingModules = the trail)
 * @see ./registry.ts  ./catalogue.ts  ./SKILL.md
 */
async function upsert(payload: Payload, standardId: string, data: Partial<Standard>): Promise<void> {
  const existing = await payload.find({
    collection: 'standards',
    where: { standardId: { equals: standardId } },
    limit: 1,
    overrideAccess: true,
  })
  if (existing.docs.length > 0) {
    await payload.update({ collection: 'standards', id: existing.docs[0].id, data, overrideAccess: true })
  } else {
    await payload.create({ collection: 'standards', data: { standardId, ...data } as Standard, overrideAccess: true })
  }
}
