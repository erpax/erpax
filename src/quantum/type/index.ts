/**
 * quantum/type — a TYPE as a content-uuid: a type is identified by the content-uuid of its
 * structural shape, so type-EQUALITY is uuid-equality (structural typing by content-addressing)
 * and the merge law dedups identical types. Where [[type]] is the data-type vocabulary, this facet
 * makes type-identity computable + tamper-evident on the [[matrix]] substrate. Merges into [[type]].
 *
 * HONEST: this is content-addressing of a canonical shape string — structural identity, not a
 * type-theory proof; the "quantum" is the uuid substrate ([[quantum]]).
 *
 *   tsx src/quantum/type/index.ts
 *
 * @standard RFC 9562 §5.8 content-uuid
 * @see ../../type -- ../../uuid -- ./SKILL.md
 */
import { toUuid } from '@/uuid/matrix'

/** The content-uuid of a type's structural shape (a canonical string) — its identity. */
export const typeUuid = (shape: string): string => toUuid(Buffer.from('type:' + shape, 'utf8'))

/** Structural type-equality = content-uuid equality (same shape ⇒ same type). */
export const sameType = (a: string, b: string): boolean => typeUuid(a) === typeUuid(b)

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('quantum/type — type identity = shape content-uuid:')
  console.log('  sameType("{x:number}","{x:number}")=' + sameType('{x:number}', '{x:number}') + '  vs "{x:string}"=' + sameType('{x:number}', '{x:string}'))
}
