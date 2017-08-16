import React, { Component } from 'react';

import axios from 'axios';

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
        console.log(res.data);
      })
  }

  render() {
    return (
      <div className="icecream-list">
        <p>Check out all my cool ice creams~</p>
      </div>
    )
  }
}

export default IceCreamList;