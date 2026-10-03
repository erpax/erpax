/**
 * Witness MCP tool family — cross-domain proofs on the public surface, combinatorially.
 *
 * `erpax.witness.cross` runs one named cross and judges it; `erpax.witness.discover` derives the
 * crosses the world's own schemas imply, so the surface is not limited to what anyone typed here.
 *
 * @standard MCP 0.6 — tools/list + tools/call result shape {content:[{type,text}]}
 * @see ../../../outward/witness — ../../../outward/discover
 */
import { z } from 'zod'
import { crossWitness, fetchJson, type CrossKind } from '@/outward/witness'
import { crossFormulas, discoverApis, discoverGraphql, discoverMethods, sharedNotation } from '@/outward/discover'
import { makeToolI18n, registerToolI18n, type LocalizedString } from '@/agents/mcp/i18n'
import type { ErpaxMcpTool } from '@/agents/mcp/tool-defs'

const text = (s: string) => ({ content: [{ text: s, type: 'text' as const }] })
const json = (v: unknown) => text(JSON.stringify(v, null, 2))

const KINDS = ['iss', 'fx', 'solar', 'route', 'weather'] as const

const I18N: Record<string, LocalizedString> = {
  cross: {
    en: 'Run one cross-domain check and judge it: two sources answering one question, where the independent leg is a THEOREM wherever possible (√(μ/r) for orbital speed, arbitrage-free closure for a rate table, cos H = −tanφ·tanδ for day length, great-circle for a route floor). Returns corroborated | divergent | single | silent. A single source is reported as a claim, never as evidence, and two providers sharing an upstream model are named as such. `tolerance` is yours: what counts as agreement belongs to the question.',
    bg: 'Изпълнява една кръстосана проверка между домейни: два източника отговарят на един въпрос, а независимото рамо е ТЕОРЕМА където е възможно. Връща corroborated | divergent | single | silent. Един източник е твърдение, не доказателство.',
    de: 'Führt eine domänenübergreifende Prüfung aus: zwei Quellen auf eine Frage, wobei das unabhängige Bein möglichst ein THEOREM ist. Liefert corroborated | divergent | single | silent. Eine Quelle ist eine Behauptung, kein Beweis.',
    fr: "Exécute un croisement inter-domaines : deux sources pour une question, la jambe indépendante étant un THÉORÈME quand c'est possible. Renvoie corroborated | divergent | single | silent. Une seule source est une affirmation, pas une preuve.",
  },
  discover: {
    en: 'Derive cross formulas from the world\'s own machine-readable schemas instead of a hand-picked list: reads an APIs.guru-shaped registry (2,529 APIs), fetches OpenAPI/Swagger documents, extracts operations whose parameters and responses carry a QUANTITY, and returns every pair from different APIs sharing both a question and a comparable answer. An echo is refused — a returned input is not a comparison. EXPENSIVE: one fetch per API. Discovery is not provability: the richest crosses require API keys.',
    bg: 'Извлича кръстосани формули от машинно четимите схеми на света вместо от ръчно подбран списък. СКЪПО: една заявка на API. Откриването не е доказуемост: най-богатите кръстосвания изискват ключове.',
    de: 'Leitet Kreuzformeln aus den maschinenlesbaren Schemata der Welt ab statt aus einer handverlesenen Liste. TEUER: ein Abruf pro API. Entdeckung ist keine Beweisbarkeit: die reichsten Kreuze brauchen Schlüssel.',
    fr: "Dérive les formules de croisement des schémas lisibles par machine du monde plutôt que d'une liste choisie à la main. COÛTEUX : un appel par API. Découvrir n'est pas prouver : les croisements les plus riches exigent des clés.",
  },
}

for (const [k, v] of Object.entries(I18N)) registerToolI18n(`erpax.witness.${k}`, v)

/**
 * The introspection query. One level of `ofType` and no more, because that is all `discoverGraphql`
 * reads: a GraphQL response shape is the caller's choice, so asking deeper would fetch a query nobody
 * wants. Module-private — this is its only caller, and a single-use export is un-folded weight.
 */
const INTROSPECTION =
  '{ __schema { queryType { name } types { name kind fields { name args { name } type { name kind ofType { name kind } } } } } }'

export function buildWitnessTools(): ReadonlyArray<ErpaxMcpTool> {
  const tCross = makeToolI18n('erpax.witness.cross')
  const tDiscover = makeToolI18n('erpax.witness.discover')
  return [
    {
      name: 'erpax.witness.cross',
      description: tCross.desc(I18N.cross!),
      parameters: {
        kind: z.enum(KINDS),
        latitude: z.number().min(-90).max(90).optional(),
        longitude: z.number().min(-180).max(180).optional(),
        toLatitude: z.number().min(-90).max(90).optional(),
        toLongitude: z.number().min(-180).max(180).optional(),
        tolerance: z.number().positive(),
        dayOfYear: z.number().int().min(1).max(366).optional(),
      },
      async handler(args) {
        const at =
          args.latitude === undefined || args.longitude === undefined
            ? undefined
            : { latitude: args.latitude as number, longitude: args.longitude as number, elevation: 0 }
        const to =
          args.toLatitude === undefined || args.toLongitude === undefined
            ? undefined
            : { latitude: args.toLatitude as number, longitude: args.toLongitude as number, elevation: 0 }
        const c = await crossWitness({
          kind: args.kind as CrossKind,
          at,
          to,
          dayOfYear: args.dayOfYear as number | undefined,
          tolerance: args.tolerance as number,
        })
        return json({
          ...c,
          law: 'One source is a claim, two sources are evidence, and two sources sharing an upstream are one source wearing two names. Anchor a cross on something DERIVED.',
        })
      },
    },
    {
      name: 'erpax.witness.discover',
      description: tDiscover.desc(I18N.discover!),
      parameters: {
        match: z.string().min(2),
        limit: z.number().int().min(1).max(20).optional(),
        graphql: z.string().url().optional(),
      },
      async handler(args) {
        const re = new RegExp(args.match as string, 'i')
        // A POST-only endpoint has ONE path and no OpenAPI document, so it is discovered by asking it
        // to describe itself. Open Targets is the case that forced this: its registry entry serves a
        // 2019 REST spec whose endpoints now 404, so the registry route reads the live API as absent.
        const graphql = args.graphql as string | undefined
        const fromGraphql =
          graphql === undefined ? [] : discoverGraphql(graphql, await fetchJson(graphql, { query: INTROSPECTION }))
        const apis = discoverApis(await fetchJson('https://api.apis.guru/v2/list.json'))
        const want = apis.filter((a) => re.test(`${a.name} ${a.title}`)).slice(0, (args.limit as number | undefined) ?? 10)
        const methods = [...fromGraphql]
        const unreachable: string[] = []
        for (const a of want) {
          try {
            methods.push(...discoverMethods(a.name, await fetchJson(a.schemaUrl)))
          } catch {
            unreachable.push(a.name)
          }
        }
        const crosses = crossFormulas(methods)
        return json({
          registry: apis.length,
          graphql: graphql === undefined ? null : { url: graphql, methods: fromGraphql.length },
          matched: want.map((a) => a.name),
          unreachable,
          methods: methods.length,
          crosses: crosses.length,
          // How many crosses are RUNNABLE as they stand, against how many owe a modelling decision.
          runnable: crosses.filter((c) => c.relation === 'direct').length,
          byRelation: crosses.reduce<Record<string, number>>((acc, c) => {
            acc[c.relation] = (acc[c.relation] ?? 0) + 1
            return acc
          }, {}),
          top: crosses.slice(0, 10).map((c) => ({
            a: `${c.a.api} ${c.a.path}`,
            b: `${c.b.api} ${c.b.path}`,
            over: c.over.map(sharedNotation),
            compares: c.compares.map(sharedNotation),
            relation: c.relation,
          })),
          law: 'Do not author the crosses. Discover what answers what, and let the pairs fall out — then say which you may actually run. A shared quantity in two SHAPES is not a comparison yet: `[temperature]` against `temperature` owes an aggregation nobody has chosen.',
        })
      },
    },
  ]
}

/** @index-cross.foldback child=agents/mcp/tool/witness parent=agents/mcp/tool — this cross folds back into its parent. */
