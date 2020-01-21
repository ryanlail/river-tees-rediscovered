'use strict'

const router = require('express').Router();
let bodyParser = require('body-parser');
let multer = require('multer');
let upload = multer({dest:'local/uploads/'});
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(keys.google.clientID);




async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: keys.google.clientID
    });
    const payload = ticket.getPayload();
    return payload;
}




router.use(bodyParser.urlencoded({ extended: false }));

module.exports = {router}