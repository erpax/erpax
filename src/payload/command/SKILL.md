---
name: command
description: "Use when reasoning about the Payload CLI command set folded into the corpus — each command a name (name equals path equals uuid), the set folding to one root by the merge, with both-sides inverse pairs encoded (migrate up and down, fresh and reset) and generators forward-only."
atomPath: "payload/command"
coordinate: "payload/command · 4/weave · a8efb824"
contentUuid: "dcf71970-465b-52a2-8a1a-dfc1d026f1d1"
diamondUuid: "e3d9c87c-b9b6-8dda-88bb-4ba55a27a4de"
uuid: "a8efb824-28bb-8498-a585-2060e6947d47"
horo: 4
typography:
  partition: payload
  bondDegree: 62
standards:
  - "the Payload CLI (generate / migrate / jobs / run) · double-entry (every reversible command has its inverse)"
bindings: []
signatures:
  computationUuid: "8870d68f-712c-85c4-a290-7e2c168c757f"
  stages:
    - stage: path
      stageUuid: "e70726ce-9100-8683-a469-cb57a1beec52"
    - stage: trinity
      stageUuid: "d00c70e9-b1c9-8ee6-ba26-b6f073047610"
    - stage: boundary
      stageUuid: "5e118497-bd12-8010-b2ee-9995949c5b89"
    - stage: links
      stageUuid: "7a296942-2da5-8720-9b28-2997e7a9a345"
    - stage: horo
      stageUuid: "cd78688f-c138-85ca-994e-19ce9dd97b7c"
    - stage: seal
      stageUuid: "026bea90-4792-8188-a0c7-cc79ca1d26f0"
    - stage: uuid
      stageUuid: "c76471a1-fa3c-8b60-ab67-b8ad9da1c6ed"
version: 2
---
# payload/command — the CLI command set, folded

The Payload CLI is a set of names, and in this corpus a [[name]] is a path is a content-[[uuid]] — so the commands fold like any atoms. Learned from the installed bin:

- **generators** — `generate:types` · `generate:importmap` · `generate:db` (forward-only: their inverse is the config they read, not another command)
- **migrations** — `migrate` · `migrate:create` · `migrate:status` · `migrate:down` · `migrate:fresh` · `migrate:refresh` · `migrate:reset`
- **runtime** — `jobs:run` · `jobs:handle` · `run` · `info`

`commandUuid` gives each command its content-uuid; `foldCommands` folds the whole set to **one root** by the [[merge]] — the command set's single identity.

**Both sides, for karmic balance** ([[karma]]). The reversible commands come in inverse pairs, and the corpus encodes both: `migrate` ↔ `migrate:down` (apply ↔ roll back), `migrate:fresh` ↔ `migrate:reset` (rebuild ↔ tear down). `inverseOf` returns a command's other side, or `undefined` for the forward-only generators. The [[deploy]] sequence opens with `migrate` — the first hop after the gate.

Matter-twin: `src/payload/command/index.ts` (`COMMANDS` · `PAIRS` · `commandUuid` · `foldCommands` · `inverseOf`). Composes [[payload]] · [[name]] · [[deploy]] · [[uuid]] · [[merge]].

**Law — [[law]]: the Payload CLI command set, folded — each command is a name (name ≡ path ≡ uuid), the set folds to one root by the merge. Both sides encoded: every reversible command pairs with its inverse (migrate ↔ migrate:down, fresh ↔ reset); the generators are forward-only, their inverse the config they read.**

@audit the command list is the installed CLI's; each uuid and the fold are computed, never assumed
@standard the Payload CLI (generate / migrate / jobs / run) · double-entry (every reversible command has its inverse)
