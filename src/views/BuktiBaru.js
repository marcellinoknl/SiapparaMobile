/* eslint-disable prettier/prettier */
import Axios from 'axios';
import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
  StyleSheet,
  Image,
} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {base_url} from '../../config';
import LinearButton from './Components/LinearButton';
import ImagePicker from 'react-native-image-picker';

class BuktiBaru extends Component {
  state = {
    avatarSource: null,
    imagePickerRes: {},
    isProcessing: false,
  };

  async handleSubmit() {
    const params = this.props.route.params.data;
    var data = new FormData();
    data.append('bukti_setor', {
      uri: this.state.imagePickerRes.uri,
      name: this.state.imagePickerRes.fileName,
      type: this.state.imagePickerRes.type,
    });
    data.append('id', params.id);
    await Axios.post(`${base_url}/add-bukti-penyetoran`, data, {
      headers: {'Content-Type': 'multipart/form-data'},
    }).then((res) => {
      console.log(res);
      // this.props.transaksi[params.tanggal].statusSetoran = true;
      // this.props.onSetor(this.props.transaksi, null, null, null, null, true);
      // setData('@transaksi', this.props.transaksi);
      ToastAndroid.show(`Upload Bukti Setoran Baru Sukses`, ToastAndroid.LONG);
      this.props.navigation.navigate('Home');
    });
  }

  selectImage = async () => {
    console.log('select image');
    ImagePicker.launchCamera(
      {
        noData: true,
        mediaType: 'photo',
        quality: 0.2,
        storageOptions: {skipBackup: true, path: 'ebilling/bukti-setor'},
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
          const source = {uri: response.uri};
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

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View>
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
            <Text style={[styles.label, {marginVertical: 10}]}>
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
                  ? {backgroundColor: 'lightgray', borderRadius: 30}
                  : {},
              ]}
              onPress={() => {
                this.handleSubmit();
              }}>
              {this.state.isProcessing ? (
                // <LinearButton text="MENYETOR" />
                <ActivityIndicator size="large" color="white" />
              ) : (
                <LinearButton text="UPLOAD" />
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
export default BuktiBaru;
