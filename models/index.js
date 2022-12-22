const User = require("./User");
const Profile = require('./Profile');
const Comment = require("./Comment");
const Game = require("./Game");
const Rating = require("./Rating");


User.hasOne(Profile, {
    onDelete: 'CASCADE'
})

Profile.belongsTo(User, {
    onDelete: 'CASCADE'
})

Game.hasMany(Comment, {
    onDelete: "CASCADE"
})

Comment.belongsTo(Game)

User.hasMany(Comment, {
    onDelete: "CASCADE"
})

Comment.belongsTo(User)

Game.hasMany(Rating, {
    onDelete: "CASCADE"
})

Rating.belongsTo(Game)

User.hasMany(Rating, {
    onDelete: "CASCADE"
})

Rating.belongsTo(User)


module.exports = {
    User,
    Profile,
    Game,
    Rating,
    Comment,
}