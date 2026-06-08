/** Gate axis keys aligned with rulesOf / assertRulesHold. */
export type RatchetAxis =
  | 'folder-name'
  | 'folder-trinity'
  | 'alphanumeric-name'
  | 'stray-ts'
  | 'multi-segment-file'
  | 'accounting-structure'
  | 'forbidden-intermediate'
  | 'diamond-membership'
  | 'import-purity'
  | 'logic-concentration'
  | 'word-matter'
  | 'word-without-code'
  | 'word-without-logic'
  | 'word-incomplete-diamond'
  | 'matrix-crack'

/** Legacy ALCAP export name → ratchet axis (for seal-debt audit). */
export const BASELINE_CONST_TO_AXIS: Readonly<Record<string, RatchetAxis>> = {
  NAME_BASELINE: 'folder-name',
  TRINITY_BASELINE: 'folder-trinity',
  FOLDER_LAW_BASELINE: 'folder-trinity',
  ALPHANUMERIC_NAME_BASELINE: 'alphanumeric-name',
  STRAY_TS_BASELINE: 'stray-ts',
  MULTI_SEGMENT_BASELINE: 'multi-segment-file',
  DIAMOND_FILES_BASELINE: 'diamond-membership',
  IMPORT_PURITY_BASELINE: 'import-purity',
  CONCENTRATION_BASELINE: 'logic-concentration',
  WORD_MATTER_BASELINE: 'word-matter',
  WORD_WITHOUT_CODE_BASELINE: 'word-without-code',
  WORD_WITHOUT_LOGIC_BASELINE: 'word-without-logic',
  WORD_INCOMPLETE_DIAMOND_BASELINE: 'word-incomplete-diamond',
}

export interface RatchetSnapshot {
  readonly contentUuid: string
  readonly sealedAt: string
  readonly axes: Readonly<Partial<Record<RatchetAxis, number>>>
}
