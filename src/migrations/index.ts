import * as migration_20260507_225804 from './20260507_225804'
import * as migration_20260508_030500 from './20260508_030500'

export const migrations = [
  {
    up: migration_20260507_225804.up,
    down: migration_20260507_225804.down,
    name: '20260507_225804',
  },
  {
    up: migration_20260508_030500.up,
    down: migration_20260508_030500.down,
    name: '20260508_030500',
  },
]
