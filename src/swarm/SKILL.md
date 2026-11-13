---
name: swarm
description: Use when reasoning about swarm — A hexacopter takes four stick numbers and produces six motor commands. A swarm takes a set of tasks and produces an assignment across N agents.
atomPath: swarm
coordinate: "swarm · 8/crest · 710eb9f4"
contentUuid: "1b1e25cd-12ac-5501-aaf0-78ac9d19090b"
diamondUuid: "404cdbf5-3fad-8815-9a17-f7bec76afa25"
uuid: "710eb9f4-e01b-8ddf-bd00-30c2e48aa659"
horo: 8
typography:
  partition: swarm
  bondDegree: 21
standards:
  - "Graham (1969) — LPT list scheduling is within 4/3 − 1/(3m) of optimal makespan"
  - "Graham (1969)` sat in the docstring, the SKILL and the README with nothing computing it —"
bindings: []
signatures:
  computationUuid: "00a12904-4f83-808e-8705-a8ebb7093cf5"
  stages:
    - stage: path
      stageUuid: "fd00e325-ca88-80a0-a0d6-17cc57f6d28d"
    - stage: trinity
      stageUuid: "f50957d6-01b8-8d25-a5a5-6f65d04a02b1"
    - stage: boundary
      stageUuid: "2bda39a4-3861-8fd2-aa0b-ca6538ad4a74"
    - stage: links
      stageUuid: "0a8826b6-8788-89ee-b60b-c0e350a4e9e8"
    - stage: horo
      stageUuid: "ba254227-00ed-8610-9a17-a044166c9512"
    - stage: seal
      stageUuid: "91a85422-f1cb-8084-b5d4-b07f0c2d05e5"
    - stage: uuid
      stageUuid: "8d91d23b-e29a-8b51-9687-c39db26b8f67"
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

## The cited bound is now arithmetic, and it refuses where it does not apply

`@standard Graham (1969)` sat in the docstring, the SKILL and the README with nothing computing it —
an axiom [[proof]]/replaceable counts as undischarged. It is one exact rational, so `lptBound(m)` is
**(4m − 1) ÷ 3m** in a single division: `lptBound(1)` is exactly 1 (LPT on one machine is optimal)
and the bound climbs toward 4/3 without reaching it.

`grahamVerdict` then tests the theorem's **hypotheses** before its conclusion. Graham is about
**identical** machines and a schedule that places every task, and `assign` does neither by default —
capacities may differ, and a task heavier than every agent is refused. So a mismatch returns
`applies: false` with a reason and `holds: null`, never a `holds: false` that would read as a
counterexample to Graham when it is a model mismatch ([[rules]]/unraised).

The measurement is against a **floor** on the optimum — the heavier of the largest single task and
the level split — because the optimum itself is NP-hard. Since floor ≤ optimum, passing against the
floor is **sufficient** for Graham's conclusion; failing it is **not** a counterexample, only a loose
floor. That asymmetry is why `ratio` is reported beside `holds` rather than swallowed by it.

**Honest boundary.** LPT is an **approximation**, and optimal partitioning is NP-hard: `grahamVerdict`
proves the schedule sits inside the bound relative to a lower bound, never that it is optimal. A
function claiming optimality here would be a claim nothing could check. Tasks are **indivisible** — splitting one across agents is a different problem
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
