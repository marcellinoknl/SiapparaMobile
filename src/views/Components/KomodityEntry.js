import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
const KomodityEntry = (props) => {
  return (
    <View style={styles.view}>
      <Text style={styles.text}>{props.barang}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'black',
    padding: 6,
    fontSize: 15,
    fontFamily: 'sans-serif-light',
    letterSpacing: 1.5,
  },
  view: {
    backgroundColor: 'white',
    borderRadius: 20,
    borderColor: 'lightgray',
    borderWidth: 1,
    margin: 4,
  },
});
export default KomodityEntry;
