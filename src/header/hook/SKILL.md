# header/hook — editing the header invalidates the pages that render it

`revalidateHeader` is the header's half of the same rule the footer keeps: a global that every page
renders must tell those pages when it changes, or the edit lands everywhere except where it is read.

Composes: [[law]].
