---
name: comms
description: "Use when enforcing secure realtime communication between teams — every team-scoped emit onto the chat/realtime bus must pass tenant match, content-uuid event integrity, depth cap, and (when a team is in scope) horo voice law; allowed and blocked emits are receipted."
atomPath: team/comms
coordinate: team/comms · 8/crest · 4c4165ae
contentUuid: "a531cac6-7686-5b80-bfac-dcb4ce728b25"
diamondUuid: "98336bd4-0c4c-8446-8f2e-66fa321427bf"
uuid: "4c4165ae-c8d7-867e-b125-fe264aa5b550"
horo: 8
bonds:
  in:
    - access
    - agent
    - breath
    - chat
    - confirm
    - horo
    - identity
    - law
    - quantum
    - realtime
    - receipt
    - sandbox
    - seal
    - team
    - wave
  out:
    - access
    - agent
    - breath
    - chat
    - confirm
    - horo
    - identity
    - law
    - quantum
    - realtime
    - receipt
    - sandbox
    - seal
    - team
    - wave
typography:
  partition: team
  bondDegree: 49
  neighbors:
    - agent
standards:
  - "ISO-27001 A.5.23 cloud-service-tenant-isolation"
  - "RFC 9562 §5.8 content-uuid event-identity"
bindings: []
neighbors:
  wikilink:
    - access
    - agent
    - breath
    - chat
    - confirm
    - horo
    - identity
    - law
    - realtime
    - receipt
    - sandbox
    - seal
    - team
    - wave
  matrix:
    - access
    - agent
    - breath
    - chat
    - confirm
    - horo
    - identity
    - law
    - quantum
    - realtime
    - receipt
    - sandbox
    - seal
    - team
    - wave
  backlinks:
    - access
    - agent
    - breath
    - chat
    - confirm
    - horo
    - identity
    - law
    - quantum
    - realtime
    - receipt
    - sandbox
    - seal
    - team
    - wave
signatures:
  computationUuid: "191b8ffd-52dc-80a2-8b76-3bbccfdf0c1c"
  stages:
    - stage: path
      stageUuid: "3a8be850-bf26-8ccc-b5cc-f80bf0ab52e8"
    - stage: trinity
      stageUuid: "bbcb154e-7a45-883c-9016-42f4fd451e1b"
    - stage: boundary
      stageUuid: "1f0ca97e-7529-8a02-8869-64edafd9d731"
    - stage: links
      stageUuid: "ac29579b-0dbe-8ff4-932e-47d7c1604378"
    - stage: horo
      stageUuid: "cc7c765e-adf3-8c58-9ea0-29fa79eaf1e9"
    - stage: seal
      stageUuid: "1792fa9f-4ef5-87e8-810f-9c9f8cc06fd4"
    - stage: uuid
      stageUuid: "18d27d39-2966-8edf-ace7-c11bc681ca4d"
version: 2
---
# team/comms — secure realtime between teams

**Threat model (Team A ↔ Team B).** A team in tenant *tA* must never deliver an event into tenant *tB*'s room (cross-tenant leak). An attacker must not publish without a content-uuid that recomputes from the event body (forged `eventUuid` / replay). Agent cascades must not run away past [[chat]]'s `MAX_BROADCAST_DEPTH`. When a [[team]] context is supplied, only the team's `teamUuid` presence or a member uuid may voice the emit (Team A cannot speak as Team B).

**What is enforced (fail-closed).** `enforceTeamCommsEmit` gates every team-scoped [[realtime]] emit: `tenantMatchVerdict` (ISO-27001 A.5.23 / [[access]]), `eventUuidVerdict` (RFC 9562 §5.8 / [[identity]]), `depthVerdict` (`MAX_BROADCAST_DEPTH`), optional `teamVoiceVerdict` ([[team]] horo law). `receiptTeamCommsEmit` chains a [[receipt]] for allow and block alike (the [[sandbox]] audit shape — no receipt, no proof). `teamCommsBeforeChange` is the Payload `beforeChange` hook on the `chat` collection — programmatic writes cannot skip the gate.

## Waves ride inside the envelope (not side-channel)

**Law — waves are in coordinated secure communications.** Every [[wave]] — society [[breath]] step, [[confirm]] seal-and-push wave, [[horo]] ring hop, [[chat]] broadcast cascade, README [[seal]] wave — is a **numbered hop** (`waveId` = `depth`) correlated by `correlationUuid` and scoped to `{tenantId, teamId, emittedAt}`. Side-channel emits (no envelope, or `waveId ≠ depth`) are rejected. `waveInSecureComms` validates the `SecureWaveEnvelope` then delegates to `enforceTeamCommsEmit`; [[agent]] strict-apply reads `_secureWave` from emit payloads and routes through the same gate (no duplicate tenant/depth checks).

| Wave kind | `waveId` / `depth` | `correlationUuid` |
|-----------|-------------------|-------------------|
| Society breath | one commit step | `waveCorrelationUuid({ sessionId: breath#, … })` |
| Seal-and-push | confirm gate wave | same session id per push wave |
| Chat cascade | parent `depth + 1` | team session uuid |
| Horo ring step | horo ordinal | team `teamUuid` + step |

Matter-twin: `src/team/comms/index.ts` (`enforceTeamCommsEmit` · `waveInSecureComms` · `waveCorrelationUuid` · `teamCommsBeforeChange`) + `test.ts`. Composes [[wave]] · [[realtime]] · [[chat]] · [[team]] · [[sandbox]] · [[receipt]] · [[access]] · [[breath]] · [[seal]] · [[horo]].

**Law — [[law]]: waves are in coordinated secure communications — every wave is a numbered, receipted, depth-capped hop inside the team/comms envelope (`waveInSecureComms`); a team-scoped [[realtime]] emit is allowed only when scope-tenant matches, `eventUuid` recomputes, depth stays below `MAX_BROADCAST_DEPTH`, and (when a team is in scope) the agent is the team presence or a member — otherwise fail-closed with a [[receipt]].**

@standard ISO-27001 A.5.23 cloud-service-tenant-isolation
@standard RFC 9562 §5.8 content-uuid event-identity
