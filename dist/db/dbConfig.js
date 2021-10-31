"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
require("dotenv").config();
const pool = new pg_1.Pool({
    // host: process.env.DB_HOST,
    // port: process.env.DB_PORT,
    // user: process.env.DB_USERNAME,
    // password: process.env.DB_PASSWORD,
    // database: process.env.DB_NAME,
    // FOR USE WITH HEROKU
    max: 6,
    connectionString: process.env.DATABASE_URL,
});
exports.default = pool;
