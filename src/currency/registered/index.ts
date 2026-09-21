/**
 * currency/registered — a code outside the register names no currency. See SKILL.md.
 *
 * Its own atom because it SCANS: it reads `node:fs` through [[syntax]]/cache, and a gate living in
 * `@/currency` dragged that into the client bundle — `UnhandledSchemeError: Reading from "node:fs"`,
 * a red production build. A corpus-scanning gate never sits in a barrel the app imports.
 *
 * @standard ISO 4217 — currency codes: the alphabetic code identifies the currency
 */
import ts from 'typescript'
import { ISO_4217_NUMERIC } from '@/config/iso/4217/numeric'
import { SUPPORTED_CURRENCIES } from '@/config/regional/defaults'
import { astOf, corpusFiles, textOf } from '@/syntax/cache'

export const atomPath = 'currency/registered' as const

/**
 * Every currency code the corpus writes is a REGISTERED alpha-3, read from the corpus's own
 * register — never a second copy of it. See SKILL.md.
 *
 * @standard ISO 4217 — currency codes: the alphabetic code identifies the currency
 */
export function unregisteredCurrencyCodes(cwd: string = process.cwd()): readonly string[] {
  const bad = new Set<string>()
  for (const code of SUPPORTED_CURRENCIES) if (ISO_4217_NUMERIC[code] === undefined) bad.add(code)
  for (const file of corpusFiles(cwd, 'source')) {
    for (const code of currencyLiteralsIn(file)) if (ISO_4217_NUMERIC[code] === undefined) bad.add(code)
  }
  return [...bad].sort()
}

/** A `currency:` property with a literal value — PARSED: three capitals is every acronym. */
export function currencyLiteralsIn(file: string, text: string = textOf(file)): readonly string[] {
  const out: string[] = []
  const sf = astOf(file, text)
  const visit = (node: ts.Node): void => {
    if (
      ts.isPropertyAssignment(node) &&
      ts.isIdentifier(node.name) &&
      (node.name.text === 'currency' || node.name.text === 'currencyCode') &&
      ts.isStringLiteral(node.initializer) &&
      /^[A-Z]{3}$/.test(node.initializer.text)
    ) {
      out.push(node.initializer.text)
    }
    ts.forEachChild(node, visit)
  }
  visit(sf)
  return out
}

/**
 * Fail closed on a code no register knows. Zero is a THEOREM, not a ratchet. See SKILL.md.
 *
 * @standard ISO 4217 §5 — the code list is maintained by the registration authority
 */
export function assertCurrencyRegistered(cwd: string = process.cwd()): void {
  const bad = unregisteredCurrencyCodes(cwd)
  if (bad.length === 0) return
  throw new Error(
    `✖ ISO 4217: ${bad.length} currency code(s) no register knows — ${bad.join(', ')}. ` +
      'A code outside the register names no currency, and every downstream conversion is arithmetic on a symbol.',
  )
}
