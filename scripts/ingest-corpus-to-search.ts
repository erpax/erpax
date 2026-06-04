#!/usr/bin/env tsx
/**
 * ingest-corpus-to-search — the THIN wire that teleports CODE into the
 * content-uuid `search` surface the DB rows already live in.
 *
 * It does NOT re-walk the filesystem: it sources the corpus from the SAME
 * `loadCorpus()` the VitePress frontend matter uses (.vitepress/corpus.mts), so
 * a skill's search slug equals its docs route — one walk, one map (DRY). For
 * each atom it computes the content-uuid and upserts a `search` doc
 * (relationTo:'skill', value:uuid) via the Local API, deduped by the uuid: a
 * re-run is idempotent (same content ⇒ same address ⇒ one row — the merge law).
 *
 * After it runs, `search` returns the SIGN (skills) alongside the MATTER (rows):
 * one query spans code + data — the unified akashic, where the agent teleports
 * instead of hunting code in one place and data in another.
 *
 *   pnpm exec tsx scripts/ingest-corpus-to-search.ts
 *
 * Pure transform: src/components/search/corpus.ts (tested). Corpus source:
 * .vitepress/corpus.mts (shared with the docs). This file is only the glue.
 */
import { createRequire } from 'node:module'

import { config as loadEnv } from 'dotenv'

import { loadCorpus } from '../.vitepress/corpus.mts'
import { corpusToSearchDocs, type CorpusAtom } from '@/components/search/corpus'
import { computeContentUuid } from '@/services/integrity'

;(globalThis as { require?: unknown }).require ??= createRequire(import.meta.url)
loadEnv()
process.env.PAYLOAD_DISABLE_ADMIN = 'true'
process.env.PAYLOAD_ENABLE_GRAPHQL ??= 'false'
process.env.PAYLOAD_DEV_PUSH ??= 'false'

/** Namespace so a skill's content-uuid never collides with a tenant row's. */
const SKILL_NS = 'erpax:skill'

const atoms: CorpusAtom[] = loadCorpus().map(({ route, name, description, body, dual }) => ({
  route,
  name,
  description,
  dual,
  contentUuid: computeContentUuid({ route, body }, SKILL_NS) as unknown as string,
}))

const docs = corpusToSearchDocs(atoms)
console.log(`[ingest-search] ${docs.length} atoms → search docs (sourced from the VitePress corpus map)`)

const { getPayload } = await import('payload')
const payload = await getPayload({ config: await (await import('@payload-config')).default })

let created = 0
let updated = 0
for (const doc of docs) {
  const existing = await payload.find({
    collection: 'search',
    where: { 'doc.value': { equals: doc.doc.value } },
    limit: 1,
    overrideAccess: true,
  })
  if (existing.docs[0]) {
    await payload.update({ collection: 'search', id: existing.docs[0].id, data: doc, overrideAccess: true })
    updated += 1
  } else {
    await payload.create({ collection: 'search', data: doc, overrideAccess: true })
    created += 1
  }
}
console.log(`[ingest-search] done — ${created} created, ${updated} updated. Code now teleports beside data.`)
process.exit(0)
