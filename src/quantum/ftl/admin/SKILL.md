---
name: admin
description: "Use when the admin panel must boot by reuse rather than by searching the matrix — adminBootShell / adminBootFtl precompute the boot surface and report an ftl verdict for it. Promoted from a loose sibling because self/improve/tip locates it by FILE PATH, which no import scan can see. Run: tsx src/quantum/ftl/admin/index.ts"
atomPath: "quantum/ftl/admin"
coordinate: "quantum/ftl/admin · 1/base · 7c0dc9b0"
contentUuid: "d2324dc3-6712-5b35-b8b7-474ee0e0bb75"
diamondUuid: "a7c802e4-c850-8054-a3e7-287c6809b35a"
uuid: "7c0dc9b0-4dfe-81ae-a7f6-ca98c57a6a6c"
horo: 1
typography:
  partition: quantum
  bondDegree: 39
standards: []
bindings: []
signatures:
  computationUuid: "37366dd4-cf69-8a0a-909b-3c83ed6104ff"
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
      stageUuid: "6cb2c5ec-d54c-8bf6-b20e-02ead552c4fa"
    - stage: seal
      stageUuid: "afa31ef5-3792-8b2c-b596-80973e5210f6"
    - stage: uuid
      stageUuid: "3ef41169-bbbe-8b7c-b835-4190bc16bb8f"
quantum:
  superposition:
    - access
    - auth
    - cmspage
    - components
    - ftl
    - hooks
    - law
    - optimize
    - port
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
    computationUuid: "37366dd4-cf69-8a0a-909b-3c83ed6104ff"
    contentUuid: "d2324dc3-6712-5b35-b8b7-474ee0e0bb75"
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

<sub>content-uuid `d2324dc3-6712-5b35-b8b7-474ee0e0bb75` · account `quantum/ftl/admin` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
