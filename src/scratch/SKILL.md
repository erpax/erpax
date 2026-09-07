---
name: scratch
description: "Use when an ad-hoc measurement or throwaway tsx -e script would otherwise be run inline and discarded — save it here content-addressed instead. A throwaway is a proto-tool: identical scripts merge (same content ⇒ same address ⇒ the fold), the store accretes distinct measurements, and a script that has proven useful graduates into a tested src atom. Single-use code is entropy only if you delete it; saved, it quantomises in time."
atomPath: scratch
coordinate: "scratch · 5/round · df246627"
contentUuid: "6a5d6d46-cb58-5bec-beaa-f43891dd5dc0"
diamondUuid: "41c4aec7-1730-88a1-896b-56acc41af132"
uuid: "df246627-7f45-82c4-9a60-f06af5e6e470"
horo: 5
typography:
  partition: scratch
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "5b02ed86-48c1-879a-960d-95050fa4600c"
  stages:
    - stage: path
      stageUuid: "31035ad2-9460-860d-9deb-f033d7a782d7"
    - stage: trinity
      stageUuid: "6296b394-7410-881b-a5ae-cad97f38d47c"
    - stage: boundary
      stageUuid: "52960f8c-6608-8f7f-be6a-a46e87a6ff6e"
    - stage: links
      stageUuid: "cf805cbd-49f9-8b6a-aeb0-a0f6bc3f8dd0"
    - stage: horo
      stageUuid: "fa8715d1-6592-808b-8e21-477af5024f31"
    - stage: seal
      stageUuid: "70679d08-5ab4-8a7c-b5e0-8f4cfb45f7eb"
    - stage: uuid
      stageUuid: "fb895505-9036-8333-a072-e9b94b67f564"
version: 2
---
# scratch — saved throwaways, content-addressed, quantomising

The reflex this atom exists to end: reaching for a throwaway `tsx -e` to measure, running it once, discarding it. A throwaway has **no gate and nothing to refute it** — which is exactly where measurements go wrong (a grep that matched the word "case"; an asserted `readme:check` bottleneck never measured; a phantom 80MB "committed" that was gitignored). Deleting it throws away the proto-tool.

## The other half of the law

*"Single-use code is entropy"* was only half. The other half: **save it, and it quantomises in time.** `saveScript(code)` content-addresses a throwaway and stores it, so:

- **identical scripts merge** — same content ⇒ same `scriptAddress` ⇒ one file (the fold, applied to scripts);
- **the store accretes distinct measurements** — the leftovers that fund the next research;
- **a script that has run enough to matter graduates** — folded into `src/` as a tested, gated atom, then removed here. `deadAtoms`, `inversePairs`, and the seal's per-lane timing all began as throwaways and completed exactly this quantumisation.

## Honest boundary

The `.scratch/` cache is local (gitignored) — content-addressing gives dedup and inspectability, not distributed persistence. The graduation to a `src/` atom is what makes a measurement permanent and refutable. Until a script proves useful, it accretes here; the moment it does, it becomes a tool with a test.

**Law — [[law]]: a throwaway measurement is a proto-tool. Save it content-addressed so duplicates fold and the useful ones graduate — never run-and-discard, because a discarded script is a measurement nothing can refute or reuse.**

Composes: [[think]] · [[merge]] · [[cost]] · [[law]].
