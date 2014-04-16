var lame = require('lame');
var icecast = require('icecast');
var Speaker = require('speaker');
// var util = require('util');
var events = require('events');
var _ = require('lodash');

var speaker = null;
var decoder = null;
var station = null;
var playing = null;

function stop(){
	if(speaker){
		speaker.end();
	}
	if(decoder){
		decoder.end();
	}
	if(station){
		station.destroy();
	}
	speaker = null;
	decoder = null;
	station = null;
	playing = null;
}

var Player = function(url, options){
	this.headers = null;
	this.url = url;
	this.playing = false;

	if(options && options.autoplay){
		this.play();
	}
};

Player.prototype = {
	play:function(url){
		this.url = url || this.url;
		
		//stop any existing players
		stop();
		playing = this;
		var self = this;
		if(this.url){
			
			// connect to the remote stream
			station = icecast.get(this.url, function (res) {

				if(playing === self){
					// log the HTTP response headers
					self.headers = {};
					_.each(res.headers, function(item, key){
						if(key.substring(0,4) == 'icy-'){
							key = key.substring(4);
						}
						self.headers[key] = item;
					});

					// log any "metadata" events that happen
					res.on('metadata', function (metadata) {
					var parsed = icecast.parse(metadata);
						self.emit('metadata', metadata);
					});

					speaker = new Speaker();
					decoder = new lame.Decoder();
					decoder.pipe(speaker);

					// Let's play the music (assuming MP3 data).
					// lame decodes and Speaker sends to speakers!
					res.pipe(decoder);
					self.playing = true;

					self.emit('playing');
				}
			});

			station.on('error', function(err){
				if(playing === self){
					self.playing = false;
					console.log(err)
				}
			});
		}

		return this;
	},
	stop:function(){
		stop();
		this.playing = false;
	}
};

Player.prototype.__proto__ = events.EventEmitter.prototype;

Player.play = function(url){
	return new Player().play(url);
};

module.exports = Player;