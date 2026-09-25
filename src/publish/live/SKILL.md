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
