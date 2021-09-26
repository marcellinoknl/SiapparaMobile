/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import { ListViewKomoditi } from './Components/ListView';
import { styles } from './Home';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getData, setData } from '../localStorage';
import { days, months, monthsName } from '../../date';

class ListKomoditi extends Component {
  constructor(props) {
    super(props);
    this.state = { currendDate: '', komoditi: null };
  }

  calculateDate(tanggal) {
    var d = new Date(tanggal);
    this.setState({
      currendDate: `${days[d.getDay()]}, ${d.getDate()} ${monthsName[d.getMonth()]
        } ${d.getFullYear()}`,
      waktu: `${d.getHours()}:${d.getMinutes()} WIB`,
    });
  }

  componentDidMount() {
    let date = Date.now();
    this.calculateDate(date);
    console.log(this.props.komoditi);
    this.props.navigation.addListener('focus', () => {
      this.setState({ komoditi: this.props.komoditi });
      setData('@tambahKomoditi', { ...this.props.komoditi });
    });
  }
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.city}>Daftar Komoditi</Text>
          <Text style={styles.person}>{this.state.currendDate}</Text>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Komoditi', {
                tanggal: this.state.currendDate,
                rawDate: Date.now(),
              });
            }}
            style={localStyles.button}>
            <Icon name="add" size={20} color="white" />
            <Text style={{ color: 'white' }}>Tambah Komoditi</Text>
          </TouchableOpacity>
          {Object.keys(this.props.komoditi).map((key, index) => {
            return (
              <TouchableOpacity key={index}>
                <ListViewKomoditi
                  number={index}
                  komoditi={this.props.komoditi[key].komoditi}
                  harga={this.props.komoditi[key].harga}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    );
  }
}

const localStyles = StyleSheet.create({
  button: {
    borderColor: 'lightgray',
    borderWidth: 1,
    marginTop: 10,
    width: Dimensions.get('screen').width / 2,
    padding: 10,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#00A3FF',
    marginBottom: 10,
  },
});

const mapStateToProps = (state) => ({
  komoditi: state.addKomoditi,
  listKomoditi: state.listKomoditi.items,
});

export default connect(mapStateToProps)(ListKomoditi);
