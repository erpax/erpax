---
name: land
description: "Use when a push must be judged where it lands — the pre-push hook runs before the push and cannot see a workflow that fails after it, so land pushes main and then asks the forge for every workflow run and check run on that exact sha. Silence is UNMEASURED and never a pass, only a push judges a push, a cancelled scan is not a clean scan, and an unrostered foreign check is judged and named. Ported from uuidna's post-push arm. Run: pnpm erpax land (push, cure, wait) · pnpm erpax land verdict <sha>"
atomPath: land
coordinate: "land · 5/round · 79a47b9c"
contentUuid: "548603ec-66f9-5c85-aebd-1e44be0d1afc"
diamondUuid: "f9734e58-9a13-8f25-bba3-92fafd26a2ca"
uuid: "79a47b9c-49d7-85ee-947b-aceade434434"
horo: 5
typography:
  partition: land
  bondDegree: 13
standards:
  - "ISO-19011:2018 §6.4 — audit evidence: a check that did not run produced none"
  - "W3C-DID-1.0"
bindings: []
signatures:
  computationUuid: "d28cd87e-63f1-8e9f-bb12-a395eb1ebc63"
  stages:
    - stage: path
      stageUuid: "5679d57f-282c-80c1-a0d8-ac17950aecc0"
    - stage: trinity
      stageUuid: "9e0c931f-4f81-82d2-8058-0ae6199e2ec5"
    - stage: boundary
      stageUuid: "35aca16e-540c-89f2-832e-d859d056928b"
    - stage: links
      stageUuid: "89d41a17-12a9-8fd5-a4bf-3a84aab6c344"
    - stage: horo
      stageUuid: "ab7fed3c-0de7-83f3-a1ce-14b930ede068"
    - stage: seal
      stageUuid: "5cb64369-c5b5-8caa-8055-a4e3afa9c51e"
    - stage: uuid
      stageUuid: "5a0e1927-663b-841b-b5e6-1495fcef68c3"
version: 2
---
# land — a landing is complete when the forge agrees, not when the remote moved

The pre-push hook is erpax's court, and it sits on the wrong side of the push. It runs before the
commit leaves the machine, so a workflow that fails **after** the push is outside everything it can
see. Only asking the forge can.

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

`NEED_NOT_JUDGE` is **declared**, in the open, because no theorem derives it. `Workers Builds: erpax` is
deliberately **not** in it: it is a production build path that fails in zero seconds, and whether to
disconnect it in the Cloudflare dashboard or to fix it is a human decision. Until someone makes it,
every landing names it and refuses.

## The push, and the one taught cure

`pnpm erpax land` pushes main through the hook, confirms `origin/main` holds HEAD (the hook can commit a
heal mid-push, and then pushes again), and waits on the forge for that sha. A denial is cured only when a
cure is **taught** in `CURES`, most specific first, and a denial with no taught cure stops for a human.

The one taught cure is *behind the shared tree*: git spells it two ways — `(fetch first)` and
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
