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
      /** Set `true` on long-lived Node hosts only (not Cloudflare Workers). Workers: call `/api/payload-jobs/run` on a schedule. */
      PAYLOAD_JOB_AUTORUN?: string
      /** Skip loading native sharp (e.g. Edge / Workers local tooling). */
      PAYLOAD_DISABLE_SHARP?: string
      /** Resend API key — enables `@payloadcms/email-resend` when set */
      RESEND_API_KEY?: string
      EMAIL_DEFAULT_FROM_ADDRESS?: string
      EMAIL_DEFAULT_FROM_NAME?: string
      /** Stripe (plugin-ecommerce); omit for admin-only / no payments */
      STRIPE_SECRET_KEY?: string
      STRIPE_WEBHOOK_SECRET?: string
      /** Legacy alias — prefer STRIPE_WEBHOOK_SECRET */
      STRIPE_WEBHOOKS_SIGNING_SECRET?: string
      NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?: string
      /** When `false`, disables remote-URL → `media` import hooks (posts, pages, products, etc.). */
      PAYLOAD_REMOTE_MEDIA_IMPORT?: string
      /** Payload MCP API key (see Admin → MCP → API Keys). Prefer `.env.local`, never commit. */
      PAYLOAD_MCP_API_KEY?: string
      /** MCP endpoint URL for scripts (default `http://127.0.0.1:3000/api/mcp`). */
      PAYLOAD_MCP_URL?: string
    }
  }
}

export {}
