let express = require( 'express' );
let bodyParser = require( 'body-parser' );
let mongoose = require( 'mongoose' );
let jsonParser = bodyParser.json();
let { DATABASE_URL, PORT } = require('./config');
let movieList= require('./model.js');
let uuid = require('uuid');

let app = express();

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
	res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
	if (req.method === "OPTIONS") {
		return res.send(204);
	}
	next();
});

/* Tu código va aquí */
//Endpoint #1 GET: /api/moviedex
app.get('/api/moviedex', (req, res) => {
    console.log("e");
    movieList.getMovies()
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(error => {
            res.statusMessage("Cannot obtain movies");
            return res.status(500).send();
        });
});

//Endpoint #2 POST: /api/moviedex
app.post('/api/moviedex', jsonParser, (req, res) => {
    let title = req.body.film_title;
    let year = req.body.year;
    let rating = req.body.rating;

    if ((title && title !== '')
        || (year && year !== '')
        || (rating && rating !== '')) {
        let newMovie = {
            film_ID: uuid.v4,
            film_title: title,
            year: year,
            rating: rating
        };
        movieList.addMovie(newMovie)
            .then(response => {
                return res.status(201).json({ response });
            })
            .catch(err => {
                res.statusMessage('Unable to add movie');
                return res.status(400).send();
            });
    }
    else {
        res.statusMessage('Valores invalidos');
        return res.status(406).send();
    }
});


let server;

function runServer( port, databaseUrl ){
	return new Promise( (resolve, reject ) => {
		mongoose.connect( databaseUrl,  { useNewUrlParser: true, useUnifiedTopology: true  }, response => {
			if ( response ){
				return reject( response );
			}
			else{
				server = app.listen(port, () => {
					console.log( "App is running on port " + port );
					resolve();
				})
				.on( 'error', err => {
					mongoose.disconnect();
					return reject(err);
				})
			}
		});
	});
}

function closeServer(){
	return mongoose.disconnect()
		.then( () => {
			return new Promise( (resolve, reject) => {
				console.log( 'Closing the server' );
				server.close( err => {
					if ( err ){
						return reject( err );
					}
					else{
						resolve();
					}
				});
			});
		});
}
runServer( PORT, DATABASE_URL );

module.exports = { 
    app, 
    runServer, 
    closeServer 
}