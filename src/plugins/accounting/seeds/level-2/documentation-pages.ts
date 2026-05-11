/**
 * Documentation pages seed — populates the default erpax site with a nested
 * documentation hub under the canonical Pages collection.
 *
 * Tree (parent → children, all under the root `home` page from
 * `MinimalPagesSeed` so the existing breadcrumb + nesting fixtures keep
 * working):
 *
 *   home
 *   └── platform                                    "Platform overview"
 *       ├── seed-architecture                       "Seed architecture & DRY cycle"
 *       ├── industry-templates                      "Industry templates (per-business)"
 *       ├── per-country-compliance                  "Per-country compliance"
 *       └── erp-workflows-evidence                  "ERP workflows & multimedia evidence"
 *
 * Every page uses the actual `cta` and `content` Payload blocks (no
 * bypasses) — same lexical rich-text + linkGroup shape the rest of the
 * site renders. The three-column `content` block layout matches the
 * existing marketing-page convention.
 *
 * @standard ECMA-262 ECMAScript-2024 baseline
 * @standard W3C HTML5 article-section-elements
 * @standard schema.org WebPage
 * @standard CommonMark 0.31 markdown-fallback
 * @standard ISO/IEC-29119:2022 software-testing test-fixture
 * @audit ISO-19011:2018 audit-trail documentation-evidence
 * @compliance WCAG-2.1 §1.3.1 info-and-relationships
 * @compliance WCAG-2.1 §2.4.6 headings-and-labels
 * @compliance SOX §404 internal-controls process-documentation
 * @see src/collections/Pages/index.ts
 * @see src/components/blocks/Content/config.ts
 * @see src/components/blocks/CallToAction/config.ts
 * @see src/plugins/accounting/seeds/level-1/minimal-accounting-seeds.ts
 */

import type { Payload } from 'payload';
import { TestSeedFactory, type SeedResult } from '@/testing';

// ─── Lexical rich-text helpers ───────────────────────────────────────────
//
// Build the minimal set of lexical nodes the Content + CallToAction blocks
// expect. Mirrors `src/utilities/remoteMediaImport.ts`'s `LexicalRootDoc`
// shape — keep these helpers in sync if Payload's lexical schema versions
// up. Helpers stay local to this seed because lexical is otherwise an
// editor concern; nothing else in `src/` builds raw lexical docs.

const text = (value: string): Record<string, unknown> => ({
  type: 'text',
  text: value,
  format: 0,
  detail: 0,
  mode: 'normal',
  style: '',
  version: 1,
});

const heading = (level: 'h2' | 'h3' | 'h4', value: string): Record<string, unknown> => ({
  type: 'heading',
  tag: level,
  format: '',
  indent: 0,
  direction: 'ltr',
  version: 1,
  children: [text(value)],
});

const paragraph = (value: string): Record<string, unknown> => ({
  type: 'paragraph',
  format: '',
  indent: 0,
  direction: 'ltr',
  version: 1,
  textFormat: 0,
  children: [text(value)],
});

const bulletList = (items: ReadonlyArray<string>): Record<string, unknown> => ({
  type: 'list',
  listType: 'bullet',
  start: 1,
  tag: 'ul',
  format: '',
  indent: 0,
  direction: 'ltr',
  version: 1,
  children: items.map((item, idx) => ({
    type: 'listitem',
    value: idx + 1,
    format: '',
    indent: 0,
    direction: 'ltr',
    version: 1,
    children: [text(item)],
  })),
});

const lexicalDoc = (
  ...nodes: ReadonlyArray<Record<string, unknown>>
): Record<string, unknown> => ({
  root: {
    type: 'root',
    format: '',
    indent: 0,
    direction: 'ltr',
    version: 1,
    children: nodes,
  },
});

// ─── Content-block builders (canonical Payload `content` block shape) ────

interface ColumnSpec {
  /** Column width — matches the `Content/config.ts` `size` enum. */
  readonly size: 'oneThird' | 'half' | 'twoThirds' | 'full';
  /** Pre-built lexical document for the column. */
  readonly richText: Record<string, unknown>;
}

const contentBlock = (
  columns: ReadonlyArray<ColumnSpec>,
): Record<string, unknown> => ({
  blockType: 'content',
  columns: columns.map((col) => ({
    size: col.size,
    richText: col.richText,
    enableLink: false,
  })),
});

const ctaBlock = (
  richText: Record<string, unknown>,
  links: ReadonlyArray<{ label: string; url: string; appearance?: 'default' | 'outline' }> = [],
): Record<string, unknown> => ({
  blockType: 'cta',
  richText,
  links: links.map((l) => ({
    link: {
      type: 'custom',
      url: l.url,
      label: l.label,
      newTab: false,
      appearance: l.appearance ?? 'default',
    },
  })),
});

// ─── Page fixtures ───────────────────────────────────────────────────────
//
// Each fixture declares (slug, title, parent slug, layout blocks). Layout
// uses the same Payload `cta` + `content` blocks the marketing template
// renders — no parallel rendering path.

interface DocPageFixture {
  readonly slug: string;
  readonly title: string;
  readonly parentSlug: string;
  readonly layout: ReadonlyArray<Record<string, unknown>>;
}

const PLATFORM_OVERVIEW: DocPageFixture = {
  slug: 'platform',
  title: 'Platform overview',
  parentSlug: 'home',
  layout: [
    ctaBlock(
      lexicalDoc(
        heading('h2', 'erpax — accounting + ERP, standards-first'),
        paragraph(
          'erpax bundles the IFRS/GAAP-aligned ledger with the operational ERP cycles (O2C, P2P, R2R) ' +
          'that produce its rows. Every collection is wired to a per-country compliance posture; every ' +
          'workflow has a multimedia evidence pack documenting the UX. Pick a section below to drill in.',
        ),
      ),
      [
        { label: 'Seed architecture', url: '/platform/seed-architecture' },
        { label: 'View evidence pack', url: '/evidence/_report/', appearance: 'outline' },
      ],
    ),
    contentBlock([
      {
        size: 'half',
        richText: lexicalDoc(
          heading('h3', 'What lives under this hub'),
          bulletList([
            'Seed architecture & DRY cycle — how validation, lifecycle, and cleanup are centralised',
            'Industry templates — per-business charts of accounts (SaaS, Retail, Service, Manufacturing)',
            'Per-country compliance — country bundles that drive currency, statutory CoA, e-invoicing mandates, and official APIs',
            'ERP workflows & evidence — Order-to-Cash, Procure-to-Pay, Record-to-Report walk-throughs with video + screenshots',
          ]),
        ),
      },
      {
        size: 'half',
        richText: lexicalDoc(
          heading('h3', 'Standards trail'),
          paragraph(
            'Every code surface in erpax carries JSDoc citations (@standard / @compliance / @audit) so ' +
            'docs/STANDARDS_INDEX.md gives auditors a single grep target. SOX §404 / ISO-19011 walk-throughs ' +
            'trace each control back to the rule it implements.',
          ),
        ),
      },
    ]),
  ],
};

const SEED_ARCHITECTURE: DocPageFixture = {
  slug: 'seed-architecture',
  title: 'Seed architecture & DRY cycle',
  parentSlug: 'platform',
  layout: [
    ctaBlock(
      lexicalDoc(
        heading('h2', 'One source of truth for every fixture'),
        paragraph(
          'TestSeedFactory.runSeedLifecycle holds the createContext / hooks / SeedResult skeleton that ' +
          'every Level-1, Level-2, and Level-3 seed inherits. SEED_VALIDATION_REGISTRY holds the ' +
          'per-collection required-field + domain-rule + cross-field-invariant contract. ' +
          'mergeChildContext aggregates child-seed createdIds for unified cleanup.',
        ),
      ),
      [{ label: 'Coverage report', url: '/platform/seed-architecture#coverage' }],
    ),
    contentBlock([
      {
        size: 'twoThirds',
        richText: lexicalDoc(
          heading('h3', 'The DRY cycle (auto-policed)'),
          paragraph(
            'tests/standards/coverage/seed-test-coverage.int.spec.ts is a meta-test that fails when:',
          ),
          bulletList([
            'A SEED_VALIDATION_REGISTRY entry has no spec pinning its `<Label>: <field> is required` contract — silent compliance hole',
            'Two specs duplicate the same `<Label>: <field>` assertion — drift latency (when the rule changes only one is updated)',
            'A spec is missing its JSDoc citation banner (@standard / @compliance / @audit / @accounting / @security / @rfc)',
          ]),
          paragraph(
            'pnpm seeds:coverage prints the same matrix as a markdown table for human review without ' +
            'failing — pluggable into pre-commit hooks or CI status reports.',
          ),
        ),
      },
      {
        size: 'oneThird',
        richText: lexicalDoc(
          heading('h4', 'Surface'),
          bulletList([
            'src/testing/test-seed-factory.ts',
            'src/plugins/accounting/seeds/level-{1,2,3}/',
            'src/plugins/accounting/seeds/templates/',
            'tests/standards/coverage/',
          ]),
        ),
      },
    ]),
  ],
};

const INDUSTRY_TEMPLATES: DocPageFixture = {
  slug: 'industry-templates',
  title: 'Industry templates (per-business)',
  parentSlug: 'platform',
  layout: [
    ctaBlock(
      lexicalDoc(
        heading('h2', 'Five vertical templates, one shape'),
        paragraph(
          'IndustryTemplate is a typed bundle of (tenant defaults, country compliance posture, chart of ' +
          'accounts, optional sample transactions). Templates live under one registry; getIndustryTemplate ' +
          'and findTemplateByCountry are the canonical lookups.',
        ),
      ),
    ),
    contentBlock([
      {
        size: 'half',
        richText: lexicalDoc(
          heading('h3', 'Coverage'),
          bulletList([
            'IFRS Minimum (BG) — IAS-1 §54 baseline, derived from BG_COUNTRY_BUNDLE',
            'IFRS SaaS (US) — Deferred Revenue, R&D, S&M (IFRS-15)',
            'IFRS Retail (DE) — IAS-2 inventory + sales tax + ZUGFeRD/XRechnung mandate',
            'IFRS Service (GB) — WIP, time clearing, IFRS-15 progress billing',
            'IFRS Manufacturing (US) — RM/WIP/FG split + manufacturing overhead (IAS-2 §10)',
          ]),
        ),
      },
      {
        size: 'half',
        richText: lexicalDoc(
          heading('h3', 'Adding a vertical'),
          paragraph(
            'Drop a new IndustryTemplate into src/plugins/accounting/seeds/templates/templates.ts with the ' +
            'same shape: tenant defaults, compliance posture (typically derived from a CountryBundle), and ' +
            'chart of accounts that covers all five IAS-1 §54 element types. The templates spec ' +
            '(tests/standards/templates/templates.int.spec.ts) auto-extends to assert the new template ' +
            'has unique account numbers, valid ISO codes, and sample-transaction account-name references.',
          ),
        ),
      },
    ]),
  ],
};

const PER_COUNTRY_COMPLIANCE: DocPageFixture = {
  slug: 'per-country-compliance',
  title: 'Per-country compliance',
  parentSlug: 'platform',
  layout: [
    ctaBlock(
      lexicalDoc(
        heading('h2', 'Country bundles drive everything country-aware'),
        paragraph(
          'CountryBundle merges COUNTRY_PROFILES (currency / locale / accounting framework), ' +
          'COUNTRY_SPECIFICS (fiscal year / statutory chart / e-invoicing mandate / VAT format), and ' +
          'COUNTRY_APIS (official endpoints) into one typed view. resolveTenantCompliance(tenant) reads ' +
          'tenant.country and returns the canonical compliance posture for that tenant.',
        ),
      ),
    ),
    contentBlock([
      {
        size: 'twoThirds',
        richText: lexicalDoc(
          heading('h3', 'Default country: BG'),
          paragraph(
            'src/standards/iso-3166-1/countries/bg.ts is the worked example. Every other country follows ' +
            'the same pattern — pull from COUNTRY_PROFILES, COUNTRY_SPECIFICS, COUNTRY_APIS without ' +
            're-typing the values. tests/standards/iso-3166-1/countries/bg.int.spec.ts pins the merge ' +
            'with object-identity assertions so registry drift fails the suite.',
          ),
          heading('h3', 'Tenant overrides win'),
          paragraph(
            'A tenant can override reportingCurrency or accountingStandard via tenant.config.* without ' +
            'forking the country profile — resolveTenantCompliance honors the override before falling ' +
            'back to the bundle default.',
          ),
        ),
      },
      {
        size: 'oneThird',
        richText: lexicalDoc(
          heading('h4', 'Curated countries'),
          bulletList([
            'BG — IFRS / EUR / BG-NSS / EU 2014/55 §B2G',
            'DE — IFRS / EUR / SKR-04 / ZUGFeRD',
            'US — IFRS / USD',
            'GB — IFRS / GBP / fiscal year start April',
          ]),
        ),
      },
    ]),
  ],
};

const ERP_WORKFLOWS_EVIDENCE: DocPageFixture = {
  slug: 'erp-workflows-evidence',
  title: 'ERP workflows & multimedia evidence',
  parentSlug: 'platform',
  layout: [
    ctaBlock(
      lexicalDoc(
        heading('h2', 'Walk-throughs that double as audit evidence'),
        paragraph(
          'Three Playwright specs walk Order-to-Cash, Procure-to-Pay, and Record-to-Report end-to-end ' +
          'through the admin UI. Each step captures a labelled PNG; each test produces video + trace. ' +
          'Output lives under public/evidence/ so the deployed Worker serves it as a static URL — ' +
          'shareable links for stakeholders without a local checkout.',
        ),
      ),
      [
        { label: 'Open evidence report', url: '/evidence/_report/' },
        { label: 'O2C walk-through', url: '/evidence/workflows/order-to-cash/', appearance: 'outline' },
      ],
    ),
    contentBlock([
      {
        size: 'half',
        richText: lexicalDoc(
          heading('h3', 'UX gap recording'),
          paragraph(
            'recordUxGap(testInfo, workflow, step, severity, message) flags missing affordances during the ' +
            'walk-through without failing the test. Severities: info, minor, major, blocker. Annotations ' +
            'show up grouped in the Playwright HTML report for batch review.',
          ),
        ),
      },
      {
        size: 'half',
        richText: lexicalDoc(
          heading('h3', 'Resilient capture'),
          paragraph(
            'safeCaptureRoute(page, testInfo, workflow, step, route, description) navigates, waits for ' +
            '<main>, captures a PNG. 404s and admin error states record a gap:blocker annotation instead ' +
            'of throwing — the walk-through continues so subsequent steps still produce evidence.',
          ),
        ),
      },
    ]),
  ],
};

export const DOCUMENTATION_PAGES_DATA: ReadonlyArray<DocPageFixture> = [
  PLATFORM_OVERVIEW,
  SEED_ARCHITECTURE,
  INDUSTRY_TEMPLATES,
  PER_COUNTRY_COMPLIANCE,
  ERP_WORKFLOWS_EVIDENCE,
];

// ─── Seed ────────────────────────────────────────────────────────────────

/**
 * Build the documentation page tree. Requires `MinimalPagesSeed` (or any
 * seed that creates a `home` page with slug `'home'`) to have run first —
 * the platform-overview page references `home` as its parent.
 *
 * Pages are inserted in dependency order (the static `DOCUMENTATION_PAGES_DATA`
 * array is already topologically sorted: parents before children). Cleanup
 * walks `createdIds` in reverse so children are deleted before parents.
 */
export class DocumentationPagesSeed extends TestSeedFactory {
  constructor(payload: Payload, private readonly tenantId: string) {
    super(payload);
  }

  async seed(): Promise<SeedResult> {
    return this.runSeedLifecycle('integration', async () => {
      const publishedAt = new Date().toISOString();
      const created = new Map<string, { id: string; title: string; slug: string }>();

      // Resolve `home` from existing pages (created by MinimalPagesSeed).
      const homeQuery = await this.queryDocuments('pages', {
        slug: { equals: 'home' },
        tenant: { equals: this.tenantId },
      });
      const homeDoc = homeQuery.docs?.[0] as
        | { id: string; title?: string; slug?: string }
        | undefined;
      if (!homeDoc) {
        throw new Error(
          'DocumentationPagesSeed: `home` page not found. Run MinimalPagesSeed first.',
        );
      }
      created.set('home', { id: homeDoc.id, title: homeDoc.title ?? 'Home', slug: 'home' });

      for (const fixture of DOCUMENTATION_PAGES_DATA) {
        const parent = created.get(fixture.parentSlug);
        if (!parent) {
          throw new Error(
            `DocumentationPagesSeed: parent '${fixture.parentSlug}' not yet created (fixture order violates dependency)`,
          );
        }

        // Build the breadcrumb chain from root down to (but not including) self.
        const ancestors: Array<{ id: string; title: string; slug: string }> = [];
        let cursor: string | null = fixture.parentSlug;
        while (cursor) {
          const node = created.get(cursor);
          if (!node) break;
          ancestors.unshift(node);
          const cursorFixture = DOCUMENTATION_PAGES_DATA.find((f) => f.slug === cursor);
          cursor = cursorFixture?.parentSlug ?? (cursor === 'home' ? null : 'home');
        }

        const selfPlaceholder = { id: 'pending', title: fixture.title, slug: fixture.slug };
        const chain = [...ancestors, selfPlaceholder];
        const breadcrumbs = chain.map((node, idx) => ({
          doc: node.id,
          title: node.title,
          url: '/' + chain.slice(0, idx + 1).map((n) => n.slug).join('/'),
        }));

        const doc = await this.createDocument('pages', {
          tenant: this.tenantId,
          title: fixture.title,
          slug: fixture.slug,
          parent: parent.id,
          layout: fixture.layout,
          breadcrumbs,
          _status: 'published',
          publishedAt,
        });

        created.set(fixture.slug, { id: doc.id, title: fixture.title, slug: fixture.slug });
      }
    });
  }
}
