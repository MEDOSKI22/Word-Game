import {Pool} from "pg";
import dotenv from "dotenv";
dotenv.config();

console.log("Loading DB config...");
console.log("HOST:", process.env.DB_HOST);

export const pool = new Pool ({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD
})

pool.connect((err, client, release) => {
  if (err) {
    console.error("Database connection error:", err.stack);
  } else {
    console.log("Connected to PostgreSQL");
    release();
  }
});


