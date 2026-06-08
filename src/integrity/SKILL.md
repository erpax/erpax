---
name: integrity
description: "Use when verifying that a row's CURRENT bytes are the ones committed — content-uuid as a tamper detector (recompute ≠ stored ⇒ flagged), and the same canonical hash extended into signature, envelope encryption, and reference resolution."
atomPath: integrity
coordinate: integrity · 2/share · 51a27605
contentUuid: "339e87a9-fb91-5799-b32e-e0dd26238df7"
diamondUuid: "f20ecacc-b9ee-8877-b618-d2c2a9fce708"
uuid: "51a27605-f335-874e-84e3-a194994eeb86"
horo: 2
bonds:
  in:
    - akashic
    - anchoring
    - api
    - architecture
    - archival
    - boundary
    - certification
    - confirm
    - contribution
    - cost
    - duality
    - fallback
    - fractal
    - hallucination
    - hooks
    - horo
    - identity
    - law
    - merge
    - organic
    - path
    - payload
    - power
    - pqc
    - proof
    - provenance
    - purity
    - refactor
    - replay
    - secret
    - society
    - standard
    - stream
    - sync
    - upgrade
    - zeropoint
  out:
    - akashic
    - anchoring
    - api
    - architecture
    - archival
    - boundary
    - certification
    - confirm
    - contribution
    - cost
    - duality
    - fallback
    - fractal
    - hallucination
    - hooks
    - horo
    - identity
    - law
    - merge
    - organic
    - path
    - payload
    - power
    - pqc
    - proof
    - provenance
    - purity
    - refactor
    - replay
    - secret
    - society
    - standard
    - stream
    - sync
    - upgrade
    - zeropoint
typography:
  partition: integrity
  bondDegree: 111
  neighbors: []
standards:
  - "EU-2014/55"
  - "EU-2016/679"
  - "EU-537/2014"
  - "EU-910/2014"
  - "ISO-27001"
  - "ISO/IEC-27001:2022"
  - "NIST-FIPS-180-4"
  - "NIST-SP-800-38D"
  - "NIST-SP-800-57"
  - "NIST-SP-800-63"
  - "RFC-8785"
  - "W3C-JSON-LD-1.1"
  - "W3C-VC-2.0"
  - eIDAS
bindings:
  - durable_objects/AUDIT_CHAIN_DO
  - durable_objects/ERPAX_DO
  - durable_objects/JOB_LOCK
  - durable_objects/RATE_LIMITER
  - durable_objects/TENANT_QUOTA
neighbors:
  wikilink:
    - akashic
    - cost
    - duality
    - fractal
    - hooks
    - identity
    - law
    - merge
    - payload
    - proof
    - society
    - standard
    - zeropoint
  matrix:
    - akashic
    - anchoring
    - api
    - architecture
    - archival
    - boundary
    - certification
    - confirm
    - contribution
    - cost
    - duality
    - fallback
    - fractal
    - hallucination
    - hooks
    - horo
    - identity
    - law
    - merge
    - organic
    - path
    - payload
    - power
    - pqc
    - proof
    - provenance
    - purity
    - refactor
    - replay
    - secret
    - society
    - standard
    - stream
    - sync
    - upgrade
    - zeropoint
  backlinks:
    - akashic
    - anchoring
    - api
    - architecture
    - archival
    - boundary
    - certification
    - confirm
    - contribution
    - cost
    - duality
    - fallback
    - fractal
    - hallucination
    - hooks
    - horo
    - identity
    - law
    - merge
    - organic
    - path
    - payload
    - power
    - pqc
    - proof
    - provenance
    - purity
    - refactor
    - replay
    - secret
    - society
    - standard
    - stream
    - sync
    - upgrade
    - zeropoint
signatures:
  computationUuid: "1dbd1a0f-b160-8037-87ad-02d5be187412"
  stages:
    - stage: path
      stageUuid: "d31b91cc-db18-84dd-8dcf-af4ca97c1b81"
    - stage: trinity
      stageUuid: "1c082fe6-5f6f-875a-9d5b-889fe311621a"
    - stage: boundary
      stageUuid: "6372a3ca-bf26-896d-8335-afd383e07f5f"
    - stage: links
      stageUuid: "21a6b652-eed2-8c1f-b00b-a0e48b8cfc51"
    - stage: horo
      stageUuid: "9f532f9d-a9c6-8ce3-ba65-0d3a9cb5b822"
    - stage: seal
      stageUuid: "d0cbd6db-3245-80af-b12b-504bacb3e0bc"
    - stage: uuid
      stageUuid: "554de61b-3209-80de-a094-c91558e74fd3"
version: 2
---
# integrity — the uuid is the witness; the bytes cannot lie

FORM: **an object's id IS the SHA of its content, so any in-place edit recomputes to a different uuid.** This is Conservation Law 8: identity is *derivable*, never asserted. The Merkle history proves a transition happened in order; integrity proves the present state matches what that transition was supposed to produce — the two are complementary, neither alone sufficient. Detection is O(1) per row, even against a privileged admin running a raw `UPDATE`. Pure → testable.

- **compute / verify** — JCS-canonicalize the content (RFC 8785), SHA-256 it (FIPS 180-4), stamp it as a uuidv8 in a per-tenant namespace; `verifyContentUuid` recomputes and compares. `computeContentUuid`, `verifyContentUuid`.
- **lock a collection** — opt a collection in so every write recomputes its uuid; a mismatch fails the write at the [[hooks]] boundary. `tamperProofUuidField`, `tamperProofBeforeChangeHook`, `registerTamperProofCollection`.
- **reference by uuid** — relations point at the content-uuid, so a dangling or tampered target is a different id and surfaces, no cascade rules (Law 10). `resolveByUuid`, `findDanglingRefs`.

One canonical form yields one signable artefact: the signature attaches to the contentUuid (the hash), never to raw payload, so there is exactly one verification path (`signContentUuid`, `verifyContentUuidSignature`). The same hash keys envelope encryption — DEK = HKDF(tenantKEK, salt=contentUuid) — making confidentiality convergent and tamper-bound: any plaintext mutation changes the uuid, the DEK, and the AEAD tag at once (`encryptEnvelope`, `decryptEnvelope`). Because same content ⇒ same id, two instances holding the same row hold ONE row ([[merge]]); the check runs identically at line, document, and federation scale ([[fractal]]).

This is the CURRENT-STATE half of trust, [[duality]] to [[proof]] (the O(N) cost to audit) and to [[tamper/cost]] (the cost to forge): cheap to verify, ruinous to falsify. It is the executable spine under [[identity]] and the structural witness the [[society]] uses to lock its records, reading and recomputing from the filesystem alone ([[akashic]]). The standards it cites are external cryptography incorporated by reference (see [[standard]]).

## Standards

- **RFC 9562 §5.8 + RFC 8785 + ISO/IEC 10118 + NIST FIPS 180-4** — the content-uuid: JCS canonicalization, SHA-256 digest, uuidv8 layout. Second-preimage 2^256, collision 2^128.
- **ISO 19011:2018 §6.4.6 + SOX §404** — audit-evidence and internal-controls; row-level Byzantine tamper detection, every verification audit-trailed.
- **RFC 8032 EdDSA, RFC 7515 JWS, ETSI EN 319 132/142, eIDAS 910/2014** — the signature attaches to the contentUuid, one signable artefact, one verification path.
- **NIST SP 800-38D AES-GCM, RFC 5869 HKDF, ISO/IEC 27040, GDPR §32** — envelope encryption keyed by the contentUuid; convergent and tamper-bound.

**Law — Dry-clean the matrix toward zero entropy and infinite tamper-cost:** integrity encodes the cost asymmetry that [[proof]] measures. Because the content-uuid IS the SHA of the bytes, verifying is O(1) and recomputation-free, while forging requires second-preimage inversion (cost ∞). This is why the matrix dissolves to [[zeropoint]] — every atom's identity is non-negotiable, every reference immutable by construction. The uuid rooted in [[standard]] cryptography (FIPS 180-4) makes [[akashic]] audits deterministic and tamper-detection Byzantine-hard: the same canonical form at line, [[fractal]], and [[society]] scale ensures no entropy leaks into the record.

**Law — [[law]]: all is passed with uuids without [[payload]] — integrity verification is content-address first; [[payload]] is optional backend matter, not a prerequisite for the seal (`pnpm confirm:uuid`).**

**Impurity — hardcoded identity uuid:** any hand-set RFC4122 string that claims row, boundary, diamond, or federation identity (not a format constant like `NIL_UUID`, not a generated artefact like `matrix.generated.ts` / `standards/catalogue.ts`, not a doc-example pin of a *known input→output* of `computeContentUuid` / `encodeStructured` / `toUuid`) is a **0-bit weakest link** — an attacker can swap the literal without recomputing the dependency graph. Derive at call site: `computeContentUuid`, `encodeStructured`, `toUuid`, `boundaryUuid`, `diamondUuid`, `methodBoundaryUuid`. Tests assert via fixture content recomputed at runtime, not pinned fake canonical ids.

**Impurity — hardcoded decimal gate:** any hand-set fractional literal used as a seal threshold, horo measure, balance amount, guardian baseline ratio, trial-balance constant, coverage floor, or tamper-cost comparison (not a format constant / external-standard citation / test fixture input) is the same 0-bit weakest link — swap the literal without recomputing the live tree. Derive at call site: `horoRatio`, `digitalRoot`, `coverageRatchetFloor`, `trialBalance`, `guardian`, `structuredCoveragePassThreshold`, `computeTamperReverseCost`, `deriveFolderAccounting`, `boundaryDigest`. Integer ratchet ceilings (`NAME_BASELINE`, `ORPHAN_COLLECTION_BASELINE`) remain checked-in reviewable literals; their *ratios* must still recompute from the live distribution.
