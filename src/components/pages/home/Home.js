/* Dependencies */
import * as firebase from "firebase";
import React, { Component } from 'react';
import { View, Button, Text } from 'react-native';

/* Database */
import Database from "../../../database/Database";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: '',
      mobile: "",
      isReady: false,
      response: '',
    };

    this.logout = this.logout.bind(this);
    this.saveMobile = this.saveMobile.bind(this);
  }

  static navigationOptions = { title: 'Bem-vindo ' /* + this.props.user.name */ };

  async componentDidMount() {
    try {
      // Get User Credentials
      let user = await firebase.auth().currentUser;

      // Listen for Mobile Changes
      Database.listenUserMobile(user.uid, (mobileNumber) => {
        this.setState({
          mobile: mobileNumber,
          mobileForm: mobileNumber,
        });
      });

      this.setState({ uid: user.uid });
    } catch (error) { alert(error); }
  }

  saveMobile() {
    // Set Mobile
    if (this.state.uid && this.state.mobileForm) {
      Database.setUserMobile(this.state.uid, this.state.mobileForm);
    }
  }

  async logout() {
    const { navigate } = this.props.navigation;

    try {
      await firebase.auth().signOut();
      navigate('Home');
    } catch (error) { alert(error); }
  }

  render() {
    return (
      <View>
        <Text>Olá, Seu ID é: {this.state.uid}</Text>
        <Text>Telefone: {this.state.mobile}</Text>
        <Button
          onPress={this.logout}
          title="Sair"
          color="#841584"
          accessibilityLabel="Clique aqui para sair." />
      </View>
    );
  }
}
