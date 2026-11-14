import { describe, expect, it } from 'vitest'

import { baseOf, bannerPattern, currentEdition, frameworkRow, loadStandards, standardEditions, supersededEditions } from '@/seed/standards'

describe('seed/standards — editions as data, from ISO Open Data', () => {
  const rows = standardEditions()

  it('every edition is one reference, once, with a title and a status', () => {
    expect(rows.length).toBeGreaterThan(20)
    expect(new Set(rows.map((row) => row.reference)).size).toBe(rows.length)
    for (const row of rows) {
      expect(row.title, row.reference).not.toBe('')
      expect(['current', 'superseded']).toContain(row.status)
    }
  })

  it('a watched standard has an edition in force, or is wholly withdrawn; a superseded edition is never the newest', () => {
    for (const base of new Set(rows.map((row) => baseOf(row.reference)))) {
      const editions = rows.filter((row) => baseOf(row.reference) === base)
      const current = currentEdition(base)
      if (!current) {
        // wholly withdrawn (e.g. ISO/IEC 17789): nothing may cite it
        expect(editions.every((row) => row.status === 'superseded'), base).toBe(true)
        continue
      }
      for (const old of editions.filter((row) => row.status === 'superseded')) {
        expect((old.publicationDate ?? '') < (current.publicationDate ?? ''), `${old.reference} vs ${current.reference}`).toBe(true)
      }
    }
  })

  it('knows the editions the research found withdrawn', () => {
    const gone = supersededEditions().map((row) => row.reference)
    for (const reference of ['ISO/IEC 27017:2015', 'ISO/IEC 27018:2019', 'ISO/IEC 27701:2019', 'ISO/IEC 24760-1:2019', 'ISO/IEC 29146:2016']) expect(gone, reference).toContain(reference)
    expect(currentEdition('ISO/IEC 27002')?.reference).toBe('ISO/IEC 27002:2022')
  })

  it('a banner citing an edition is matched in the forms the code uses', () => {
    const pattern = bannerPattern('ISO/IEC 27017:2015')
    for (const form of ['ISO-27017:2015', 'ISO 27017:2015', 'ISO/IEC 27017:2015', 'ISO-IEC-27017-2015']) expect(pattern.test(form), form).toBe(true)
    expect(pattern.test('ISO-27017:2026')).toBe(false)
    expect(bannerPattern('ISO 15489-1:2001').test('ISO 15489-1:2016')).toBe(false)
  })

  it('a framework row says whether the edition is in force', () => {
    expect(frameworkRow(rows.find((row) => row.reference === 'ISO/IEC 27017:2026')!)).toMatchObject({ code: 'ISO/IEC 27017:2026', isActive: true, issuingBody: 'ISO/IEC' })
    expect(frameworkRow(rows.find((row) => row.reference === 'ISO/IEC 27017:2015')!)).toMatchObject({ isActive: false })
  })

  it('loading creates what is missing, updates what differs and leaves the rest', async () => {
    const two = rows.filter((row) => row.reference.startsWith('ISO/IEC 27017'))
    const created: unknown[] = []
    const updated: unknown[] = []
    const rest = (stored: Record<string, { id: string; name: string; isActive: boolean; category: string }>) => ({
      find: async ({ where }: { where: { code: { equals: string } } }) => ({ docs: stored[where.code.equals] ? [stored[where.code.equals]] : [] }),
      create: async (args: Record<string, unknown>) => { created.push(args) },
      update: async (args: Record<string, unknown>) => { updated.push(args) },
    })
    expect(await loadStandards(rest({}), two, { tenant: 't1' })).toEqual({ created: two.length, updated: 0, unchanged: 0 })
    expect((created[0] as { data: { tenant: string } }).data.tenant).toBe('t1')
    const same = Object.fromEntries(two.map((row) => [row.reference, { id: row.reference, name: row.title, isActive: row.status === 'current', category: row.category }]))
    expect(await loadStandards(rest(same), two)).toEqual({ created: 0, updated: 0, unchanged: two.length })
    const stale = { ...same, [two[0]!.reference]: { ...same[two[0]!.reference]!, isActive: !same[two[0]!.reference]!.isActive } }
    expect(await loadStandards(rest(stale), two)).toEqual({ created: 0, updated: 1, unchanged: two.length - 1 })
    expect(updated).toHaveLength(1)
  })
})

describe('seed/standards — the standards no open feed covers', () => {
  it('every manual row is unverified, dated, and does not collide with a feed edition', async () => {
    const { manualStandards, standardEditions, allStandards } = await import('@/seed/standards')
    const manual = manualStandards()
    expect(manual.map((row) => row.reference)).toEqual(expect.arrayContaining(['ANSI/INCITS 359-2012', 'ANSI/INCITS 494-2012']))
    const feed = new Set(standardEditions().map((row) => row.reference))
    for (const row of manual) {
      expect(row.status, row.reference).toBe('unverified')
      expect(row.reviewedOn, row.reference).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      expect(Number.isNaN(Date.parse(row.reviewedOn!)), row.reference).toBe(false)
      expect(row.source, row.reference).toBeTruthy()
      expect(feed.has(row.reference), row.reference).toBe(false)
    }
    expect(allStandards()).toHaveLength(standardEditions().length + manual.length)
  })

  it('an unverified standard is loaded active, and says it is unverified and when it was reviewed', async () => {
    const { manualStandards, frameworkRow } = await import('@/seed/standards')
    const row = frameworkRow(manualStandards()[0]!)
    expect(row.isActive).toBe(true)
    expect(String(row.description)).toMatch(/unverified — last reviewed 2026-11-14/)
  })
})
