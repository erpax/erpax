/**
 * word — a lexical [[diamond]] (one prose token).
 *
 * At the typography layer, prose decomposes into [[word]] tokens and [[digit]]
 * numeric tokens ([[text]]). Each word is content-addressed:
 * `uuid(jcs({ kind: 'word', value }))` — the same math as [[quantum/boundary]].
 * Saved in the computed token index ([[text]]/saveTextDiamonds), never one folder
 * per English word.
 *
 *   tsx src/word/index.ts
 *
 * @standard RFC 8785 JCS + RFC 9562 §5.8 content-uuid
 * @see ../text -- ../digit -- ../typography -- ../diamond -- ./SKILL.md
 */
import { uuid } from '@/integrity'

export type WordTokenKind = 'word'

/** Content-address of one lexical token — uuid(jcs({ kind: 'word', value })). */
export const wordTokenUuid = (value: string): string => uuid({ kind: 'word' as const, value })

/** One vocabulary diamond — kind, surface form, and its content-uuid. */
export const wordDiamond = (value: string) =>
  ({ kind: 'word' as const, value, tokenUuid: wordTokenUuid(value) }) as const

if (import.meta.url === 'file://' + process.argv[1]) {
  const d = wordDiamond('hello')
  console.log('word — lexical token diamond:')
  console.log(`  value="${d.value}" uuid=${d.tokenUuid.slice(0, 18)}…`)
}
