const mysql = require('mysql');

const { promisify } = require('util');
const { dataBase } = require('./keys');

const pool = mysql.createPool(dataBase);

pool.getConnection((error, connection) => {
  if (error) throw error;

  if (connection) connection.release();
  console.log('Successfully connected to the database.');
});

pool.query = promisify(pool.query);

module.exports = pool;
