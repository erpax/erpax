/**
 * MCP tools over [[staffing]] — a declared position folded into the five faces it already implied.
 *
 * Every tool here is a PURE COMPUTATION over arguments the caller supplies: none reads a tenant's
 * rows, so none asserts a tenant (`_guards` is for tools that do, and adding it here is theatre).
 * The atom's refusals are restated in each description, because an MCP caller does not read a SKILL.
 *
 * @see /src/staffing/index.ts
 */
import { z } from 'zod'
import { makeToolI18n, type LocalizedString } from '@/agents/mcp/i18n'
import type { ErpaxMcpTool } from '@/agents/mcp/tool-defs'
import { staff } from '@/staffing'

const json = (v: unknown) => ({ content: [{ text: JSON.stringify(v, null, 2), type: 'text' as const }] })

const I18N: Record<string, LocalizedString> = {
  position: {
    en: 'Fold a declared position into everything it implies: job description, competency gap, training plan in the order it must run, access capability and cost at the caller’s own anchor rate. Two inputs, five derived faces — the rest was never a question.',
    bg: 'Сгъва длъжност до всичко произтичащо: описание, пропуски в компетенции, план за обучение, достъп и цена при собствена базова ставка.',
    de: 'Faltet eine deklarierte Position in alles Abgeleitete: Stellenbeschreibung, Kompetenzlücke, Schulungsplan, Zugriffsrecht und Kosten zum eigenen Ankersatz.',
  },
}

export function buildStaffingTools(): ReadonlyArray<ErpaxMcpTool> {
  const t = makeToolI18n('erpax.staffing.position')
  return [
    {
      name: 'erpax.staffing.position',
      description: t.desc(I18N.position!),
      parameters: {
        position: z.object({
          title: z.string(),
          harmonic: z.number().describe('Leverage tier >= 1; the rate is anchor x harmonic.'),
          level: z.number().describe('SFIA responsibility level 1..7.'),
          function: z.string(),
        }),
        required: z.array(z.object({ competency: z.string(), minProficiency: z.number().optional(), mandatory: z.boolean().optional() })),
        held: z.array(z.object({ competency: z.string(), proficiency: z.number().optional() })).optional(),
        capability: z.enum(['read', 'write', 'sign', 'admin', 'audit']),
        anchor: z.number().optional().describe("The bank's own base hourly rate."),
        hours: z.number().optional(),
      },
      async handler(args) {
        return json(staff(args as unknown as Parameters<typeof staff>[0]))
      },
    },
  ]
}
