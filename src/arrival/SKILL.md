---
name: arrival
description: "Use when a push must be judged where it lands — the pre-push hook runs before the push and cannot see a workflow that fails after it, so the land lane pushes main and then asks the forge for every workflow run and check run on that exact sha. Silence is UNMEASURED and never a pass, only a push judges a push, a cancelled scan is not a clean scan, and an unrostered foreign check is judged and named. Ported from uuidna's post-push arm. Run: pnpm erpax land (push, cure, ask) · pnpm erpax land verdict <sha>"
atomPath: arrival
coordinate: "arrival · 2/share · e78c800f"
contentUuid: "88210c01-e0e4-5138-810a-f5d741ddd796"
diamondUuid: "449fb74d-aa7e-8b6c-bca4-1dc518255e32"
uuid: "e78c800f-3b39-805c-9436-512b080e026d"
horo: 2
typography:
  partition: arrival
  bondDegree: 58
standards:
  - "ISO-19011"
  - "ISO-19011:2018 §6.4 — audit evidence: a check that did not run produced none"
bindings: []
signatures:
  computationUuid: "900f5eb3-3205-807a-a24c-ea2a7f50335b"
  stages:
    - stage: path
      stageUuid: "7beef556-c379-8fc3-b2a4-db3968264dd7"
    - stage: trinity
      stageUuid: "9b555165-f60c-8728-a9fb-119fbd29d18d"
    - stage: boundary
      stageUuid: "8908bad8-e3aa-82d8-a8a1-7e80d9162fa4"
    - stage: links
      stageUuid: "2de31c23-4de8-855c-9d98-48d2bf72d9a2"
    - stage: horo
      stageUuid: "a46bb31c-178b-81b3-94a9-92ae64c83186"
    - stage: seal
      stageUuid: "1e5a6d02-20c3-8da0-860f-745e21c832bb"
    - stage: uuid
      stageUuid: "60159b84-be7c-8620-9166-4379a03d938d"
version: 2
---
# arrival — a push has arrived when the forge agrees, not when the remote moved

The pre-push hook is erpax's court, and it sits on the wrong side of the push. It runs before the
commit leaves the machine, so a workflow that fails **after** the push is outside everything it can
see. Only asking the forge can.

The lane keeps uuidna's name, `pnpm erpax land`. The atom is `arrival` because a path names what a thing
**is**, and `land` is not in the shared vocabulary: the vocabulary gate refused it on the first landing.

## The blind side, measured (2026-09-12, commit `d5ffea88c7`)

| surface | verdict |
| --- | --- |
| pre-push hook | green |
| CI, every job of the push run | green |
| `Workers Builds: erpax` — a git-connected Cloudflare build | **red**, on 5 of the last 8 main commits |
| `Deploy + UI smoke` — the deploy workflow | **red**, on every run since it was written |

Nothing blocked and nothing reported. The red was found by a person reading an exported CSV by hand,
which is the cure this atom replaces: not more attention, an arm that asks.

## Ported, not re-derived

The verdict is uuidna's post-push arm (`uuidna/uuidna`), paid for there by a `security` workflow red on
44 consecutive pushes under a green local gate, then hardened by every false verdict it later produced.
Its laws arrived with it, and each is pinned in this atom's test:

- **No run found is UNMEASURED, never a pass.** A poll is always faster than a queue, so reading "no runs
  yet" as clean would report green on every push while measuring nothing.
- **Only a push judges a push.** A scheduled run, a `workflow_run` and CodeQL's `dynamic` event all land
  on the same sha and answer a different question. They are reported, never counted — erpax's deploy is
  exactly this: a `workflow_run` of CI.
- **A set where nothing judged is not a pass.** All-cancelled once satisfied "no failures" and read green.
- **Check runs are the finer surface** — every Actions job plus anything a GitHub App posts — and when
  present they **are** the verdict. `Workers Builds: erpax` appears in no workflow list at all.
- **An exempt first-party check that fails still refuses.** An exemption covers lateness, never fault.
- **An unrostered foreign check is judged normally and named**, so the decision is forced rather than
  defaulted.

`NEED_NOT_JUDGE` is **declared**, in the open, because no theorem derives it. `Workers Builds: erpax` is in
it since 2026-09-13, by the owner's direction to decide leanly: the git-connected Cloudflare build posts a
0-second failure on every commit while GitHub CI, the full suite, is green. CI is the core verdict and this
build its mirror, which cannot judge. It stays named in every verdict, and if it ever passes, its entry
reports itself stale. A foreign check nobody rostered still refuses: the entry is per name, never per app.

## The push, and the one taught cure

`pnpm erpax land` pushes main through the hook, confirms `origin/main` holds HEAD (the hook can commit a
heal mid-push, and then pushes again), and asks the forge for that sha — riding out the seconds before the
push is indexed, and no longer. CI takes about thirteen minutes, so a run still going is **re-asked**
(`pnpm erpax land verdict <sha>`), never waited for: the CLI ladder caps a command at five minutes and never
block-waits. A denial is cured only when a cure is **taught** in `CURES`, most specific first, and a denial
with no taught cure stops for a human.

The push lane runs **outside** the ladder, like the test waves, because its long part is the pre-push hook
— the same `git push` a person runs unladdered. Its first live run went through the ladder, which killed the
wrapper at five minutes while the child kept pushing, unseen, and reported nothing (2026-09-13).

Two cures are taught. *Stale standards index* regenerates `docs/STANDARDS_INDEX.md` from the banners and
commits that one file by path — the index is derived, so a stale one is regenerated, never argued with. It
was taught from the push it blocked, and keys on the stable half of the hook's line, because the remedy text
after "Run:" has already changed spelling once.

The other is *behind the shared tree*: git spells it two ways — `(fetch first)` and
`(non-fast-forward)` — and a cure matching only one misses the case that fires. It **integrates, never
forces**: no `--force`, no `--no-verify`, and a merge that conflicts aborts itself and leaves the tree as
it was found.

**Honest boundary.** This proves what the forge **reported** for one sha, never that the workflows test
the right things — a green verdict over a vacuous suite is still green ([[rules]]/mirror). It judges only
what arrived: a required check that never posted is invisible to it. Polling is bounded, so a run slower
than the bound reports **still running**, never a verdict. And the lane is additive: nothing forces a
push through it yet, so the blind side is closed for every push that asks and open for every push that
does not.

**Law — [[law]]: a landing is complete when the forge agrees, not when the remote moved. Ask the forge for
the exact sha; read silence as unmeasured, a foreign app as a decision, and a failure after the push as
the gate's own finding.**

## Standards

- **ISO 19011:2018 §6.4** — audit evidence: a check that did not run produced none.
- **ISO/IEC 25010:2023 §5.5** — testability: a verdict that cannot say no is not a test.

Composes: [[gate]] · [[rules]]/unraised · [[cloudflare]] · [[law]].
