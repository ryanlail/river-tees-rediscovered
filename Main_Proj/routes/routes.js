'use strict';

const router = require('express').Router();
const keys = require('../config/keys');
let bodyParser = require('body-parser');
let multer = require('multer');
let upload = multer({dest:'local/uploads/'});
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(keys.google.clientID);
const { DBHandler } = require('../libs/DBHandler')


async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: keys.google.clientID
    });
    const payload = ticket.getPayload();
    return payload;
}
router.use(bodyParser.urlencoded({ extended: false }));

router.post('/user/getPhotos', async function(req, res) {
    res.type('json');
    let body = '';
    let db = new DBHandler(keys.mysql.host, keys.mysql.user, keys.mysql.password, keys.mysql.database);
    let resp  = await db.connect();
    if (resp){
        resp = await db.query('SELECT * FROM PassportPage')
        if(resp){
            res.status(200);
            body = resp;
        } else{
            res.status(500);
            body = 'Could not complete query';
        }
    }else {
        res.status(500);
        body = 'Could not connect to database';
    }

    res.send({data: body});

});


module.exports = {router}