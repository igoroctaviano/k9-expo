/* Dependencies */
import React from 'react';
import { View, Text } from 'react-native';

/* Styles */
import styles from './styles';

export default function RedBox(props) {
  return (
    <View>
      <Text style={styles.text}>{props.message}</Text>
    </View>
  );
}
