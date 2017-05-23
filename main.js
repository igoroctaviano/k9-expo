/* Dependencies */
import Expo from 'expo';
import React, { Component } from 'react';

/* Components */
import Signup from './src/pages/signup/Signup';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { isReady: 'true' };
  }

  render() {
    if (this.state.isReady) { return <Signup />; }
    return <Expo.AppLoading />;
  }
}

Expo.registerRootComponent(App);
