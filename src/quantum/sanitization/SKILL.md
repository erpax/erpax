---
name: sanitization
description: "Use when cleaning data at a boundary — input, output, or disposal — in the content-addressed model where nothing mutates in place; accept untrusted input but collapse it through the gate, redact by projecting a sanitized view (no spoon for the unauthorized), and purge by crypto-shredding to the void."
atomPath: "quantum/sanitization"
coordinate: "quantum/sanitization · 2/share · 793d3abb"
contentUuid: "72421142-1f39-5763-916e-a4059582b3a2"
diamondUuid: "16f8581b-5ed6-82bc-ba23-bf40de87f5bb"
uuid: "793d3abb-b73c-8d42-907a-1c367092edc9"
horo: 2
typography:
  partition: quantum
  bondDegree: 36
standards: []
bindings: []
signatures:
  computationUuid: "fdb4eaec-631e-83ab-bef1-615d7ae6edd6"
  stages:
    - stage: path
      stageUuid: "cd37ecbb-4ee1-817f-a7a8-e4a5ada8f20b"
    - stage: trinity
      stageUuid: "3f960488-bf76-8e5b-b166-40584525832e"
    - stage: boundary
      stageUuid: "91809071-9ef3-8a29-8e92-88ebae94527c"
    - stage: links
      stageUuid: "5c5e0f6c-253a-8a58-885a-88887ccfadb0"
    - stage: horo
      stageUuid: "b1300d3f-4372-855f-8ce8-ca5488cc2f52"
    - stage: seal
      stageUuid: "419aa895-a0c0-8bee-8e79-56077b93618a"
    - stage: uuid
      stageUuid: "9ca8ab7b-e1f3-85bf-9bec-46a1791ee96c"
quantum:
  superposition:
    - access
    - collapse
    - finality
    - law
    - merge
    - proof
    - protection
    - quantum
    - receipt
    - superposition
  collapse:
    - "Use when cleaning data at a boundary — input, output, or disposal — in the content-addressed model where nothing mutates in place; accept untrusted input but collapse it through the gate, redact by projecting a sanitized view (no spoon for the unauthorized), and purge by crypto-shredding to the void."
    - "[[access]]"
    - "finality"
    - "[[merge]]"
    - "[[receipt]]"
    - "[[sandbox]]"
    - "[[shred]]"
    - "data"
    - "sanitization never mutates in place — it collapses through the gate. Dirty input cannot act until it resolves clean; the unauthorized reader gets a redacted projection while the content-addressed original stays whole; and the only true erasure is shredding the key into the void. Because every scrub emits a receipt, removing data is itself provable — sanitization is authorized and audited, never a silent edit (it is not tamper)."
    - void
  seal:
    sandbox: false
    receipt: false
    pathFollow: true
    canonicalRecord: true
    analogResults: false
    speechResults: false
    computationUuid: "fdb4eaec-631e-83ab-bef1-615d7ae6edd6"
    contentUuid: "72421142-1f39-5763-916e-a4059582b3a2"
version: 2
---
# quantum/sanitization — clean at the boundary, three ways

Sanitization in an append-only, content-addressed store cannot be deletion-in-place ([[merge]] never forgets). It is three boundary moves, each a [[collapse]]:

- **input** (against injection) — accept untrusted input as *data, never code*; it may only collapse into a harmonized, safe state through the gate ([[sandbox]] · parameterized queries · the content-[[uuid]]) — accepted always, verified in harmony (the [[proof]] gate), so the dirty input cannot act until it resolves clean.
- **redact** (against disclosure) — do not mutate the original; **project a sanitized view**. The unauthorized observer's query collapses the record to its redacted projection — PII removed, *there is no spoon* (the void in that dimension) — while the content-addressed original stays whole and [[access]]-gated. This is the biometric / data discipline at read time.
- **purge** (against recovery) — when the data must truly go, [[shred]] the key → the plaintext falls into the void, the only honest erasure (finality absolute, NIST 800-88 *destroy*).

Sanitization is **not [[tamper]]** — it is authorized, content-addressed, and audited: every scrub emits a [[receipt]], so removing data is itself provable, not a silent edit.

@see void · [[shred]] · [[access]] · [[sandbox]] · [[merge]] · data · [[receipt]] · finality

**Law — [[law]]: sanitization never mutates in place — it collapses through the gate. Dirty input cannot act until it resolves clean; the unauthorized reader gets a redacted projection while the content-addressed original stays whole; and the only true erasure is shredding the key into the void. Because every scrub emits a receipt, removing data is itself provable — sanitization is authorized and audited, never a silent edit (it is not tamper).**

<sub>content-uuid `72421142-1f39-5763-916e-a4059582b3a2` · account `quantum/sanitization` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
