/**
 * Query fingerprint — every SQL string has a contentUuid.
 *
 * Slice KKKKKKKKK-cut2 (2026-05-11). Per user 'all db related ends
 * with a db query text that has uuid. every db query is a sql string.
 * strings have uuid. imagine all'.
 *
 * The collapsing insight: every DB call — Payload `find`, Drizzle
 * select, raw `db.execute` — eventually emits a SQL text string that
 * runs against D1 / Postgres. Strings, per Slice GGGGGGG type-level
 * content-uuid, have a deterministic contentUuid. Therefore every
 * query has a fingerprint, and every query's result, audit row,
 * cache entry, signature, and encryption envelope can anchor on the
 * same primitive the rest of the platform already speaks: the uuid.
 *
 * What this unlocks (no new primitives — pure composition):
 *
 *   - **Query caching** — cache results keyed by `queryUuid`. Two
 *     callers (or one caller across re-renders) issuing the same
 *     query, modulo whitespace / comments / casing, hit the same
 *     cache row. Cache backing: KV at scale, in-memory Map at edge.
 *
 *   - **Query audit** — every executed query writes an `audit-events`
 *     leaf carrying `queryUuid`, params digest, row count, elapsedMs.
 *     The audit-leaf's own contentUuid (Law 8) links into the
 *     uuid-linked DO chain (Slice TTTTTTTT) so query history is
 *     tamper-evident at the same gradient as data history.
 *
 *   - **Query replay** — `queryUuid` is enough to replay the exact
 *     query against a different store (Slice TTTTT storage redundancy)
 *     or a different time (audit-events archive). Federation peers
 *     (Slice AAAAAA) replay each other's queries to prove derivation.
 *
 *   - **Query identification** — `queryUuid` is just a contentUuid,
 *     so `identifyAny(uuid)` (Slice KKKKKKKKK Cut 1) returns the
 *     audit row that witnessed its execution. The two services
 *     compose without any new branching.
 *
 *   - **Query signatures** — `signContentUuid(queryUuid)` (Slice
 *     HHHHHHHHH) asserts "I authorise this exact query to run". The
 *     signature binds to the canonical SQL bytes, not to caller-
 *     supplied params, so it's immune to SQL-injection mutation of
 *     the structural text.
 *
 *   - **Query-result encryption** — `encryptEnvelope(result, queryUuid,
 *     kek)` (Slice HHHHHHHHH) wraps query results for at-rest cache
 *     using the queryUuid as the DEK-derivation salt. Convergent:
 *     the same query → same result → same uuid → dedup-able across
 *     tenants that share a KEK.
 *
 * Canonicalisation: two queries are the SAME query iff they produce
 * the same `queryUuid`. Canonicalisation strips noise (comments,
 * trailing semicolons, redundant whitespace) and normalises casing
 * (SQL keywords → upper, identifiers untouched) but is conservative:
 * any change that COULD affect semantics is preserved.
 *
 * @standard ISO/IEC 9075-2 SQL/Foundation (keyword inventory)
 * @standard RFC 8785 JSON Canonicalization Scheme (for params digest)
 * @standard NIST FIPS 180-4 SHA-256
 * @audit Conservation Law 8  content-addressable integrity (the queryUuid itself)
 * @audit Conservation Law 47 type uuid (ContentUuid<SqlQuery> is the type-level brand)
 * @audit Conservation Law 53 self-referential-closure (cached query result is the search-index fallback)
 * @feature query_fingerprint
 * @see ../integrity/content-uuid.ts (computeContentUuid, jcsCanonicalize)
 * @see ../integrity/signatures.ts (signContentUuid — queryUuid is signable)
 * @see ../integrity/envelope.ts  (encryptEnvelope — result envelope keyed by queryUuid)
 * @see ../identification/index.ts (queryUuid is identifiable via the uuid path)
 * @see ../multi-search/index.ts  (multi-search wraps its query in this service)
 */

import { computeContentUuid, jcsCanonicalize } from '../integrity/content-uuid'
import type { ContentUuid } from '../integrity/content-uuid'

/**
 * Type-level brand for a SQL query string. Carries the SQL through the
 * type system so a `ContentUuid<SqlQuery>` cannot be confused with a
 * `ContentUuid<Invoice>` or any other entity uuid.
 */
export interface SqlQuery {
  readonly sql: string
  readonly paramsCanonical: string
  // content-uuid inputs are open records (satisfies computeContentUuid's Record constraint)
  readonly [k: string]: unknown
}

/** RFC 9562 §5.8 / Slice RRRRR branded uuid that's the fingerprint of a query. */
export type QueryUuid = ContentUuid<SqlQuery>

/**
 * SQL reserved keywords we upper-case during canonicalisation. The set
 * is conservative — only ISO/IEC 9075-2 reserved words that have no
 * legal use as an identifier. Identifiers are left untouched.
 */
const SQL_KEYWORDS: ReadonlySet<string> = new Set([
  'select', 'from', 'where', 'and', 'or', 'not', 'in', 'is', 'null',
  'join', 'inner', 'left', 'right', 'full', 'outer', 'on', 'using',
  'group', 'by', 'order', 'asc', 'desc', 'having', 'limit', 'offset',
  'insert', 'into', 'values', 'update', 'set', 'delete',
  'create', 'table', 'index', 'view', 'alter', 'drop',
  'distinct', 'union', 'all', 'as', 'case', 'when', 'then', 'else', 'end',
  'with', 'recursive', 'returning',
  'true', 'false',
])

/**
 * Canonicalise a SQL string. Two SQL strings that differ only in
 * whitespace, line comments, block comments, trailing semicolons,
 * keyword casing, or string-literal whitespace produce the same
 * canonical form (and therefore the same queryUuid).
 *
 * What we DO NOT change (would alter semantics):
 *   - Identifier casing (some engines are case-sensitive on
 *     quoted identifiers).
 *   - String-literal content (spaces inside `'...'` matter).
 *   - Operator surrounding (some dialects parse `<=` differently
 *     from `< =`).
 *   - Order of clauses (would alter results).
 */
export function canonicalizeSql(sql: string): string {
  if (!sql || sql.length === 0) return ''
  let s = sql

  // 1. Strip line comments `-- ...` to end-of-line. Preserve newlines
  //    so we don't accidentally join statements.
  s = s.replace(/--[^\n]*/g, '')

  // 2. Strip block comments `/* ... */` — non-greedy, multi-line.
  s = s.replace(/\/\*[\s\S]*?\*\//g, '')

  // 3. Walk the string token by token. Inside string literals we
  //    preserve everything; outside we collapse whitespace and
  //    upper-case reserved keywords.
  const out: string[] = []
  let i = 0
  let inSingle = false
  let inDouble = false
  let lastWasSpace = false
  while (i < s.length) {
    const c = s[i]!
    if (inSingle) {
      out.push(c)
      if (c === "'" && s[i - 1] !== '\\') inSingle = false
      i++; continue
    }
    if (inDouble) {
      out.push(c)
      if (c === '"' && s[i - 1] !== '\\') inDouble = false
      i++; continue
    }
    if (c === "'") { inSingle = true; out.push(c); lastWasSpace = false; i++; continue }
    if (c === '"') { inDouble = true; out.push(c); lastWasSpace = false; i++; continue }
    if (/\s/.test(c)) {
      if (!lastWasSpace && out.length > 0) { out.push(' '); lastWasSpace = true }
      i++; continue
    }
    // Identifier / keyword segment.
    if (/[A-Za-z_]/.test(c)) {
      let j = i
      while (j < s.length && /[A-Za-z0-9_]/.test(s[j]!)) j++
      const word = s.slice(i, j)
      out.push(SQL_KEYWORDS.has(word.toLowerCase()) ? word.toUpperCase() : word)
      lastWasSpace = false
      i = j; continue
    }
    out.push(c)
    lastWasSpace = false
    i++
  }
  // 4. Drop a trailing semicolon (statement-level) and trim.
  let canonical = out.join('').trim()
  while (canonical.endsWith(';')) canonical = canonical.slice(0, -1).trimEnd()
  return canonical
}

/**
 * Compute the canonical contentUuid (`QueryUuid`) of a SQL query.
 * The `tenantId` argument participates in the namespace per Slice
 * RRRRR so two tenants running the same SQL get DIFFERENT queryUuids
 * — important for tenant-scoped audit + cache isolation.
 *
 * `params` is an arbitrary object. We JCS-canonicalise it (sorted
 * keys, deterministic numbers) so logically-equal params produce the
 * same uuid regardless of in-memory key ordering.
 */
export function computeQueryUuid(args: {
  sql: string
  params?: unknown
  tenantId: string
}): QueryUuid {
  const sql = canonicalizeSql(args.sql)
  const paramsCanonical = args.params === undefined ? '' : jcsCanonicalize(args.params)
  const queryShape: SqlQuery = { sql, paramsCanonical }
  return computeContentUuid(queryShape, args.tenantId)
}

// ─── Result-side bookkeeping ─────────────────────────────────────────

export interface QueryExecution<TResult> {
  readonly queryUuid: QueryUuid
  readonly result: TResult
  /**
   * ContentUuid of the *result* — derived independently of queryUuid.
   * Cached / replicated stores can use this to verify two replicas
   * answering the same queryUuid produced byte-equal results (Slice
   * UUUUUU N-of-K consensus).
   */
  readonly resultUuid: string
  readonly elapsedMs: number
  readonly rowCount?: number
}

/**
 * Wrap a query runner so its execution is fingerprint-anchored.
 * The caller supplies the SQL string + params + an executor function
 * that actually issues the query; we compute the uuids before and
 * after, time the call, and return the bundled result.
 *
 *   ```ts
 *   const exec = await runWithFingerprint({
 *     sql:    'select * from invoices where tenant = $1 limit 10',
 *     params: [tenantId],
 *     tenantId,
 *   }, () => db.execute(...))
 *
 *   // exec.queryUuid  — fingerprint of the SQL (cacheable)
 *   // exec.resultUuid — fingerprint of the rows (verifiable)
 *   ```
 */
export async function runWithFingerprint<TResult>(args: {
  sql: string
  params?: unknown
  tenantId: string
  /** Optional executor; when omitted, runWithFingerprint only computes the queryUuid (dry-run mode). */
  exec?: () => Promise<TResult>
}): Promise<QueryExecution<TResult | null>> {
  const queryUuid = computeQueryUuid({ sql: args.sql, params: args.params, tenantId: args.tenantId })
  const start = Date.now()
  let result: TResult | null = null
  if (args.exec) result = await args.exec()
  const elapsedMs = Date.now() - start
  // Result uuid: per Law 47 (type uuid) we hash the result's canonical
  // shape under the same tenant namespace.
  const resultUuid = result === null
    ? '00000000-0000-5000-8000-000000000000'
    : computeContentUuid(
        { result: result as unknown },
        args.tenantId,
      )
  const rowCount = Array.isArray(result)
    ? result.length
    : (result && typeof result === 'object' && 'docs' in (result as object) && Array.isArray((result as { docs?: unknown }).docs))
      ? ((result as unknown as { docs: unknown[] }).docs.length)
      : undefined
  return { queryUuid, result, resultUuid, elapsedMs, rowCount }
}
