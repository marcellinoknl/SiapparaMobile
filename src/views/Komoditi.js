/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import KomodityEntry from './Components/KomodityEntry';
import LinearButton from './Components/LinearButton';
import MultiSelect from 'react-native-multiple-select';
import { getData, setData } from '../localStorage';
import { connect } from 'react-redux';
import { addKomoditiTrans } from '../actions/userAction';
import { currencySeparator } from '../../currency';
import { Picker } from '@react-native-community/picker';
import CurrencyInput from './Components/CurrencyInputAddKomodity';

class Komoditi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: [],
      selected: '',
      items: null,
      harga: '',

      komoditi: [],
    };
  }
  komoditi = [];
  componentDidMount() {
    let komoditi = [];
    this.props.listKomoditi.map((item) => {
      // console.log(item.nama, item.satuan);
      komoditi.push(`${item.nama} ${item.satuan}`);
    });
    this.komoditi = komoditi;
    // console.log(komoditi);
  }

  handleJumlah = val => {
    console.log(val);
    this.setState({ harga: val });
  }

  onSelectedItemsChange = (selectedItems) => {
    if (selectedItems == [-1]) return;
    let selected = this.props.listKomoditi.filter((item) => {
      return item.id == selectedItems;
    });
    console.log(selected[0].nama);
    this.setState({ selectedItems, selected: selected[0].nama });
  };

  handleSubmit() {
    const obj = this.props.komoditi;
    if (this.state.selectedItems && this.state.selectedItems.length) {
      if (this.state.harga > 0) {
        const obj = this.props.komoditi;
        for (const [key, value] of Object.entries(obj)) {
          console.log(value.komoditi);
          // update existing
          if (this.state.selected === value.komoditi) {
            value.harga = this.state.harga;
            this.props.onAddKomoditi(obj, true);
            this.props.navigation.navigate('ListKomodity');
            return;
          }
        }
        let data = {
          id: this.state.selectedItems[0],
          komoditi: this.state.selected,
          harga: this.state.harga,
          tanggal: this.props.route.params.tanggal,
          statusSync: false,
          rawDate: this.props.route.params.rawDate,
        };

        this.props.onAddKomoditi(data, false);
        this.props.navigation.navigate('ListKomodity');
      } else {
        alert('Masukkan harga yang sesuai');
      }
    } else {
      alert('Komoditi Tidak dipilih');
    }
  }
  render() {
    return (
      //   <ScrollView>
      <View style={styles.container}>
        <View>
          <Text style={[styles.label, { marginBottom: 10 }]}>Jenis Komoditi</Text>
          {/* <View style={[styles.input, {margin: 5, justifyContent:"center"}]}> */}
          <View style={styles.input}>
            <Picker
              selectedValue={this.state.selectedItems[0]}
              style={{ color: 'black' }}
              mode="dropdown"
              onValueChange={(itemValue, itemIndex) =>
                this.onSelectedItemsChange([itemValue])
              }>
              <Picker.Item label="Pilih Jenis Komoditi" key={-1} value={-1} />
              {this.props.listKomoditi.map((item) => {
                return (
                  <Picker.Item
                    key={item.id}
                    label={item.nama}
                    value={item.id}
                  />
                );
              })}
            </Picker>
          </View>
          <Text style={[styles.label, { marginTop: 10 }]}>
            Harga Komoditi (Rp)
          </Text>
          <CurrencyInput calculateSallary={this.handleJumlah} />
        </View>

        <View>
          <TouchableOpacity
            style={styles.linearGradient}
            onPress={() => {
              this.handleSubmit();
            }}>
            <LinearButton text="Entry Komoditi" />
          </TouchableOpacity>
        </View>
      </View>
      //   </ScrollView>
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
    paddingLeft: 10,
  },
  total: {
    fontSize: 36,
    fontFamily: 'sans-serif-medium',
  },
  linearGradient: {
    height: 45,
    marginTop: 20,
  },

  komodityList: {
    alignSelf: 'flex-start',
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

const mapStateToProps = (state) => ({
  komoditi: state.addKomoditi,
  listKomoditi: state.listKomoditi.items,
});

const mapActionsToProps = {
  onAddKomoditi: addKomoditiTrans,
};

export default connect(mapStateToProps, mapActionsToProps)(Komoditi);
