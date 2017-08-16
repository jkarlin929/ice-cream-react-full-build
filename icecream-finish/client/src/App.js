import React, { Component } from 'react';
import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import IceCreamList from './components/IceCreamList';
import IceCreamSingle from './components/IceCreamSingle';
import IceCreamAddForm from './components/IceCreamAddForm';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Route exact path="/" component={Home} />
          <Route exact path="/ice-cream" component={IceCreamList} />
          <Route exact path="/ice-cream/:id" component={IceCreamSingle} />
          <Route exact path="/add" component={IceCreamAddForm} />
          <Route exact path="/edit/:id" component={IceCreamAddForm} />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
