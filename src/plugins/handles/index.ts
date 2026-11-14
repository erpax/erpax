/**
 * Handles — every document addressable by a handle, and one endpoint that resolves any handle.
 *
 * WHAT A HANDLE POINTS AT. The model is the one a copy-on-write filesystem uses (ZFS: a dataset
 * has a stable GUID, every snapshot has its own, the block tree is addressed by checksum, and an
 * incremental stream is "from this GUID to that one"). Here:
 *
 *   document   `id` — Payload's own uuid, stable for the document's life        (the dataset)
 *   head       `uuid` — the content address of what the document holds NOW       (the live tree)
 *   snapshot   a past `uuid`, kept as a Payload version                          (a snapshot)
 *
 * Every edit writes a new content uuid and leaves the old one behind as a version, so a content
 * handle is immutable: it resolves to exactly the content it was minted for, forever. A document
 * handle always resolves to the head. The pair (a snapshot's uuid → the head's uuid) is what an
 * incremental stream would carry; this plugin resolves, it does not stream.
 *
 * WHAT IS IN THE ADDRESS AND WHAT IS COMPUTED. The handle holds the uuid and a two-byte tail
 * naming its collection (src/utilities/uuid/handle). Everything else a URI usually spells out —
 * the tenant, the app, the locale, the REST path — is computed when the handle is resolved, from
 * the document and the request. A content uuid also carries its own sixteen program bits (slot,
 * capabilities, schema version: src/utilities/uuid/format); resolving reads them back.
 *
 * The plugin adds:
 *   - a virtual `handle` field on every collection (computed on read, stored nowhere)
 *   - `GET /api/h/:handle` — resolves under the caller's own access; `?collection=` names the
 *     collection for a handle with no tail, `?depth=` is passed to the read
 *   - `GET /api/h/:handle/send` — the stream that brings a document to that content; with
 *     `?from=<handle>` an incremental one from an earlier content of the same document
 *   - `POST /api/h/receive` — applies a stream, by the receive rule (src/utilities/uuid/stream)
 * Every one of them reads and writes through Payload with the caller's own access: what a role
 * may not read it cannot send, and what it may not update it cannot receive into.
 *
 * Put it last, so it sees every collection.
 *
 * @standard RFC-9562 uuid · RFC-4648 §5 base64url · RFC-9110 §15.5.5 404
 * @security ISO-27001 A.8.3 information-access-restriction — a handle is an address, not a key
 * @see src/utilities/uuid/handle/index.ts · src/utilities/uuid/index.ts (the content uuid)
 */
import type { CollectionConfig, Config, Endpoint, Field, Payload, PayloadRequest, Plugin } from 'payload'
import { decodeStructured } from '@/utilities/uuid/format'
import { candidates, handleOf, isUuid, parse } from '@/utilities/uuid/handle'
import { accepts, dataOf, isStream, send, type Stream } from '@/utilities/uuid/stream'

export type Kind = 'document' | 'head' | 'snapshot'

export interface Resolved {
  readonly handle: string
  readonly kind: Kind
  readonly collection: string
  /** The document. */
  readonly id: string
  /** The content this handle resolved to. */
  readonly uuid?: string
  /** The content the document holds now. Equal to `uuid` unless the handle named a snapshot. */
  readonly head?: string
  /** The handles of the document and of the resolved content. */
  readonly handles: { readonly document: string; readonly content?: string }
  /** What the address does not spell out, computed from the document and the request. */
  readonly context: { readonly tenant?: string; readonly app?: string; readonly locale?: string; readonly href: string }
  /** The program bits a content uuid carries. */
  readonly program?: { readonly slot: string; readonly capabilities: readonly string[]; readonly schemaVersion: number }
  readonly doc: Record<string, unknown>
}

/** Is this a content address — a version-8 uuid — rather than a document id? */
export const isContentUuid = (uuid: string): boolean => uuid[14] === '8'

const idOf = (value: unknown): string | undefined =>
  typeof value === 'string' || typeof value === 'number' ? String(value) : value !== null && typeof value === 'object' && 'id' in value ? String((value as { id: unknown }).id) : undefined

const programOf = (uuid: string): Resolved['program'] => {
  if (!isContentUuid(uuid)) return undefined
  try {
    const parts = decodeStructured(uuid)
    return { slot: parts.slotName, capabilities: [...parts.capabilityNames], schemaVersion: parts.schemaVersion }
  } catch {
    return undefined
  }
}

/** Put a resolved document into its answer — the pure half of resolving. */
export const present = (args: { handle: string; kind: Kind; collection: string; doc: Record<string, unknown>; uuid?: string; head?: string; app?: string; locale?: string }): Resolved => {
  const id = String(args.doc.id)
  const content = args.uuid ?? (isUuid(args.doc.uuid) ? args.doc.uuid : undefined)
  const head = args.head ?? content
  const tenant = idOf(args.doc.tenant)
  const program = content ? programOf(content) : undefined
  return {
    handle: args.handle,
    kind: args.kind,
    collection: args.collection,
    id,
    ...(content ? { uuid: content } : {}),
    ...(head ? { head } : {}),
    handles: { document: isUuid(id) ? handleOf(id, args.collection) : id, ...(content ? { content: handleOf(content, args.collection) } : {}) },
    context: { ...(tenant ? { tenant } : {}), ...(args.app ? { app: args.app } : {}), ...(args.locale ? { locale: args.locale } : {}), href: `/api/${args.collection}/${id}` },
    ...(program ? { program } : {}),
    doc: args.doc,
  }
}

export interface ResolveOptions {
  /** The collection, for a handle with no tail. */
  readonly collection?: string
  readonly depth?: number
  /** The request: the read runs under its user's access. Without one, access is not checked. */
  readonly req?: PayloadRequest
}

/** Resolve a handle to its document. `undefined` when nothing the caller may read matches. */
export const resolve = async (payload: Payload, handle: string, options: ResolveOptions = {}): Promise<Resolved | undefined> => {
  const parsed = parse(handle)
  if (!parsed) return undefined
  const slugs = payload.config.collections.map((collection) => collection.slug as string)
  const access = options.req ? { req: options.req, overrideAccess: false as const, user: options.req.user } : { overrideAccess: true as const }
  const depth = options.depth ?? 0
  const locale = typeof options.req?.locale === 'string' ? options.req.locale : undefined

  for (const slug of candidates(parsed, slugs, options.collection)) {
    const config = payload.collections[slug as keyof typeof payload.collections]?.config
    if (!config) continue
    const app = (config.custom as { app?: string } | undefined)?.app
    const collection = slug as never
    const answer = (kind: Kind, doc: Record<string, unknown>, extra: { uuid?: string; head?: string } = {}): Resolved => present({ handle, kind, collection: slug, doc, app, locale, ...extra })

    if (!isContentUuid(parsed.uuid)) {
      const found = await payload.find({ collection, where: { id: { equals: parsed.uuid } }, limit: 1, depth, pagination: false, ...access })
      if (found.docs[0]) return answer('document', found.docs[0] as unknown as Record<string, unknown>)
      continue
    }

    // a content address: the head of some document, or a snapshot kept as a version
    const live = await payload.find({ collection, where: { uuid: { equals: parsed.uuid } }, limit: 1, depth, pagination: false, ...access })
    if (live.docs[0]) return answer('head', live.docs[0] as unknown as Record<string, unknown>, { uuid: parsed.uuid, head: parsed.uuid })
    if (!config.versions) continue
    const past = await payload.findVersions({ collection, where: { 'version.uuid': { equals: parsed.uuid } }, limit: 1, depth, pagination: false, ...access })
    const version = past.docs[0] as unknown as { parent?: unknown; version?: Record<string, unknown> } | undefined
    const parent = idOf(version?.parent)
    if (!version?.version || !parent) continue
    const now = await payload.find({ collection, where: { id: { equals: parent } }, limit: 1, depth: 0, pagination: false, select: { uuid: true } as never, ...access })
    const head = (now.docs[0] as { uuid?: unknown } | undefined)?.uuid
    return answer('snapshot', { ...version.version, id: parent }, { uuid: parsed.uuid, ...(isUuid(head) ? { head } : {}) })
  }
  return undefined
}

/** The virtual `handle` field: the document's handle, computed on read. */
export const handleField = (collection: string): Field => ({
  name: 'handle',
  type: 'text',
  virtual: true,
  admin: { readOnly: true, hidden: true },
  hooks: {
    afterRead: [({ data, siblingData }) => {
      const id = (siblingData as { id?: unknown } | undefined)?.id ?? (data as { id?: unknown } | undefined)?.id
      return isUuid(id) ? handleOf(id, collection) : undefined
    }],
  },
})

/** `GET /api/h/:handle` */
export const resolveEndpoint: Endpoint = {
  path: '/h/:handle',
  method: 'get',
  handler: async (req) => {
    const handle = String(req.routeParams?.handle ?? '')
    if (!parse(handle)) return Response.json({ errors: [{ message: 'Not a handle.' }] }, { status: 400 })
    const depth = Number(req.query?.depth)
    const collection = typeof req.query?.collection === 'string' ? req.query.collection : undefined
    const resolved = await resolve(req.payload, handle, { req, collection, ...(Number.isInteger(depth) && depth >= 0 ? { depth } : {}) })
    // not found and not allowed answer the same: a handle does not say whether a document exists
    return resolved ? Response.json(resolved) : Response.json({ errors: [{ message: 'Nothing here.' }] }, { status: 404 })
  },
}

/** The fields Payload computes on read — never part of a stream. */
const virtualFields = (payload: Payload, collection: string): Set<string> => {
  const config = payload.collections[collection as keyof typeof payload.collections]?.config
  return new Set((config?.fields ?? []).flatMap((field) => ('name' in field && (('virtual' in field && field.virtual) || field.type === 'join') ? [field.name] : [])))
}

/** The stream that brings a document to the content `to` names — from `from`, when given. */
export const sendStream = async (payload: Payload, to: string, options: ResolveOptions & { from?: string } = {}): Promise<Stream | { error: 'not-found' | 'other-document' }> => {
  const target = await resolve(payload, to, { ...options, depth: 0 })
  if (!target) return { error: 'not-found' }
  const base = options.from === undefined ? undefined : await resolve(payload, options.from, { ...options, collection: target.collection, depth: 0 })
  if (options.from !== undefined && !base) return { error: 'not-found' }
  // an incremental stream is between two contents of ONE document
  if (base && (base.collection !== target.collection || base.id !== target.id)) return { error: 'other-document' }
  return send({ collection: target.collection, id: target.id, target: target.doc, ...(base ? { base: base.doc } : {}), virtual: virtualFields(payload, target.collection) })
}

export type Received =
  | { readonly applied: 'create' | 'update' | 'none'; readonly id: string; readonly uuid?: string; /** the destination now holds exactly the content the stream ends at */ readonly verified: boolean }
  | { readonly refused: 'exists' | 'missing' | 'diverged' | 'unknown-collection' }

/** Apply a stream by the receive rule, under the request's access. */
export const receiveStream = async (payload: Payload, stream: Stream, options: { req?: PayloadRequest } = {}): Promise<Received> => {
  if (!payload.collections[stream.collection as keyof typeof payload.collections]) return { refused: 'unknown-collection' }
  const access = options.req ? { req: options.req, overrideAccess: false as const, user: options.req.user } : { overrideAccess: true as const }
  const collection = stream.collection as never
  const found = await payload.find({ collection, where: { id: { equals: stream.id } }, limit: 1, depth: 0, pagination: false, ...access })
  const existing = found.docs[0] as unknown as { id: string; uuid?: string } | undefined
  const verdict = accepts(stream, existing ? existing.uuid ?? '' : undefined)
  if (!verdict.accept) return { refused: verdict.reason }
  if (verdict.action === 'none') return { applied: 'none', id: String(existing!.id), uuid: existing!.uuid, verified: true }
  const written = (verdict.action === 'create'
    ? await payload.create({ collection, data: dataOf(stream) as never, depth: 0, ...access })
    : await payload.update({ collection, id: existing!.id, data: dataOf(stream) as never, depth: 0, ...access })) as unknown as { id: string; uuid?: string }
  return { applied: verdict.action, id: String(written.id), uuid: written.uuid, verified: written.uuid === stream.to }
}

/** `GET /api/h/:handle/send` */
export const sendEndpoint: Endpoint = {
  path: '/h/:handle/send',
  method: 'get',
  handler: async (req) => {
    const handle = String(req.routeParams?.handle ?? '')
    const from = typeof req.query?.from === 'string' ? req.query.from : undefined
    if (!parse(handle) || (from !== undefined && !parse(from))) return Response.json({ errors: [{ message: 'Not a handle.' }] }, { status: 400 })
    const collection = typeof req.query?.collection === 'string' ? req.query.collection : undefined
    const stream = await sendStream(req.payload, handle, { req, collection, ...(from !== undefined ? { from } : {}) })
    if ('error' in stream) return Response.json({ errors: [{ message: stream.error === 'not-found' ? 'Nothing here.' : 'The two handles are not contents of one document.' }] }, { status: stream.error === 'not-found' ? 404 : 400 })
    return Response.json(stream)
  },
}

/** `POST /api/h/receive` */
export const receiveEndpoint: Endpoint = {
  path: '/h/receive',
  method: 'post',
  handler: async (req) => {
    let body: unknown
    try {
      body = typeof req.json === 'function' ? await req.json() : undefined
    } catch {
      body = undefined
    }
    if (!isStream(body)) return Response.json({ errors: [{ message: 'Not a stream.' }] }, { status: 400 })
    const result = await receiveStream(req.payload, body, { req })
    // 409: the destination is not where the stream starts from
    return Response.json(result, { status: 'refused' in result ? (result.refused === 'unknown-collection' ? 400 : 409) : 200 })
  },
}

const named = (field: Field, name: string): boolean => 'name' in field && field.name === name

export const handlesPlugin =
  (): Plugin =>
  (config: Config): Config => ({
    ...config,
    collections: (config.collections ?? []).map((collection): CollectionConfig => (collection.fields.some((field) => named(field, 'handle')) ? collection : { ...collection, fields: [...collection.fields, handleField(collection.slug)] })),
    // `receive` before `:handle`, so the fixed path is not read as a handle
    endpoints: [...(config.endpoints ?? []), receiveEndpoint, sendEndpoint, resolveEndpoint],
  })
