/**
 * Public surface of the IFRS 15 / ASC 606 standards module.
 *
 * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
 * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
 * @standard ISO-4217:2015 currency-codes
 * @see ./README.md
 */

export type {
  RecognitionTiming,
  OverTimeMeasurement,
  OutputMethodKind,
  InputMethodKind,
  VariableConsiderationMethod,
  Contract,
  PerformanceObligation,
  TransactionPrice,
  VariableConsideration,
  Allocation,
  RevenueRecognition,
  ContractAsset,
  ContractLiability,
  RefundLiability,
} from '@/ifrs/15/types'

export {
  isRecognitionTiming,
  isOverTimeMeasurement,
  isOutputMethodKind,
  isInputMethodKind,
  isVariableConsiderationMethod,
} from '@/ifrs/15/validate'
