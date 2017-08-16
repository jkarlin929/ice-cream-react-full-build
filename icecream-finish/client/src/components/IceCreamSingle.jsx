import React, { Component } from 'react';

import axios from 'axios';

import { Link, Redirect } from 'react-router-dom';

class IceCreamSingle extends Component {
  constructor() {
    super();
    this.state = {
      iceCream: null,
      apiDataLoaded: false,
      fireRedirect: false,
    }
    this.deleteIceCream = this.deleteIceCream.bind(this);
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

  deleteIceCream() {
    axios.delete(`/icecream/${this.props.match.params.id}`) 
      .then(res => {
        console.log(res);
        this.setState({
          fireRedirect: true,
        });
      }).catch(err => {
        console.log(err);
      });
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
            <h3>Rating: {this.state.iceCream.rating || 'N/A'}</h3>
          </div>
          <Link to={`/edit/${this.props.match.params.id}`}>Edit</Link>
          <span className="delete" onClick={this.deleteIceCream}>Delete</span>
          {this.state.fireRedirect
          ? <Redirect push to="/ice-cream" />
          : ''}
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

export default IceCreamSingle;