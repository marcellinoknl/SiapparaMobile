/* eslint-disable prettier/prettier */
import * as React from 'react';
import YourApp from './TabNavigation';
import { createStackNavigator } from '@react-navigation/stack';

import TopTabNavigation from './TopTabNavigation';

import Komoditi from '../views/Komoditi';
import SetorBukti from '../views/SetorBukti';
import DetailReceipt from '../views/DetailReceipt';
import ListPenyetoran from '../views/ListPenyetoran';
import ListKomoditi from '../views/ListKomoditi';
import DetailHistoryPenyetoran from '../views/DetailHistoryPenyetoran';
import AlertSync from '../views/AlertSync';
import BuktiBaru from '../views/BuktiBaru';

const Stack = createStackNavigator();

export default function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="All Navigation"
        component={YourApp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Setoran"
        component={TopTabNavigation}
        options={{
          title: 'Buat Setoran',
          headerStyle: {
            backgroundColor: '#00A4FF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontFamily: 'sans-serif-medium',
            fontSize: 20,
          },
        }}
      />

      <Stack.Screen
        name="Komoditi"
        component={Komoditi}
        options={{
          title: 'Entry Harga Komoditi',
          headerStyle: {
            backgroundColor: '#00A4FF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontFamily: 'sans-serif-medium',
            fontSize: 20,
          },
        }}
      />

      <Stack.Screen
        name="SetorBukti"
        component={SetorBukti}
        options={{
          title: 'Upload Bukti',
          headerStyle: {
            backgroundColor: '#00A4FF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontFamily: 'sans-serif-medium',
            fontSize: 20,
          },
        }}
      />

      <Stack.Screen
        name="DetailReceipt"
        component={DetailReceipt}
        options={{
          title: 'Detail Receipt',
          headerStyle: {
            backgroundColor: '#00A4FF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontFamily: 'sans-serif-medium',
            fontSize: 20,
          },
        }}
      />

      <Stack.Screen
        name="ListPenyetoran"
        component={ListPenyetoran}
        options={{
          title: 'Penyetoran',
          headerStyle: {
            backgroundColor: '#00A4FF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontFamily: 'sans-serif-medium',
            fontSize: 20,
          },
        }}
      />

      <Stack.Screen
        name="ListKomodity"
        component={ListKomoditi}
        options={{
          title: 'Komoditi',
          headerStyle: {
            backgroundColor: '#00A4FF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontFamily: 'sans-serif-medium',
            fontSize: 20,
          },
        }}
      />

      <Stack.Screen
        name="DetailHistoryPenyetoran"
        component={DetailHistoryPenyetoran}
        options={{
          title: 'Detail Riwayat Penyetoran',
          headerStyle: {
            backgroundColor: '#00A4FF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontFamily: 'sans-serif-medium',
            fontSize: 20,
          },
        }}
      />

      <Stack.Screen
        name="AlertSync"
        component={AlertSync}
        options={{
          title: 'Sinkronisasi',
          headerStyle: {
            backgroundColor: '#00A4FF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontFamily: 'sans-serif-medium',
            fontSize: 20,
          },
        }}
      />
      <Stack.Screen
        name="BuktiBaru"
        component={BuktiBaru}
        options={{
          title: 'Upload Bukti Baru',
          headerStyle: {
            backgroundColor: '#00A4FF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontFamily: 'sans-serif-medium',
            fontSize: 20,
          },
        }}
      />
    </Stack.Navigator>
  );
}
