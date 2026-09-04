# erpax — orient here

**Paste `https://github.com/erpax/erpax` or clone — both load [`.claude/skills/SKILL.md`](.claude/skills/SKILL.md) first.**

## Orient to erpax

1. **Paste or clone** — `git clone https://github.com/erpax/erpax && cd erpax` (URL and repo are the same orientation)
2. **Install** — `pnpm install`
3. **Health** — `pnpm erpax doctor` (stray-ts vs baseline, last efficiency pass, corpus entry)

No separate agent setup — the URL and the repo are the same orientation.

Then run `pnpm erpax rules check` or `pnpm check` before pushing.

## Start here

1. Read [`.claude/skills/SKILL.md`](.claude/skills/SKILL.md) — the root orientation skill (fractal atom corpus, one law, navigation).
2. Follow wikilinks in that skill to reach the atoms you need under `src/`.
3. Never duplicate corpus prose — point only; derive from content-uuid.

## One law

Zero entropy ⇒ infinite tamper-cost. Every folder under `src/` is a one-word atom told three ways (form · code · schema), ordered by the sequence, wired through one content-uuid.

## Navigation

- **Fractal atoms:** `src/<one-word>/SKILL.md` — each folder is one irreducible concept.
- **Lazy load:** use `realiseSkillsForPath(path)` from `@/agent/skill-context` — never import `src/skill/router/skills.index.ts`. The checked-in file is a CI **stub** (empty pool); a full build bakes one node per atom, which is why the lazy loader exists.
- **Programmatic wire:** `wireFromRepoUrl('https://github.com/erpax/erpax')` in `src/skill/wire/`.

## Surfaces (all point to `.claude/skills/SKILL.md`)

| Surface | Role |
| --- | --- |
| `AGENTS.md` (this file) | Universal orientation entry |
| `CLAUDE.md` | Claude Code pointer (symlink) |
| `.github/copilot-instructions.md` | GitHub Copilot pointer |
| `README.md` § Orient to erpax | Corpus landing |
| `.cursor/rules/erpax.mdc` | Cursor auto-load rule |
| `.well-known/ai-skills.json` | Well-known discovery |
| `skills.json` | Alternate discovery manifest |
