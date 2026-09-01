/** receipt/gate — the double-wire reciprocal of [[gate]]/receipt: from the receipt atom, the content-addressed gate is one hop. */
export {
  suiteClosureHash,
  sealSuiteReceipt,
  suiteReceiptFresh,
  planSuites,
  type SuitePlan,
} from '@/gate/receipt'
export const atomPath = 'receipt/gate' as const

/** @index-cross.foldback child=receipt/gate parent=receipt — this cross folds back into its parent. */
