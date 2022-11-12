type Migration = (state: any) => any

export function createMigration(migrations: Array<Migration>): Migration {
  return function migrate(state: any): any {
    if (state.version === undefined) state.version = 0

    const migration = migrations[state.version] as Migration | undefined
    if (migration)
      return migrate({
        ...migration(state),
        version: state.version + 1,
      })

    return state
  }
}
