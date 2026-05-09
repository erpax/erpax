import fs from 'fs'
import path from 'path'
import { PHASE_PRODUCTION_BUILD } from 'next/constants'
import { sqliteD1Adapter } from '@payloadcms/db-d1-sqlite'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'
import type { CloudflareContext } from '@opennextjs/cloudflare'
import { GetPlatformProxyOptions } from 'wrangler'
import { multiTenantPlugin } from '@payloadcms/plugin-multi-tenant'
import { importExportPlugin } from '@payloadcms/plugin-import-export'
import { mcpPlugin } from '@payloadcms/plugin-mcp'
import { r2Storage } from '@payloadcms/storage-r2'
import { getTenantFromCookie } from '@payloadcms/plugin-multi-tenant/utilities'
import { translations as multiTenantTranslations } from '@payloadcms/plugin-multi-tenant/translations/languages/all'
import { translations as importExportTranslations } from '@payloadcms/plugin-import-export/translations/languages/all'
import { translations as ecommerceTranslations } from '@payloadcms/plugin-ecommerce/translations/languages/all'
import { ar } from '@payloadcms/translations/languages/ar'
import { bg } from '@payloadcms/translations/languages/bg'
import { cs } from '@payloadcms/translations/languages/cs'
import { da } from '@payloadcms/translations/languages/da'
import { de } from '@payloadcms/translations/languages/de'
import { en } from '@payloadcms/translations/languages/en'
import { es } from '@payloadcms/translations/languages/es'
import { et } from '@payloadcms/translations/languages/et'
import { fr } from '@payloadcms/translations/languages/fr'
import { hr } from '@payloadcms/translations/languages/hr'
import { hu } from '@payloadcms/translations/languages/hu'
import { is } from '@payloadcms/translations/languages/is'
import { it } from '@payloadcms/translations/languages/it'
import { ja } from '@payloadcms/translations/languages/ja'
import { lt } from '@payloadcms/translations/languages/lt'
import { lv } from '@payloadcms/translations/languages/lv'
import { nb } from '@payloadcms/translations/languages/nb'
import { nl } from '@payloadcms/translations/languages/nl'
import { pl } from '@payloadcms/translations/languages/pl'
import { pt } from '@payloadcms/translations/languages/pt'
import { ro } from '@payloadcms/translations/languages/ro'
import { ru } from '@payloadcms/translations/languages/ru'
import { sk } from '@payloadcms/translations/languages/sk'
import { sl } from '@payloadcms/translations/languages/sl'
import { sv } from '@payloadcms/translations/languages/sv'
import { uk } from '@payloadcms/translations/languages/uk'

import { isSuperAdmin, isSuperAdminAccess } from './access/isSuperAdmin'
// All collections come from the single barrel — `src/collections/index.ts`.
// Domain context (Core / Content / Billing / Inventory / Ledger) is documented
// inside that barrel; this file just consumes it.
//
// The 20 accounting collections are NOT listed here — they are registered via
// `accountingPlugin()` in `src/plugins/index.ts`, which lives within
// `src/plugins/accounting/`.
import {
  // Core
  Tenants,
  Users,
  Roles,
  UserRoles,
  // Content (CMS)
  Categories,
  Media,
  Pages,
  Posts,
  // Billing
  Invoices,
  InvoiceLines,
  PaymentMethods,
  Payments,
  SubscriptionPlans,
  Subscriptions,
  // Inventory
  Items,
} from './collections'
import { Footer } from './components/Footer/config'
import { Header } from './components/Header/config'
import { plugins as payloadPlugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { createEcommercePlugin } from './ecommerce/configureEcommercePlugin'
import {
  deriveSecretFromPayloadSecret,
  internalSecretPurpose,
} from './standards/nist-sp-800-108'
import { getServerSideURL } from './standards/rfc-3986/get-url'
import { getUserTenantIDs } from './utilities/getUserTenantIDs'
import { tenantAwareResendEmailAdapter } from './email/tenantAwareResendEmailAdapter'
import localization from './i18n/localization'
import {
  defaultLocale,
  localeRecord,
  nestedMessages,
  supportedLocales,
  type SupportedLocale,
} from './i18n'

import type { Config } from './payload-types'

/** `buildConfig({ logger })` type — used so Workers can supply a non-pino logger without `any`. */
type PayloadBuildConfigLogger = NonNullable<Parameters<typeof buildConfig>[0]['logger']>

/** Finnish, Greek, Irish, Maltese — no `@payloadcms/translations` pack; reuse English UI. */
const payloadUiFallback = en

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const realpath = (value: string) => (fs.existsSync(value) ? fs.realpathSync(value) : undefined)

const isCLI = process.argv.some((value) => {
  const resolved = realpath(value)
  return resolved?.endsWith(path.join('payload', 'bin.js')) ?? false
})
const isProduction = process.env.NODE_ENV === 'production'

const createLog =
  (level: string, fn: typeof console.log) => (objOrMsg: object | string, msg?: string) => {
    if (typeof objOrMsg === 'string') {
      fn(JSON.stringify({ level, msg: objOrMsg }))
    } else {
      fn(JSON.stringify({ level, ...objOrMsg, msg: msg ?? (objOrMsg as { msg?: string }).msg }))
    }
  }

const cloudflareLogger = {
  level: process.env.PAYLOAD_LOG_LEVEL || 'info',
  trace: createLog('trace', console.debug),
  debug: createLog('debug', console.debug),
  info: createLog('info', console.log),
  warn: createLog('warn', console.warn),
  error: createLog('error', console.error),
  fatal: createLog('fatal', console.error),
  silent: () => {},
} as PayloadBuildConfigLogger

let _cloudflare: CloudflareContext | undefined
let _cloudflareInit = false

async function getCloudflare(): Promise<CloudflareContext> {
  if (_cloudflareInit) return _cloudflare!

  const isNextProductionBuild = process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD

  if (isCLI || !isProduction || isNextProductionBuild) {
    _cloudflare = await getCloudflareContextFromWrangler()
  } else {
    const { getCloudflareContext } = await import('@opennextjs/cloudflare')
    _cloudflare = await getCloudflareContext({ async: true })
  }

  _cloudflareInit = true
  return _cloudflare
}

let sharp: typeof import('sharp') | undefined
if (process.env.PAYLOAD_DISABLE_SHARP !== 'true') {
  try {
    sharp = (await import('sharp')).default
  } catch {
    sharp = undefined
  }
}

// Merge plugin translations with the project's own nested messages so the
// Payload admin UI has a single, complete translation map per locale.
function pluginTranslationsForLocale(
  pack: Record<string, Record<string, unknown>> | undefined,
  locale: SupportedLocale,
): Record<string, unknown> {
  return (pack?.[locale] as Record<string, unknown> | undefined) ?? {}
}

const adminTranslations = Object.fromEntries(
  supportedLocales.map((locale) => [
    locale,
    {
      ...pluginTranslationsForLocale(
        multiTenantTranslations as Record<string, Record<string, unknown>>,
        locale,
      ),
      ...pluginTranslationsForLocale(
        importExportTranslations as Record<string, Record<string, unknown>>,
        locale,
      ),
      ...pluginTranslationsForLocale(
        ecommerceTranslations as Record<string, Record<string, unknown>>,
        locale,
      ),
      ...nestedMessages[locale],
    },
  ]),
)

export default buildConfig({
  ...(sharp ? { sharp } : {}),
  email: tenantAwareResendEmailAdapter,
  admin: {
    components: {
      beforeLogin: ['@/components/BeforeLogin'],
      beforeDashboard: ['@/components/BeforeDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: localeRecord('livePreview.mobile')[defaultLocale],
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: localeRecord('livePreview.tablet')[defaultLocale],
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: localeRecord('livePreview.desktop')[defaultLocale],
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  editor: defaultLexical,
  db: sqliteD1Adapter({
    binding: (await getCloudflare()).env.D1,
    // NODE_ENV=test + non-TTY: Drizzle dev push can hang on interactive column prompts.
    // Vitest runs migrate in vitest.setup.ts; Playwright seeds set PAYLOAD_DEV_PUSH=false.
    push:
      process.env.NODE_ENV !== 'test' && process.env.PAYLOAD_DEV_PUSH !== 'false',
  }),
  collections: [
    Tenants,
    Pages,
    Posts,
    Media,
    Categories,
    Roles,
    UserRoles,
    Users,
    SubscriptionPlans,
    Subscriptions,
    Items,
    Invoices,
    InvoiceLines,
    PaymentMethods,
    Payments,
    // Ledger kernel (Accounts/Equations/Entries/Statements) was retired — canonical
    // write-model is the accounting plugin (`gl-accounts`/`journal-entries`/`gl-postings`)
    // registered via `accountingPlugin()` in src/plugins/index.ts.
  ],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer],
  plugins: [
    r2Storage({
      bucket: (await getCloudflare()).env.R2,
      collections: { media: true },
    }),
    createEcommercePlugin(),
    multiTenantPlugin<Config>({
      collections: {
        pages: {},
        posts: {},
        media: {},
        categories: {},
        products: {},
        carts: {},
        orders: {},
        addresses: {},
        transactions: {},
        variantTypes: {},
        variants: {},
        variantOptions: {},
      },
      tenantField: {
        defaultValue: async ({ req }) => {
          const idType = req.payload.collections.tenants?.customIDType ?? req.payload.db.defaultIDType
          const tenantFromCookie = getTenantFromCookie(req.headers, idType === 'number' ? 'number' : 'text')
          if (!tenantFromCookie) return null

          const { totalDocs } = await req.payload.count({
            collection: 'tenants',
            overrideAccess: false,
            req,
            user: req.user,
            where: {
              id: {
                in: [tenantFromCookie],
              },
            },
          })

          return totalDocs > 0 ? tenantFromCookie : null
        },
        access: {
          read: () => true,
          update: ({ req }) => {
            if (isSuperAdmin(req.user)) return true
            return getUserTenantIDs(req.user).length > 0
          },
        },
      },
      tenantsArrayField: {
        includeDefaultField: false,
      },
      userHasAccessToAllTenants: (user) => isSuperAdmin(user),
    }),
    importExportPlugin({
      /** Empty list = enable import/export UI on every collection (see plugin runtime). */
      collections: [],
      overrideExportCollection: ({ collection }) => ({
        ...collection,
        access: {
          ...collection.access,
          create: isSuperAdminAccess,
          read: isSuperAdminAccess,
          delete: isSuperAdminAccess,
        },
      }),
      overrideImportCollection: ({ collection }) => ({
        ...collection,
        access: {
          ...collection.access,
          create: isSuperAdminAccess,
          read: isSuperAdminAccess,
          delete: isSuperAdminAccess,
        },
      }),
    }),
    mcpPlugin({
      collections: {
        pages: { enabled: true },
        posts: { enabled: true },
        media: { enabled: true },
        categories: { enabled: true },
        products: { enabled: true },
      },
      globals: {
        header: { enabled: true },
        footer: { enabled: true },
      },
      overrideApiKeyCollection: (collection) => ({
        ...collection,
        admin: {
          ...collection.admin,
          group: localeRecord('plugins.mcpGroup'),
        },
        labels: {
          plural: localeRecord('payload-mcp-api-keys.plural'),
          singular: localeRecord('payload-mcp-api-keys.singular'),
        },
      }),
    }),
    ...payloadPlugins,
  ],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  logger: isProduction ? cloudflareLogger : undefined,
  localization,
  i18n: {
    /** Payload's `SupportedLanguages` type omits some ISO codes we ship (fi, el, ga, mt). */
    supportedLanguages: {
      ar,
      bg,
      cs,
      da,
      de,
      el: payloadUiFallback,
      en,
      es,
      et,
      fi: payloadUiFallback,
      fr,
      ga: payloadUiFallback,
      hr,
      hu,
      is,
      it,
      ja,
      lt,
      lv,
      mt: payloadUiFallback,
      nb,
      nl,
      pl,
      pt,
      ro,
      ru,
      sk,
      sl,
      sv,
      uk,
    } as Record<SupportedLocale, typeof en>,
    translations: adminTranslations,
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        if (req.user) return true
        const secret = deriveSecretFromPayloadSecret(internalSecretPurpose.cron)
        if (!secret) return false
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${secret}`
      },
    },
    tasks: [
      /**
       * Dunning cycle — past-due → suspend → cancel cascade for subscriptions.
       * Implementation at `src/jobs/dunningJob.ts`. Wired here per Slice ZZ
       * (was orphaned before — see CHANGELOG `[Unreleased]` Slice YY).
       *
       * Reachable via:
       *   • Cloudflare Workers: `POST /api/payload-jobs/run` + a wrangler
       *     `[[triggers]]` cron entry (recommended for the actual deploy).
       *   • Long-lived Node: `PAYLOAD_JOB_AUTORUN=true` + the `autoRun`
       *     block below; runs every 5 minutes from the default queue.
       *
       * @accounting IFRS IFRS-9 impairment-and-credit-losses
       * @accounting US-GAAP ASC-326 measurement-of-credit-losses
       * @standard EN-16931:2017 §BG-3 invoice-status-cascade
       * @audit ISO-19011:2018 audit-trail dunning-cycle
       */
      {
        slug: 'dunning-cycle',
        handler: async ({ req }: { req: PayloadRequest }) => {
          const { processDunningCycle } = await import('./jobs/dunningJob')
          await processDunningCycle(req.payload)
          return { output: { status: 'completed' } }
        },
      },
    ],
    /** Dedicated/long-lived Node only. On Cloudflare Workers use `/api/payload-jobs/run` + Schedules/cron. */
    ...(process.env.PAYLOAD_JOB_AUTORUN === 'true'
      ? {
          autoRun: [{ cron: '*/5 * * * *', queue: 'default', limit: 25 }],
          shouldAutoRun: async () => true,
        }
      : {}),
  },
})

function getCloudflareContextFromWrangler(): Promise<CloudflareContext> {
  const isNextProductionBuild = process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD
  /**
   * During `next build`, Miniflare uses a local SQLite D1; parallel workers can hit SQLITE_BUSY.
   * Cloudflare injects `WORKERS_CI=1` (Workers Builds) or `CF_PAGES=1` (Pages) — use remote D1 then.
   * Elsewhere (e.g. GitHub Actions), set `PAYLOAD_BUILD_USE_REMOTE_D1=true`. Opt out: `=false`.
   * @see https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/
   */
  const isCloudflareBuildEnv = process.env.CF_PAGES === '1' || process.env.WORKERS_CI === '1'
  const useRemoteD1InNextBuild =
    process.env.PAYLOAD_BUILD_USE_REMOTE_D1 === 'true' ||
    (isCloudflareBuildEnv && process.env.PAYLOAD_BUILD_USE_REMOTE_D1 !== 'false')
  const remoteBindings =
    isProduction && (!isNextProductionBuild || useRemoteD1InNextBuild)

  return import(/* webpackIgnore: true */ `${'__wrangler'.replaceAll('_', '')}`).then(
    ({ getPlatformProxy }) =>
      getPlatformProxy({
        environment: process.env.CLOUDFLARE_ENV,
        remoteBindings,
      } satisfies GetPlatformProxyOptions),
  )
}
