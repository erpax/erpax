import { describe, it, expect } from 'vitest'
import { paperMetadata, paperTex, priorArt, referencesOf, runPapers } from './index'

const fakeFetch = (body: unknown, ok = true, status = 200): typeof fetch =>
  (async () => ({ ok, status, json: async () => body })) as unknown as typeof fetch

/*
 * THE VERDICT TYPE IS THE POINT. "Nothing found in Zenodo" is a lead; treating it as proof that
 * no prior art exists is the inference this corpus has already paid for once — a claim built on
 * a shell glob that errored and returned nothing ([[rules]]/unraised). `novel` is deliberately
 * not a value this function can return.
 */
describe('publish/paper — an empty search is a lead, never a finding', () => {
  it('reports FOUND with the records, so a human reads them', async () => {
    const v = await priorArt(
      'content addressing',
      fakeFetch({ hits: { hits: [{ doi: '10.1/x', metadata: { title: 'A paper', publication_date: '2019-01-01' } }] } }),
    )
    expect(v.status).toBe('found')
    expect(v.hits[0]).toEqual({ doi: '10.1/x', title: 'A paper', year: '2019' })
  })

  it('reports NONE with the caveat attached — the sentence travels with the result', async () => {
    const v = await priorArt('nothing matches this', fakeFetch({ hits: { hits: [] } }))
    expect(v.status).toBe('none')
    expect(v.caveat).toContain('NOT evidence that no prior art exists')
  })

  it('a FAILED search is UNKNOWN, never none — the dangerous confusion', async () => {
    const offline = (async () => {
      throw new Error('getaddrinfo ENOTFOUND zenodo.org')
    }) as unknown as typeof fetch
    const v = await priorArt('anything', offline)
    expect(v.status).toBe('unknown')
    expect(v.hits).toEqual([])
  })

  it('an HTTP error is UNKNOWN too — rate-limited is not empty', async () => {
    const v = await priorArt('anything', fakeFetch({}, false, 429))
    expect(v.status).toBe('unknown')
    expect(v.caveat).toContain('429')
  })
})

describe('publish/paper — the paper cannot overclaim', () => {
  const base = { claim: 'same content ⇒ same address', atomPath: 'uuid', boundary: 'It does not prove the address is unique across other corpora.' }

  it('REFUSES a paper with no boundary — what it does not prove is required', () => {
    expect(() => paperTex({ ...base, boundary: '   ' })).toThrow(/does NOT prove/)
  })

  it('states plainly that no novelty is claimed when the search found nothing', () => {
    const tex = paperTex({
      ...base,
      priorArt: { query: 'q', status: 'none', hits: [], caveat: 'x' },
    })
    expect(tex).toContain('No claim of novelty is made here')
    expect(tex).toContain('not as a finding')
  })

  it('and when the search could not run at all', () => {
    const tex = paperTex({ ...base, priorArt: { query: 'q', status: 'unknown', hits: [], caveat: 'offline' } })
    expect(tex).toContain('Absence of a result is not a result')
  })

  it('escapes TeX metacharacters — a claim with an underscore is not a subscript', () => {
    const tex = paperTex({ ...base, claim: 'cost_per_atom & 100% of it' })
    expect(tex).toContain('cost\\_per\\_atom \\& 100\\% of it')
  })

  it('carries the archive address, so the paper resolves to what it describes', () => {
    const tex = paperTex(base)
    expect(tex).toContain('10.5281/zenodo.22237698')
    expect(tex).toContain('\\begin{document}')
    expect(tex).toContain('\\end{document}')
  })
})

describe('publish/paper — the runner writes only for the one status that warrants it', () => {
  const claim = { claim: 'c', atomPath: 'a', boundary: 'b' }

  it('FOUND writes no paper — records came back, and a paper ignoring them overclaims', async () => {
    const [r] = await runPapers([claim], fakeFetch({ hits: { hits: [{ doi: 'x', metadata: {} }] } }))
    expect(r!.tex).toBeNull()
    expect(r!.skipped).toContain('read them')
  })

  it('UNKNOWN writes no paper — justified by a search that did not run is justified by nothing', async () => {
    const [r] = await runPapers([claim], fakeFetch({}, false, 500))
    expect(r!.tex).toBeNull()
    expect(r!.skipped).toContain('justified by nothing')
  })

  it('NONE writes a draft, with the caveat inside it', async () => {
    const [r] = await runPapers([claim], fakeFetch({ hits: { hits: [] } }))
    expect(r!.tex).toContain('No claim of novelty is made here')
  })
})

describe('publish/paper — links, references and the bold claim', () => {
  const input = {
    claim: 'An involution admits no resistance',
    atomPath: 'duality/mirror',
    contentUuid: 'b78482f7-bc7e-88bf-979b-ee11c28aa353',
    boundary: 'Theorems for this carrier, closed by exhaustion — not a claim about infinite S.',
    priorArt: { status: 'none' as const, query: 'involution parity', hits: [], caveat: '' },
  }

  it('reads references from the ATOM, so a paper cannot cite what the code never claimed', () => {
    const refs = referencesOf('duality/mirror')
    expect(refs.length).toBeGreaterThan(0)
    expect(refs.some((r) => /RFC 9562/.test(r.label))).toBe(true)
  })

  it('every emitted URL is bare — a section number in an href is a link that 404s', () => {
    for (const a of ['duality/mirror', 'rules/forge', 'rules/mirror', 'metric/face']) {
      for (const r of referencesOf(a)) {
        if (r.url === null) continue
        expect(r.url, `${a}: ${r.url}`).toMatch(/^https:\/\/[^\s]+$/)
        expect(r.url).not.toMatch(/§|\s/)
      }
    }
  })

  it('states the claim in BOLD, twice — abstract and body', () => {
    const tex = paperTex(input)
    expect(tex).toContain(`\\textbf{${input.claim}}`)
    expect((tex.match(/\\textbf\{An involution/g) ?? []).length).toBe(2)
  })

  it('surfaces the prior-art STATUS in bold, and refuses to call "none" novelty', () => {
    const tex = paperTex(input)
    expect(tex).toContain('\\textbf{Prior art: no records returned}')
    expect(tex).toContain('search result, not a finding of novelty')
    expect(tex.toLowerCase()).not.toContain('is novel')
  })

  it('carries PDF metadata a search engine reads', () => {
    const tex = paperTex(input)
    expect(tex).toContain('\\usepackage{hyperref}')
    expect(tex).toContain('pdfkeywords=')
    expect(tex).toContain('pdftitle=')
  })

  it('the deposition relates the paper to its source, its parent record and its standards', () => {
    const m = paperMetadata(input) as { related_identifiers: { relation: string; identifier: string }[] }
    const rel = (r: string) => m.related_identifiers.filter((x) => x.relation === r)
    expect(rel('isSupplementTo').map((x) => x.identifier)).toContain('https://github.com/erpax/erpax')
    expect(rel('isPartOf')).toHaveLength(1)
    expect(rel('references').length).toBeGreaterThan(0)
    // an orphan deposit is discoverable only by someone who already knows it exists
    expect(m.related_identifiers.length).toBeGreaterThanOrEqual(4)
  })

  it('the deposition description leads with the claim and carries the boundary', () => {
    const m = paperMetadata(input) as { description: string }
    expect(m.description).toContain(`<strong>${input.claim}</strong>`)
    expect(m.description).toContain('What this does not prove')
  })
})
