import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Demo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentWillMount() {
		function _loadScript(src, callback) {
			var script = document.createElement("script");
			script.type = "text/javascript";
			script.async = true
			script.src = src;
			script.onload = callback;
			document.head.appendChild(script);
		}

		let self = this;
		_loadScript(self.props.url + "/scripts/ajax/bundle.js", function() {
			let app = new window.Simplicite.Ajax(self.props.url, "api", self.props.username, self.props.password);
			app.getGrant(function() {
				self.setState(app);
				let prd = app.getBusinessObject("DemoProduct");
				prd.search(function() {
					app.products = prd.list;
					console.log(app.products);
					self.setState(app);
				});
			});
		});
	}

	render() {
		return (
			<div>{ this.state.grant && this.state.grant.login ? "Hello " + this.state.grant.login + "!" : "" }
				<ul>
					{ this.state.products && this.state.products.map(item =>
          					<li key={ item.row_id }>{ item.demoPrdName }</li>
					) }
				</ul>
			</div>
		);

	}
};

ReactDOM.render(
	<Demo url="https://dev40.dev.simplicite.io" username="website" password="simplicite"/>,
	document.getElementById('root')
);
