/*  ___ _            _ _    _ _
 * / __(_)_ __  _ __| (_)__(_) |_ ___
 * \__ \ | '  \| '_ \ | / _| |  _/ -_)
 * |___/_|_|_|_| .__/_|_\__|_|\__\___|
 *             |_|
 * This example is dynamically loading and using the standard Ajax lib
 * from the target instance
 */

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
			var script = document.createElement('script');
			script.type = 'text/javascript';
			script.async = true
			script.src = src;
			script.onload = callback;
			document.head.appendChild(script);
		}

		let self = this;
		// Asynchronously load the Ajax lib bundle...
		loadScript(self.props.url + '/scripts/ajax/bundle.js', function() {
			// ...then instanciate the app from the properties...
			global.app = new window.Simplicite.Ajax(self.props.url, 'api', self.props.username, self.props.password);
			// ...then load the user grant
			global.app.getGrant(function(grant) { self.setState(grant); });
		});
	}

	render() {
		return (
			<div>
				{ this.state.login ? 'Hello ' + this.state.login + '!' : '' }
				{ this.state.login && <DemoProduct/> }
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
		let prd = global.app.getBusinessObject('DemoProduct');
		// Search for products
		prd.search(function() { self.setState(prd); }, null, { inlineThumbs: true });
	}

	render() {
		return (
			<table className='products'>
				<tbody>
					{ this.state.list && this.state.list.map(item =>
					<tr key={ item.row_id }>
						<td><img alt={ item.demoPrdReference } src={ 'data:image/png;base64,' + item.demoPrdPicture.thumbnail }/></td>
						<td>
							<div className='name'>{ item.demoPrdName }</div>
							<div className='reference'>{ item.demoPrdReference }</div>
						</td>
					</tr>
					) }
				</tbody>
			</table>
		);
	}
};

ReactDOM.render(
	<Demo url='https://demo.dev.simplicite.io' username='website' password='simplicite'/>,
	document.getElementById('root')
);
