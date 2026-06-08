import { describe, it, expect } from 'vitest'
import { accountCodeOf } from '@/accounting'
import { ATOM_LEDGER_PATHS, atomPathHasLedgerHook, ledgerForAtomPaths } from '@/path/hub'
import { proveLedgerHubCoverage, renderDomainTable } from '@/apply/report'

describe('apply — session law batch inventory', () => {
  it('registry covers every index.ts atom path', () => {
    expect(ATOM_LEDGER_PATHS.length).toBeGreaterThan(800)
    expect(ATOM_LEDGER_PATHS).toContain('path')
    expect(ATOM_LEDGER_PATHS).toContain('medical/device')
    expect(atomPathHasLedgerHook('readings')).toBe(true)
  })

  it('ledger hub batch gate passes on sample paths', () => {
    const hub = proveLedgerHubCoverage(8)
    expect(hub.sampleComplete).toBe(true)
    expect(hub.incomplete).toEqual([])
  })

  it('medical + monitor pivots are in registry', () => {
    for (const p of ['medical', 'medical/device', 'monitor', 'readings', 'quantum/emr']) {
      expect(ATOM_LEDGER_PATHS).toContain(p)
    }
  })

  it('path is account code — homonyms distinct', () => {
    expect(accountCodeOf('agents/accounting')).not.toBe(accountCodeOf('accounting'))
    expect(accountCodeOf('medical/device')).toBe('medical/device')
  })

  it('renderDomainTable — formats domain rows', () => {
    const table = renderDomainTable({
      totalAtoms: 10,
      withIndex: 5,
      withTest: 5,
      trinity: 4,
      trinityPct: 40,
      formOnly: 6,
      ledgerRegistry: 5,
      ledgerNamedHooks: 2,
      domains: [
        {
          domain: 'core',
          atoms: 3,
          trinity: 3,
          trinityPct: 100,
          ledgerHooks: 3,
          ledgerPct: 100,
          crossed: 2,
          crossedPct: 66.7,
          folded: 3,
          foldedPct: 100,
        },
      ],
    })
    expect(table).toContain('| core |')
  })

  it('ledgerForAtomPaths chains prev entry uuids', () => {
    const paths = ['path', 'seal', 'readme'] as const
    const ledger = ledgerForAtomPaths(paths)
    expect(ledger).toHaveLength(3)
    expect(ledger[1]!.prevEntryUuid).toBe(ledger[0]!.entryUuid)
    expect(ledger[2]!.prevEntryUuid).toBe(ledger[1]!.entryUuid)
  })
})
