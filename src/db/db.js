const mysql = require('mysql2/promise');
const config = require('./dbconfig.json');

class DB {
    pool = mysql.createPool(config);

    async getConnection() {
        return await this.pool.getConnection(async conn => conn);
    }

    async releaseConnection(conn) {
        conn.release();
    }

    async executeQuery(query) {
        let res = [];
        let conn = {};

        try {
            conn = await this.getConnection();
            res = await conn.execute(query);
        } catch (error) {
            throw error;
        } finally {
            this.releaseConnection(conn);
            return res;
        }
    }
}

module.exports = DB;
