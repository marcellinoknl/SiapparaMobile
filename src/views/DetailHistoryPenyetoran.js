/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {currencySeparator} from '../../currency';
import {styles} from './Home';
class DetailHistoryPenyetoran extends Component {
  componentDidMount() {
    console.log(this.props.route.params.data);
  }
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.person}>Detail penyetoran tanggal</Text>
          <Text style={{}}>{this.props.route.params.tanggal}</Text>
          {this.props.route.params.data.status === 3 ? (
            <View>
              <Text style={{color: 'red'}}>
                Status Pending Harap Upload gambar Baru
              </Text>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('BuktiBaru', {
                    data: this.props.route.params.data,
                  });
                }}
                style={localStyles.button}>
                <Text style={{color: 'white'}}>Tambah Bukti</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View />
          )}
          <Text style={{marginTop: 10}}>
            Penyetoran Melalui {this.props.route.params.data.penyetoran_melalui}
          </Text>
          <Text style={{}}>
            Jumlah Setoran: Rp{' '}
            {currencySeparator(this.props.route.params.data.jumlah_setoran)}
          </Text>
          <Text style={{}}>Bukti Setoran: </Text>
          {this.props.route.params.data.bukti_penyetoran
            .split(`,`)
            .map((item, index) => {
              return (
                <Image
                  key={index}
                  source={{
                    uri: `${item}`,
                  }}
                  style={{height: 400, marginTop: 20}}
                />
              );
            })}
        </View>
      </ScrollView>
    );
  }
}
const localStyles = StyleSheet.create({
  button: {
    borderColor: 'white',
    borderWidth: 1,
    marginTop: 10,
    width: Dimensions.get('screen').width / 2,
    padding: 5,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#00A3FF',
    marginBottom: 10,
  },
});
export default DetailHistoryPenyetoran;
