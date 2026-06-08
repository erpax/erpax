/**
 * Per-country canonical bundles barrel.
 *
 * @standard ISO-3166-1:2020 country-codes alpha-2
 * @audit ISO-19011:2018 audit-trail country-decision-evidence
 * @see ./types.ts
 * @see ./bg.ts
 */

export type { CountryBundle } from './types';
export { BG_COUNTRY_BUNDLE } from './bg';

import { BG_COUNTRY_BUNDLE } from './bg';
import type { CountryBundle } from './types';

/**
 * Registry of every curated `CountryBundle`. Add a new country by importing
 * its bundle module here. The default country (`BG`) anchors the list per
 * `DEFAULT_COUNTRY` in `src/config/regional-defaults.ts`.
 */
export const COUNTRY_BUNDLES: Readonly<Record<string, CountryBundle>> = {
  BG: BG_COUNTRY_BUNDLE,
};

/**
 * Look up a curated `CountryBundle` by ISO-3166-1 alpha-2 code.
 * Returns `null` when the country isn't curated — callers should fall back
 * to the live `resolveCountryContext` for dynamic derivation.
 */
export function getCountryBundle(code: string): CountryBundle | null {
  return COUNTRY_BUNDLES[code] ?? null;
}
