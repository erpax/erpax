---
name: sanitize
description: "Use when a sanitisation defect must be measured by the corpus itself rather than found by an external scanner — one-pass tag strips, JSON.stringify into generated code, hostname substring checks, hand-rolled quote escapes, and dotted-path writers with no __proto__ refusal, parsed from the grammar; the law the 25 CodeQL JavaScript alerts showed was missing."
atomPath: "rules/sanitize"
---

# rules/sanitize — the check an external scanner made, read natively from the grammar

CodeQL found **25** JavaScript alerts in this corpus and none of the 33 laws in the registry could
see one of them. Not because they were wrong — because they measure *structure*: folders, copies,
cycles, citations, faces. Sanitisation is a class the registry was **silent** on, and by
[[rules]]/domain's own law a class no gate opens is not passing, it is unmeasured and reading green.

The question that followed was the right one: *why is the code-quality check not from the MCP
itself?* Because the MCP can only project what the matrix contains. An alert fetched from GitHub is a
population the corpus cannot recompute — a door that is not holographic. This atom puts the check
where every other gate lives, parsed from the same tree, so `erpax.gate.*` measures it and CodeQL
becomes the **second instrument**, whose disagreement is the information ([[rules]]/collapse).

## Five shapes, each one planted before it was counted

| kind | the shape | why it is a defect |
| --- | --- | --- |
| `strip-once` | `.replace(/<[^>]+>/g, '')` outside [[xml]]/escape | one pass leaves `<scr<x>ipt>` as `<script>`; the fixpoint has one address |
| `json-into-code` | `${JSON.stringify(x)}` inside a template that is **code** | a JSON literal is not a JS literal: U+2028/U+2029 end a line, `<` can end a script |
| `host-substring` | `hostname.includes('x.com')` · `.endsWith('x.com')` | `evilx.com` passes; the host is the domain or a subdomain of it |
| `quote-escape` | `.replace(/'/g, "\\'")` | the backslash is the character it forgets; `JSON.stringify` is the complete escape |
| `proto-path` | `split('.')` + `cur[k] = …` with no `__proto__` refusal | a dotted key reaches `Object.prototype` |

What makes a template literal **code** is `CODE_MARKERS`, DECLARED in the open (`import ` · `export ` ·
`describe(` · `it(` · `=> {` · `return (` · `function `): no theorem derives it, so it is written where
a reader trips over it. A template with none of those is prose, and a `JSON.stringify` in prose is data.

## Measured

| | count |
| --- | ---: |
| on `main` before the 25-alert fix (2026-10-03) | **31** |
| after it | **19** |

The twelve that closed are the twelve the fix folded onto one address each: five one-pass strips onto
`stripTags`, three path-writers onto `writeNested`, two substring host checks, two quote escapes.
**This gate reports every one of them on the pre-fix tree and none of them after** — the zero it will
eventually earn is shown to be the kind that moves.

The nineteen that remain are the honest residue, and most of them are one class: `json-into-code` at
**13** sites where a generator emits a TypeScript catalogue with `JSON.stringify(entries, null, 2)` —
`translations/collect`, `standards/emit`, `vocabulary/emit`, `skill/router/build`, `workflow/seal`.
Their data is corpus-controlled, which is why no taint tracker flagged them, and a U+2028 in a
translation string would still break the emitted file. The cure is the one `leftover` already took:
a single `jsString()` at one address. `proto-path` holds **4** (`i18n/flattenToNested` builds nested
messages from dotted keys with no refusal), `quote-escape` **2**.

## Honest boundary

This proves a **shape** is present, never that it is **reachable by untrusted input** — that is what a
taint tracker adds and this gate does not have. So it over-reports against CodeQL on the generator
sites and must: a lexical law that is right about shape and silent about reachability is still a
law, and the ratchet carries the difference as a baseline rather than pretending it is zero.
`proto-path` is the weakest of the five — a function that splits on `.` and writes through a computed
key, with no prototype word in its body — and a writer that validates keys some other way reads as a
violation here until it names what it refuses. It reads `.ts`/`.tsx` outside tests; a planted defect
in a `test.ts` is the proof, not the population.

**Law — [[law]]: a check the corpus cannot recompute is not the corpus's check. Read the sanitisation
shapes from the grammar, at one address each, and let the external scanner be the second instrument —
two readings that disagree are the finding, and one reading nobody can replay is a rumour.**

## Standards

- **CWE-116** — improper encoding or escaping of output.
- **CWE-1321** — prototype pollution.
- **OWASP ASVS 5.3** — output encoding and injection prevention.
- **ISO/IEC 25010:2023 §5.4** — security: the corpus measures its own.

Composes: [[rules]]/domain · [[rules]]/collapse · [[xml]]/escape · [[field]]/nested · [[syntax]] · [[law]].
