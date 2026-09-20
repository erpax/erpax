---
name: swarm
description: Use when reasoning about swarm — A hexacopter takes four stick numbers and produces six motor commands. A swarm takes a set of tasks and produces an assignment across N agents.
atomPath: swarm
coordinate: "swarm · 4/weave · 8b6d4242"
contentUuid: "dbee71a5-e15e-56eb-9dd7-836505d1735a"
diamondUuid: "84f59bdb-0af2-8afa-8886-682d29c025f1"
uuid: "8b6d4242-d722-8922-ac83-8d4438613d3c"
horo: 4
typography:
  partition: swarm
  bondDegree: 15
standards:
  - "Graham (1969) — LPT list scheduling is within 4/3 − 1/(3m) of optimal makespan"
bindings: []
signatures:
  computationUuid: "534713d6-0f2d-85c5-ab4c-891c832516fa"
  stages:
    - stage: path
      stageUuid: "fd00e325-ca88-80a0-a0d6-17cc57f6d28d"
    - stage: trinity
      stageUuid: "f50957d6-01b8-8d25-a5a5-6f65d04a02b1"
    - stage: boundary
      stageUuid: "2bda39a4-3861-8fd2-aa0b-ca6538ad4a74"
    - stage: links
      stageUuid: "3dc520e6-7e80-8638-b949-763a178fae05"
    - stage: horo
      stageUuid: "ff6c13ca-9151-83dc-9711-d57c4fe779a3"
    - stage: seal
      stageUuid: "91a85422-f1cb-8084-b5d4-b07f0c2d05e5"
    - stage: uuid
      stageUuid: "67e7e82e-e993-8122-8eeb-1279dcccad6c"
version: 2
---
# swarm — one mixer, one level up: work over agents, and what happens when one dies

A hexacopter takes four stick numbers and produces six motor commands. A swarm takes a set of
tasks and produces an assignment across N agents. Both respect a per-actuator limit, both
**conserve**, and both must survive losing an actuator — a hex re-mixes onto five motors
([[rotation]]), a swarm re-assigns onto the survivors.

This corpus has now written that fold in five vocabularies: a till ([[float]]), a power bus
([[energy]]), a position ([[staffing]]), a rotor ring, and here. The shape does not change.

## This repository already runs one

CI shards its integration tests sixteen ways — *Integration Tests (shard 1/16)* through *(16/16)*.
That **is** this problem: partitions of a corpus spread over workers, where a worker dying must not
lose a shard. The tests here use exactly that case.

## Three decisions, each pinned

- **Deterministic.** Ties break on id, so the same input always gives the same assignment — and so
  does the same input in a different **order**. A scheduler that shuffles under a tie makes a
  failure impossible to reproduce, which is the property you need most on the day it goes wrong.
- **Work is placed or named, never dropped.** A task heavier than any agent is `unassigned` and
  reported; it is not crammed past a capacity and not silently discarded. Conservation is checked
  two ways, because neither implies the other: weights can balance while a zero-weight task is lost,
  and counts can balance while a weight is misread.
- **Loss re-assigns wholesale.** Moving only the orphaned tasks leaves the survivors lopsided, and
  the imbalance compounds with each further loss. A hex does not bolt the dead motor's command onto
  one neighbour either.

## Redundancy is computed, never read off a headcount

`tolerableLosses` asks the question rather than counting agents, and it removes the **largest**
first because that is the worst case a plan must survive. Four equal runners carrying sixteen
shards tolerate **two** losses. But a swarm of one 200-unit agent and two 20-unit agents tolerates
**zero** — a headcount would have said two.

**Honest boundary.** LPT is an **approximation**: Graham's 1969 bound is 4/3 − 1/(3m) of the optimal
makespan, and optimal partitioning is NP-hard. A function claiming optimality here would be a claim
nothing could check. Tasks are **indivisible** — splitting one across agents is a different problem
and is not solved here. Weights are **declared**, so an assignment is exactly as good as the
estimate feeding it, and a task whose real cost is twice its weight will blow the makespan this
computes. There is no model of communication cost, data locality, or startup time, so this balances
**load** and not wall-clock on a real network.

**Law — [[law]]: spread the work, name what would not fit, and re-mix on loss rather than patching
the hole. A swarm that reports full coverage by dropping what it could not place has told you
about itself, not about the work.**

## Standards

- **Graham (1969)** — LPT list scheduling is within 4/3 − 1/(3m) of optimal makespan.

Composes: [[float]] · [[energy]] · [[rotation]] · [[law]].
