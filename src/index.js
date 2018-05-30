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
			let app = new window.Simplicite.Ajax(self.props.url, "api", self.props.username, self.props.password);
			// ...then load the user grant...
			app.getGrant(function() {
				self.setState(app); // Set state to trigger render
				// ...then search for products
				let prd = app.getBusinessObject("DemoProduct");
				prd.search(function() {
					app.products = prd.list; // Put the search result in an "easy(ier)" location in state object
					self.setState(app); // Set state to trigger render
				}, null, { inlineThumbs: true });
			});
		});
	}

	render() {
		return (
			<div>{ this.state.grant && this.state.grant.login ? "Hello " + this.state.grant.login + "!" : "" }
				<ul>
					{ this.state.products && this.state.products.map(item =>
          					<li key={ item.row_id }><img alt={ item.demoPrdReference } src={ "data:" + item.mime + ";base64," + item.demoPrdPicture.thumbnail }/>&nbsp;{ item.demoPrdName }</li>
					) }
				</ul>
			</div>
		);

	}
};

ReactDOM.render(
	<Demo url="https://demo.dev.simplicite.io" username="website" password="simplicite"/>,
	document.getElementById('root')
);
