---
name: syntax
description: "Use when a gate needs a grammatical fact about source — which comments a file has, which names it binds. Wraps ts.createSourceFile so the answer is the compiler's, not a pattern's: a // inside a string is not a comment, and no regex can tell. The gates derive from here rather than each guessing."
---

# syntax — you cannot trust something that is not a theorem

**A regex over TypeScript is a guess.** The language has a grammar; a pattern that *usually* matches it is a heuristic wearing a theorem's clothes. Every false measurement this corpus has paid for came from pattern-matching the language instead of parsing it — and every "fix" was a **better pattern**, which is still a guess:

| gate | what the pattern counted | reported → honest |
| --- | --- | ---: |
| [[rules]]/prose | keywords as claims | 1,261 → 15 |
| [[rules]]/reference | string literals as citations | 97 → 48 |
| [[standards]]/emit | prose *about* banners as banners | 5,881 → 5,857 |
| [[rules]]/cycle | missed side-effect + dynamic imports | 152 → **225 files** |

Note the last row. The others **over**-reported; the cycle pattern **under**-reported by 211 edges. **A heuristic does both, and cannot tell you which** — which is why a robustness check run on one proves nothing. That was demonstrated the hard way: "correcting the inline-type class moved neither the 152 nor the 20, so the tangle is not an artifact of the scan" was written from the regex, and the grammar then moved it to 225.

## What it provides

- **`commentsOf`** — a comment is where prose lives; everything else is **data**. A `//` inside a string literal is not a comment, a `/*` inside a regex literal is not a comment, a URL's `//` in a template literal is not a comment. The scanner knows, because it is the thing that tokenises them. Measured against the regex it replaces, across 6,208 files: that pattern **invented 70** `src/…` citations the compiler says are not in comments at all — a path inside a CLI command string, an asset path in code.
- **`boundNames`** — every declaration form at once. This is the question [[rules]]/prose answered with `/export (function|const)/`, calling `class`, `interface`, `type` and every local declaration fabricated: **1,261 false positives, 40% of the corpus**. Each patch removed one class and left the next.
- **`commentSites`** — the same grammar as `commentsOf`, but keeping each comment's **byte offset**. Paired with **`lineColumnOf`** (a pure, exact newline count → 1-indexed line/column), it resolves the exact **line:column** of a claim marker inside a comment. A coordinate is a *read*, not a search — an agent jumps to the surgical edit, never scans for it ([[leftover]]'s waves).

## Why one atom

The same lie written twice is fixed in neither ([[merge]]/chainLeaf, where one audit-leaf stub was hand-rolled ten times). `reference` and `emit` shared a comment-extractor and shared its leak; wiring both to the grammar moved `reference` **501 → 488** dead pointers, **48 → 46** statutory — two of the "legal defects" reported that morning were phantoms — and `emit` **5,857 → 5,843** banners.

**Honest boundary.** The parser is the language definition, so these facts are not *better guesses* — but a fact is not a judgement. `commentsOf` proves a string **is** a comment, never that its content is **true**; `boundNames` proves a name is **bound**, never that it is **used**. And the atoms still guessing are named rather than implied: `prose`'s `DEFINE_RE` and `CITE_RE`, `refutable`'s `CLAIM_RE`, `emit`'s `rg`. Every count they have produced is a guess until it derives from here.

**Law — [[law]]: a gate reads the grammar, never a pattern that resembles it. A measurement you cannot prove is a number you cannot trust — and it will be wrong in the direction you did not check.**

## Standards

- **ECMA-262 / TypeScript grammar** — via `ts.createSourceFile`, the compiler's own scanner.

Composes: [[rules]] · [[law]].
