---
name: version
description: "Use when reasoning about erpax's version — it is CONTENT-ADDRESSED and skill-based, a function of the corpus aura (the hash over every atom's content-uuid), so the same skills produce the same version on every clone; automatic tags follow the corpus, and drift or forgery between a tag and the code is caught. The git tag that cannot lie about what it contains."
atomPath: version
coordinate: "version · 8/crest · 649742ab"
contentUuid: "6fec4213-ef2d-5009-b9ed-11bd7fab3ca8"
diamondUuid: "109b5232-d1b2-80c0-81d8-377d08aa8876"
uuid: "649742ab-2e0d-8096-b1f8-88cbefbd6d3d"
horo: 8
typography:
  partition: version
  bondDegree: 34
standards:
  - "SemVer 2.0.0 — `MAJOR.MINOR.PATCH+<build-metadata>` (the corpus-uuid is build metadata)"
bindings: []
signatures:
  computationUuid: "81fb7f39-8bed-839b-bd40-55edec0c1f1b"
  stages:
    - stage: path
      stageUuid: "9c83e18c-d9d6-8b68-9b89-c50efd44da71"
    - stage: trinity
      stageUuid: "4cc40897-8325-855b-8382-30143c0acc62"
    - stage: boundary
      stageUuid: "55831aae-146b-8b89-a7e0-69082226017b"
    - stage: links
      stageUuid: "936bc092-ba94-8973-8f2c-6fcf3f464d2d"
    - stage: horo
      stageUuid: "693d6e47-60c1-86bf-a1b6-3b62f4e50980"
    - stage: seal
      stageUuid: "ecef50cc-ea68-89e0-a27b-ebeefed02324"
    - stage: uuid
      stageUuid: "13d8e069-a86e-8eb7-859d-6afcf858265f"
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
