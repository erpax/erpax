---
name: compatibility
description: "Use when a corpus atom's name might collide with the framework — ISO/IEC 25010 §5.3 co-existence: an atom folder whose leaf is a framework-reserved router namespace (pages) is misparsed by Next.js and breaks the build; the gate that seals the engineering FORM trinity."
atomPath: "rules/compatibility"
coordinate: "rules/compatibility · 5/round · 32b8ccdd"
contentUuid: "745f1de1-b2da-5d23-98e0-e1aa8e7a00b1"
diamondUuid: "b974b986-fcea-8230-a61a-285302a4f13e"
uuid: "32b8ccdd-078f-8f29-bdbc-c93d067531c7"
horo: 5
typography:
  partition: rules
  bondDegree: 9
standards:
  - "ISO/IEC 25010:2023 §5.3 compatibility — co-existence with the framework namespace"
bindings: []
signatures:
  computationUuid: "7e78ff5d-0fa1-8c1f-a05d-97533d16413d"
  stages:
    - stage: path
      stageUuid: "138cde0b-8fa2-82f5-aaea-d1c5716dd79c"
    - stage: trinity
      stageUuid: "ba6e12df-5665-8958-95b3-716071bbc00a"
    - stage: boundary
      stageUuid: "bb2b2768-b79f-8cb6-81a0-5d6006e79001"
    - stage: links
      stageUuid: "52f1e19f-27ed-89bd-b4b1-01ac85668aa9"
    - stage: horo
      stageUuid: "a6eba3f6-9751-8ecc-8a84-5452ceaae92d"
    - stage: seal
      stageUuid: "28892a9d-3b18-8422-86b3-e038812fa1ea"
    - stage: uuid
      stageUuid: "84bce5ca-4d4b-81fb-b438-a219394969c2"
version: 2
---
# rules/compatibility — an atom may not seize a name the framework reserves

ISO/IEC 25010 **§5.3 compatibility** = co-existence + interoperability: the corpus shares its environment with the framework **without detriment**. It does not. `src/pages` is a perfect one-word erpax atom (a CMS collection) **and** Next.js's reserved **Pages-Router** directory. Next reads it as a router, not as data — the admin panel's generated types reject every `src/pages/*` module (`.next/dev/types/validator.ts`), so **the app does not compile**.

[[law]]/folder cannot see the clash: `pages` is a flawless generic lowercase word. **The framework's namespace is not in this corpus's model** — which is exactly why co-existence needs its own gate, not the naming gate.

## What it flags, and what it does not

| name | verdict |
| --- | --- |
| `pages` | **collision** — a reserved ROUTER directory; a data atom there is parsed as routing |
| `app` | exempt — the App Router dir erpax legitimately owns |
| `layout · error · route · template · loading · middleware` | exempt — reserved FILE stems *inside* `app/`, harmless as src-root atoms |

`FRAMEWORK_RESERVED` is DECLARED (arguable, in the open) and holds only the router directory names that break co-existence. `frameworkCollisions` flags a SKILL-bearing atom whose leaf is reserved; `assertCompatible` ratchets — the live count is `pages`, and renaming it to a data slug drops the ceiling to 0 and the app compiles.

**Honest boundary.** This proves an atom collides with a framework **router namespace**, never the whole of §5.3 — interoperability with data-interchange standards (EN-16931, SAF-T, UN/CEFACT) is a finer conformance this gate does not claim. It closes the co-existence break that stops the build, which is the §5.3 failure that actually bites.

**Law — [[law]]: a corpus atom may not take a name the framework reserves for another purpose. `pages` is the App Router's twin misread as the Pages Router — rename it to a data name, or the framework parses your data as routing and the build fails.**

## Standards

- **ISO/IEC 25010:2023 §5.3** — compatibility: co-existence without detriment.

Composes: [[rules]] · [[engineering]] · [[law]]/folder · [[law]].
