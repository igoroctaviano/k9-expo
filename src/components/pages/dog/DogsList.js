/* Dependencies */
import * as firebase from "firebase";
import React, { Component } from 'react';
import { TouchableHighlight, Text, Image, ListView, View, Button, TextInput, ActivityIndicator } from 'react-native';

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
      userDogs: [],
      response: '',
    };

    this.saveDog = this.saveDog.bind(this);
  }

  static navigationOptions = { title: 'Cachorros Cadastrados' };

  async componentDidMount() {
    try {
      // Get User Credentials
      let user = await firebase.auth().currentUser;

      // Listen for Dogs Changes
      Database.listenDogsDetails(dogs => {
        this.setState({ dogs: dogs })
      });

      // Listen for User Dogs Changes
      Database.listenUserDogs(user.uid, dogs => {
        this.setState({ userDogs: dogs })
      });

      this.setState({ uid: user.uid });
    } catch (error) { this.setState({ response: error.toString() }); }
  }

  saveDog() {
    const { nameForm, breedForm, ageForm, uid } = this.state;

    if (nameForm && breedForm && ageForm) {
      Database.newDog(
        nameForm,
        breedForm,
        ageForm,
        id => Database.newUserDog(uid, id, () => alert('Cachorro cadastrado com sucesso!')));
    } else { this.setState({ response: 'Por favor, preencha todos os campos.' }); }
  }

  getDogsDataSource() {
    const { dogs, userDogs } = this.state;

    console.log('userDogs', userDogs);
    const filteredDogs = dogs ? dogs.filter(dog => userDogs ? userDogs.map(dog => dog.id).indexOf(dog.key) >= 0 : false) : null;
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    return dogs ? ds.cloneWithRows(filteredDogs) : null;
  }

  render() {
    const {
      nameForm,
      breedForm,
      ageForm,
      response
    } = this.state;

    const dogsDataSource = this.getDogsDataSource();

    return (
      <Wrapper>
        { dogsDataSource ?
          <ListView
            initialListSize={4}
            enableEmptySections={true}
            dataSource={dogsDataSource}
            renderRow={dog =>
              <DogItem
                name={dog.details.name}
                breed={dog.details.breed}
                age={dog.details.age} />} />
          : <View style={{ flex: 1, flexDirection: 'column' }}>
              <ActivityIndicator size="large" color="purple" />
              <Text style={{ fontSize: 20 }}>Ainda não há nenhum cachorro cadastrado.</Text>
            </View>
        }
        <View style={{ marginTop: 15 }}>
          <Text style={{ fontSize: 15 }}>Novo cachorro</Text>
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
            onPress={this.saveDog}
            title="Cadastrar"
            color="#841584"
            accessibilityLabel="Clique aqui para cadastrar novo cachorro." />
        </View>
        <RedBox message={response} />
      </Wrapper>
    );
  }
}

function DogItem(props) {
  return (
    <TouchableHighlight style={{
      flex: 1,
      padding: 12,
      flexDirection: 'row',
      alignItems: 'center' }}>
      <View>
        <Image
          style={{ height: 40, width: 40, borderRadius: 20 }}
          source={require('../../../../assets/imgs/german-shepard.jpg')} />
        <Text style={{ marginLeft: 12, fontSize: 16 }}>{props.name}</Text>
        <Text style={{ marginLeft: 12, fontSize: 16 }}>{props.breed}</Text>
        <Text style={{ marginLeft: 12, fontSize: 16 }}>{props.age}</Text>
      </View>
    </TouchableHighlight>
  );
}
