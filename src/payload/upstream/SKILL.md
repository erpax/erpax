---
name: upstream
description: "Use when asking what Payload publishes that erpax does not hold — the official repository's templates, examples and packages listed from GitHub's contents API and crossed against package.json and the tree, with the evidence for each template and example declared in the open. Reports held · gap · unaskable and coverage per kind; the involute leg of the outward family (erpax.outward.upstream)."
atomPath: "payload/upstream"
coordinate: "payload/upstream · 2/share · e73343c0"
contentUuid: "d1e2ca16-9deb-5ab1-a59e-b777879ce58f"
diamondUuid: "203acbd1-7cd5-8adf-b47d-36eaac3a100a"
uuid: "e73343c0-01ff-8990-a258-870980e85645"
horo: 2
typography:
  partition: payload
  bondDegree: 12
standards:
  - GitHub REST API — repository contents
bindings: []
signatures:
  computationUuid: "11bf5a46-87c8-88d3-af0c-7e86343de750"
  stages:
    - stage: path
      stageUuid: "5578e7ef-c528-878e-bcd9-6ec13761ff0d"
    - stage: trinity
      stageUuid: "1cb93ec5-bd61-8119-90ca-3df896070265"
    - stage: boundary
      stageUuid: "759c6ab7-e5da-8cec-98db-bda92b848815"
    - stage: links
      stageUuid: "8ece27ff-a5d5-8852-88cb-43bc22202da7"
    - stage: horo
      stageUuid: "f98e1f5c-533d-888c-a3e0-7838414ac6d2"
    - stage: seal
      stageUuid: "aeb02c5a-7aff-838a-91b1-d6fbc8e30806"
    - stage: uuid
      stageUuid: "418d5d9c-5806-85de-a9db-2b2d8114d904"
version: 2
---
# payload/upstream — what Payload publishes, crossed against what erpax holds

"Deep research the Payload docs, templates and examples" was asked as a reading. A reading is done
once and decays; this is the reading as an instrument. The official repository publishes three lists
— `templates/` (11 on 2026-10-03), `examples/` (13) and `packages/` (44) — and each entry is asked
one question: does this corpus **hold** it?

| kind | how it is asked | held on 2026-10-03 |
| --- | --- | --- |
| package | present in `package.json` as `@payloadcms/<name>` | 20 of 44 |
| template | its evidence in the tree — `website` by `src/website`, `with-cloudflare-d1` by the D1 adapter, `ecommerce` by its plugin | 3 of 7 askable |
| example | its evidence — `auth` by `src/auth`, `draft-preview` by the preview route, `multi-tenant` · `form-builder` · `live-preview` · `email` by their packages, `localization` by `src/i18n`, `custom-components` and `whitelabel` by the admin UI | 10 of 10 askable |

`EVIDENCE` is declared, not inferred: no theorem says a preview route is what the `draft-preview`
example is about. It is written in the open so a reader argues with the line, not the gate. An entry
with no declared evidence is reported `unaskable` with that reason, never silently held or gapped;
`astro`, `remix` and `custom-server` are unaskable by design — other frameworks.

## What the cross says, and what it does not

A **gap** is published and not held: `db-postgres`, `storage-s3`, `plugin-stripe`, `plugin-sentry`,
`kv-redis`, `graphql`, `live-preview-vue`, `tanstack-start` … Several are choices — D1 is why there is no
Postgres adapter, R2 why there is no S3 — and the cross cannot tell a choice from a debt. It names
candidates for the frontier, and [[rules]]/canonical owns the other half of the same law: a package
installed and never called. Together they close the question *is this dependency surface the one we
chose?* from both sides.

The fetch is injected and the catalogue is built from its answers, so the cross is testable with no
network and a directory that cannot be read is **refused by name** rather than reported empty — the
unreachable-registry lesson from [[rules]]/canonical, kept.

**Honest boundary.** `held` means evidence exists, never that the pattern is used well or completely
— `custom-components` is held by one admin directory existing. The catalogue is the repository's
directory listing, not its documentation: the docs' *prose* (configuration options, hooks, fields) is
not crossed here, only what ships as a thing with a name.

**Law — [[law]]: research the upstream as a cross, not a reading. List what it publishes, ask the tree
whether each thing is held, declare the evidence in the open, and refuse what cannot be asked — the
gaps are the frontier's candidates and the choices are a human's to name.**

## Standards

- **GitHub REST API** — repository contents listing.

Composes: [[payload]] · [[outward]] · [[rules]]/canonical · [[law]].
