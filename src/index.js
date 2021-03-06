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
		global.app.login().then(params => {
			console.log('Logged in as ' + params.username);
			global.app.getGrant({ inlinePicture: true }).then(grant => {
				self.setState(grant);
			});
		}).catch(err => {
			global.app = undefined;
			self.setState({ error: err.message });
		});
	}

	render() {
		return (
			<div>
				{ this.state.error && <div className='error'>Error: { this.state.error }</div> }
				{ this.state.login && <div>Hello { this.state.login }!</div> }
				{ this.state.login && <DemoProduct/> }
			</div>
		);
	}
}

class DemoProduct extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentWillMount() {
		let self = this;
		let prd = global.app.getBusinessObject('DemoProduct');
		prd.search(null, { inlineDocuments: [ 'demoPrdPicture' ] }).then(list => {
			self.setState({ list: list });
		});
	}

	render() {
		return (
			<ul>
				{ this.state.list && this.state.list.map(item =>
				<li key={ item.row_id }>
					<img alt={ item.demoPrdReference } src={ 'data:' + item.demoPrdPicture.mime + ';base64,' + item.demoPrdPicture.content }/>
					<h1 className='name'>{ item.demoPrdName }</h1>
					<h2 className='reference'>{ item.demoPrdReference }</h2>
					<p className='description'>{ item.demoPrdDescription }</p>
				</li>
				) }
			</ul>
		);
	}
}

ReactDOM.render(
	<Demo url='https://demo.dev.simplicite.io' username='website' password='simplicite'/>,
	document.getElementById('react-demo-products')
);
