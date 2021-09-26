

import SetoranHarian from '../views/SetoranHarian';
import SetoranBulanan from '../views/SetoranBulanan';
import SetoranLain from '../views/SetoranLain';

import * as React from 'react';
import { Settings, Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();

export default function TopTabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        labelStyle: {
          fontSize: 14,
          letterSpacing: 1.5,
          fontFamily: 'sans-serif-medium',
        },
      }}>
      <Tab.Screen name="Harian" component={SetoranHarian} />
      <Tab.Screen name="Bulanan" component={SetoranBulanan} />
      {/* <Tab.Screen name="Lain-Lain" component={SetoranLain} /> */}
    </Tab.Navigator>
  );
}
