declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PAYLOAD_SECRET: string
      NEXT_PUBLIC_SERVER_URL?: string
      /** Slug of the tenant whose pages power root `(frontend)/[slug]` URLs */
      NEXT_PUBLIC_SITE_TENANT_SLUG?: string
      VERCEL_PROJECT_PRODUCTION_URL?: string
      PREVIEW_SECRET?: string
      CRON_SECRET?: string
      CLOUDFLARE_ENV?: string
    }
  }
}

export {}
