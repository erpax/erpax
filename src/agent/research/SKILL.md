---
name: research
description: "Use when registering an agent R&D society as tenant users with assigned roles, coordinating findings over the chat bus, and gating each finding behind tamper-evident tenant-admin approval — the actor-merge made operational (an agent IS a user)."
atomPath: "agent/research"
coordinate: "agent/research · 7/descent · a32ab54e"
contentUuid: "b94f5aa7-1bea-50fd-8293-8a93e0ebf0d1"
diamondUuid: "79ad25f5-b7c0-80a9-b5c3-0f0f23abc62f"
uuid: "a32ab54e-3da6-88cb-a55d-e87d022d60d6"
horo: 7
typography:
  partition: agent
  bondDegree: 107
standards:
  - "RFC 9562 §5.8 content-addressed identity (agent uuid, finding uuid)"
  - "RFC-9562"
bindings: []
signatures:
  computationUuid: "cf08cf2f-6fa6-8eed-a910-5e9589a416cf"
  stages:
    - stage: path
      stageUuid: "e0999009-6b6a-86b9-9558-c23da22b26e6"
    - stage: trinity
      stageUuid: "6a74d09c-3297-8373-8910-ba631b5ae3cf"
    - stage: boundary
      stageUuid: "a95f3326-5c98-8274-b84c-82d0810414b2"
    - stage: links
      stageUuid: "9d8b70cd-18b8-8eef-a554-0ab5a1205199"
    - stage: horo
      stageUuid: "a93dbd4a-31e8-8f35-8753-6cfe16676bac"
    - stage: seal
      stageUuid: "aa55bc1a-29ca-8235-9bd2-a8ab52e92957"
    - stage: uuid
      stageUuid: "e4ccc575-18a0-82da-bdb4-2ab72977e369"
version: 2
---
# agent/research — the R&D society (an agent IS a user)

The actor-[[merge]] made operational: to register an agent is to ensure a tenant user row, its global role mapped to a capability through the access [[cross]] (the angelic hierarchy), its per-tenant seat enforced by the multi-tenant plugin. A finding is a content-addressed Discovery on the chat bus, so the same find by two agents merges to one; approval is the tenant-admin gate turned into a [[receipt]] that chains into the uuid-linked [[audit]] — forging an approval rewrites every downstream leaf. The pure core (society, [[identity]], finding, approval decision) is unit-testable without booting Payload.

Matter-twin: `src/agent/research/index.ts` — `researchSociety` · `memberCapability` · `isApprover` · `agentEmail`/`agentSlug` · `findingUuid`/`findingToDiscovery` · `approveFinding`/`approveFindings` · `ensureTenant`/`ensureMemberUser`/`registerResearchSociety`. Composes [[agent]] [[identity]] · the [[cross]] (role→capability) · [[receipt]] (the audited approval) · [[tenant]] · user · [[merge]].

**Law — [[law]]: an [[agent]] IS a user (the actor-merge), so a finding is content-addressed (same find ⇒ one row) and only a tenant-admin approver may issue the allow-[[receipt]] that lets it LAND — the gate chains into the uuid-linked [[audit]], tamper-evident end to end.**

@standard RFC 9562 §5.8 content-addressed identity (agent uuid, finding uuid)
