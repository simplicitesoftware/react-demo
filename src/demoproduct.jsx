import * as React from 'react';
import Demo from './demo.jsx'; // eslint-disable-line no-unused-vars

export default class DemoProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    let self = this;
    let prd = window.app.getBusinessObject('DemoProduct');
    const list = await prd.search(null, { inlineDocuments: [ 'demoPrdPicture' ] });
    window.app.debug(list);
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