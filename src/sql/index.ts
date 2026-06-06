/**
 * sql — a tiny PURE SQL query model: a SELECT AST (table, columns, where) + a deterministic
 * stringifier and normalizer. No database — just the query as data, so two queries that mean the
 * same thing NORMALIZE to the same canonical string (and the [[quantum]]/sql facet to the same
 * content-uuid). Composes [[query]] · [[table]] · [[column]].
 *
 *   tsx src/sql/index.ts
 *
 * @standard SQL SELECT (a minimal subset); deterministic canonicalisation
 * @see ../query -- ../table -- ../column -- ../quantum/sql -- ./SKILL.md
 */
export interface Select {
  readonly table: string
  readonly columns: readonly string[]
  readonly where?: string
}

/** Render a SELECT to canonical SQL — columns sorted so equivalent queries render identically. */
export const toSql = (q: Select): string => {
  const cols = q.columns.length === 0 ? '*' : [...q.columns].sort().join(', ')
  return `SELECT ${cols} FROM ${q.table}` + (q.where ? ` WHERE ${q.where}` : '')
}

/** The normalized (canonical) form of a query — order-independent columns. */
export const normalize = (q: Select): string => toSql(q)

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('sql — canonical: ' + normalize({ table: 'users', columns: ['name', 'id'], where: 'active = 1' }))
}
