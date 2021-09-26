/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  // Picker,
} from 'react-native';
import LinearButton from './Components/LinearButton';
import {Picker} from '@react-native-community/picker';
import {askPermission, createPDF} from './Components/PDF';

export default class SetoranLain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jenisTempat: '',
      tagihan: 0,
    };
  }

  componentDidUpdate() {
    if (this.state.jenisTempat !== '' && this.state.tagihan === 0) {
      this.setState({tagihan: 2000});
    } else if (this.state.jenisTempat === '' && this.state.tagihan !== 0) {
      this.setState({tagihan: 0});
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.label}>Jenis Tempat</Text>
          <View style={styles.input}>
            <Picker
              selectedValue={this.state.jenisTempat}
              style={{color: '#adadad'}}
              mode="dropdown"
              onValueChange={(itemValue, itemIndex) =>
                this.setState({jenisTempat: itemValue})
              }>
              <Picker.Item label="Pilih Jenis Tempat" value="" />
              <Picker.Item label="Toilet" value="Toilet" />
            </Picker>
          </View>

          <Text style={[styles.label, {marginTop: 10}]}>Jumlah Tagihan</Text>
          <Text style={[styles.total, {marginTop: 10}]}>
            Rp {this.state.tagihan}
          </Text>
        </View>

        <View>
          <TouchableOpacity
            style={styles.linearGradient}
            onPress={() => {
              askPermission();
            }}>
            <LinearButton text="Buat Receipt"></LinearButton>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  label: {
    fontFamily: 'sans-serif-light',
    fontSize: 18,
  },
  input: {
    borderColor: '#ADADAD',
    borderWidth: 1,
    marginTop: 6,
    borderRadius: 5,
  },
  total: {
    fontSize: 36,
    fontFamily: 'sans-serif-medium',
  },
  linearGradient: {
    height: 45,
    marginTop: 20,
  },
});
