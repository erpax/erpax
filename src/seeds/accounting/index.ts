/**
 * Accounting Plugin Seeds — leveled fixture barrel for accounting tests.
 *
 * Layout:
 *   - `templates/`  — country/industry templates + compliance resolver
 *                     (single source of truth for chart of accounts +
 *                     tenant defaults; resolves country → official APIs +
 *                     accounting standard via `country-context`)
 *   - `level-1/`    — unit fixtures (<500ms) — hosts, gl-accounts, users,
 *                     currency rates, three-level page nest
 *   - `level-2/`    — integration fixtures (~2-5s) — journal entries,
 *                     accounting cycles, fx, role-scoped access
 *   - `level-3/`    — e2e fixtures (~5-15s) — full cycles, multi-entity
 *                     consolidation, real-world edge cases
 *   - `demo/`       — interactive walk-throughs
 *
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @standard ISO-3166-1:2020 country-codes alpha-2
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time
 * @audit ISO-19011:2018 audit-trail seed-evidence
 * @see docs/STANDARDS.md §4.2
 * @see ./templates
 */

export * from './templates';
export * from './level-1';
export * from './level-2';
export * from './level-3';
