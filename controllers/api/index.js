const router = require('express').Router();
const { User, Profile, Game, Comment, Rating } = require('../../models');
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
router.get('/ratings', (req, res) => {
    Rating.findAll().then(ratings => {
        res.json(ratings)
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
router.get('/game-id/:id', (req, res) => {
    console.log(req.params.id)
    Game.findOne({
        where: {
            id: req.params.id
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

router.get('/ratings-for-user', (req, res) => {

    const userid = req.headers.user
    console.log(userid)
    if (req.headers.user > 0) {

        Rating.findAll({ where: { UserId: userid } }).then(ratings => {
            res.json(ratings)
        })
    }
})
router.get('/ratings-for-game/:id', (req, res) => {

    const gameId = req.params.id
    console.log(gameId)

    Rating.findAll({ where: { GameId: gameId } }).then(ratings => {
        res.json(ratings)
    })

})

router.post('/createrating', (req, res) => {

    try {
        console.log(req.body)
        Rating.destroy({
            where: {
                UserId: req.body.UserId,
                GameId: req.body.GameId
            }
        })
        Rating.create({
            ratingNum: req.body.ratingNum,
            content: req.body.content,
            UserId: req.body.UserId,
            GameId: req.body.GameId
        }).then(data => {
            res.json(data)
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "error occurred", err })
    }
})

module.exports = router;