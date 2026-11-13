---
name: sanitization
description: "Use when cleaning data at a boundary — input, output, or disposal — in the content-addressed model where nothing mutates in place; accept untrusted input but collapse it through the gate, redact by projecting a sanitized view (no spoon for the unauthorized), and purge by crypto-shredding to the void."
atomPath: "quantum/sanitization"
coordinate: "quantum/sanitization · 5/round · e7d32d7b"
contentUuid: "bd82af27-93bc-5cc8-8376-67daf4d57ec4"
diamondUuid: "cd477099-330a-847c-92a0-cf6e44d9a6f3"
uuid: "e7d32d7b-27e7-8599-9b23-b5b0c30bd4e2"
horo: 5
typography:
  partition: quantum
  bondDegree: 30
standards: []
bindings: []
signatures:
  computationUuid: "1a3eb756-697b-89e9-be5e-de5f4850c1b1"
  stages:
    - stage: path
      stageUuid: "cd37ecbb-4ee1-817f-a7a8-e4a5ada8f20b"
    - stage: trinity
      stageUuid: "3f960488-bf76-8e5b-b166-40584525832e"
    - stage: boundary
      stageUuid: "91809071-9ef3-8a29-8e92-88ebae94527c"
    - stage: links
      stageUuid: "541886ef-8340-8301-8276-a9e04b942092"
    - stage: horo
      stageUuid: "b4f061b8-626c-8b2e-83fa-77ba12c3d46c"
    - stage: seal
      stageUuid: "419aa895-a0c0-8bee-8e79-56077b93618a"
    - stage: uuid
      stageUuid: "57573cc0-7997-8777-acaf-404294fe650e"
quantum:
  superposition:
    - access
    - collapse
    - law
    - merge
    - proof
    - quantum
    - receipt
    - sandbox
    - shred
    - superposition
  collapse:
    - "Use when cleaning data at a boundary — input, output, or disposal — in the content-addressed model where nothing mutates in place; accept untrusted input but collapse it through the gate, redact by projecting a sanitized view (no spoon for the unauthorized), and purge by crypto-shredding to the void."
    - "[[access]]"
    - "[[merge]]"
    - "[[receipt]]"
    - "[[sandbox]]"
    - "[[shred]]"
    - data
    - finality
    - "sanitization never mutates in place — it collapses through the gate. Dirty input cannot act until it resolves clean; the unauthorized reader gets a redacted projection while the content-addressed original stays whole; and the only true erasure is shredding the key into the void. Because every scrub emits a receipt, removing data is itself provable — sanitization is authorized and audited, never a silent edit (it is not tamper)."
    - void
  seal:
    sandbox: false
    receipt: false
    pathFollow: true
    canonicalRecord: true
    analogResults: false
    speechResults: false
    computationUuid: "1a3eb756-697b-89e9-be5e-de5f4850c1b1"
    contentUuid: "bd82af27-93bc-5cc8-8376-67daf4d57ec4"
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

<sub>content-uuid `bd82af27-93bc-5cc8-8376-67daf4d57ec4` · account `quantum/sanitization` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
