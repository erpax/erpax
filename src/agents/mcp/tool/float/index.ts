/**
 * MCP tools over [[float]] — a counted drawer, tray, armoury or till against its opening balance and movements.
 *
 * Every tool here is a PURE COMPUTATION over arguments the caller supplies: none reads a tenant's
 * rows, so none asserts a tenant (`_guards` is for tools that do, and adding it here is theatre).
 * The atom's refusals are restated in each description, because an MCP caller does not read a SKILL.
 *
 * @see /src/float/index.ts
 */
import { z } from 'zod'
import { makeToolI18n, type LocalizedString } from '@/agents/mcp/i18n'
import type { ErpaxMcpTool } from '@/agents/mcp/tool-defs'
import { reconcile } from '@/float'

const json = (v: unknown) => ({ content: [{ text: JSON.stringify(v, null, 2), type: 'text' as const }] })

const I18N: Record<string, LocalizedString> = {
  reconcile: {
    en: 'Reconcile a counted float — a bank drawer, a casino tray, an armoury, a public till — against its opening balance and movements. The total is DERIVED from a count of units; there is deliberately no way to supply a total. Variance is signed: an over is a different finding from a short.',
    bg: 'Равнение на преброена наличност спрямо начално салдо и движения. Сумата се ИЗВЕЖДА от броя единици; не може да се подаде общо число.',
    de: 'Abstimmung eines gezählten Bestands gegen Anfangsbestand und Bewegungen. Die Summe wird aus der Stückzählung ABGELEITET; eine Gesamtsumme kann nicht übergeben werden.',
  },
}

export function buildFloatTools(): ReadonlyArray<ErpaxMcpTool> {
  const t = makeToolI18n('erpax.float.reconcile')
  return [
    {
      name: 'erpax.float.reconcile',
      description: t.desc(I18N.reconcile!),
      parameters: {
        opening: z.number().describe('Opening float, in MINOR units.'),
        movements: z.array(z.object({ amount: z.number(), reference: z.string().optional() })),
        counted: z.record(z.string(), z.number()).describe('Count per unit, e.g. {"10000": 12} for twelve 100-euro notes.'),
        units: z.array(z.number()).describe('The unit set this float is counted in, descending.'),
      },
      async handler(args) {
        const counted: Record<number, number> = {}
        for (const [k, v] of Object.entries(args.counted as Record<string, number>)) counted[Number(k)] = v
        return json(
          reconcile(
            { opening: Number(args.opening), movements: args.movements as unknown as { amount: number }[], counted },
            args.units as number[],
          ),
        )
      },
    },
  ]
}
