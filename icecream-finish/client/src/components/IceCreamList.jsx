import React, { Component } from 'react';

import axios from 'axios';

import IceCream from './IceCream';

class IceCreamList extends Component {
  constructor() {
    super();
    this.state = {
      apiDataLoaded: false,
      apiData: null,
    }

  }

  componentDidMount() {
    axios.get('/icecream')
      .then(res => {
        this.setState({
          apiDataLoaded: true,
          apiData: res.data.data,
        })
      })
  }

  renderIceCreams() {
    if (this.state.apiDataLoaded) {
      return this.state.apiData.map(icecream => {
        return (
          <IceCream key={icecream.id} icecream={icecream} />
        );
      });
    } else return <p>Loading...</p>
  }

  render() {
    return (
      <div className="icecream-list">
        {this.renderIceCreams()}
      </div>
    )
  }
}

export default IceCreamList;