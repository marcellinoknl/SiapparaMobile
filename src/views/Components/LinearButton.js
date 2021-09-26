import React from 'react';
import {Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const LinearButton = (props) => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={['#00A3FF', '#0084CE']}
      style={styles.gradient}>
      <Text style={styles.text}>{props.text.toUpperCase()}</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  text: {
    color: 'white',
    fontSize: 16,
    letterSpacing: 3.5,
    fontFamily: 'sans-serif-medium'
  },
});

export default LinearButton;
