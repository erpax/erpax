/**
 * The ISO field kit holds: no collection declares a currency or a country as free text.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-3166-1:2020 country-codes alpha-2
 */
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

const SRC = join(import.meta.dirname, '..', '..')
const sources = (dir: string): string[] =>
  readdirSync(join(SRC, dir), { recursive: true })
    .map(String)
    .filter((f) => f.endsWith('.ts') && !/test\.ts$/.test(f))
    .map((f) => join(dir, f))

// A field named for a currency or a country, declared as text: what the selects replaced.
const TEXT_CODE_FIELD = /name:\s*'(\w*(?:[Cc]urrency|[Cc]ountry)\w*)',\s*type:\s*'text'/g
const NOT_A_CODE = /name|rate|amount|pair/i

describe('fields/select — the ISO field kit', () => {
  it('leaves no currency or country field as free text in a collection', () => {
    const found = [...sources('collections'), ...sources('components/ecommerce')].flatMap((f) =>
      [...readFileSync(join(SRC, f), 'utf8').matchAll(TEXT_CODE_FIELD)].map((m) => m[1] as string).filter((n) => !NOT_A_CODE.test(n)).map((n) => `${f}: ${n}`),
    )
    expect(found).toEqual([])
  })

  it('would see one: the scan is not vacuous', () => {
    expect([..."{ name: 'baseCurrency', type: 'text' }".matchAll(TEXT_CODE_FIELD)]).toHaveLength(1)
  })
})
