import * as migration_20260604_223629 from './20260604_223629';
import * as migration_20260609_071314_test_migration_fix from './20260609_071314_test_migration_fix';

export const migrations = [
  {
    up: migration_20260604_223629.up,
    down: migration_20260604_223629.down,
    name: '20260604_223629',
  },
  {
    up: migration_20260609_071314_test_migration_fix.up,
    down: migration_20260609_071314_test_migration_fix.down,
    name: '20260609_071314_test_migration_fix'
  },
];
