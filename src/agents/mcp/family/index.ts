/**
 * agents/mcp/family — the MCP surface read as trinity families.
 *
 * Every tool lives in a family `erpax.<area>.*`, and a family is a TRINITY when it offers the
 * three legs a turn needs: `measure` (what is), `involute` (the dual seat — what refutes it) and
 * `act` (the computed manifest the scalpel applies — never a hand). Three is the one ring a single
 * turn each way closes ([[quantum]]/coil), which is why a family wants exactly these three and not a
 * fourth. A family missing a leg names its own next tool; that list IS the next development of the
 * surface, measured rather than decided.
 *
 * Roles are DECLARED on each tool, never read off its name — a name is a guess.
 *
 * @see ./SKILL.md
 */
import { z } from 'zod'
import ts from 'typescript'
import { relative } from 'node:path'
import { makeToolI18n, registerToolI18n, type LocalizedString } from '@/agents/mcp/i18n'
import type { ErpaxMcpTool, ToolRole } from '@/agents/mcp/tool-defs'
import { applyScalpel, planScalpel, type ScalpelOp, type ScalpelPlan } from '@/scalpel'
import { astOf, clearCache, corpusFiles } from '@/syntax/cache'

const LEGS: readonly ToolRole[] = ['measure', 'involute', 'act']

// ─── the INVOLUTE leg — a declared role asked against the body's shape ──────────────────────────

/**
 * Calls whose presence in a handler body make the tool an ACT: it writes rows, files or the tree. A
 * name is a guess ([[rules]]/probe); a write call is a fact of the grammar. Declared in the open.
 */
export const WRITE_CALLS: ReadonlySet<string> = new Set([
  'create',
  'update',
  'delete',
  'writeFileSync',
  'writeFile',
  'appendFileSync',
  'mkdirSync',
  'rmSync',
  'unlinkSync',
  'renameSync',
  'applyScalpel',
  'writeHarvest',
])

export interface ShapeRole {
  readonly name: string
  readonly file: string
  readonly line: number
  /** The leg the tool declares, or null. */
  readonly declared: ToolRole | null
  /** What the body says: it writes (act) or only reads (measure). The involute leg is never inferred — a dual is a claim, not a shape. */
  readonly shape: 'act' | 'measure'
  /** declared ∧ shape disagree in the one direction the grammar can see: a measure or involute that writes. */
  readonly lie: boolean
}

const isNameProp = (p: ts.ObjectLiteralElementLike): p is ts.PropertyAssignment =>
  ts.isPropertyAssignment(p) && ts.isIdentifier(p.name) && p.name.text === 'name'

/** Every `{ name: 'erpax.<a>.<b>', … }` literal in the files under `src/agents/mcp`, with its declared role and the shape of its handler. */
export function shapeRoles(cwd: string = process.cwd()): ShapeRole[] {
  const out: ShapeRole[] = []
  // a test file's object literals are fixtures, not tools — both spellings a test takes here
  const files = corpusFiles(cwd).filter((f) => f.includes('/src/agents/mcp/') && !/(?:\/|\.)test\.tsx?$/.test(f))
  for (const file of files) {
    const sf = astOf(file)
    const visit = (n: ts.Node): void => {
      if (ts.isObjectLiteralExpression(n)) {
        const nameProp = n.properties.find(isNameProp)
        const init = nameProp?.initializer
        // only a tool addressed by a plain literal is a tool a reader can find by name — a template is a family of tools, declared at its generator
        if (nameProp && init && ts.isStringLiteral(init) && /^erpax\.[a-z]+\./.test(init.text)) {
          const roleProp = n.properties.find((p): p is ts.PropertyAssignment => ts.isPropertyAssignment(p) && ts.isIdentifier(p.name) && p.name.text === 'role')
          const declared = roleProp && ts.isStringLiteral(roleProp.initializer) && (LEGS as readonly string[]).includes(roleProp.initializer.text) ? (roleProp.initializer.text as ToolRole) : null
          const handler = n.properties.find((p) => (ts.isMethodDeclaration(p) || ts.isPropertyAssignment(p)) && ts.isIdentifier(p.name) && p.name.text === 'handler')
          let writes = false
          const scan = (m: ts.Node): void => {
            if (ts.isCallExpression(m) && ts.isPropertyAccessExpression(m.expression) && WRITE_CALLS.has(m.expression.name.text)) writes = true
            if (ts.isCallExpression(m) && ts.isIdentifier(m.expression) && WRITE_CALLS.has(m.expression.text)) writes = true
            if (!writes) ts.forEachChild(m, scan)
          }
          if (handler) scan(handler)
          const shape = writes ? 'act' : 'measure'
          out.push({
            name: init.text,
            file: relative(cwd, file),
            line: sf.getLineAndCharacterOfPosition(nameProp.getStart(sf)).line + 1,
            declared,
            shape,
            lie: declared !== null && declared !== 'act' && shape === 'act',
          })
        }
      }
      ts.forEachChild(n, visit)
    }
    visit(sf)
  }
  return out.sort((a, b) => a.name.localeCompare(b.name))
}

// ─── the ACT leg — the undeclared tools declared by manifest, never by hand ──────────────────────

/** A line that is the `name:` property and nothing else — the only line a role line can follow. */
const NAME_LINE = /^\s*name:\s*'[^']+',?\s*$/

/**
 * One scalpel op per undeclared tool: the `name:` line is the unique anchor, the role line follows
 * it. A tool written on ONE line has no such anchor — writing after the line would land after the
 * closing brace, which is how the first run broke a test fixture — so it is refused and named.
 */
export function declareOps(rows: readonly ShapeRole[], cwd: string = process.cwd()): { ops: ScalpelOp[]; unanchored: ShapeRole[] } {
  const ops: ScalpelOp[] = []
  const unanchored: ShapeRole[] = []
  for (const r of rows) {
    if (r.declared !== null) continue
    const lines = astOf(`${cwd}/${r.file}`).getFullText().split('\n')
    const line = lines[r.line - 1] as string
    if (!NAME_LINE.test(line)) {
      unanchored.push(r)
      continue
    }
    const indent = /^\s*/.exec(line)?.[0] ?? ''
    ops.push({
      file: r.file,
      find: line,
      replace: `${line}\n${indent}role: '${r.shape}',`,
      reason: `${r.name} declares no leg; its handler ${r.shape === 'act' ? 'writes (a call in WRITE_CALLS)' : 'only reads'}, so the grammar places it in ${r.shape} — the involute leg is never inferred, a dual is a claim`,
    })
  }
  return { ops, unanchored }
}

export interface Declaration {
  readonly undeclared: number
  readonly ops: readonly ScalpelOp[]
  /** Undeclared tools whose `name:` shares its line with the rest of the object — no anchor, so no cut. */
  readonly unanchored: readonly ShapeRole[]
  readonly plan: ScalpelPlan
  readonly applied: boolean
  readonly lies: readonly ShapeRole[]
}

/** The act: plan (and, only when asked, apply through the scalpel's ring) the declarations the shapes decide. */
export function declareRoles(cwd: string = process.cwd(), apply = false): Declaration {
  const rows = shapeRoles(cwd)
  const { ops, unanchored } = declareOps(rows, cwd)
  const lies = rows.filter((r) => r.lie)
  if (!apply) return { undeclared: ops.length + unanchored.length, ops, unanchored, plan: planScalpel(ops, cwd), applied: false, lies }
  const result = applyScalpel(ops, {
    cwd,
    apply: true,
    verify: () => {
      clearCache() // the ring re-parses the files the batch just wrote, never the cached tree
      return shapeRoles(cwd).filter((r) => r.declared === null).length < ops.length
    },
  })
  clearCache()
  return { undeclared: ops.length + unanchored.length, ops, unanchored, plan: result.plan, applied: result.complete, lies }
}

export interface FamilyTrinity {
  readonly area: string
  readonly tools: readonly string[]
  /** Leg → the tools declared in it. */
  readonly legs: Readonly<Record<ToolRole, readonly string[]>>
  /** Tools that declare no leg — unplaced, so the family cannot be read as a trinity through them. */
  readonly undeclared: readonly string[]
  /** Legs the family has no tool for. */
  readonly missing: readonly ToolRole[]
  readonly trinity: boolean
}

/** Group a surface into families by the `erpax.<area>.` prefix. */
export function familiesOf(tools: ReadonlyArray<Pick<ErpaxMcpTool, 'name' | 'role'>>): Map<string, Pick<ErpaxMcpTool, 'name' | 'role'>[]> {
  const out = new Map<string, Pick<ErpaxMcpTool, 'name' | 'role'>[]>()
  for (const t of tools) {
    const m = /^erpax\.([a-z]+)\./.exec(t.name)
    if (!m) continue
    const area = m[1] as string
    out.set(area, [...(out.get(area) ?? []), t])
  }
  return out
}

/** Every family's trinity status — pure over the declared roles. */
export function trinityReport(tools: ReadonlyArray<Pick<ErpaxMcpTool, 'name' | 'role'>>): FamilyTrinity[] {
  const out: FamilyTrinity[] = []
  for (const [area, members] of familiesOf(tools)) {
    const legs: Record<ToolRole, string[]> = { measure: [], involute: [], act: [] }
    const undeclared: string[] = []
    for (const t of members) {
      if (t.role) legs[t.role].push(t.name)
      else undeclared.push(t.name)
    }
    const missing = LEGS.filter((l) => legs[l].length === 0)
    out.push({ area, tools: members.map((t) => t.name).sort(), legs, undeclared: undeclared.sort(), missing, trinity: missing.length === 0 })
  }
  return out.sort((a, b) => Number(b.trinity) - Number(a.trinity) || a.missing.length - b.missing.length || a.area.localeCompare(b.area))
}

const I18N: Record<string, LocalizedString> = {
  trinities: {
    en: 'The MCP surface read as trinity families: every `erpax.<area>.*` family with its declared legs — measure (what is) · involute (the dual seat) · act (the computed manifest the scalpel applies, never a hand). A family with all three closes in one turn; one missing a leg names its own next tool, so `missing` IS the next development of the surface. Roles are declared on the tools, not read off their names. Cheap: reads the live tool list, no scan.',
    bg: 'MCP повърхността като тройни семейства: всяко семейство erpax.<area>.* с обявените си крака — measure · involute · act. Семейство с всичките три се затваря с един оборот; липсващ крак назовава следващия инструмент.',
    de: 'Die MCP-Oberfläche als Dreiheits-Familien: jede erpax.<area>.*-Familie mit ihren erklärten Beinen — measure · involute · act. Eine Familie mit allen dreien schließt sich in einer Drehung; ein fehlendes Bein benennt das nächste Werkzeug.',
  },
  roles: {
    en: 'The INVOLUTE leg of the family trinity: every `erpax.<area>.<leg>` tool addressed by a literal name, with the leg it DECLARES against the leg its handler\'s SHAPE implies — a body that calls create/update/delete/writeFile… is an act, a body that only reads is a measure; the involute leg is never inferred, because a dual is a claim and not a shape. A measure or involute that writes is a LIE about the surface. Parsed from the grammar (ts.ObjectLiteralExpression), never from the name. One parse of src/agents/mcp.',
    bg: 'Кракът ИНВОЛЮЦИЯ на семейната тройка: всеки инструмент с обявения си крак срещу крака, който формата на тялото му предполага — тяло, което пише, е act; тяло, което само чете, е measure. Measure, който пише, е лъжа.',
    de: 'Das INVOLUTE-Bein der Familien-Dreiheit: jedes Werkzeug mit dem Bein, das es erklärt, gegen das Bein, das die Form seines Handlers impliziert — ein Körper, der schreibt, ist act; einer, der nur liest, measure. Ein schreibendes measure ist eine Lüge.',
  },
  declare: {
    en: 'The ACT leg of the family trinity: the tools that declare no leg, declared by MANIFEST — one scalpel op per tool (the `name:` line is the unique anchor; `role: <shape>` follows it, the shape the handler\'s body decides). Dry-run by default: the plan names every refusal. `apply: true` cuts through the scalpel\'s ring, batch by batch, verified by re-parsing until no literal-named tool is undeclared. Nothing is decided by hand; a template-named family is declared at its generator.',
    bg: 'Кракът ДЕЙСТВИЕ: инструментите без обявен крак, обявени чрез манифест — една операция за скалпела на инструмент. По подразбиране само план; apply: true реже през пръстена на скалпела.',
    de: 'Das ACT-Bein: Werkzeuge ohne erklärtes Bein, per MANIFEST erklärt — eine Skalpell-Operation pro Werkzeug. Standardmäßig nur Plan; apply: true schneidet durch den Ring des Skalpells.',
  },
}
for (const [k, v] of Object.entries(I18N)) registerToolI18n(`erpax.family.${k}`, v)

export function buildFamilyTools(): ReadonlyArray<ErpaxMcpTool> {
  const t = makeToolI18n('erpax.family.trinities')
  const tRoles = makeToolI18n('erpax.family.roles')
  const tDeclare = makeToolI18n('erpax.family.declare')
  const json = (v: unknown) => ({ content: [{ type: 'text' as const, text: JSON.stringify(v, null, 2) }] })
  return [
    {
      name: 'erpax.family.roles',
      role: 'involute',
      description: tRoles.desc(I18N.roles!),
      parameters: { area: z.string().optional(), only: z.enum(['lies', 'undeclared']).optional() },
      async handler(args) {
        const rows = shapeRoles(process.cwd())
        const area = typeof args.area === 'string' ? args.area : undefined
        let out = area ? rows.filter((r) => r.name.startsWith(`erpax.${area}.`)) : rows
        if (args.only === 'lies') out = out.filter((r) => r.lie)
        if (args.only === 'undeclared') out = out.filter((r) => r.declared === null)
        return json({
          tools: rows.length,
          declared: rows.filter((r) => r.declared !== null).length,
          undeclared: rows.filter((r) => r.declared === null).length,
          lies: rows.filter((r) => r.lie).length,
          byShape: { act: rows.filter((r) => r.shape === 'act').length, measure: rows.filter((r) => r.shape === 'measure').length },
          rows: out,
          law: 'A declared leg is a claim about the surface; the body is its dual. A measure that writes is refuted by its own grammar — the involute leg is never inferred, a dual is a claim.',
        })
      },
    },
    {
      name: 'erpax.family.declare',
      role: 'act',
      description: tDeclare.desc(I18N.declare!),
      parameters: { apply: z.boolean().optional() },
      async handler(args) {
        const d = declareRoles(process.cwd(), args.apply === true)
        return json({
          undeclared: d.undeclared,
          unanchored: d.unanchored,
          applied: d.applied,
          refused: d.plan.refused,
          ops: d.ops.map((o) => ({ file: o.file, find: o.find.trim(), replace: o.replace.trim().split('\n').pop(), reason: o.reason })),
          verdicts: d.plan.verdicts.filter((v) => v.state !== 'cuts'),
          lies: d.lies,
          law: 'A tool is placed in its leg by what its body does, written once at the name line by the scalpel — exactly-once-or-refuse, ring-verified — never by a hand reading the name.',
        })
      },
    },
    {
      name: 'erpax.family.trinities',
      role: 'measure',
      description: t.desc(I18N.trinities!),
      parameters: { area: z.string().optional().describe('one family, e.g. frontier · gate · quantum') },
      async handler(args) {
        const { buildErpaxMcpTools } = await import('@/agents/mcp/tool-defs')
        const { agentRegistry } = await import('@/agent')
        const all = trinityReport(buildErpaxMcpTools(agentRegistry))
        const area = typeof args.area === 'string' ? args.area : undefined
        const rows = area ? all.filter((f) => f.area === area) : all
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify(
                {
                  families: all.length,
                  trinities: all.filter((f) => f.trinity).map((f) => f.area),
                  next: all.filter((f) => !f.trinity && f.undeclared.length === 0).map((f) => ({ area: f.area, missing: f.missing })),
                  undeclared: all.filter((f) => f.undeclared.length > 0).map((f) => ({ area: f.area, tools: f.undeclared })),
                  rows,
                  law: 'A family is a trinity when it measures, involutes and acts; three is the one ring a single turn each way closes. A missing leg is the next tool, computed; an undeclared tool is a family that cannot yet be read.',
                },
                null,
                2,
              ),
            },
          ],
        }
      },
    },
  ]
}
