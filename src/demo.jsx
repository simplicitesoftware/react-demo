import simplicite from 'simplicite';
import * as React from 'react';
import DemoProduct from './demoproduct.jsx'; // eslint-disable-line no-unused-vars

export default class Demo extends React.Component {
  constructor(props) {
    super(props);
    window.app = simplicite.session({
      url: props.url,
      username: props.username,
      password: props.password,
      debug: false
    });
    window.app.info(`Version: ${window.app.getModuleVersion()}`);
    window.app.debug(window.app.parameters);
    this.state = {};
  }

  async componentDidMount() {
    try {
      const user = await window.app.login();
      window.app.info(`Logged in as ${user.login}`);
      const grant = await window.app.getGrant({ inlinePicture: true });
      window.app.debug(grant);
      this.setState(grant);
    } catch(err) {
      window.app = undefined;
      this.setState({ error: err.message });
    };
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