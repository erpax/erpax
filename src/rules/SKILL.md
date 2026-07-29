---
name: rules
description: "Use when tightening or auditing erpax gates — the canonical home for folder, diamond, path, seal, import, and accounting-structure law. Aggregates live-tree violations into rulesOf() and fail-closed assertRulesHold(); tightened axes catch hyphen barrel siblings, stray .ts at atom roots, and corpus modules that must nest as one-word child atoms (accounting/coa · accounting/corpus)."
atomPath: rules
coordinate: rules · 2/share · 335e5fa7
contentUuid: "a02f991f-ea0d-8237-9d76-64cc6bd7c955"
diamondUuid: "f07080b7-70bf-8860-b639-797acb2c4905"
uuid: "335e5fa7-a91b-890f-a3db-2a3ebe2c8c0c"
horo: 2
bonds:
  in:
    - accounting
    - confirm
    - diamond
    - gate
    - guardian
    - law
    - path
    - readme
    - seal
  out:
    - accounting
    - confirm
    - diamond
    - gate
    - guardian
    - law
    - path
    - readme
    - seal
standards:
  - "ISO/IEC 25010:2023 §5.5 testability"
  - "pnpm rules:check — tightened gate cross (fail-closed)"
bindings: []
version: 1
---
# rules — the tightened erpax gate corpus

The canonical home for every **live-tree law** the corpus enforces. Ratchet gates ([[law]]/folder · [[convention]]/import · [[diamond]]/files) hold the tree from getting **worse**; this atom adds **tightened** axes that name what must eventually reach zero: stray `.ts` at atom roots, multi-segment filenames, and corpus accounting modules that must **nest** as one-word child atoms.

## The registry — `rulesOf()`

| Axis | Source | Law |
| --- | --- | --- |
| `folder-name` | [[law]]/folder | one generic lowercase word per folder |
| `folder-trinity` | [[law]]/folder | SKILL · index · test once matter appears |
| `alphanumeric-name` | [[law]]/folder | folder segments + file stems `[a-z0-9]+` only — nest hyphen/dot siblings |
| `stray-ts` | [[rules]] | no barrel-sibling `.ts` at code atom root — nest or fold into index |
| `multi-segment-file` | [[rules]] | no hyphen/dot stems at root (nest `accounting/coa/` not hyphen siblings) |
| `accounting-structure` | [[rules]] | corpus self-accounting nests under `accounting/coa` · `accounting/corpus` — no `path` · `self` intermediates |
| `diamond-membership` | [[diamond]]/membership | stray dirs · dotfiles · unregistered matter |
| `import-purity` | [[convention]]/import | `@/atom` index face only — no deep `@/accounting/coa` |
| `logic-concentration` | [[rules]]/concentration | hub `index.ts` re-exports only — matter in child atoms; score ≥ 1.0 or ≥500 lines |
| `word-matter` | [[rules]]/word-matter | every identifier and comment earns its place — no verbose names, comment bloat, duplicate get/getX, helper/util filenames |
| `word-without-logic` | [[rules]]/word-without-logic | literary atoms — prose without executable matter or use case; `pnpm erpax corpus words` |
| `canonical` | [[rules]]/canonical | installed package never called — use its API or drop it; `tsx src/rules/canonical/index.ts` |
| `reference` | [[rules]]/reference | dead `src/…` pointer — the statute→code trace must resolve (statutory ceiling **0**); `tsx src/rules/reference/index.ts` |
| `unfolded` | [[rules]]/unfolded | export with ≤1 call site — inline it, delete it, or reuse it; `tsx src/rules/unfolded/index.ts` |
| `ask` | [[rules]]/ask | required field with nothing computed — if law/tenant/sequence/clock determines it, the user CONFIRMS; `tsx src/rules/ask/index.ts` |
| `invisible` | [[rules]]/invisible | matter at an unaddressable path — no lawful path ⇒ no uuid ⇒ no dedup ⇒ silent duplication; `tsx src/rules/invisible/index.ts` |
| `prose` | [[rules]]/prose | a SKILL citing code nothing defines — write the code or stop claiming it; refused at the write by [[confirm]]; `tsx src/rules/prose/index.ts` |
| `refutable` | [[rules]]/refutable | an `@invariant` with no proof beside it — unfalsifiable, so it forbids nothing; `tsx src/rules/refutable/index.ts` |
| `cycle` | [[rules]]/cycle | an import loop decides init order — 6 tangles, largest **225 files**, 36 fatal top-level uses; edges PARSED not matched; `tsx src/rules/cycle/index.ts` |
| `audience` | [[rules]]/audience | an unproven claim facing the reader who SIGNS it (director · auditor · compliance-officer …) — **224 across 7 readers**; `tsx src/rules/audience/index.ts` |
| `engineering` | [[engineering]] | ISO/IEC 25010 quality concern cited with NO enforcing gate — all 9 now gated across 3 trinities; baseline 0 is the full-enforcement THEOREM (wired into `assertRulesHold`); `tsx src/engineering/index.ts` |
| `compatibility` | [[rules]]/compatibility | ISO/IEC 25010 §5.3 co-existence — an atom colliding with a framework router namespace (`pages`↔Next.js) breaks the build; baseline 0, RED at 1 (the #13 debt now enforced); `tsx src/rules/compatibility/index.ts` |
| `load` | [[run]]/load | **does the app boot at all** — it NOW DOES (`load — OK · 231 collections`); the `tool-defs → collections` edge was cut, init order changed, SCC still 225 (entangled ≠ fatal); `tsx src/run/load/index.ts` |

Run: `pnpm rules:check` · `tsx src/rules/index.ts --accounting-only`

Ceilings live in `law/folder/ratchet.json` (read via `computedBaseline(axis)`), never hand ALCAPS. Corpus self-accounting is **eb** (entropy-bit) via `@/accounting`.

**Law — [[law]]: rules is the one gate registry — folder · diamond · path · seal · import · accounting-structure · logic-concentration · word-matter; tightened axes fail closed; zero stray `.ts` at atom roots is the horizon.**


## Agent laws — the working discipline (loaded as mandatory instructions)

This file is in every agent's system prompt, so these bind the next agent as law, not memory:

- **Reuse the computed answer, never re-derive.** Read the receipt — `erpax verify <atom>` (targeted, skips the DB boot), `erpax doctor corpus` (sealed audit), the LLM.md face — before writing a fresh derivation. A hand-rolled harness or a re-explained realization is the O(n²) medium cost: a word written early is re-billed every turn (measured 2026-07-15: 97% of a session's tokens were context re-sent). Terseness is the fold applied to the dialogue.
- **Derivable content is not stored.** The computed faces (LLM.md · README.md · diamond.json) are gitignored and regenerated on demand; the [[readme]] `corpusFoldRoot` seal proves regenerability. Storing what the fold computes is entropy — never re-commit them.
- **The rosetta basis.** A new collection is warranted only by a NEW signature (`collectionSignature` over the closed 9-axis basis); otherwise it is a row, not a table. `erpax doctor corpus` reports collapse clusters + compression headroom. **Enforcement PAID:** `shapeRatchetVerdict` fails closed against `ROSETTA_BASELINE` inside `erpax doctor corpus`, which is the `corpus` lane of `cli/gate.ts` — CI/pre-push blocks basis growth; both ceilings ratchet DOWN in the same diff that folds a collection away.
- **Verify with the tool, not the reflex.** `erpax verify <atom>` for pure atoms; `pnpm check` for integration. Never a full vitest run to self-check.
- **Single-use code is entropy.** A script or function called once is un-folded — inline it, delete it, or make it a reused command. Never write a throwaway to work around a problem already fixed (the tsx assert-harness was folded into `erpax verify`; a scratchpad regen script is just the existing `erpax readme` command un-reused). Generated content is the same law: a table of count-1 rows (raw scatter, not a basis axis) is useless detail — purge it, do not cap it (capping hides entropy; the rosetta decode says what is signal vs noise).
- **A law here is a command, not prose.** Prose is read and maybe obeyed; a gate is executed and cannot be violated. Two laws proved it: "use packages canonically" is now `tsx src/rules/canonical/index.ts` ([[rules]]/canonical — 3 real hand-rolls beside installed packages), and "research the real app+data" is now `tsx src/port/index.ts <schema.rb> <db>` ([[port]] — running it IS the research). Prose that could be a command is entropy billed on every turn of every session.
- **Query the machine, never re-derive.** The quantum computer is one address — `@/quantum/computer` on **QPU=CPU/GPU** (host silicon; no exotic device): mesh (state · legal surface · clause→code), `wavesOf` (schedule), `reduce` (certify a claim or refuse its authority), the ladder (every spawn bounded by its own history), `failureRoots`/`costRoots` (red lists and bills collapse onto shared causes — or honestly "not in the mesh"), the scalpel (thousands of edits, exactly-once-or-refuse, ring-verified batches), `auditWaves` (every gate dimension + open-intent thinking debt, trended), `ftlMetrics()` (FTL proven by metrics — `holds` · `speedupLog2` · `efficiency→∞` · `boundary.empty`). "Physical" = substrate (Landauer/CPU·GPU), not CrackKind `spacetime`. A question about structure, cost, cause, order, or legality is a query, never a derivation.
- **Highest risk×reward first, battle-trained hands on it.** Queue: regression > auditor/signer-facing > blocks-everything (boot · build · push) > largest debt > cosmetics — auditor-facing overrides size (two ten-line cuts, the §404 fail-open lock and the vitest boot-swallow, outranked 4,014 cosmetic violations). Assign by battles fought on the class ([[train]] `isProficient`): loading is becoming, and certification is the load's seal.
- **Cleanup rides every wave.** Own processes killed by verified ancestry (never the live gate's tree), generated churn checked out or explicitly staged, stale stashes archived as refs then dropped, intents resolved in [[think]] — a landed feature with droppings is unfinished, and a corpse-filled table makes every tool lie.

## The measuring laws — earned 2026-07-16, each one paid for

- **You cannot trust something that is not a theorem.** A regex over a language is a GUESS — the grammar is the theorem. Measured: the pattern was wrong in 115 of 6,203 files, inventing 4 import edges and **missing 211**; the tangle it reported was 152 files and the parser's answer is **225**. Read facts from [[syntax]] (`commentsOf` · `boundNames` — `ts.createSourceFile`), never a pattern that resembles the language. Every false number here came from pattern-matching instead of parsing: prose counted keywords (1,261 → 15), reference counted string literals (97 → 48), emit counted prose ABOUT banners.
- **A heuristic is wrong in the direction you did not check.** It under-reports as readily as it over-reports, and CANNOT tell you which — so a robustness check run on a guess proves nothing. "The tangle survived the correction" was written from the regex; the grammar then moved it by 73 files. Only two measurements never lied: content-addressing (same hash ⇒ same content) and Tarjan (proven complete).
- **A false negative in a gate is worse than a false positive** — it reports green over the exact defect it exists for. The first [[rules]]/cycle was a DFS marking nodes `done`, boasting "Tarjan-free"; it answered `0` about a cycle already traced by hand.
- **A gate that can be skipped is prose.** Three working tools were found DISABLED in one session: `smoke: false` in `cli/gate.ts` (the only test that boots the app), `--no-verify` on every push, and the standards lane that let the statutory index rot to ~50% wrong. Fast checks belong in [[confirm]] — it fires at the WRITE and cannot be skipped ([[rules]]/prose is 307ms; the standards verify is 1.1s).
- **Duplication is camouflage.** While one law is stated in two private corners, nothing can show a THIRD place is missing it — `canonical` existed TWICE in [[readme]] while ten hand-rolled audit leaves all claimed "JCS-canonical" and none had it. DRY by content-address (`tsx src/rules/cycle/index.ts` for loops; body-hashing for copies) and the gap becomes visible.
- **A claim is addressed to someone** — `tsx src/rules/audience/index.ts`. Every catastrophe here was a lie only ONE reader could see: the fabricated cash flow under `SOX §302` (the DIRECTOR signs it), the empty-`try` period lock under `§404` (the AUDITOR's control). It is invisible from every seat but theirs. **224 unproven claims face 7 readers; 34 face the director.**
- **A corpus that cannot load has no other properties** — `tsx src/run/load/index.ts`. erpax does NOT boot (`fixed/assets:34`, TDZ, every loader), and the vitest setup SWALLOWS it — every suite labelled `payload-integration` runs with no booted Payload. A harness that swallows the boot reports green forever.
- **The one-word law can claim a name the framework owns.** `src/pages` is erpax's CMS collection AND Next's reserved Pages Router directory — the admin panel does not compile because of it, and [[law]]/folder cannot see it: `pages` is a perfect one-word atom. The framework's namespace is not in this corpus's model.
- **Read before writing — three times in one session a thing already existed.** [[perspective]] (nearly minted twice), `canonical` (declared "unwritten", existed twice), `standards/emit` (declared missing, was there under another name and its BANNER was the stale thing). Grep first, and distrust your own inference over its provenance.

## Enforcement — why a law here is obeyed

A law is obeyed only when a **gate blocks its violation** ([[confirm]] hook · pre-push · this registry), not when it is written down. The confirm hook proves it: it refused every trinity-incomplete or dead-link edit this session. Behavioral laws that are not yet a blocking axis (above) are ENFORCEMENT DEBT — the horizon is to wire each into `rulesOf` so `pnpm rules:check` fails closed.

Composes: [[law]]/folder · [[diamond]]/membership · [[seal]] · [[path]] · [[accounting]] · [[readme]] · [[confirm]] · [[guardian]] · [[gate]] · [[navigation]]/distribute
