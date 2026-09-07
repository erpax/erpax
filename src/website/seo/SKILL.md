---
name: seo
description: "Use when reading the SEO face registry — listFaces and the schema/OG vortex, in a module with ZERO imports. That property is why it is its own atom: @/integrity/uuid-stream took listFaces from the @/website barrel, and the barrel dragged the whole page/agent/spec subtree into the module that exports uuid and jcsCanonicalize to the entire corpus. Importing a leaf adds no edge."
atomPath: "website/seo"
coordinate: "website/seo · 2/share · 95bd3dae"
contentUuid: "206653e9-2216-5eeb-970f-baa68f2c2b55"
diamondUuid: "01f3e80e-1294-8780-808e-5e6de0fc5c0c"
uuid: "95bd3dae-1e06-852e-a019-bc13e4d13e32"
horo: 2
typography:
  partition: website
  bondDegree: 26
standards:
  - "EU-Admin-Coop-Reg-904/2010"
  - "ISO/IEC 25010:2023 §5.3 usability — discoverability"
  - Open Graph protocol (Facebook 2010+) + Twitter Cards
  - RFC 9694 robots.txt + REP (Robots Exclusion Protocol)
  - Schema.org WebPage + Article + SoftwareApplication +
  - "Sitemap.xml protocol 0.9 (sitemaps.org) + Sitemap-Index"
  - "W3C JSON-LD 1.1 + Microdata 1.1"
  - "W3C-JSON-LD-1.1"
bindings: []
signatures:
  computationUuid: "2f1dc5d6-ab77-84c9-a78a-1e51f9c5430b"
  stages:
    - stage: path
      stageUuid: "2c02905f-d5a0-8804-b310-64c790d5c775"
    - stage: trinity
      stageUuid: "8e4b7631-6491-8937-98e5-9a3ea08f3e79"
    - stage: boundary
      stageUuid: "8e721d8a-0450-8f7d-9de0-2c69f17c2276"
    - stage: links
      stageUuid: "308e1741-adad-8aa5-9598-ee61bedb773f"
    - stage: horo
      stageUuid: "9f3bc7b1-d211-8f33-a7e5-ddfcba7bb55e"
    - stage: seal
      stageUuid: "37b5f46a-1705-8287-95dc-0ab59e7d1d4f"
    - stage: uuid
      stageUuid: "2001e905-ac0a-8652-8960-b4c76b10435f"
version: 2
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
