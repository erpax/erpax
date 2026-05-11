/**
 * ESG reporting cycle — canonical seed (Slice TTTT).
 *
 * CarbonEmissions data points (Scope 1 + Scope 2 + Scope 3) → CsrdDisclosures
 * rollup per ESRS topic → ISAE 3000 assurance engagement → EvidenceAttestation
 * signed (eIDAS qualified seal) → CSRD filing.
 *
 * Multi-relation invariants:
 *   - 3 carbon-emissions rows (1 per scope) feed 1 csrd-disclosures rollup
 *   - csrd-disclosures.quantitativeKpi.value == Σ tCO2e across rows
 *   - 1 evidence-attestation references the disclosure with signedAt + cert
 *   - csrd-disclosures.status transitions draft → under_review → approved → filed
 *
 * @standard EU CSRD Directive 2022/2464
 * @standard EU ESRS E1 §44-50 ghg-disclosure
 * @standard GHG Protocol Scope 1/2/3
 * @standard ISAE 3000 limited-assurance
 * @standard eIDAS Art.28 qualified-electronic-seal
 */

import type { ChainImpls, ChainStepImpl } from '@/services/business-chains/run-chain'

const ts = () => Date.now().toString(36)
const TCO2_S1 = 120
const TCO2_S2 = 80
const TCO2_S3 = 250
const TCO2_TOTAL = TCO2_S1 + TCO2_S2 + TCO2_S3 // 450 tCO2e

const recordGhg: ChainStepImpl = async (payload, ctx, state) => {
  // 1 emission row per Scope (3 rows total).
  const ids: string[] = []
  for (const { scope, category, tco2e } of [
    { scope: 'scope_1', category: 's1_stationary',           tco2e: TCO2_S1 },
    { scope: 'scope_2', category: 's2_electricity_location', tco2e: TCO2_S2 },
    { scope: 'scope_3', category: 's3_1_purchased_goods',    tco2e: TCO2_S3 },
  ] as const) {
    const e = await payload.create({
      collection: 'carbon-emissions',
      data: {
        tenant: ctx.tenantId,
        reference: `GHG-${scope}-${ts()}`,
        reportingYear: 2026,
        reportingPeriod: ctx.fiscalPeriodId,
        scope,
        category,
        activityData: { value: tco2e * 1000, unit: 'kg', sourceDescription: `Chain test ${scope}` },
        emissionFactor: { value: 1, unit: 'kgCO2e/kg', sourceRef: 'DEFRA 2024', gwpHorizon: 'gwp_100' },
        tCO2eValue: tco2e,
        methodology: 'activity_based',
        dataQuality: 'measured',
        status: 'verified',
      } as Record<string, unknown>,
      overrideAccess: true,
    }) as unknown as { id: string }
    ids.push(e.id)
  }
  state.emissionIds = ids
  return 'ghg:recorded'
}

const rollupDisclosure: ChainStepImpl = async (payload, ctx, state) => {
  const d = await payload.create({
    collection: 'csrd-disclosures',
    data: {
      tenant: ctx.tenantId,
      datapointId: 'ESRS-E1-6-1',  // Total GHG emissions by scope
      reportingYear: 2026,
      esrsCategory: 'environmental',
      esrsTopic: 'esrs_e1',
      materiality: 'double_material',
      narrative: `Total Scope 1-3 emissions for FY2026: ${TCO2_TOTAL} tCO2e (Scope 1: ${TCO2_S1}, Scope 2: ${TCO2_S2}, Scope 3: ${TCO2_S3}).`,
      quantitativeKpi: {
        value: TCO2_TOTAL,
        unit: 'tCO2e',
        methodology: 'GHG Protocol Corporate Standard + Scope 2 location-based + Scope 3 activity-based',
        priorYearComparison: 470,
        targetValue: 360,
        targetYear: 2030,
      },
      iro: { kind: 'impact', timeHorizon: 'medium', valueChainStage: 'own_ops' },
      assuranceStatus: 'not_assured',
      isEUTaxonomyEligible: true,
      isEUTaxonomyAligned: false,
      status: 'draft',
    } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state.disclosureId = d.id
  return 'csrd:rolled-up'
}

const assure: ChainStepImpl = async (payload, ctx, state) => {
  await payload.update({
    collection: 'csrd-disclosures',
    id: state.disclosureId as string,
    data: {
      assuranceStatus: 'limited_assurance',
      assuranceProvider: 'Chain Test Assurance Firm',
      status: 'under_review',
    } as Record<string, unknown>,
    overrideAccess: true,
  })
  return 'csrd:assured'
}

const signEvidence: ChainStepImpl = async (payload, ctx, state) => {
  const att = await payload.create({
    collection: 'evidence-attestations',
    data: {
      tenant: ctx.tenantId,
      attestationId: `CSRD-ATT-${ts()}`,
      country: 'BG',
      capturedAt: new Date().toISOString(),
      stepsCount: 5,
      gapsCount: 0,
      pdfA: true,
      pdfUa: false,
      padesLevel: 'B-T',
      signed: true,
      signedAt: new Date().toISOString(),
      signedBy: ctx.userId,
      signingCertificate: 'CN=Chain Test Assurance, O=Chain Test, C=BG',
      signatureValue: 'base64-chain-test-signature-placeholder',
      signatureDigest: 'sha256:chain-test-digest-placeholder',
      status: 'signed',
    } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state.attestationId = att.id
  await payload.update({
    collection: 'csrd-disclosures',
    id: state.disclosureId as string,
    data: { evidenceAttestation: att.id, status: 'approved' } as Record<string, unknown>,
    overrideAccess: true,
  })
  return 'evidence:signed'
}

const file: ChainStepImpl = async (payload, ctx, state) => {
  await payload.update({
    collection: 'csrd-disclosures',
    id: state.disclosureId as string,
    data: { status: 'filed' } as Record<string, unknown>,
    overrideAccess: true,
  })
  return 'csrd:filed'
}

export const esgReportingCycleImpls: ChainImpls = [
  recordGhg, rollupDisclosure, assure, signEvidence, file,
]
