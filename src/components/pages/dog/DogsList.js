/* Dependencies */
import * as firebase from "firebase";
import React, { Component } from 'react';
import { TouchableHighlight, Text, Image, ListView, View, Button } from 'react-native';

/* Database */
import Database from "../../../database/Database";
import Wrapper from '../../components/wrapper/Wrapper';

export default class DogEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: '',
      dogs: '',
      isReady: false,
      response: '',
    };

    this.editDog = this.editDog.bind(this);
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

  render() {
    const dogs = this.state.dogs.map(dog =>
      <DogItem
        name={dog.name}
        breed={dog.breed}
        age={dog.age}
        event={this.editDog(dog.id)} />
    );

    return (
      <Wrapper>
        { dogs ? <ListView dataSource={dogs} /> : <Text>Ainda não há nenhum cachorro cadastrado.</Text> }
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
