---
name: version
description: "Use when reasoning about erpax's version — it is CONTENT-ADDRESSED and skill-based, a function of the corpus aura (the hash over every atom's content-uuid), so the same skills produce the same version on every clone; automatic tags follow the corpus, and drift or forgery between a tag and the code is caught. The git tag that cannot lie about what it contains."
atomPath: version
coordinate: "version · 4/weave · d6c0cc7d"
contentUuid: "6bdacf3f-de57-5883-b0a5-40a4191409e3"
diamondUuid: "8b446f09-5c80-83b6-b455-aea286b22fbd"
uuid: "d6c0cc7d-2eb8-8e68-bc09-b932c87edce1"
horo: 4
typography:
  partition: version
  bondDegree: 34
standards:
  - "SemVer 2.0.0 — `MAJOR.MINOR.PATCH+<build-metadata>` (the corpus-uuid is build metadata)"
bindings: []
signatures:
  computationUuid: "6fa3d3ba-ea43-8165-b3e5-71ba178f621f"
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
      stageUuid: "ade1456d-7cb5-8f2c-a0e2-525216b370de"
    - stage: seal
      stageUuid: "ecef50cc-ea68-89e0-a27b-ebeefed02324"
    - stage: uuid
      stageUuid: "129085e5-4222-80aa-b2b9-55bbd29667ce"
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
