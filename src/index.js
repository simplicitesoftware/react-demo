/*  ___ _            _ _    _ _       
 * / __(_)_ __  _ __| (_)__(_) |_ ___ 
 * \__ \ | '  \| '_ \ | / _| |  _/ -_)
 * |___/_|_|_|_| .__/_|_\__|_|\__\___|
 *             |_|                    
 * This example is using the Simplicite node.js & browser JavaScript API
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Simplicite from 'simplicite';
import './index.css';

class Demo extends React.Component {
	constructor(props) {
		super(props);
		global.app = Simplicite.session({
			url: props.url,
			username: props.username,
			password: props.password,
			debug: false
		});
		this.state = {};
	}

	componentWillMount() {
		let self = this;
		global.app.login().then(function(params) {
			console.log('Logged in as ' + params.username);
			return global.app.getGrant({ inlinePicture: true }).then(function(grant) {
				self.setState(grant);
			});
		}).fail(function(reason) {
			global.app = undefined;
			self.setState({ error: 'Login failed (status: ' + reason.status + ', message: ' + reason.message + ')' });
		});
	}

	render() {
		return (
			<div>
				{ this.state.error && 'Error: ' + this.state.error }
				{ this.state.login && 'Hello ' + this.state.login + '!' }
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
		prd.search(null, { inlineThumbs: true }).then(function(list) {
			self.setState({ list: list });
		});
	}

	render() {
		return (
			<table id='products'>
				<tbody>
					{ this.state.list && this.state.list.map(item =>
					<tr key={ item.row_id }>
						<td><img alt={ item.demoPrdReference } src={ 'data:image/png;base64,' + item.demoPrdPicture.thumbnail }/></td>
						<td>
							<div className='name'>{ item.demoPrdName }</div>
							<div className='reference'>{ item.demoPrdReference }</div>
							<div className='description'>{ item.demoPrdDescription }</div>
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
