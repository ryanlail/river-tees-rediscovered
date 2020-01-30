'use strict';
const mysql = require('mysql');


class DBHandler {
    constructor(host, user, password, database) {
        this._host = host;
        this._user = user;
        this._password = password;
        this._database = database;
    }

    connect() {
        this._db = mysql.createPool({
            host: this._host,
            user: this._user,
            password: this._password,
            database: this._database
        });
        return new Promise((resolve, reject) => {
            this._db.getConnection((err, connection) => {
                if (err) {
                    resolve(false);
                }else {
                    connection.destroy();
                    resolve(true);
                }
            });
        });
    }

    disconnect() {
        this._db.end();
    }

    query(sql) {
        return new Promise((resolve, reject) => {
            this._db.query(sql, (err, result) => {
                if(err){
                    resolve(undefined);
                }else {
                    resolve(result);
                }
            });
        });
    }








}

module.exports = {DBHandler};

