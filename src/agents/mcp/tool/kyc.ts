/**
 * MCP tools over [[kyc]] — the diligence LEVEL a directive obliges, given facts someone else established.
 *
 * Every tool here is a PURE COMPUTATION over arguments the caller supplies: none reads a tenant's
 * rows, so none asserts a tenant ([[_guards]] is for tools that do, and adding it here is theatre).
 * The atom's refusals are restated in each description, because an MCP caller does not read a SKILL.
 *
 * @see /src/kyc/index.ts
 */
import { z } from 'zod'
import { json, makeToolI18n, type ErpaxMcpTool, type LocalizedString } from './_contract'
import { diligenceLevel, dueDiligenceRequired, evidenceMissing, identificationComplete } from '@/kyc'

const I18N: Record<string, LocalizedString> = {
  diligence: {
    en: 'Customer due diligence LEVEL the directive obliges (EU 2015/849), given established facts. Enhanced dominates: a PEP or high-risk third country mandates EDD and no lower-risk finding reduces it. Returns the level, whether diligence is owed at all, and which evidence items are missing. It does NOT decide whether a customer is guilty of anything.',
    bg: 'Ниво на комплексна проверка (EU 2015/849) според установени факти. Разширената проверка е задължителна при ПЕЛ или високорискова трета държава. Не отсъжда вина.',
    de: 'Sorgfaltspflicht-STUFE nach EU 2015/849 auf Basis festgestellter Tatsachen. Verstärkte Sorgfalt dominiert und wird durch kein Niedrigrisiko-Merkmal gemindert. Trifft keine Schuldfeststellung.',
  },
}

export function buildKycTools(): ReadonlyArray<ErpaxMcpTool> {
  const t = makeToolI18n('erpax.kyc.diligence')
  return [
    {
      name: 'erpax.kyc.diligence',
      description: t.desc(I18N.diligence!),
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
  ]
}
