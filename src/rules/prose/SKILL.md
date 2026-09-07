---
name: prose
description: "Use when checking that technical prose cites real code — a SKILL naming a function nothing defines is a citation leading nowhere, and it is worse than a dead path because it reads as true. Wired into confirm, it refuses the claim at the write, so an agent must edit CODE rather than write a sentence about code it has not written. Only SKILLs beside an index.ts are judged; a lexicon atom is prose by design. Run: tsx src/rules/prose/index.ts"
atomPath: "rules/prose"
coordinate: "rules/prose · 1/base · 14a13280"
contentUuid: "0d0daf16-a922-5240-a7c0-5f0a741fc014"
diamondUuid: "ecfda7d4-f7af-812a-9970-5ff80e7de2eb"
uuid: "14a13280-4409-854b-9f65-49af5565b121"
horo: 1
typography:
  partition: rules
  bondDegree: 9
standards:
  - "ISO-19011:2018 §6.4 — audit evidence: the citation must lead to the evidence"
bindings: []
signatures:
  computationUuid: "aec04696-daac-8fbd-9ca4-2f19a2cd464f"
  stages:
    - stage: path
      stageUuid: "f8534db1-7562-8dbd-b805-382acad13b19"
    - stage: trinity
      stageUuid: "b8810871-2155-8483-a16f-76ac30db1813"
    - stage: boundary
      stageUuid: "fba464bd-680e-818b-bf07-3ee23030d63d"
    - stage: links
      stageUuid: "f1fb843d-87d2-8a04-b418-1e2b597d26ce"
    - stage: horo
      stageUuid: "74e64638-5d58-8761-84fe-4c3861ad69f6"
    - stage: seal
      stageUuid: "294186cc-53ce-8a34-8af7-0dc71da3824b"
    - stage: uuid
      stageUuid: "d094cfab-fecd-80cf-a1a4-61ee07912fc6"
version: 2
---
# prose — write the code, or stop claiming it

**Prose unrelated to code is measurable.** A SKILL naming a function when nothing defines it is the same defect as a dead `src/…` pointer ([[rules]]/reference) — a citation that leads nowhere. It is *worse*, because a dead path looks broken while a fabricated function **reads as true**: the reader assumes it exists, and nothing contradicts them.

> The fabricated example lives in this atom's TEST, on a hermetic fixture — quoting one here would fail this gate, exactly as it should. It blocked its own SKILL for doing precisely that.

| | count (2026-07-16) |
| --- | ---: |
| SKILLs with an `index.ts` | 870 |
| evidence set (`definedSymbols()`) | 14,091 symbols, **307ms** |
| **fabricated calls — cited, defined nowhere** | **15** |

307ms is the whole point: it is **realtime**, so it lives in [[confirm]] and fires at the write. An agent cannot describe a function it has not written — the gate refuses, and the only way past is to make the code real. **That is what turns prose-editing into code-editing.**

### The number went 1,261 → 726 → 704 → **15**

Every drop was **my own false positive**, and the corpus was innocent each time:

| reported | what was wrong with the TOOL |
| ---: | --- |
| 1,261 (40%) | `definedSymbols()` only matched `export function\|const` — it missed `class`, `interface`, `type`, plain and local declarations, and called real symbols fake |
| 726 | language **keywords** counted as claims — prose naming a declaration form talks about TypeScript, not about a symbol erpax defines. It blocked its own SKILL over this. |
| 704 | **bare backticks** counted as claims — `reference` is an axis name, `status` a field, `lease` a word. It blocked its own registry table over this. |
| **15** | only a **call** is a claim — the parentheses are what say *"this function exists"*. |

**The corpus's technical prose is ~99.5% honest about its code.** My measurement was wrong by two orders of magnitude until each false-positive class was removed — which is the argument for the gate rather than the estimate: an aggregate flatters whoever built it.

- `definedSymbols(cwd)` — every name `src` binds, in every declaration form, exported or not.
- `deadSymbolsIn(files, …)` — the edit-time check. Only SKILLs beside an `index.ts`; a **lexicon** atom is prose by design and claims no code.
- `assertProseCitesCode(cwd, ceiling)` — ratchets from 15. Each one is a real fabrication: write the function, or stop describing it.

**Honest boundary.** It proves a cited symbol is **defined**, never that the prose about it is **true** — a SKILL can describe a real function wrongly and pass. It closes **fiction, not error**.

**Law — [[law]]: technical prose must cite code that exists. A sentence about a function nobody wrote is fiction that reads as documentation — write the code, or stop claiming it.**

Composes: [[rules]] · [[confirm]] · [[law]].
