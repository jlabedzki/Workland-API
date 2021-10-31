import { Pool } from "pg";

require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "",
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
});
export default pool;
