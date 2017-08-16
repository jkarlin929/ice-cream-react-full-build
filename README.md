# Connecting React and Express!

### Learning Objectives

- Build an app about ice cream!
- Practice setting up a React frontend with an Express backend
- Implement full CRUD functionality into our React app
- Profit??? 🍦

### IN THIS REPOSITORY ARE THE FOLLOWING THINGS!

- This beautiful readme ✨
- An ice cream API, built with Express (`icecream-begin`)
- That same ice cream API, this time with a React frontend (`icecream-final`)

### WE'RE GONNA DO SOME THINGS!

- Add a React app to serve as the frontend for our Express app
- Create, edit, and delete ice cream records from the database
- Use React Router to handle the different components that are rendered
- Have a really excellent time looking at ice cream

# Step -1: Setting up your environment

- Within the Express app `icecream-begin` run `yarn install` (NOT `npm install!!`)
    - Sidebar: It's best during a project to only use one or the other. This project was initialized using `yarn`, so we need to run `yarn install` to install the dependencies.
- Create a database `icecream_dev` in psql
- Run the migration and the seed file (`icecream.sql`) using `psql -f`.
- In `app.js` change the port from `3000` to `3001`.
- Start the Express app using `yarn dev`!

# Step 0: Setting up the React app

We want our Express app to serve our React app. While it's possible to have the react app and the express app be totally separate, it's neater and easier to control to put them in the same place.

- Run `create-react-app client`. It's customary to name the frontend section of your app `client`.
- cd into `client` and run `yarn add axios react-router-dom`, we're going to need to use both of them.
- In `client/package.json`, add this line at the bottom: `"proxy": "https://localhost:3001"`. This allows us to make requests from the frontend to the backend, since they're running on different ports right now. Eventually, we will have the Express app serving the React app, but we want the handy React developer server and its "hot reloading".
- Run `yarn start` to start the react app.

Now we should have an Express app and a React app running at the same time!

# Step 1: Setting up our initial components

- Within the React app, create a `src/components` folder. Then, create the following components (right now, we're just going to work on `Header` and `Footer`:
    - Header
    - Footer
    - IceCreamList
    - IceCream
    - IceCreamAddForm
    - IceCreamEditForm
    - Home

In our `App.js`, we want to get rid of all the React boilerplate. We're going to use Router in this app, so the first thing we need to do that is just wrap the entire app in `<Router>`.

```jsx
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          
          <Footer />
        </div>
      </Router>
    );
  }
}
```

We also need to set up the links in our `Header` component:

```jsx
      <nav>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/ice-cream'>Ice Cream</Link></li>
        </ul>
      </nav>
```

And create our `Footer` component.

At this point, this is what our three components look like:

<details>
<summary>App.js</summary>

```jsx
import React, { Component } from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Header from './components/Header';
import Footer from './components/Footer';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />

          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;

```
</details>

<details>
<summary>Header</summary>

```jsx
import React from 'react';

import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <div className='logo'>
        DeLorean Ice Cream!
      </div>
      <nav>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/ice-cream'>Ice Cream</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header;
```

</details>

<details>
<summary>Footer.jsx</summary>

```jsx
import React from 'react';

const Footer = () => {
  return (
    <footer>
      Made with ❤️ by WDI DeLorean
    </footer>
  )
}

export default Footer;
```

</details>

## 🚀 LAB!

Get your `icecream-begin` app to look like the one we've been working on!

# Step 2: Create our `Home`, `IceCreamList`, and `IceCream` components (and the applicable `Routes`)

Our `Home` page is going to be pretty basic, just a stateless functional component:

```jsx

import React from 'react';

const Home = () => {
  return (
    <div className="home">
      <h1>Ice Cream</h1>
      <h3>It is the best dessert!</h3>
    </div>
  )
}

export default Home;

```

Then, in between the Header and Footer in our App component's `render` method, we need to add the applicable route:

```jsx
<Route exact path='/' component={Home} />
```

Next, we should create the `IceCreamList` component. It's going to look pretty similar to the `QuoteList` component. The API call in `componentDidMount` is going to look like this:

```js
componentDidMount() {
  axios.get('/icecream')
    .then(res => {
      this.setstate({
        apiData: res.data.data,
        apiDataLoaded: true,
      })
    })
}
```

Then, we just need to map through the data and render a bunch of `IceCream` components:

```jsx
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
```

We also need to create the `IceCream` component. It'll have all the details about the ice cream as well as a link to the ice cream's individual page.

Finally, we need to add the route in `App.js`.

```jsx
<Route exact path='/ice-cream' component={IceCreamList} />
```

<details>
<summary>IceCreamList.jsx</summary>

```jsx
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
```
</details>

<details>
<summary>IceCream.jsx</summary>

```jsx
import React from 'react';

import { Link } from 'react-router-dom';

const IceCream = (props) => {
  return (
    <div className="ic-inlist">
      <img src={props.icecream.url} />
      <h2>{props.icecream.flavor}</h2>
      <p>Rating: {props.icecream.rating || 'N/A'}</p>
      <Link to={`/ice-cream/${props.icecream.id}`}>See More</Link>
    </div>
  )
}

export default IceCream;
```

</details>

# Step 3: Add the Single Ice Cream component

