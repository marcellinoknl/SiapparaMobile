import React from 'react';
import {View, ActivityIndicator, StyleSheet, Text} from 'react-native';

const Loader = () => {
  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size={100} color="orangered" />
      <Text style={{fontSize: 30, marginTop: 30, color: 'orangered'}}>
        Loading
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightblue',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontal: {
    flexDirection: 'column',
    padding: 10,
  },
});

export default Loader;
