let mongoose = require( 'mongoose' );
let uuid = require( 'uuid' );

mongoose.Promise = global.Promise;
/* Tu código va aquí */

let movieSchema = mongoose.Schema({
    film_ID: { type: String },
    film_title: { type: String },
    year: { type : Number },
    rating: { type : Number }
});
let movies = mongoose.model('movies', movieSchema);

let moviesList = {
    getMovies: function () {
        movies.find()
            .then(response => {
                return response;
            })
            .catch(error => {
                throw Error(error);
            });
    },
    addMovie: function (newMovie) {
        movies.create(newMovie)
            .then(response => {
                return response;
            })
            .catch(error => {
                throw Error(error);
            });
    }
};

module.exports = {
    moviesList
};