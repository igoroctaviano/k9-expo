/* Dependencies */
import * as firebase from "firebase";
import React, { Component } from 'react';
import { View, Button, TextInput } from 'react-native';

/* Database */
import Database from "../../../database/Database";
import Wrapper from '../../components/wrapper/Wrapper';
import RedBox from '../../components/redbox/RedBox';

export default class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: '',
      name: '',
      nameForm: '',
      mobile: '',
      mobileForm: '',
      address: '',
      addressForm: '',
      isReady: false,
      response: '',
    };

    this.saveData = this.saveData.bind(this);
  }

  static navigationOptions = { title: 'Atualizar dados' };

  async componentDidMount() {
    try {
      // Get User Credentials
      let user = await firebase.auth().currentUser;

      // Listen for Details Changes
      Database.listenUserDetails(user.uid, details => {
        this.setState({
          name: details.name,
          nameForm: details.name,
          mobile: details.mobile,
          mobileForm: details.mobile,
          address: details.address,
          addressForm: details.address,
        });
      });

      this.setState({ uid: user.uid });
    } catch (error) { this.setState({ response: error.toString() }); }
  }

  saveData() {
    if (this.state.uid && this.state.nameForm && this.state.mobileForm && this.state.addressForm) {
      Database.setUserDetails(
        this.state.uid,
        this.state.nameForm,
        this.state.mobileForm,
        this.state.addressForm, () => alert('Dados atualizados com sucesso!')
      );
    } else { this.setState({ response: 'Por favor, preencha todos os campos.' }); }
  }

  render() {
    return (
      <Wrapper>
        <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between'}}>
          <RedBox message={this.state.response} />
          <TextInput
            style={{ fontSize: 20 }}
            placeholder="Instituição"
            placeholderTextColor="grey"
            value={this.state.nameForm}
            onChangeText={(nameForm) => this.setState({nameForm})} />
          <TextInput
            style={{ fontSize: 20 }}
            placeholder="Telefone"
            placeholderTextColor="grey"
            value={this.state.mobileForm}
            onChangeText={(mobileForm) => this.setState({mobileForm})} />
          <TextInput
            style={{ fontSize: 20 }}
            placeholder="Endereço"
            placeholderTextColor="grey"
            value={this.state.addressForm}
            onChangeText={(addressForm) => this.setState({addressForm})} />
          <Button
            onPress={this.saveData}
            title="Atualizar"
            color="#841584"
            accessibilityLabel="Clique aqui para atualizar os dados." />
        </View>
      </Wrapper>
    );
  }
}
