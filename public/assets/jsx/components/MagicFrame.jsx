/** @jsx React.DOM */

var Css = React.createClass({
    render:function(){
        return (
            <link type="text/css" rel="stylesheet" href={this.props.src} />
        );
    }
});

var JavaScript = React.createClass({
   render:function(){
        return (
            <script type="text/javascript" src={this.props.src} />
        );
    }
});

var MagicFrame = React.createClass({
    render: function() {
        return <iframe style={{border: 'none'}} />;
    },
    componentDidMount: function() {
        if(this.props.head){
            React.renderComponent(this.props.head, this.getDOMNode().contentDocument.head);
        }
        React.renderComponent(this.props.children, this.getDOMNode().contentDocument.body);
    },
    componentDidUpdate: function() {
        React.renderComponent(this.props.children, this.getDOMNode().contentDocument.body);
    },
    componentWillUnmount: function() {
    	if(this.props.head){
	    	React.unmountComponentAtNode(this.getDOMNode().contentDocument.head);
	    }
        React.unmountComponentAtNode(this.getDOMNode().contentDocument.body);
    }
});