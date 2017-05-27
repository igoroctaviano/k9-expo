/* Dependencies */
import Expo from 'expo';
import * as firebase from "firebase";
import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

/* Components */
import Signin from './src/components/pages/signin/Signin';
import Signup from './src/components/pages/signup/Signup';
import Home from './src/components/pages/home/Home';

/* Database */
import Firebase from "./src/database/Firebase";

class App extends Component {
  constructor(props) {
    super(props);

    Firebase.initialise();

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
  Home: { screen: Home },
};
const AppNavigator = StackNavigator({ ...routes, Index: { screen: App } }, { initialRouteName: 'Index' });

Expo.registerRootComponent(AppNavigator);
