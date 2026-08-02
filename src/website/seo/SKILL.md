---
name: seo
description: "Use when reading the SEO face registry — listFaces and the schema/OG vortex, in a module with ZERO imports. That property is why it is its own atom: @/integrity/uuid-stream took listFaces from the @/website barrel, and the barrel dragged the whole page/agent/spec subtree into the module that exports uuid and jcsCanonicalize to the entire corpus. Importing a leaf adds no edge."
atomPath: "website/seo"
---

# website/seo — the leaf that let `@/integrity` out of the tangle

`listFaces` is one function over a registry. It was reached through the `@/website` barrel, and that barrel is deep in the corpus's largest import component — so `@/integrity/uuid-stream` taking **one symbol** dragged the page/agent/spec subtree into the module that exports `uuid` and `jcsCanonicalize` to everything.

The file already had **zero imports**; it was simply not addressable on its own. Promoting it from a stray `.ts` to a one-word sub-atom made the same binding reachable without the barrel — and satisfied three laws at once:

| law | before | after |
| --- | --- | --- |
| [[rules]]/cycle | the edge kept `@/integrity` in the 249-file component | the edge is gone |
| [[convention]]/import | `@/website/seo-vortex` would be a deep FILE import — a violation | `@/website/seo` is a sub-atom directory — lawful |
| `stray-ts` | a bare `.ts` at the atom root | a proper child atom |

`@/website` re-exports it, so nothing that already read it changed.

**Honest boundary.** `listFaces()` returns the registry as it stands — empty until something registers, which is the correct answer and not a defect. The test asserts the contract (an array, stable across calls) rather than a non-empty result, because asserting non-empty would be asserting that some *other* module already ran.

**Law — [[law]]: a symbol with no dependencies must be reachable without them. Promote the leaf to an atom and the cut is lawful under every gate at once.**

Composes: [[website]] · [[integrity]] · [[rules]]/cycle · [[convention]]/import · [[law]].
