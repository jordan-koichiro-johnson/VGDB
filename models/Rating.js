const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Rating extends Model { }

Rating.init({
    ratingNum: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }, content: {
        type: DataTypes.TEXT
    }
}, {
    sequelize,
})

module.exports = Rating