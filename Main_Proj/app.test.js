'use strict';
const keys = require('./config/keys');
const { DBHandler } = require('./libs/DBHandler');


test('DBHandler Class connect function succeeds with real database', async () =>{
    let realDB = new DBHandler(keys.mysql.host, keys.mysql.user, keys.mysql.password, keys.mysql.database);
    let response = await realDB.connect();
    expect(response).toBe(true);
    realDB.disconnect();
});

test('DBHandler Class connect function fails with fake database', async () =>{
    let fakeDB = new DBHandler('localhost', 'meh', 'supermeh', 'meep');
    let response = await fakeDB.connect();
    expect(response).toBe(false);
    fakeDB.disconnect();
});

test('DBHandler Class returns result of a correct SQL Query', async () =>{
    let realDB = new DBHandler(keys.mysql.host, keys.mysql.user, keys.mysql.password, keys.mysql.database);
    let response = await realDB.connect();
    response = await realDB.query('SELECT * FROM PassportPage');
    expect(response).not.toBe(undefined);
    realDB.disconnect();
});

test('DBHandler Class returns undefined after malformed SQL Query', async () =>{
    let realDB = new DBHandler(keys.mysql.host, keys.mysql.user, keys.mysql.password, keys.mysql.database);
    let response = await realDB.connect();
    response = await realDB.query('HEHEHEHEHEHEHE CRACKED');
    expect(response).toBe(undefined);
    realDB.disconnect();
});
