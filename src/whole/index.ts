import { deriveFolderModel } from '@/readme/compute'
export const volume = 'whole' as const
export const atomPath = 'whole' as const
export function spreadOf(path: string = atomPath) {
  const m = deriveFolderModel(path)
  return { debit: m.statement.totalDebits, credit: m.statement.totalCredits }
}
