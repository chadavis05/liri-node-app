require("dotenv").config();

var Spotify = require("spotify");
var keys = require("./keys.js");
var request = require("request");
var moment = require('moment');
var fs = require("fs");
var userInput = process.argv;
var searchType = userInput[2];
var searchTerm = userInput[3];

switch (searchType) {
    
    case "concert-this":
	concert(searchTerm);
    break;
    
	case "spotify-this-song":
	spotify(searchTerm);
	break;

	case "movie-this":
	movie(searchTerm);
	break;

	case "do-what-it-says":
	doit(searchTerm);
	break;
};

// 'concert-this'
function concert(searchTerm) {

    var queryUrl = "https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp";

    request(queryUrl, function(error, response, body) {
        if (!searchTerm){
            searchTerm = 'Beyonce';
        }
        if (!error && response.statusCode === 200) {
            var results = JSON.parse(body)[0];
            console.log("Venue: " + results.venue.name);
            console.log("Location: " + results.venue.city);
            console.log("Event Date: " + moment(results.datetime).format("MM/DD/YYYY"));

            fs.appendFile('./log.txt', 'User Command: node liri.js movie-this ' + searchTerm + '\n\n', (err) => {
                if (err) throw err;
        });
      }
    });
};
// `spotify-this-song`
function spotify(searchTerm){

    var spotify = Spotify(keys.spotify);
     if  (!searchTerm){
         searchTerm = 'The Sign';
     }

    spotify.search({
        type:'track',
        query: searchTerm}, function(err, data){

        if (err) {
            console.log("Error occurred: " + err);
            return;
        }
        
	fs.appendFile('./log.txt', 'User Command: node liri.js spotify-this-song ' + song + '\n\n', (err) => {
		if (err) throw err;
    });
    })
    };

// 'movie-this
function movie(searchTerm) {

        var queryUrl = "http://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=trilogy";
    
        request(queryUrl, function(error, response, body) {
            if (!searchTerm){
                searchTerm = 'Mr. Nobody';
            }
            if (!error && response.statusCode === 200) {
    
                console.log("Title: " + JSON.parse(body).Title);
                console.log("Release Year: " + JSON.parse(body).Year);
                console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
                console.log("Country: " + JSON.parse(body).Country);
                console.log("Language: " + JSON.parse(body).Language);
                console.log("Plot: " + JSON.parse(body).Plot);
                console.log("Actors: " + JSON.parse(body).Actors);

                fs.appendFile('./log.txt', 'User Command: node liri.js movie-this ' + searchTerm + '\n\n', (err) => {
                    if (err) throw err;
            });
          }
        });
    };
        
  
  // spotifyThisSong(SearchTerm);