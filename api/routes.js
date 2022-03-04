const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../config/dbpool');
const jwt = require('jsonwebtoken');
const authentication = require('../middleware/authentication');
const sanitizer = require('sanitizer');

//auth
router.post('/login', async (req, res) => {
    try {
        const {email, pass} = req.body;
        const user = await pool.query(`SELECT * FROM users WHERE email = $1`,[email]);
        if(user.rows.length == 0){
            return res.status(200).json({success:false});
        }
        if(!pass){
            return res.status(200).json({
                success:false
            });
        }
        const validPassword = await bcrypt.compare(pass, user.rows[0].pass);
        if(!validPassword){
            return res.status(200).json({
                success:false
            });
        }

        const userTokenObj = {
            id:user.rows[0].id,
            email:user.rows[0].email,
        };
        const userToken = await jwt.sign(userTokenObj, process.env.TOKEN_SECRET, {expiresIn:'30d'});

        return res.status(200).json({
            token:userToken,
            success:true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false
        });
    }
});

router.post('/verify', async (req, res) => {
    try {
        const token = req.body.token
        console.log(token);
        jwt.verify(token, process.env.TOKEN_SECRET, (err, dec) => {
            if(err){
                return res.status(200).json({
                    success:false
                });
            }
            return res.status(200).json({
                success:true
            });
        });
    } catch (error) {
        console.log(error.message);
        return res.status(200).json({
            success:false
        });
    }
});


//users
router.post('/user', async (req, res) => {
    try {
        const hashedPass = await bcrypt.hash(req.body.pass, 10);
        const newUser = await pool.query(`INSERT INTO users(email, pass) VALUES($1, $2) RETURNING *`, [req.body.email, hashedPass]);
        res.json({success:true,user:newUser.rows[0]});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success:false
        });
    }
});

router.get('/user', authentication, async (req, res) => {
    try {
        const retreivedUser = await pool.query(`SELECT * FROM USERS WHERE id = $1`, [req.payload.id]);
        res.json({success:true,user:retreivedUser.rows[0]});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success:false
        });
    }
});

router.post('/note', authentication, async (req, res) => {
    try {
        console.log(req.body);
        const {content} = req.body;
        const newNote = await pool.query(`INSERT INTO notes(content, owid) VALUES($1, $2) RETURNING *`,
        [sanitizer.sanitize(content), req.payload.id]);
        res.json({success:true, note:newNote.rows[0]});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success:false
        });
    }
});

router.get('/note', authentication, async (req, res) => {
    try {
        const notes = await pool.query(`SELECT * FROM notes WHERE owid = $1`,[req.payload.id]);
        res.json({success:true,note:notes.rows});
    } catch (error) {
        
    }
});

module.exports = router;

