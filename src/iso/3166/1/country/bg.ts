/**
 * Bulgaria (BG) — canonical country bundle. Default country (per
 * `DEFAULT_COUNTRY` in `src/config/regional-defaults.ts`) and the worked
 * example for the per-country merge pattern documented in `./types.ts`.
 *
 * Composed of (a) `COUNTRY_PROFILES.BG`, (b) `COUNTRY_SPECIFICS.BG`,
 * (c) `COUNTRY_APIS.BG`. Nothing here re-types those data points — change
 * the source registries and the bundle picks up the new shape automatically.
 *
 * Standards Bulgaria implements that drive this bundle:
 *
 *   - ISO-4217:2015 EUR (reporting currency, post-2026 changeover)
 *   - BCP-47 bg-BG (admin locale)
 *   - IFRS IAS-1 (statutory reporting framework)
 *   - BG-NSS (statutory chart of accounts — National Standards System)
 *   - ISO-13616 IBAN (bank-account format, 22-char BG IBAN)
 *   - EN-16931 + EU 2014/55 §B2G (e-invoicing mandate, eff. 2019-04-18)
 *   - VIES (cross-border VAT validation, EU)
 *   - PEPPOL-BIS-3 (e-invoicing transport, optional)
 *
 * @standard ISO-3166-1:2020 BG country-code
 * @standard ISO-4217:2015 EUR reporting-currency
 * @standard BCP-47 bg-BG locale
 * @standard ISO-13616-1:2020 iban BG-22
 * @standard EN-16931:2017 §B2G e-invoicing
 * @standard Peppol-BIS-3.0 billing optional
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @compliance EU 2014/55 b2g-e-invoicing-mandate
 * @audit ISO-19011:2018 audit-trail country-decision-evidence
 * @see ../types.ts
 * @see src/services/country-context.ts
 */

import { COUNTRY_PROFILES } from '@/config/regional-defaults';
import { COUNTRY_SPECIFICS } from '@/config/country-specifics';
import { COUNTRY_APIS, BANK_APIS } from '@/config/country-apis';
import type { CountryBundle } from './types';

const CODE = 'BG' as const;

export const BG_COUNTRY_BUNDLE: CountryBundle = {
  code: CODE,
  name: 'Bulgaria',
  profile: COUNTRY_PROFILES[CODE],
  specifics: COUNTRY_SPECIFICS[CODE] ?? null,
  apis: COUNTRY_APIS[CODE] ?? [],
  bankApis: BANK_APIS[CODE] ?? [],
  standards: [
    'ISO-3166-1:2020 BG',
    'ISO-4217:2015 EUR',
    'BCP-47 bg-BG',
    'IFRS IAS-1',
    'BG-NSS statutory chart of accounts',
    'ISO-13616-1:2020 iban BG-22',
    'EN-16931:2017 §B2G',
    'EU 2014/55 b2g-e-invoicing-mandate',
    'Peppol-BIS-3.0 billing',
    'VIES vat-validation',
    'PSD2 EU 2015/2366 ais-pis',
    'Berlin Group NextGenPSD2 v1.3',
    'BNB ASPSP register',
    'OECD SAF-T 2.0 (BG-SAF-T submission)',
  ],
};
