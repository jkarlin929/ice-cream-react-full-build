import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import IceCreamList from './components/IceCreamList';
import IceCreamSingle from './components/IceCreamSingle';
import IceCreamAddForm from './components/IceCreamAddForm';
import IceCreamEditForm from './components/IceCreamEditForm';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <div className="container">
          <Switch>
          <Route path="/icecream/:id" component={IceCreamSingle} />
          <Route path='/icecream' component={IceCreamList} />
          <Route path="/add" component={IceCreamAddForm} />
          <Route path='/edit/:id' component={IceCreamEditForm} />
          <Route path='/' component={Home} />
          </Switch>
          </div>
          <Footer />
        </div>
    </Router>
    );
  }
}

export default App;