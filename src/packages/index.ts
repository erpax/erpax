/**
 * Packages — erpax as apps. Each folder here is one app, delivered as one Payload plugin; this
 * file lists them in tie-break order and hands them to the config.
 *
 * @see src/packages/engine/index.ts (how a collection finds its app)
 */
import type { CollectionConfig, Plugin } from 'payload'
import { appNavigation, appPlugins, type App, type Gate } from '@/packages/engine'
import { admin } from '@/packages/admin'
import { sites } from '@/packages/sites'
import { sales } from '@/packages/sales'
import { ledger } from '@/packages/ledger'
import { people } from '@/packages/people'
import { make } from '@/packages/make'
import { stock } from '@/packages/stock'
import { comply } from '@/packages/comply'
import { assets } from '@/packages/assets'
import { work } from '@/packages/work'
import { chat } from '@/packages/chat'
import { platform } from '@/packages/platform'

/** The apps, in tie-break order; the last one takes whatever the graph leaves unplaced. */
export const APPS: readonly App[] = [admin, sites, sales, ledger, people, make, stock, comply, assets, work, chat, platform]

/** One plugin per app — put these first, so later plugins find the collections. */
export const packages = (collections: readonly CollectionConfig[], gate?: Gate): Plugin[] => appPlugins(collections, APPS, undefined, gate)

/** The collections other plugins brought, under their app's name — put this last. */
export const navigation = (gate?: Gate): Plugin => appNavigation(APPS, gate)
