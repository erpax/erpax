---
name: live
description: "Use when reasoning about live — records a version and a content-uuid per package. records a DOI. Both are *claims made locally*, and until now nothing asked the registries whether either was true."
atomPath: "publish/live"
coordinate: "publish/live · 5/round · d892ceec"
contentUuid: "e0e1f7bb-b9b8-522d-b2a9-ee49eb3e5f5f"
diamondUuid: "51af1661-987e-8db3-88aa-669a8b8dfd78"
uuid: "d892ceec-39c2-8f3a-8e67-26cfb73b79aa"
horo: 5
typography:
  partition: publish
  bondDegree: 37
standards: []
bindings: []
signatures:
  computationUuid: "67ba53c8-c97f-85f4-ad99-f5a7027fd409"
  stages:
    - stage: path
      stageUuid: "32f2b94a-ec93-802b-b22e-af589a4b8c95"
    - stage: trinity
      stageUuid: "e41887c7-7cd5-8cc6-a261-7a8df7f285d5"
    - stage: boundary
      stageUuid: "ba381ee2-efbd-8a04-a46d-5d88af92b3ad"
    - stage: links
      stageUuid: "9b9f9d4e-29eb-8306-9cb6-7687f3d31677"
    - stage: horo
      stageUuid: "ce9bc929-48cd-8145-be39-95d0e8b3574e"
    - stage: seal
      stageUuid: "250d9a11-c873-89b4-b190-1377176a9961"
    - stage: uuid
      stageUuid: "840e3bea-a2d3-83f8-8068-50e34ad885af"
version: 2
---
# publish/live — a release is not what the manifest says, it is what the registry answers

`packages/released.json` records a version and a content-uuid per package. `CITATION.cff` records a
DOI. Both are *claims made locally*, and until now nothing asked the registries whether either was
true. Measured on the first run, 2026-09-25:

| claim | registry answer |
| --- | --- |
| `10.5281/zenodo.22237698` (concept DOI) | **resolves** — `responseCode: 1` |
| `@erpax/access@0.1.11` | **package does not exist on npm** |
| `@erpax/accounting@0.1.8` | package does not exist on npm |
| `@erpax/cloudflare@0.1.13` | package does not exist on npm |
| `@erpax/commerce@0.1.0` | package does not exist on npm |
| `@erpax/erpax@0.1.0` | package does not exist on npm |
| `@erpax/identity@0.1.9` | package does not exist on npm |

**live 1/7 · missing 6 · complete false.** Six packages are recorded as released and have never
been published — a 404 on the package name, so not a version gap but an absence. The manifest and
the world disagreed, and the disagreement was invisible because nothing was looking.

This is [[rules]]/forge's law on the receiving side. That atom refuses a *locally minted* registry
identifier, because only a registration agency may assign one. The dual is just as strong: a
*locally recorded* release is not a release either. **Received or refused, never assumed — in both
directions.**

## Three refusals that keep the verdict honest

- **Unreachable is not missing.** A 500, an unparseable body or a thrown request returns
  `reachable: false`, and `summarise` counts it under `unreachable` — never under `missing`. An
  unasked question reported as an answer is the failure this corpus has paid for repeatedly; a
  release whose registry could not be reached is **unverified**, which is a different finding from
  incomplete.
- **A 404 IS an answer.** The registry positively says the package is not there, so that is
  `reachable: true, live: false` — the one case where absence is evidence.
- **Nothing asked is not everything answered.** `summarise([])` is never `complete`.

## The fetch is fingerprinted on purpose

Undici's default `Accept-Language: *` draws a 500 from some registries, and `user-agent: node`
draws a WAF block — and **a 200 carrying the wrong body reads as absence**. A real browser UA and
`accept: application/json`, nothing exotic. `RegistryIo` is injected, so every verdict above is
pinned by a hermetic test and the gate could be written with the network down.

**Honest boundary.** This proves a version is **present** in npm's `versions` map and that a DOI
**resolves** at the proxy. It does not prove the published tarball is the content the manifest
addresses — that is a content check against the registry's `dist.shasum`, and it is not done here.
It does not prove the Zenodo record's *files* match the tagged tree, only that the handle exists.
And npm is eventually consistent, so a check run seconds after a publish may honestly answer
`live: false`; the caller retries rather than concluding.

**Law — [[law]]: a release is complete when the registry that owns each identifier says so. A
version in a local manifest is a claim; the registry's answer is the fact — and a registry that
cannot be reached leaves the release unverified, never verified-absent.**

## Standards

- **ISO 26324** — DOI: assigned, and resolvable, by the registration agency.
- **ISO 19011:2018 §6.4** — audit evidence: the citation must lead to the evidence.

Composes: [[publish]] · [[rules]]/forge · [[rules]]/canonical · [[law]].
