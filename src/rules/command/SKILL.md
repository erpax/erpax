---
name: command
description: "Use when reasoning about command — That file became a child atom at in an earlier refactor, and the shell was never repointed."
atomPath: "rules/command"
coordinate: "rules/command · 8/crest · 5c6f01e4"
contentUuid: "df6c7e8f-ed9f-587e-b544-4b6a7a93aa4f"
diamondUuid: "606fc4e0-59c3-84e3-8a82-f1c3756d3ce6"
uuid: "5c6f01e4-70e1-85b6-ad0c-29152494d8d8"
horo: 8
typography:
  partition: rules
  bondDegree: 62
standards: []
bindings: []
signatures:
  computationUuid: "b7628c00-342f-88ef-82a3-bfc38e4fc8d5"
  stages:
    - stage: path
      stageUuid: "b5e62b08-01b9-8aa0-b446-cccc0c0e3659"
    - stage: trinity
      stageUuid: "9717512a-a5ae-888e-87e1-712ca944b401"
    - stage: boundary
      stageUuid: "9b1c9973-f425-8bb1-9aad-b2c896ec7274"
    - stage: links
      stageUuid: "e5be4147-abd0-8b92-844c-e9720219a480"
    - stage: horo
      stageUuid: "2584c832-059e-88c6-bd0b-16b5ebf1894e"
    - stage: seal
      stageUuid: "e46e9b95-f7ef-804c-a92b-840ae48a5ddd"
    - stage: uuid
      stageUuid: "d4463480-9b87-8f3a-af9b-f606c39f56d8"
version: 2
---
# rules/command — a step that cannot run reports the same green as a step that passed

```js
spawnSync('pnpm', ['exec', 'tsx', 'src/confirm/matter.ts'], …)
```

That file became a child atom at `matter/index.ts` in an earlier refactor, and the shell was never
repointed. So this corpus's flagship write-time gate — the one that "cannot be `--no-verify`'d" —
died with `ERR_MODULE_NOT_FOUND` on **every edit**. Its failure mode is exit 1, which does not
block. It failed open, silently, for as long as nobody looked.

[[rules]]/reference already forbids a dead `src/…` pointer in **prose**. A path inside a string
literal that a process then executes was outside it, and that is precisely the gap this rotted in.
No shell-style scan can see it either: the path is an element of an argument array, not a word after
a command.

## Reachability is the scope, and it is what keeps the number honest

| population | count | judged |
| --- | ---: | --- |
| dead executable path literals in the repo | ~140 | no |
| reachable from CI, the git hooks or `package.json` | **0** | yes |

Most of the 140 are not defects. A completed one-shot migration names the files it deleted; a
generated inventory records what a past wave touched. **A file nothing runs cannot fail open,
because it never runs** — and judging them would bury the signal under its own noise, which is how
three separate instruments died this session.

## What it found on its first run

`scripts/auto-heal-generated-artefacts.sh` guarded a pre-push heal on
`src/services/consistency-apply/index.ts` — a module that had moved to `@/consistency/apply`. The
guard was false on every run, so the heal never fired and the hook printed the same green it prints
when the heal succeeds. It was **removed rather than repointed**: the module it would call still
resolves a registry path that is also gone, so activating it would trade a silent no-op for a
caught-and-logged error. The capability is not lost — the MCP consistency tool calls it by its real
address.

## Its own first run was wrong, in three ways

It reported 4, and every one was an artefact: a **comment** naming a path (`Mirror of
src/algebra/license.ts`), `packages/released.json` matched as `packages/released.js` because the
extension alternation stopped mid-word, and two shell paths behind `[ -f … ]` guards, which are
conditionals rather than commands. Each is now excluded by construction and pinned by a test.

**Honest boundary.** This proves a path **named** by something that runs exists. It does not prove
the command succeeds, that the file does what its caller expects, or that a dynamically-assembled
path resolves — a specifier built from variables is invisible to it. It closes the door that was
standing open: a step whose target quietly moved.

**Law — [[law]]: a gate that cannot run is indistinguishable from a gate that passed. Every path
reachable from what the repo actually executes must exist, and zero is a theorem — there is no
acceptable number of checks that report nothing while appearing to be enforced.**

## Standards

- **ISO 19011:2018 §6.4** — audit evidence: a check that did not run produced none.
- **ISO/IEC 25010:2023 §5.5** — testability: a step that cannot execute cannot be tested.

Composes: [[rules]]/reference · [[confirm]] · [[law]].
