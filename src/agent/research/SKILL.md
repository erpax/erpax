---
name: research
description: "Use when registering an agent R&D society as tenant users with assigned roles, coordinating findings over the chat bus, and gating each finding behind tamper-evident tenant-admin approval — the actor-merge made operational (an agent IS a user)."
atomPath: "agent/research"
coordinate: "agent/research · 2/share · 45ebeece"
contentUuid: "84fd69ce-5158-5579-82ac-4ac22fcd6398"
diamondUuid: "26887f7c-78a0-8a11-a4a2-5cb8d14f2863"
uuid: "45ebeece-4242-8235-8a0f-3ae38659e738"
horo: 2
typography:
  partition: agent
  bondDegree: 160
standards:
  - "RFC 9562 §5.8 content-addressed identity (agent uuid, finding uuid)"
  - "RFC-9562"
bindings: []
signatures:
  computationUuid: "29275001-ad38-89e9-a04a-aeafc515e708"
  stages:
    - stage: path
      stageUuid: "e0999009-6b6a-86b9-9558-c23da22b26e6"
    - stage: trinity
      stageUuid: "6a74d09c-3297-8373-8910-ba631b5ae3cf"
    - stage: boundary
      stageUuid: "a95f3326-5c98-8274-b84c-82d0810414b2"
    - stage: links
      stageUuid: "bb3db05e-a70f-8d10-adb1-a07e7f11d3e8"
    - stage: horo
      stageUuid: "a9463e34-688d-8bc5-bace-1fb21c4302ca"
    - stage: seal
      stageUuid: "aa55bc1a-29ca-8235-9bd2-a8ab52e92957"
    - stage: uuid
      stageUuid: "8aab6aba-13dd-8344-8a60-626a8c6f0f13"
version: 2
---
# agent/research — the R&D society (an agent IS a user)

The actor-[[merge]] made operational: to register an agent is to ensure a tenant [[user]] row, its global role mapped to a capability through the access [[cross]] (the angelic hierarchy), its per-tenant seat enforced by the multi-tenant plugin. A finding is a content-addressed Discovery on the chat bus, so the same find by two agents merges to one; approval is the tenant-admin gate turned into a [[receipt]] that chains into the uuid-linked [[audit]] — forging an approval rewrites every downstream leaf. The pure core (society, [[identity]], finding, approval decision) is unit-testable without booting Payload.

Matter-twin: `src/agent/research/index.ts` — `researchSociety` · `memberCapability` · `isApprover` · `agentEmail`/`agentSlug` · `findingUuid`/`findingToDiscovery` · `approveFinding`/`approveFindings` · `ensureTenant`/`ensureMemberUser`/`registerResearchSociety`. Composes [[agent]] [[identity]] · the [[cross]] (role→capability) · [[receipt]] (the audited approval) · [[tenant]] · [[user]] · [[merge]].

**Law — [[law]]: an [[agent]] IS a [[user]] (the actor-merge), so a finding is content-addressed (same find ⇒ one row) and only a tenant-admin approver may issue the allow-[[receipt]] that lets it LAND — the gate chains into the uuid-linked [[audit]], tamper-evident end to end.**

@standard RFC 9562 §5.8 content-addressed identity (agent uuid, finding uuid)
