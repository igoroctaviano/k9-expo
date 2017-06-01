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
      uid: this.props.navigation.state.params.uid,
      dogId: this.props.navigation.state.params.dogId,
      name: this.props.navigation.state.params.name,
      nameForm: this.props.navigation.state.params.name,
      breed: this.props.navigation.state.params.breed,
      breedForm: this.props.navigation.state.params.breed,
      age: this.props.navigation.state.params.age,
      ageForm: this.props.navigation.state.params.age,
      response: '',
    };

    this.saveData = this.saveData.bind(this);
    this.deleteData = this.deleteData.bind(this);
  }

  static navigationOptions = { title: 'Atualizar Dados' };

  async componentDidMount() {
    try {
      const { dogId } = this.state;

      Database.listenDogDetails(dogId, details => {
        if (details) {
          this.setState({
            name: details.name,
            nameForm: details.name,
            breed: details.breed,
            breedForm: details.breed,
            age: details.age,
            ageForm: details.age,
          });
        }
      });
    } catch (error) { this.setState({ response: error.toString() }); }
  }

  saveData() {
    const { dogId, nameForm, breedForm, ageForm } = this.state;

    if (dogId && nameForm && breedForm && ageForm) {
      Database.setDogDetails(dogId, nameForm, breedForm, ageForm, () => {
        alert('Animal atualizado com sucesso!');
        this.props.navigation.navigate('DogsList');
      });
    } else { this.setState({ response: 'Por favor, preencha todos os campos.' }); }
  }

  deleteData() {
    const { dogId, uid } = this.state;

    Database.deleteDog(dogId, () => {
      Database.deleteUserDog(dogId, uid, () => {
        alert('Animal deletado com sucesso!');
        this.props.navigation.navigate('DogsList');
      });
    });
  }

  render() {
    const { nameForm, breedForm, ageForm, response } = this.state;

    return (
      <Wrapper>
        <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between'}}>
          <RedBox message={response} />
          <TextInput
            style={{ fontSize: 20 }}
            placeholder="Nome"
            placeholderTextColor="grey"
            value={nameForm}
            onChangeText={(nameForm) => this.setState({nameForm})} />
          <TextInput
            style={{ fontSize: 20 }}
            placeholder="Raça"
            placeholderTextColor="grey"
            value={breedForm}
            onChangeText={(breedForm) => this.setState({breedForm})} />
          <TextInput
            style={{ fontSize: 20 }}
            placeholder="Idade"
            placeholderTextColor="grey"
            value={ageForm}
            onChangeText={(ageForm) => this.setState({ageForm})} />
          <Button
            onPress={this.saveData}
            title="Atualizar"
            color="#841584"
            accessibilityLabel="Clique aqui para atualizar os dados." />
          <Button
            onPress={this.deleteData}
            title="Deletar"
            color="#841584"
            accessibilityLabel="Clique aqui para deletar os dados." />
        </View>
      </Wrapper>
    );
  }
}
