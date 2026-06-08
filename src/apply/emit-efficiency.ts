/**
 * emit-efficiency — write efficiency.generated.json from store (emit-only, not gate input).
 *
 *   pnpm apply:efficiency-emit
 *   tsx src/apply/emit-efficiency.ts
 *
 * @see ./efficiency — coordinate b2f75a6f (bypass-math)
 */
import { existsSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import type { EfficiencyStore } from './efficiency'

const _OUT = join(process.cwd(), 'src', 'apply', 'efficiency.generated.json')
const HAND = join(process.cwd(), 'src', 'apply', 'efficiency.json')

const STORE_LAW =
  'efficiency UP only — each pass must improve vs prior snapshot; regressions require documented exceptions'

function bootstrapStore(_cwd: string): EfficiencyStore {
  if (existsSync(HAND)) {
    const parsed = JSON.parse(readFileSync(HAND, 'utf8')) as EfficiencyStore
    return {
      _law: parsed._law ?? STORE_LAW,
      contentUuid: parsed.contentUuid,
      sealedAt: parsed.sealedAt ?? new Date().toISOString().slice(0, 10),
      latest: parsed.latest ?? null,
      passes: parsed.passes ?? [],
    }
  }
  return {
    _law: STORE_LAW,
    contentUuid: 'a18ebd36-efficiency-ratchet-baseline',
    sealedAt: new Date().toISOString().slice(0, 10),
    latest: null,
    passes: [],
  }
}

export function emitEfficiency(cwd: string = process.cwd()): void {
  const store = bootstrapStore(cwd)
  const out = join(cwd, 'src', 'apply', 'efficiency.generated.json')
  const hand = join(cwd, 'src', 'apply', 'efficiency.json')
  const dir = dirname(out)
  if (!existsSync(dir)) {
    throw new Error(`emit-efficiency: missing directory ${dir}`)
  }
  writeFileSync(out, `${JSON.stringify(store, null, 2)}\n`, 'utf8')
  if (existsSync(hand)) {
    unlinkSync(hand)
    console.log(`removed hand ${relative(cwd, hand)}`)
  }
  console.log(`apply:efficiency-emit — emitted ${relative(cwd, out)} · passes ${store.passes.length}`)
}

if (import.meta.url === `file://${process.argv[1]}`) {
  emitEfficiency()
}
