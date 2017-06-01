/* Dependencies */
import * as firebase from "firebase";
import React, { Component } from 'react';
import { View, Button, TextInput, ActivityIndicator } from 'react-native';

/* Components */
import Logo from '../../components/logo/Logo';
import RedBox from '../../components/redbox/RedBox';
import Wrapper from '../../components/wrapper/Wrapper';

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: this.props.navigation.state.params.email ? this.props.navigation.state.params.email : '',
      password: '',
      name: '',
      mobile: '',
      response: '',
      loading: false,
    };

    this.signup = this.signup.bind(this);
  }

  static navigationOptions = { title: 'Cadastrar' };

  async signup() {
    const { name, mobile, email, password } = this.state;

    if (email && password && name && mobile) {
      try {
        this.setState({ loading: true });
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
          this.setState({ loading: false });
          alert('Cadastrado efetuado com sucesso!');
          this.props.navigation.navigate('Home');
        });
      } catch (error) { this.setState({ response: error.toString() }); }
    } else { this.setState({ response: 'Por favor, preencha todos os campos.' }); }
  }

  render() {
    return (
      <Wrapper>
        { this.state.loading ? <ActivityIndicator size="large" color="purple"/> :
          <Wrapper>
            <Logo />
            <View style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <TextInput
                style={{fontSize: 20}}
                placeholder="Email"
                placeholderTextColor="grey"
                onChangeText={(email) => this.setState({email})} />
              <TextInput
                style={{fontSize: 20}}
                placeholder="Senha"
                placeholderTextColor="grey"
                onChangeText={(password) => this.setState({password})} />
              <TextInput
                style={{fontSize: 20}}
                placeholder="Instituição"
                placeholderTextColor="grey"
                onChangeText={(name) => this.setState({name})} />
              <TextInput
                style={{fontSize: 20}}
                placeholder="Telefone"
                placeholderTextColor="grey"
                onChangeText={(mobile) => this.setState({mobile})} />
              <Button
                onPress={this.signup}
                title="Entrar"
                color="#841584"
                accessibilityLabel="Clique aqui para efetuar o login."/>
              <RedBox message={this.state.response}/>
            </View>
          </Wrapper>
        }
      </Wrapper>
    );
  }
}
