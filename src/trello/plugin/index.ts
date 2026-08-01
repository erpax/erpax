/**
 * trello/plugin — an opted-in collection's records become Trello cards, idempotently.
 *
 * The entanglement, not the integration. A record and its card are ONE thing observed twice, so the
 * plugin must never be able to mint a second card for a record it already synced: the Trello card id
 * is written back onto the doc, and the presence of that id is what decides create-vs-update. That
 * is the whole idempotency argument, and `upsertCard` is where it is decidable without a network.
 *
 * Three things the wiring has to get right, each of which is a way this class of plugin usually
 * breaks:
 *
 *   - **The write-back must not re-trigger the hook.** Storing the card id is itself an update, so
 *     it re-enters `afterChange`. The Payload `context` flag is the seam: a sync-originated update
 *     carries `trelloSync`, and the hook returns immediately on it. Without that, one save is an
 *     unbounded loop of Trello writes.
 *   - **The field must exist whether or not the plugin is enabled.** The card-id field is injected
 *     ALWAYS; only the hooks are conditional. A field that appears and disappears with an env var is
 *     schema drift, and the migration is the thing that breaks, not the feature.
 *   - **An opted-in collection that is not in the config is a silent no-op.** `trelloPlugin` throws
 *     on a mapping whose slug is not in the incoming config, rather than syncing nothing forever.
 *
 * Deletion is deliberately NOT a remote delete. The client ships no delete method, so a removed
 * record leaves a COMMENT on its card: erpax does not destroy data in a system it does not own, and
 * a silently vanished card is unauditable from either side. The stale card is the honest residue —
 * named here so it is a decision, not an omission.
 *
 * @standard ISO/IEC 25010:2023 §5.3 co-existence (erpax shares Trello's namespace without detriment)
 * @invariant upsertCard creates iff the doc carries no card id; otherwise it updates that card.
 * @see ./SKILL.md -- ../index.ts -- ../../constitution
 */
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  CollectionSlug,
  Config,
  Field,
} from 'payload'

import type { TrelloClient } from '../index'

/** The doc field that holds the Trello card id — the whole idempotency key. */
export const DEFAULT_CARD_FIELD = 'trelloCardId'

/** The `context` flag marking an update the plugin itself caused, so the hook does not re-enter. */
export const SYNC_CONTEXT_KEY = 'trelloSync'

/** How one collection's records become cards on one Trello list. */
export interface CardMapping {
  /** the collection slug to sync */
  readonly slug: string
  /** the Trello list its records become cards in (a board is a list's parent — see getLists) */
  readonly idList: string
  /** doc → card title */
  readonly name: (doc: Record<string, unknown>) => string
  /** doc → card description */
  readonly desc?: (doc: Record<string, unknown>) => string
  /** the doc field holding the card id; defaults to `trelloCardId` */
  readonly cardField?: string
}

export interface TrelloPluginConfig {
  readonly collections: readonly CardMapping[]
  /** the client to sync through; when absent the plugin is inert (field-only) */
  readonly client?: TrelloClient
  /** off by default — an integration that turns itself on is not opted in */
  readonly enabled?: boolean
}

export interface UpsertResult {
  readonly cardId: string
  /** true when a card was minted; false when an existing card was updated */
  readonly created: boolean
}

/**
 * The collections synced to Trello — DECLARED here, empty by default. Adding a mapping injects the
 * card-id field into that collection, which is a schema change: it needs a migration in the same
 * diff. Empty means the plugin touches nothing at all, which is the right default for an
 * integration nobody has opted into.
 */
export const TRELLO_SYNC: readonly CardMapping[] = []

const cardFieldOf = (mapping: CardMapping): string => mapping.cardField ?? DEFAULT_CARD_FIELD

/** The card id already stored on this doc, or undefined when it has never been synced. */
export function storedCardId(mapping: CardMapping, doc: Record<string, unknown>): string | undefined {
  const value = doc[cardFieldOf(mapping)]
  return typeof value === 'string' && value.length > 0 ? value : undefined
}

/**
 * Create-or-update, decided by the stored card id. Called twice with the same synced doc it updates
 * the same card twice and mints nothing — which is the idempotency the suite asserts.
 */
export async function upsertCard(
  client: TrelloClient,
  mapping: CardMapping,
  doc: Record<string, unknown>,
): Promise<UpsertResult> {
  const existing = storedCardId(mapping, doc)
  const fields = { idList: mapping.idList, name: mapping.name(doc), desc: mapping.desc?.(doc) }
  if (existing) {
    await client.updateCard(existing, fields)
    return { cardId: existing, created: false }
  }
  const card = await client.createCard(fields)
  return { cardId: card.id, created: true }
}

/** The read-only field carrying the card id — injected whether or not the plugin is enabled. */
export function cardIdField(mapping: CardMapping): Field {
  return {
    name: cardFieldOf(mapping),
    type: 'text',
    index: true,
    admin: { readOnly: true, description: 'Trello card id — written by trelloPlugin; the sync key.' },
  }
}

/**
 * The afterChange hook: upsert the card, and on a CREATE write the id back so the next save updates
 * rather than duplicating. The write-back carries the sync context so this hook returns on re-entry.
 */
export function trelloAfterChange(mapping: CardMapping, client: TrelloClient): CollectionAfterChangeHook {
  return async ({ doc, req, context }) => {
    if (context?.[SYNC_CONTEXT_KEY]) return doc
    const record = doc as Record<string, unknown>
    const { cardId, created } = await upsertCard(client, mapping, record)
    if (created) {
      await req.payload.update({
        // the slug is config data, not a literal union member — the mapping is validated against
        // the live config at wiring time, which is the check this cast stands on
        collection: mapping.slug as CollectionSlug,
        id: record.id as string,
        data: { [cardFieldOf(mapping)]: cardId },
        context: { [SYNC_CONTEXT_KEY]: true },
        req,
      })
    }
    return doc
  }
}

/**
 * The afterDelete hook: comment on the card rather than destroying it. erpax does not delete data in
 * a system it does not own — see the boundary at the head of this file.
 */
export function trelloAfterDelete(mapping: CardMapping, client: TrelloClient): CollectionAfterDeleteHook {
  return async ({ doc }) => {
    const cardId = storedCardId(mapping, doc as Record<string, unknown>)
    if (cardId) await client.addComment(cardId, `erpax: the ${mapping.slug} record behind this card was deleted.`)
    return doc
  }
}

/**
 * Wire the mappings into the Payload config. The card-id field is added to every mapped collection
 * unconditionally; the hooks are added only when the plugin is enabled AND has a client — so a
 * missing credential yields an inert plugin with a stable schema, never a half-wired one.
 */
export function trelloPlugin(pluginConfig: TrelloPluginConfig): (incoming: Config) => Config {
  return (incoming: Config): Config => {
    const wired = pluginConfig.enabled === true && pluginConfig.client !== undefined
    const client = pluginConfig.client
    const mapped = new Map(pluginConfig.collections.map((m) => [m.slug, m]))
    const slugs = new Set((incoming.collections ?? []).map((c) => c.slug))
    for (const slug of mapped.keys()) {
      if (!slugs.has(slug)) {
        throw new Error(`trelloPlugin: no collection '${slug}' in the config — a mapping that matches nothing syncs nothing, forever.`)
      }
    }
    return {
      ...incoming,
      collections: (incoming.collections ?? []).map((collection) => {
        const mapping = mapped.get(collection.slug)
        if (!mapping) return collection
        return {
          ...collection,
          fields: [...collection.fields, cardIdField(mapping)],
          hooks: {
            ...collection.hooks,
            afterChange: [
              ...(collection.hooks?.afterChange ?? []),
              ...(wired && client ? [trelloAfterChange(mapping, client)] : []),
            ],
            afterDelete: [
              ...(collection.hooks?.afterDelete ?? []),
              ...(wired && client ? [trelloAfterDelete(mapping, client)] : []),
            ],
          },
        }
      }),
    }
  }
}
