---
name: command
description: "Use when reasoning about the Payload CLI command set folded into the corpus — each command a name (name equals path equals uuid), the set folding to one root by the merge, with both-sides inverse pairs encoded (migrate up and down, fresh and reset) and generators forward-only."
atomPath: payload/command
coordinate: payload/command · 1/base · abe67c5b
contentUuid: "946be9f1-9048-517c-91a8-42025330c679"
diamondUuid: "d1fd55ce-f303-84ec-a9af-8d85f5de7cc5"
uuid: "abe67c5b-784d-878c-8bc4-539e36fc8b69"
horo: 1
bonds:
  in:
    - answer
    - collapse
    - concatenate
    - dry
    - generate
    - law
    - merge
    - migrate
    - payload
    - question
    - relocate
    - self
    - sequence
    - society
    - step
    - train
    - workflow
  out:
    - answer
    - collapse
    - concatenate
    - dry
    - generate
    - law
    - merge
    - migrate
    - question
    - relocate
    - self
    - sequence
    - society
    - step
    - train
    - workflow
typography:
  partition: payload
  bondDegree: 59
  neighbors: []
standards:
  - "UBL-2.1"
  - "the Payload CLI (generate / migrate / jobs / run) · double-entry (every reversible command has its inverse)"
  - "the command list is the installed CLI's; each uuid and the fold are computed"
  - "the command list is the installed CLI's; each uuid and the fold are computed, never assumed"
bindings: []
neighbors:
  wikilink:
    - deploy
    - karma
    - law
    - merge
    - name
    - payload
    - uuid
  matrix:
    - answer
    - collapse
    - concatenate
    - dry
    - generate
    - law
    - merge
    - migrate
    - question
    - relocate
    - self
    - sequence
    - society
    - step
    - train
    - workflow
  backlinks:
    - answer
    - collapse
    - concatenate
    - dry
    - generate
    - law
    - merge
    - migrate
    - question
    - relocate
    - self
    - sequence
    - society
    - step
    - train
    - workflow
signatures:
  computationUuid: "b259b1bb-b958-84ec-bf9d-b8c76a4e0edb"
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
      stageUuid: "1387f2a5-02a6-85c2-90d7-c8b6776a48dc"
    - stage: seal
      stageUuid: "40937d28-15e1-896d-ad47-68a193ce7b4d"
    - stage: uuid
      stageUuid: "98fbedb1-f237-89e5-ba61-2d4b2c11cb64"
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
