/**
 * outward/discover — APIs → schemas → methods → cross formulas, each step derived from the last.
 *
 * The crosses in [[outward]]/witness were HAND-PICKED, which is the frozen-rosetta defect this corpus
 * names: a basis typed once reports what its author remembered. This derives them instead. Every
 * fetch is injected, so the whole pipeline is provable offline. See ./SKILL.md.
 *
 * @standard OpenAPI 3 / Swagger 2 — the machine-readable surface being read
 * @standard ISO 19011:2018 §6.4 — audit evidence: a candidate cross must name the fields it rests on
 */

/** One API the registry knows, with the URL of its own schema. */
export interface DiscoveredApi {
  readonly name: string
  readonly title: string
  readonly schemaUrl: string
}

/**
 * How many of a quantity an answer carries — the half a flattened leaf-name scan throws away.
 *
 * A schema expresses three shapes and only one of them was read. `temperature` once, `[temperature]`
 * hourly, and `{ "Sofia": temperature }` by city are three different answers to the same question, and
 * two methods sharing a quantity in different shapes cannot be compared until one is collapsed. See
 * ./SKILL.md § arrays and hashes are answers too.
 */
export type Shape = 'scalar' | 'list' | 'map'

/** A quantity together with the shape it arrives in. Neither half alone makes an answer comparable. */
export interface Quantity {
  readonly quantity: string
  readonly shape: Shape
}

/**
 * A quantity written compactly: `temperature` · `temperature[]` · `temperature{}`.
 *
 * One notation for the whole pipeline — what a tool renders, and what a proof asserts against. Writing
 * `{ quantity, shape }` pairs out by hand at every call site is the transcription this replaces.
 */
export const quantityNotation = (q: Quantity): string =>
  `${q.quantity}${q.shape === 'list' ? '[]' : q.shape === 'map' ? '{}' : ''}`

/** The inverse of {@link quantityNotation} — the same notation, read. */
export const parseQuantity = (spec: string): Quantity => ({
  quantity: spec.replace(/\[\]$|\{\}$/, ''),
  shape: spec.endsWith('[]') ? 'list' : spec.endsWith('{}') ? 'map' : 'scalar',
})

/**
 * A shared quantity written compactly: `temperature` when the comparison is `direct`, and
 * `temperature:reduce` when the shapes force a decision first. What a tool renders and a proof asserts.
 */
export const sharedNotation = (s: SharedQuantity): string =>
  s.relation === 'direct' ? s.quantity : `${s.quantity}:${s.relation}`

/** One operation a schema declares. */
export interface DiscoveredMethod {
  readonly api: string
  readonly verb: string
  readonly path: string
  /** Normalised parameter quantities — what the method must be TOLD. */
  readonly inputs: readonly Quantity[]
  /** Normalised response-field quantities — what the method ANSWERS. */
  readonly outputs: readonly Quantity[]
}

/**
 * Field name → quantity. DECLARED, in the open, because OpenAPI almost never carries units.
 *
 * This is the honest weak link of the pipeline and it is named rather than hidden: two fields both
 * called `temperature` are *probably* the same quantity, and nothing in the schema says so. A
 * `units`/`x-units` extension is preferred wherever a spec provides one.
 */
/**
 * Field name → quantity, as DATA. The matcher AND the corroboration vocabulary are both derived from
 * this one list, so closing a new collision is one character of data, never a new bespoke rule.
 *
 * A name suffixed `?` is **ambiguous by role**: an ordinary English word naming a position in a
 * request rather than a thing in the world. That mark is the irreducible judgement here and the whole
 * of it — every other part of corroboration is computed. Both collisions below were measured, and the
 * descriptions are verbatim from the published specs:
 *
 * - `from` — *"Currency symbol for the converted from amount"* (`interzoid.com:convertcurrency`) against
 *   *"How many initial results should be skipped. Defaults to 0."* (`opentargets.io`, GENOMICS)
 * - `alt` — an altitude in a weather API, against Google's universal *"Data format for the response"*
 *   (enum `json`/`media`/`proto`), which crossed two ad-exchange APIs on ALTITUDE
 */
const QUANTITY: readonly (readonly [readonly string[], string])[] = [
  [['latitude', 'lat'], 'latitude'],
  [['longitude', 'lon', 'lng', 'long'], 'longitude'],
  [['datetime', 'timestamp', 'date', 'day', 'dt'], 'instant'],
  [['temperature', 'temp'], 'temperature'],
  [['distance', 'dist', 'length_m', 'meters', 'metres'], 'distance'],
  [['altitude', 'elevation', 'alt?'], 'altitude'],
  [['velocity', 'speed'], 'speed'],
  [
    ['currency', 'currency_code', 'base_currency', 'quote_currency', 'from?', 'to?', 'base?', 'symbol?'],
    'currency',
  ],
  [['price', 'amount', 'rate?', 'value?'], 'money'],
  [['magnitude', 'mag'], 'magnitude'],
  [['population', 'pop?'], 'population'],
  [['pressure', 'hpa', 'mbar'], 'pressure'],
  [['humidity', 'rh?'], 'humidity'],
]

/** An alternative, split into the word and whether its ROLE makes it ambiguous. */
const alternative = (spec: string): { word: string; ambiguous: boolean } =>
  spec.endsWith('?') ? { word: spec.slice(0, -1), ambiguous: true } : { word: spec, ambiguous: false }

/**
 * Does this field name state the quantity itself? Exact match, or containment for a word long enough
 * that containing it is not coincidence (`temperature_2m` states `temperature`).
 */
const states = (field: string, word: string): boolean =>
  field === word || (word.length >= 5 && field.includes(word))

/**
 * The quantity a field name denotes, or null when nothing declared covers it.
 *
 * `hint` is whatever the schema says ABOUT the field — an OpenAPI `description`, an `enum`. An
 * unambiguous name answers without it; an ambiguous one is answered ONLY by corroboration, and the
 * vocabulary that corroborates is DERIVED from the quantity's own alternatives. That is why closing the
 * `alt` collision needed no new rule: marking `alt` a role word was the entire fix, and the same
 * machinery that had already refused a paginated `from` then refused a response-format `alt`.
 *
 * @invariant an ambiguous word with no corroborating hint returns null, never a guessed quantity
 * @invariant corroboration is derived from the quantity's own vocabulary, never written per case
 */
export function quantityOf(field: string, hint = ''): string | null {
  const f = field.toLowerCase()
  const h = hint.toLowerCase()
  for (const [alts, quantity] of QUANTITY) {
    const parsed = alts.map(alternative)
    // Longest first: `temperature_2m` must be read as `temperature`, never as the alias `temp`.
    const hit = [...parsed].sort((a, b) => b.word.length - a.word.length).find((a) => states(f, a.word))
    if (hit === undefined) continue
    if (!hit.ambiguous) return quantity
    const vocabulary = [quantity, ...parsed.filter((a) => !a.ambiguous).map((a) => a.word)]
    return vocabulary.some((w) => h.includes(w)) ? quantity : null
  }
  return null
}

/** Registry rows from an APIs.guru-shaped list. Pure: the document is handed in. */
export function discoverApis(list: Record<string, unknown>): DiscoveredApi[] {
  const out: DiscoveredApi[] = []
  for (const [name, entry] of Object.entries(list)) {
    const versions = (entry as { versions?: Record<string, unknown> }).versions ?? {}
    const first = Object.values(versions)[0] as
      | { swaggerUrl?: string; info?: { title?: string } }
      | undefined
    if (typeof first?.swaggerUrl !== 'string') continue
    out.push({ name, title: first.info?.title ?? name, schemaUrl: first.swaggerUrl })
  }
  return out
}

/** Follow a same-document `$ref` (`#/components/schemas/X`). Cross-document refs are not resolved. */
function deref(node: unknown, root: Record<string, unknown>): unknown {
  const ref = (node as { $ref?: unknown } | null)?.$ref
  if (typeof ref !== 'string' || !ref.startsWith('#/')) return node
  let cur: unknown = root
  for (const seg of ref.slice(2).split('/')) {
    if (cur === null || typeof cur !== 'object') return undefined
    cur = (cur as Record<string, unknown>)[seg.replace(/~1/g, '/').replace(/~0/g, '~')]
  }
  return cur
}

/**
 * Every leaf field name reachable from a node, with same-document `$ref`s followed.
 *
 * Traverses EVERY object value rather than a list of named keys, and that is the correction that made
 * the pipeline see anything at all: the first version walked only `properties`/`items`/`schema`, so an
 * OpenAPI 3 response — which hides its body under `content['application/json'].schema` — read as
 * empty, and a `$ref` into `components/schemas` read as empty too. Nearly every real spec uses both,
 * so the reader reported 0 methods for 7 of 9 live APIs and the crosses came out at zero. A reader
 * blind to a spec dialect does not error; it reports absence.
 */
function leafFields(
  node: unknown,
  root: Record<string, unknown>,
  depth = 0,
  seen = new Set<unknown>(),
  within: Shape = 'scalar',
): Array<{ name: string; shape: Shape }> {
  if (depth > 8 || node === null || typeof node !== 'object') return []
  const here = deref(node, root)
  if (here === null || typeof here !== 'object' || seen.has(here)) return []
  seen.add(here)
  const out: Array<{ name: string; shape: Shape }> = []
  const o = here as Record<string, unknown>
  // The container this node IS. A hash outranks a list: a map of lists must be keyed before anything
  // can be reduced, so the OUTERMOST wrapper is what a caller has to undo first.
  const here_shape: Shape = isMap(o) ? 'map' : isList(o) ? 'list' : 'scalar'
  const carried: Shape = within !== 'scalar' ? within : here_shape
  const props = o.properties as Record<string, unknown> | undefined
  if (props !== undefined) for (const k of Object.keys(props)) out.push({ name: k, shape: carried })
  for (const v of Object.values(o)) out.push(...leafFields(v, root, depth + 1, seen, carried))
  return out
}

/**
 * Keep the WIDEST shape a quantity was seen in. A response carrying `temperature` both at the top level
 * and inside an hourly array answers it as a list — reporting the scalar would promise a single value
 * the caller has to pick out of many, which is the comparison that silently goes wrong.
 */
const RANK: Readonly<Record<Shape, number>> = { scalar: 0, list: 1, map: 2 }
const keep = (into: Map<string, Quantity>, q: Quantity): void => {
  const had = into.get(q.quantity)
  if (had === undefined || RANK[q.shape] > RANK[had.shape]) into.set(q.quantity, q)
}
const ordered = (m: Map<string, Quantity>): Quantity[] =>
  [...m.values()].sort((x, y) => x.quantity.localeCompare(y.quantity))

/** A parameter's shape: a repeatable `type: array` query parameter takes MANY of its quantity. */
const paramShape = (p: { schema?: { type?: unknown; items?: unknown } } | undefined): Shape =>
  p?.schema !== undefined && isList(p.schema as Record<string, unknown>) ? 'list' : 'scalar'

/** A JSON-Schema array: `type: array`, or an `items` clause, which is the same statement. */
const isList = (o: Record<string, unknown>): boolean => o.type === 'array' || o.items !== undefined

/**
 * A keyed hash: `additionalProperties` (or `patternProperties`) declares values under keys the schema
 * does not name. `type: object` with named `properties` is a RECORD, not a map — its fields are the
 * answer, and calling it a map would make every response body a hash.
 */
const isMap = (o: Record<string, unknown>): boolean =>
  (o.additionalProperties !== undefined && o.additionalProperties !== false) || o.patternProperties !== undefined

/**
 * Operations a schema declares, with inputs and outputs reduced to QUANTITIES.
 *
 * Reads both Swagger 2 (`parameters[].name`) and OpenAPI 3 (`requestBody`/`content`), because the
 * registry serves both and a reader that handles one silently reports the other as having no methods.
 */
export function discoverMethods(api: string, spec: Record<string, unknown>): DiscoveredMethod[] {
  const paths = spec.paths as Record<string, Record<string, unknown>> | undefined
  if (paths === undefined) return []
  const out: DiscoveredMethod[] = []
  for (const [path, byVerb] of Object.entries(paths)) {
    for (const [verb, op] of Object.entries(byVerb)) {
      if (!/^(get|post|put|delete|patch)$/i.test(verb)) continue
      const o = op as Record<string, unknown>
      // Path-level parameters apply to every verb, and a parameter may itself be a $ref.
      const params = [
        ...(((byVerb.parameters as unknown[] | undefined) ?? [])),
        ...(((o.parameters as unknown[] | undefined) ?? [])),
      ].map(
        (p) =>
          deref(p, spec) as
            | { name?: string; description?: string; schema?: { enum?: unknown; type?: unknown; items?: unknown } }
            | undefined,
      )
      const inputs = new Map<string, Quantity>()
      for (const p of params) {
        // The spec's own words about the parameter — what decides an ambiguous name like `from`.
        const hint = `${p?.description ?? ''} ${JSON.stringify(p?.schema?.enum ?? '')}`
        const q = typeof p?.name === 'string' ? quantityOf(p.name, hint) : null
        // A repeatable query parameter is a LIST of that quantity, not one of it.
        if (q !== null) keep(inputs, { quantity: q, shape: paramShape(p) })
      }
      // An OpenAPI 3 request body carries inputs too.
      for (const f of leafFields(o.requestBody, spec)) {
        const q = quantityOf(f.name)
        if (q !== null) keep(inputs, { quantity: q, shape: f.shape })
      }
      const outputs = new Map<string, Quantity>()
      for (const f of leafFields(o.responses, spec)) {
        const q = quantityOf(f.name)
        if (q !== null) keep(outputs, { quantity: q, shape: f.shape })
      }
      if (inputs.size === 0 && outputs.size === 0) continue
      out.push({ api, verb: verb.toLowerCase(), path, inputs: ordered(inputs), outputs: ordered(outputs) })
    }
  }
  return out
}

/** A cross the schemas imply: two methods from DIFFERENT apis, same question, same answer-quantity. */
/**
 * A GraphQL schema read as methods — the same shape an OpenAPI path yields, so a POST-only API joins
 * the one cross machinery instead of needing a second one.
 *
 * `discoverMethods` reads OpenAPI paths, and a GraphQL endpoint has none: it has ONE path, answering
 * POST, describing itself only when asked. Open Targets is exactly that — its registry entry serves a
 * 2019 REST spec whose endpoints now return 404, so the pipeline derived three dead methods and read
 * the live API as absent. See ./SKILL.md § a schema that describes a dead API.
 *
 * Each root query FIELD becomes a method: `verb` is `post`, `path` is the field name, `inputs` are its
 * argument names and `outputs` the field names of the type it returns. Only ONE level is read — a
 * GraphQL response shape is chosen by the caller, so anything deeper would be this function inventing
 * a query nobody asked for.
 */
export function discoverGraphql(api: string, introspection: Record<string, unknown>): DiscoveredMethod[] {
  const schema = (introspection.data as { __schema?: unknown } | undefined)?.__schema ?? introspection.__schema
  const root = schema as { queryType?: { name?: string }; types?: readonly unknown[] } | undefined
  if (!root?.types) return []
  type Field = { name?: string; args?: readonly { name?: string }[]; type?: unknown }
  type Type = { name?: string; kind?: string; fields?: readonly Field[] | null }
  const types = root.types as readonly Type[]
  const byName = new Map<string, Type>()
  for (const t of types) if (typeof t?.name === 'string') byName.set(t.name, t)
  const queryName = root.queryType?.name ?? 'Query'
  const query = byName.get(queryName)
  if (!query?.fields) return []

  /**
   * The named type a field returns, and whether a LIST wrapper stands between. GraphQL says the shape
   * outright — `LIST` is a kind, not a convention — so this half needs no heuristic at all.
   */
  const named = (t: unknown): { name: string | null; shape: Shape } => {
    let cur = t as { name?: string | null; kind?: string; ofType?: unknown } | null | undefined
    let shape: Shape = 'scalar'
    for (let depth = 0; cur && depth < 8; depth++) {
      if (cur.kind === 'LIST') shape = 'list'
      if (typeof cur.name === 'string' && cur.name !== '') return { name: cur.name, shape }
      cur = cur.ofType as typeof cur
    }
    return { name: null, shape }
  }

  const out: DiscoveredMethod[] = []
  for (const f of query.fields) {
    if (typeof f?.name !== 'string') continue
    const inputs = new Map<string, Quantity>()
    for (const a of f.args ?? []) {
      const q = typeof a?.name === 'string' ? quantityOf(a.name) : null
      if (q !== null) keep(inputs, { quantity: q, shape: named((a as { type?: unknown }).type).shape })
    }
    const returned = named(f.type)
    const outputs = new Map<string, Quantity>()
    for (const g of returned.name === null ? [] : (byName.get(returned.name)?.fields ?? [])) {
      const q = typeof g?.name === 'string' ? quantityOf(g.name) : null
      // The field's own LIST wrapper, and the one on the type carrying it, both make the answer many.
      if (q !== null) {
        const inner = named(g.type).shape
        keep(outputs, { quantity: q, shape: returned.shape === 'list' || inner === 'list' ? 'list' : 'scalar' })
      }
    }
    out.push({ api, verb: 'post', path: f.name, inputs: ordered(inputs), outputs: ordered(outputs) })
  }
  return out
}

/**
 * What must happen before two answers can be compared. A shared quantity is necessary and not
 * sufficient: the shapes decide whether the comparison is an equality or a whole aggregation nobody
 * has chosen yet.
 *
 * - `direct` — both scalar: one number against one number.
 * - `align` — both lists: element-wise, and ONLY once a common index is established (hour 3 of one is
 *   not hour 3 of the other unless something says so).
 * - `reduce` — one list, one scalar: the list must be aggregated or indexed first, and WHICH is a
 *   modelling decision (a mean is not a max is not the first element).
 * - `key` — a map on either side: the two must agree on a key space before anything is compared.
 */
export type CrossRelation = 'direct' | 'align' | 'reduce' | 'key'

/** One shared quantity and the relation its two shapes force. */
export interface SharedQuantity {
  readonly quantity: string
  readonly a: Shape
  readonly b: Shape
  readonly relation: CrossRelation
}

export interface CrossFormula {
  readonly a: DiscoveredMethod
  readonly b: DiscoveredMethod
  /** Input quantities both need — the shared question. */
  readonly over: readonly SharedQuantity[]
  /** Output quantities both answer — the comparable result. */
  readonly compares: readonly SharedQuantity[]
  /**
   * The hardest relation any compared quantity forces. `direct` is runnable as-is; anything else names
   * a decision a human still owes, which is why it is reported rather than resolved.
   */
  readonly relation: CrossRelation
}

/** The relation two shapes force. Symmetric — a cross has no preferred side. */
export function relationOf(a: Shape, b: Shape): CrossRelation {
  if (a === 'map' || b === 'map') return 'key'
  if (a === 'list' && b === 'list') return 'align'
  if (a === 'list' || b === 'list') return 'reduce'
  return 'direct'
}

const HARDNESS: Readonly<Record<CrossRelation, number>> = { direct: 0, reduce: 1, align: 2, key: 3 }

/** Quantities present on both sides, each carrying the relation its two shapes force. */
const shared = (x: readonly Quantity[], y: readonly Quantity[]): SharedQuantity[] => {
  const byName = new Map(y.map((q) => [q.quantity, q]))
  const out: SharedQuantity[] = []
  for (const q of x) {
    const other = byName.get(q.quantity)
    if (other === undefined) continue
    out.push({ quantity: q.quantity, a: q.shape, b: other.shape, relation: relationOf(q.shape, other.shape) })
  }
  // Sorted HERE, not by the caller: a cross is a set relation with no preferred side, and inheriting
  // one producer's array order made the same cross print two ways depending on who built the method.
  return out.sort((x, y) => x.quantity.localeCompare(y.quantity))
}

/**
 * Every cross the discovered methods imply — combinatorial, never authored.
 *
 * A candidate needs BOTH halves: a shared input (they answer about the same thing) and a shared
 * output quantity (their answers are comparable). Sharing only an output is two APIs reporting
 * unrelated temperatures; sharing only an input is two questions about one place.
 *
 * @invariant both methods are always from different APIs — an API never crosses itself
 * @invariant every returned cross has a non-empty `over` and `compares`
 */
export function crossFormulas(methods: readonly DiscoveredMethod[]): CrossFormula[] {
  const out: CrossFormula[] = []
  for (let i = 0; i < methods.length; i++) {
    for (let j = i + 1; j < methods.length; j++) {
      const a = methods[i]!
      const b = methods[j]!
      if (a.api === b.api) continue
      const over = shared(a.inputs, b.inputs)
      if (over.length === 0) continue
      // AN ECHO IS NOT A COMPARISON. Both APIs return the latitude they were given, so `latitude`
      // appears in `compares` for every geo pair — comparing it verifies that two services can quote
      // an argument back. The substantive quantities are the ones NOT in the shared question, and
      // without this refusal 64 of 64 candidates were dominated by coordinate echo.
      const asked = new Set(over.map((q) => q.quantity))
      const compares = shared(a.outputs, b.outputs).filter((q) => !asked.has(q.quantity))
      if (compares.length === 0) continue
      const relation = compares.reduce<CrossRelation>(
        (worst, q) => (HARDNESS[q.relation] > HARDNESS[worst] ? q.relation : worst),
        'direct',
      )
      out.push({ a, b, over, compares, relation })
    }
  }
  // A runnable cross first: `direct` needs no decision, and the rest name one. Within a relation, the
  // broader agreement leads.
  return out.sort(
    (x, y) =>
      HARDNESS[x.relation] - HARDNESS[y.relation] ||
      y.compares.length + y.over.length - (x.compares.length + x.over.length),
  )
}
