const router = require('express').Router();
const { User, Profile, Game, Comment } = require('../../models');
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

router.get('/:gamename', (req, res) => {
    let game = req.params.gamename.split('_').join(' ')
    Game.findOne({
        where: {
            name: game
        }
    }).then(game => {
        res.json(game)
    })
})


module.exports = router;