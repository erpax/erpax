---
name: comms
description: "Use when enforcing secure realtime communication between teams — every team-scoped emit onto the chat/realtime bus must pass tenant match, content-uuid event integrity, depth cap, and (when a team is in scope) horo voice law; allowed and blocked emits are receipted."
atomPath: "team/comms"
coordinate: "team/comms · 1/base · 2b5cbc6d"
contentUuid: "6d1b3223-5ee4-5d35-87f2-525feed2172b"
diamondUuid: "f335654b-b5e6-8d22-aafb-b9a7b00b0ae0"
uuid: "2b5cbc6d-3561-8a54-a788-b63b80b19e9d"
horo: 1
typography:
  partition: team
  bondDegree: 48
standards:
  - "ISO-27001 A.5.23 cloud-service-tenant-isolation"
  - "RFC 9562 §5.8 content-uuid event-identity"
bindings: []
signatures:
  computationUuid: "4da998f7-6697-8dba-99ba-97f9beaf0a9a"
  stages:
    - stage: path
      stageUuid: "3a8be850-bf26-8ccc-b5cc-f80bf0ab52e8"
    - stage: trinity
      stageUuid: "bbcb154e-7a45-883c-9016-42f4fd451e1b"
    - stage: boundary
      stageUuid: "1d1e3ea7-0d94-8bc4-9a55-568d1e448fb7"
    - stage: links
      stageUuid: "dd6a5bc4-de2d-867c-bf3c-64043335e377"
    - stage: horo
      stageUuid: "71595456-318e-8d20-8b58-de4d824a2f00"
    - stage: seal
      stageUuid: "5bcc82cd-4c5d-83bd-be98-91bb287d48fb"
    - stage: uuid
      stageUuid: "1c78ca96-ef17-8e38-8d25-a34a618b0663"
version: 2
---
# team/comms — secure realtime between teams

**Threat model (Team A ↔ Team B).** A team in tenant *tA* must never deliver an event into tenant *tB*'s room (cross-tenant leak). An attacker must not publish without a content-uuid that recomputes from the event body (forged `eventUuid` / replay). Agent cascades must not run away past [[chat]]'s `MAX_BROADCAST_DEPTH`. When a [[team]] context is supplied, only the team's `teamUuid` presence or a member uuid may voice the emit (Team A cannot speak as Team B).

**What is enforced (fail-closed).** `enforceTeamCommsEmit` gates every team-scoped [[realtime]] emit: `tenantMatchVerdict` (ISO-27001 A.5.23 / [[access]]), `eventUuidVerdict` (RFC 9562 §5.8 / [[identity]]), `depthVerdict` (`MAX_BROADCAST_DEPTH`), optional `teamVoiceVerdict` ([[team]] horo law). `receiptTeamCommsEmit` chains a [[receipt]] for allow and block alike (the [[sandbox]] audit shape — no receipt, no proof). `teamCommsBeforeChange` is the Payload `beforeChange` hook on the `chat` collection — programmatic writes cannot skip the gate.

## Waves ride inside the envelope (not side-channel)

**Law — waves are in coordinated secure communications.** Every [[wave]] — society breath step, [[confirm]] seal-and-push wave, [[horo]] ring hop, [[chat]] broadcast cascade, README [[seal]] wave — is a **numbered hop** (`waveId` = `depth`) correlated by `correlationUuid` and scoped to `{tenantId, teamId, emittedAt}`. Side-channel emits (no envelope, or `waveId ≠ depth`) are rejected. `waveInSecureComms` validates the `SecureWaveEnvelope` then delegates to `enforceTeamCommsEmit`; [[agent]] strict-apply reads `_secureWave` from emit payloads and routes through the same gate (no duplicate tenant/depth checks).

| Wave kind | `waveId` / `depth` | `correlationUuid` |
|-----------|-------------------|-------------------|
| Society breath | one commit step | `waveCorrelationUuid({ sessionId: breath#, … })` |
| Seal-and-push | confirm gate wave | same session id per push wave |
| Chat cascade | parent `depth + 1` | team session uuid |
| Horo ring step | horo ordinal | team `teamUuid` + step |

Matter-twin: `src/team/comms/index.ts` (`enforceTeamCommsEmit` · `waveInSecureComms` · `waveCorrelationUuid` · `teamCommsBeforeChange`) + `test.ts`. Composes [[wave]] · [[realtime]] · [[chat]] · [[team]] · [[sandbox]] · [[receipt]] · [[access]] · breath · [[seal]] · [[horo]].

**Law — [[law]]: waves are in coordinated secure communications — every wave is a numbered, receipted, depth-capped hop inside the team/comms envelope (`waveInSecureComms`); a team-scoped [[realtime]] emit is allowed only when scope-tenant matches, `eventUuid` recomputes, depth stays below `MAX_BROADCAST_DEPTH`, and (when a team is in scope) the agent is the team presence or a member — otherwise fail-closed with a [[receipt]].**

@standard ISO-27001 A.5.23 cloud-service-tenant-isolation
@standard RFC 9562 §5.8 content-uuid event-identity
