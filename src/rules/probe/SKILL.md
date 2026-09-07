---
name: probe
description: "Use when reasoning about probe — For a React atom the answer is **yes** and this returns **no**. Its barrel is , because JSX does not parse from a file — that is not a stylistic variant, it is the only spelling…"
atomPath: "rules/probe"
coordinate: "rules/probe · 1/base · 42360688"
contentUuid: "de964ddb-61bd-5e6c-a1d7-c2336e635dae"
diamondUuid: "f054d76a-46cc-826d-8989-1689463f2fb2"
uuid: "42360688-a62b-8cc2-8fca-db03369bb334"
horo: 1
typography:
  partition: rules
  bondDegree: 17
standards: []
bindings: []
signatures:
  computationUuid: "4f920fc4-3b68-8ea8-8462-4eec0794ca84"
  stages:
    - stage: path
      stageUuid: "12624f23-0ea4-8a25-a098-3bde552410b3"
    - stage: trinity
      stageUuid: "5ff49173-e1f5-816b-ac36-8b737e0235e0"
    - stage: boundary
      stageUuid: "b3a8bc97-35b8-804f-8b98-0e771118be78"
    - stage: links
      stageUuid: "49b9d86f-d089-8966-905a-9129eff7d005"
    - stage: horo
      stageUuid: "14043d4f-58f5-86fb-aaeb-2a957917a91d"
    - stage: seal
      stageUuid: "bfa647b7-988e-865c-85dc-224530049911"
    - stage: uuid
      stageUuid: "0f4eccc8-2af7-8f42-a076-e8ab9badf6e3"
version: 2
---
# rules/probe — a test for a file by name must name every spelling that file has

```ts
const code = existsSync(join(dir, 'index.ts'))   // "does this atom have code?"
```

For a React atom the answer is **yes** and this returns **no**. Its barrel is `index.tsx`, because
JSX does not parse from a `.ts` file — that is not a stylistic variant, it is the only spelling such
an atom can have.

Four gates carried this bug simultaneously, and each was found by hand, separately: the trinity law,
the `ts-only` axis, `pivot/horo-table`'s trinity flags, and `rules/word-without-logic`. Between them
they flagged 6 atoms for the spelling of a barrel they had, never judged 29 that had no trinity at
all, recorded every React atom as `code:0 proof:0`, and called those same atoms *"prose without
executable matter"*. Correcting all four moved the counts **down** — those atoms were never
literary; the instrument could not see their code.

A fifth was only a matter of time. This is the gate.

| | count (2026-09-04) |
| --- | ---: |
| files probing for a twinned filename | 35 |
| **probes that never name the twin** | **48** |

## A probe, not a mention

`writeFileSync(join(dir, 'index.ts'), body)` creates a file and is right to name one spelling. Only
a **question about what is already there** can be blind to the answer, so what is flagged is an
existence or membership test — `existsSync` · `.has(…)` · `.includes(…)` · `=== 'index.ts'`.

A file naming the twin **anywhere** is exempt: it has considered the case, and that is the cheapest
honest signal there is. It also means one edit clears every probe in a file at once, which is how
the fix stays proportional to the defect.

## The shared answer

`trinityPresent(dir, leg)` in [[law]]/folder/constants asks the question once, so 35 files need not
each grow their own pair of `existsSync` calls — and the atoms whose probes decide what the corpus
*measures* were fixed first: the [[aura]] census, the `apply` inventory, and the `book` page legs.

**Honest boundary.** This proves a probe never mentions the twin spelling. It does not prove the
probe is **wrong** to ignore it — a genuinely TypeScript-only code path may want exactly `index.ts`,
and that is a per-case judgement the ratchet leaves to a human. It covers the two twinned trinity
names only; any other filename with a second lawful spelling is the same class and is not yet named
here.

**Law — [[law]]: a filter that selects by name must name every name the thing has. What it misses is
systematically the thing nobody thought to name — and it reports the miss as an absence, which reads
exactly like a fact.**

## Standards

- **ISO/IEC 25010:2023 §5.5** — analysability: a measurement blind to a population reports it as zero.

Composes: [[rules]] · [[law]]/folder · [[syntax]] · [[law]].
