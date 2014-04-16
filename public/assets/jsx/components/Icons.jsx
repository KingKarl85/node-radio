/** @jsx React.DOM */
var Icon = React.createClass({
	getDefaultProps:function(){
		return {
			textLeft: '',
			textRight: '',
			className: '',
			spinClass: '',
			text: '',
		}
	},
	render:function(){

		if(this.props.textLeft.length>1){
			this.props.textLeft = this.props.textLeft + ' ';
		}
		if(this.props.textRight.length>1){
			this.props.textRight = ' ' + this.props.textRight;
		}

		var className = this.props.className + " " + this.props.spinClass;

		return (
			<span>{this.props.textLeft}<i className={className}>{this.props.text}</i>{this.props.textRight}</span>
		);
	}
});





var FAIcon = React.createClass({
	getDefaultProps:function(){
		return {
			spin:false
		}
	},
	render:function(){
		var className = "fa fa-" + this.props.type;

		var spinClass = this.props.spin?'fa-spin':'';

		return (
			<Icon className={className} spinClass={spinClass} textRight={this.props.textRight} textLeft={this.props.textLeft} />
		);
	}
});