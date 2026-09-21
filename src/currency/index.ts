import ts from 'typescript'
import { ISO_4217_NUMERIC } from '@/config/iso/4217/numeric'
import { SUPPORTED_CURRENCIES } from '@/config/regional/defaults'
import { astOf, corpusFiles, textOf } from '@/syntax/cache'
import { deriveFolderModel } from '@/readme/compute'
export const volume = 'currency' as const
export const atomPath = 'currency' as const
export function spreadOf(path: string = atomPath) {
  const m = deriveFolderModel(path)
  return { debit: m.statement.totalDebits, credit: m.statement.totalCredits }
}

export * from './rates'

/**
 * Euro legal tender in MINOR UNITS — seven notes and eight coins, exactly what the ECB issues.
 *
 * It lives HERE because it is a fact about the euro, not about whoever is counting it. It was
 * written out twice — once in [[teller]] and once in [[treasury]] — which is [[rules]]/copy's
 * defect exactly: one truth at two addresses, where one of them is unmaintained and nobody knows
 * which. Both now read this list.
 */
export const EURO_TENDER = [50000, 20000, 10000, 5000, 2000, 1000, 500, 200, 100, 50, 20, 10, 5, 2, 1] as const

/**
 * Every currency code the corpus writes is a REGISTERED ISO 4217 alpha-3.
 *
 * Read from the corpus's own register (`ISO_4217_NUMERIC`), never from a list typed here: the
 * register is the authority, and a second copy of it would be the defect EURO_TENDER above was
 * minted to fix. See SKILL.md.
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

/**
 * A `currency:` or `currencyCode:` property whose value is a string literal — PARSED, never matched.
 *
 * A regex for "three capitals" finds every acronym in the corpus and buries the signal, which is
 * the noise floor three instruments here have died on. Only a property assignment naming a currency
 * is a currency claim, and only a literal one is decidable at all.
 */
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
 * Fail closed on a code no register knows. Zero is a THEOREM here, not a ratchet. See SKILL.md.
 *
 * @standard ISO 4217 §5 — the code list is maintained by the registration authority
 */
export function assertCurrencyCodesRegistered(cwd: string = process.cwd()): void {
  const bad = unregisteredCurrencyCodes(cwd)
  if (bad.length === 0) return
  throw new Error(
    `✖ ISO 4217: ${bad.length} currency code(s) no register knows — ${bad.join(', ')}. ` +
      'A code outside the register names no currency, and every downstream conversion is arithmetic on a symbol.',
  )
}
