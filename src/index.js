import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Demo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentWillMount() {
		function loadScript(src, callback) {
			var script = document.createElement("script");
			script.type = "text/javascript";
			script.async = true
			script.src = src;
			script.onload = callback;
			document.head.appendChild(script);
		}

		let self = this;
		// Asynchronously load the Ajax lib bundle...
		loadScript(self.props.url + "/scripts/ajax/bundle.js", function() {
			// ...then instanciate the app from the properties...
			window.app = new window.Simplicite.Ajax(self.props.url, "api", self.props.username, self.props.password);
			// ...then load the user grant
			window.app.getGrant(function() { self.setState(window.app); });
		});
	}

	render() {
		return (
			<div>
				{ this.state.grant ? "Hello " + this.state.grant.login + "!" : "" }
				{ this.state.grant && <DemoProduct/> }
			</div>
		);

	}
};

class DemoProduct extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentWillMount() {
		let self = this;
		let prd = window.app.getBusinessObject("DemoProduct");
		// Search for products
		prd.search(function() { self.setState(prd); }, null, { inlineThumbs: true });
	}

	render() {
		return (
			<table class="product">
				<tbody>
					{ this.state.list && this.state.list.map(item =>
					<tr key={ item.row_id }>
						<td><img alt={ item.demoPrdReference } src={ "data:" + item.mime + ";base64," + item.demoPrdPicture.thumbnail }/></td>
						<td>
							<div class="name">{ item.demoPrdName }</div>
							<div class="reference">{ item.demoPrdReference }</div>
						</td>
					</tr>
					) }
				</tbody>
			</table>
		);
	}
};

ReactDOM.render(
	<Demo url="https://demo.dev.simplicite.io" username="website" password="simplicite"/>,
	document.getElementById('root')
);
