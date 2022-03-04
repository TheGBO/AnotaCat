const Pool = require('pg').Pool;

const pool = new Pool({
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASS || "123",
    host: process.env.DB_HOST || "localhost",
    database: process.env.DB_NAME || "anotacat",
    port:5432
});

module.exports = pool;
