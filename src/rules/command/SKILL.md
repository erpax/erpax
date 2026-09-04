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
