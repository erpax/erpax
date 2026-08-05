export const CLOUDFLARE_SEAL_KID = (globalThis as any).CLOUDFLARE_SEAL_KID || 'erpax-seal'
export const WRANGLER_SECRET_ENV_KEYS = ['ERPAX_SEAL_KEY', 'ERPAX_CIPHER_KEY'] as const
export const WRANGLER_BINDING_ENV_KEYS = ['ERPAX_DO', 'ERPAX_KV', 'ERPAX_R2'] as const
