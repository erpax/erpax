/**
 * cloudflare/storage — KV, R2, Vectorize, Durable Object mediators.
 * All tenant-scoped and audit-trailed.
 */

export {
  kvGet,
  kvPut,
  r2Get,
  r2Put,
  vectorizeQuery,
  vectorizeInsert,
  auditChainAppend,
  auditChainAppendLinked,
  auditChainVerify,
  counterIncrement,
  counterGet,
} from '../index'

/** @index-cross.foldback child=cloudflare/storage parent=cloudflare — this cross folds back into its parent. */
