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
	justDoIt();
	break;
};

// concert-this
function concert(searchTerm) {

    var queryUrl = "https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp";

    request(queryUrl, function(error, response, body) {
        if (!searchTerm){
            searchTerm = 'Beyonce';
        }
        if (!error && response.statusCode === 200) {
            var results = JSON.parse(body);
            // console.log(results);

            for (i=0; i < results.lenght; i++);{
            console.log("Venue: " + results[i].venue.name);
            console.log("Location: " + results[i].venue.city);
            console.log("Event Date: " + moment(results[i].datetime).format("MM/DD/YYYY"));
            };
            
            fs.appendFile('./log.txt', 'User Command: node liri.js movie-this ' + searchTerm + '\n\n', (err) => {
                if (err) throw err;
        });
      }
    });
};
// spotify-this-song
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

// movie-this
function movie(searchTerm) {

        var queryUrl = "http://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=trilogy";
    
        request(queryUrl, function(error, response, body) {
            if (!searchTerm){
                searchTerm = 'Mr. Nobody';
            }
            if (!error && response.statusCode === 200) {
                var results = JSON.parse(body); 
                console.log("Title: " + results.Title);
                console.log("Release Year: " + results.Year);
                console.log("IMDB Rating: " + results.imdbRating);
                console.log("Rotten Tomatoes Rating: " + results.Ratings[1].Value);
                console.log("Country: " + results.Country);
                console.log("Language: " + results.Language);
                console.log("Plot: " + results.Plot);
                console.log("Actors: " + results.Actors);

                fs.appendFile('./log.txt', 'User Command: node liri.js movie-this ' + searchTerm + '\n\n', (err) => {
                    if (err) throw err;
            });
          }
        });

    };


function justDoIt() {
        fs.readFile('random.txt', "utf8", function(error, data){
        
               if (error) {
                  return console.log(error);
                  }
                var dataArray = data.split(",");
                  // console.log(dataArray);
        
                if (dataArray[0] === "concert-this") {
                    var checkConcert = dataArray[1].slice(1, -1);
                    concert(checkConcert);
                } else if (dataArray[0] === "spotify-this-song") {
                    var checkSong = dataArray[1].slice(1, -1);
                    spotify(checkSong);
                } else if(dataArray[0] === "movie-this") {
                    var movie_name = dataArray[1].slice(1, -1);
                    movie(movie_name);
                }
          });
    };
        
  