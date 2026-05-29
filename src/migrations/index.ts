import * as migration_20260529_072202_initial from './20260529_072202_initial';

export const migrations = [
  {
    up: migration_20260529_072202_initial.up,
    down: migration_20260529_072202_initial.down,
    name: '20260529_072202_initial'
  },
];
