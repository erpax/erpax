import type { CollectionAfterReadHook } from 'payload'
import { User } from 'src/payload-types'

/**
 * AfterRead hook — populate `populatedAuthors` (a sanitized author projection)
 * without leaking the full `users` row to public read access.
 *
 * GraphQL will not return mutated user data that differs from the underlying
 * schema, so we use an alternative `populatedAuthors` field hidden from the
 * admin UI to deliver only the fields a public consumer should see.
 *
 * @standard schema.org Person author
 * @standard schema.org Article author
 * @compliance GDPR Art.5(1)(c) data-minimization
 * @compliance GDPR Art.32 security-of-processing
 * @security ISO-27002 §8.11 data-masking
 * @see docs/STANDARDS.md §3
 */
export const populateAuthors: CollectionAfterReadHook = async ({ doc, req: { payload } }) => {
  if (doc?.authors && doc?.authors?.length > 0) {
    const authorDocs: User[] = []

    for (const author of doc.authors) {
      try {
        const authorDoc = await payload.findByID({
          id: typeof author === 'object' ? author?.id : author,
          collection: 'users',
          depth: 0,
        })

        if (authorDoc) {
          authorDocs.push(authorDoc)
        }

        if (authorDocs.length > 0) {
          doc.populatedAuthors = authorDocs.map((authorDoc) => ({
            id: authorDoc.id,
            name: authorDoc.name,
          }))
        }
      } catch {
        // swallow error
      }
    }
  }

  return doc
}
