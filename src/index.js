import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function _loadScript(src, callback) {
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.async = true
	script.src = src;
	script.onload = callback;
	document.head.appendChild(script);
}

class Demo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentWillMount() {
		let self = this;
		_loadScript(self.props.url + "/scripts/ajax/bundle.js", function() {
			let app = new window.Simplicite.Ajax(self.props.url, "api", self.props.username, self.props.password);
			console.log(app);
			self.setState(app);
			app.getGrant(function() {
				console.log(app.grant);
				console.log("Signed in as " + app.grant.login);
				self.setState(app);
			});
		});
	}

	render() {
		return (
			<div>{ this.state.grant && this.state.grant.login  ? "Hello " + this.state.grant.login + "!" : "(Loading...)" }</div>
		);

	}
};

ReactDOM.render(
	<Demo url="https://dev40.dev.simplicite.io" username="website" password="simplicite"/>,
	document.getElementById('root')
);
