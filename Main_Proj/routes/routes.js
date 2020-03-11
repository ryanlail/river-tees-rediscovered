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
const spawn = require('child_process').spawnSync;



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
            db.disconnect();
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

// Function gets csv file for the sculpture information to pass to admin page
router.get('/getSculptureCSV', async function(req, res){
    let db = new DBHandler(keys.mysql.host, keys.mysql.user, keys.mysql.password, keys.mysql.database);
    let resp  = await db.connect();
    if (resp){
        let sql = 'SELECT `Title`, `Description`, `LatitudeLongitude` FROM `Sculpture`';
        sql = mysql.format(sql);
        resp = await db.query(sql);
        if (resp.length != 0 && resp[0].Title && resp[0].Description && resp[0].LatitudeLongitude){
            try {
                fs.writeFileSync('tmp/Sculptures.tsv', 'name\tdescription\tLatitude-longitude information\n');
                for (let i = 0; i < resp.length; i ++) {
                    fs.appendFileSync('tmp/Sculptures.tsv', resp[i].Title+ '\t' + resp[i].Description.replace( /[\r\n]+/gm, "" ) + '\t' + resp[i].LatitudeLongitude + '\n')
                }
                res.sendFile(process.cwd()+'/tmp/Sculptures.tsv');
                return;
            }
            catch(err) {
                res.status(500);
                body = 'Server error'
            }
        } else {
            res.status(500)
            body = 'Could not complete query';
        }
        db.disconnect();
    } else {
        res.status(500);
        body = 'Could not connect to database';
    }
})

// Function gets sculpture info based off given id
router.get('/getSculpture', async function(req, res){
    res.type('json');
    let body = '';
    let sculptureID = req.query.sculptureID;
    if(sculptureID){
        let db = new DBHandler(keys.mysql.host, keys.mysql.user, keys.mysql.password, keys.mysql.database);
        let resp  = await db.connect();
        if (resp){
            let sql = 'SELECT Title, ArtistID, TrailID FROM Sculpture WHERE SculptureID = ?';
            sql = mysql.format(sql, [sculptureID]);
            resp = await db.query(sql);
            if(resp){
                res.status(200);
                body = resp;
            } else{
                res.status(500);
                body = 'Could not complete query';
            }
            db.disconnect();
        }else {
            res.status(500);
            body = 'Could not connect to database';
        }
    }else{
        res.status(401);
        body = 'Did not specify and artist in the request';
    }
    res.send({data: body});
});

// Function gets trail name based of TrailID
router.get('/getTrail', async function(req, res){
    res.type('json');
    let body = '';
    let trailID = req.query.trailID;
    if(trailID){
        let db = new DBHandler(keys.mysql.host, keys.mysql.user, keys.mysql.password, keys.mysql.database);
        let resp  = await db.connect();
        if (resp){
            let sql = 'SELECT Name FROM Trail WHERE TrailID = ?';
            sql = mysql.format(sql, [trailID]);
            resp = await db.query(sql);
            if(resp){
                res.status(200);
                body = resp;
            } else{
                res.status(500);
                body = 'Could not complete query';
            }
            db.disconnect();
        }else {
            res.status(500);
            body = 'Could not connect to database';
        }
    }else{
        res.status(401);
        body = 'Did not specify and artist in the request';
    }
    res.send({data: body});
});




// Function get artist names based of given id
router.get('/getArtist', async function(req, res){
    res.type('json');
    let body = '';
    let artistID = req.query.artistID;
    if(artistID){
        let db = new DBHandler(keys.mysql.host, keys.mysql.user, keys.mysql.password, keys.mysql.database);
        let resp  = await db.connect();
        if (resp){
            let sql = 'SELECT Forename, Surname FROM Artist WHERE ArtistID = ?';
            sql = mysql.format(sql, [artistID]);
            resp = await db.query(sql);
            if(resp){
                res.status(200);
                body = resp;
            } else{
                res.status(500);
                body = 'Could not complete query';
            }
            db.disconnect();
        }else {
            res.status(500);
            body = 'Could not connect to database';
        }
    }else{
        res.status(401);
        body = 'Did not specify an artist in the request';
    }
    res.send({data: body});
});

// Function adds a new photo to the server and adds a database entry
router.post('/user/addPhoto', upload.single('picture'), async function(req, res) {
    res.type('json');
    let body = '';
    let verif = true;
    let user = await verify(req.body.idToken).catch(()=>{
        verif = false;
    });
    if (verif) {
        if (!isNaN(Number(req.body.sculptureID))) {
            if (req.file) {
                if (req.file.mimetype == 'image/jpeg' || req.file.mimetype == 'image/png') {
                    let movFile = false;
                    try {
                        fs.mkdirSync('./photos/'+user['sub']+'/'+req.body.sculptureID+'/', {recursive: true});
                        // call stamping function
                        spawn('python', ['./stamp_image.py', req.file.filename, req.body.sculptureID, './photos/'+user['sub']+'/'+req.body.sculptureID+'/1']);
                        movFile = true;
                    } catch (err) {
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
                                body = 'Success uploaded new photo';
                            } else{
                                res.status(500);
                                body = 'Could not complete query';
                            }
                            db.disconnect();
                        }else {
                            res.status(500);
                            body = 'Could not connect to database';
                        }
                    }else {
                        res.status(500);
                        body = 'Could not store file on the system';
                    }
                }else {
                    res.status(400);
                    body = 'Uploaded file was not the correct format. PNG or JPEG';
                }
            }else {
                res.status(400);
                body = 'No image was sent in the request';
            }
        } else {
            res.status(400);
            body = 'Invalid SculptureID';
        }
    }else{
        res.status(401);
        body = 'Could not verify your user token';
    }

    res.send({data: body});
});

// Function gets an individual image file for a users sculpture
router.post('/user/getPhoto', async function(req, res){
    let body = '';
    let verif = true;
    let user = await verify(req.body.idToken).catch(()=>{
        verif = false;
    });
    if (verif){
        let db = new DBHandler(keys.mysql.host, keys.mysql.user, keys.mysql.password, keys.mysql.database);
        let resp  = await db.connect();
        if (resp){
            let userID = user['sub'];
            let sql = 'SELECT `PhotoPath` FROM `PassportPage` WHERE `UserID` = ? AND SculptureID = ?';
            sql = mysql.format(sql, [userID, req.body.sculptureID]);
            resp = await db.query(sql);
            if(resp.length != 0 && resp[0].PhotoPath){
                res.sendFile(process.cwd()+'/photos/'+resp[0].PhotoPath+'1');
                return;
            } else{
                res.status(500);
                body = 'Could not complete query';
            }
            db.disconnect();
        }else {
            res.status(500);
            body = 'Could not connect to database';
        }
    }else{
        res.status(401);
        body = 'Could not verify your user ticket';
    }
    res.send({data: body});
});


// Function get coordinate of start of trail based of given id
router.get('/getCoords', async (req, res) => {
    let body = '';
    let trailID = req.query.trailID;
    let db = new DBHandler(keys.mysql.host, keys.mysql.user, keys.mysql.password, keys.mysql.database);
    let resp  = await db.connect();
    if (resp){
        let sql = 'SELECT StartCoordinate FROM Trail WHERE TrailID = ?';
        sql = mysql.format(sql, [trailID]);
        resp = await db.query(sql);
        if(resp){
            res.status(200);
            body = resp;
        } else{
            res.status(500);
            body = 'Could not complete query';
        }
        db.disconnect();
    }else {
        res.status(500);
        body = 'Could not connect to database';
    }
    res.send({data: body});
});


router.get('/getTrailCount', async (_, res) =>{
    let body = '';
    let db = new DBHandler(keys.mysql.host, keys.mysql.user, keys.mysql.password, keys.mysql.database);
    let resp  = await db.connect();
    if (resp){
        let sql = 'SELECT COUNT(TrailID) AS Count FROM Trail;'
        sql = mysql.format(sql);
        resp = await db.query(sql);
        if(resp){
            res.status(200);
            body = resp;
        } else{
            res.status(500);
            body = 'Could not complete query';
        }
        db.disconnect();
    }else {
        res.status(500);
        body = 'Could not connect to database';
    }
    res.send({data: body});
});


router.get('/getSculptCount', async (req, res) => {
    let body = '';
    let trailID = req.query.trailID;
    let db = new DBHandler(keys.mysql.host, keys.mysql.user, keys.mysql.password, keys.mysql.database);
    let resp  = await db.connect();
    if (resp){
        let sql = 'SELECT COUNT(SculptureID) AS Count FROM Sculpture WHERE TrailID = ?;'
        sql = mysql.format(sql, [trailID]);
        resp = await db.query(sql);
        if(resp){
            res.status(200);
            body = resp;
        } else{
            res.status(500);
            body = 'Could not complete query';
        }
        db.disconnect();
    }else {
        res.status(500);
        body = 'Could not connect to database';
    }
    res.send({data: body});
});


module.exports = {router}
