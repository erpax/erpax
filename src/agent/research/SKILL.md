---
name: research
description: "Use when registering an agent R&D society as tenant users with assigned roles, coordinating findings over the chat bus, and gating each finding behind tamper-evident tenant-admin approval — the actor-merge made operational (an agent IS a user)."
atomPath: "agent/research"
coordinate: "agent/research · 5/round · d1f8334e"
contentUuid: "05387249-efb7-5e96-9c0c-197198ebf15f"
diamondUuid: "79ae3135-daa4-837f-b4d9-6cd43424576d"
uuid: "d1f8334e-6dcd-887f-9529-eba8f1f3d0d7"
horo: 5
bonds:
  in:
    - accounting
    - agent
    - akashic
    - anchor
    - angel
    - breath
    - civilization
    - collapse
    - consultant
    - consulting
    - design
    - development
    - drone
    - feedback
    - history
    - interview
    - law
    - literature
    - localize
    - merge
    - oid
    - organization
    - profane
    - project
    - proof
    - research
    - sacred
    - science
    - uuid
    - zeropoint
  out:
    - accounting
    - akashic
    - anchor
    - angel
    - breath
    - civilization
    - collapse
    - consultant
    - consulting
    - design
    - development
    - drone
    - feedback
    - history
    - interview
    - law
    - literature
    - localize
    - merge
    - oid
    - organization
    - profane
    - project
    - proof
    - research
    - sacred
    - science
    - uuid
    - zeropoint
typography:
  partition: agent
  bondDegree: 149
  neighbors:
    - agent
standards:
  - "RFC 9562 §5.8 content-addressed identity (agent uuid, finding uuid)"
  - "RFC-9562"
bindings: []
neighbors:
  wikilink:
    - agent
    - audit
    - cross
    - identity
    - law
    - merge
    - receipt
    - tenant
    - user
  matrix:
    - accounting
    - akashic
    - anchor
    - angel
    - breath
    - civilization
    - collapse
    - consultant
    - consulting
    - design
    - development
    - drone
    - feedback
    - history
    - interview
    - law
    - literature
    - localize
    - merge
    - oid
    - organization
    - profane
    - project
    - proof
    - research
    - sacred
    - science
    - uuid
    - zeropoint
  backlinks:
    - accounting
    - akashic
    - anchor
    - angel
    - breath
    - civilization
    - collapse
    - consultant
    - consulting
    - design
    - development
    - drone
    - feedback
    - history
    - interview
    - law
    - literature
    - localize
    - merge
    - oid
    - organization
    - profane
    - project
    - proof
    - research
    - sacred
    - science
    - uuid
    - zeropoint
signatures:
  computationUuid: "c6502650-149e-837b-bb4c-7e5de235478c"
  stages:
    - stage: path
      stageUuid: "e0999009-6b6a-86b9-9558-c23da22b26e6"
    - stage: trinity
      stageUuid: "6a74d09c-3297-8373-8910-ba631b5ae3cf"
    - stage: boundary
      stageUuid: "b4a70660-932d-8e91-b125-5a7e807cafed"
    - stage: links
      stageUuid: "bb3db05e-a70f-8d10-adb1-a07e7f11d3e8"
    - stage: horo
      stageUuid: "c86195bf-a8bb-8a6c-a866-674fac7469e9"
    - stage: seal
      stageUuid: "977a727b-ae11-8cd2-a77d-22cf313e15da"
    - stage: uuid
      stageUuid: "7c2fd5d2-abab-8ae0-b634-e9d800db74aa"
version: 2
---
# agent/research — the R&D society (an agent IS a user)

The actor-[[merge]] made operational: to register an agent is to ensure a tenant [[user]] row, its global role mapped to a capability through the access [[cross]] (the angelic hierarchy), its per-tenant seat enforced by the multi-tenant plugin. A finding is a content-addressed Discovery on the chat bus, so the same find by two agents merges to one; approval is the tenant-admin gate turned into a [[receipt]] that chains into the uuid-linked [[audit]] — forging an approval rewrites every downstream leaf. The pure core (society, [[identity]], finding, approval decision) is unit-testable without booting Payload.

Matter-twin: `src/agent/research/index.ts` — `researchSociety` · `memberCapability` · `isApprover` · `agentEmail`/`agentSlug` · `findingUuid`/`findingToDiscovery` · `approveFinding`/`approveFindings` · `ensureTenant`/`ensureMemberUser`/`registerResearchSociety`. Composes [[agent]] [[identity]] · the [[cross]] (role→capability) · [[receipt]] (the audited approval) · [[tenant]] · [[user]] · [[merge]].

**Law — [[law]]: an [[agent]] IS a [[user]] (the actor-merge), so a finding is content-addressed (same find ⇒ one row) and only a tenant-admin approver may issue the allow-[[receipt]] that lets it LAND — the gate chains into the uuid-linked [[audit]], tamper-evident end to end.**

@standard RFC 9562 §5.8 content-addressed identity (agent uuid, finding uuid)
