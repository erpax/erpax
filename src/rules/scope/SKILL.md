# rules/scope — a whole-tree scan an author must wait for needs a changeset twin

Every slow cycle in the session that produced this atom had one shape: **the whole corpus measured to
answer a question about a changeset.**

`matrix-crack` was the worst of it. 1,823 ms of whole-tree parse per ask, run only at the push, as a
COUNT — so telling my own new violation from the **451 of 11,631 files that already held one** meant
checking `HEAD` out into a worktree and diffing populations. By hand. Three times in one session.

The cure is not a faster scan; it is a scan that can be **asked about a changeset**. `matrixCracksIn(files)`
costs **2 ms** and returns the whole-tree answer for those files — 746 = 746, proven empty in both
directions — because `categorize` reads no cross-file state. That is the difference between a law that
can live at the WRITE and one that can only ever be met after the mistake.

| | count (2026-09-28) |
| --- | ---: |
| laws under `src/rules` exposing a scan | 32 |
| **tree scan and NO changeset twin** | **28** |

## The measurement corroborates itself

`mirror` · `forge` · `prose` · `reference` are **absent** from the 28 — and those are exactly the four
laws the [[confirm]] write hook runs. The laws that have a twin are the ones already at the write; the
28 without one are push-only by construction. Nothing told the instrument which laws are in the hook;
it reports the same split from the grammar alone.

## Parsed, because the older answer is a guess

[[rules]]/domain asks a neighbouring question with
`/export\s+(?:async\s+)?function\s+\w+\s*\(\s*cwd\s*[:=)]/` over source. A regex over a language is a
guess: it cannot see a destructured parameter, an arrow-function export, or a declaration wrapped
across lines. `firstParamName` reads the grammar — the same correction [[rules]]/cycle paid for at 115
files, [[rules]]/prose at two orders of magnitude, and `scanExports` paid for in this very session when
`'export const SOMETHING'` **inside a test's string literal** counted as a real export with no callers.

An `assert*` export is skipped: it throws rather than reads, and its cost is its scan's, already counted.

## Honest boundary

This proves a law offers no `files`-first reader, never that it COULD. Several are genuinely
whole-corpus questions and must stay: [[rules]]/cycle asks which files are mutually reachable, and there
is no changeset answer to that — adding one import changes the answer for files the changeset never
touched. [[rules]]/collapse compares every booted collection shape against every other. Naming them is
the point; deciding which can be scoped is a human's call, one law at a time.

It reads `src/rules/*/index.ts` only, so a law living elsewhere is outside it — `matrix-crack`, the
axis that motivated the whole thing, is in `src/matrix` and is therefore **not** counted here. That is
this corpus's own domain law arriving in the atom that measures scope, and it is named rather than
implied to be closed.

**Law — [[law]]: a law an author must wait for is a law an author will route around. If a verdict is a
pure function of the files it reads, it must be askable about those files — and a tree scan with no
changeset twin can only ever be a push-lane gate, met after the mistake instead of while making it.**

## Standards

- **ISO/IEC 25010:2023 §5.5** — analysability: a measurement must be affordable where it is read.
- **ISO 19011:2018 §6.4** — audit evidence: a finding must name the files it rests on.

Composes: [[rules]] · [[rules]]/domain · [[confirm]] · [[syntax]] · [[law]].
