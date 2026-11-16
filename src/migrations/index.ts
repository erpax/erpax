import * as migration_20261115_091414_baseline from './20261115_091414_baseline';
import * as migration_20261115_133852_fold_contracts from './20261115_133852_fold_contracts';
import * as migration_20261115_145812_fold_audit_policies from './20261115_145812_fold_audit_policies';
import * as migration_20261115_153312_fold_dunning from './20261115_153312_fold_dunning';
import * as migration_20261115_165406_fold_parties from './20261115_165406_fold_parties';
import * as migration_20261115_180058_cloudflare_email from './20261115_180058_cloudflare_email';
import * as migration_20261115_191645_fold_fiscal_periods from './20261115_191645_fold_fiscal_periods';
import * as migration_20261115_194748_plugins_real_schema from './20261115_194748_plugins_real_schema';
import * as migration_20261115_201759_fold_governed_pages from './20261115_201759_fold_governed_pages';
import * as migration_20261115_220659_fold_management_certifications from './20261115_220659_fold_management_certifications';
import * as migration_20261115_235153_unversion_users_tenants from './20261115_235153_unversion_users_tenants';
import * as migration_20261116_002432_authorship_created_by from './20261116_002432_authorship_created_by';
import * as migration_20261116_020503_fold_statutory_report_templates from './20261116_020503_fold_statutory_report_templates';
import * as migration_20261116_034237_fold_compliance_deadlines from './20261116_034237_fold_compliance_deadlines';
import * as migration_20261116_043403_fold_processing_activities from './20261116_043403_fold_processing_activities';
import * as migration_20261116_045940_slug_per_tenant from './20261116_045940_slug_per_tenant';
import * as migration_20261116_060023_fold_internal_audit_function from './20261116_060023_fold_internal_audit_function';
import * as migration_20261116_102149_fold_earnings_per_share from './20261116_102149_fold_earnings_per_share';
import * as migration_20261116_105734_fold_insurance_contracts from './20261116_105734_fold_insurance_contracts';
import * as migration_20261116_110916_fold_debt_schedule from './20261116_110916_fold_debt_schedule';
import * as migration_20261116_112548_fold_regulatory_deferral_accounts from './20261116_112548_fold_regulatory_deferral_accounts';
import * as migration_20261116_114436_fold_held_for_sale_classifications from './20261116_114436_fold_held_for_sale_classifications';
import * as migration_20261116_120156_fold_related_party_transactions from './20261116_120156_fold_related_party_transactions';
import * as migration_20261116_121244_fold_regulatory_reports from './20261116_121244_fold_regulatory_reports';
import * as migration_20261116_122658_fold_management_assessment_icfr from './20261116_122658_fold_management_assessment_icfr';
import * as migration_20261116_124352_fold_budget_planning from './20261116_124352_fold_budget_planning';

export const migrations = [
  {
    up: migration_20261115_091414_baseline.up,
    down: migration_20261115_091414_baseline.down,
    name: '20261115_091414_baseline',
  },
  {
    up: migration_20261115_133852_fold_contracts.up,
    down: migration_20261115_133852_fold_contracts.down,
    name: '20261115_133852_fold_contracts',
  },
  {
    up: migration_20261115_145812_fold_audit_policies.up,
    down: migration_20261115_145812_fold_audit_policies.down,
    name: '20261115_145812_fold_audit_policies',
  },
  {
    up: migration_20261115_153312_fold_dunning.up,
    down: migration_20261115_153312_fold_dunning.down,
    name: '20261115_153312_fold_dunning',
  },
  {
    up: migration_20261115_165406_fold_parties.up,
    down: migration_20261115_165406_fold_parties.down,
    name: '20261115_165406_fold_parties',
  },
  {
    up: migration_20261115_180058_cloudflare_email.up,
    down: migration_20261115_180058_cloudflare_email.down,
    name: '20261115_180058_cloudflare_email',
  },
  {
    up: migration_20261115_191645_fold_fiscal_periods.up,
    down: migration_20261115_191645_fold_fiscal_periods.down,
    name: '20261115_191645_fold_fiscal_periods',
  },
  {
    up: migration_20261115_194748_plugins_real_schema.up,
    down: migration_20261115_194748_plugins_real_schema.down,
    name: '20261115_194748_plugins_real_schema',
  },
  {
    up: migration_20261115_201759_fold_governed_pages.up,
    down: migration_20261115_201759_fold_governed_pages.down,
    name: '20261115_201759_fold_governed_pages',
  },
  {
    up: migration_20261115_220659_fold_management_certifications.up,
    down: migration_20261115_220659_fold_management_certifications.down,
    name: '20261115_220659_fold_management_certifications',
  },
  {
    up: migration_20261115_235153_unversion_users_tenants.up,
    down: migration_20261115_235153_unversion_users_tenants.down,
    name: '20261115_235153_unversion_users_tenants',
  },
  {
    up: migration_20261116_002432_authorship_created_by.up,
    down: migration_20261116_002432_authorship_created_by.down,
    name: '20261116_002432_authorship_created_by',
  },
  {
    up: migration_20261116_020503_fold_statutory_report_templates.up,
    down: migration_20261116_020503_fold_statutory_report_templates.down,
    name: '20261116_020503_fold_statutory_report_templates',
  },
  {
    up: migration_20261116_034237_fold_compliance_deadlines.up,
    down: migration_20261116_034237_fold_compliance_deadlines.down,
    name: '20261116_034237_fold_compliance_deadlines',
  },
  {
    up: migration_20261116_043403_fold_processing_activities.up,
    down: migration_20261116_043403_fold_processing_activities.down,
    name: '20261116_043403_fold_processing_activities',
  },
  {
    up: migration_20261116_045940_slug_per_tenant.up,
    down: migration_20261116_045940_slug_per_tenant.down,
    name: '20261116_045940_slug_per_tenant',
  },
  {
    up: migration_20261116_060023_fold_internal_audit_function.up,
    down: migration_20261116_060023_fold_internal_audit_function.down,
    name: '20261116_060023_fold_internal_audit_function',
  },
  {
    up: migration_20261116_102149_fold_earnings_per_share.up,
    down: migration_20261116_102149_fold_earnings_per_share.down,
    name: '20261116_102149_fold_earnings_per_share',
  },
  {
    up: migration_20261116_105734_fold_insurance_contracts.up,
    down: migration_20261116_105734_fold_insurance_contracts.down,
    name: '20261116_105734_fold_insurance_contracts',
  },
  {
    up: migration_20261116_110916_fold_debt_schedule.up,
    down: migration_20261116_110916_fold_debt_schedule.down,
    name: '20261116_110916_fold_debt_schedule',
  },
  {
    up: migration_20261116_112548_fold_regulatory_deferral_accounts.up,
    down: migration_20261116_112548_fold_regulatory_deferral_accounts.down,
    name: '20261116_112548_fold_regulatory_deferral_accounts',
  },
  {
    up: migration_20261116_114436_fold_held_for_sale_classifications.up,
    down: migration_20261116_114436_fold_held_for_sale_classifications.down,
    name: '20261116_114436_fold_held_for_sale_classifications',
  },
  {
    up: migration_20261116_120156_fold_related_party_transactions.up,
    down: migration_20261116_120156_fold_related_party_transactions.down,
    name: '20261116_120156_fold_related_party_transactions',
  },
  {
    up: migration_20261116_121244_fold_regulatory_reports.up,
    down: migration_20261116_121244_fold_regulatory_reports.down,
    name: '20261116_121244_fold_regulatory_reports',
  },
  {
    up: migration_20261116_122658_fold_management_assessment_icfr.up,
    down: migration_20261116_122658_fold_management_assessment_icfr.down,
    name: '20261116_122658_fold_management_assessment_icfr',
  },
  {
    up: migration_20261116_124352_fold_budget_planning.up,
    down: migration_20261116_124352_fold_budget_planning.down,
    name: '20261116_124352_fold_budget_planning'
  },
];
