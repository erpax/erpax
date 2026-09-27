import { describe, it, expect } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { unitRederivations, assertUnitsSealed } from './index'

const tree = (files: Record<string, string>): string => {
  const root = mkdtempSync(join(tmpdir(), 'erpax-unit-'))
  for (const [rel, body] of Object.entries(files)) {
    const full = join(root, 'src', rel)
    mkdirSync(join(full, '..'), { recursive: true })
    writeFileSync(full, body)
  }
  return root
}
const run = <T>(files: Record<string, string>, f: (root: string) => T): T => {
  const root = tree(files)
  try {
    return f(root)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
}

/**
 * A gate never seen to fire is a claim, not a gate — so every shape is PLANTED.
 */
describe('rules/unit — the planted re-derivations it must catch', () => {
  it('catches the literal product, which is how all 22 live sites were written', () => {
    const v = run({ 'a/index.ts': 'export const d = (ms: number) => ms / (1000 * 60 * 60 * 24)\n' }, unitRederivations)
    expect(v).toHaveLength(1)
    expect(v[0]!.unit).toBe('day')
    expect(v[0]!.value).toBe(86_400_000)
    expect(v[0]!.line).toBe(1)
  })

  it('catches the SECOND notation, which the first cannot even be grepped alongside', () => {
    // `lease/service` held a local `MS_PER_DAY = 86_400_000` — the eleventh address of one constant.
    const v = run({ 'a/index.ts': 'export const d = (ms: number) => ms / 86_400_000\n' }, unitRederivations)
    expect(v).toHaveLength(1)
    expect(v[0]!.unit).toBe('day')
  })

  it('catches a multiplication as readily as a division — an offset re-derives it too', () => {
    const v = run({ 'a/index.ts': 'export const t = (n: number) => n * 86_400_000\n' }, unitRederivations)
    expect(v).toHaveLength(1)
  })

  it('names the other declared units', () => {
    const v = run({ 'a/index.ts': 'export const h = (ms: number) => ms / (1000 * 60 * 60)\n' }, unitRederivations)
    expect(v[0]!.unit).toBe('hour')
  })

  it('fails closed, and the message points at the helpers rather than the divisor', () => {
    const root = tree({ 'a/index.ts': 'export const d = (ms: number) => ms / 86_400_000\n' })
    try {
      expect(() => assertUnitsSealed(root)).toThrow(/daysBetween/)
      expect(() => assertUnitsSealed(root, 1)).not.toThrow()
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })
})

/**
 * Each refusal is a real shape in this corpus that a text scan would have reported.
 */
describe('rules/unit — what it must NOT flag', () => {
  it('a literal inside a TEMPLATE is data — spec/generator EMITS this into generated code', () => {
    const v = run(
      {
        'a/index.ts':
          'export const emit = (days: number) => `new Date(Date.now() + ${days} * 86_400_000)`\n',
      },
      unitRederivations,
    )
    expect(v).toEqual([])
  })

  it('a literal inside a plain string is data too', () => {
    const v = run({ 'a/index.ts': "export const s = 'divide by 1000 * 60 * 60 * 24'\n" }, unitRederivations)
    expect(v).toEqual([])
  })

  it('a bare literal outside arithmetic is not a conversion — a timeout is not a unit', () => {
    const v = run({ 'a/index.ts': 'export const TIMEOUT = 60_000\n' }, unitRederivations)
    expect(v).toEqual([])
  })

  it('a test fixture computing tomorrow is exempt', () => {
    const v = run({ 'a/test.ts': 'const future = new Date(Date.now() + 86_400_000)\n' }, unitRederivations)
    expect(v).toEqual([])
  })

  it('a product that is not a declared unit is not a finding', () => {
    const v = run({ 'a/index.ts': 'export const x = (n: number) => n / (7 * 13)\n' }, unitRederivations)
    expect(v).toEqual([])
  })
})

describe('rules/unit — the live corpus', () => {
  it('the DAY divisor has exactly one address — zero is a theorem, not a ratchet', () => {
    // 24 addresses in four notations folded onto the day-shaped helpers in @/utility.
    expect(unitRederivations().filter((v) => v.unit === 'day')).toEqual([])
  }, 300_000)

  it('hour and minute are the named residue, and the ratchet holds them', () => {
    // These are duration FORMATTERS and timeouts, not differences — they need an hour/minute
    // primitive of their own, which is work this atom names rather than claims to have done.
    const live = unitRederivations()
    expect(new Set(live.map((v) => v.unit))).toEqual(new Set(['hour', 'minute']))
    expect(() => assertUnitsSealed(process.cwd(), live.length)).not.toThrow()
    expect(() => assertUnitsSealed(process.cwd(), live.length - 1)).toThrow(/rules\/unit/)
  }, 300_000)
})
