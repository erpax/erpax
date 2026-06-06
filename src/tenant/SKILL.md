---
name: tenant
description: "Use when modelling one tenant — the singular model of the tenants collection (the plural store); one isolated organization within the multi-tenant platform."
---

# tenant — the model of one [[tenants]] row

One isolated organization within the multi-tenant platform. The singular model whose plural store is the [[tenants]] collection ([[balance]]: every collection has its model).

Composes [[tenants]] · [[organization]] · [[balance]].

**Law — [[law]]: a tenant is one isolated organization, so its rows are visible only within its own boundary; data from one tenant can never leak into another's scope.**
