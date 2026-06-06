/**
 * realtime/translator — translate the live tail as events arrive. Each message in the [[realtime]]
 * tail is reduced to its language-independent meaning ([[translator]]'s interlingua uuid), so a
 * subscriber in any of the EU languages reads the same meaning zero-shot. Two tails carry the same
 * meaning when their interlingua sequences match. Composes [[realtime]] · [[translator]] · [[eu]] · [[language]].
 *
 *   tsx src/realtime/translator/index.ts
 *
 * @standard interlingua (language-independent meaning) over the realtime tail
 * @see ../../realtime -- ../../translator -- ./SKILL.md
 */
import { since } from '@/realtime'
import { interlingua } from '@/translator'

/** The interlingua (meaning-uuid) of each message in the live tail. */
export const interlinguaTail = (log: readonly string[], cursor: number): string[] => since(log, cursor).map(interlingua)

/** Do two live tails carry the same sequence of meanings (translations of each other)? */
export const sameMeaningTail = (a: readonly string[], b: readonly string[], cursor = 0): boolean => {
  const ia = interlinguaTail(a, cursor)
  const ib = interlinguaTail(b, cursor)
  return ia.length === ib.length && ia.every((u, i) => u === ib[i])
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const en = ['hello', 'world']
  console.log('realtime/translator — interlingua tail of ' + JSON.stringify(en) + ' = ' + interlinguaTail(en, 0).length + ' meaning-uuids')
}
