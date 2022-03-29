const { User } = require('../models/user.model')
const { Actor } = require('../models/actor.model')
const { ActorInMovie } = require('../models/actorInMovie.model')
const { Movie } = require('../models/movie.model')
const { Review } = require('../models/review.model')


const initModel = () => {
//1 User <-to-> Many Review(s)
    User.hasMany(Review);
    Review.belongsTo(User);
//1 Movie <-to-> Many Review
    Movie.hasMany(Review);
    Review.belongsTo(Movie);
//Many Movies <-to-> Many Actor
    Movie.belongsToMany(Actor, { through: ActorInMovie});
    Actor.belongsToMany(Movie, { through: ActorInMovie});
}

module.exports = { initModel }