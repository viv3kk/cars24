import React, { Component,Fragment } from 'react';
import Router from './Router';

import Header from './Components/Header';


class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Router />
      </Fragment>
    );
  }
}

export default App;
