---
name: access
description: "Use when proving a remote-access product's PUBLIC vulnerability classes with erpax's own trust primitives — each flaw is a missing primitive and the verdict is a receipted, content-addressed proof. The AnyDesk case (SYSTEM file-read LPE, a stolen code-signing cert, coarse unattended-access) folded onto sandbox, tamper-cost and the receipt. Defensive modeling over public CVEs, never an exploit."
atomPath: "security/remote/access"
coordinate: "security/remote/access · 6/6 · 1502f401"
contentUuid: "c2cd394e-360c-518c-9643-df2238d07327"
diamondUuid: "440b45e7-a52b-8830-adc8-1648f9839511"
uuid: "1502f401-d054-8c83-ad7d-8750573e05f9"
horo: 6
typography:
  partition: security
  bondDegree: 436
standards:
  - "NIST SP 800-162 ABAC · NIST SP 800-107r1 §5.1 · CWE-59"
  - "NIST-SP-800-162"
bindings: []
signatures:
  computationUuid: "15e05cbf-ad21-893c-84c3-c1754b75167a"
  stages:
    - stage: path
      stageUuid: "cef53b55-378a-85f0-a121-73d0c2db3cf3"
    - stage: trinity
      stageUuid: "e091d3e0-2537-8f23-beba-10ae04c0630c"
    - stage: boundary
      stageUuid: "c7297ca0-dce9-89ee-bc5c-46ae047940cd"
    - stage: links
      stageUuid: "666c9002-5a4e-8933-aa2e-cc9aa8ed9694"
    - stage: horo
      stageUuid: "f05532e8-2f83-80a8-be0e-2847b2fac08b"
    - stage: seal
      stageUuid: "344ae025-fbfe-8eae-98e9-66766085d4e7"
    - stage: uuid
      stageUuid: "54d7aed1-6687-8fb5-b233-b7da83126747"
version: 2
---
# remote-access — proving a vendor's trust-model gaps with erpax (under [[security]])

FORM: **a remote-access product's PUBLISHED vulnerability classes, each run through the erpax primitive that would have closed it, with the verdict emitted as a [[receipt]] — so the proof itself is tamper-evident.** Defensive only: public CVEs, the security MATH and POLICY, no exploit code, no live scan of any target. Remote access is an [[access]] problem (who may do what, to which resource, from where), and [[access]] is a tamper-cost layer — so each gap below is a missing [[access]] / [[sandbox]] / [[tamper]] primitive.

Each AnyDesk flaw is a missing erpax primitive:

- **Unscoped SYSTEM file read** (CVE-2024-12754, CWE-59, patched v9.0.1) — the privileged background-image copy binds no resource, so a filesystem junction redirects it to the `SAM` hive and reads it as SYSTEM. erpax names every resource and checks it against a least-privilege allowlist ([[allowed]]): [[sandbox]] `permits` / `evaluate` BLOCKS the read and emits a [[receipt]].
- **Trust rooted in a stealable secret** (the Feb-2024 production breach) — binary authenticity rests on a code-signing key; stolen, it forges "authentic" binaries for free. erpax stores no secret — a binary IS its content-uuid ([[identity]] · [[uuid]]) — and externally [[anchor]]s the chain root, so forgery must beat the digest AND the anchor (≥ 2^106). `crackVerdict({ anchored: false })` is exactly the stolen-key world: `free-rewrite`, not tamper-evident ([[tamper]] · [[proof]]).
- **Coarse unattended access** (~18k credentials sold post-breach for tech-support scams) — one "Accept" grants every verb to every host with no per-action authority and no victim-controlled audit. erpax authorizes EACH action under a least-privilege grant and chains every decision into a [[receipt]] ([[trust]] split into capability + audit, wired through one uuid); and a session credential is held by handle and injected by the [[broker]] only for a granted handle, so a hijacked session can never exceed its grant.

Matter-twin: `src/security/remote/access/index.ts` — `proveScopeGap` (over [[sandbox]]) · `proveAuthenticityGap` (over [[tamper]] + [[anchor]]) · `test.ts` (the AnyDesk proof — a verified [[receipt]] chain that pinpoints any doctored verdict at its seq).
Composes: [[security]] · [[access]] · [[sandbox]] · [[allowed]] · [[broker]] · [[tamper]] · [[receipt]] · [[anchor]] · [[proof]] · [[identity]] · [[uuid]] · [[trust]].

## Standards
- NIST SP 800-162 ABAC (capability-scoped authorization)
- NIST SP 800-107r1 §5.1 (hash strengths — the tamper-cost floor)
- CWE-59 (improper link resolution — the junction the SYSTEM copy follows)

## Common mistakes
- Treating a remote-access grant as one session-wide allow — erpax scopes per action; every block is still receipted ([[receipt]]).
- Rooting authenticity in a secret or certificate — a stolen key is a free forge ([[tamper]] `free-rewrite`); content-address the artifact and [[anchor]] the root instead.
- Reading this as an attack — it is a DEFENSIVE proof over PUBLIC CVEs: no exploit code, no live scan.

**Law — [[gate]]** A proven gap must be a receipted, re-derivable verdict: the audit chain verifies end-to-end and a flipped verdict is caught at its seq ([[receipt]] · [[proof]]).
