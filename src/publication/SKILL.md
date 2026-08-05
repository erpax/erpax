---
name: publication
description: Zenodo v1.0.0 release workflow with permanent DOI and peer-verifiable publication
metadata:
  type: form
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
