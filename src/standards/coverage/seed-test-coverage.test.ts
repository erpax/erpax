/**
 * Seed → test coverage matrix — meta-test that polices the DRY cycle
 * between the seed validation registry and the specs that exercise it.
 *
 * Two checks, both automatically refreshed every test run:
 *
 *   1. **Coverage**   — every `SEED_VALIDATION_REGISTRY` entry must be
 *      pinned by at least one spec asserting its `<Label>: <field> is
 *      required` contract. A registered collection with no test = a silent
 *      compliance gap (the validator could rot without anyone noticing).
 *
 *   2. **Redundancy** — no two specs may pin the exact same
 *      `<Label>: <field>` assertion. A duplicate assertion = drift latency:
 *      when the rule changes, only one spec is updated, the other quietly
 *      lies, and the system enters a state where two tests "pass" but
 *      disagree about the same fact. This is the failure mode the user
 *      described as "redundancy means broken logic and unidentifiable gaps".
 *
 * The matrix is computed from the live registry at runtime + a regex sweep
 * of every `tests/**\/*.int.spec.ts` source file. Adding a new collection
 * to `SEED_VALIDATION_REGISTRY` automatically extends the coverage check;
 * accidentally duplicating an assertion in two specs fails the redundancy
 * check the next time the suite runs.
 *
 * @standard ISO/IEC-29119:2022 software-testing test-meta-coverage
 * @standard ISO/IEC/IEEE-29119-3:2021 test-documentation
 * @audit ISO-19011:2018 audit-trail seed-test-traceability
 * @compliance SOX §404 internal-controls control-coverage-matrix
 * @see src/testing/test-seed-factory.ts
 * @see ../../helpers/evidence.ts
 */

import { describe, expect, it } from 'vitest'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { SEED_VALIDATION_REGISTRY } from '@/testing'

// ─── Spec sweep ──────────────────────────────────────────────────────────
//
// Walk `tests/` recursively for `*.int.spec.ts(x)` files and read their
// source once. Every assertion below queries this in-memory map.

const REPO_ROOT = resolve(__dirname, '..', '..', '..')
const TESTS_ROOT = resolve(REPO_ROOT, 'tests')

interface SpecFile {
  readonly path: string // repo-relative
  readonly source: string
}

const walk = (dir: string, out: string[] = []): string[] => {
  for (const entry of readdirSync(dir)) {
    const abs = join(dir, entry)
    const stat = statSync(abs)
    if (stat.isDirectory()) {
      walk(abs, out)
    } else if (/\.int\.spec\.tsx?$/.test(entry)) {
      out.push(abs)
    }
  }
  return out
}

const SPEC_FILES: ReadonlyArray<SpecFile> = walk(TESTS_ROOT)
  // Don't read this spec itself — it would self-match every assertion below.
  .filter((p) => !p.endsWith('seed-test-coverage.int.spec.ts'))
  .map((abs) => ({
    path: abs.slice(REPO_ROOT.length + 1),
    source: readFileSync(abs, 'utf8'),
  }))

const REGISTERED_COLLECTIONS = Object.keys(SEED_VALIDATION_REGISTRY).sort()

describe('seed → test coverage matrix', () => {
  it.each(REGISTERED_COLLECTIONS)(
    'collection "%s" has at least one spec pinning a `<Label>: <field> is required` assertion',
    (collection) => {
      const contract = SEED_VALIDATION_REGISTRY[collection]
      const label = contract.label
      const re = new RegExp(`['"\\\`]${escapeRegex(label)}: \\w+ is required['"\\\`]`)
      const matchingSpecs = SPEC_FILES.filter((f) => re.test(f.source)).map((f) => f.path)

      expect(
        matchingSpecs.length,
        [
          `No spec pins the required-field contract for collection '${collection}' (label: '${label}').`,
          `Add an assertion of the form: \`expect(...).rejects.toThrow('${label}: <field> is required')\``,
          `to a spec under tests/int/ or tests/standards/, OR remove the registry entry if validation moved.`,
        ].join('\n  '),
      ).toBeGreaterThan(0)
    },
  )
})

describe('seed → test redundancy detector', () => {
  it('no two specs duplicate the same `<Label>: <field>` required-field assertion', () => {
    type AssertionFingerprint = string // `<Label>: <field>`
    const occurrences = new Map<AssertionFingerprint, string[]>()

    const re = /['"`](([A-Z][A-Za-z ]+)): (\w+) is required['"`]/g

    for (const spec of SPEC_FILES) {
      const seen = new Set<AssertionFingerprint>()
      for (const m of spec.source.matchAll(re)) {
        const fingerprint = `${m[1]}: ${m[3]}`
        if (seen.has(fingerprint)) continue // intra-spec dupes are intentional (multiple branches)
        seen.add(fingerprint)
        const list = occurrences.get(fingerprint) ?? []
        list.push(spec.path)
        occurrences.set(fingerprint, list)
      }
    }

    const duplicated = [...occurrences.entries()].filter(([, files]) => files.length > 1)

    expect(
      duplicated,
      [
        'Two or more specs pin the same `<Label>: <field>` required-field assertion.',
        'Per the DRY cycle: redundancy = drift latency. Pick one spec to own each contract;',
        'in the others, drop the duplicate and rely on the central pin.',
        '',
        'Duplicates:',
        ...duplicated.map(([fp, files]) => `  - "${fp}" pinned in: ${files.join(', ')}`),
      ].join('\n'),
    ).toEqual([])
  })
})

describe('seed → test compliance citation coverage', () => {
  it('every spec carries at least one @standard / @compliance / @audit / @accounting citation', () => {
    const uncited = SPEC_FILES.filter(
      (f) => !/@(standard|compliance|audit|accounting|security|rfc)\b/.test(f.source.slice(0, 1500)),
    ).map((f) => f.path)

    expect(
      uncited,
      [
        'Spec files are missing the JSDoc citation banner.',
        'Add at least one of @standard / @compliance / @audit / @accounting / @security / @rfc',
        'within the first 1500 chars (the JSDoc header) so docs/STANDARDS_INDEX.md picks the test up',
        'and SOX §404 / ISO-19011 walk-throughs can trace the test back to its governing rule.',
      ].join('\n'),
    ).toEqual([])
  })
})

// ─── helpers ─────────────────────────────────────────────────────────────

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
