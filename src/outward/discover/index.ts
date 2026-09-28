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

/** One operation a schema declares. */
export interface DiscoveredMethod {
  readonly api: string
  readonly verb: string
  readonly path: string
  /** Normalised parameter quantities — what the method must be TOLD. */
  readonly inputs: readonly string[]
  /** Normalised response-field quantities — what the method ANSWERS. */
  readonly outputs: readonly string[]
}

/**
 * Field name → quantity. DECLARED, in the open, because OpenAPI almost never carries units.
 *
 * This is the honest weak link of the pipeline and it is named rather than hidden: two fields both
 * called `temperature` are *probably* the same quantity, and nothing in the schema says so. A
 * `units`/`x-units` extension is preferred wherever a spec provides one.
 */
const QUANTITY: readonly (readonly [RegExp, string])[] = [
  [/^(lat|latitude)$/i, 'latitude'],
  [/^(lon|lng|long|longitude)$/i, 'longitude'],
  [/^(date|day|dt|datetime|timestamp)$/i, 'instant'],
  [/temp(erature)?/i, 'temperature'],
  [/^(distance|dist|length_m|meters|metres)$/i, 'distance'],
  [/^(alt|altitude|elevation)$/i, 'altitude'],
  [/^(velocity|speed)$/i, 'speed'],
  [/^(currency|base|from|to|symbol)$/i, 'currency'],
  [/^(rate|price|amount|value)$/i, 'money'],
  [/^(magnitude|mag)$/i, 'magnitude'],
  [/^(population|pop)$/i, 'population'],
  [/^(pressure|hpa|mbar)$/i, 'pressure'],
  [/^(humidity|rh)$/i, 'humidity'],
]

/** The quantity a field name denotes, or null when nothing declared covers it. */
export function quantityOf(field: string): string | null {
  for (const [re, q] of QUANTITY) if (re.test(field)) return q
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
function leafFields(node: unknown, root: Record<string, unknown>, depth = 0, seen = new Set<unknown>()): string[] {
  if (depth > 8 || node === null || typeof node !== 'object') return []
  const here = deref(node, root)
  if (here === null || typeof here !== 'object' || seen.has(here)) return []
  seen.add(here)
  const out: string[] = []
  const o = here as Record<string, unknown>
  const props = o.properties as Record<string, unknown> | undefined
  if (props !== undefined) for (const k of Object.keys(props)) out.push(k)
  for (const v of Object.values(o)) out.push(...leafFields(v, root, depth + 1, seen))
  return out
}

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
      ].map((p) => deref(p, spec) as { name?: string } | undefined)
      const inputs = new Set<string>()
      for (const p of params) {
        const q = typeof p?.name === 'string' ? quantityOf(p.name) : null
        if (q !== null) inputs.add(q)
      }
      // An OpenAPI 3 request body carries inputs too.
      for (const f of leafFields(o.requestBody, spec)) {
        const q = quantityOf(f)
        if (q !== null) inputs.add(q)
      }
      const outputs = new Set<string>()
      for (const f of leafFields(o.responses, spec)) {
        const q = quantityOf(f)
        if (q !== null) outputs.add(q)
      }
      if (inputs.size === 0 && outputs.size === 0) continue
      out.push({ api, verb: verb.toLowerCase(), path, inputs: [...inputs].sort(), outputs: [...outputs].sort() })
    }
  }
  return out
}

/** A cross the schemas imply: two methods from DIFFERENT apis, same question, same answer-quantity. */
export interface CrossFormula {
  readonly a: DiscoveredMethod
  readonly b: DiscoveredMethod
  /** Input quantities both need — the shared question. */
  readonly over: readonly string[]
  /** Output quantities both answer — the comparable result. */
  readonly compares: readonly string[]
}

const shared = (x: readonly string[], y: readonly string[]): string[] => x.filter((v) => y.includes(v))

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
      const compares = shared(a.outputs, b.outputs).filter((q) => !over.includes(q))
      if (compares.length === 0) continue
      out.push({ a, b, over, compares })
    }
  }
  return out.sort((x, y) => y.compares.length + y.over.length - (x.compares.length + x.over.length))
}
