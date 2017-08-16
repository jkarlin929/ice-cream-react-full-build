import React, { Component } from 'react';

import axios from 'axios';

class IceCreamSingle extends Component {
  constructor() {
    super();
    this.state = {
      iceCream: null,
      apiDataLoaded: false,
    }
  }

  componentDidMount() {
    axios.get(`/icecream/${this.props.match.params.id}`)
      .then(res => {
        this.setState({
          apiDataLoaded: true,
          iceCream: res.data.data,
        })
      }).catch(err => console.log(err));
  }

  renderIceCreamOrLoading() {
    if (this.state.apiDataLoaded) {
      return (
        <div className="inner">
          <div className="img">
            <img src={this.state.iceCream.url} alt={this.state.iceCream.flavor} />
          </div>
          <div className="info">
            <h4 className="brand">{this.state.iceCream.brand}</h4>
            <h1>{this.state.iceCream.flavor}</h1>
            <p>{this.state.iceCream.description}</p>
            <h3>Rating: {this.state.iceCream.rating}</h3>
          </div>
        </div>
      )
    } else return <p className="loading">Loading...</p>
  }


  render() {
    return (
      <div className="icecream-single">
        {this.renderIceCreamOrLoading()}
      </div>
    )
  }
}