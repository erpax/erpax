import { describe, it, expect } from 'vitest'
import { npmLive, doiLive, declaredDoi, releasedPackages, releaseLive, summarise, type RegistryIo } from './index'

const io = (answers: Record<string, { status: number; json: unknown }>): RegistryIo => ({
  getJson: async (url) => answers[url] ?? { status: 404, json: {} },
})
const NPM = 'https://registry.npmjs.org/@erpax%2Faccess'
const DOI = (d: string) => `https://doi.org/api/handles/${d}`

describe('publish/live — asked of the registry, never inferred from a tag', () => {
  it('EVERY separator is encoded, not just the first — CodeQL caught this', async () => {
    // `replace('/', …)` replaces one occurrence: correct for `@erpax/access` by accident, wrong for
    // any name with a second separator, where the tail reads as a path segment and the registry
    // answers about a different resource.
    const seen: string[] = []
    await npmLive('@scope/group/name', '1.0.0', { getJson: async (url) => { seen.push(url); return { status: 404, json: {} } } })
    expect(seen[0]).toBe('https://registry.npmjs.org/@scope%2Fgroup%2Fname')
    expect(seen[0]).not.toContain('group/name')
  })

  it('a published version is live, and the publish time is reported', async () => {
    const v = await npmLive('@erpax/access', '0.1.11', io({
      [NPM]: { status: 200, json: { versions: { '0.1.11': {} }, time: { '0.1.11': '2026-09-01T00:00:00Z' } } },
    }))
    expect(v).toMatchObject({ reachable: true, live: true })
    expect(v.detail).toContain('2026-09-01')
  })

  it('a tag with no publish behind it is NOT live — the release is incomplete', async () => {
    const v = await npmLive('@erpax/access', '9.9.9', io({
      [NPM]: { status: 200, json: { versions: { '0.1.11': {} } } },
    }))
    expect(v).toMatchObject({ reachable: true, live: false })
    expect(v.detail).toContain('not among 1')
  })

  it('a 404 is an ANSWER — the package genuinely does not exist', async () => {
    const v = await npmLive('@erpax/access', '0.1.11', io({ [NPM]: { status: 404, json: {} } }))
    expect(v).toMatchObject({ reachable: true, live: false, detail: 'package does not exist on npm' })
  })

  it('a 500, or a throw, is UNREACHABLE — never a verdict that it is missing', async () => {
    const five = await npmLive('@erpax/access', '0.1.11', io({ [NPM]: { status: 500, json: null } }))
    expect(five).toMatchObject({ reachable: false, live: false })
    const threw = await npmLive('@erpax/access', '0.1.11', { getJson: async () => { throw new Error('ENOTFOUND') } })
    expect(threw.reachable).toBe(false)
    expect(threw.detail).toContain('ENOTFOUND')
  })

  it('the DOI is live only when the proxy says responseCode 1', async () => {
    const d = '10.5281/zenodo.22237698'
    expect(await doiLive(d, 'concept', io({ [DOI(d)]: { status: 200, json: { responseCode: 1 } } })))
      .toMatchObject({ reachable: true, live: true })
    expect(await doiLive(d, 'concept', io({ [DOI(d)]: { status: 404, json: { responseCode: 100 } } })))
      .toMatchObject({ reachable: true, live: false, detail: 'handle not found — the DOI does not exist' })
    // an unknown response code is unreachable, not a denial
    expect(await doiLive(d, 'concept', io({ [DOI(d)]: { status: 200, json: { responseCode: 2 } } })))
      .toMatchObject({ reachable: false, live: false })
  })

  it('unreachable is UNVERIFIED, never incomplete — the two are different findings', () => {
    const s = summarise([
      { registry: 'npm', id: 'a', version: '1', reachable: true, live: true, detail: '' },
      { registry: 'npm', id: 'b', version: '1', reachable: false, live: false, detail: '' },
    ])
    expect(s.live).toBe(1)
    expect(s.missing).toEqual([])
    expect(s.unreachable).toHaveLength(1)
    expect(s.complete).toBe(false)
  })

  it('an empty verdict set is never complete — nothing asked is not everything answered', () => {
    expect(summarise([]).complete).toBe(false)
  })

  it('reads the real manifests this repo ships', () => {
    const pkgs = releasedPackages(process.cwd())
    expect(pkgs.length).toBeGreaterThan(0)
    for (const p of pkgs) expect(p.pkg.startsWith('@erpax/')).toBe(true)
    expect(declaredDoi(process.cwd())).toMatch(/^10\.\d{4,}\//)
  })

  it('releaseLive asks about every released package AND the declared DOI', async () => {
    const answers: Record<string, { status: number; json: unknown }> = {}
    for (const { pkg, version } of releasedPackages(process.cwd())) {
      answers[`https://registry.npmjs.org/${pkg.replaceAll('/', '%2F')}`] = { status: 200, json: { versions: { [version]: {} } } }
    }
    answers[DOI(declaredDoi(process.cwd())!)] = { status: 200, json: { responseCode: 1 } }
    const v = await releaseLive(process.cwd(), io(answers))
    expect(v).toHaveLength(releasedPackages(process.cwd()).length + 1)
    expect(summarise(v).complete).toBe(true)
  })
})
