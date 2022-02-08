const Express = require('express');
const route = Express.Router();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const db = require('../database/db');

process.env.SECRET_KEY = "secret";

route.post("/register", (req, res) => {
    const userdata = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        password: req.body.password
    };
    db.emp.findOne({
            where: { email: req.body.email }
        })
        .then(user => {
            if (!user) {
                // make hash of password in bcrypt, salt 10
                const hash = bcrypt.hashSync(userdata.password, 10);
                userdata.password = hash;
                db.emp.create(userdata)
                    .then(user => {
                        let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                            expiresIn: 1440
                        });
                        res.json({ token: token })
                    })
                    .catch(err => {
                        res.json('error' + err)
                    })
            } else {
                res.json({
                    error: "user already exists"
                })
            }
        })
        .catch(err => {
            res.json({
                error: "error" + err
            })
        })

})
route.post("/login", (req, res) => {
        db.emp.findOne({
                where: { email: req.body.email }
            })
            .then(user => {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                        expiresIn: 1440
                    });
                    res.json({
                        token: token
                    })
                } else {
                    req.json('error mail or error password')
                }
            })
            .catch(err => {
                res.send('error' + err)
            })
    })
    /*route.post("/profil", req, res => {
        db.emp.findOne({
            where: { email: req.body.email }
        })
        .then
    })*/

module.exports = route;