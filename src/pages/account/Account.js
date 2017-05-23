/* Dependencies */
import React, { Component } from 'react';
import { View, Button } from 'react-native';

export default class Account extends Component {
  constructor(props) {
    super(props);

    this.state = { isReady: false }
  }

  close() {

  }

  render() {
    return (
      <View>
        <Button
          onPress={this.close.bind(this)}
          title="Sair"
          color="#841584"
          accessibilityLabel="Clique aqui para sair." />
      </View>
    );
  }
}
