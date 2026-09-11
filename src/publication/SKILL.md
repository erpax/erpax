---
name: publication
description: "Use when reasoning about publication — Zenodo v1.0.0 release workflow with permanent DOI and peer-verifiable publication"
atomPath: publication
coordinate: "publication · 5/round · bd93fe10"
contentUuid: "5479b408-3a22-5bf4-ad2c-43ba672fab05"
diamondUuid: "68bd9114-eb8b-85f2-8432-f8a5b68bf548"
uuid: "bd93fe10-4882-8f01-9d20-ac08b3b979c5"
horo: 5
typography:
  partition: publication
  bondDegree: 26
standards: []
bindings: []
signatures:
  computationUuid: "5a796097-4a1d-844c-b526-67a7d2d7bb4e"
  stages:
    - stage: path
      stageUuid: "6d10f55f-5375-818f-a846-37fc7f33e139"
    - stage: trinity
      stageUuid: "d5fe73b7-088a-82a3-ac6e-d039d2ac03d7"
    - stage: boundary
      stageUuid: "0f3c6af9-a3ec-897c-9edc-511d79002566"
    - stage: links
      stageUuid: "7c4b012e-b06a-85de-a975-6117d7af8413"
    - stage: horo
      stageUuid: "49516b73-0855-8189-b874-1d1b2a568af8"
    - stage: seal
      stageUuid: "61354a4b-a818-8b89-a7c5-986fa3b55009"
    - stage: uuid
      stageUuid: "82376804-b196-8f3a-8cb7-e57da6e69533"
version: 2
---
# publication — Quantum System v1.0 peer-verifiable release

Release workflow for publishing hardened quantum system to Zenodo with permanent DOI. Integrates [[proof]] · [[expansion]] · [[threat]] · [[pqc]] into v1.0.0 milestone.

## when

Use when preparing quantum system for academic publication. Automates: security-fix integration, git tag creation, Zenodo webhook activation, permanent DOI assignment via GitHub.

## workflow

### Step 1: Await Security Fixes
Parallel agents apply all 6 fixes (30-45 min total):
- [[proof]]: Real quantum operations (7 layers)
- [[expansion]]: HKDF-SHA256 replaces Rodin doubling
- [[cipher]]: Receipts contain only ciphertext UUIDs
- [[threat]]: Shor/ECDLP corrected
- ECDLP marked vulnerable to elliptic curve Shor
- [[pqc]]: Kyber-768 + SPHINCS+ post-quantum hybrid

### Step 2: Integrate & Commit
```bash
git add -A
git commit -m "security: implement all 6 hardening fixes for v1.0 publication"
```

### Step 3: Create Release Tag
```bash
git tag -a v1.0.0 -m "Quantum System v1.0 - Peer-Verifiable Publication"
git push origin v1.0.0
```

### Step 4: Zenodo Auto-Deposit
GitHub webhook detects tag → creates deposit → assigns DOI → indexes

### Step 5: Publish
Zenodo: `https://zenodo.org/records/XXXXX`

## code

entry `@/publication` · sealed `0` (v1.0.0 milestone) · trinity `1·1·1`
exports publishWorkflow, zenodoConfig, citationBibtex, ZENODO_CONFIG, MILESTONE_V1_0_0
imports @/proof, @/expansion, @/threat, @/pqc, @/quantum/fold/cipher

---

<sub>Release orchestration · v1.0.0 milestone · Zenodo integration</sub>
