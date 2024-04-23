const { Client } = require("pg");

const Pool = require("pg").Pool;

const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbName = process.env.DB_NAME;
const dbDialect = process.env.DB_DIALECT;

const pool = new Pool({
  user: dbUsername,
  password: dbPassword,
  host: dbHost,
  port: dbPort,
  database: dbName,
});

const connectDB = () => {
  pool
    .connect()
    .then(() => {
      console.log(`Connected to ${dbName} database`);
    })
    .catch((err) => {
      console.error("Error connecting to PostgreSQL database", err);
    });
};

module.exports = { connectDB, pool };
