const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const config = require('../config');
const db = require('../models/index');
const User = db.authentication;

router.post('/register', async (req, res, next)=>{
    try {
        if(!req.body.username || !req.body.password) {
            const err = new Error('Invalid Request');
            err.httpStatus = 400;
            throw err;
        }
        const hashedPassword = bcrypt.hashSync(req.body.password, 8);
        await User.create({
            username: req.body.username,
            password: hashedPassword
        }).then(user=>{
            const token = jwt.sign({ id: user.id }, config.secret_key, {
                expiresIn: 86400
            });
            res.send({ auth: true, token: token});
        }).catch(err=>{
            err.httpStatus = 500;
            throw err;
        });

    } catch(err){
        next(err);
    }
});

router.post('/login', async (req, res, next)=>{
    try {
        await User.findOne({
            where: {
                username:req.body.username
            }
        })
        .then(response=>{
            return response.dataValues;
        })
        .then(async user=>{
            const correctPassword = await bcrypt
                .compareSync(req.body.password, user.password);
            if (correctPassword) {
                const token = jwt.sign({ id: user.id }, config.secret_key, {
                    expiresIn: 86400
                });

                return res.send({ auth: true, token: token});
            } else {
                return res.status(401)
                    .send({msg: 'Failed to login'});
            }
        }).catch(err => {
            err.httpStatus = 401;
            err.message = 'Failed to login';
            throw err;
        });
    } catch(err) {
        next(err);
    }
});

module.exports = router;
