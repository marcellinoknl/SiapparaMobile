/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-community/async-storage';

export const setData = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.log(e);
  }
};

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    } else {
      return null;
    }
  } catch (error) {
    // Error retrieving data
  }
};

export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log('berhasil');
  } catch (e) {
    console.log(e);
  }
};
