---
name: group
description: "Use when a laddered command must end as a whole — spawnSync's timeout kills only the shell it started, so the command under it is reparented to init and keeps running. spawnGroupSync runs the command as the leader of its own process group under a tiny supervisor that kills the whole group on timeout or on Ctrl-C, then dies by the same signal, so every verdict that reads r.signal is unchanged."
atomPath: "timeout/group"
coordinate: "timeout/group · 1/base · 32672345"
contentUuid: "0090e337-d263-5f21-b2cc-1de0faa026c1"
diamondUuid: "5a846c1d-be18-8583-bcea-09aec63c1de1"
uuid: "32672345-3cf6-8064-a365-d0b5a849bc47"
horo: 1
typography:
  partition: timeout
  bondDegree: 49
standards:
  - "ISO/IEC 25010:2023 §5.6 maintainability — a stopped operation leaves no work running"
bindings: []
signatures:
  computationUuid: "b9f66ec1-d801-8710-a6da-0294e0f680c7"
  stages:
    - stage: path
      stageUuid: "eb15aae6-ec66-823f-9b3a-39930ef5e90e"
    - stage: trinity
      stageUuid: "6594be28-0d4f-89b5-9bdf-813dfe642f20"
    - stage: boundary
      stageUuid: "3e685819-da10-8f9c-9800-279d4b53ab36"
    - stage: links
      stageUuid: "17c018e4-580f-8a6b-928f-2a9f22aafbef"
    - stage: horo
      stageUuid: "e8cfe6d7-6c0b-8610-9aee-eba930ddc7c9"
    - stage: seal
      stageUuid: "89cfae4b-bf60-80e4-8e1e-60d9b78d1909"
    - stage: uuid
      stageUuid: "13363ee0-59f4-8ca8-8f7b-525026369231"
version: 2
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
