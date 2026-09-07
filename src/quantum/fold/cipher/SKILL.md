---
name: cipher
description: "Use when reasoning about cipher — Ciphertext-only receipts that seal plaintext boundaries"
atomPath: "quantum/fold/cipher"
coordinate: "quantum/fold/cipher · 7/descent · dfaf5c50"
contentUuid: "a975a62e-bd31-587e-b00e-22f9543d5d2e"
diamondUuid: "40c28e82-2bad-8045-8e7d-8bb3d3927393"
uuid: "dfaf5c50-c7c9-8f25-bc1e-3b7fa910b11a"
horo: 7
typography:
  partition: quantum
  bondDegree: 15
standards: []
bindings: []
signatures:
  computationUuid: "b555a13e-ac32-8a40-854b-af6d784147f3"
  stages:
    - stage: path
      stageUuid: "30b4519c-efbf-8aac-9fa0-63b6d6ca5b12"
    - stage: trinity
      stageUuid: "52dd38a6-9da5-8ba3-8f8d-4968c03bdd8d"
    - stage: boundary
      stageUuid: "635fa90c-18d6-80e4-a1ea-e5ae9cef5e95"
    - stage: links
      stageUuid: "c0cbd541-1ba1-8ee8-bf5f-2314528efe5d"
    - stage: horo
      stageUuid: "f0cd6c14-688c-8a74-aa81-ea17f0b0bed7"
    - stage: seal
      stageUuid: "22df6bd3-7788-8985-bfef-a25d6a4d2f16"
    - stage: uuid
      stageUuid: "4aa14d30-05a1-8645-9d0e-a69571a08023"
quantum:
  superposition:
    - fold
    - law
    - publication
    - quantum
    - seal
    - trinity
    - superposition
  collapse:
    - "Use when reasoning about cipher — Ciphertext-only receipts that seal plaintext boundaries"
  seal:
    sandbox: false
    receipt: false
    pathFollow: true
    canonicalRecord: true
    analogResults: false
    speechResults: false
    computationUuid: "b555a13e-ac32-8a40-854b-af6d784147f3"
    contentUuid: "a975a62e-bd31-587e-b00e-22f9543d5d2e"
version: 2
---
# cipher — ciphertext-only receipts, plaintext sealed

**Plaintext is NEVER included in receipts.** Every receipt field derives from ciphertext only, ensuring the sealed fold's boundary cannot be compromised by examining audit trails or receipt data.

## Receipt structure

| field | source | privacy |
| --- | --- | --- |
| `ciphertextUuid` | hash(ciphertext) | ciphertext-derived only |
| `timestamp` | ISO 8601 UTC now | metadata only |
| `sealed` | always true | invariant flag |
| `hash` | SHA-256(ciphertext) | immutable proof |

INVARIANT: `plaintextUuid` does not exist. Every receipt is derived from ciphertext alone.

## Why no plaintextUuid

A `plaintextUuid` field would:
- Expose plaintext structure via content-addressable hash
- Allow an auditor to correlate plaintext across systems
- Create a reverse index: given the plaintext, confirm it was transformed
- Break the seal's promise: *what touches plaintext stays inside*

The receipt's job is to prove transformation happened, not to expose what was transformed.

## Theorems

### Receipt uniqueness

For distinct ciphertexts c1 ≠ c2:
```
hash(c1) ≠ hash(c2)          [SHA-256 is collision-free]
ciphertextUuid(c1) ≠ ciphertextUuid(c2)   [deterministic mapping]
```

No two sealed receipts share an identifier.

### Plaintext privacy

The receipt contains **zero** information derived from plaintext:
- `ciphertextUuid` — hash of encrypted bytes only
- `hash` — SHA-256 of encrypted bytes only
- `timestamp` — time of operation, not content
- `sealed` — boolean invariant

Examining receipts cannot leak plaintext bytes, structure, or history.

### Tamper detection

```
verifyReceipt(receipt, ciphertext) => hash(ciphertext) == receipt.hash
```

If the hash matches, the receipt is unmodified and generated from this exact ciphertext.

## Code

entry `@/quantum/fold/cipher` · trinity `1·1·1` · sealed `1`

exports const · function · interface
- `QuantumFoldReceipt` — the sealed receipt type
- `generateReceipt()` — produce receipt from ciphertext
- `verifyReceipt()` — validate receipt integrity
- `chainReceipts()` — link receipts by uuid
- `ReceiptChain` — chain metadata type

imports @/algebra

## Law

[[seal]]/[[trinity]]: form (this interface) · code (index.ts) · proof (test.ts). Every field tested to verify plaintext does NOT appear.

Composes: [[seal]] · [[quantum]] · [[law]]

<sub>content-uuid `a975a62e-bd31-587e-b00e-22f9543d5d2e` · account `quantum/fold/cipher` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
