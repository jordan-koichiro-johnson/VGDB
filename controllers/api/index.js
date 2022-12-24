const router = require('express').Router();
const { User, Profile, Game, Comment } = require('../../models');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
router.post('/creategame', (req, res) => {
    try {
        console.log(req.body)

        Game.create({
            name: req.body.name,
            description: req.body.description,
            imgUrl: req.body.imgUrl
        }).then(data => {
            res.json(data)
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "error occurred", err })
    }
})

router.get('/games', (req, res) => {
    Game.findAll().then(users => {
        res.json(users)
    })
})

router.get('/users', (req, res) => {
    User.findAll().then(users => {
        res.json(users)
    })
})

router.get('/game-profile/:gamename', (req, res) => {
    let game = req.params.gamename.split('_').join(' ')
    Game.findOne({
        where: {
            name: game
        }
    }).then(game => {
        res.json(game)
    })
})

router.post("/login", (req, res) => {
    console.log('login')
    try {

        User.findOne({
            where: {
                username: req.body.username
            }
        }).then(foundUser => {
            if (!foundUser) {
                return res.status(401).json({ mes: "no match user", err })
            } else if (!bcrypt.compareSync(req.body.password, foundUser.password)) {
                return res.status(401).json({ mes: "no match user", err })
            } else {
                const token = jwt.sign({
                    id: foundUser.id,
                    username: foundUser.username,

                }, process.env.JWT_SECRET, {
                    expiresIn: "24h"
                })
                return res.json({
                    token,
                    user: foundUser
                })
            }
        })
    } catch {
        console.error()
        res.status(500).json({ msg: "error occurred", err })
    }
})


router.get('/current-user', (req, res) => {
    console.log('user')
    console.log(req.body)
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log(token)
        const userData = jwt.verify(token, process.env.JWT_SECRET);
        console.log(userData)
        User.findOne({
            where: {
                id: userData.id
            },
        }).then(profileData => {
            console.log(profileData)
            res.json(profileData)
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "error occurred", err })
    }
})

router.get("/getuserfromtoken", (req, res) => {
    console.log('fromtoken')
    try {
        console.log('fromtoken')
        const token = req.headers.authorization.split(" ")[1];
        const tokenData = jwt.verify(token, process.env.JWT_SECRET);
        console.log(tokenData)
        res.json({ user: tokenData })
    } catch (err) {
        console.log(err)
        res.status(500).json({ user: false })
    }
})

module.exports = router;