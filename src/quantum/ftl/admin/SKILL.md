---
name: admin
description: "Use when the admin panel must boot by reuse rather than by searching the matrix — adminBootShell / adminBootFtl precompute the boot surface and report an ftl verdict for it. Promoted from a loose sibling because self/improve/tip locates it by FILE PATH, which no import scan can see. Run: tsx src/quantum/ftl/admin/index.ts"
atomPath: "quantum/ftl/admin"
coordinate: "quantum/ftl/admin · 1/base · 11504c39"
contentUuid: "9a72f702-b87c-512b-bf1a-da2fc1f70b9d"
diamondUuid: "0c1af655-ad83-87bf-a7ee-67223dc18d17"
uuid: "11504c39-06d3-8230-86bf-31b1d10f03bb"
horo: 1
typography:
  partition: quantum
  bondDegree: 37
standards: []
bindings: []
signatures:
  computationUuid: "94f8452f-e566-89c8-be46-7acb794540b5"
  stages:
    - stage: path
      stageUuid: "a5be311c-86d5-80dd-a98d-f7cc5545aef3"
    - stage: trinity
      stageUuid: "e3988fed-72b8-809d-9ef7-9a28d12ff9f0"
    - stage: boundary
      stageUuid: "91f9a7ef-264d-887a-856b-e6d057255442"
    - stage: links
      stageUuid: "27a8e5b2-4707-8567-9514-4bb001b65e56"
    - stage: horo
      stageUuid: "6b201ea5-45a7-8fc7-b33c-e27a506706b6"
    - stage: seal
      stageUuid: "afa31ef5-3792-8b2c-b596-80973e5210f6"
    - stage: uuid
      stageUuid: "7656891e-70fb-8fe0-9d56-ecc4645bd7b4"
quantum:
  superposition:
    - access
    - auth
    - components
    - ftl
    - hooks
    - law
    - optimize
    - port
    - round
    - superposition
  collapse:
    - "Use when the admin panel must boot by reuse rather than by searching the matrix — adminBootShell / adminBootFtl precompute the boot surface and report an ftl verdict for it. Promoted from a loose sibling because self/improve/tip locates it by FILE PATH, which no import scan can see. Run: tsx src/quantum/ftl/admin/index.ts"
    - "matter located by path is invisible to every import scan, so the path must be asserted where it is probed. A move that satisfies the compiler and breaks a file-existence check is a silent behaviour change."
  seal:
    sandbox: false
    receipt: false
    pathFollow: true
    canonicalRecord: true
    analogResults: false
    speechResults: false
    computationUuid: "94f8452f-e566-89c8-be46-7acb794540b5"
    contentUuid: "9a72f702-b87c-512b-bf1a-da2fc1f70b9d"
version: 2
---
# admin — boot as reuse, not as a search

The admin boot is the corpus's own worst case for [[quantum]]/ftl: a surface assembled from a large collection space every time it loads is a **scan**, and a scan is a crack. `adminBootShell` precomputes the shell so the boot reads an address instead of traversing the space, and `adminBootFtl` reports the verdict for that path rather than asserting it.

## Why it is an atom now

It was a loose `.ts` beside the ftl barrel, and promoting it was riskier than it looked. `self/improve/tip` does not import this matter — it **probes for it by literal path**:

```
existsSync(join(cwd, '<path to this atom>'))
```

Four such probes, plus a test asserting the exact string. Moving the file would have flipped every one to `false` with **no type error and no import error**, silently changing which tip the engine emits. That is the same invisible-reference class as [[quantum]]/status, where the CLI dispatched a subprocess path: an import scan reports zero references, correctly, and is useless for the question being asked.

The guard is therefore asserted from this side. The test reads the tip engine's source, extracts every path it probes for this atom, and requires each to resolve — so the next move breaks a test instead of breaking behaviour.

**Honest boundary.** This proves the probed paths **exist**, never that the tip they drive is **right**; a resolving probe can still feed a wrong recommendation. And the extraction is lexical over the tip's source, so a probe assembled at runtime from parts is outside its reach — the residue of the same problem, one level further in.

**Law — [[law]]: matter located by path is invisible to every import scan, so the path must be asserted where it is probed. A move that satisfies the compiler and breaks a file-existence check is a silent behaviour change.**

## Standards

- **ISO/IEC 25010:2023 §5.5** — analysability: a reference must be locatable from its declaration.

Composes: [[quantum]]/ftl · [[self]]/improve · [[law]].

<sub>content-uuid `9a72f702-b87c-512b-bf1a-da2fc1f70b9d` · account `quantum/ftl/admin` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
