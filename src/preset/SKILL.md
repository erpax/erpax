---
name: preset
description: "Use when a merged collection still needs the separate lists its parts had — a query preset is a seed row (title, filter, columns) over one collection, built by preset() and loaded idempotently by loadPresets(), so a list is data rather than a table."
---

# preset — a list is a row, not a table

Merging two collections is right when they are one thing seen two ways, and it costs the operator
exactly one thing: the two lists. A query preset returns them. It is a row in Payload's own
presets collection — a title, a filter, the columns to show — bound to a single collection.

`preset()` builds that row; `loadPresets()` writes the ones that are not there yet. A preset is
identified by its title and its collection, so loading again creates nothing, and a preset an
operator has since adjusted is left as they have it.

This is the one address for both, because every merge needs the same two functions and a private
copy in each merged atom is the duplication [[rules]]/copy measures.

**Honest boundary.** A preset is the admin's list view: a filter, columns, a sort. It does not
total anything, and an API caller applies the same filter itself. It does not constrain what a
relationship may point at either — a preset named Vendors does not stop a field from referencing a
party that is only a customer.

**Law — [[law]]: a point of view is a saved filter. A table is for a different shape; a list of the
same shape, seen differently, is a row.**

Composes: [[parties]] · [[rules]]/copy · [[seed]] · [[law]].
