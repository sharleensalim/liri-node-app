// storing dependencies as variables
var keys = require('./keys.js');
var fs = require('fs');
var twitter = require('twitter');
var twitterKeys = keys.twitterKeys;
var spotify = require('spotify');
var request = require('request');

var command = process.argv[2];
var commandArg = process.argv[3];

// make it so liri.js can take in one of the following commands (my-tweets, spotify-this-song, movie-this, do-what-it-says)
// switch statement
switch(command) {
	case "my-tweets": 
		getTweets();
		break;

	case "spotify-this-song": 
		mySpotify(commandArg);
		break;

	case "do-what-it-says":
		doWhatItSays();
		break;

	default:
		console.log("Please enter a command")
}

// Twitter Function
var getTweets = function() {
	var client = new twitter(keys.twitterKeys);

	var params = {
		screen_name: 'sharleensalim',
		count: 20
	};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		for (var i = 0; i < tweets.length; i++) {
			console.log(tweets[i].created_at)
			console.log(tweets[i].text);
		}
	}
}

// Spotify Function
var spotifySong = function(songName) {
	if (songName === undefined) {
		songName = 'The Sign';
	};
	  spotify.search({ type: 'track', query: songName }, function(err, data) {
    if (err) {
      console.log('Error occurred: ' + err);
      return;
    }

    var songs = data.tracks.items;

    for (var i = 0; i < songs.length; i++) {
		console.log('Song: ' + data.tracks.items[0].name);
		console.log('Artist: ' + data.tracks.items[0].artists[0].name);
		console.log('Preview Link: ' + data.tracks.items[0].preview_url);
		console.log('Album Title: ' + data.tracks.items[0].album.name);
  };
});

	  
