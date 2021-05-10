module.exports = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: process.env.DIALECT,
  migrationStorage: process.env.MIGRATION_STORAGE,
  migrationStorageTableName: process.env.MIGRATION_NAME,
  define: {
    timestamps: false,
  },
};
