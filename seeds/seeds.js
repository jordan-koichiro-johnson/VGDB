const sequelize = require('../config/connection');
const { User, Profile, Game } = require("../models");
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
            imgUrl: "https://en.wikipedia.org/wiki/Halo:_Combat_Evolved#/media/File:Halo_-_Combat_Evolved_(XBox_version_-_box_art).jpg"
        },
        {
            name: "League of Legends",
            description: "League of Legends (LoL), commonly referred to as League, is a 2009 multiplayer online battle arena video game developed and published by Riot Games.",
            imgUrl: "https://en.wikipedia.org/wiki/League_of_Legends#/media/File:League_of_Legends_2019_vector.svg"
        }
    ]
    try {


        await Game.bulkCreate(games)


    } catch (err) {
        throw err
    }
    process.exit(0);
}
seedMe()