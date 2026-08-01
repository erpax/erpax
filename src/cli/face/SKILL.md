---
name: face
description: "Use when a command must exist without anyone remembering to register it — the CLI surface derived from the tree instead of transcribed into a table. An atom is a command exactly when its index.ts carries a CLI guard, and that is read from the grammar so a guard quoted in a comment or a string cannot masquerade as one. Descriptions come from each atom's own SKILL.md, an unambiguous leaf resolves like a search hit, and an ambiguous one is refused with its candidates named. Explicit registry entries always win."
atomPath: "cli/face"
---

# cli/face — a face you must remember to declare is a face that will be missing

The registry was a hand-written map: one entry per command, added by whoever remembered. That is bounded work at ten atoms and unbounded at three thousand — and it **fails silently**, because an unregistered atom is simply not there.

The measurement settled it:

| | |
| --- | ---: |
| atoms already carrying a CLI guard | **336** |
| atoms anyone had registered | ~30 |
| reachable commands after deriving | **439** |

Four atoms built in a single session were unreachable until someone typed four lines. Nothing was broken; they just weren't there.

## Parsed, not matched

An atom is a command exactly when its `index.ts` carries `if (import.meta.url === \`file://${process.argv[1]}\`)`, and `hasCliFace` reads that from the **AST**. A guard quoted in a doc comment, a string, or a template literal is text, and the parser knows the difference:

```
guard in code    → true
guard in comment → false
guard in string  → false
```

That exact false-positive class already bit this corpus once: [[rules]]/confine's throwaway detector flagged a **docstring describing the code it replaced**. A regex over TypeScript is a guess; the grammar is the theorem.

## Nothing is typed twice

The help line comes from the atom's own `SKILL.md` frontmatter, which every atom already has by [[law]]/folder. The trinity is the source; the help text is a view of it. Add an atom with a guard and it is a command on the next run — no registry edit, no ceremony, no chance of forgetting.

## Resolving like a search

`erpax receipt` finds `agent/receipt`, because an unambiguous leaf resolves the way a search resolves a unique hit. **An ambiguous leaf gets no alias at all:**

```
ambiguous leaf refused — access → agent/access · security/remote/access
ambiguous leaf refused — chat   → agent/chat · bank/chat · quantum/chat
```

Guessing between two atoms is judgment without measurement. The full path always works, so refusing costs one extra segment rather than running the wrong thing. `leafCandidates(leaf)` names what the choice would have been.

**Explicit beats implicit, always.** A hand-written entry is someone's deliberate naming — a short alias, a flag, a different runner — and derivation never replaces it. What derivation closes is the gap where nobody wrote anything.

## Honest boundary

This proves a guard is **present**, never that running the atom **does anything useful** — a guard that prints nothing is still a face here. It covers `index.ts` under `src` only, so a command living elsewhere is invisible to it. And an atom with no guard stays a library: deriving a face does not give one to code that never asked for it.

**Law — [[law]]: the command surface is derived from the tree — an atom with a CLI guard IS a command, and a face that must be remembered into a table is a face that will be missing.**

## Standards

- **ISO/IEC 25010:2023 §5.6.2** — modularity: the surface follows the structure.
- **ISO-19011:2018 §6.4** — audit evidence: the listing is recomputable, not maintained.

Composes: [[cli]] · [[rules]]/cycle · [[syntax]] · [[law]]/folder · [[law]].
