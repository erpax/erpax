/**
 * erpax's OWN Worker env names — distinct from the Cloudflare PLATFORM names in
 * ../seal.ts, which is why they no longer share a name.
 *
 * Both sets are real and both are secrets, but they are not the same thing:
 * `ERPAX_SEAL_KEY` is erpax's bootstrap key material ([[secret]]); a
 * `CLOUDFLARE_API_TOKEN` is a credential for someone else's platform. They were both
 * called `WRANGLER_SECRET_ENV_KEYS`, and because the facade exported THIS one, a
 * caller asking "which env keys are secret?" got erpax's list and would not have
 * treated the Cloudflare API token as a secret at all.
 */
export const ERPAX_SECRET_ENV_KEYS = ['ERPAX_SEAL_KEY', 'ERPAX_CIPHER_KEY'] as const
export const ERPAX_BINDING_ENV_KEYS = ['ERPAX_DO', 'ERPAX_KV', 'ERPAX_R2'] as const

/** @index-cross.foldback child=cloudflare/constants parent=cloudflare — this cross folds back into its parent. */
