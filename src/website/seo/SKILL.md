---
name: seo
description: "Use when reading the SEO face registry — listFaces and the schema/OG vortex, in a module with ZERO imports. That property is why it is its own atom: @/integrity/uuid-stream took listFaces from the @/website barrel, and the barrel dragged the whole page/agent/spec subtree into the module that exports uuid and jcsCanonicalize to the entire corpus. Importing a leaf adds no edge."
atomPath: "website/seo"
coordinate: "website/seo · 1/base · 2e6448cd"
contentUuid: "764a6479-0c1d-57d6-a531-df877a5155b9"
diamondUuid: "fbd80cc0-5015-8173-ad47-fc19abac1327"
uuid: "2e6448cd-4250-8276-bdea-d3f78e10dba9"
horo: 1
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
  computationUuid: "f385158a-932d-8b80-9999-6a1143b5a469"
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
      stageUuid: "f9576bc3-851e-8ef6-ba74-3793efe881e0"
    - stage: seal
      stageUuid: "37b5f46a-1705-8287-95dc-0ab59e7d1d4f"
    - stage: uuid
      stageUuid: "22535c99-fb8f-86c5-bc38-1d792c76fbb3"
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
