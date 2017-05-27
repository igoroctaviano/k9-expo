/* Dependencies */
import * as firebase from "firebase";
import React, { Component } from 'react';
import { View, Button, TextInput, Text } from 'react-native';

/* Components */
import Logo from '../../components/logo/Logo';
import RedBox from '../../components/redbox/RedBox';
import Wrapper from '../../components/wrapper/Wrapper';

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      name: '',
      mobile: '',
      isReady: true,
      response: '',
    };

    this.signup = this.signup.bind(this);
  }

  static navigationOptions = { title: 'Cadastrar' };

  async signup() {
    const { navigate } = this.props.navigation;

    try {
      await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);
      this.setState({ response: "Cadastro efetuado com sucesso!" });
      setTimeout(() => navigate('Home'), 1500);
    } catch (error) { this.setState({ response: error.toString() }); }
  }

  render() {
    return (
      <Wrapper>
        <Logo />
        <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between'}}>
          <TextInput
            style={{ fontSize: 20 }}
            placeholder="Email"
            placeholderTextColor="grey"
            onChangeText={(email) => this.setState({email})} />
          <TextInput
            style={{ fontSize: 20 }}
            placeholder="Senha"
            placeholderTextColor="grey"
            onChangeText={(password) => this.setState({password})} />
          <TextInput
            style={{ fontSize: 20 }}
            placeholder="Nome"
            placeholderTextColor="grey"
            onChangeText={(name) => this.setState({name})} />
          <TextInput
            style={{ fontSize: 20 }}
            placeholder="Telefone"
            placeholderTextColor="grey"
            onChangeText={(mobile) => this.setState({mobile})} />
          <Button
            onPress={this.signup}
            title="Entrar"
            color="#841584"
            accessibilityLabel="Clique aqui para efetuar o login." />
          <RedBox message={this.state.response} />
        </View>
      </Wrapper>
    );
  }
}
