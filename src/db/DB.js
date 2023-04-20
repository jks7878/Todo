const mysql = require('mysql2/promise');
// const config = require('./dbconfig.json');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME,
    connectionLimit: 1,
    waitForConnections: false
});

async function getConnection() {
    return await pool.getConnection(async conn => conn);
}

async function releaseConnection(conn) {
    conn.release();
}

async function executeQuery(query) {
    let res = [];
    let conn = {};

    try {
        conn = await getConnection();
        res = await conn.execute(query);
    } catch (error) {
        throw error;
    } finally {
        releaseConnection(conn);
        return res;
    }
}

module.exports = { getConnection, releaseConnection, executeQuery };
