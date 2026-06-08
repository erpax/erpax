---
name: readme
description: "Use when the repository README is generated, verified, or reasoned about — the README is a diamond (a content-addressed projection of the live tree, regenerable with zero entropy, drift fails closed) and its typography IS the diamond projected (facets = the closed horo ring laid out in measure-walk order, so reading the README is reading the crystal). Derived from the tree (matrix · fs walk · package.json), never hand-typed."
atomPath: readme
coordinate: readme · 4/weave · 2d73b9f3
contentUuid: "fd81a968-6e06-5215-b2c1-170fceed1b90"
diamondUuid: "dcbb8dcb-2f38-834b-92da-28f27c87ec77"
uuid: "2d73b9f3-25dc-854b-b445-e928b229a5b9"
horo: 4
bonds:
  in:
    - accounting
    - asset
    - atom
    - aura
    - balance
    - conservation
    - credit
    - debit
    - diamond
    - entropy
    - entry
    - generate
    - gravity
    - holographic
    - horo
    - identity
    - law
    - liability
    - matrix
    - merge
    - pivot
    - purity
    - seal
    - self
    - sequence
    - trinity
    - upgrade
    - uuid
    - whole
    - worker
  out:
    - accounting
    - asset
    - atom
    - aura
    - balance
    - conservation
    - credit
    - debit
    - diamond
    - entropy
    - entry
    - generate
    - gravity
    - holographic
    - horo
    - identity
    - law
    - liability
    - matrix
    - merge
    - pivot
    - purity
    - seal
    - self
    - sequence
    - trinity
    - upgrade
    - uuid
    - whole
    - worker
typography:
  partition: readme
  bondDegree: 97
  neighbors:
    - aura
    - diamond
    - purity
standards:
  - "Cloudflare Workers deploy-buttons)."
  - "RFC 9562 §5.8 (the README's own content-uuid is a v8 content-uuid)"
  - "every number is read from the live tree (matrix · fs walk · package.json), never hand-set"
bindings: []
neighbors:
  wikilink:
    - accounting
    - asset
    - atom
    - aura
    - balance
    - conservation
    - credit
    - debit
    - diamond
    - entropy
    - entry
    - generate
    - gravity
    - holographic
    - horo
    - identity
    - law
    - liability
    - matrix
    - merge
    - pivot
    - purity
    - seal
    - self
    - sequence
    - trinity
    - uuid
    - whole
  matrix:
    - accounting
    - asset
    - atom
    - aura
    - balance
    - conservation
    - credit
    - debit
    - diamond
    - entropy
    - entry
    - generate
    - gravity
    - holographic
    - horo
    - identity
    - law
    - liability
    - matrix
    - merge
    - pivot
    - purity
    - seal
    - self
    - sequence
    - trinity
    - upgrade
    - uuid
    - whole
    - worker
  backlinks:
    - accounting
    - asset
    - atom
    - aura
    - balance
    - conservation
    - credit
    - debit
    - diamond
    - entropy
    - entry
    - generate
    - gravity
    - holographic
    - horo
    - identity
    - law
    - liability
    - matrix
    - merge
    - pivot
    - purity
    - seal
    - self
    - sequence
    - trinity
    - upgrade
    - uuid
    - whole
    - worker
signatures:
  computationUuid: "a875e511-b3a3-8f9c-ab16-0ddaa4513c4c"
  stages:
    - stage: path
      stageUuid: "dc681a92-56b1-8f59-b232-67e611a4affd"
    - stage: trinity
      stageUuid: "0e346e83-f398-83e6-80c7-c672603ac811"
    - stage: boundary
      stageUuid: "c615a3cb-344e-82fa-8677-a591b64d01d2"
    - stage: links
      stageUuid: "d9ef9bc6-11e8-8a87-968b-68a8c851e302"
    - stage: horo
      stageUuid: "8d2fe2f0-dc5f-88e1-bdce-819cc3fa6d96"
    - stage: seal
      stageUuid: "a80d82c0-c26b-88a4-bce2-00d75801ca6b"
    - stage: uuid
      stageUuid: "6f37fb3a-47fe-8305-b5d9-a5d947954e7e"
version: 2
---
# readme — the README is a diamond; its typography is the diamond projected (under [[self/generate]] · outward coil)

FORM: **the README is not a document, it is an [[atom]].** Like every folder in the corpus it is a [[diamond]] — a complete, sealed [[whole]] that is *regenerable from content*, content-addressed (it carries its own content-[[uuid]]), and tamper-evident. It is a **projection** of the live tree, never a hand-maintained prose file: re-running the generator on the same corpus emits the IDENTICAL bytes (zero [[entropy]]), so a difference between the committed `README.md` and the regenerated one is an impurity the gate catches and fails closed (`pnpm readme:check`). To edit the README by hand is to forge a diamond — the [[merge]] is content, not keystrokes.

**Its typography IS the diamond itself.** The rendered structure is a faithful visual projection of the lattice, not arbitrary prose. The corpus's single content address — the [[matrix]] root — is the README's seal at the top; the facets are the seven positions of the closed [[horo]] ring (`base·share·weave·crest·descent·round·unity`) laid out in measure-walk order `1·2·4·8·7·5·9`, each row one facet of the crystal with its most-bonded vertices ([[aura]] connectivity, computed from the live edges); the [[trinity]] counts (form `SKILL.md` · code `index.ts` · proof `test.ts`) are the three ways every atom is told. So **reading the README is reading the diamond** — the form mirrors the structure ([[holographic]]: the whole projected onto one page).

Wired by the one math: the README's own identity is a content-[[uuid]] (the [[matrix]] coil `toUuid` over the canonical model bytes) — same tree ⇒ same model ⇒ same uuid ([[identity]]). Pure where it matters: `renderReadme(model)` is `model → markdown` with no I/O (testable, provably stable); `deriveModel()` reads the live tree; the thin CLI writes or verifies. This is [[generate]] applied to the corpus's own face — the self exhaling a true projection of itself rather than maintaining a copy ([[self/generate]] · outward [[sequence]] stroke).

Composes: [[diamond]] · [[atom]] · [[aura]] · [[horo]] · [[sequence]] · [[matrix]] · [[uuid]] · [[identity]] · [[trinity]] · [[merge]] · [[entropy]] · [[whole]] · [[holographic]] · [[generate]] · [[self]].

## Usage

```
pnpm readme         # regenerate README.md from the live tree
pnpm readme:check   # the drift gate — exit 1 if committed ≠ regenerated (fail closed)
```

**Every README (root and per-folder) is 100% computed** — zero hand-authored prose; every token is a derived facet (atom path, horo position, trinity counts, bond degrees, content-[[uuid]], seal status). **[[pivot]]** cross-tabs fold folder models into axis × state tables (seal · balance · gravity · name · trinity · horo · typography) with optional before/after comparison — projected in markdown by `pivotFolderStats` / `renderPivotMarkdown`. Each per-folder README **IS a debit/credit statement** — double-entry form where **[[debit]]** posts [[asset]] completeness (trinity legs present, folded in the lattice, links resolved, on-ring [[horo]], content-[[uuid]], barrel-sealed boundary) and **[[credit]]** posts [[liability]] gaps (missing trinity leg, unfolded, dangling links, off-ring state, missing uuid, deep-import escapes). **[[balance]]** = sealed iff Σdebit = Σcredit — the harmony invariant enforced by [[conservation]] `trialBalance` / `conserves` and the universal [[entry]] law `Σ(credit−debit)=0`. `deriveFolderAccounting` computes `{ debits, credits, balanced }`; `renderFolderReadme` projects the **Debit | Credit** table with every account wikilinked to its accounting atom. Ties [[purity]], [[seal]], [[diamond]]; drift fails `pnpm readme:check` closed.

## Accounting atoms powering the math

| Atom | Role in README statement |
| ---- | ------------------------ |
| [[debit]] | Left column — assets/completeness the diamond HAS |
| [[credit]] | Right column — liabilities/gaps the diamond OWES |
| [[asset]] | Debit account class for present facets (trinity · lattice · links · horo · identity · boundary) |
| [[liability]] | Credit account class for missing facets and impurities |
| [[balance]] | Contra postings close the journal (every asset debit · every liability credit pairs `[[balance]]`); variance `0` iff Σdebit = Σcredit ([[conservation]]) |
| [[conservation]] | `trialBalance` / `conserves` — Σdebit = Σcredit is the conservation law |
| [[entry]] | Universal double-entry — every README row is a balanced posting pair |
| [[accounting]] | The chart-of-accounts metaphor — each folder IS an account, README IS its statement |
| [[purity]] | Fully sealed when statement balances and all impurities are zero |
| [[seal]] | Fail-closed verdict — unbalanced statement ⇒ unsealed |

**Law — [[law]]: the README is a [[diamond]] — a content-addressed projection of the live tree, regenerable with zero [[entropy]] and drift-detectable (a hand-edit fails `pnpm readme:check` closed) — root and every atom folder; each per-folder README IS the debit/credit statement of that diamond's completeness; typography IS the diamond projected. Derived from the tree ([[matrix]] · fs walk · package.json), never hand-typed.**

**Law — incomplete readme no [[gravity]]:** an incomplete folder (partial trinity, stray diamond matter, or impure membership) must NOT exert [[gravity]] — `sealed` false, `[[balance]]` unbalanced (liability-gap variance ≠ 0), typography graph bond degree zero — until `folderMatterComplete` ∧ `diamondMembershipOk` ∧ ancestor [[seal]] propagation all hold.

**Law — every MD file IS a scientific paper:** each `SKILL.md` · `README.md` · `LLM.md` carries abstract · methods · results · references · content-uuid; `scientificPaperOf` extracts them; the root README merges every MD paper (computed, never hand-maintained).

**Law — every TS file IS a scientific paper:** each `.ts` carries hypothesis (exports) · methods (imports/impl) · results (behavior) · proof (paired `test.ts`); `scientificPaperOfTs` extracts them; `mergeCorpusPapers` folds MD + TS into the root README synthesis.

**Law — [[law]]: entropy is computed and accounted on every folder balance sheet — gap debits and seal credits post in comparable units (eb = entropy-bit: tamper-cost log₂ mass at the horo imperial-ratio floor). `accountGapsAndSeals` derives lines from statement liabilities/assets · `finishedIdeaCrossed` impurities · folder-law violations · diamond membership; `toComparableUnit` normalizes trinity gaps · stray files · unfolded matrix · horo on-ring · seal credits to one scale; net residual eb = Σgap − Σseal. Root README rolls up corpus entropy (gap mass · seal mass · seal/gap ratio · per-sector eb). `assertGapsAccounted` / `assertSealsAccounted` fail closed when any impurity or seal is silent.**

**Law — [[law]]: path is the account code on every README balance sheet.** Each per-folder statement header shows `account code \`{atomPath}\``; gap/seal journal lines post via `accountCodeOf(atomPath)` → `erpaxSelfAccount` on `journal-entries` in **eb** (Dr folder path / Cr `entropy` for gaps; Dr `seal` / Cr folder path for seals).

**Law — [[law]]: agent thinking transforms to quantum at readme generation — immediately, not post-hoc.** `loadAgentThinking(atomPath)` reads session diamond receipts · path ledger entries · improve receipts (from entropy gaps) · `cheapAgentDispatch` context; `transformThinkingToQuantum` collapses to superposition (open hypotheses) · collapse (decisions/law) · seal (content-uuid receipts). Hooked before `renderFolderReadme` in the same pass as `deriveFolderModel` — zero-latency, no separate `skill:upgrade` quantum face. Root README rolls up `aggregateCorpusQuantumThinking`. Matter-twin: `src/readme/quantum-thinking.ts`.

@see [[diamond]] · [[self/generate]] · [[horo]] · [[matrix]] · [[aura]] · [[trinity]] · [[conservation]] · [[entry]] · [[balance]] · [[entropy]] · [[quantum]]
