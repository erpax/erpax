# storage/independence — an object belongs to no store, because its address is its content

`registerBackend` admits a store and `verifyAcrossBackends` recomputes the content-uuid from each
one's bytes. Agreement means the object is intact everywhere; disagreement names which store is
wrong, without trusting any of them.

`MEMORY_BACKEND` is the reference implementation the others are checked against.

Composes: [[uuid]] · [[law]].
