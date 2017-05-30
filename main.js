/* Dependencies */
import Expo from 'expo';
import React, { Component } from 'react';
import { Platform, StatusBar } from 'react-native';
import { StackNavigator } from 'react-navigation';

/* Components */
import Signin from './src/components/pages/signin/Signin';
import Signup from './src/components/pages/signup/Signup';
import Home from './src/components/pages/home/Home';
import Edit from './src/components/pages/home/Edit';
import DogEdit from './src/components/pages/dog/DogEdit';
import DogsList from './src/components/pages/dog/DogsList';

/* Database */
import Firebase from "./src/database/Firebase";

class App extends Component {
  constructor(props) {
    super(props);

    Firebase.initialise();

    this.state = { isReady: 'true' };
  }

  render() {
    if (this.state.isReady) { return <AppNavigator
                                        style={{ paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight }} />; }
    return <Expo.AppLoading />;
  }
}

/* Navigation Routes */
const routes = {
  Signin: { screen: Signin },
  Signup: { screen: Signup },
  Home: { screen: Home },
  Edit: { screen: Edit },
  DogEdit: { screen: DogEdit },
  DogsList: { screen: DogsList }
};
const AppNavigator = StackNavigator(
    { ...routes, Index: { screen: Signin } },
    { initialRouteName: 'Index' });

Expo.registerRootComponent(App);
