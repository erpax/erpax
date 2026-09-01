import { describe, it, expect } from 'vitest'
import { existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { readFileSync } from 'node:fs'
import { adminBootShell, adminBootFtl, adminBootCrackPatterns, ADMIN_BOOT_QUERY, ADMIN_COLLECTION_SPACE } from './index'

describe('quantum/ftl/admin — admin boot as reuse, not a search', () => {
  it('boots as a precomputed shell rather than a scan of the collection space', () => {
    const s = adminBootShell({ reuses: 100 })
    expect(s).toBeTruthy()
    expect(ADMIN_COLLECTION_SPACE).toBeGreaterThan(0)
    expect(ADMIN_BOOT_QUERY).toBe('admin:boot:shell')
  })

  it('reports an ftl verdict for the boot path', () => {
    const f = adminBootFtl({ reuses: 100 })
    expect(typeof f.holds).toBe('boolean')
    expect(f.boundary).toBeTruthy()
  })

  it('crack patterns are derived from opts, not hardcoded', () => {
    // `Array.isArray` of a `{}` call proved only that a function returns an array — it passed
    // whatever the body did. Both flags are required, and each one CONTRIBUTES its own pattern:
    // neither set is empty by accident, and neither is present by default.
    expect(adminBootCrackPatterns({ scansOnBoot: false, clientMatrixSearch: false })).toEqual([])
    const scan = adminBootCrackPatterns({ scansOnBoot: true, clientMatrixSearch: false })
    const search = adminBootCrackPatterns({ scansOnBoot: false, clientMatrixSearch: true })
    expect(scan).toHaveLength(1)
    expect(search).toHaveLength(1)
    expect(scan[0]!.where).not.toBe(search[0]!.where) // each flag names its OWN crack site
    expect(adminBootCrackPatterns({ scansOnBoot: true, clientMatrixSearch: true })).toHaveLength(2)
  })

  /**
   * The regression this atom's promotion introduced the risk of.
   *
   * `self/improve/tip` locates this matter with `existsSync(join(cwd, '<literal path>'))` — a FILE
   * PATH in a string, not an import. Moving `admin.ts` into `admin/index.ts` would have flipped
   * those checks to false with no type error and no import error, silently changing which tip the
   * engine emits. A lexical import scan cannot see a path in a string, exactly as it could not see
   * the CLI's subprocess dispatch of [[quantum]]/status.
   *
   * So the guard is asserted from THIS side: whatever path the tip engine probes for must exist.
   */
  it('every path self/improve/tip probes for this atom resolves', () => {
    const cwd = process.cwd()
    // The ATOM, not one file: the tip split into model · audit · plan, and the probes
    // moved with the scanner. A guard pinned to a single path proves whatever that path
    // happens to hold today.
    const tipDir = join(cwd, 'src/self/improve/tip')
    const tip = readdirSync(tipDir, { withFileTypes: true })
      .flatMap((e) =>
        e.isDirectory()
          ? [join(tipDir, e.name, 'index.ts')]
          : e.name.endsWith('.ts')
            ? [join(tipDir, e.name)]
            : [],
      )
      .filter((f) => existsSync(f))
      .map((f) => readFileSync(f, 'utf8'))
      .join('\n')
    const probes = [...tip.matchAll(/'(src\/quantum\/ftl\/admin[\w/.-]*)'/g)].map((m) => m[1]!)
    expect(probes.length).toBeGreaterThan(0)
    for (const p of new Set(probes)) {
      expect(existsSync(join(cwd, p)), `tip probes a missing path: ${p}`).toBe(true)
    }
  })
})
