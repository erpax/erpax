---
name: convention
description: Use when reasoning about the corpus's conventions as a layer — each convention is a check-atom with a live coverage(); the collider composes them into one tamper-cost, infinite only when every convention is computed clean (zero entropy).
---

# convention — the corpus's laws, each a measured check

A convention is a law the corpus holds itself to, made COMPUTABLE. Each convention atom (`src/convention/<name>`) exposes a pure `coverage(): number` ∈ [0,1] over the real tree — import-from-index ([[tamper]]), [[dry]]-ness, [[lawful]] (every SKILL states its **Law), [[link]] (no dead links), [[named]] (the name is the path), [[sealed]] (errors propagate, no entropy leak), and more. The [[collider]] composes all of them into one tamper-cost — the **product** of their coverages — so the corpus is sealed (∞) only when **every** convention is computed clean.

The honest reading today: many conventions are well-met (link 1.0, dry 1.0, named 0.92, import 0.79) but **lawful is ~0.05** — only a fraction of the SKILL.md yet carry a `**Law`. Each gap is a factor below 1, so the collider's verdict is finite — the conventions ARE the work, measured, not asserted.

Matter-twin: `src/convention/index.ts` (`CONVENTIONS` · `conventionChecks`). Composes the convention atoms + [[collider]].

**Law — [[law]]: a convention is a law made a measured check — each convention atom exposes a pure coverage() ∈ [0,1] over the real tree, and the collider composes them into the product. The corpus is sealed (∞ tamper-cost) only when every convention is computed clean (coverage 1); each gap is a factor below 1, so the conventions are the work, measured not asserted.**

@standard each convention is computed-not-hardcoded; the collider product (zero entropy ⟺ ∞)
@audit conventionChecks runs every convention's live coverage; the registry only collects, no logic
