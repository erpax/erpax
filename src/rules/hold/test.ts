import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

import { assertHoldConsulted, unheldVerdicts } from './index'

// The pair is PRIVATE to the gate (an exported data literal is seal-debt), so the fixtures name it
// the way a real consumer does — and the last test fails if the gate is ever pointed elsewhere.
const VERDICT = 'reportOwed'
const OBLIGATION = 'holdBeforeExecuting'

const tree = (files: Record<string, string>): string => {
  const root = mkdtempSync(join(tmpdir(), 'erpax-hold-'))
  for (const [rel, body] of Object.entries(files)) {
    mkdirSync(join(root, 'src', rel, '..'), { recursive: true })
    writeFileSync(join(root, 'src', rel), body)
  }
  return root
}

describe('rules/hold — a suspicion verdict travels with its obligation', () => {
  it('the live corpus holds every verdict it reads — zero is a theorem', () => {
    expect(unheldVerdicts(process.cwd())).toEqual([])
    expect(() => assertHoldConsulted(process.cwd())).not.toThrow()
  })

  it('FIRES on a planted consumer that reads the verdict and ignores the hold', () => {
    const root = tree({
      'teller/index.ts': `import { ${VERDICT} } from '@/aml'\nexport const go = () => ${VERDICT}({} as never)\n`,
    })
    const v = unheldVerdicts(root)
    expect(v.map((x) => x.file)).toEqual(['teller/index.ts'])
    expect(() => assertHoldConsulted(root)).toThrow(/Art. 33\(1\)/)
    rmSync(root, { recursive: true, force: true })
  })

  it('a consumer that consults the hold passes', () => {
    const root = tree({
      'teller/index.ts': `import { ${VERDICT}, ${OBLIGATION} } from '@/aml'\nexport const go = () => ${OBLIGATION}(${VERDICT}({} as never))\n`,
    })
    expect(unheldVerdicts(root)).toEqual([])
    rmSync(root, { recursive: true, force: true })
  })

  it('the atom that DEFINES the pair is not a consumer of it', () => {
    const root = tree({ 'aml/index.ts': `export const ${VERDICT} = () => 'none'\n` })
    expect(unheldVerdicts(root)).toEqual([])
    rmSync(root, { recursive: true, force: true })
  })

  it('a mention in a COMMENT is not a use — the names are parsed, never matched', () => {
    const root = tree({
      'note/index.ts': `// ${VERDICT} is computed in @/aml and must be held\nexport const n = 1\n`,
    })
    expect(unheldVerdicts(root)).toEqual([])
    rmSync(root, { recursive: true, force: true })
  })

  it('watches the pair the AML atom actually exports', async () => {
    const { readFileSync } = await import('node:fs')
    const src = readFileSync(join(process.cwd(), 'src/aml/index.ts'), 'utf8')
    expect(src).toMatch(new RegExp(`export function ${VERDICT}\\b`))
    expect(src).toMatch(new RegExp(`export function ${OBLIGATION}\\b`))
  })
})
