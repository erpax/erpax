import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

// Hook-integrity gate (Task 4): the git hooks must reference the REAL aura scanner,
// not the dead `.claude/skills/aura/scan.mjs` path that silently made every push deny
// (or get bypassed with --no-verify). This converts a silent path-rot into a red test:
// any hook that names a scan.mjs which is not on disk, or that diverges from the
// package.json `aura:scan` target, fails here.
const ROOT = process.cwd()
const read = (rel: string): string => readFileSync(join(ROOT, rel), 'utf8')

/** The canonical aura scanner path, as the npm `aura:scan` script declares it. */
function auraScanTargetFromPackageJson(): string {
  const pkg = JSON.parse(read('package.json')) as { scripts: Record<string, string> }
  const m = pkg.scripts['aura:scan']?.match(/node\s+(\S+scan\.mjs)/)
  expect(m, 'package.json aura:scan must invoke a node …/scan.mjs').toBeTruthy()
  return m![1]!
}

/** Every `node …/scan.mjs` invocation found in a shell hook file. */
function auraPathsInHook(rel: string): string[] {
  return [...read(rel).matchAll(/node\s+(\S+scan\.mjs)/g)].map((m) => m[1]!)
}

describe('git hooks reference the canonical, on-disk aura scanner', () => {
  const canonical = auraScanTargetFromPackageJson()

  it('package.json aura:scan target actually exists on disk', () => {
    expect(existsSync(join(ROOT, canonical))).toBe(true)
  })

  for (const hook of ['.husky/pre-push', '.husky/pre-commit']) {
    it(`${hook} invokes scan.mjs at a path that exists AND matches package.json aura:scan`, () => {
      const paths = auraPathsInHook(hook)
      expect(paths.length, `${hook} should invoke the aura scanner`).toBeGreaterThan(0)
      for (const p of paths) {
        // no hook may INVOKE a non-existent script (the original .claude/skills bug —
        // a `node <path>/scan.mjs` whose <path> does not resolve)
        expect(existsSync(join(ROOT, p)), `${hook} invokes missing scanner: ${p}`).toBe(true)
        // hook and npm script may not diverge again
        expect(p).toBe(canonical)
        // and the canonical target is specifically NOT the dead path
        expect(p).not.toContain('.claude/skills/aura')
      }
    })
  }
})

describe('the import-purity ratchet is wired into the gate (the wire is connected)', () => {
  it('package.json defines lint:imports and runs the convention/import gate', () => {
    const pkg = JSON.parse(read('package.json')) as { scripts: Record<string, string> }
    expect(pkg.scripts['lint:imports']).toBeTruthy()
    expect(pkg.scripts['lint:imports']).toMatch(/src\/convention\/import\/gate\.mjs/)
  })

  it('the `check` chain includes lint:imports (CI enforces the ratchet)', () => {
    const pkg = JSON.parse(read('package.json')) as { scripts: Record<string, string> }
    expect(pkg.scripts['check']).toMatch(/lint:imports/)
  })

  it('.husky/pre-push runs the import-purity gate', () => {
    expect(read('.husky/pre-push')).toMatch(/convention\/import\/gate\.mjs/)
  })
})

describe('confirm:full is a true SUPERSET of `pnpm run check` (no docs-only false-green)', () => {
  const confirmSrc = read('scripts/confirm.mjs')

  // The authoritative CI/pre-push gates that confirm:full must also run.
  for (const token of ['standards', 'lint:src', 'lint:imports', 'typecheck', 'test:int']) {
    it(`confirm.mjs --full references the build gate \`${token}\``, () => {
      expect(confirmSrc).toMatch(new RegExp(token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
    })
  }

  it('every `pnpm run <x>` command in the package.json `check` script also appears in confirm.mjs', () => {
    const pkg = JSON.parse(read('package.json')) as { scripts: Record<string, string> }
    const check = pkg.scripts['check'] ?? ''
    // pull each `pnpm run <name>` token out of the check chain
    const checkTokens = [...check.matchAll(/pnpm run ([\w:-]+)/g)].map((m) => m[1]!)
    expect(checkTokens.length, 'check must invoke pnpm run commands').toBeGreaterThan(0)
    for (const t of checkTokens) {
      // confirm:full must reference the SAME command (so confirm:full ⊇ check, fail-closed)
      expect(confirmSrc, `confirm:full is missing the \`${t}\` lane from the check chain`).toMatch(
        new RegExp(t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),
      )
    }
  })
})
