---
name: pqc
description: NIST post-quantum cryptography — Kyber-768 (KEM) + SPHINCS+ (signature) for quantum-resistant key establishment and digital signatures.
atomPath: security/pqc
contentUuid: 'd1a2b3c4-5e6f-7g8h-9i0j-k1l2m3n4o5p6'
standards:
  - 'NIST FIPS 203'
  - 'NIST FIPS 204'
  - 'NIST SP 800-225'
---

# pqc

Implements NIST-approved post-quantum cryptography for quantum-resistant security:

- **Kyber-768 (ML-KEM)** — Key encapsulation mechanism per NIST FIPS 203
- **SPHINCS+ (SLH-DSA)** — Stateless hash-based signatures per NIST FIPS 204
- **Hybrid mode** — Combines post-quantum + ECDSA for transitional security

## When

Use when establishing quantum-resistant encryption channels or signing documents that must survive quantum attacks. Hybrid mode provides fallback to ECDSA during quantum-safe migration.

## Usage

### Kyber-768 Key Encapsulation

```typescript
import {
  kyber768GenerateKeyPair,
  kyber768Encapsulate,
  kyber768Decapsulate,
} from '@/security/pqc'

const { publicKey, secretKey } = kyber768GenerateKeyPair()
const { sharedSecret, ciphertext } = kyber768Encapsulate(publicKey)
const recoveredSecret = kyber768Decapsulate(secretKey, ciphertext)
```

### SPHINCS+ Signatures

```typescript
import {
  sphincsGenerateKeyPair,
  sphincsSign,
  sphincsVerify,
} from '@/security/pqc'

const { publicKey, secretKey } = sphincsGenerateKeyPair()
const message = new TextEncoder().encode('important message')
const signature = sphincsSign(secretKey, message)
const isValid = sphincsVerify(publicKey, message, signature)
```

### Hybrid Mode (Post-Quantum + ECDSA)

```typescript
import {
  generateHybridKeyPair,
  hybridEncapsulate,
  hybridSign,
  hybridVerify,
} from '@/security/pqc'

const hybrid = generateHybridKeyPair()
const encap = hybridEncapsulate(hybrid.kyberPublic, hybrid.ecdsaPublic)
const { sphincsSignature, ecdsaSignature } = hybridSign(
  hybrid.sphincsSecret,
  hybrid.ecdsaSecret,
  message,
)
const isValid = hybridVerify(
  hybrid.sphincsPublic,
  hybrid.ecdsaPublic,
  message,
  sphincsSignature,
  ecdsaSignature,
  requireBoth = false, // Set to true for quantum-resistant only
)
```

## Installation

Install NIST post-quantum cryptography libraries:

```bash
pnpm add liboqs-node
# Fallback (pure JavaScript):
pnpm add crystals-kyber
```

## Security Notes

1. **Kyber-768 shared secret** is 256 bits (32 bytes) with 256-bit security level
2. **SPHINCS+ signature** is 7856 bytes for 256f variant (256-bit security)
3. **Hybrid mode** combines post-quantum + ECDSA for transitional security:
   - **Baseline** (`requireBoth=true`): Both must verify for quantum-resistant integrity
   - **Fallback** (`requireBoth=false`): ECDSA alone OK during quantum-safe migration

## Law

On the path to quantum-resistant infrastructure, neither post-quantum nor classical cryptography alone is sufficient during the migration window. Hybrid mode requires BOTH to verify (baseline) or ECDSA alone to suffice (fallback), never post-quantum alone.

@standard NIST FIPS 203 — ML-KEM (Kyber-768) for key encapsulation
@standard NIST FIPS 204 — SLH-DSA (SPHINCS+) for digital signatures
@standard NIST SP 800-225 — Post-quantum cryptography migration
