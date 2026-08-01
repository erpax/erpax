import { describe, expect, it, vi } from 'vitest'

import type { Config } from 'payload'

import type { TrelloCard, TrelloClient } from '../index'

import {
  cardIdField,
  DEFAULT_CARD_FIELD,
  storedCardId,
  SYNC_CONTEXT_KEY,
  trelloAfterChange,
  trelloAfterDelete,
  trelloPlugin,
  upsertCard,
  type CardMapping,
} from './index'

const mapping: CardMapping = {
  slug: 'tasks',
  idList: 'L1',
  name: (doc) => String(doc.title),
  desc: (doc) => String(doc.body ?? ''),
}

/** A client that counts what it minted — the whole idempotency proof, no network. */
const countingClient = (): { client: TrelloClient; created: string[]; updated: string[]; comments: string[] } => {
  const created: string[] = []
  const updated: string[] = []
  const comments: string[] = []
  let n = 0
  const client: TrelloClient = {
    getBoards: async () => [],
    getLists: async () => [],
    createCard: async (input) => {
      const card: TrelloCard = { id: `C${++n}`, name: input.name, idList: input.idList, desc: input.desc }
      created.push(card.id)
      return card
    },
    updateCard: async (cardId, patch) => {
      updated.push(cardId)
      return { id: cardId, name: String(patch.name ?? ''), idList: String(patch.idList ?? 'L1') }
    },
    moveCard: async (cardId, idList) => ({ id: cardId, name: '', idList }),
    addComment: async (cardId, text) => {
      comments.push(`${cardId}: ${text}`)
      return { id: 'A1' }
    },
  }
  return { client, created, updated, comments }
}

describe('trello/plugin — the same record twice yields ONE card', () => {
  it('the first sync creates; a doc carrying the card id updates that card', async () => {
    const { client, created, updated } = countingClient()
    const doc: Record<string, unknown> = { id: 'r1', title: 'a task' }

    const first = await upsertCard(client, mapping, doc)
    expect(first).toEqual({ cardId: 'C1', created: true })

    // the id is written back onto the record — that write-back IS the idempotency key
    const synced = { ...doc, [DEFAULT_CARD_FIELD]: first.cardId }
    const second = await upsertCard(client, mapping, synced)
    expect(second).toEqual({ cardId: 'C1', created: false })

    expect(created).toEqual(['C1']) // one card, from two syncs
    expect(updated).toEqual(['C1'])
  })

  it('an empty or missing card id is NOT a card id — it must not read as synced', () => {
    expect(storedCardId(mapping, { id: 'r1' })).toBeUndefined()
    expect(storedCardId(mapping, { [DEFAULT_CARD_FIELD]: '' })).toBeUndefined()
    expect(storedCardId(mapping, { [DEFAULT_CARD_FIELD]: 'C9' })).toBe('C9')
  })

  it('the afterChange hook stores the id back once, then stops re-entering', async () => {
    const { client, created } = countingClient()
    const update = vi.fn(async (_args: Record<string, unknown>) => ({}))
    const req = { payload: { update } } as never
    const hook = trelloAfterChange(mapping, client)

    const doc = { id: 'r1', title: 'a task' }
    await hook({ doc, req, context: {} } as never)
    expect(created).toEqual(['C1'])
    expect(update).toHaveBeenCalledTimes(1)
    expect(update.mock.calls[0][0]).toMatchObject({
      collection: 'tasks',
      id: 'r1',
      data: { [DEFAULT_CARD_FIELD]: 'C1' },
      context: { [SYNC_CONTEXT_KEY]: true },
    })

    // the write-back re-enters the hook — and returns immediately, or this is an unbounded loop
    await hook({ doc, req, context: { [SYNC_CONTEXT_KEY]: true } } as never)
    expect(created).toEqual(['C1'])
    expect(update).toHaveBeenCalledTimes(1)

    // a later save of the SYNCED doc updates the same card and stores nothing back
    await hook({ doc: { ...doc, [DEFAULT_CARD_FIELD]: 'C1' }, req, context: {} } as never)
    expect(created).toEqual(['C1'])
    expect(update).toHaveBeenCalledTimes(1)
  })

  it('a Trello failure inside the hook PROPAGATES — the save is not silently half-synced', async () => {
    const { client } = countingClient()
    const failing: TrelloClient = {
      ...client,
      createCard: async () => {
        throw new Error('HTTP 401: invalid token')
      },
    }
    const hook = trelloAfterChange(mapping, failing)
    await expect(
      hook({ doc: { id: 'r1', title: 't' }, req: { payload: { update: vi.fn() } }, context: {} } as never),
    ).rejects.toThrow(/401/)
  })

  it('a delete comments on the card rather than destroying data erpax does not own', async () => {
    const { client, comments } = countingClient()
    const hook = trelloAfterDelete(mapping, client)
    await hook({ doc: { id: 'r1', [DEFAULT_CARD_FIELD]: 'C7' } } as never)
    expect(comments).toEqual(['C7: erpax: the tasks record behind this card was deleted.'])
    // a never-synced record has no card to comment on — and no call is made
    await hook({ doc: { id: 'r2' } } as never)
    expect(comments).toHaveLength(1)
  })
})

describe('trello/plugin — the wiring', () => {
  const baseConfig = (): Config =>
    ({
      collections: [
        { slug: 'tasks', fields: [{ name: 'title', type: 'text' }] },
        { slug: 'other', fields: [] },
      ],
    }) as unknown as Config

  it('injects the card-id field whether or not the plugin is enabled — schema does not drift on an env var', () => {
    const off = trelloPlugin({ collections: [mapping] })(baseConfig())
    const tasks = off.collections!.find((c) => c.slug === 'tasks')!
    expect(tasks.fields.map((f) => (f as { name?: string }).name)).toContain(DEFAULT_CARD_FIELD)
    expect(cardIdField(mapping)).toMatchObject({ name: DEFAULT_CARD_FIELD, type: 'text', index: true })
    // and it is inert: no hooks without an explicit opt-in
    expect(tasks.hooks?.afterChange ?? []).toHaveLength(0)
    expect(tasks.hooks?.afterDelete ?? []).toHaveLength(0)
  })

  it('wires the hooks only when enabled AND holding a client', () => {
    const { client } = countingClient()
    const noClient = trelloPlugin({ collections: [mapping], enabled: true })(baseConfig())
    expect(noClient.collections!.find((c) => c.slug === 'tasks')!.hooks?.afterChange ?? []).toHaveLength(0)

    const on = trelloPlugin({ collections: [mapping], enabled: true, client })(baseConfig())
    const tasks = on.collections!.find((c) => c.slug === 'tasks')!
    expect(tasks.hooks?.afterChange).toHaveLength(1)
    expect(tasks.hooks?.afterDelete).toHaveLength(1)
    // an unmapped collection is untouched — no field, no hook
    const other = on.collections!.find((c) => c.slug === 'other')!
    expect(other.fields).toHaveLength(0)
  })

  it('refuses a mapping that matches no collection — a silent no-op forever is the worse failure', () => {
    expect(() => trelloPlugin({ collections: [{ ...mapping, slug: 'ghost' }] })(baseConfig())).toThrow(
      /no collection 'ghost'/,
    )
  })
})
