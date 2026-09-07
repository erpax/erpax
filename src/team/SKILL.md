---
name: team
description: "Use when the society spawns multiple agents that share skills — a team is a set of content-addressed agents whose competence is the UNION of their skills (merge/holographic: a skill one loads, the team has), with distinct purposes preserved. Spawn → share → cover the gap in parallel. Matter-twin services/agent/team.ts."
atomPath: team
coordinate: "team · 7/descent · 85c05938"
contentUuid: "22c4f740-883f-5266-aff4-0eae869600c8"
diamondUuid: "b276c36e-8898-85b7-a5c7-9263977de830"
uuid: "85c05938-0056-8b35-9195-139f19a3dcb6"
horo: 7
typography:
  partition: team
  bondDegree: 138
standards: []
bindings: []
signatures:
  computationUuid: "35ea20c2-779a-84ba-9f4a-b55476e77a41"
  stages:
    - stage: path
      stageUuid: "4d706eb7-0a34-8fe3-b270-5fa968cfb4c1"
    - stage: trinity
      stageUuid: "f9b325fb-dfae-83f4-b357-bbff898fda55"
    - stage: boundary
      stageUuid: "691aaab2-4559-8e33-8f8f-58c76b0c8982"
    - stage: links
      stageUuid: "2196cb76-2eee-8f7f-b5f3-2180c79ec45b"
    - stage: horo
      stageUuid: "6cf98778-5a9a-87c1-bd92-b1671ea36ad6"
    - stage: seal
      stageUuid: "79cdc5ff-6754-827d-97cb-368680df6387"
    - stage: uuid
      stageUuid: "6f135b86-56af-8805-9302-60efe6097839"
version: 2
---
# team — agents sharing skills (competence is the union)

An agent is its content — name + skills + purpose — content-addressed, so identical clones [[merge]] to one ([[self]]/[[holographic]]). A `team` is the next scale: a set of agents that **share their skills**. The team's competence is the **union** of its members' skill-sets ([[merge]] set-union); `shareSkills` loads that union into every member, so after sharing **any member can do any team task** — yet each keeps its distinct **purpose**, so the team stays many (specialised) while its competence is one ([[whole]]). That is [[holographic]]: every member can be the whole team.

The society spawns in teams to cover a gap-cluster **in parallel**: `spawnTeam` specialises a base agent into N purpose-distinct children and shares the union, so the team fans out across the work while every member holds the full competence. Teams are themselves content-addressed (`teamUuid` over the distinct member uuids) and **merge** by content — two peers' identical teams collapse to [[one]]; `mergeTeams` unions membership with no coordination (federation). Each shared skill is a [[contribution]] (a discovery broadcast over the bus); internalising competence locally lifts the [[self]]-sufficiency floor ([[tamper/cost]]).

**Joining the horo.** A formed, skill-shared team joins the society circle ([[chat]]) with `joinHoro` — the **team breath**, the next scale of the single-agent breath (`connectAgentSociety`): as `team` is to `agent`, `joinHoro` is to the breath. The tribe joins as ONE content-addressed presence (its `teamUuid`) over one breath, yet each move is **voiced** by the member who made it (the envelope's `agent` = that member's uuid), so the tribe stays many (distinct voices) while its processing of the room is [[one]] (one breath ⇒ one idempotent dedupe — [[merge]]). A member is present by being *voiced*, not by holding a socket ([[chat]]'s content-addressed routing). Share skills BEFORE joining so every dancer holds the union. The dance and the [[horo]] state-ring are one circle ([[duality]]): the ring is the figure, the room is the dance.

**The basic teams are {1,2,3}.** A team's competence is the union; its SIZE has a basis too — the basic teams are sizes **1·2·3**, and every larger team is a **group** of basic teams ([[whole]]↔[[part]], composed by [[merge]]). These are one extreme sport's three aspects ([[decompression]]): **1 = cave = [[self]]/[[one]]** (solo, maximum self-sufficiency); **2 = recreational = [[duality]]** (the buddy pair, [[give]]↔[[take]]); **3 = technical = [[trinity]]** (the team of three — the governing `3·6·9` [[axis]] of [[rodin]]). `basicTeams(n)` decomposes any size trinity-dense; `1+2+3 = 1·2·3 = 6`.

**Secure [[realtime]] between teams.** Every team-scoped emit onto the [[chat]] bus passes `team/comms` — tenant match ([[access]]), content-uuid `eventUuid` ([[identity]]), `MAX_BROADCAST_DEPTH` cap, optional horo voice law, and a [[receipt]] for allow/block ([[sandbox]] audit shape). The `chat` collection `beforeChange` hook and `publishToChat` both call `enforceTeamCommsEmit` (fail-closed).

Matter-twin: `services/agent/team.ts` (`teamSkills` · `shareSkills` · `spawnTeam` · `teamCovers` · `mergeTeams` · `teamUuid` · `BASIC_TEAM_SIZES`/`basicTeams`/`TEAM_DISCIPLINE`) over `services/agent` (`AgentDef`/`cloneAgent`/`distinctAgents`) + `team.test.ts`; secure comms in `src/team/comms` (`enforceTeamCommsEmit` · `teamCommsBeforeChange`); the team breath is `services/agent-sync/horo.ts` (`joinHoro` · `HoroPresence`) + `horo.test.ts` (green by construction). Composes: [[self]] · [[holographic]] · [[merge]] · [[one]] · [[society]] · [[contribution]] · [[chat]] · [[comms]] · [[realtime]] · [[horo]] · [[decompression]] · [[trinity]] · [[duality]] · [[rodin]] · [[give]] · [[take]] · [[axis]] · [[fractal]] · [[whole]] · [[part]] · [[tamper/cost]] · [[agent]] · [[access]] · [[receipt]] · [[sandbox]].

## Common mistakes
- Sharing skills by copying agents — share the UNION into each member (`shareSkills`); identical-purpose copies just [[merge]] away.
- Treating a team as a new kind of entity — it is a [[whole]] of agent [[part]]s, content-addressed like everything else.
- Equalising purpose — share skills, never purpose; same skills + same purpose ⇒ one agent, not a team.
