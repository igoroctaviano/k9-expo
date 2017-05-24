/* Dependencies */
import Expo from 'expo';
import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

/* Components */
import Signin from './src/components/pages/signin/Signin';
import Signup from './src/components/pages/signup/Signup';
import Account from './src/components/pages/account/Account';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { isReady: 'true' };
  }

  render() {
    if (this.state.isReady) { return <Signin navigation={this.props.navigation} />; }
    return <Expo.AppLoading />;
  }
}

/* Navigator Routes */
const routes = {
  Signin: { screen: Signin },
  Signup: { screen: Signup },
  Account: { screen: Account },
};
const AppNavigator = StackNavigator({
    ...routes,
    Index: {
      screen: App,
    },
  },
  {
    initialRouteName: 'Index',
  });

Expo.registerRootComponent(AppNavigator);
