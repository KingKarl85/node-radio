/** @jsx React.DOM */

var Player = function(){
	this.playing = null;
	this.stations = [];
	setInterval(this.getStations.bind(this), 30000);
	setInterval(this.updatePlaying.bind(this), 5000);
	this.getStations();
	this.updatePlaying();
}

Player.prototype = _.extend({
	play:function(id){
		$.ajax({
			url: '/play',
			type: 'POST',
			contentType:'application/json',
			data: JSON.stringify({
				station: id
			}),
			dataType:'json'
		}).then(function(response){
			this.playing = id;
			this.trigger("change", this.playing);
		}.bind(this), function(err){
			this.trigger("change", this.playing);
		}.bind(this));
	},
	stop:function(){
		$.ajax({
			url: '/stop',
			type: 'POST',
			contentType:'application/json',
			data: JSON.stringify({}),
			dataType:'json'
		}).then(function(response){
			this.playing = null;
			this.trigger("change", this.playing);
		}.bind(this), function(err){
			this.trigger("change", this.playing);
		}.bind(this));
	},
	getStations:function(){
		$.ajax({
			url: '/stations',
			type: 'GET',
		}).then(function(response){
			this.stations = response;
			this.trigger("change", this.playing);
		}.bind(this));
	},
	updatePlaying:function(){
		$.ajax({
			url: '/playing',
			type: 'GET',
		}).then(function(response){
			this.playing = response.playing;
			this.trigger("change", this.playing);
		}.bind(this));
	}
}, Backbone.Events);



var Row = React.createClass({
	getInitialState:function(){
		return {
			hover:false
		}
	},
	isPlaying:function(){
		return this.props.player.playing == this.props.station.id;
	},
	clickHandler:function(){
		if(this.isPlaying()){
			this.props.player.stop();
		}
		else{
			this.props.player.play(this.props.station.id);
		}
	},
	hoverStart:function(){
		this.setState({hover:true});
	},
	hoverEnd:function(){
		this.setState({hover:false});
	},
	render:function(){

		return (<tr onClick={this.clickHandler} onTouchEnd={this.clickHandler} onMouseEnter={this.hoverStart} onMouseLeave={this.hoverEnd}>
			<td>
			{this.state.hover?
				<a href="#">{this.isPlaying() ? <GlyphIconStop /> : <GlyphIconPlay />}</a>:
				this.isPlaying()?<GlyphIconVolumeUp />:''
			}
			</td>
			<td colSpan="2">{this.props.station.name}</td>
		</tr>);
	}
});


var App = React.createClass({

	render: function() {
		var title = "Now Playing: ";
		
		if(this.props.player.playing){
			_.each(this.props.stations, function(station){
				if(station.id == this.props.player.playing){
					title+= station.name;
				}
			}.bind(this));
		};

									// <form action="" method="post" role="form">
									// 	<input type="search" className="form-control input-sm" placeholder="Search Stations ..." autoFocus="true" />
									// </form>
		return (
			<div className="container">
				<div className="row">

					<div className="col-xs-12 col-md-6 col-md-offset-3">
						<h1>sPlayer</h1>
						<p>{title}</p>
						<table className="table table-striped table-hover">
							<thead>
								<tr>
									<th className="col-md-1">&nbsp;</th>
									<th className="col-md-3">Station</th>
									<th className="col-md-8">
									</th>
								</tr>
							</thead>
							<tbody>
								{
									_.map(this.props.stations, function(station){
										return (
											<Row station={station} player={this.props.player} />
										);
									}.bind(this))
								}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		);
	}
});

var player = new Player();

player.on('change', function(){
	React.renderComponent(<App player={player} stations={player.stations}/>, document.body);
});



