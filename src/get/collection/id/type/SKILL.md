# get/collection/id/type — ask the running config what shape an id is

A Payload id is a number in Postgres and a string in Mongo, and a collection may override the
database-wide default with `customIDType`. So the shape of `id` is not knowable from the schema
alone — it is a property of **this collection in this deployment**.

That makes it exactly the wrong thing to hardcode. Code that assumes `number` builds a query that
silently matches nothing against a text id: no error, no exception, an empty result set that reads
as "not found". The failure surfaces as missing data, which is the hardest kind to trace back to its
cause.

So this asks the live instance: the collection's own override if it declares one, otherwise the
adapter's default. The fallback order is the claim, and it is the part a reader must be able to
check.

**Honest boundary.** This reports what the config says. It does not coerce a value, and it does not
guarantee the caller uses the answer — a caller that reads the type and then casts anyway is beyond
what any lookup can prevent.

**Law — [[law]]: the shape of an identifier belongs to the running configuration, not to the code
that queries it. Assuming one produces a query that matches nothing and reports it as absence.**

Composes: `get` · [[law]].
