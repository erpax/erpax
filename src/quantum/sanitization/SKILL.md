---
name: sanitization
description: "Use when cleaning data at a boundary — input, output, or disposal — in the content-addressed model where nothing mutates in place; accept untrusted input but collapse it through the gate, redact by projecting a sanitized view (no spoon for the unauthorized), and purge by crypto-shredding to the void."
atomPath: "quantum/sanitization"
coordinate: "quantum/sanitization · 4/weave · fba9d8c5"
contentUuid: "611666db-596b-5996-adee-3971490a85ca"
diamondUuid: "f998a5fa-70c2-83c3-996d-4096e71baa5f"
uuid: "fba9d8c5-5072-8893-b6d2-f3b857c89f2b"
horo: 4
typography:
  partition: quantum
  bondDegree: 45
standards: []
bindings: []
signatures:
  computationUuid: "6d038bfe-d40d-81d0-b9e0-b802d871a638"
  stages:
    - stage: path
      stageUuid: "cd37ecbb-4ee1-817f-a7a8-e4a5ada8f20b"
    - stage: trinity
      stageUuid: "3f960488-bf76-8e5b-b166-40584525832e"
    - stage: boundary
      stageUuid: "91809071-9ef3-8a29-8e92-88ebae94527c"
    - stage: links
      stageUuid: "8a0e85af-972d-8d95-9b27-77625ced098b"
    - stage: horo
      stageUuid: "39a5a4f9-5303-8cd5-8bab-7c4ee0472537"
    - stage: seal
      stageUuid: "419aa895-a0c0-8bee-8e79-56077b93618a"
    - stage: uuid
      stageUuid: "70ca8d65-6fb3-8304-91cf-7e17f0ae096d"
quantum:
  superposition:
    - accept
    - access
    - biometric
    - collapse
    - finality
    - law
    - merge
    - proof
    - superposition
  collapse:
    - "Use when cleaning data at a boundary — input, output, or disposal — in the content-addressed model where nothing mutates in place; accept untrusted input but collapse it through the gate, redact by projecting a sanitized view (no spoon for the unauthorized), and purge by crypto-shredding to the void."
    - "[[access]]"
    - "[[finality]]"
    - "[[merge]]"
    - "[[receipt]]"
    - "[[sandbox]]"
    - "[[shred]]"
    - "[[vocabulary/data/protection]]"
    - "[[void]]"
    - "sanitization never mutates in place — it collapses through the gate. Dirty input cannot act until it resolves clean; the unauthorized reader gets a redacted projection while the content-addressed original stays whole; and the only true erasure is shredding the key into the void. Because every scrub emits a receipt, removing data is itself provable — sanitization is authorized and audited, never a silent edit (it is not tamper)."
  seal:
    sandbox: false
    receipt: false
    pathFollow: true
    canonicalRecord: true
    analogResults: false
    speechResults: false
    computationUuid: "6d038bfe-d40d-81d0-b9e0-b802d871a638"
    contentUuid: "611666db-596b-5996-adee-3971490a85ca"
version: 2
---
# quantum/sanitization — clean at the boundary, three ways

Sanitization in an append-only, content-addressed store cannot be deletion-in-place ([[merge]] never forgets). It is three boundary moves, each a [[collapse]]:

- **input** (against injection) — [[accept]] untrusted input as *data, never code*; it may only collapse into a harmonized, safe state through the gate ([[sandbox]] · parameterized queries · the content-[[uuid]]) — accepted always, verified in harmony (the [[proof]] gate), so the dirty input cannot act until it resolves clean.
- **redact** (against disclosure) — do not mutate the original; **project a sanitized view**. The unauthorized observer's query collapses the record to its redacted projection — PII removed, *there is no spoon* (the [[void]] in that dimension) — while the content-addressed original stays whole and [[access]]-gated. This is the [[biometric]] / [[vocabulary/data/protection]] discipline at read time.
- **purge** (against recovery) — when the data must truly go, [[shred]] the key → the plaintext falls into the [[void]], the only honest erasure ([[finality]] absolute, NIST 800-88 *destroy*).

Sanitization is **not [[tamper]]** — it is authorized, content-addressed, and audited: every scrub emits a [[receipt]], so removing data is itself provable, not a silent edit.

@see [[void]] · [[shred]] · [[access]] · [[sandbox]] · [[merge]] · [[vocabulary/data/protection]] · [[receipt]] · [[finality]]

**Law — [[law]]: sanitization never mutates in place — it collapses through the gate. Dirty input cannot act until it resolves clean; the unauthorized reader gets a redacted projection while the content-addressed original stays whole; and the only true erasure is shredding the key into the void. Because every scrub emits a receipt, removing data is itself provable — sanitization is authorized and audited, never a silent edit (it is not tamper).**

<sub>content-uuid `611666db-596b-5996-adee-3971490a85ca` · account `quantum/sanitization` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
