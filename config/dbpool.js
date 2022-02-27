const Pool = require('pg').Pool;

const pool = new Pool({
    user:"postgres",
    password:"123",
    host:"localhost",
    database:"anotacat",
    port:5432
});

module.exports = pool;
