/* Dependencies */
import React from 'react';
import { View, Image, Text } from 'react-native';

export default function() {
  return (
    <View style={{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 5 }}>
      <Image
        style={{ width: 200, height: 200 }}
        source={require('../../../imgs/german-shepard.jpg')}/>
      <Text style={{ fontSize: 40, fontWeight: 'bold' }}>K9</Text>
      <Text style={{ fontSize: 20 }}>Uma ONG boa pra cachorro!</Text>
    </View>
  );
}
