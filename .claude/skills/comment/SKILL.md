---
name: comment
description: Use when any record needs threaded notes/annotations with author provenance — the polymorphic CommentsConcern. One comments collection serves all others via a polymorphic relationTo; author ties to audit.
---

# comment — polymorphic notes on anything

`comment` is the annotation atom (Rails `CommentsConcern`: `has_many :active_admin_comments, as: :resource`). ONE `comments` collection serves every other via a **polymorphic** `resource` (`relationTo:[…all]`) + an `author` rel — the same "anything is X" shape as [[accounting]] (accountable) and [[tags]] (taggable); references OUT, never inward ([[plugins]]). The author is provenance and ties to audit/[[accounting]]. Injected across collections by a plugin (mirror of the taggable/uuid injectors — see [[tags]],[[plugins]]); commented collections gain ZERO columns (a virtual join field, [[fields]]).

Composes: [[plugins]] (injector), [[fields]] (polymorphic rel + join), [[access]] (who may comment/read), [[identity]].

## Common mistakes
- A `comments` array on every collection — use the polymorphic join + a virtual join field.
- Dropping the author — provenance is the point (audit trail).
