/**
 * embed — the twin of src/utilities/verify/lean/Embed.lean: when a document is embedded again, and
 * when an AI charge is admitted. Pure and import-free, so the TENANT_QUOTA Durable Object runs the same
 * decision it counts with.
 *
 * Embed.lean proves the laws over keys 0 … 5 and over used, cost and quota 0 … 12; test.ts checks them
 * here and that every theorem it relies on is stated there.
 */

/** Re-embed when the stored content key is missing or differs (Embed.lean `stale`). */
export const stale = (stored: string | null | undefined, current: string): boolean => stored == null || stored !== current

/** A charge of `cost` against `used` of `quota` is admitted exactly when used + cost ≤ quota (Embed.lean `admit`). */
export const admit = (used: number, cost: number, quota: number): boolean => used + cost <= quota

/** The count after the decision: moved by the cost when admitted, unchanged when refused (Embed.lean `charge`). */
export const charge = (used: number, cost: number, quota: number): number => (admit(used, cost, quota) ? used + cost : used)
