---
name: code
description: Use when master-data needs a unique short code — accounts, products, machines, teams, categories. The CodeConcern field-factory; code derived from name when absent; code is the human key, content-uuid the machine key.
sessions:
  - 776a49cb-8dfb-45ab-88ff-956e3b613adf
---

# code — the master-data human key

`code` is the coded-master-data atom (Rails `CodeConcern`: `set_code`, `find_or_create_by_code`): a [[fields]] field (position **1**) + a beforeChange [[hooks]]. Law: master-data carries a **unique `code`** scoped per tenant, derived from `name` when absent (initials/slug) in a beforeChange. The `code` is the human key; the content-`uuid` ([[identity]]) is the machine key — relate by uuid, display by code. Hierarchical codes (GL accounts' `/`-split tree) make the code itself the parent-address (see [[accounting]]).

Composes: [[fields]], [[hooks]], [[identity]], [[accounting]] (account-code tree).

## Common mistakes
- Relating by `code` instead of uuid (codes are editable/human; uuids federate).
- A global-unique code where it should be tenant-scoped.
