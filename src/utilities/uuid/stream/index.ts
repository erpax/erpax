/**
 * Stream — a document's change from one content address to another, as something to send.
 *
 * This is the send / receive half of the copy-on-write model, ported from ZFS and nothing more
 * than that half:
 *
 *   zfs send pool/fs@b            a FULL stream: everything in snapshot b
 *   zfs send -i @a pool/fs@b      an INCREMENTAL stream: what changed from a to b
 *   zfs receive                   applies an incremental stream only if the destination's latest
 *                                 snapshot IS a; otherwise it refuses — the destination diverged
 *
 * Here a snapshot is a content uuid (`uuid`, src/utilities/uuid) and a dataset is a document. A
 * stream names the document, the content it starts from (`from`, absent for a full stream), the
 * content it ends at (`to`), and the fields to set and to clear. `accepts` is the receive rule:
 * a full stream needs a destination that does not exist yet; an incremental one needs a
 * destination whose head is exactly `from`. A stream whose `to` the destination already holds is
 * a no-op, so sending twice is safe.
 *
 * What is NOT ported: pools, vdevs, block-level checksums and the dedup table, clones, and
 * resumable or compressed streams. Fields are compared whole — a changed array is sent whole.
 *
 * Pure: documents in, a stream or a decision out.
 *
 * @standard RFC-8785 JSON canonicalization (the comparison is order-independent)
 * @see https://openzfs.github.io/openzfs-docs/man/master/8/zfs-send.8.html
 * @see src/plugins/handles/index.ts (the endpoints, under Payload's access control)
 */
import { NON_CONTENT_FIELDS } from '@/utilities/integrity/content'

export interface Stream {
  readonly collection: string
  /** The document at the sender. */
  readonly id: string
  /** The content the stream starts from; absent for a full stream. */
  readonly from?: string
  /** The content the stream ends at. */
  readonly to: string
  /** Fields to set, by name. */
  readonly set: Readonly<Record<string, unknown>>
  /** Fields to clear. */
  readonly unset: readonly string[]
}

type Doc = Readonly<Record<string, unknown>>

/** Fields that are not content, plus the ones Payload computes on read. */
const skip = (field: string, virtual: ReadonlySet<string>): boolean => NON_CONTENT_FIELDS.has(field) || virtual.has(field)

/** Order-independent text of a value, for comparing two values. */
export const canonical = (value: unknown): string => {
  if (value === null || value === undefined) return 'null'
  if (Array.isArray(value)) return `[${value.map(canonical).join(',')}]`
  if (typeof value === 'object') {
    const object = value as Record<string, unknown>
    return `{${Object.keys(object).filter((key) => object[key] !== undefined).sort().map((key) => `${JSON.stringify(key)}:${canonical(object[key])}`).join(',')}}`
  }
  return JSON.stringify(value)
}

/** What changed from `base` to `target`: the fields to set and the ones to clear. */
export const diff = (base: Doc | undefined, target: Doc, virtual: ReadonlySet<string> = new Set()): { set: Record<string, unknown>; unset: string[] } => {
  const set: Record<string, unknown> = {}
  const unset: string[] = []
  for (const [field, value] of Object.entries(target)) {
    if (skip(field, virtual) || value === undefined || value === null) continue // a cleared field is handled below
    if (base === undefined || canonical(base[field]) !== canonical(value)) set[field] = value
  }
  for (const field of Object.keys(base ?? {})) {
    if (skip(field, virtual)) continue
    const gone = target[field] === undefined || target[field] === null
    if (gone && base![field] !== undefined && base![field] !== null) {
      unset.push(field)
      delete set[field]
    }
  }
  return { set, unset: unset.sort() }
}

const contentOf = (doc: Doc, what: string): string => {
  if (typeof doc.uuid !== 'string') throw new Error(`${what} has no content uuid`)
  return doc.uuid
}

/** The stream that takes a document from `base` (omit for a full stream) to `target`. */
export const send = (args: { collection: string; id: string; target: Doc; base?: Doc; virtual?: ReadonlySet<string> }): Stream => {
  const { set, unset } = diff(args.base, args.target, args.virtual)
  return { collection: args.collection, id: args.id, ...(args.base ? { from: contentOf(args.base, 'the base') } : {}), to: contentOf(args.target, 'the target'), set, unset }
}

export type Verdict =
  | { readonly accept: true; readonly action: 'create' | 'update' | 'none' }
  | { readonly accept: false; readonly reason: 'exists' | 'missing' | 'diverged' }

/**
 * The receive rule. `head` is the destination's current content uuid, or `undefined` when the
 * destination document does not exist.
 */
export const accepts = (stream: Stream, head: string | undefined): Verdict => {
  if (head !== undefined && head === stream.to) return { accept: true, action: 'none' }
  if (stream.from === undefined) return head === undefined ? { accept: true, action: 'create' } : { accept: false, reason: 'exists' }
  if (head === undefined) return { accept: false, reason: 'missing' }
  return head === stream.from ? { accept: true, action: 'update' } : { accept: false, reason: 'diverged' }
}

/** The data to write for an accepted stream: the set fields, and `null` for the cleared ones. */
export const dataOf = (stream: Stream): Record<string, unknown> => ({ ...stream.set, ...Object.fromEntries(stream.unset.map((field) => [field, null])) })

/** Is this a well-formed stream? */
export const isStream = (value: unknown): value is Stream => {
  if (value === null || typeof value !== 'object') return false
  const s = value as Record<string, unknown>
  return typeof s.collection === 'string' && typeof s.id === 'string' && typeof s.to === 'string' && (s.from === undefined || typeof s.from === 'string') &&
    s.set !== null && typeof s.set === 'object' && !Array.isArray(s.set) && Array.isArray(s.unset) && s.unset.every((field) => typeof field === 'string')
}
