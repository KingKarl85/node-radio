var Player = require('./player');

var stations = [
	{id:'triplej', name:"TripleJ", url:'http://shoutmedia.abc.net.au:10426/'},
	{id:'dig', name:"Dig Radio", url:'http://shoutmedia.abc.net.au:10428/'},
	{id:'rn', name:"Radio National", url:'http://shoutmedia.abc.net.au:10420/'}
];

function urlById(id){
	for(var i in stations){
		if(stations[i].id == id){
			return stations[i].url;
		}
	}
	return null;
}

function idByUrl(url){
	for(var i in stations){
		if(stations[i].url == url){
			return stations[i].id;
		}
	}
	return null;
}

var player = new Player();

player.on('playing', function(){
	console.log('Now Playing:', this.headers['name'])
});


var express = require('express');
var app = express();

app.use(require('serve-static')("public"));
app.use(require('body-parser')());

app.get("/stations", function(req, res){
	res.json(stations);
});

app.get("/playing", function(req, res){
	var playingUrl = idByUrl(player.url)
	if(!player.playing){
		playingUrl = null;
	}
	res.json(200, {
		playing: playingUrl
	});
});

app.post("/play", function(req, res){
	res.json(200, {
		playing: idByUrl(player.url)
	});
	player.play(urlById(req.body.station));
});

app.post("/stop", function(req, res){
	res.json(201)
	player.stop();
});

var server = app.listen(9000, function() {
    console.log('Listening on port %d', server.address().port);
});