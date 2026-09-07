---
name: sanitization
description: "Use when cleaning data at a boundary — input, output, or disposal — in the content-addressed model where nothing mutates in place; accept untrusted input but collapse it through the gate, redact by projecting a sanitized view (no spoon for the unauthorized), and purge by crypto-shredding to the void."
atomPath: "quantum/sanitization"
coordinate: "quantum/sanitization · 8/crest · c4ef6b9b"
contentUuid: "d1b1cbce-c9f6-5c3e-a4f9-91ba8b006a0f"
diamondUuid: "63b48caa-532d-8343-bbc2-14d76f004e21"
uuid: "c4ef6b9b-4039-8dad-8320-6f82972534ed"
horo: 8
typography:
  partition: quantum
  bondDegree: 45
standards: []
bindings: []
signatures:
  computationUuid: "9a241cb9-c40c-818c-b868-1d07f8260cb3"
  stages:
    - stage: path
      stageUuid: "cd37ecbb-4ee1-817f-a7a8-e4a5ada8f20b"
    - stage: trinity
      stageUuid: "3f960488-bf76-8e5b-b166-40584525832e"
    - stage: boundary
      stageUuid: "91809071-9ef3-8a29-8e92-88ebae94527c"
    - stage: links
      stageUuid: "10635a30-3645-8072-9a89-de844217983b"
    - stage: horo
      stageUuid: "2be28143-ad05-86ef-b0c3-85e57c2b8afe"
    - stage: seal
      stageUuid: "419aa895-a0c0-8bee-8e79-56077b93618a"
    - stage: uuid
      stageUuid: "2f870989-04b7-8311-ba07-2668ce8c9226"
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
    computationUuid: "9a241cb9-c40c-818c-b868-1d07f8260cb3"
    contentUuid: "d1b1cbce-c9f6-5c3e-a4f9-91ba8b006a0f"
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

<sub>content-uuid `d1b1cbce-c9f6-5c3e-a4f9-91ba8b006a0f` · account `quantum/sanitization` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
