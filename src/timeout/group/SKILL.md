---
name: group
description: "Use when a laddered command must end as a whole — spawnSync's timeout kills only the shell it started, so the command under it is reparented to init and keeps running. spawnGroupSync runs the command as the leader of its own process group under a tiny supervisor that kills the whole group on timeout or on Ctrl-C, then dies by the same signal, so every verdict that reads r.signal is unchanged."
---

# timeout/group — a timeout ends the command, not only the shell around it

The [[timeout]] ladder bounds every CLI command at 1 · 2 · 3 · 5 minutes. It enforced that bound with
`spawnSync(cmd, { shell: true, timeout, killSignal: 'SIGKILL' })`, and that kills exactly one process:
the shell. Everything the shell started is reparented to init and keeps going.

## Measured, not reasoned (2026-09-13)

`pnpm erpax land` ran under the ladder. At the five-minute rung it printed *timed out at 5min*, and the
lane's own process kept running: it finished a third `git push origin main` that nobody saw, then polled
GitHub for fifteen more minutes. Two such orphans were found with `ps` and ended by hand. A verdict that
says a command stopped, over a command that did not, is the defect class this corpus names in
[[rules]]/command: a check that cannot be seen is indistinguishable from one that did not run.

## The shape of the fix

`spawnSync` cannot end a group — its own timeout signals one pid — so the command runs under a small
supervisor that `node -e` executes from source:

- the command is spawned **detached**, so it leads a new process group;
- on the bound, the supervisor kills the **whole group**, then kills itself with `SIGKILL`, so the caller
  sees the same `r.signal` it always saw and the OOM-versus-timeout reading by elapsed time still holds;
- a child that dies by a signal of its own is re-raised on the supervisor, so an allocation failure
  still reads as a signal far inside the bound, never as the clock;
- the supervisor stays in the caller's process group, so Ctrl-C reaches it and it ends the group — the
  old pattern orphaned the command on Ctrl-C too;
- the caller's own `spawnSync` keeps a backstop timeout a few seconds past the bound.

The supervisor is source, not a file: it needs no loader and no type stripping, so it runs the same on
the Node that CI installs as on a newer local one.

**Honest boundary.** This ends every process in the command's **group**. A descendant that starts its own
session or group (`setsid`, a daemon) leaves it deliberately and is not reached. A command that exits
normally keeps its old behaviour: anything it left running in the background is left running. On Windows
there are no process groups, so the old single-process kill remains, and says so.

**Law — [[law]]: a bound ends the whole command it bounds. Killing the shell and reporting a timeout
over a child that is still running is a verdict that lies about what stopped.**

## Standards

- **ISO/IEC 25010:2023 §5.6** — maintainability: a stopped operation leaves no work running.

Composes: [[timeout]] · [[rules]]/command · [[arrival]] · [[law]].
