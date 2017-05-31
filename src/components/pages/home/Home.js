/* Dependencies */
import * as firebase from "firebase";
import React, { Component } from 'react';
import { View, Button, Text, ActivityIndicator } from 'react-native';

/* Database */
import Database from "../../../database/Database";
import Wrapper from '../../components/wrapper/Wrapper';
import RedBox from '../../components/redbox/RedBox';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: '',
      name: '',
      mobile: '',
      address: '',
      response: '',
      hasDetails: false
    };

    this.logout = this.logout.bind(this);
    this.updateData = this.updateData.bind(this);
    this.dogsList = this.dogsList.bind(this);
  }

  static navigationOptions = { title: 'Bem-Vindo!' };

  async componentDidMount() {
    try {
      // Get User Credentials
      let user = await firebase.auth().currentUser;

      // Listen for Details Changes
      Database.listenUserDetails(user.uid, details => {
        if (details) {
          this.setState({
            name: details.name,
            mobile: details.mobile,
            address: details.address,
            hasDetails: true
          });
        }
      });

      this.setState({ uid: user.uid });
    } catch (error) { this.setState({ response: error.toString() }); }
  }

  updateData() { this.props.navigation.navigate('Edit'); }

  dogsList() { this.props.navigation.navigate('DogsList'); }

  async logout() {
    try {
      await firebase.auth().signOut();
      this.props.navigation.navigate('Signin');
    } catch (error) { this.setState({ response: error.toString() }); }
  }

  render() {
    const { name, mobile, address, response, hasDetails } = this.state;

    return (
        <Wrapper>
          <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between'}}>
            <Text style={{ fontSize: 20 }}>Olá {name}!</Text>
            <Text style={{ fontSize: 20 }}>Instituição: {name}</Text>
            <Text style={{ fontSize: 20 }}>Endereço: {address}</Text>
            <Text style={{ fontSize: 20 }}>Telefone: {mobile}</Text>
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
            <RedBox message={response} />
          </View>
          { hasDetails && name === '' ? <ActivityIndicator size="large" color="purple" /> : null }
        </Wrapper>
    );
  }
}
