/**
 * Apps — erpax split into Payload plugins, one per app, the way a workspace suite is split
 * (mail, drive, admin): each app is ONE plugin that brings its own collections.
 *
 * WHICH collection belongs to which app is computed, not listed. An app names only its ANCHORS —
 * the few collections that define it. Every other collection goes to the app it is most connected
 * to in the relationship graph (references in either direction), decided round by round from the
 * anchors outward. So a new collection lands in an app by what it points at; nobody files it.
 *
 * The rule, exactly (`partition`):
 *  1. An anchor belongs to its app.
 *  2. A HUB — a collection so widely referenced that it says nothing about an app (`hubsOf`: a
 *     tenth of all collections point at it) — is ignored as a neighbour, anchor or not. An upload
 *     is an attachment and is not counted as a reference at all.
 *  3. Each round, every unplaced collection counts its references to already-placed neighbours per
 *     app and takes the app with the most; a tie goes to the app listed first. Rounds
 *     are synchronous: a round reads only the previous round's placements.
 *  4. When a round places nothing, what is left belongs to the last app (`platform`).
 * The result is total (every collection has exactly one app) and deterministic.
 *
 * What this module does NOT do yet: an app is not yet a tenant document, and a tenant cannot yet
 * switch an app on or off. Both need a field on `tenants` and are a schema change of their own.
 *
 * @standard ISO/IEC-25010:2011 §4.2.7 modularity — a change to one app touches that app's plugin
 * @see https://payloadcms.com/docs/plugins/build-your-own
 * @see src/packages/index.ts (the apps, one folder each) · src/payload.config.ts (they are the first plugins)
 */
import type { CollectionConfig, Config, Field, Plugin } from 'payload'

export interface App {
  readonly slug: string
  /** The app's name in the admin navigation. */
  readonly title: string
  /** The collections that define the app. Everything else is placed by the graph. */
  readonly anchors: readonly string[]
}

type Shape = Pick<CollectionConfig, 'slug' | 'fields'>

/** Every relationship target in a list of fields, however deeply nested. */
const targetsIn = (fields: readonly Field[], out: string[] = []): string[] => {
  for (const raw of fields) {
    const field = raw as unknown as { type: string; relationTo?: string | string[]; fields?: Field[]; tabs?: Array<{ fields: Field[] }>; blocks?: Array<{ fields: Field[] }> }
    // an upload is an attachment: it says nothing about which app a collection belongs to
    if (field.type === 'relationship' && field.relationTo !== undefined) out.push(...[field.relationTo].flat())
    if (field.fields) targetsIn(field.fields, out)
    for (const tab of field.tabs ?? []) targetsIn(tab.fields, out)
    for (const block of field.blocks ?? []) targetsIn(block.fields, out)
  }
  return out
}

/** The share of all collections that must point at one for it to be a hub. */
export const HUB_SHARE = 0.1

/** A hub: a collection that at least `share` of all collections point at. It belongs to every app, so it places none. */
export const hubsOf = (collections: readonly Shape[], share = HUB_SHARE): string[] => {
  const referrers = new Map<string, Set<string>>()
  for (const collection of collections) {
    for (const target of targetsIn(collection.fields)) {
      if (target !== collection.slug) referrers.set(target, (referrers.get(target) ?? new Set<string>()).add(collection.slug))
    }
  }
  return [...referrers].filter(([, by]) => by.size >= collections.length * share && by.size > 1).map(([slug]) => slug).sort()
}

/** Which app each collection belongs to — see the rule in the banner. */
export const partition = (collections: readonly Shape[], apps: readonly App[], share = HUB_SHARE): Map<string, string> => {
  if (apps.length === 0) throw new Error('partition needs at least one app')
  const order = new Map(apps.map((app, index) => [app.slug, index]))
  const placed = new Map<string, string>()
  for (const app of apps) for (const anchor of app.anchors) if (!placed.has(anchor)) placed.set(anchor, app.slug)

  const hubs = new Set(hubsOf(collections, share))
  const weight = new Map<string, Map<string, number>>()
  const link = (a: string, b: string): void => {
    const row = weight.get(a) ?? new Map<string, number>()
    row.set(b, (row.get(b) ?? 0) + 1)
    weight.set(a, row)
  }
  for (const collection of collections) {
    for (const target of targetsIn(collection.fields)) {
      if (target === collection.slug) continue
      link(collection.slug, target)
      link(target, collection.slug)
    }
  }

  for (;;) {
    const round: Array<[string, string]> = []
    for (const { slug } of collections) {
      if (placed.has(slug)) continue
      const score = new Map<string, number>()
      for (const [neighbour, count] of weight.get(slug) ?? []) {
        const app = hubs.has(neighbour) ? undefined : placed.get(neighbour)
        if (app !== undefined) score.set(app, (score.get(app) ?? 0) + count)
      }
      const best = [...score].sort((a, b) => b[1] - a[1] || order.get(a[0])! - order.get(b[0])!)[0]
      if (best) round.push([slug, best[0]])
    }
    if (round.length === 0) break
    for (const [slug, app] of round) placed.set(slug, app)
  }

  const rest = apps[apps.length - 1]!.slug
  for (const { slug } of collections) if (!placed.has(slug)) placed.set(slug, rest)
  return placed
}

/** The collections of one app, in the order they were given. */
export const collectionsOf = <T extends Shape>(app: string, collections: readonly T[], apps: readonly App[], share = HUB_SHARE): T[] => {
  const placed = partition(collections, apps, share)
  return collections.filter((collection) => placed.get(collection.slug) === app)
}

const inApp = <T extends CollectionConfig>(collection: T, title: string): T => ({ ...collection, admin: { ...collection.admin, group: title } })

/** One app as a Payload plugin: it adds the app's collections, each under the app's name. */
export const appPlugin =
  (app: App, collections: readonly CollectionConfig[]): Plugin =>
  (config: Config): Config => {
    const present = new Set((config.collections ?? []).map((collection) => collection.slug))
    return { ...config, collections: [...(config.collections ?? []), ...collections.filter((collection) => !present.has(collection.slug)).map((collection) => inApp(collection, app.title))] }
  }

/** Every app as its own plugin — put these first, so later plugins find the collections. */
export const appPlugins = (collections: readonly CollectionConfig[], apps: readonly App[], share = HUB_SHARE): Plugin[] => {
  const placed = partition(collections, apps, share)
  return apps.map((app) => appPlugin(app, collections.filter((collection) => placed.get(collection.slug) === app.slug)))
}

/**
 * The collections other plugins bring (orders, forms, …) under their app's name — put this last.
 * A collection no app anchors keeps the group its plugin gave it.
 */
export const appNavigation =
  (apps: readonly App[]): Plugin =>
  (config: Config): Config => {
    const titles = new Map(apps.flatMap((app) => app.anchors.map((anchor) => [anchor, app.title] as const)))
    return { ...config, collections: (config.collections ?? []).map((collection) => (titles.has(collection.slug) ? inApp(collection, titles.get(collection.slug)!) : collection)) }
  }
