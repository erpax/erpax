/**
 * Handle — a uuid as a short piece of a URI.
 *
 * A document has two uuids, and they mean different things:
 *   `id`    Payload's own id. It never changes: it is the DOCUMENT.
 *   `uuid`  the content address (src/utilities/uuid). It changes with every edit: it is one
 *           exact CONTENT of the document.
 * A handle is either of them written in 24 URL-safe characters instead of 36: the uuid's 16 bytes
 * followed by a 2-byte TAG of the collection it belongs to, in base64url. The tag is what lets a
 * handle be resolved with no index table: a uuid alone does not say which collection holds it, and
 * the tag narrows the 190 collections to (almost always) one. Nothing is stored — the handle is
 * computed from the uuid and the collection, and read back to the same two.
 *
 * A bare uuid, and a 22-character handle with no tag, are accepted too; resolving them needs the
 * collection from somewhere else (the route, the caller).
 *
 * Pure: no request, no database, no crypto API — it runs the same in Node and in a Worker.
 *
 * @standard RFC-9562 uuid · RFC-4648 §5 base64url
 * @see src/plugins/handles/index.ts (the virtual `handle` field and the resolver endpoint)
 */

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'

/** Is this text a uuid in its 36-character form? */
export const isUuid = (value: unknown): value is string => typeof value === 'string' && UUID.test(value)

const encode = (bytes: readonly number[]): string => {
  let out = ''
  for (let i = 0; i < bytes.length; i += 3) {
    const a = bytes[i]!
    const b = bytes[i + 1]
    const c = bytes[i + 2]
    out += ALPHABET[a >> 2]! + ALPHABET[((a & 3) << 4) | ((b ?? 0) >> 4)]!
    if (b !== undefined) out += ALPHABET[((b & 15) << 2) | ((c ?? 0) >> 6)]!
    if (c !== undefined) out += ALPHABET[c & 63]!
  }
  return out
}

const decode = (text: string): number[] | undefined => {
  const bytes: number[] = []
  let buffer = 0
  let bits = 0
  for (const char of text) {
    const value = ALPHABET.indexOf(char)
    if (value < 0) return undefined
    buffer = (buffer << 6) | value
    bits += 6
    if (bits >= 8) {
      bits -= 8
      bytes.push((buffer >> bits) & 255)
    }
  }
  // leftover bits must be zero padding, or two texts would read as the same bytes
  return (buffer & ((1 << bits) - 1)) === 0 ? bytes : undefined
}

const bytesOf = (uuid: string): number[] => {
  const hex = uuid.replace(/-/g, '').toLowerCase()
  return Array.from({ length: 16 }, (_, i) => parseInt(hex.slice(i * 2, i * 2 + 2), 16))
}

const uuidFrom = (bytes: readonly number[]): string => {
  const hex = bytes.map((byte) => byte.toString(16).padStart(2, '0')).join('')
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
}

/** A collection's 16-bit tag: FNV-1a over its slug, folded. Stable for as long as the slug is. */
export const tagOf = (collection: string): number => {
  let hash = 0x811c9dc5
  for (let i = 0; i < collection.length; i++) {
    hash ^= collection.charCodeAt(i)
    hash = Math.imul(hash, 0x01000193) >>> 0
  }
  return ((hash >>> 16) ^ (hash & 0xffff)) & 0xffff
}

/** The handle of a uuid: 24 characters with its collection's tag, 22 without. */
export const handleOf = (uuid: string, collection?: string): string => {
  if (!isUuid(uuid)) throw new Error(`not a uuid: ${String(uuid)}`)
  const bytes = bytesOf(uuid)
  if (collection !== undefined) {
    const tag = tagOf(collection)
    bytes.push(tag >> 8, tag & 255)
  }
  return encode(bytes)
}

export interface Parsed {
  /** The uuid, lower-case, in its 36-character form. */
  readonly uuid: string
  /** The collection tag, when the handle carried one. */
  readonly tag?: number
}

/** Read a handle (24 or 22 characters) or a bare uuid. `undefined` when it is neither. */
export const parse = (value: string): Parsed | undefined => {
  if (UUID.test(value)) return { uuid: value.toLowerCase() }
  if (value.length !== 22 && value.length !== 24) return undefined
  const bytes = decode(value)
  if (!bytes || (bytes.length !== 16 && bytes.length !== 18)) return undefined
  const uuid = uuidFrom(bytes.slice(0, 16))
  return bytes.length === 18 ? { uuid, tag: (bytes[16]! << 8) | bytes[17]! } : { uuid }
}

/**
 * The collections a parsed handle can belong to: those whose tag matches; or, with no tag, the
 * one the caller names. Empty when nothing says where to look — a resolver never scans them all.
 */
export const candidates = (parsed: Parsed, collections: readonly string[], named?: string): string[] => {
  if (parsed.tag !== undefined) return collections.filter((slug) => tagOf(slug) === parsed.tag && (named === undefined || slug === named))
  return named !== undefined && collections.includes(named) ? [named] : []
}
