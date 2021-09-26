/* eslint-disable prettier/prettier */
import Axios from 'axios';
import React from 'react';
import { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

import { connect } from 'react-redux';
import { base_url, local_base_url } from '../../config';
import {
  bulanReceipt,
  updateBiayaRetribusi,
  updateListKomoditi,
  updateUser,
} from '../actions/userAction';

import { setData } from '../localStorage';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',

      isProcessing: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.onUpdateUser = this.onUpdateUser.bind(this);
  }

  handleSubmit = () => {
    // let data = {
    //   username: this.state.username,
    //   key: 'jwt key here',
    //   kecamatan: 'Dolok Sanggul',
    //   kecSingkatan: 'DSG',
    //   tipePasar: 'I',
    //   nama: this.state.username,
    //   isLogin: true,
    // };

    // let komoditi = {
    //   items: [
    //     {
    //       name: 'Beras',
    //     },
    //     {
    //       name: 'Gula',
    //     },
    //     {
    //       name: 'Kopi',
    //     },
    //     {
    //       name: 'Ikan jahir',
    //     },
    //     {
    //       name: 'Bawang',
    //     },
    //     {
    //       name: 'Ayam',
    //     },
    //     {
    //       name: 'Daging Kuda',
    //     },
    //   ],
    // };

    if (this.state.username !== '' && this.state.password !== '') {
      const data = {
        username: this.state.username,
        password: this.state.password,
      };
      console.log(data);
      this.setState({ isProcessing: true });
      Axios.post(`${base_url}/login`, data)
        .then((response) => {
          const res = response.data;
          console.log('response', res);
          this.setState({ isProcessing: false });

          const userData = {
            username: res.user.username,
            key: 'jwtKey',
            kecamatan: res.pasar.nama_pasar,
            kecSingkatan: res.pasar.inisial_pasar,
            tipePasar: res.tipe_pasar.nama,
            nama: res.user.name,
            isLogin: true,
            id_user: res.user.id,
            pasar_id: res.pasar.id,
          };
          const komoditi = { items: res.komoditi };
          const biaya_retribusi = { biaya_retribusi: res.biaya_retribusi };
          console.log('user', userData);
          console.log('komoditi', komoditi);
          console.log('biaya retribusi', biaya_retribusi);
          if (res.bulan_receipt) {
            console.log('bulan_receipt', res.bulan_receipt);
            const bulan = res.bulan_receipt.tanggal.split('-');
            console.log(bulan);
            this.props.onChangeBulan(
              bulan[1],
              res.bulan_receipt.current_id,
              false,
            );
            setData('@bulanReceipt', this.props.bulanReceipt);
          }
          setData('@user', userData);
          setData('@komoditi', komoditi);
          setData('@biayaRetribusi', biaya_retribusi);
          this.props.onUpdateKomoditi(komoditi);
          this.props.onUpdateUser(userData); //from redux
          this.props.onUpdateBiayaRetribusi(biaya_retribusi);
          this.props.onchange(); // from App.js
        })
        .catch((e) => {
          console.log(`${e}`);
          this.setState({ isProcessing: false });
          alert('Username dan Password tidak sesuai');
        });
    } else {
      alert('Field tidak boleh kosong');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require('../../assets/images/Logo.png')}
        />
        <Text style={[styles.appName, { textAlign: 'center' }]}>SIAPPARA</Text>
        <Text style={[styles.appName2, styles.top, { textAlign: 'center' }]}>
          KOPEDAGIN {'\n'}Humbang Hasundutan
        </Text>

        <TextInput
          editable={!this.state.isProcessing}
          style={styles.inputText}
          placeholder="Username"
          value={this.state.username}
          onChangeText={(val) => this.setState({ username: val })}
        />
        <TextInput
          editable={!this.state.isProcessing}
          style={styles.inputText}
          placeholder="Password"
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={(val) => this.setState({ password: val })}
        />

        <TouchableOpacity
          disabled={this.state.isProcessing}
          style={styles.linearGradient}
          onPress={() => {
            this.handleSubmit();
          }}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={['#00A3FF', '#0084CE']}
            style={styles.gradient}>
            {this.state.isProcessing ? (
              <ActivityIndicator color="white" size="large" />
            ) : (
              <Text style={styles.text}>MASUK</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: Dimensions.get('screen').width / 4,
    height: 90,
    marginBottom: 10,
    alignSelf: 'center',
  },
  appName: {
    fontSize: 40,
    fontFamily: 'sans-serif-medium',
    color: '#00A3FF',
  },
  appName2: {
    fontSize: 20,
    fontFamily: 'sans-serif-light',
    color: '#00A3FF',
  },
  inputText: {
    height: 40,
    borderRadius: 30,
    borderColor: 'lightgray',
    marginTop: 15,
    borderWidth: 1,
    backgroundColor: '#F2F2F2',
    paddingLeft: 20,
    fontSize: 15,
  },
  linearGradient: {
    height: 45,
    marginTop: 20,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
  top: {
    marginTop: 0,
  },
});

const mapStateToProps = (state) => ({
  user: state.user,
  bulanReceipt: state.bulanReceipt,
});

const mapActionsToProps = {
  onUpdateUser: updateUser,
  onUpdateKomoditi: updateListKomoditi,
  onUpdateBiayaRetribusi: updateBiayaRetribusi,
  onChangeBulan: bulanReceipt,
};

export default connect(mapStateToProps, mapActionsToProps)(Login);
