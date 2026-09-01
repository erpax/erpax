import { deriveFolderModel } from '@/readme/compute'
export const volume = 'transaction' as const
export const atomPath = 'transaction' as const
export function spreadOf(path: string = atomPath) {
  const m = deriveFolderModel(path)
  return { debit: m.statement.totalDebits, credit: m.statement.totalCredits }
}

export * from './failures'
