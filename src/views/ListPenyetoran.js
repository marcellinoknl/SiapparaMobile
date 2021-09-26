/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {ListViewPenyetoran} from './Components/ListView';
import {styles} from './Home';

import NetInfo from '@react-native-community/netinfo';
import NoInternet from './Components/NoInternet';
import {connect} from 'react-redux';
import {monthsName} from '../../date';
import Axios from 'axios';
import {base_url} from '../../config';
class ListPenyetoran extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tanggal: '',
      connected: null,
      transaksi: [],
      data: [],
      isProcessing: true,
    };
  }

  // setDate() {
  //   const date = Date.now();
  //   const d = new Date(date);
  //   var days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  //   this.setState({
  //     tanggal: `${days[d.getDay()]}, ${d.getDate()} ${
  //       monthsName[d.getMonth()]
  //     } ${d.getFullYear()}`,
  //   });
  // }

  componentDidMount() {
    console.log(this.props.transaksi);
    console.log(
      `${base_url}/get-upload-setoran?user_id=${this.props.user.id_user}&status=0`,
    );
    Axios.get(
      `${base_url}/get-upload-setoran?user_id=${this.props.user.id_user}&status=0`,
    )
      .then((res) => {
        this.setState({data: res.data.data});
        console.log(res.data);
      })
      .then(() => {
        this.setState({isProcessing: false});
      });
    NetInfo.addEventListener((state) => {
      this.setState({connected: state.isConnected});
    });
  }

  componentWillUnmount() {
    console.log('component unmount');
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.connected ? (
          <View>
            {this.state.isProcessing ? (
              <ActivityIndicator size="large" color="black" />
            ) : this.state.data.length ? (
              <View>
                <Text style={{fontSize: 25}}>List Penyetoran</Text>
                <Text>Pilih tanggal yang akan disetor</Text>
                {this.state.data.map((item, index) => {
                  const dateSplit = item.tanggal_penyetoran.split('-');
                  const date = `${dateSplit[2]} ${
                    monthsName[dateSplit[1] - 1]
                  } ${dateSplit[0]}`;

                  return (
                    <TouchableOpacity
                      key={date}
                      onPress={() => {
                        this.props.navigation.navigate('SetorBukti', {
                          tanggal: date,
                          totalTagihan: item.jumlah_setoran,
                          id_penyetoran: item.id,
                        });
                      }}>
                      <ListViewPenyetoran tanggal={date} />
                    </TouchableOpacity>
                  );
                })}
              </View>
            ) : (
              <View>
                <Text style={{fontSize: 20, textAlign: 'center'}}>
                  Semua bukti penyetoran telah dikirimkan
                </Text>
              </View>
            )}
          </View>
        ) : (
          <NoInternet />
        )}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  transaksi: state.transaksi,
  user: state.user,
});
export default connect(mapStateToProps)(ListPenyetoran);
