import type { Payload } from 'payload'
import type { Standard } from '@/payload-types'
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

export async function seedStandards(payload: Payload): Promise<void> {
  for (const s of STANDARDS_CATALOGUE) {
    await upsert(payload, s.id, {
      title: s.title,
      family: s.family as Standard['family'],
      status: s.count > 0 ? 'published' : 'proposed',
      citingModules: s.modules.map((m) => ({
        modulePath: m.path,
        banner: 'standard',
        section: m.section || null,
      })) as Standard['citingModules'],
    })
  }
}
