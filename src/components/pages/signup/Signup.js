/* Dependencies */
import Firebase from 'firebase';
import React, { Component } from 'react';
import { View, Button, Image, TextInput, Text } from 'react-native';

/* Initialize Firebase */
let config = {
  apiKey: "AIzaSyC7gQYzEj0W8A02mETpadftMO-qaKp_x-0",
  authDomain: "ongk9-a4630.firebaseapp.com",
  databaseURL: "https://ongk9-a4630.firebaseio.com/",
  storageBucket: "gs://ongk9-a4630.appspot.com/",
};
Firebase.initializeApp(config);

/* Components */
import Logo from '../../components/logo/Logo';

export default class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isReady: true,
      email: '',
      password: ''
    };
  }

  static navigationOptions = {
    title: 'Cadastrar',
  };

  signup() {
    this.setState({ isReady: false });

    Firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(user_data => {
      alert('Sua conta foi criada!');

      this.setState({
        email: '',
        password: '',
        isReady: true
      });
    }).catch(error => {
      switch (error.code) {
        case "EMAIL_TAKEN":
          alert("Email já cadastrado.");
          break;

        case "INVALID_EMAIL":
          alert("Email inválido.");
          break;

        default: alert("Erro ao criar usuário:");
      }
    });
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
          <Logo />
          <View>
            <TextInput
              placeholder="Email"
              value={this.state.email} />
            <TextInput
              placeholder="Senha"
              value={this.state.password} />
            <Button
              onPress={this.signup.bind(this)}
              title="Entrar"
              color="#841584"
              accessibilityLabel="Clique aqui para efetuar o login." />
          </View>
        </View>
      </View>
    );
  }
}
