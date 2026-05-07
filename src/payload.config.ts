import fs from 'fs'
import path from 'path'
import { PHASE_PRODUCTION_BUILD } from 'next/constants'
import { sqliteD1Adapter } from '@payloadcms/db-d1-sqlite'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'
import type { CloudflareContext } from '@opennextjs/cloudflare'
import { GetPlatformProxyOptions } from 'wrangler'
import { multiTenantPlugin } from '@payloadcms/plugin-multi-tenant'
import { r2Storage } from '@payloadcms/storage-r2'

import { isSuperAdmin } from './access/isSuperAdmin'
import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Tenants } from './collections/Tenants'
import { Users } from './collections/Users'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { plugins as payloadPlugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { deriveSecretFromPayloadSecret } from './utilities/deriveSecret'
import { getServerSideURL } from './utilities/getURL'
import { getUserTenantIDs } from './utilities/getUserTenantIDs'
import localization from './i18n/localization'

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

export default buildConfig({
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
        { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
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
    multiTenantPlugin<Config>({
      collections: {
        pages: {},
        posts: {},
        media: {},
        categories: {},
      },
      tenantField: {
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
    ...payloadPlugins,
  ],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  logger: isProduction ? cloudflareLogger : undefined,
  localization,
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        if (req.user) return true
        const secret = process.env.CRON_SECRET || deriveSecretFromPayloadSecret('cron')
        if (!secret) return false
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${secret}`
      },
    },
    tasks: [],
  },
})

function getCloudflareContextFromWrangler(): Promise<CloudflareContext> {
  return import(/* webpackIgnore: true */ `${'__wrangler'.replaceAll('_', '')}`).then(
    ({ getPlatformProxy }) =>
      getPlatformProxy({
        environment: process.env.CLOUDFLARE_ENV,
        remoteBindings: isProduction,
      } satisfies GetPlatformProxyOptions),
  )
}
