import * as migration_20261113_153714_parties from './20261113_153714_parties';
import * as migration_20261113_161539_lifecycle from './20261113_161539_lifecycle';
import * as migration_20261113_164414_markdown from './20261113_164414_markdown';
import * as migration_20261114_094735_fold_config_children from './20261114_094735_fold_config_children';
import * as migration_20261114_100412_merge_operation_model from './20261114_100412_merge_operation_model';
import * as migration_20261114_100911_work_order_lot_relationships from './20261114_100911_work_order_lot_relationships';
import * as migration_20261114_102016_merge_jurisdictions from './20261114_102016_merge_jurisdictions';
import * as migration_20261114_102532_item_storefront_links from './20261114_102532_item_storefront_links';
import * as migration_20261114_103040_fold_sales_orders_into_orders from './20261114_103040_fold_sales_orders_into_orders';
import * as migration_20261114_103541_fold_payments_into_transactions from './20261114_103541_fold_payments_into_transactions';
import * as migration_20261114_104008_policy_versions_native from './20261114_104008_policy_versions_native';
import * as migration_20261114_104240_fiscal_period_snapshots_native from './20261114_104240_fiscal_period_snapshots_native';
import * as migration_20261114_104713_user_role_assignments from './20261114_104713_user_role_assignments';
import * as migration_20261114_110442_fold_committee_members_and_posting_rules from './20261114_110442_fold_committee_members_and_posting_rules';
import * as migration_20261114_110717_remove_payment_methods from './20261114_110717_remove_payment_methods';
import * as migration_20261114_111618_fold_items_into_products from './20261114_111618_fold_items_into_products';
import * as migration_20261114_112144_virtual_fields_and_period_lock_join from './20261114_112144_virtual_fields_and_period_lock_join';
import * as migration_20261114_112347_polymorphic_sources from './20261114_112347_polymorphic_sources';
import * as migration_20261114_115945_fold_purchase_orders_into_orders from './20261114_115945_fold_purchase_orders_into_orders';
import * as migration_20261114_120836_fold_quotes_and_requisitions_into_orders from './20261114_120836_fold_quotes_and_requisitions_into_orders';
import * as migration_20261114_122616_roles_on_orders from './20261114_122616_roles_on_orders';
import * as migration_20261114_123452_payload_table_names from './20261114_123452_payload_table_names';
import * as migration_20261114_125159_form_submission_references from './20261114_125159_form_submission_references';
import * as migration_20261114_134018_directory_providers_indexes from './20261114_134018_directory_providers_indexes';

export const migrations = [
  {
    up: migration_20261113_153714_parties.up,
    down: migration_20261113_153714_parties.down,
    name: '20261113_153714_parties',
  },
  {
    up: migration_20261113_161539_lifecycle.up,
    down: migration_20261113_161539_lifecycle.down,
    name: '20261113_161539_lifecycle',
  },
  {
    up: migration_20261113_164414_markdown.up,
    down: migration_20261113_164414_markdown.down,
    name: '20261113_164414_markdown',
  },
  {
    up: migration_20261114_094735_fold_config_children.up,
    down: migration_20261114_094735_fold_config_children.down,
    name: '20261114_094735_fold_config_children',
  },
  {
    up: migration_20261114_100412_merge_operation_model.up,
    down: migration_20261114_100412_merge_operation_model.down,
    name: '20261114_100412_merge_operation_model',
  },
  {
    up: migration_20261114_100911_work_order_lot_relationships.up,
    down: migration_20261114_100911_work_order_lot_relationships.down,
    name: '20261114_100911_work_order_lot_relationships',
  },
  {
    up: migration_20261114_102016_merge_jurisdictions.up,
    down: migration_20261114_102016_merge_jurisdictions.down,
    name: '20261114_102016_merge_jurisdictions',
  },
  {
    up: migration_20261114_102532_item_storefront_links.up,
    down: migration_20261114_102532_item_storefront_links.down,
    name: '20261114_102532_item_storefront_links',
  },
  {
    up: migration_20261114_103040_fold_sales_orders_into_orders.up,
    down: migration_20261114_103040_fold_sales_orders_into_orders.down,
    name: '20261114_103040_fold_sales_orders_into_orders',
  },
  {
    up: migration_20261114_103541_fold_payments_into_transactions.up,
    down: migration_20261114_103541_fold_payments_into_transactions.down,
    name: '20261114_103541_fold_payments_into_transactions',
  },
  {
    up: migration_20261114_104008_policy_versions_native.up,
    down: migration_20261114_104008_policy_versions_native.down,
    name: '20261114_104008_policy_versions_native',
  },
  {
    up: migration_20261114_104240_fiscal_period_snapshots_native.up,
    down: migration_20261114_104240_fiscal_period_snapshots_native.down,
    name: '20261114_104240_fiscal_period_snapshots_native',
  },
  {
    up: migration_20261114_104713_user_role_assignments.up,
    down: migration_20261114_104713_user_role_assignments.down,
    name: '20261114_104713_user_role_assignments',
  },
  {
    up: migration_20261114_110442_fold_committee_members_and_posting_rules.up,
    down: migration_20261114_110442_fold_committee_members_and_posting_rules.down,
    name: '20261114_110442_fold_committee_members_and_posting_rules',
  },
  {
    up: migration_20261114_110717_remove_payment_methods.up,
    down: migration_20261114_110717_remove_payment_methods.down,
    name: '20261114_110717_remove_payment_methods',
  },
  {
    up: migration_20261114_111618_fold_items_into_products.up,
    down: migration_20261114_111618_fold_items_into_products.down,
    name: '20261114_111618_fold_items_into_products',
  },
  {
    up: migration_20261114_112144_virtual_fields_and_period_lock_join.up,
    down: migration_20261114_112144_virtual_fields_and_period_lock_join.down,
    name: '20261114_112144_virtual_fields_and_period_lock_join',
  },
  {
    up: migration_20261114_112347_polymorphic_sources.up,
    down: migration_20261114_112347_polymorphic_sources.down,
    name: '20261114_112347_polymorphic_sources',
  },
  {
    up: migration_20261114_115945_fold_purchase_orders_into_orders.up,
    down: migration_20261114_115945_fold_purchase_orders_into_orders.down,
    name: '20261114_115945_fold_purchase_orders_into_orders',
  },
  {
    up: migration_20261114_120836_fold_quotes_and_requisitions_into_orders.up,
    down: migration_20261114_120836_fold_quotes_and_requisitions_into_orders.down,
    name: '20261114_120836_fold_quotes_and_requisitions_into_orders',
  },
  {
    up: migration_20261114_122616_roles_on_orders.up,
    down: migration_20261114_122616_roles_on_orders.down,
    name: '20261114_122616_roles_on_orders',
  },
  {
    up: migration_20261114_123452_payload_table_names.up,
    down: migration_20261114_123452_payload_table_names.down,
    name: '20261114_123452_payload_table_names',
  },
  {
    up: migration_20261114_125159_form_submission_references.up,
    down: migration_20261114_125159_form_submission_references.down,
    name: '20261114_125159_form_submission_references',
  },
  {
    up: migration_20261114_134018_directory_providers_indexes.up,
    down: migration_20261114_134018_directory_providers_indexes.down,
    name: '20261114_134018_directory_providers_indexes'
  },
];
