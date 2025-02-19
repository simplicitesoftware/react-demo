/*  ___ _            _ _    _ _
 * / __(_)_ __  _ __| (_)__(_) |_ ___
 * \__ \ | '  \| '_ \ | / _| |  _/ -_)
 * |___/_|_|_|_| .__/_|_\__|_|\__\___|
 *             |_|
 * This example is using the Simplicite node.js & browser JavaScript API
 */
import * as React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import simplicite from 'simplicite';
import './index.css';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    global.app = simplicite.session({
      url: props.url,
      username: props.username,
      password: props.password,
      debug: false
    });
    global.app.info('Version: ' + simplicite.constants.MODULE_VERSION);
    global.app.debug(app.parameters);
    this.state = {};
  }

  async componentDidMount() {
    try {
      const user = await global.app.login();
      console.info('Logged in as ' + user.login);
      const grant = await global.app.getGrant({ inlinePicture: true });
      global.app.debug(grant);
      this.setState(grant);
    } catch(err) {
      global.app = undefined;
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

class DemoProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    let self = this;
    let prd = global.app.getBusinessObject('DemoProduct');
    const list = await prd.search(null, { inlineDocuments: [ 'demoPrdPicture' ] });
    global.app.debug(list);
    self.setState({ list: list });
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

// Explicit URL needed for a standalone deployment, remove it when deploying in Simplicité
ReactDOMClient.createRoot(document.getElementById('react-demo-products')).render(<Demo url='https://demo.dev2.simplicite.io' username='website' password='simplicite'/>);
