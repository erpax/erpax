/**
 * quantum/schema — a SCHEMA as a content-uuid: a schema (schema.org type, a collection shape) is
 * identified by the content-uuid of its canonical form, so two schemas with the same shape MERGE
 * (one uuid), and ANY schema change yields a new uuid — versioning + re-verification BY ARCHITECTURE
 * (the same law as [[verification]] / domain/verification). Where [[schema]] is the vocabulary, this
 * facet makes schema identity + drift computable on the [[matrix]] substrate. Merges into [[schema]].
 *
 * HONEST: content-addressing of a canonical schema string; the "quantum" is the uuid substrate ([[quantum]]).
 *
 *   tsx src/quantum/schema/index.ts
 *
 * @standard RFC 9562 §5.8 content-uuid; schema.org
 * @see ../../schema -- ../../uuid -- ../../verification -- ./SKILL.md
 */
import { toUuid } from '@/uuid/matrix'

/** The content-uuid of a schema's canonical form — its version-identity. */
export const schemaUuid = (canonical: string): string => toUuid(Buffer.from('schema:' + canonical, 'utf8'))

/** Same shape ⇒ same schema (they merge). */
export const sameSchema = (a: string, b: string): boolean => schemaUuid(a) === schemaUuid(b)

/** Has the schema drifted from a published version? — its uuid no longer matches (re-verify by architecture). */
export const drifted = (publishedUuid: string, canonical: string): boolean => publishedUuid !== schemaUuid(canonical)

if (import.meta.url === 'file://' + process.argv[1]) {
  const v1 = schemaUuid('{name,price}')
  console.log('quantum/schema — schema identity = content-uuid:')
  console.log('  v1=' + v1.slice(0, 8) + '… · sameSchema(same)=' + sameSchema('{name,price}', '{name,price}') + ' · drifted after add field=' + drifted(v1, '{name,price,tax}'))
}
