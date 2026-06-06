/**
 * trinity — the STRICT file-trinity gate. Tests the inconsistency: any src file
 * that is not a trinity file {index,test,index.test,seed} (and not framework-exempt)
 * fails this, listing the offenders. RED until the single-word migration drains the
 * tail in coordinated batches; the count is the ledger. @see ./index.ts
 */
import { describe, it, expect } from 'vitest'
import { readdirSync } from 'node:fs'
import { join, relative, sep } from 'node:path'
import { isViolation, findViolations, isMdStray, findMdStrays } from '@/trinity'

const ROOT = process.cwd()
const SRC = join(ROOT, 'src')

/** Generated/ephemeral output (never committed) — not corpus, not agent-written. */
const MD_SKIP_DIRS = new Set(['node_modules', 'dist', 'test-results', 'playwright-report', 'coverage', '_report'])
/** Walk the WHOLE repo for `.md` files (skip deps, build output, dotdirs, and the skills symlink). */
function walkMd(dir: string, acc: string[] = []): string[] {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isSymbolicLink()) continue
    const name = entry.name
    if (MD_SKIP_DIRS.has(name) || name.startsWith('.')) continue
    const p = join(dir, name)
    if (entry.isDirectory()) walkMd(p, acc)
    else if (name.endsWith('.md')) acc.push(relative(ROOT, p).split(sep).join('/'))
  }
  return acc
}

function walk(dir: string, acc: string[] = []): string[] {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules') walk(p, acc)
    } else {
      acc.push(relative(SRC, p).split(sep).join('/'))
    }
  }
  return acc
}

describe('trinity — every src file is a trinity file (strict)', () => {
  it('isViolation flags a bare/multi-word file, not the trinity set or the exempt set', () => {
    expect(isViolation('search/corpus.ts')).toBe(true) // bare word → corpus/index.ts
    expect(isViolation('proof/dry-proof.ts')).toBe(true) // multi-word → dry/proof/index.ts
    expect(isViolation('search/index.ts')).toBe(false)
    expect(isViolation('search/test.ts')).toBe(false)
    expect(isViolation('search/index.test.ts')).toBe(false)
    expect(isViolation('payload.config.ts')).toBe(false) // exempt (Payload entry)
    expect(isViolation('app/(frontend)/layout.tsx')).toBe(false) // exempt (Next router)
    expect(isViolation('payload-types.ts')).toBe(false) // exempt (generated)
  })

  // THE STRICT GATE — drained in coordinated batches; the offender list is the ledger.
  it('no non-trinity files remain in src', () => {
    const violations = findViolations(walk(SRC))
    if (violations.length > 0) {
      console.log(
        `\ntrinity-filename violations: ${violations.length}\n` +
          violations.slice(0, 40).join('\n') +
          (violations.length > 40 ? `\n… +${violations.length - 40} more` : ''),
      )
    }
    expect(violations).toEqual([])
  })
})

describe('trinity — writing is unavoidable IN atoms (md-purity)', () => {
  it('isMdStray flags any markdown that is not an atom SKILL.md (nor root infra)', () => {
    expect(isMdStray('docs/PLAN.md')).toBe(true)
    expect(isMdStray('src/iso/4217/README.md')).toBe(true)
    expect(isMdStray('src/foo/SKILL.md')).toBe(false) // an atom's form
    expect(isMdStray('README.md')).toBe(false) // root infra
    expect(isMdStray('index.md')).toBe(false) // VitePress home infra
    expect(isMdStray('src/bar/notes.txt')).toBe(false) // not markdown
  })

  // THE STRICT GATE — every word an agent writes must land IN an atom's SKILL.md.
  it('no stray markdown anywhere — every .md is a SKILL.md atom (+ root README/index)', () => {
    const strays = findMdStrays(walkMd(ROOT))
    if (strays.length > 0) {
      console.log(
        `\nmd strays: ${strays.length}\n` +
          strays.slice(0, 40).join('\n') +
          (strays.length > 40 ? `\n… +${strays.length - 40} more` : ''),
      )
    }
    expect(strays).toEqual([])
  })
})
