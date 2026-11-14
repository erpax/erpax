import { describe, it, expect } from 'vitest'
import type { Config, Payload } from 'payload'
import { handleField, handlesPlugin, isContentUuid, present, receiveEndpoint, receiveStream, resolve, resolveEndpoint, sendEndpoint, sendStream } from '@/plugins/handles'
import type { Stream } from '@/utilities/uuid/stream'
import { encodeStructured, SLOT_TAGS, CAPABILITIES } from '@/utilities/uuid/format'
import { handleOf } from '@/utilities/uuid/handle'

const id = '0190a5b2-7c3d-4e41-9f20-3b5c6d7e8f90'
const content = (text: string): string => encodeStructured({ slotTag: SLOT_TAGS.collectionRow, capabilities: CAPABILITIES.TAMPER_PROOF, schemaVersion: 1, content: { text }, tenantId: 't1' })
const now = content('now')
const before = content('before')

/** A Payload with one collection of one document and one past version. */
const fake = (opts: { versions?: boolean; visible?: boolean } = {}) => {
  const calls: string[] = []
  const doc = { id, uuid: now, title: 'Now', tenant: 't1' }
  const match = (where: Record<string, { equals: string }>, row: Record<string, unknown>) => Object.entries(where).every(([key, clause]) => row[key] === clause.equals)
  const payload = {
    config: { collections: [{ slug: 'invoices' }, { slug: 'orders' }] },
    collections: { invoices: { config: { custom: { app: 'sales' }, versions: opts.versions === false ? false : {} } }, orders: { config: {} } },
    find: async (args: { collection: string; where: Record<string, { equals: string }> }) => {
      calls.push(`find ${args.collection} ${Object.keys(args.where).join()}`)
      return { docs: args.collection === 'invoices' && opts.visible !== false && match(args.where, doc) ? [doc] : [] }
    },
    findVersions: async (args: { collection: string; where: Record<string, { equals: string }> }) => {
      calls.push(`versions ${args.collection}`)
      return { docs: args.collection === 'invoices' && args.where['version.uuid']!.equals === before ? [{ parent: id, version: { uuid: before, title: 'Before', tenant: 't1' } }] : [] }
    },
  } as unknown as Payload
  return { payload, calls }
}

describe('handles — what a handle points at', () => {
  it('a content address is a version-8 uuid; a document id is not', () => {
    expect(isContentUuid(now)).toBe(true)
    expect(isContentUuid(id)).toBe(false)
  })
  it('a document handle resolves to the document and its head', async () => {
    const { payload, calls } = fake()
    const out = await resolve(payload, handleOf(id, 'invoices'))
    expect(out).toMatchObject({ kind: 'document', collection: 'invoices', id, uuid: now, head: now })
    expect(out!.context).toEqual({ tenant: 't1', app: 'sales', href: `/api/invoices/${id}` })
    expect(out!.handles).toEqual({ document: handleOf(id, 'invoices'), content: handleOf(now, 'invoices') })
    expect(calls).toEqual(['find invoices id']) // the tail names the collection: one read
  })
  it('the current content address resolves to the head', async () => {
    const { payload } = fake()
    expect(await resolve(payload, handleOf(now, 'invoices'))).toMatchObject({ kind: 'head', id, uuid: now, head: now })
  })
  it('a past content address resolves to the snapshot it was minted for, and says what the head is now', async () => {
    const { payload } = fake()
    const out = await resolve(payload, handleOf(before, 'invoices'))
    expect(out).toMatchObject({ kind: 'snapshot', id, uuid: before, head: now })
    expect(out!.doc).toMatchObject({ id, title: 'Before' })
  })
  it('reads back the program bits a content uuid carries', async () => {
    const { payload } = fake()
    const out = await resolve(payload, handleOf(now, 'invoices'))
    expect(out!.program).toMatchObject({ slot: 'collectionRow', schemaVersion: 1 })
    expect(out!.program!.capabilities).toContain('TAMPER_PROOF')
  })
  it('a handle with no tail needs the collection named, and is never looked for everywhere', async () => {
    const { payload, calls } = fake()
    expect(await resolve(payload, handleOf(id))).toBe(undefined)
    expect(await resolve(payload, id)).toBe(undefined)
    expect(calls).toEqual([])
    expect(await resolve(payload, id, { collection: 'invoices' })).toMatchObject({ kind: 'document', id })
  })
  it('answers nothing for what is not a handle, is in another collection, or the caller may not read', async () => {
    expect(await resolve(fake().payload, 'nonsense')).toBe(undefined)
    expect(await resolve(fake().payload, handleOf(id, 'orders'))).toBe(undefined)
    expect(await resolve(fake({ visible: false }).payload, handleOf(id, 'invoices'))).toBe(undefined)
  })
  it('a collection without versions has no snapshots to find', async () => {
    const { payload, calls } = fake({ versions: false })
    expect(await resolve(payload, handleOf(before, 'invoices'))).toBe(undefined)
    expect(calls).toEqual(['find invoices uuid'])
  })
  it('the answer computes what the address does not spell out', () => {
    const out = present({ handle: 'h', kind: 'document', collection: 'pages', doc: { id, uuid: now, tenant: { id: 't9' } }, app: 'sites', locale: 'bg' })
    expect(out.context).toEqual({ tenant: 't9', app: 'sites', locale: 'bg', href: `/api/pages/${id}` })
  })
})

describe('handles — the plugin', () => {
  it('adds a virtual handle field to every collection and one endpoint, and leaves a collection that has its own', () => {
    const own = { name: 'handle', type: 'text' as const }
    const config = handlesPlugin()({ collections: [{ slug: 'a', fields: [] }, { slug: 'b', fields: [own] }], endpoints: [] } as unknown as Config) as Config
    expect(config.collections![0]!.fields[0]).toMatchObject({ name: 'handle', virtual: true })
    expect(config.collections![1]!.fields).toEqual([own])
    expect(config.endpoints).toEqual([receiveEndpoint, sendEndpoint, resolveEndpoint])
  })
  it('the field computes the handle from the id on read', () => {
    const hook = (handleField('invoices') as unknown as { hooks: { afterRead: Array<(args: unknown) => unknown> } }).hooks.afterRead[0]!
    expect(hook({ siblingData: { id } })).toBe(handleOf(id, 'invoices'))
    expect(hook({ siblingData: {}, data: { id } })).toBe(handleOf(id, 'invoices'))
    expect(hook({ siblingData: { id: 42 } })).toBe(undefined)
  })
  it('the endpoint answers 400 for what is not a handle and 404 for nothing found', async () => {
    const handler = resolveEndpoint.handler as unknown as (req: unknown) => Promise<Response>
    expect((await handler({ routeParams: { handle: 'nope' }, query: {}, payload: fake().payload })).status).toBe(400)
    expect((await handler({ routeParams: { handle: handleOf(id, 'orders') }, query: {}, payload: fake().payload })).status).toBe(404)
    const ok = await handler({ routeParams: { handle: handleOf(id, 'invoices') }, query: { depth: '1' }, payload: fake().payload, user: null })
    expect(ok.status).toBe(200)
    expect(await ok.json()).toMatchObject({ kind: 'document', id })
  })
})

describe('handles — send and receive, through Payload', () => {
  it('sends a full stream for a document, and an incremental one from an earlier content', async () => {
    const full = (await sendStream(fake().payload, handleOf(id, 'invoices'))) as Stream
    expect(full).toMatchObject({ collection: 'invoices', id, to: now, set: { title: 'Now', tenant: 't1' } })
    expect(full.from).toBe(undefined)
    const step = (await sendStream(fake().payload, handleOf(id, 'invoices'), { from: handleOf(before, 'invoices') })) as Stream
    expect(step).toEqual({ collection: 'invoices', id, from: before, to: now, set: { title: 'Now' }, unset: [] })
  })
  it('sends nothing the caller cannot read, and refuses two handles of different documents', async () => {
    expect(await sendStream(fake({ visible: false }).payload, handleOf(id, 'invoices'))).toEqual({ error: 'not-found' })
    expect(await sendStream(fake().payload, handleOf(id, 'invoices'), { from: handleOf(content('elsewhere'), 'invoices') })).toEqual({ error: 'not-found' })
  })
  const destination = (head?: string) => {
    const writes: string[] = []
    const payload = {
      collections: { invoices: { config: { fields: [] } } },
      find: async () => ({ docs: head === undefined ? [] : [{ id, uuid: head }] }),
      create: async (args: { data: unknown }) => (writes.push('create ' + JSON.stringify(args.data)), { id: 'new', uuid: now }),
      update: async (args: { data: unknown }) => (writes.push('update ' + JSON.stringify(args.data)), { id, uuid: now }),
    } as unknown as Payload
    return { payload, writes }
  }
  const step: Stream = { collection: 'invoices', id, from: before, to: now, set: { title: 'Now' }, unset: ['note'] }
  it('receives an incremental stream onto the content it starts from, and verifies the result', async () => {
    const { payload, writes } = destination(before)
    expect(await receiveStream(payload, step)).toEqual({ applied: 'update', id, uuid: now, verified: true })
    expect(writes).toEqual(['update {"title":"Now","note":null}'])
  })
  it('refuses a stream onto a destination that has moved on, and writes nothing', async () => {
    const { payload, writes } = destination(content('diverged'))
    expect(await receiveStream(payload, step)).toEqual({ refused: 'diverged' })
    expect(writes).toEqual([])
  })
  it('receiving the same stream again is a no-op', async () => {
    const { payload, writes } = destination(now)
    expect(await receiveStream(payload, step)).toEqual({ applied: 'none', id, uuid: now, verified: true })
    expect(writes).toEqual([])
  })
  it('a full stream creates where nothing exists and is refused where something does', async () => {
    const full: Stream = { collection: 'invoices', id, to: now, set: { title: 'Now' }, unset: [] }
    expect(await receiveStream(destination().payload, full)).toEqual({ applied: 'create', id: 'new', uuid: now, verified: true })
    expect(await receiveStream(destination(before).payload, full)).toEqual({ refused: 'exists' })
    expect(await receiveStream(destination().payload, { ...full, collection: 'nowhere' })).toEqual({ refused: 'unknown-collection' })
  })
  it('the endpoints answer 400 for a malformed request and 409 for a diverged destination', async () => {
    const post = receiveEndpoint.handler as unknown as (req: unknown) => Promise<Response>
    expect((await post({ json: async () => ({ nope: true }), payload: destination(before).payload })).status).toBe(400)
    expect((await post({ json: async () => step, payload: destination(content('diverged')).payload })).status).toBe(409)
    expect((await post({ json: async () => step, payload: destination(before).payload })).status).toBe(200)
    const get = sendEndpoint.handler as unknown as (req: unknown) => Promise<Response>
    expect((await get({ routeParams: { handle: 'nope' }, query: {}, payload: fake().payload })).status).toBe(400)
    expect((await get({ routeParams: { handle: handleOf(id, 'invoices') }, query: {}, payload: fake().payload })).status).toBe(200)
  })
})
