const mysql = require('mysql2/promise');
const config = require('./dbconfig.json');

const pool = mysql.createPool(config || {
    host: process.env.host,
    port: process.env.port,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    connectionLimit: process.env.connectionLimit,
    waitForConnections: process.env.waitForConnections
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
