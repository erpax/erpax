/**
 * accounting/corpus — wire readme corpus entropy → path-keyed journal-entry documents.
 *
 * When erpax accounts ITSELF (the content-addressed corpus, not commercial Stripe/Cloudflare
 * books in [[self/accounting]]), the functional currency is the **entropy-bit (eb)** — tamper-cost
 * log₂ mass at the horo imperial-ratio floor ([[readme/entropy]] · [[tamper]]/[[cost]]).
 *
 * **Path is the account code** ([[path]] · [[accounting/coa]]): every posting hits
 * `accountCode = accountCodeOf(atomPath)`; gap debits Dr the folder path / Cr `entropy`;
 * seal credits Dr `seal` / Cr the folder path — homonyms use full path, never leaf alone.
 *
 * Pure: builds `journal-entries`-shaped documents; caller posts through Payload.
 *
 * @see ../coa — ../../readme/entropy — ../../entry — ../SKILL.md
 */
import { DebitCreditLogic, type ValidatedEntry } from '../debit'
import {
  accountCodeOf,
  accountCoordinateOf,
  entropyLinesToPathEntry,
} from '../coa'
import { COMPARABLE_UNIT } from '@/readme/entropy-unit'
import type { CorpusEntropyRollup, FolderEntropyAccounting } from '@/readme/entropy'
import type { FolderReadmeModel } from '@/readme'

/** Functional currency — derived from readme entropy comparable unit. */
export const ENTROPY_CURRENCY = COMPARABLE_UNIT
export const ENTROPY_CURRENCY_NAME = 'entropy-bit' as const
export const ENTROPY_CURRENCY_SYMBOL = COMPARABLE_UNIT
export type PathPostingUnit = typeof ENTROPY_CURRENCY | 'count'

/** Integer scale for eb on journal lines — milli-eb (3 decimal places). */
const EB_DECIMALS = 3
export const MILLI_EB_SCALE = 10 ** EB_DECIMALS
export const ebToMilliEb = (eb: number): number => Math.round(eb * MILLI_EB_SCALE)
export const milliEbToEb = (milli: number): number => milli / MILLI_EB_SCALE

export {
  accountCodeOf,
  accountCoordinateOf,
  postEntry,
  postGapOnPath,
  postSealOnPath,
  entropyLinesToPathEntry,
  balanceByPath,
  ENTROPY_CONTRA_PATH,
  SEAL_CONTRA_PATH,
  BALANCE_CONTRA_PATH,
} from '../coa'

/** Payload `journal-entries` collection (OECD SAF-T §3 journal-entries). */
export const CORPUS_JOURNAL_COLLECTION = 'journal-entries' as const
export const CORPUS_ENTROPY_SOURCE_TYPE = 'period_end_adjustment' as const
export const CORPUS_ENTROPY_SOURCE_EVENT_PREFIX = 'corpus-entropy' as const

/** One line on a corpus entropy journal entry — mirrors `journal-entries.lines[]`. */
export interface CorpusJournalLine {
  readonly lineNumber: number
  readonly accountCode: string
  readonly accountType: 'asset' | 'liability' | 'equity' | 'expense'
  readonly description: string
  readonly debit: number
  readonly credit: number
  readonly currency: typeof ENTROPY_CURRENCY
  readonly coordinate: string
}

/** Journal-entry document shape for corpus self-accounting — ready for `journal-entries` create. */
export interface CorpusJournalEntryDocument {
  readonly entryNumber: string
  readonly entryDate: string
  readonly description: string
  readonly status: 'draft' | 'posted'
  readonly accountCode: string
  readonly coordinate: string
  readonly lines: readonly CorpusJournalLine[]
  readonly debitTotal: number
  readonly creditTotal: number
  readonly isBalanced: boolean
  readonly sourceType: typeof CORPUS_ENTROPY_SOURCE_TYPE
  readonly sourceEvent: string
  readonly sourceId: string
  readonly currency: typeof ENTROPY_CURRENCY
  readonly netEntropyEb: number
}

/** Build balanced ValidatedEntry from folder entropy — path-keyed gap/seal pairs. */
export function entropyToValidatedEntry(
  accounting: FolderEntropyAccounting,
  atomPath: string,
): ValidatedEntry {
  return entropyLinesToPathEntry(atomPath, accounting.gaps, accounting.seals)
}

/** Map validated journal lines → Payload `journal-entries.lines[]` with path + coordinate. */
export function validatedToCorpusJournalLines(
  entry: ValidatedEntry,
  atomPath: string,
): CorpusJournalLine[] {
  const code = accountCodeOf(atomPath)
  return entry.lines.map((l, i) => ({
    lineNumber: i + 1,
    accountCode: l.accountCode,
    accountType: l.accountType,
    description: l.description ?? '',
    debit: l.debit,
    credit: l.credit,
    currency: ENTROPY_CURRENCY,
    coordinate: accountCoordinateOf(l.accountCode),
  }))
}

export interface ErpaxSelfAccountOptions {
  readonly entryDate?: string
  readonly entryNumber?: string
  readonly status?: 'draft' | 'posted'
}

/**
 * Account one folder diamond — README model → balanced `journal-entries` document in **eb**.
 * Every line's `accountCode` is a corpus path; header `accountCode` is the folder path.
 */
export function erpaxSelfAccount(
  model: Pick<FolderReadmeModel, 'atomPath' | 'entropy'>,
  options: ErpaxSelfAccountOptions = {},
): CorpusJournalEntryDocument {
  return folderEntropyJournalEntry(model.atomPath, model.entropy, options)
}

/** Account folder entropy accounting → journal-entry shaped document. */
export function folderEntropyJournalEntry(
  atomPath: string,
  accounting: FolderEntropyAccounting,
  options: ErpaxSelfAccountOptions = {},
): CorpusJournalEntryDocument {
  const code = accountCodeOf(atomPath)
  const validated = entropyToValidatedEntry(accounting, atomPath)
  const entryDate = options.entryDate ?? new Date().toISOString().slice(0, 10)
  const entryNumber = options.entryNumber ?? `CE-${code.replace(/\//g, '-')}-${entryDate}`
  return {
    entryNumber,
    entryDate,
    description: `Corpus entropy — ${code} (gap ${accounting.totalGapEb} eb · seal ${accounting.totalSealEb} eb)`,
    status: options.status ?? 'draft',
    accountCode: code,
    coordinate: accountCoordinateOf(code),
    lines: validatedToCorpusJournalLines(validated, atomPath),
    debitTotal: validated.totalDebits,
    creditTotal: validated.totalCredits,
    isBalanced: validated.balanced,
    sourceType: CORPUS_ENTROPY_SOURCE_TYPE,
    sourceEvent: `${CORPUS_ENTROPY_SOURCE_EVENT_PREFIX}:folder`,
    sourceId: code,
    currency: ENTROPY_CURRENCY,
    netEntropyEb: accounting.netEntropyEb,
  }
}

/** Account corpus-wide entropy rollup → one consolidated journal entry on `readme`. */
export function accountCorpusEntropy(
  rollup: CorpusEntropyRollup,
  options: ErpaxSelfAccountOptions = {},
): CorpusJournalEntryDocument {
  const synthetic: FolderEntropyAccounting = {
    unit: rollup.unit,
    gaps: [
      {
        side: 'gap',
        account: '[[gap]]/[[corpus]]/rollup',
        category: 'corpus',
        amount: 1,
        comparable: rollup.totalGapEb,
        source: 'aggregateCorpusEntropy',
      },
    ],
    seals: [
      {
        side: 'seal',
        account: '[[seal]]/[[corpus]]/rollup',
        category: 'corpus',
        amount: 1,
        comparable: rollup.totalSealEb,
        source: 'aggregateCorpusEntropy',
      },
    ],
    totalGapEb: rollup.totalGapEb,
    totalSealEb: rollup.totalSealEb,
    netEntropyEb: rollup.netEntropyEb,
    sealGapRatio: rollup.sealGapRatio,
  }
  const entry = folderEntropyJournalEntry('readme', synthetic, {
    ...options,
    entryNumber: options.entryNumber ?? `CE-corpus-${options.entryDate ?? new Date().toISOString().slice(0, 10)}`,
  })
  return {
    ...entry,
    sourceEvent: `${CORPUS_ENTROPY_SOURCE_EVENT_PREFIX}:corpus`,
    sourceId: 'readme',
    description: `Corpus entropy rollup — ${rollup.sealedMass} sealed · ${rollup.unsealedMass} unsealed (gap ${rollup.totalGapEb} eb · seal ${rollup.totalSealEb} eb)`,
  }
}

/** Bond README debit/credit statement + entropy sheet into one balanced path-keyed entry. */
export function bondStatementToJournalEntry(
  model: Pick<FolderReadmeModel, 'atomPath' | 'statement' | 'entropy'>,
  options: ErpaxSelfAccountOptions = {},
): CorpusJournalEntryDocument {
  return erpaxSelfAccount(model, options)
}
