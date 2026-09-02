import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { GATE_LANES } from './gate'
import { CLI_REGISTRY, LEGACY_ALIASES, AURA_SCAN_PATH, resolveAction } from './registry'
import { suggestNearestDomain, printHelp, DOMAIN_GROUPS } from './help'
import { shardIndexOf } from './local'
import { collectDoctorReport, formatDoctorReport, runDoctorStalls } from './doctor'
import { topFailedAxes, AXIS_FIX_HINTS, formatRulesFailureSummary } from './rules-check'
import { runCli } from './index'

const ROOT = process.cwd()

describe('cli/registry — minimal operational surface', () => {
  it('covers required aspect domains', () => {
    for (const d of [
      'readme',
      'lint',
      'test',
      'rules',
      'monitor',
      'agent',
      'confirm',
      'apply',
      'standards',
      'corpus',
      'gate',
      'doctor',
    ]) {
      expect(CLI_REGISTRY[d]).toBeTruthy()
    }
  })

  it('resolves readme check and waves', () => {
    expect(resolveAction('readme', 'check')?.cmd).toMatch(/--verify --waves/)
    expect(resolveAction('readme', 'waves')?.cmd).toMatch(/--waves/)
  })

  it('resolves readme paths (--paths flag or action)', () => {
    expect(resolveAction('readme', 'paths')?.cmd).toMatch(/src\/readme\/index\.ts --paths/)
    expect(resolveAction('readme', '--paths')?.cmd).toMatch(/src\/readme\/index\.ts --paths/)
    expect(LEGACY_ALIASES['readme:paths']).toBe('erpax readme paths')
  })

  it('rules check routes through cli wrapper', () => {
    expect(resolveAction('rules', 'check')?.cmd).toBe('__rules_check__')
  })

  it('legacy aliases map to erpax invocations', () => {
    expect(LEGACY_ALIASES['readme:check']).toBe('erpax readme check')
    expect(LEGACY_ALIASES['confirm:uuid']).toBe('erpax confirm uuid')
    expect(LEGACY_ALIASES['migrate:production']).toBe('erpax deploy db')
    expect(LEGACY_ALIASES['readme:waves']).toBe('erpax readme waves')
  })

  it('gate lanes cover check aspects', () => {
    const labels = GATE_LANES.map(([l]) => l)
    expect(labels).toContain('standards')
    expect(labels).toContain('lint:imports')
    expect(labels).toContain('test:int')
  })
})

describe('cli/help — grouped help + nearest match', () => {
  it('suggests nearest domain for typos', () => {
    expect(suggestNearestDomain('redme')).toBe('readme')
    expect(suggestNearestDomain('gat')).toBe('gate')
    expect(suggestNearestDomain('zzzzzzz')).toBeUndefined()
  })

  it('groups domains for --help', () => {
    const all = DOMAIN_GROUPS.flatMap((g) => g.domains)
    expect(all).toContain('readme')
    expect(all).toContain('doctor')
    expect(all).toContain('gate')
  })

  it('printHelp does not throw', () => {
    expect(() => printHelp()).not.toThrow()
    expect(() => printHelp('readme')).not.toThrow()
  })
})

describe('cli/doctor — health snapshot', () => {
  // BOUNDED-WITNESS: collectDoctorReport(ROOT) scans the FULL tree (stray-ts + efficiency +
  // corpus entry) — ~minutes; running it (and runCli(['doctor'])) in a unit batch made cli/test
  // ~10min and timed out the whole batch. The full scan is the `erpax doctor` command / the gate;
  // the unit suite keeps the LOGIC tests (formatDoctorReport, router smoke). Skipped here.
  it.skip('collects stray-ts, efficiency, and corpus entry (full-tree — runs in `erpax doctor`, not the unit batch)', () => {
    const report = collectDoctorReport(ROOT)
    expect(report.strayTs.baseline).toBeGreaterThan(0)
    expect(report.entrySkill.path).toBe('.claude/skills/SKILL.md')
    expect(report.entrySkill.exists).toBe(true)
    const text = formatDoctorReport(report)
    expect(text).toContain('stray-ts')
    expect(text).toContain('corpus entry')
    expect(text).not.toContain('entry skill')
    expect(text).toContain('inventory')
  }, 300_000)
})

describe('cli/rules-check — failure summary helpers', () => {
  it('maps axes to fix hints', () => {
    expect(AXIS_FIX_HINTS['stray-ts']).toContain('rules ratchet')
    expect(AXIS_FIX_HINTS['import-purity']).toContain('lint imports')
  })

  it('formatRulesFailureSummary renders top axes', () => {
    const text = formatRulesFailureSummary([
      { axis: 'stray-ts', violations: 10, baseline: 5, fix: 'pnpm erpax rules ratchet' },
    ])
    expect(text).toContain('stray-ts')
    expect(text).toContain('pnpm erpax rules ratchet')
  })
})

describe('cli/index — router smoke', () => {
  it('returns 0 for help and aliases', () => {
    expect(runCli(['help'])).toBe(0)
    expect(runCli(['aliases'])).toBe(0)
  })

  it('returns 1 for unknown domain with suggestion', () => {
    expect(runCli(['redme'])).toBe(1)
  })

  // BOUNDED-WITNESS: the doctor route runs the same full-tree scans (~minutes) — corpus-scale,
  // belongs to `erpax doctor`/the gate, not a unit batch. Skipped (the router smoke above covers routing).
  it.skip('doctor and status route to health snapshot (full-tree — runs in `erpax doctor`)', () => {
    expect(runCli(['doctor'])).toBe(0)
  }, 300_000)

  it('doctor stalls lists process table', () => {
    expect(runDoctorStalls()).toBe(0)
    expect(runCli(['doctor', 'stalls'])).toBe(0)
  })

  it('agent inventory resolves from registry', () => {
    expect(resolveAction('agent', 'inventory')?.cmd).toMatch(/agent\/inventory\/cli/)
    expect(resolveAction('monitor', 'inventory')?.cmd).toMatch(/agent\/inventory\/monitor/)
  })

  it('corpus book resolves to cli with --index flag support', () => {
    expect(resolveAction('corpus', 'book')?.cmd).toMatch(/src\/book\/cli\.ts/)
    expect(resolveAction('corpus', 'book')?.desc).toContain('--index')
  })
})

describe('package.json — minimal scripts', () => {
  it('wires check and erpax to src/cli', () => {
    const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')) as {
      scripts: Record<string, string>
    }
    expect(pkg.scripts['erpax']).toMatch(/src\/cli\/index\.ts/)
    expect(pkg.scripts['check']).toMatch(/src\/cli\/index\.ts gate/)
    const count = Object.keys(pkg.scripts).length
    expect(count).toBeLessThanOrEqual(20)
  })

  it('legacy shims point at legacy-shim.ts', () => {
    const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')) as {
      scripts: Record<string, string>
    }
    expect(pkg.scripts['readme:waves']).toMatch(/legacy-shim\.ts/)
    expect(pkg.scripts['rules:check']).toMatch(/legacy-shim\.ts/)
  })

  it('aura scan canonical path is stable', () => {
    expect(AURA_SCAN_PATH).toBe('src/aura/scan.mjs')
    expect(resolveAction('aura', 'scan')?.cmd).toContain(AURA_SCAN_PATH)
  })
})

/*
 * The shard is a PARTITION or it is a lottery: a suite in two shards is billed twice, and a
 * suite in none is a green nobody ran — the default-ALLOW that [[rules]]/unraised names, at
 * the scale of a whole test lane.
 */
describe('test waves --shard — the roster is partitioned BY ADDRESS', () => {
  const roster = Array.from({ length: 400 }, (_, i) => `src/atom${i}/nested${i % 7}/test.ts`)

  it('every suite lands in exactly one shard', () => {
    for (const n of [1, 4, 16]) {
      const seen = new Map<string, number>()
      for (const s of roster) {
        const i = shardIndexOf(s, n)
        expect(i).toBeGreaterThanOrEqual(1)
        expect(i).toBeLessThanOrEqual(n)
        seen.set(s, (seen.get(s) ?? 0) + 1)
      }
      expect([...seen.values()].every((c) => c === 1)).toBe(true)
      expect(seen.size).toBe(roster.length)
    }
  })

  it('the address decides, so an inserted neighbour moves nobody', () => {
    // An INDEX-based shard shifts every suite after an insertion, stranding the receipts each
    // shard has cached. This is the whole reason the assignment is a hash of the path.
    const before = new Map(roster.map((s) => [s, shardIndexOf(s, 16)]))
    const withNewSuite = ['src/aaa/brand/new/test.ts', ...roster].sort()
    for (const s of withNewSuite) {
      if (before.has(s)) expect(shardIndexOf(s, 16)).toBe(before.get(s))
    }
  })

  it('spreads the roster — no shard carries a third of it', () => {
    const counts = new Array(16).fill(0)
    for (const s of roster) counts[shardIndexOf(s, 16) - 1]!++
    expect(Math.max(...counts)).toBeLessThan(roster.length / 3)
    expect(Math.min(...counts)).toBeGreaterThan(0)
  })
})
