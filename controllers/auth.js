const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../models/index');
const User = db.authentication;

router.post('/register', async (req, res)=>{
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    await User.create({
        username: req.body.username,
         password: hashedPassword
    }).then(user=>{
        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
            expiresIn: 86400
        });
        res.send({ auth: true, token: token})
    }).catch(err=>{
        err.httpStatus = 500;
        throw err;
    });
});

router.post('/login', async (req, res)=>{
    await User.findAll({
        where: {
            username:req.body.username
        }
    })
    .then(response=>{
        return response[0].dataValues
    })
    .then(async user=>{
        console.log(user)
        const correctPassword = await bcrypt
            .compareSync(req.body.password, user.password);
        if (correctPassword) {
            const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
                expiresIn: 86400
            });
            return res.send({ auth: true, token: token});
        } else {
            return res.status(401)
                .send({msg: "wrong password / username"});
        }
    }).catch(err => {
        return res
            .status(401)
            .send({msg:"wrong password / username"})
    });
});

router.put('/')

module.exports = router;
