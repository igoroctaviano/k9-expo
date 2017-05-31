/* Dependencies */
import * as firebase from "firebase";
import React, { Component } from 'react';
import { View, Button, Text } from 'react-native';

/* Database */
import Database from "../../../database/Database";
import Wrapper from '../../components/wrapper/Wrapper';
import RedBox from '../../components/redbox/RedBox';

export default class Report extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: '',
      name: '',
      mobile: '',
      address: '',
      creationDate: '',
      amountOfDogs: '',
      response: '',
      hasDetails: false
    };

    this.logout = this.logout.bind(this);
    this.updateData = this.updateData.bind(this);
    this.dogsList = this.dogsList.bind(this);
  }

  static navigationOptions = { title: 'Relatório' };

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
            address: details.address
          });
        }
      });

      this.setState({ uid: user.uid });
    } catch (error) { this.setState({ response: error.toString() }); }
  }

  async logout() {
    try {
      await firebase.auth().signOut();
      this.props.navigation.navigate('Signin');
    } catch (error) { this.setState({ response: error.toString() }); }
  }

  render() {
    const { name, mobile, address, amountOfDogs, creationDate, response } = this.state;

    return (
      <Wrapper>
        <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between'}}>
          <Text style={{ fontSize: 20 }}>Instituição: {name}</Text>
          <Text style={{ fontSize: 20 }}>Endereço: {address}</Text>
          <Text style={{ fontSize: 20 }}>Telefone: {mobile}</Text>
          <Text style={{ fontSize: 20 }}>Quantidade de animais cadastrados: {amountOfDogs}</Text>
          <Text style={{ fontSize: 20 }}>Data de criação: {creationDate}</Text>
          <Button
            onPress={this.logout}
            title="Sair"
            color="#841584"
            accessibilityLabel="Clique aqui para sair." />
          <RedBox message={response} />
        </View>
      </Wrapper>
    );
  }
}
