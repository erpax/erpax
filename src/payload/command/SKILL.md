---
name: command
description: "Use when reasoning about the Payload CLI command set folded into the corpus — each command a name (name equals path equals uuid), the set folding to one root by the merge, with both-sides inverse pairs encoded (migrate up and down, fresh and reset) and generators forward-only."
atomPath: "payload/command"
coordinate: "payload/command · 4/weave · a4e45ce8"
contentUuid: "9c267ea4-a64c-517b-b1cf-1c9a4c50c1f9"
diamondUuid: "42c2b0ef-bc92-8c1d-837b-762fb035b822"
uuid: "a4e45ce8-03fd-85a4-9f83-dab29f86aab6"
horo: 4
typography:
  partition: payload
  bondDegree: 62
standards:
  - "the Payload CLI (generate / migrate / jobs / run) · double-entry (every reversible command has its inverse)"
bindings: []
signatures:
  computationUuid: "5e3e409b-2668-8f0a-bbdb-e69532a67e08"
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
      stageUuid: "dc0cf74f-8da9-8f19-87cf-b6fd399e6fca"
    - stage: seal
      stageUuid: "026bea90-4792-8188-a0c7-cc79ca1d26f0"
    - stage: uuid
      stageUuid: "b3438383-4d6c-8268-b4a9-4bcc2f3f87eb"
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
