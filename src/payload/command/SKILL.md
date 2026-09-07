---
name: command
description: "Use when reasoning about the Payload CLI command set folded into the corpus — each command a name (name equals path equals uuid), the set folding to one root by the merge, with both-sides inverse pairs encoded (migrate up and down, fresh and reset) and generators forward-only."
atomPath: "payload/command"
coordinate: "payload/command · 1/base · a2ad3752"
contentUuid: "05b27f2f-5fe0-5c0a-b66d-d9e7bece0da0"
diamondUuid: "ec9c1993-8e86-815a-a6b2-fce1d9e69081"
uuid: "a2ad3752-af65-8426-b48a-d36e2e77825c"
horo: 1
typography:
  partition: payload
  bondDegree: 62
standards:
  - "the Payload CLI (generate / migrate / jobs / run) · double-entry (every reversible command has its inverse)"
bindings: []
signatures:
  computationUuid: "1c9fbbf5-2196-890a-a3dd-729b991a2ff0"
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
      stageUuid: "6a33e524-0692-876f-8bd0-841a0f0c9be4"
    - stage: seal
      stageUuid: "026bea90-4792-8188-a0c7-cc79ca1d26f0"
    - stage: uuid
      stageUuid: "058257b3-4dae-8ee3-9751-f8e38724b5a3"
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
