---
name: sanitization
description: "Use when cleaning data at a boundary — input, output, or disposal — in the content-addressed model where nothing mutates in place; accept untrusted input but collapse it through the gate, redact by projecting a sanitized view (no spoon for the unauthorized), and purge by crypto-shredding to the void."
atomPath: "quantum/sanitization"
coordinate: "quantum/sanitization · 4/weave · 5dd0d5e2"
contentUuid: "63bcba55-0318-577a-868b-30f9a594f2f1"
diamondUuid: "a9442242-e011-816f-8f61-d3a498cd9bfd"
uuid: "5dd0d5e2-922d-8cd5-a463-f1eed29849d3"
horo: 4
typography:
  partition: quantum
  bondDegree: 45
standards: []
bindings: []
signatures:
  computationUuid: "30576a51-eed7-839f-8c28-bf8ba7e61a33"
  stages:
    - stage: path
      stageUuid: "cd37ecbb-4ee1-817f-a7a8-e4a5ada8f20b"
    - stage: trinity
      stageUuid: "3f960488-bf76-8e5b-b166-40584525832e"
    - stage: boundary
      stageUuid: "91809071-9ef3-8a29-8e92-88ebae94527c"
    - stage: links
      stageUuid: "09e36627-5a0c-85e7-9a86-2d4dae8462ee"
    - stage: horo
      stageUuid: "437d27a3-00af-8007-a2e9-f96645d2318c"
    - stage: seal
      stageUuid: "419aa895-a0c0-8bee-8e79-56077b93618a"
    - stage: uuid
      stageUuid: "f59aebe5-fe2f-8588-aa8f-9f76d7c307b1"
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
    - "[[vocabulary/data/protection]]"
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
    computationUuid: "30576a51-eed7-839f-8c28-bf8ba7e61a33"
    contentUuid: "63bcba55-0318-577a-868b-30f9a594f2f1"
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

<sub>content-uuid `63bcba55-0318-577a-868b-30f9a594f2f1` · account `quantum/sanitization` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
