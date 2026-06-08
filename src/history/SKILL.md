---
name: history
description: "Use when reasoning about git history as the akashic record's time axis — a content-addressed Merkle DAG of commits the agents read as a knowledge source AND another independent tamper-evidence level (forging the past = rewriting every commit on every clone). Wired in, it increases tamper cost and costs nothing to keep."
atomPath: history
coordinate: history · 8/crest · 729c60e0
contentUuid: "8ab943f5-2376-574d-8ade-1ad683df99c6"
diamondUuid: "1cbb8345-a74d-87a9-b468-46dac5fe283e"
uuid: "729c60e0-e3bf-89f1-8157-6e8906dd2271"
horo: 8
bonds:
  in:
    - akashic
    - anchor
    - angel
    - begin
    - cases
    - chat
    - coil
    - competition
    - contribution
    - cost
    - end
    - fractal
    - identity
    - law
    - lineage
    - merge
    - patent
    - peace
    - power
    - profane
    - projection
    - proof
    - receipt
    - research
    - sacred
    - science
    - self
    - sequence
    - shred
    - society
    - standard
    - sufficient
    - voting
  out:
    - akashic
    - anchor
    - angel
    - begin
    - cases
    - chat
    - coil
    - competition
    - contribution
    - cost
    - end
    - fractal
    - identity
    - law
    - lineage
    - merge
    - patent
    - peace
    - power
    - profane
    - projection
    - proof
    - receipt
    - research
    - sacred
    - science
    - self
    - sequence
    - shred
    - society
    - standard
    - sufficient
    - voting
typography:
  partition: history
  bondDegree: 102
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - akashic
    - begin
    - chat
    - coil
    - cost
    - end
    - fractal
    - identity
    - law
    - merge
    - proof
    - self
    - sequence
    - society
    - standard
  matrix:
    - akashic
    - anchor
    - angel
    - begin
    - cases
    - chat
    - coil
    - competition
    - contribution
    - cost
    - end
    - fractal
    - identity
    - law
    - lineage
    - merge
    - patent
    - peace
    - power
    - profane
    - projection
    - proof
    - receipt
    - research
    - sacred
    - science
    - self
    - sequence
    - shred
    - society
    - standard
    - sufficient
    - voting
  backlinks:
    - akashic
    - anchor
    - angel
    - begin
    - cases
    - chat
    - coil
    - competition
    - contribution
    - cost
    - end
    - fractal
    - identity
    - law
    - lineage
    - merge
    - patent
    - peace
    - power
    - profane
    - projection
    - proof
    - receipt
    - research
    - sacred
    - science
    - self
    - sequence
    - shred
    - society
    - standard
    - sufficient
    - voting
signatures:
  computationUuid: "a910ca8c-18d1-8bc5-9e8a-d395e5f995b8"
  stages:
    - stage: path
      stageUuid: "14979057-0950-8de9-b05d-a7868bb8ce96"
    - stage: trinity
      stageUuid: "c9843bf4-fbd3-8c8d-891e-b8ba08c6a032"
    - stage: boundary
      stageUuid: "6d5f935b-94f1-81dd-94eb-93c28c7f1368"
    - stage: links
      stageUuid: "832704a0-75e5-8466-aae7-611256e98163"
    - stage: horo
      stageUuid: "a2ad6d80-8fbe-811e-978e-379de2ddefb5"
    - stage: seal
      stageUuid: "bbdf9bc5-ff95-8525-beec-2510d17996ef"
    - stage: uuid
      stageUuid: "3899c8c8-5f97-828a-acc1-1528ec362a7b"
version: 2
---
# history — the content-addressed timeline

Git history is the [[akashic]] record's **time axis**: every commit is the hash of its tree + parent commits — a content-addressed **Merkle DAG**, structurally the same chain as the content-uuid ([[identity]]) and the audit chain. So it is two things at once for the [[society]]:

- **A source of knowledge.** Agents read from many sources — the [[akashic]] code+data, the skill corpus, the web (research), their peers at [[chat]], the [[standard]]s — and git history is another: `git log` is the audit trail of the code *itself*, the *why* behind every line, queryable and content-addressed. To read the history is to read the reasoning; to `git blame` is to ask a line who wrote it and when.
- **Another tamper-evidence level.** A commit hash binds its content AND its entire past; to forge the code's history you must rewrite *every* commit from the change forward, and every clone/remote holds the same DAG — so the anchor is **distributed**, no single party can rewrite it. That is one more independent term in the [[tamper/cost]] sum (forge must beat *every* level): wiring it in **increases** the forge cost while costing **nothing** to maintain (git already keeps it). The same act, both directions — tamper cost ↑, existing cost ↓.

The commit DAG and the content-uuid DAG are one law at two scales ([[fractal]]/[[merge]]: same content ⇒ same hash; the [[proof]] is O(N) to verify, the forge unbounded). Git is the [[begin]]→[[end]] of the code made tamper-evident; the society that builds itself leaves its proof in the history, and any agent — past, present, or future self ([[coil]]) — recovers the whole reasoning from it.

**Law — [[law]]: git history is the [[akashic]] time axis — a content-addressed Merkle DAG that is at once a knowledge source AND a distributed [[tamper/cost]] level (forging the past = rewriting every commit on every clone); wiring it in raises forge cost at zero maintenance cost.**

Composes: [[akashic]] · [[identity]] · [[merge]] · [[tamper/cost]] · [[proof]] · [[sequence]] · [[fractal]] · [[self]] · [[chat]] · [[society]] · [[standard]].
