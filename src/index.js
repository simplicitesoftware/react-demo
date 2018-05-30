import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Demo extends React.Component {
	constructor(props) {
		super(props);
		this.url = props.url || "https://demo.dev.simplicite.io/api";
		this.username = props.username || "designer";
		this.password = props.password || "designer";
	}

	render() {
		return (
			<div>
				URL: {this.url}<br/>
				Username/password: {this.username}/{this.password}
			</div>
		);

	}
};

ReactDOM.render(
	<Demo username="website" password="simplicite"/>,
	document.getElementById('root')
);
