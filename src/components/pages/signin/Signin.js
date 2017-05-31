/* Dependencies */
import * as firebase from "firebase";
import React, { Component } from 'react';
import { View, TextInput, Button } from 'react-native';

/* Components */
import Logo from '../../components/logo/Logo';
import RedBox from '../../components/redbox/RedBox';
import Wrapper from '../../components/wrapper/Wrapper';

export default class Signin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      response: '',
    };

    this.signin = this.signin.bind(this);
  }

  async signin() {
    const { email, password } = this.state;

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      setTimeout(() => this.props.navigation.navigate('Home'), 1500);
    } catch (error) { this.setState({ response: error.toString() }); }
  }

  render() {
    const { email, response } = this.state;

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
          <Button
            onPress={this.signin}
            title="Entrar"
            color="#841584"
            accessibilityLabel="Clique aqui para efetuar o login." />
          <Button
            onPress={() => this.props.navigation.navigate('Signup', { email: email })}
            title="Cadastrar"
            color="#841584"
            accessibilityLabel="Ainda não possui conta? Clique aqui para fazer seu cadastro." />
          <RedBox message={response} />
        </View>
      </Wrapper>
    );
  }
}
