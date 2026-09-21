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
