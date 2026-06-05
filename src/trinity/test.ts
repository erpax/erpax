/**
 * trinity — the STRICT file-trinity gate. Tests the inconsistency: any src file
 * that is not a trinity file {index,test,index.test,seed} (and not framework-exempt)
 * fails this, listing the offenders. RED until the single-word migration drains the
 * tail in coordinated batches; the count is the ledger. @see ./index.ts
 */
import { describe, it, expect } from 'vitest'
import { readdirSync } from 'node:fs'
import { join, relative, sep } from 'node:path'
import { isViolation, findViolations } from '@/trinity'

const SRC = join(process.cwd(), 'src')

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
