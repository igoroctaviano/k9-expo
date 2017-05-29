/* Dependencies */
import React from 'react';
import { View, Image, Text } from 'react-native';

/* Components */
import Wrapper from '../../components/wrapper/Wrapper';

/* Styles */
// import styles from './styles';

export default function() {
  return (
    /* <Wrapper>
      <Image
        style={styles.image}
        source={require('../../../../assets/imgs/german-shepard.jpg')}/>
      <Text style={styles.title}>K9</Text>
      <Text style={styles.subtitle}>Uma ONG boa pra cachorro!</Text>
    </Wrapper> */
    <View style={{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 5 }}>
      <Image
        style={{ width: 200, height: 200 }}
        source={require('../../../../assets/imgs/german-shepard.jpg')}/>
      <Text style={{ fontSize: 50, fontWeight: 'bold' }}>K9</Text>
      <Text style={{ fontSize: 25 }}>Uma ONG boa pra cachorro!</Text>
    </View>
  );
}
