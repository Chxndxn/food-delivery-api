const { Client } = require("pg");

const Pool = require("pg").Pool;

const pool = new Pool({
  connectionString: process.env.DB_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const connectDB = () => {
  pool
    .connect()
    .then(() => {
      console.log(`Connected to postgres database successfully!`);
    })
    .catch((err) => {
      console.error("Error connecting to PostgreSQL database", err);
    });
};

module.exports = { connectDB, pool };
