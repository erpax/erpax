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
import { de } from '@payloadcms/translations/languages/de'
import { en } from '@payloadcms/translations/languages/en'
import { es } from '@payloadcms/translations/languages/es'
import { ja } from '@payloadcms/translations/languages/ja'

import { isSuperAdmin, isSuperAdminAccess } from './access/isSuperAdmin'
import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Tenants } from './collections/Tenants'
import { Users } from './collections/Users'
import { Footer } from './components/Footer/config'
import { Header } from './components/Header/config'
import { plugins as payloadPlugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { createEcommercePlugin } from './ecommerce/configureEcommercePlugin'
import {
  deriveSecretFromPayloadSecret,
  internalSecretPurpose,
} from './utilities/deriveSecret'
import { getServerSideURL } from './utilities/getURL'
import { getUserTenantIDs } from './utilities/getUserTenantIDs'
import { tenantAwareResendEmailAdapter } from './email/tenantAwareResendEmailAdapter'
import localization from './i18n/localization'
import { messageByLocale, supportedMessageLocales, type SupportedLocale } from './i18n'
import arMessages from './i18n/messages/ar.json'
import bgMessages from './i18n/messages/bg.json'
import deMessages from './i18n/messages/de.json'
import enMessages from './i18n/messages/en.json'
import esMessages from './i18n/messages/es.json'
import jaMessages from './i18n/messages/ja.json'

import type { Config } from './payload-types'

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
} as any

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

const adminLabelLocale = localization.defaultLocale as SupportedLocale
const localeMessages = {
  ar: arMessages,
  bg: bgMessages,
  de: deMessages,
  en: enMessages,
  es: esMessages,
  ja: jaMessages,
} as const
const supportedAdminLocales = supportedMessageLocales
const adminTranslations = Object.fromEntries(
  supportedAdminLocales.map((locale) => [
    locale,
    {
      ...(multiTenantTranslations?.[locale] || {}),
      ...(importExportTranslations?.[locale] || {}),
      ...(ecommerceTranslations?.[locale] || {}),
      ...localeMessages[locale],
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
        { label: messageByLocale('livePreview.mobile', adminLabelLocale), name: 'mobile', width: 375, height: 667 },
        { label: messageByLocale('livePreview.tablet', adminLabelLocale), name: 'tablet', width: 768, height: 1024 },
        { label: messageByLocale('livePreview.desktop', adminLabelLocale), name: 'desktop', width: 1440, height: 900 },
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
  collections: [Tenants, Pages, Posts, Media, Categories, Users],
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
    supportedLanguages: { ar, bg, de, en, es, ja },
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
    tasks: [],
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
  return import(/* webpackIgnore: true */ `${'__wrangler'.replaceAll('_', '')}`).then(
    ({ getPlatformProxy }) =>
      getPlatformProxy({
        environment: process.env.CLOUDFLARE_ENV,
        // `next build` must not use remote D1/R2 (requires `wrangler login`); runtime uses OpenNext context.
        remoteBindings: isProduction && !isNextProductionBuild,
      } satisfies GetPlatformProxyOptions),
  )
}
