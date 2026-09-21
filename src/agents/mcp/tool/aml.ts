/**
 * MCP tools over [[aml]] — whether a report is OWED on a set of movements — never whether money is clean.
 *
 * Every tool here is a PURE COMPUTATION over arguments the caller supplies: none reads a tenant's
 * rows, so none asserts a tenant ([[_guards]] is for tools that do, and adding it here is theatre).
 * The atom's refusals are restated in each description, because an MCP caller does not read a SKILL.
 *
 * @see /src/aml/index.ts
 */
import { z } from 'zod'
import { json, makeToolI18n, type ErpaxMcpTool, type LocalizedString } from './_contract'
import { holdBeforeExecuting, reportOwed } from '@/aml'

const I18N: Record<string, LocalizedString> = {
  report: {
    en: 'Whether a REPORT IS OWED on a set of movements (EU 2015/849 Art. 33): suspicious, threshold, or none. Structuring — movements just below a threshold, inside one window, together clearing it — is classed suspicious. A `none` verdict means NO TRIGGER FIRED; it is not a finding that the money is clean.',
    bg: 'Дали се дължи доклад (Art. 33): съмнителна, прагова или никаква. „none“ означава, че не е задействан праг — не че средствата са чисти.',
    de: 'Ob eine MELDUNG geschuldet ist (Art. 33): verdächtig, Schwellenwert oder keine. „none“ heißt: kein Auslöser — keine Unbedenklichkeitsfeststellung.',
  },
}

const MOVEMENT = z.object({ amount: z.number(), at: z.number(), sanctioned: z.boolean().optional(), flagged: z.boolean().optional() })

export function buildAmlTools(): ReadonlyArray<ErpaxMcpTool> {
  const t = makeToolI18n('erpax.aml.report')
  return [
    {
      name: 'erpax.aml.report',
      description: t.desc(I18N.report!),
      parameters: {
        movements: z.array(MOVEMENT),
        threshold: z.number().describe('The declaration threshold in euro for this institution and product.'),
        windowMs: z.number().optional(),
      },
      async handler(args) {
        const facts = args as unknown as Parameters<typeof reportOwed>[0]
        const kind = reportOwed(facts)
        return json({
          reportOwed: kind,
          holdBeforeExecuting: holdBeforeExecuting(kind),
          boundary: kind === 'none' ? 'No trigger fired. This is NOT a finding that the movements are clean.' : undefined,
        })
      },
    },
  ]
}
