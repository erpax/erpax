---
name: publication
description: "Use when reasoning about publication — Zenodo v1.0.0 release workflow with permanent DOI and peer-verifiable publication"
atomPath: publication
coordinate: "publication · 8/crest · ab1fef7f"
contentUuid: "23daaa01-7614-594c-90bf-3e746380b59c"
diamondUuid: "ae9d66d0-c1ae-80ea-bd2f-d41d11c49375"
uuid: "ab1fef7f-24dd-8f2e-97c3-1542f7444dfc"
horo: 8
typography:
  partition: publication
  bondDegree: 26
standards: []
bindings: []
signatures:
  computationUuid: "0a0aed6f-c3db-84dd-97f8-da78e03e9730"
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
      stageUuid: "e2522c7c-da55-808e-a6e9-add4b45594ce"
    - stage: seal
      stageUuid: "61354a4b-a818-8b89-a7c5-986fa3b55009"
    - stage: uuid
      stageUuid: "22afa666-09e3-86af-b704-8c7cc3d365cd"
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
