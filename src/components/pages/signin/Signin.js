/* Dependencies */
import Firebase from 'firebase';
import React, { Component } from 'react';
import { View, TextInput, Button, Image, AsyncStorage } from 'react-native';

/* Components */
import Logo from '../../components/logo/Logo';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      isReady: false,
    };
  }

  static navigationOptions = {
    title: 'Entrar',
  };

  signin() {
    this.setState({ isReady: false });

    Firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(user_data => {
      this.setState({ isReady: true });

      AsyncStorage.setItem('user_data', JSON.stringify(user_data));
    }).catch(error => alert('A tentativa de Login falhou. Por favor, tente novamente.'));
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#BABAC2' }}>
        <View style={{ width: '90%', height: '90%' }}>
          <Logo />
          <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between'}}>
            <TextInput
              style={{ fontSize: 20 }}
              placeholder="Email"
              placeholderTextColor="grey"
              value={this.state.email} />
            <TextInput
              style={{ fontSize: 20 }}
              placeholder="Senha"
              placeholderTextColor="grey"
              value={this.state.password} />
            <Button
              onPress={this.signin.bind(this)}
              title="Entrar"
              color="#841584"
              accessibilityLabel="Clique aqui para efetuar o login." />
            <Button
              onPress={() => navigate('Signup', { email: this.state.email })}
              title="Cadastrar"
              color="#841584"
              accessibilityLabel="Ainda não possui conta? Clique aqui para fazer seu cadastro." />
          </View>
        </View>
      </View>
    );
  }
}
