/** @jsx React.DOM */
var Button = React.createClass({
	getDefaultProps:function(){
		return {
			style: 'default',
			submit: false,
			block: false,
			loading: false,
			disabled: false,
			loadingText: '',
		}
	},
	render:function(){
		var cx = React.addons.classSet;

		var buttonStyle = ('btn-' + this.props.style);

		var classes = {
			'btn':true,
			'btn-block': this.props.block
		}

		classes[buttonStyle] = true;

		var text = this.props.text;
		if(this.props.loading && this.props.loadingText){
			text = this.props.loadingText
		}

		return (
			<button 
				className={cx(classes)}
				disabled={this.props.loading || this.props.disabled}
				onClick={this.props.onClick}
				type={this.props.submit?'submit':'button'}
			>{text}</button>
		);
	}
});

var ButtonPrimary = React.createClass({
	render:function(){
		return (
			<Button 
				style="primary"
				onClick={this.props.onClick}
				text={this.props.text}
				loadingText={this.props.loadingText}
				block={this.props.block}
				disabled={this.props.disabled}
				loading={this.props.loading}
				submit={this.props.submit}
			/>
		);
	}
});

var ButtonSave = React.createClass({
	render:function(){
		return (
			<ButtonPrimary 
				text={<GlyphIconChevronRight textLeft="Save" />}
				loadingText={<FAIcon textRight="Please wait..." type="spinner" spin="true" />}
				loading={this.props.loading}
				submit="true"
				block="true"
				onClick={this.props.onClick}
			/>
		);
	}
});