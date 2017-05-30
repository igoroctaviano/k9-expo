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



  static navigationOptions = { title: 'Cachorros cadastrados' };

  async componentDidMount() {
    try {
      // Get User Credentials
      let user = await firebase.auth().currentUser;

      // Listen for Dogs Changes
      Database.listenDogsDetails(dogs => this.setState({ dogs: dogs }));

      this.setState({ uid: user.uid });
    } catch (error) { this.setState({ response: error.toString() }); }
  }

  editDog(id) {
    const { navigate } = this.props.navigation;
    navigate('DogEdit', { id: id });
  }

  saveDog() {
    if (this.state.nameForm && this.state.breedForm && this.state.ageForm) {
      Database.newDog(
        this.state.nameForm,
        this.state.breedForm,
        this.state.ageForm,
        id => Database.newUserDog(this.state.uid, id, () => alert('Cachorro cadastrado com sucesso!'))
      );
    } else { this.setState({ response: 'Por favor, preencha todos os campos.' }); }
  }

  render() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    const dogs = this.state.dogs ? ds.cloneWithRows(this.state.dogs) : null;

    console.log('STATE', this.state.dogs.length);
    console.log('LISTEN', this.state.dogs);
    return (
      <Wrapper>
        { this.state.dogs.length > 0 ?
          <ListView
            contentContainerStyle={{ flex: 1 }}
            initialListSize={4}
            dataSource={ds}
            renderRow={dog =>
              <DogItem
                name={dog.details.name}
                breed={dog.details.breed}
                age={dog.details.age}
                action={this.editDog(dog.details.uid)} />} />
        : <Text style={{ fontSize: 20 }}>Ainda não há nenhum cachorro cadastrado.</Text> }
        <View style={{ marginTop: 15 }}>
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
      </Wrapper>
    );
  }
}

function DogItem(props) {
  return (
    <TouchableHighlight
      onPress={props.action}
      style={{
        flex: 1,
        // padding: 12,
        flexDirection: 'row',
        alignItems: 'center' }}>
      <Image
        style={{ height: 40, width: 40, borderRadius: 20 }}
        source={require('../../../../assets/imgs/german-shepard.jpg')} />
      <Text style={{ marginLeft: 12, fontSize: 16 }}>UAHUAHAU{props.name}</Text>
      <Text style={{ marginLeft: 12, fontSize: 16 }}>aspeok{props.breed}</Text>
      <Text style={{ marginLeft: 12, fontSize: 16 }}>{props.age}</Text>
    </TouchableHighlight>
  );
}
