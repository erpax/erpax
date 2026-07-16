import { describe, it, expect } from 'vitest'
import { join } from 'node:path'
import { mkdtempSync, writeFileSync, rmSync, existsSync, readFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { CLI_REGISTRY } from '@/cli/registry'
import { BUILD_GATE_CHECKS, folderNameWarnings, touchesStandardBanner } from './matter'

const ROOT = process.cwd()

describe('confirm/matter — scoped + full gate', () => {
  // Was: `expect(labels.length).toBe(9)` under the name "matches package.json check chain" — which it never
  // read. It asserted a magic number, and it had been RED since d2710a0c3 added the `corpus` lane: the
  // commit that wired a ratchet into CI broke the test guarding the gate's own shape, and nothing noticed,
  // because the suite behind the gate does not run at push. package.json `check` is now one `erpax gate`
  // call, so the "chain" the name described stopped existing too.
  //
  // It now asserts what actually matters and what a count cannot: every lane RESOLVES. A lane whose command
  // does not exist is a lane that cannot protect anything — the exact defect standards/emit shipped, where
  // the remedy it printed named a pnpm script nobody had written.
  it('every gate lane resolves to a real command — a lane that cannot run guards nothing', () => {
    const labels = BUILD_GATE_CHECKS.map(([l]) => l)
    expect(labels).toContain('standards')
    expect(labels).toContain('test:int')
    expect(new Set(labels).size).toBe(labels.length) // no duplicate lane

    // A domain the dispatcher handles itself (`doctor` · `verify` · `fold` …) takes a FREE-FORM action and
    // never needs a registry sub-entry. DERIVED from the dispatcher, not listed here: a hardcoded list is
    // the thing that rotted the count this test used to assert, and it would rot the same way.
    const dispatcher = readFileSync(join(ROOT, 'src/cli/index.ts'), 'utf8')
    const freeForm = new Set([...dispatcher.matchAll(/rawDomain === '(\w+)'/g)].map((m) => m[1]!))
    expect(freeForm.size, 'the dispatcher parse found no special domains — the regex has rotted').toBeGreaterThan(0)

    for (const [label, cmd] of BUILD_GATE_CHECKS) {
      const erpax = cmd.match(/^pnpm erpax (\S+)(?: (\S+))?/)
      const script = cmd.match(/^bash (scripts\/\S+)/)
      if (erpax) {
        const [, domain, action] = erpax
        expect(CLI_REGISTRY[domain!], `lane ${label}: erpax domain '${domain}' is not in CLI_REGISTRY`).toBeDefined()
        if (!freeForm.has(domain!))
          expect(
            CLI_REGISTRY[domain!]![action ?? 'default'],
            `lane ${label}: 'erpax ${domain} ${action ?? ''}' has no registry entry`,
          ).toBeDefined()
      } else if (script) {
        expect(existsSync(join(ROOT, script[1]!)), `lane ${label}: ${script[1]} does not exist`).toBe(true)
      } else {
        throw new Error(`lane ${label}: unrecognised command shape — ${cmd}`)
      }
    }
  })

  it('the fast lane runs FIRST — standards is 1.1s and used to sit behind minutes of lint+tests', () => {
    expect(BUILD_GATE_CHECKS[0]![0]).toBe('standards')
  })

  it('folderNameWarnings flags non-one-word segments', () => {
    const warns = folderNameWarnings([join(process.cwd(), 'src/trading-apis/foo.ts')])
    expect(warns.some((w) => w.includes('trading-apis'))).toBe(true)
  })

  // The standards catalogue rotted to 28 dead statutory pointers while `erpax standards` — GATE_LANES[0] —
  // sat there working. It never ran: the gate exceeds the 3-min cap and is skipped as one unit with
  // --no-verify. This hook fires at the WRITE and cannot be skipped, so the 1.1s check lives here, scoped
  // to the only edits that can make the catalogue stale.
  describe('touchesStandardBanner — scoping the freshness check to what can break it', () => {
    const cwd = process.cwd()
    const fixture = (body: string): string => {
      const dir = mkdtempSync(join(tmpdir(), 'erpax-banner-'))
      writeFileSync(join(dir, 'f.ts'), body)
      return dir
    }

    it('sees a real banner', () => {
      const d = fixture('/**\n * @standard ISO-4217:2015 currency-codes\n */\nexport const x = 1')
      expect(touchesStandardBanner(['f.ts'], d)).toBe(true)
      rmSync(d, { recursive: true, force: true })
    })

    it('ignores a file with no banner — the check is not worth 1.1s on every edit', () => {
      const d = fixture('export const x = 1 // just code')
      expect(touchesStandardBanner(['f.ts'], d)).toBe(false)
      rmSync(d, { recursive: true, force: true })
    })

    it('does not throw on a file deleted in the same changeset', () => {
      expect(touchesStandardBanner(['definitely/not/here.ts'], cwd)).toBe(false)
    })

    it('skips the catalogue and registry — they RESTATE every banner by construction', () => {
      const d = fixture('/**\n * @standard ISO-4217:2015 currency-codes\n */\nexport const x = 1')
      writeFileSync(join(d, 'catalogue.ts'), '/** @standard ISO-4217:2015 x */')
      writeFileSync(join(d, 'registry.ts'), '/** @standard ISO-4217:2015 x */')
      expect(touchesStandardBanner(['catalogue.ts', 'registry.ts'], d)).toBe(false)
      rmSync(d, { recursive: true, force: true })
    })

    // This gate refused its OWN first draft. The refusal message named the two banner sigils in prose, and
    // the scanner it guards — an rg regex over raw text — matched the sentence as a citation and filed
    // confirm/matter.ts as implementing an "RFC" titled with the rest of my message. The catalogue went
    // stale and the hook blocked the write that added it. A string is DATA, not a citation — the lesson
    // rules/reference already paid for, which standards/emit has not learned.
    it('the scanner cannot tell a banner from a string that looks like one — the flaw, pinned', () => {
      const sigil = '@' + 'rfc' // never written literally: it would file a false citation from this test
      const d = fixture(`export const msg = '${sigil} banner moved and the catalogue did not follow'`)
      expect(touchesStandardBanner(['f.ts'], d)).toBe(true) // a STRING, and it counts
      rmSync(d, { recursive: true, force: true })
    })

    it('the live confirm/matter.ts does NOT register — its prose is worded around the flaw', () => {
      expect(touchesStandardBanner(['src/confirm/matter.ts'], cwd)).toBe(false)
      expect(touchesStandardBanner(['src/invoices/index.ts'], cwd)).toBe(true) // real banners, still seen
    })
  })
})
