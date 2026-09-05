# feature/registry — what a tier includes is one table, or it is many disagreeing answers

`FEATURE_REGISTRY` binds every gated capability to the tiers that include it. `featuresForTier`
and `featuresForCollection` answer from that one place, and `isCoreCollection` marks what no
tier may remove.

The registry is what lets the same corpus serve a freelancer and an enterprise without forking:
the collections do not change, only what this tenant may reach.

Composes: [[law]].
