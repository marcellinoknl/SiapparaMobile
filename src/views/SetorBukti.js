/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';

import LinearButton from './Components/LinearButton';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import {selectImage} from './Components/ImagePicker';

import ImagePicker from 'react-native-image-picker';
import Axios from 'axios';
import { base_url, local_base_url } from '../../config';
import { connect } from 'react-redux';
import { addTransaksi } from '../actions/userAction';
import { setData } from '../localStorage';
import { Picker } from '@react-native-community/picker';
import { ScrollView } from 'react-native-gesture-handler';
import { currencySeparator } from '../../currency';

class SetorBukti extends Component {
  state = {
    avatarSource: null,
    imagePickerRes: {},
    isProcessing: false,
    penyetoran_melalui: '',
  };

  curDate() {
    const date = Date.now();
    const d = new Date(date);
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  }

  isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  async handleSubmit() {
    if (
      this.state.penyetoran_melalui == '' ||
      this.isEmpty(this.state.imagePickerRes)
    ) {
      alert('Anda tidak mengsisi field yang diperlukan');
    } else {
      this.setState({ isProcessing: true });
      const params = this.props.route.params;
      const props = this.props;
      const now = this.curDate();
      const tanggal_penyetoran = this.dateToSend(
        this.props.route.params.rawDate,
      );

      var data = new FormData();
      data.append('bukti_setor', {
        uri: this.state.imagePickerRes.uri,
        name: this.state.imagePickerRes.fileName,
        type: this.state.imagePickerRes.type,
      });
      // data.append('jumlah_setoran', params.totalTagihan);
      // data.append('petugas', props.user.id_user);
      data.append('tanggal_disetor', now);
      data.append('tanggal_penyetoran', tanggal_penyetoran);
      data.append('id', props.route.params.id_penyetoran);
      data.append('penyetoran_melalui', this.state.penyetoran_melalui);
      console.log('imr', data);

      console.log(this.props.transaksi[params.tanggal]);
      await Axios.post(`${base_url}/update-penyetoran`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }).then((res) => {
        console.log(res);
        // this.props.transaksi[params.tanggal].statusSetoran = true;
        // this.props.onSetor(this.props.transaksi, null, null, null, null, true);
        // setData('@transaksi', this.props.transaksi);
        ToastAndroid.show(`Upload Bukti Setoran Sukses`, ToastAndroid.LONG);
        this.props.navigation.navigate('Home');
      });
    }
  }

  selectImage = async () => {
    console.log('select image');
    ImagePicker.launchCamera(
      {
        noData: true,
        mediaType: 'photo',
        quality: 0.2,
        storageOptions: { skipBackup: true, path: 'ebilling/bukti-setor' },
      },
      (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          const source = { uri: response.uri };
          const image = response;
          this.setState({
            avatarSource: source,
            imagePickerRes: image,
          });
          console.log('source', source);
        }
      },
    );
  };

  dateToSend(date) {
    const d = new Date(date);
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  }

  componentDidMount() {
    this.dateToSend(this.props.route.params.rawDate);
    console.log(this.props.route.params);
    console.log(this.props.user);
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Text style={[styles.label, { fontSize: 25 }]}>
              {this.props.route.params.tanggal}
            </Text>
            <Text style={[styles.label]}>
              Total Tagihan: Rp{' '}
              {currencySeparator(this.props.route.params.totalTagihan)}
            </Text>
            <Text style={{ marginTop: 10 }}>Penyetoran melalui</Text>

            <View style={styles.input}>
              <Picker
                selectedValue={this.state.penyetoran_melalui}
                style={{ color: 'black' }}
                mode="dropdown"
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ penyetoran_melalui: itemValue })
                }>
                <Picker.Item label="Pilih Tempat Penyetoran" value="" />
                <Picker.Item label="Bank" value="Bank" />
                <Picker.Item label="Kantor" value="Kantor" />
              </Picker>
            </View>

            <TouchableWithoutFeedback
              disabled={this.state.isProcessing}
              onPress={() => {
                console.log('upload');
                this.selectImage();
              }}>
              <View style={styles.uploadButton}>
                <Icon name="cloud-upload" size={40} color="#000" />
                <Text style={styles.uploadText}>Upload (.jpg, .png)</Text>
              </View>
            </TouchableWithoutFeedback>
            <Text style={[styles.label, { marginVertical: 10 }]}>
              Preview gambar
            </Text>
            {this.state.avatarSource && (
              <Image
                source={this.state.avatarSource}
                style={{
                  width: '80%',
                  height: 250,
                  resizeMode: 'contain',
                }}
              />
            )}
          </View>

          <View>
            <TouchableOpacity
              disabled={this.state.isProcessing}
              style={[
                styles.linearGradient,
                this.state.isProcessing
                  ? { backgroundColor: 'lightgray', borderRadius: 30 }
                  : {},
              ]}
              onPress={() => {
                this.handleSubmit();
              }}>
              {this.state.isProcessing ? (
                // <LinearButton text="MENYETOR" />
                <ActivityIndicator size="large" color="white" />
              ) : (
                  <LinearButton text="SETOR" />
                )}
            </TouchableOpacity>
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
  linearGradient: {
    height: 45,
    marginTop: 20,
  },

  uploadButton: {
    height: 120,
    marginTop: 15,
    borderRadius: 5,
    borderColor: '#ADADAD',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadText: {
    fontFamily: 'sans-serif-light',
    color: '#4f4f4f',
    fontSize: 15,
    marginTop: 6,
  },
});

const mapStateToProps = (state) => ({
  user: state.user,
  transaksi: state.transaksi,
});
const mapActionsToProps = {
  onSetor: addTransaksi,
};
export default connect(mapStateToProps, mapActionsToProps)(SetorBukti);
