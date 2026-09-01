import { deriveFolderModel } from '@/readme/compute'
export const volume = 'gate' as const
export const atomPath = 'gate' as const
export function spreadOf(path: string = atomPath) {
  const m = deriveFolderModel(path)
  return { debit: m.statement.totalDebits, credit: m.statement.totalCredits }
}

export * from './receipt'
