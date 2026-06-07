---
name: fronted
description: Use when checking whether every atom has a front door — the computed convention that each SKILL.md carries valid name and description frontmatter, measured live as coverage = fronted / total over the real corpus tree.
---

# convention/fronted — every SKILL.md has valid name + description frontmatter

The fronted convention, written as a self-measuring atom. The frontmatter is the atom's front door — `name` is its identity (the slug the router speaks) and `description` is its "Use when…" trigger (how an agent decides to read it). A SKILL.md missing either field has no front: it cannot be addressed by name nor selected by intent, so it is invisible to the router and the agent alike. This convention closes that gap — every atom's frontmatter carries BOTH a `name:` line and a `description:` line ([[law]]).

It does not re-walk the filesystem nor re-parse the frontmatter from scratch — that would duplicate the corpus walker and double-count the `.claude → src` symlink (a raw `find -L` reports the tree twice). It **composes** the one canonical walk:

- **total** = `loadCorpus().length` from the [[akashic]] record — every routable atom, the deduped corpus (each real node enumerated once by realpath, the symlink collapsed).
- **fronted** = the atoms whose frontmatter block has BOTH `name:` and `description:`. The measurement reads the actual `---…---` head from the raw body — the same slice `loadCorpus` itself uses — because `loadCorpus` falls the name back to the leaf folder word, so the parsed `name` can never witness a missing `name:` line; only the raw block can.
- **coverage** = `fronted / total` — in [0,1] by construction (0 ≤ fronted ≤ total, total > 0). It reaches **1** exactly when every atom has a valid front.

Pure math, no default: the corpus is non-empty by architecture (a tree of SKILL.md by construction), and fronted is a subset count, so the ratio never needs a clamp or a fallback. The only thing that pulls coverage below 1 is a SKILL.md missing its `name:` or `description:` line — precisely what this convention forbids. coverage → 1 ⟺ every atom is addressable-by-name and selectable-by-trigger ⟺ the convention holds with zero entropy and infinitely-expanding tamper-[[cost]] ([[law]] · [[collapse]] · [[merge]]).

Entangled with — [[law]] · [[akashic]] · [[named]] · [[lawful]] · [[complete]] · [[exported]] (an atom has two public faces — its frontmatter front door, audited here, and its index code-surface, audited by [[exported]])

Matter-twin: [[named]] — the sibling that audits the leaf-word slug; fronted audits the frontmatter the slug must agree with (the front door, the same atom seen from the file head).

@standard schema.org — the type vocabulary, collided to single words

**Law — [[law]]: every atom carries valid name + description frontmatter — a SKILL.md missing either field has no front door, addressable by neither name nor intent; the corpus is fronted iff coverage = fronted / total = 1, and any frontless atom is a gap driving tamper-cost below infinity.**
