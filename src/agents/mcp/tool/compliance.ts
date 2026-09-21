/**
 * MCP tools over the compliance atoms — the door those atoms did not have.
 *
 * [[kyc]], [[aml]], [[risk]], [[float]] and [[staffing]] were built as pure functions and reachable
 * from nothing: 56 tools on this surface and zero of them. A capability with no surface is
 * indistinguishable from an absent capability, which is the finding this session made three
 * separate ways — six atoms computing a position with nothing joining them, a uuid→CSS bridge with
 * no consumer, and this.
 *
 * Every tool here is a PURE COMPUTATION over arguments the caller supplies. None reads a tenant's
 * data, so none asserts a tenant: `assertTenantMatch` guards tools that reach a tenant's rows, and
 * adding it where nothing is read would be theatre.
 *
 * WHAT THESE TOOLS REFUSE TO ANSWER, carried from the atoms and restated because an MCP caller does
 * not read a SKILL: none decides whether money was laundered or whether a customer is guilty. They
 * compute what the law OBLIGES given facts someone else established.
 *
 * @see /src/kyc/index.ts · /src/aml/index.ts · /src/risk/index.ts · /src/float/index.ts
 */
import { z } from 'zod'
import { makeToolI18n, type LocalizedString } from '../i18n'
import type { ErpaxMcpTool } from '../tool-defs'
import { diligenceLevel, dueDiligenceRequired, evidenceMissing, identificationComplete } from '@/kyc'
import { holdBeforeExecuting, reportOwed } from '@/aml'
import { concentration } from '@/risk'
import { reconcile } from '@/float'
import { staff } from '@/staffing'

const text = (s: string) => ({ content: [{ text: s, type: 'text' as const }] })
const json = (v: unknown) => text(JSON.stringify(v, null, 2))

const I18N: Record<string, LocalizedString> = {
  diligence: {
    en: 'Customer due diligence LEVEL the directive obliges (EU 2015/849), given established facts. Enhanced dominates: a PEP or high-risk third country mandates EDD and no lower-risk finding reduces it. Returns the level, whether diligence is owed at all, and which evidence items are missing. It does NOT decide whether a customer is guilty of anything.',
    bg: 'Ниво на комплексна проверка (EU 2015/849) според установени факти. Разширената проверка е задължителна при ПЕЛ или високорискова трета държава. Не отсъжда вина.',
    de: 'Sorgfaltspflicht-STUFE nach EU 2015/849 auf Basis festgestellter Tatsachen. Verstärkte Sorgfalt dominiert und wird durch kein Niedrigrisiko-Merkmal gemindert. Trifft keine Schuldfeststellung.',
  },
  report: {
    en: 'Whether a REPORT IS OWED on a set of movements (EU 2015/849 Art. 33): suspicious, threshold, or none. Structuring — movements just below a threshold, inside one window, together clearing it — is classed suspicious. A `none` verdict means NO TRIGGER FIRED; it is not a finding that the money is clean.',
    bg: 'Дали се дължи доклад (Art. 33): съмнителна, прагова или никаква. „none“ означава, че не е задействан праг — не че средствата са чисти.',
    de: 'Ob eine MELDUNG geschuldet ist (Art. 33): verdächtig, Schwellenwert oder keine. „none“ heißt: kein Auslöser — keine Unbedenklichkeitsfeststellung.',
  },
  concentration: {
    en: 'Large-exposure concentration against Tier 1 capital (CRR Art. 392/395). Exposures are AGGREGATED BY CONNECTED CLIENT before testing, because a borrower split across three names sits under the limit while the real exposure sits over it. Large (report) and breach (cure) are returned as separate lists.',
    bg: 'Концентрация на големи експозиции спрямо капитал от първи ред (CRR 392/395). Агрегира по свързани клиенти ПРЕДИ проверката.',
    de: 'Großkredit-Konzentration gegen Kernkapital (CRR Art. 392/395). Aggregiert VOR der Prüfung nach verbundenen Kunden.',
  },
  reconcile: {
    en: 'Reconcile a counted float — a bank drawer, a casino tray, an armoury, a public till — against its opening balance and movements. The total is DERIVED from a count of units; there is deliberately no way to supply a total. Variance is signed: an over is a different finding from a short.',
    bg: 'Равнение на преброена наличност спрямо начално салдо и движения. Сумата се ИЗВЕЖДА от броя единици; не може да се подаде общо число.',
    de: 'Abstimmung eines gezählten Bestands gegen Anfangsbestand und Bewegungen. Die Summe wird aus der Stückzählung ABGELEITET; eine Gesamtsumme kann nicht übergeben werden.',
  },
  position: {
    en: 'Fold a declared position into everything it implies: job description, competency gap, training plan in the order it must run, access capability and cost at the caller’s own anchor rate. Two inputs, five derived faces — the rest was never a question.',
    bg: 'Сгъва длъжност до всичко произтичащо: описание, пропуски в компетенции, план за обучение, достъп и цена при собствена базова ставка.',
    de: 'Faltet eine deklarierte Position in alles Abgeleitete: Stellenbeschreibung, Kompetenzlücke, Schulungsplan, Zugriffsrecht und Kosten zum eigenen Ankersatz.',
  },
}

const MOVEMENT = z.object({ amount: z.number(), at: z.number(), sanctioned: z.boolean().optional(), flagged: z.boolean().optional() })
const EXPOSURE = z.object({ client: z.string(), group: z.string().optional(), amount: z.number() })

export function buildComplianceTools(): ReadonlyArray<ErpaxMcpTool> {
  const tDiligence = makeToolI18n('erpax.kyc.diligence')
  const tReport = makeToolI18n('erpax.aml.report')
  const tConcentration = makeToolI18n('erpax.risk.concentration')
  const tReconcile = makeToolI18n('erpax.float.reconcile')
  const tPosition = makeToolI18n('erpax.staffing.position')

  return [
    {
      name: 'erpax.kyc.diligence',
      description: tDiligence.desc(I18N.diligence!),
      parameters: {
        politicallyExposed: z.boolean().optional(),
        highRiskThirdCountry: z.boolean().optional(),
        ongoingRelationship: z.boolean().optional(),
        amount: z.number().optional().describe('Euro amount of the movement under consideration.'),
        wireTransfer: z.boolean().optional(),
        cash: z.boolean().optional(),
        lowRiskProduct: z.boolean().optional(),
        evidenceProduced: z.array(z.string()).optional().describe('Evidence items the file already holds.'),
      },
      async handler(args) {
        const facts = args as unknown as Parameters<typeof diligenceLevel>[0]
        const level = diligenceLevel(facts)
        const produced = (args.evidenceProduced as string[] | undefined) ?? []
        return json({
          level,
          diligenceRequired: dueDiligenceRequired(facts),
          evidenceMissing: evidenceMissing(level, produced),
          complete: identificationComplete(level, produced),
          boundary: 'Completeness is a property of the item SET, never of what an item contains.',
        })
      },
    },
    {
      name: 'erpax.aml.report',
      description: tReport.desc(I18N.report!),
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
    {
      name: 'erpax.risk.concentration',
      description: tConcentration.desc(I18N.concentration!),
      parameters: {
        exposures: z.array(EXPOSURE),
        tier1: z.number().describe('Tier 1 capital, same unit as the exposures.'),
      },
      async handler(args) {
        return json(concentration(args.exposures as unknown as Parameters<typeof concentration>[0], Number(args.tier1)))
      },
    },
    {
      name: 'erpax.float.reconcile',
      description: tReconcile.desc(I18N.reconcile!),
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
    {
      name: 'erpax.staffing.position',
      description: tPosition.desc(I18N.position!),
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
