---
name: cli
description: "Use when invoking operational gates from package.json — erpax routes readme, lint, test, rules, apply, and confirm without bloating scripts."
atomPath: cli
coordinate: cli · 7/descent · a1b2c3d4
contentUuid: "00000000-0000-5000-8000-000000000001"
diamondUuid: "00000000-0000-5000-8000-000000000002"
uuid: "a1b2c3d4-0000-4000-8000-000000000003"
horo: 7
bonds:
  in:
    - gate
    - confirm
    - rules
    - apply
  out:
    - gate
---

# cli

The minimal operational router (`pnpm erpax`, `pnpm check`). Matter lives in src atoms; package.json keeps lifecycle scripts only.

@see ./index.ts · ./registry.ts · ./gate.ts
