---
name: version
description: "Use when reasoning about erpax's version — it is CONTENT-ADDRESSED and skill-based, a function of the corpus aura (the hash over every atom's content-uuid), so the same skills produce the same version on every clone; automatic tags follow the corpus, and drift or forgery between a tag and the code is caught. The git tag that cannot lie about what it contains."
atomPath: version
coordinate: version · 4/weave · cdbd891b
contentUuid: "48cb80ee-18d9-5cc9-982a-19a03bd79983"
diamondUuid: "728f03d0-3efd-8469-a036-24ce1d250c3c"
uuid: "cdbd891b-9142-813c-bb69-36d645fde75b"
horo: 4
bonds:
  in:
    - assembly
    - aura
    - cropplan
    - identity
    - merge
    - projection
    - proof
    - seed
    - self
    - sequence
    - software
  out:
    - assembly
    - aura
    - cropplan
    - identity
    - merge
    - projection
    - proof
    - seed
    - self
    - sequence
    - software
typography:
  partition: version
  bondDegree: 34
  neighbors:
    - aura
standards:
  - "SemVer 2.0.0 — `MAJOR.MINOR.PATCH+<build-metadata>` (the corpus-uuid is build metadata)"
  - "the version is derived, not declared — re-derivable from SKILL_INDEX on any clone"
bindings: []
neighbors:
  wikilink:
    - aura
    - identity
    - merge
    - proof
    - self
    - sequence
  matrix:
    - assembly
    - aura
    - cropplan
    - identity
    - merge
    - projection
    - proof
    - seed
    - self
    - sequence
    - software
  backlinks:
    - assembly
    - aura
    - cropplan
    - identity
    - merge
    - projection
    - proof
    - seed
    - self
    - sequence
    - software
signatures:
  computationUuid: "0fbffcf2-020d-893d-aea6-b892438059be"
  stages:
    - stage: path
      stageUuid: "9c83e18c-d9d6-8b68-9b89-c50efd44da71"
    - stage: trinity
      stageUuid: "4cc40897-8325-855b-8382-30143c0acc62"
    - stage: boundary
      stageUuid: "793655a2-adc5-890a-bc11-0a56be16c2da"
    - stage: links
      stageUuid: "936bc092-ba94-8973-8f2c-6fcf3f464d2d"
    - stage: horo
      stageUuid: "8434ba6c-6aa7-80b7-9f3c-f39d81e12402"
    - stage: seal
      stageUuid: "f1a1b33e-71f3-8dea-887b-a55497051886"
    - stage: uuid
      stageUuid: "e4d13ae2-b216-866a-9fd8-c45b9391b262"
version: 2
---
# version — the corpus-derived, content-addressed version

FORM: **the version is a FUNCTION of the skill corpus, not a manual bump.** `corpusContentUuid()` hashes every atom's content-uuid, order-free — the [[aura]] of the whole — so the same skills produce the same version on every machine and clone ([[merge]]/[[identity]]). A human semver names the release; `corpusVersion(semver) = semver+<uuid8>` (SemVer build metadata) makes the corpus-uuid the build IDENTITY, so a tag is DERIVED, not declared. `versionMatchesCorpus()` catches any drift or forgery between a tag and the code it claims to be — the same content-addressing the tamper [[proof]] rests on, applied to releases.

This is the npm side too: an `@erpax/*` package's published version carries the corpus-uuid, so `npm install erpax@x.y.z+<uuid>` resolves to an exact, verifiable corpus — the version IS the [[proof]] bundle of a release, and the git tag becomes one more tamper-evidence level (forging a release means forging the corpus it names).

Matter-twin: `src/services/version/index.ts` (`corpusContentUuid`·`corpusSize`·`corpusVersion`·`versionMatchesCorpus`) over the generated `skill-router/skills.index` + `index.test.ts`. NB: it tracks the SKILL corpus — a service-only change does not bump it (mint that service's SKILL.md twin to bump, which is the [[self]]-sufficiency loop closing). Composes: [[aura]] · [[identity]] · [[merge]] · [[proof]] · [[self]] · [[sequence]].

## Standards
- SemVer 2.0.0 — `MAJOR.MINOR.PATCH+<build-metadata>` (the corpus-uuid is build metadata)
- Audit: the version is derived, not declared — re-derivable from SKILL_INDEX on any clone

## Common mistakes
- Bumping the version by hand — it is derived from the corpus; declare only the human semver and let `corpusVersion` compute the rest.
- Trusting a tag's semver alone — `versionMatchesCorpus` proves the build-metadata still equals the live corpus-uuid (no drift, no forgery).
