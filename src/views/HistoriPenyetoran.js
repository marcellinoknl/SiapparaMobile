/* eslint-disable prettier/prettier */
import Axios from 'axios';
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {base_url, local_base_url} from '../../config';
import {monthsName} from '../../date';
import NetInfo from '@react-native-community/netinfo';

import {ListViewHistoryPenyetoran} from './Components/ListView';
import NoInternet from './Components/NoInternet';

class HistoriPenyetoran extends Component {
  constructor(props) {
    super(props);
    this.state = {tanggal: '', isProcessing: true, data: [], isConnected: true};
  }

  componentDidMount() {
    NetInfo.addEventListener((state) => {
      this.setState({isConnected: state.isConnected});
    });
    this.props.navigation.addListener('focus', () => {
      Axios.get(`${base_url}/get-penyetoran?user_id=${this.props.user.id_user}`)
        .then((res) => {
          this.setState({data: res.data.data});
          console.log('data', res.data.data);
        })
        .then(() => {
          this.setState({isProcessing: false});
        });
    });
    Axios.get(`${base_url}/get-penyetoran?user_id=${this.props.user.id_user}`)
      .then((res) => {
        this.setState({data: res.data.data});
        console.log('data', res.data.data);
      })
      .then(() => {
        this.setState({isProcessing: false});
      });
  }
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Text style={styles.h1}>Daftar Setoran</Text>
          </View>

          <View>
            {this.state.isConnected ? (
              this.state.isProcessing ? (
                <ActivityIndicator
                  size="large"
                  color="black"/>
              ) : Array.isArray(this.state.data) && this.state.data.length ? (
                this.state.data.map((item, index) => {
                  const dateS = item.tanggal_penyetoran.split('-');
                  const tanggal = `${dateS[2]} ${monthsName[dateS[1] - 1]} ${
                    dateS[0]
                  }`;
                  console.log(item.jumlah_setoran);
                  return (
                    <View style={{marginTop: 15}} key={index}>
                      <TouchableOpacity
                        onPress={() => {
                          this.props.navigation.navigate(
                            'DetailHistoryPenyetoran',
                            {
                              tanggal: tanggal,
                              data: item,
                            },
                          );
                        }}>
                        <ListViewHistoryPenyetoran
                          status={item.status}
                          tanggal={tanggal}
                          total={item.jumlah_setoran}
                        />
                      </TouchableOpacity>
                    </View>
                  );
                })
              ) : (
                <Text
                  style={{
                    fontFamily: 'sans-serif-bold',
                    marginTop: 30,
                    fontSize: 15,
                    textAlign: 'center',
                    color: 'gray',
                  }}>
                  Tidak ada data
                </Text>
              )
            ) : (
              <NoInternet />
            )}
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  h1: {
    fontSize: 35,
    fontFamily: 'sans-serif-medium',
    color: '#3D3D3D',
  },
  date: {
    fontSize: 20,
    fontFamily: 'Roboto',
    color: '#3D3D3D',
  },

  circle: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    backgroundColor: '#2f80ed',
  },
});

const mapStateToProps = (state) => ({
  user: state.user,
});
export default connect(mapStateToProps)(HistoriPenyetoran);
