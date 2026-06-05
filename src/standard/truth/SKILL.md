---
name: truth
description: Use when enforcing that @standard / @compliance banners are true rather than decoration — the computed required-witness lint that fails a cited concept with no field and an enforcement claim with no guard.
---

# truth

Banner-truth — the required-witness law for [[standard]] / [[standards]] citations. A banner is a **claim**; under "all computed for infinite tampering cost" a claim with no computed witness is a tamperable lie (decoration).

`index.ts` derives the unwitnessed banners from the live tree, clause-specific:
- **concept** — a banner naming a concrete data concept (e.g. `biometric`) with no matching field / enum (org-posture standards like SOX · GDPR · ISO-27001 are witnessed by [[audit]]/[[access]] infra, not a field — stoplisted).
- **enforcement** — a `MUST` / `immutable` / "driven by `field`" sentence whose cited field never appears inside a `beforeChange` / `beforeValidate` / `access` guard (a bare declaration + `admin.description` is not a witness).

Decoration → 0 drives tamper-cost → ∞ as the self-building matrix adds witnesses ([[proof]] · [[tamper]] · [[merge]]). The gate ratchets and is pinned against the two audit-verified decorations so it cannot regress to noise.

@standard ISO-19011:2018 §6.4.6 audit-evidence
@audit the banner law is computed from the live tree, never hand-maintained
