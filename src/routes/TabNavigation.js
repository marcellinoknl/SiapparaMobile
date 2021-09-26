/* eslint-disable prettier/prettier */
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Home from '../views/Home';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ListTagihan from '../views/ListTagihan';
import HistoriPenyetoran from '../views/HistoriPenyetoran';

const Tab = createBottomTabNavigator();
const YourApp = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        showLabel: false,
        showIcon: true,
        activeTintColor: '#00A4FF',
        labelStyle: {
          fontSize: 15,
          letterSpacing: 0.5,
          marginBottom: 10,
        },
        iconStyle: {
          marginTop: 10,
        },
        style: { height: 65 },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Daftar Receipt"
        component={ListTagihan}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="format-list-bulleted" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Daftar Setoran"
        component={HistoriPenyetoran}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="timer" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default YourApp;
