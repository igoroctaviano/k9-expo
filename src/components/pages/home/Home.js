/* Dependencies */
import * as firebase from "firebase";
import React, { Component } from 'react';
import { View, Button, Text, TextInput } from 'react-native';

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
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#BABAC2' }}>
        <View style={{ width: '90%', height: '90%' }}>
          <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between'}}>
            <Text style={{ fontSize: 20 }}>Olá, Seu ID é: {this.state.uid}</Text>
            <Text style={{ fontSize: 20 }}>Telefone: {this.state.mobile}</Text>
            <TextInput
              onChangeText={(mobileForm) => this.setState({mobileForm})}
              value={this.state.mobileForm} />
            <Button
              onPress={this.saveMobile}
              title="Atualizar Telefone"
              color="#841584"
              accessibilityLabel="Clique aqui para atualizar o telefone." />
            <Button
              onPress={this.logout}
              title="Sair"
              color="#841584"
              accessibilityLabel="Clique aqui para sair." />
            <View>
              <Text style={{ color: 'red', fontWeight: 'bold' }}>{this.state.response}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
