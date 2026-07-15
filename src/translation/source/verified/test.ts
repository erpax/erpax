import { describe, it, expect } from 'vitest'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { VERIFIED_PROVENANCE, verifiedRenderings, provenanceKey } from './index'
import { renderIn } from '@/translation'
import { messageUuid, splitWords } from '@/message'
import { defaultLocale } from '@/i18n/localization'
import type { Fetcher } from '../index'

/** Deterministic Wikidata: labels per Qid — tests never touch the network. */
const LABELS: Record<string, Record<string, string>> = {
  Q1072: { en: 'heart', bg: 'сърце', de: 'Herz' },
  Q283: { en: 'water', bg: 'вода' },
}
const fake: Fetcher = async (url) => ({
  ok: true,
  status: 200,
  async json() {
    const qid = new URLSearchParams(url.split('?')[1]).get('ids')!
    return { entities: { [qid]: { labels: Object.fromEntries(Object.entries(LABELS[qid] ?? {}).map(([l, v]) => [l, { value: v }])) } } }
  },
})

describe('translation/source/verified — the seed is stored, the renderings are computed', () => {
  it('the SEED: every concept provenanced to one CC0 Qid; known-correct senses; no poisoned homonyms', () => {
    for (const p of VERIFIED_PROVENANCE) expect(p.qid).toMatch(/^Q\d+$/)
    const q = (c: string): string | undefined => VERIFIED_PROVENANCE.find((p) => p.concept === c)?.qid
    expect(q('heart')).toBe('Q1072') // the organ, NOT a surname
    expect(q('water')).toBe('Q283') // the compound
    expect(q('gold')).toBe('Q897') // the element — the sense gate rejected the family name
    for (const poisoned of ['law', 'balance', 'dog', 'daughter']) expect(q(poisoned)).toBeUndefined()
  })

  it('COMPUTES the table from the seed — en stays the source; labels project per locale; uuid recomputes', async () => {
    const cwd = mkdtempSync(join(tmpdir(), 'erpax-verified-'))
    try {
      const r = await verifiedRenderings({ fetcher: fake, cwd })
      expect(r.cached).toBe(false) // cold — harvested and sealed
      expect(r.table.length).toBe(VERIFIED_PROVENANCE.length)
      const heart = r.table.find((t) => t.key === 'heart')!
      expect(renderIn(heart, defaultLocale)).toBe('heart') // Wikidata en label never overwrites the source
      expect(heart.values.bg).toBe('сърце')
      expect(heart.uuid).toBe(messageUuid('heart')) // green by construction — no hallucinated uuid
      expect(heart.words).toEqual(splitWords('heart'))
    } finally {
      rmSync(cwd, { recursive: true, force: true })
    }
  })

  it('SEALED content-addressed by the seed fold — the second call is a READ, zero network', async () => {
    const cwd = mkdtempSync(join(tmpdir(), 'erpax-verified2-'))
    try {
      await verifiedRenderings({ fetcher: fake, cwd })
      let touched = 0
      const dead: Fetcher = async () => {
        touched++
        throw new Error('network must not be touched on a warm seal')
      }
      const r = await verifiedRenderings({ fetcher: dead, cwd })
      expect(r.cached).toBe(true) // answered within
      expect(touched).toBe(0)
      expect(r.key).toBe(provenanceKey())
      expect(r.table.find((t) => t.key === 'heart')!.values.bg).toBe('сърце') // same answer from the seal
    } finally {
      rmSync(cwd, { recursive: true, force: true })
    }
  })

  it('never fabricates — an unreachable source with no seal throws', async () => {
    const cwd = mkdtempSync(join(tmpdir(), 'erpax-verified3-'))
    const down: Fetcher = async () => ({ ok: false, status: 503, async json() { return {} } })
    try {
      await expect(verifiedRenderings({ fetcher: down, cwd })).rejects.toThrow(/unreachable/)
    } finally {
      rmSync(cwd, { recursive: true, force: true })
    }
  })
})
