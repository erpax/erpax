---
name: compatibility
description: "Use when a corpus atom's name might collide with the framework — ISO/IEC 25010 §5.3 co-existence: an atom folder whose leaf is a framework-reserved router namespace (pages) is misparsed by Next.js and breaks the build; the gate that seals the engineering FORM trinity."
atomPath: rules/compatibility
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
