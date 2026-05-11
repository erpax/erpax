/**
 * GHG Protocol — Scope 1/2/3 emission category taxonomy.
 *
 * Greenhouse Gas Protocol Corporate Standard (revised 2015) + Scope 2
 * Guidance (2015) + Scope 3 Standard (2011). The 22 sub-categories
 * (4 Scope 1 + 3 Scope 2 + 15 Scope 3) are the canonical disaggregation
 * the carbon-emissions register groups by.
 *
 * @standard GHG Protocol Corporate Standard (revised 2015)
 * @standard GHG Protocol Scope 2 Guidance (2015)
 * @standard GHG Protocol Scope 3 Standard (2011)
 * @standard ISO 14064-1:2018 organisation-level-ghg-quantification
 * @standard EU ESRS E1 §44-50 ghg-emissions-disclosure (companion)
 * @standard IFRS S2 §29-32 climate-related-metrics (companion)
 */

/** Top-level scopes. */
export const GHG_SCOPES = ['scope_1', 'scope_2', 'scope_3', 'biogenic'] as const
export type GhgScope = (typeof GHG_SCOPES)[number]

export const GHG_SCOPE_LABEL: Readonly<Record<GhgScope, string>> = {
  scope_1:  'Scope 1 — Direct (combustion, fugitive)',
  scope_2:  'Scope 2 — Indirect Energy (purchased electricity / heat / steam / cooling)',
  scope_3:  'Scope 3 — Value Chain (upstream + downstream)',
  biogenic: 'Biogenic CO2 (reported separately, ESRS E1 §52)',
}
export const GHG_SCOPE_OPTIONS: ReadonlyArray<{ label: string; value: GhgScope }> =
  GHG_SCOPES.map((value) => ({ label: GHG_SCOPE_LABEL[value], value }))

/** Per-scope sub-category enumeration — 22 categories total. */
export const GHG_CATEGORIES = [
  // Scope 1
  's1_stationary', 's1_mobile', 's1_process', 's1_fugitive',
  // Scope 2 (location-based vs market-based per Scope 2 Guidance §6.4)
  's2_electricity_location', 's2_electricity_market', 's2_heat_steam_cooling',
  // Scope 3 — 15 GHG Protocol categories
  's3_1_purchased_goods', 's3_2_capital_goods', 's3_3_fuel_energy',
  's3_4_upstream_transport', 's3_5_waste', 's3_6_business_travel',
  's3_7_commuting', 's3_8_upstream_leased', 's3_9_downstream_transport',
  's3_10_processing', 's3_11_use_of_sold', 's3_12_eol',
  's3_13_downstream_leased', 's3_14_franchises', 's3_15_investments',
] as const
export type GhgCategory = (typeof GHG_CATEGORIES)[number]

export const GHG_CATEGORY_LABEL: Readonly<Record<GhgCategory, string>> = {
  s1_stationary:           'S1 — Stationary combustion',
  s1_mobile:               'S1 — Mobile combustion',
  s1_process:              'S1 — Process emissions',
  s1_fugitive:             'S1 — Fugitive (refrigerants, SF6)',
  s2_electricity_location: 'S2 — Purchased electricity (location-based)',
  s2_electricity_market:   'S2 — Purchased electricity (market-based)',
  s2_heat_steam_cooling:   'S2 — Purchased heat / steam / cooling',
  s3_1_purchased_goods:    'S3.1 — Purchased goods & services',
  s3_2_capital_goods:      'S3.2 — Capital goods',
  s3_3_fuel_energy:        'S3.3 — Fuel- and energy-related (not in S1/S2)',
  s3_4_upstream_transport: 'S3.4 — Upstream transportation & distribution',
  s3_5_waste:              'S3.5 — Waste generated in operations',
  s3_6_business_travel:    'S3.6 — Business travel',
  s3_7_commuting:          'S3.7 — Employee commuting',
  s3_8_upstream_leased:    'S3.8 — Upstream leased assets',
  s3_9_downstream_transport: 'S3.9 — Downstream transportation & distribution',
  s3_10_processing:        'S3.10 — Processing of sold products',
  s3_11_use_of_sold:       'S3.11 — Use of sold products',
  s3_12_eol:               'S3.12 — End-of-life of sold products',
  s3_13_downstream_leased: 'S3.13 — Downstream leased assets',
  s3_14_franchises:        'S3.14 — Franchises',
  s3_15_investments:       'S3.15 — Investments',
}

export const GHG_CATEGORY_OPTIONS: ReadonlyArray<{ label: string; value: GhgCategory }> =
  GHG_CATEGORIES.map((value) => ({ label: GHG_CATEGORY_LABEL[value], value }))

/** Maps a category back to its scope — drives roll-up reporting. */
export const GHG_CATEGORY_TO_SCOPE: Readonly<Record<GhgCategory, GhgScope>> = {
  s1_stationary: 'scope_1', s1_mobile: 'scope_1', s1_process: 'scope_1', s1_fugitive: 'scope_1',
  s2_electricity_location: 'scope_2', s2_electricity_market: 'scope_2', s2_heat_steam_cooling: 'scope_2',
  s3_1_purchased_goods: 'scope_3', s3_2_capital_goods: 'scope_3', s3_3_fuel_energy: 'scope_3',
  s3_4_upstream_transport: 'scope_3', s3_5_waste: 'scope_3', s3_6_business_travel: 'scope_3',
  s3_7_commuting: 'scope_3', s3_8_upstream_leased: 'scope_3', s3_9_downstream_transport: 'scope_3',
  s3_10_processing: 'scope_3', s3_11_use_of_sold: 'scope_3', s3_12_eol: 'scope_3',
  s3_13_downstream_leased: 'scope_3', s3_14_franchises: 'scope_3', s3_15_investments: 'scope_3',
}

/** Methodology classes per GHG Protocol Scope 3 Standard §7.3 (data-quality hierarchy). */
export const GHG_METHODOLOGIES = ['activity_based', 'hybrid', 'spend_based', 'supplier_specific', 'average_data'] as const
export type GhgMethodology = (typeof GHG_METHODOLOGIES)[number]
export const GHG_METHODOLOGY_LABEL: Readonly<Record<GhgMethodology, string>> = {
  activity_based:    'Activity-based (highest quality)',
  hybrid:            'Hybrid (activity + spend)',
  spend_based:       'Spend-based (€ × emission factor)',
  supplier_specific: 'Supplier-specific data',
  average_data:      'Average data (industry / regional)',
}
export const GHG_METHODOLOGY_OPTIONS: ReadonlyArray<{ label: string; value: GhgMethodology }> =
  GHG_METHODOLOGIES.map((value) => ({ label: GHG_METHODOLOGY_LABEL[value], value }))

/** GWP horizon per IPCC AR6. */
export const GWP_HORIZONS = ['gwp_100', 'gwp_20'] as const
export type GwpHorizon = (typeof GWP_HORIZONS)[number]
export const GWP_HORIZON_LABEL: Readonly<Record<GwpHorizon, string>> = {
  gwp_100: 'GWP-100 (IPCC AR6)',
  gwp_20:  'GWP-20 (IPCC AR6)',
}
export const GWP_HORIZON_OPTIONS: ReadonlyArray<{ label: string; value: GwpHorizon }> =
  GWP_HORIZONS.map((value) => ({ label: GWP_HORIZON_LABEL[value], value }))
