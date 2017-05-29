/* Dependencies */
import * as firebase from "firebase";
import React, { Component } from 'react';
import { TouchableHighlight, Text, Image, ListView, View, Button, TextInput } from 'react-native';

/* Database */
import Database from "../../../database/Database";
import Wrapper from '../../components/wrapper/Wrapper';
import RedBox from '../../components/redbox/RedBox';

export default class DogEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: '',
      dogs: [],
      isReady: false,
      response: '',
    };

    this.editDog = this.editDog.bind(this);
    this.saveDog = this.saveDog.bind(this);
  }

  static navigationOptions = { title: 'Atualizar dados' };

  async componentDidMount() {
    try {
      // Get User Credentials
      let user = await firebase.auth().currentUser;

      // Listen for Dogs Changes
      Database.listenUserDogs(user.uid, dogs => {
        this.setState({ dogs: dogs });
      });

      this.setState({ uid: user.uid });
    } catch (error) { this.setState({ response: error.toString() }); }
  }

  editDog(id) {
    const { navigate } = this.props.navigation;

    navigate('DogEdit', { id: id });
  }

  saveDog() {

  }

  render() {
    return (
      <Wrapper>
        { this.state.dogs ?
          <View style={{ borderRadius: 20, backgroundColor: 'white' }}>
            <ListView
              dataSource={this.state.dogs}
              renderRow={(dogs, id, section) => dogs.map(dog =>
                <DogItem
                  name={dog.name}
                  breed={dog.breed}
                  age={dog.age}
                  event={this.editDog(dog.id)} />)} />
            <View>
              <Text>Novo cachorro</Text>
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
                onPress={this.saveDog}
                title="Cadastrar"
                color="#841584"
                accessibilityLabel="Clique aqui para cadastrar novo cachorro." />
            </View>
            <RedBox message={this.state.response} />
          </View>
        : <Text>Ainda não há nenhum cachorro cadastrado.</Text> }
      </Wrapper>
    );
  }
}

function DogItem(props) {
  return (
    <TouchableHighlight onPress={props.event}>
      <Image source={require('../../../../assets/imgs/german-shepard.jpg')} />
      <Text>{props.name}</Text>
      <Text>{props.breed}</Text>
      <Text>{props.age}</Text>
    </TouchableHighlight>
  );
}
