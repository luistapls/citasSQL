module.exports = {
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'project1',
  host: process.env.DB_HOST || 'localhost',
  dialect: process.env.DIALECT || 'mysql',
  migrationStorage: process.env.MIGRATION_STORAGE || 'sequelize',
  migrationStorageTableName: process.env.MIGRATION_NAME || 'migrations',
  define: {
    timestamps: false,
  },
};
