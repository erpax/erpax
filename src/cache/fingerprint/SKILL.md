---
name: fingerprint
description: "Use when a whole-corpus derivation (rules snapshot, readme graph, corpus context) is computed by many callers — corpusFingerprint + memoByFingerprint reuse the one scan across siblings, the compute-tier of learn-by-shared-experience and the buildable AI-bill lever."
atomPath: "cache/fingerprint"
coordinate: "cache/fingerprint · 2/share · 9b1f7aa3"
contentUuid: "810625b3-e390-5483-b69e-7a32519c52dd"
diamondUuid: "a5eb6d9e-eeda-846d-bcbf-9194ff4b824d"
uuid: "9b1f7aa3-0cb2-8790-bbab-8ccde79b8b4d"
horo: 2
typography:
  partition: cache
  bondDegree: 11
standards: []
bindings: []
signatures:
  computationUuid: "e6da5b7c-f4bb-8eca-bbe5-6ed7ae80bba4"
  stages:
    - stage: path
      stageUuid: "9330f767-034a-8e89-98a5-6408dacef4a6"
    - stage: trinity
      stageUuid: "332e0ea5-5e63-8e4f-99a2-f8b848fa4c9e"
    - stage: boundary
      stageUuid: "a327a607-c08b-8ccb-ae2d-5f6b2f0a2159"
    - stage: links
      stageUuid: "a7c43aa0-7f93-8744-874e-30078f10f86d"
    - stage: horo
      stageUuid: "b5b21dcf-8f24-8427-b468-9866a99c00cc"
    - stage: seal
      stageUuid: "228b64f1-3fd2-845e-85b6-dffa239fdd32"
    - stage: uuid
      stageUuid: "9011c6f6-8bb8-8b84-967a-52398245f9b8"
version: 2
---
# cache/fingerprint — reuse the whole-corpus scan, never re-derive it

A dozen derivations each pay the same 8–27s whole-tree scan (the rules snapshot, the readme typography graph, the corpus context). Re-running them is the cost the session named: the machine re-deriving what it already computed, and — worse — the **agent** waiting and re-reading, which is **billed in tokens**. This atom is the shared primitive so the FIRST caller computes and every sibling reuses.

`corpusFingerprint(cwd)` = file count + newest src mtime. The reuse rests on a theorem: **same fingerprint ⇒ same tree ⇒ same derivation**, so a memo keyed by it can never serve stale data — any edit bumps the mtime and forces a fresh compute. `memoByFingerprint(name, cwd, compute)` runs `compute` at most once per fingerprint; it holds any value, including non-serializable ones (a resolver closure, a graph), which the disk tier cannot.

This is the **compute-tier of "learn by shared experience"** — one scan, shared, instead of N re-derivations — and the one buildable lever from the AI-bill research: it moves corpus re-derivation off the agent's wait-and-re-read. The fingerprint had been copied into skill-context and readme/compute; this folds it to one home ([[rules]]/unfolded).

**Honest boundary.** In-process only: within one process, N callers collapse to one scan. Across processes (separate vitest workers) the memo does not share — that needs the **disk tier** (a JSON cache keyed by the same fingerprint), which works only for serializable results (`compactRulesSnapshot`) and is the next fold. And a memo is correct only while the fingerprint is honest: a change the fingerprint cannot see (an env var, a non-`src` input) would not invalidate it — so this is for pure whole-`src` derivations only.

**Law — [[law]]: a whole-corpus derivation is computed once per unchanged tree and reused. The fingerprint is the proof of freshness; reuse keyed by it is exact, and it moves re-derivation off the AI's bill.**

Composes: [[cache]] · [[rules]]/unfolded · [[law]].
