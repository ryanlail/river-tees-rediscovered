'use strict';

const router = require('express').Router();
const keys = require('../config/keys');
const bodyParser = require('body-parser');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(keys.google.clientID);
const mysql = require('mysql');
const { DBHandler } = require('../libs/DBHandler');
const multer = require('multer');
const upload = multer({dest:'photos/tmp'});
const fs = require('fs');



async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: keys.google.clientID
    });
    const payload = ticket.getPayload();
    return payload;
}
router.use(bodyParser.urlencoded({ extended: false }));


// This function is for getting the list of exisiting photos not the individual photos
router.post('/user/getPhotos', async function(req, res) {
    res.type('json');
    let body = '';
    let verif = true;
    let user = await verify(req.body.idToken).catch(()=>{
        verif = false;
    });
    if(verif){
        let db = new DBHandler(keys.mysql.host, keys.mysql.user, keys.mysql.password, keys.mysql.database);
        let resp  = await db.connect();
        if (resp){
            resp = await db.query('SELECT `SculptureID` FROM `PassportPage` WHERE `UserID` = ' + mysql.escape(user['sub']));
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
    } else {
        res.status(401);
        body = 'Could not verify your user token'
    }
    res.send({data: body});
});


router.post('/user/addPhoto', upload.single('picture'), async function(req, res) {
    res.type('json');
    let body = '';
    let verif = true;
    let user = await verify(req.body.idToken).catch(()=>{
        verif = false;
    });
    if (verif) {
        let file = '';
        if (req.file) {
            if (req.file.mimetype == 'image/jpeg' || req.file.mimetype == 'image/png') {
                file = '/photos/tmp/'+req.file.filename;
                let movFile = false;
                try {
                    fs.renameSync(file, '/photos/'+user['sub']+'/'+req.body.sculptureID+'/1');
                    movFile = true;
                } catch (error) {
                    movFile = false;
                }
                if(movFile){
                    let db = new DBHandler(keys.mysql.host, keys.mysql.user, keys.mysql.password, keys.mysql.database);
                    let resp  = await db.connect();
                    if (resp){
                        let userID = user['sub'];
                        let sculptureID = req.body.sculptureID;
                        let photoPath = userID+'/'+sculptureID+'/';
                        let sql = 'INSERT INTO PassportPage (UserID, SculptureID, PhotoPath) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE PhotoPath = ?';
                        sql = mysql.format(sql, [userID, sculptureID, photoPath, photoPath]);
                        resp = await db.query(sql);
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
                }else {
                    res.status(500);
                    body = 'Cpuld not store file on the system';
                }
            }else {
                res.status(400);
                body = 'Uploaded file was not the correct format. PNG or JPEG';
            }
        }else {
            res.status(400);
            body = 'No image was sent in the request'
        }
    }else{
        res.status(401);
        body = 'Could not verify your user token';
    }

    res.send({data: body});
});






module.exports = {router}