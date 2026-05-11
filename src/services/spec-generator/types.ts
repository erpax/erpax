/**
 * Spec-generator types — the canonical shape of a parsed JSDoc spec.
 *
 * Slice CCCCC (2026-05-11): each collection's leading JSDoc banner IS
 * the spec. The extractor parses every supported tag and yields a
 * `CollectionSpec`. Downstream generators (chain-registry, feature-
 * registry, seed file, test file, marketing page, README, admin-UI
 * description, PDF/A audit-evidence) all consume that shape — and only
 * that shape — so anything that exists on disk has a single
 * upstream source.
 *
 * @standard ISO/IEC 25010:2023 §5 modularity
 * @standard ISO/IEC 12207 software-life-cycle
 */

/** Standards citation: `@standard <body> <id> <description>`. */
export interface SpecStandard {
  /** Issuing body — IFRS / IAS / US-GAAP / SOX / ISO / NIST / EN / RFC / GDPR / OECD / etc. */
  readonly body: string
  /** Standard id — e.g. `IAS-12 §15`, `IFRS-15 §B77-B78`, `ISO-19011:2018 §6.4.6`. */
  readonly id: string
  /** Optional free-text description. */
  readonly description?: string
}

/** Chain-step binding: `@chain <CHAIN_ID> step <N>-of-<M>`. */
export interface SpecChainStep {
  readonly chainId: string
  readonly stepIndex: number
  readonly totalSteps: number
  /** Optional human note (e.g. "after consignment:on-hand, before invoice:activated"). */
  readonly note?: string
}

/** Feature-gate binding: `@feature <id> — <label>`. */
export interface SpecFeature {
  readonly id: string
  readonly label?: string
  readonly tier?: 'free' | 'solo' | 'team' | 'business' | 'enterprise'
}

/** Role binding: `@role <roleId> — <write|read>`. */
export interface SpecRole {
  readonly roleId: string
  readonly access: 'read' | 'write'
}

/** Emitted domain event: `@emits <eventId> — <payloadDescription>`. */
export interface SpecEmit {
  readonly eventId: string
  readonly payloadDescription?: string
}

/** Subscribed domain event: `@subscribes <eventId>`. */
export interface SpecSubscribe {
  readonly eventId: string
}

/**
 * Worked-example payload for a chain step:
 * `@example <chainId> / step <N>-of-<M>`
 * ```json
 * { ... }
 * ```
 *
 * Placeholders supported: `{{ctx.tenantId}}`, `{{state.invoiceId}}`,
 * `{{now}}`, `{{now+30d}}`, `{{ts}}`, `{{const.X}}`.
 */
export interface SpecExample {
  readonly chainId: string
  readonly stepIndex: number
  readonly totalSteps: number
  /** Raw JSON payload (placeholders preserved verbatim until chain-runner resolves them). */
  readonly payload: Record<string, unknown>
}

/**
 * Test-assertion invariant: `@invariant <natural-language predicate>` OR
 * fenced ts code block with raw `expect()` calls.
 */
export interface SpecInvariant {
  readonly form: 'predicate' | 'ts'
  /** Natural-language predicate (when form = 'predicate'). */
  readonly predicate?: string
  /** Raw ts code (when form = 'ts'), pasted verbatim into the generated test body. */
  readonly tsCode?: string
}

/** Use-case bullet (rotating headline / marketing): `@useCase <markdown>`. */
export interface SpecUseCase { readonly markdown: string }

/** Marketing summary (rotating headline): `@summary "<text>"`. */
export interface SpecSummary { readonly text: string }

/** Slice attribution: `@slice <sliceId>`. */
export interface SpecSlice { readonly sliceId: string }

/** Cron schedule: `@cron <rfc-5545 cron expression>`. */
export interface SpecCron { readonly cron: string }

/** `@see <relative-path-or-url>` cross-reference. */
export interface SpecSee { readonly target: string }

/**
 * Full parsed spec for one collection. Everything below the banner
 * heading is kept as the rich-Markdown `description` (Lexical-renderable;
 * see CCCCC memory note for the supported feature surface).
 */
export interface CollectionSpec {
  /** Collection slug (e.g. `consignment-arrangements`). */
  readonly slug: string
  /** File path the spec was parsed from (relative to repo root). */
  readonly filePath: string
  /** Banner H1 if present, else first line of the banner. */
  readonly title: string
  /** Full rich-Markdown description (everything in the banner that's not a tag). */
  readonly description: string

  readonly standards: ReadonlyArray<SpecStandard>
  readonly chainSteps: ReadonlyArray<SpecChainStep>
  readonly features: ReadonlyArray<SpecFeature>
  readonly roles: ReadonlyArray<SpecRole>
  readonly emits: ReadonlyArray<SpecEmit>
  readonly subscribes: ReadonlyArray<SpecSubscribe>
  readonly examples: ReadonlyArray<SpecExample>
  readonly invariants: ReadonlyArray<SpecInvariant>
  readonly useCases: ReadonlyArray<SpecUseCase>
  readonly summaries: ReadonlyArray<SpecSummary>
  readonly slices: ReadonlyArray<SpecSlice>
  readonly crons: ReadonlyArray<SpecCron>
  readonly sees: ReadonlyArray<SpecSee>
}

/** Result of running the extractor over the whole repo. */
export interface SpecCorpus {
  readonly collections: ReadonlyArray<CollectionSpec>
  readonly extractedAt: Date
}
