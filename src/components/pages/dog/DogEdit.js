/* Dependencies */
import * as firebase from "firebase";
import React, { Component } from 'react';
import { View, Button, TextInput } from 'react-native';

/* Database */
import Database from "../../../database/Database";
import Wrapper from '../../components/wrapper/Wrapper';
import RedBox from '../../components/redbox/RedBox';

export default class DogEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: '',
      name: this.props.name ? this.props.name : '',
      nameForm: this.props.name ? this.props.name : '',
      breed: this.props.breed ? this.props.breed : '',
      breedForm: this.props.breed ? this.props.breed : '',
      age: this.props.age ? this.props.age : '',
      ageForm: this.props.age ? this.props.age : '',
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
      Database.listenDogDetails(user.uid, details => {
        this.setState({
          name: details.name,
          nameForm: details.name,
          breed: details.breed,
          breedForm: details.breed,
          age: details.age,
          ageForm: details.age,
        });
      });

      this.setState({ uid: user.uid });
    } catch (error) { this.setState({ response: error.toString() }); }
  }

  saveData() {
    if (this.state.uid && this.state.nameForm && this.state.breedForm && this.state.ageForm) {
      Database.setUserDetails(this.state.uid, this.state.nameForm, this.state.breedForm, this.state.ageForm);
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
            placeholder="Nome"
            placeholderTextColor="grey"
            value={this.state.nameForm}
            onChangeText={(nameForm) => this.setState({nameForm})} />
          <TextInput
            style={{ fontSize: 20 }}
            placeholder="Raça"
            placeholderTextColor="grey"
            value={this.state.breedForm}
            onChangeText={(breedForm) => this.setState({breedForm})} />
          <TextInput
            style={{ fontSize: 20 }}
            placeholder="Idade"
            placeholderTextColor="grey"
            value={this.state.ageForm}
            onChangeText={(ageForm) => this.setState({ageForm})} />
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
