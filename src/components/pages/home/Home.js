/* Dependencies */
import * as firebase from "firebase";
import React, { Component } from 'react';
import { View, Button, Text, TextInput } from 'react-native';

/* Database */
import Database from "../../../database/Database";
import Wrapper from '../../components/wrapper/Wrapper';
import RedBox from '../../components/redbox/RedBox';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: '',
      name: this.props.name ? this.props.name : '',
      mobile: this.props.mobile ? this.props.mobile : '',
      address: this.props.address ? this.props.address : '',
      isReady: false,
      response: '',
    };

    this.logout = this.logout.bind(this);
    this.updateData = this.updateData.bind(this);
    this.dogsList = this.dogsList.bind(this);
  }

  static navigationOptions = { title: 'Bem-vindo ' /* + this.props.user.name */ };

  async componentDidMount() {
    try {
      // Get User Credentials
      let user = await firebase.auth().currentUser;

      // Listen for Details Changes
      Database.listenUserDetails(user.uid, details => {
        this.setState({
          name: details.name,
          mobile: details.mobile,
          address: details.address });
      });

      this.setState({ uid: user.uid });
    } catch (error) { this.setState({ response: error.toString() }); }
  }

  updateData() {
    const { navigate } = this.props.navigation;

    navigate('Edit', {
      name: this.state.name,
      mobile: this.state.mobile,
      address: this.state.address
    });
  }

  dogsList() {
    const { navigate } = this.props.navigation;

    navigate('DogsList');
  }

  async logout() {
    const { navigate } = this.props.navigation;

    try {
      await firebase.auth().signOut();
      navigate('Signin');
    } catch (error) { this.setState({ response: error.toString() }); }
  }

  render() {
    return (
      <Wrapper>
        <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between'}}>
          <Text style={{ fontSize: 20 }}>Olá, O Seu ID é: {this.state.uid}</Text>
          <Text style={{ fontSize: 20 }}>Instituição: {this.state.name}</Text>
          <Text style={{ fontSize: 20 }}>Endereço: {this.state.address}</Text>
          <Text style={{ fontSize: 20 }}>Telefone: {this.state.mobile}</Text>
          <Button
            onPress={this.updateData}
            title="Atualizar"
            color="#841584"
            accessibilityLabel="Clique aqui para atualizar os dados." />
          <Button
            onPress={this.dogsList}
            title="Cachorros"
            color="#841584"
            accessibilityLabel="Clique aqui para exibir lista de cachorros." />
          <Button
            onPress={this.logout}
            title="Sair"
            color="#841584"
            accessibilityLabel="Clique aqui para sair." />
          <RedBox message={this.state.response} />
        </View>
      </Wrapper>
    );
  }
}
