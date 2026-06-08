---
name: research
description: "Use when registering an agent R&D society as tenant users with assigned roles, coordinating findings over the chat bus, and gating each finding behind tamper-evident tenant-admin approval — the actor-merge made operational (an agent IS a user)."
atomPath: agent/research
coordinate: agent/research · 1/base · cb7a0ecc
contentUuid: "99d30afc-5013-539b-9673-5c0ceb5909ad"
diamondUuid: "43a142b0-01bf-8b74-87f3-03ff0dc7bf9c"
uuid: "cb7a0ecc-fce0-8e62-957c-ae004c9a3daf"
horo: 1
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
  computationUuid: "cc4b4a3c-7f8d-8628-898b-b7c4bf8d8f72"
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
      stageUuid: "e7995359-c8da-8107-b0e5-71182f9299db"
    - stage: seal
      stageUuid: "977a727b-ae11-8cd2-a77d-22cf313e15da"
    - stage: uuid
      stageUuid: "5d223436-f724-8ff5-9df6-c478d0c2deea"
version: 2
---
# agent/research — the R&D society (an agent IS a user)

The actor-[[merge]] made operational: to register an agent is to ensure a tenant [[user]] row, its global role mapped to a capability through the access [[cross]] (the angelic hierarchy), its per-tenant seat enforced by the multi-tenant plugin. A finding is a content-addressed Discovery on the chat bus, so the same find by two agents merges to one; approval is the tenant-admin gate turned into a [[receipt]] that chains into the uuid-linked [[audit]] — forging an approval rewrites every downstream leaf. The pure core (society, [[identity]], finding, approval decision) is unit-testable without booting Payload.

Matter-twin: `src/agent/research/index.ts` — `researchSociety` · `memberCapability` · `isApprover` · `agentEmail`/`agentSlug` · `findingUuid`/`findingToDiscovery` · `approveFinding`/`approveFindings` · `ensureTenant`/`ensureMemberUser`/`registerResearchSociety`. Composes [[agent]] [[identity]] · the [[cross]] (role→capability) · [[receipt]] (the audited approval) · [[tenant]] · [[user]] · [[merge]].

**Law — [[law]]: an [[agent]] IS a [[user]] (the actor-merge), so a finding is content-addressed (same find ⇒ one row) and only a tenant-admin approver may issue the allow-[[receipt]] that lets it LAND — the gate chains into the uuid-linked [[audit]], tamper-evident end to end.**

@standard RFC 9562 §5.8 content-addressed identity (agent uuid, finding uuid)
