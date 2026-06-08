---
name: sanitization
description: "Use when cleaning data at a boundary — input, output, or disposal — in the content-addressed model where nothing mutates in place; accept untrusted input but collapse it through the gate, redact by projecting a sanitized view (no spoon for the unauthorized), and purge by crypto-shredding to the void."
atomPath: quantum/sanitization
coordinate: quantum/sanitization · 1/base · d5f1900c
contentUuid: "174a14c5-2eef-5a3a-8f90-ec4213cd1ede"
diamondUuid: "a34b1da1-7182-8c6e-be6b-4394adf18269"
uuid: "d5f1900c-70b1-82cf-8dc4-abd3f043966c"
horo: 1
bonds:
  in:
    - accept
    - access
    - biometric
    - collapse
    - dataprotection
    - finality
    - law
    - merge
    - proof
    - quantum
    - receipt
    - sandbox
    - shred
    - tamper
    - uuid
    - void
  out:
    - accept
    - access
    - biometric
    - collapse
    - dataprotection
    - finality
    - law
    - merge
    - proof
    - receipt
    - sandbox
    - shred
    - tamper
    - uuid
    - void
typography:
  partition: quantum
  bondDegree: 45
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - accept
    - access
    - biometric
    - collapse
    - dataprotection
    - finality
    - law
    - merge
    - proof
    - receipt
    - sandbox
    - shred
    - tamper
    - uuid
    - void
  matrix:
    - accept
    - access
    - biometric
    - collapse
    - dataprotection
    - finality
    - law
    - merge
    - proof
    - receipt
    - sandbox
    - shred
    - tamper
    - uuid
    - void
  backlinks:
    - accept
    - access
    - biometric
    - collapse
    - dataprotection
    - finality
    - law
    - merge
    - proof
    - receipt
    - sandbox
    - shred
    - tamper
    - uuid
    - void
signatures:
  computationUuid: "87b5bbae-5cbc-8e0e-bce2-f034cd954100"
  stages:
    - stage: path
      stageUuid: "cd37ecbb-4ee1-817f-a7a8-e4a5ada8f20b"
    - stage: trinity
      stageUuid: "3f960488-bf76-8e5b-b166-40584525832e"
    - stage: boundary
      stageUuid: "91809071-9ef3-8a29-8e92-88ebae94527c"
    - stage: links
      stageUuid: "8443bfec-5307-8be0-86f2-0632633f09c7"
    - stage: horo
      stageUuid: "94b002e3-de14-8a41-bc12-3a82b1a8e1fd"
    - stage: seal
      stageUuid: "419aa895-a0c0-8bee-8e79-56077b93618a"
    - stage: uuid
      stageUuid: "28d6058e-4175-88c1-b287-9ec2284ae1c4"
quantum:
  superposition:
    - accept
    - access
    - biometric
    - collapse
    - dataprotection
    - finality
    - law
    - merge
    - superposition
  collapse:
    - "Use when cleaning data at a boundary — input, output, or disposal — in the content-addressed model where nothing mutates in place; accept untrusted input but collapse it through the gate, redact by projecting a sanitized view (no spoon for the unauthorized), and purge by crypto-shredding to the void."
    - "[[access]]"
    - "[[data-protection]]"
    - "[[finality]]"
    - "[[merge]]"
    - "[[receipt]]"
    - "[[sandbox]]"
    - "[[shred]]"
    - "[[void]]"
    - "sanitization never mutates in place — it collapses through the gate. Dirty input cannot act until it resolves clean; the unauthorized reader gets a redacted projection while the content-addressed original stays whole; and the only true erasure is shredding the key into the void. Because every scrub emits a receipt, removing data is itself provable — sanitization is authorized and audited, never a silent edit (it is not tamper)."
  seal:
    sandbox: false
    receipt: false
    pathFollow: true
    canonicalRecord: true
    analogResults: false
    speechResults: false
    computationUuid: "87b5bbae-5cbc-8e0e-bce2-f034cd954100"
    contentUuid: "174a14c5-2eef-5a3a-8f90-ec4213cd1ede"
version: 2
---
# quantum/sanitization — clean at the boundary, three ways

Sanitization in an append-only, content-addressed store cannot be deletion-in-place ([[merge]] never forgets). It is three boundary moves, each a [[collapse]]:

- **input** (against injection) — [[accept]] untrusted input as *data, never code*; it may only collapse into a harmonized, safe state through the gate ([[sandbox]] · parameterized queries · the content-[[uuid]]) — accepted always, verified in harmony (the [[proof]] gate), so the dirty input cannot act until it resolves clean.
- **redact** (against disclosure) — do not mutate the original; **project a sanitized view**. The unauthorized observer's query collapses the record to its redacted projection — PII removed, *there is no spoon* (the [[void]] in that dimension) — while the content-addressed original stays whole and [[access]]-gated. This is the [[biometric]] / [[data-protection]] discipline at read time.
- **purge** (against recovery) — when the data must truly go, [[shred]] the key → the plaintext falls into the [[void]], the only honest erasure ([[finality]] absolute, NIST 800-88 *destroy*).

Sanitization is **not [[tamper]]** — it is authorized, content-addressed, and audited: every scrub emits a [[receipt]], so removing data is itself provable, not a silent edit.

@see [[void]] · [[shred]] · [[access]] · [[sandbox]] · [[merge]] · [[data-protection]] · [[receipt]] · [[finality]]

**Law — [[law]]: sanitization never mutates in place — it collapses through the gate. Dirty input cannot act until it resolves clean; the unauthorized reader gets a redacted projection while the content-addressed original stays whole; and the only true erasure is shredding the key into the void. Because every scrub emits a receipt, removing data is itself provable — sanitization is authorized and audited, never a silent edit (it is not tamper).**

<sub>content-uuid `174a14c5-2eef-5a3a-8f90-ec4213cd1ede` · account `quantum/sanitization` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
