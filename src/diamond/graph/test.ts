import { describe, expect, it } from 'vitest'

import { faceOf } from '@/rules/face'

// The file that stood here asserted expect(true).toBe(true) — it passed for every
// possible state of diamond/graph and forbade nothing. What graph actually owes its
// callers is its FACE: import { X } from '@/diamond/graph' breaks the moment the barrel
// stops offering X, and nothing else in the tree reports that.
const OFFERED = [
  "ALLOWED_DIAMOND_FILES",
  "CODE_MARKERS",
  "COLOCATED",
  "CloudflareComputeInput",
  "CloudflareDiamondFacet",
  "CollectionDiamondInput",
  "CollectionDiamondModel",
  "DeploymentFaces",
  "DiamondAtomKind",
  "DiamondComputation",
  "DiamondComputationResult",
  "DiamondComputationStage",
  "DiamondFileViolation",
  "DiamondInput",
  "DiamondKind",
  "DiamondModel",
  "DiamondTrinity",
  "TRINITY_CODE",
  "TRINITY_FORM",
  "allowedDiamondFiles",
  "auditDiamondFolder",
  "computationUuid",
  "computeDiamond",
  "deploymentFaces",
  "deriveCollectionDiamond",
  "deriveDiamond",
  "diamondAtomKind",
  "diamondCanonicalPayload",
  "diamondFileViolations",
  "diamondFilesGuardian",
  "diamondUuid",
  "folderModelToDiamond",
  "isChildAtomDir",
  "measureOf",
  "methodModelToDiamond",
  "renderDiamondJson",
  "stageUuid",
  "verifyDiamond"
] as const

describe('diamond/graph — the face it owes its callers', () => {
  it('offers every name a caller may import', () => {
    const live = new Set(faceOf('diamond/graph'))
    const lost = OFFERED.filter((n) => !live.has(n))
    expect(lost).toEqual([])
  })

  it('offers 38 name(s) — a silent drop changes the count', () => {
    expect(faceOf('diamond/graph').length).toBeGreaterThanOrEqual(OFFERED.length)
  })

  it('names nothing twice — a duplicated export is an ambiguous import', () => {
    const live = faceOf('diamond/graph')
    expect(new Set(live).size).toBe(live.length)
  })
})
