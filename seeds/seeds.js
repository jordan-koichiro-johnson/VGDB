const sequelize = require('../config/connection');
const { User, Profile, Game, Rating } = require("../models");
const seedMe = async () => {
    await sequelize.sync({ force: true })
    const games = [
        {
            name: "Super Smash Brothers Melee",
            description: "Super Smash Bros. Melee is a 2001 crossover fighting video game developed by HAL Laboratory and published by Nintendo for the GameCube. It is the second installment in the Super Smash Bros. series.",
            imgUrl: "https://ssb.wiki.gallery/images/5/55/SsbmBoxart.jpg"
        },
        {
            name: "Halo: Combat Evolved",
            description: "Halo: Combat Evolved is a 2001 first-person shooter game developed by Bungie and published by Microsoft Game Studios.",
            imgUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Halo_-_Combat_Evolved_%28XBox_version_-_box_art%29.jpg/220px-Halo_-_Combat_Evolved_%28XBox_version_-_box_art%29.jpg"
        },
        {
            name: "League of Legends",
            description: "League of Legends (LoL), commonly referred to as League, is a 2009 multiplayer online battle arena video game developed and published by Riot Games.",
            imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/League_of_Legends_2019_vector.svg/1200px-League_of_Legends_2019_vector.svg.png"
        }
    ]
    const users = [
        {
            username: 'mainuser',
            password: 'bigpassword',
            email: 'email@email.com'
        }
    ]
    const ratings = [
        {

            ratingNum: 5,
            content: 'good game',
            UserId: 1,
            GameId: 1,
        },
        {

            ratingNum: 3,
            content: 'good game',
            UserId: 1,
            GameId: 2,
        },
        {

            ratingNum: 4,
            content: 'good game',
            UserId: 1,
            GameId: 3,
        }
    ]
    try {


        await Game.bulkCreate(games)
        await User.bulkCreate(users, {
            individualHooks: true
        })
        await Rating.bulkCreate(ratings)

    } catch (err) {
        throw err
    }
    process.exit(0);
}
seedMe()