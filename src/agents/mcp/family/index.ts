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
import { makeToolI18n, registerToolI18n, type LocalizedString } from '@/agents/mcp/i18n'
import type { ErpaxMcpTool, ToolRole } from '@/agents/mcp/tool-defs'

const LEGS: readonly ToolRole[] = ['measure', 'involute', 'act']

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
}
for (const [k, v] of Object.entries(I18N)) registerToolI18n(`erpax.family.${k}`, v)

export function buildFamilyTools(): ReadonlyArray<ErpaxMcpTool> {
  const t = makeToolI18n('erpax.family.trinities')
  return [
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
