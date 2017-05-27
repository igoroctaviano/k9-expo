/* Dependencies */
import React from 'react';
import { View } from 'react-native';

/* Styles */
import styles from './styles';

export default function Wrapper(props) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>{props.children}</View>
    </View>
  );
}
