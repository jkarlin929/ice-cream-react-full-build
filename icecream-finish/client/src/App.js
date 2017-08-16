import React, { Component } from 'react';
import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import axios from 'axios';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import IceCreamList from './components/IceCreamList';
import IceCream from './components/IceCream';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Route exact path="/" component={Home} />
          <Route exact path='/ice-cream' component={IceCreamList} />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
