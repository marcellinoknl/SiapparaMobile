import React, { useState, useEffect } from 'react';
import MyStack from './src/routes/StackNavigation';
import { NavigationContainer } from '@react-navigation/native';
import Login from './src/views/Login';

import { applyMiddleware, combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';

import allReducer from './src/reducers/allReducer';
import { getData, removeData, setData } from './src/localStorage';
import Loader from './src/views/Components/Loader';

import {
  addKomoditiTrans,
  addReceipt,
  addTransaksi,
  bulanReceipt,
  kalkulasiSetoran,
  updateBiayaRetribusi,
  updateListKomoditi,
  updateUser,
} from './src/actions/userAction';
import { calculateDate } from './date';

const reducer = combineReducers(allReducer);
const store = createStore(reducer, applyMiddleware(logger));
console.log(store.getState());
// save user to redux
getData('@user').then((res) => {
  if (res !== null) {
    const userData = JSON.parse(res);
    // console.log('user', userData);
    store.dispatch(updateUser(userData));
  } else {
    // do nothing
  }
});

// removeData('@kalkulasiSetoran');
// getData('@kalkulasiSetoran').then((res) => {
//   if (res !== null) {
//     const data = JSON.parse(res);
//     // console.log('kalkulasi', data);
//     store.dispatch(kalkulasiSetoran(data, true));
//   } else {
//     // store.dispatch(updateUser(''));
//   }
// });

// removeData('@komoditi');
getData('@komoditi').then((res) => {
  if (res !== null) {
    const data = JSON.parse(res);
    store.dispatch(updateListKomoditi(data));
  } else {
    // do nothing
  }
});

getData('@biayaRetribusi').then((res) => {
  if (res !== null) {
    const data = JSON.parse(res);
    store.dispatch(updateBiayaRetribusi(data));
  } else {
    // do nothing
  }
});

// removeData('@tambahKomoditi');
getData('@tambahKomoditi').then((res) => {
  if (res !== null) {
    const data = JSON.parse(res);
    console.log('data', data);
    store.dispatch(addKomoditiTrans(data, true));
  } else {
    console.log('komoditi null');
    // do nothing
  }
});
// removeData('@tambahReceipt');
// getData('@tambahReceipt').then((res) => {
//   if (res !== null) {
//     const data = JSON.parse(res);
//     console.log(data);
//     store.dispatch(addReceipt(data, true));
//   } else {
//     // do nothing
//   }
// });

// removeData('@bulanReceipt');
getData('@bulanReceipt').then((res) => {
  if (res !== null) {
    const data = JSON.parse(res);
    console.log(data);
    store.dispatch(bulanReceipt(data, null, true));
  } else {
    // do nothing
  }
});

// removeData('@bulanReceipt');
getData('@transaksi').then(async (res) => {
  if (res !== null) {
    const date = Date.now();
    const d = new Date(date);
    const datetime = calculateDate(d);
    const data = JSON.parse(res);
    // await delete data[datetime.tanggal];
    // setData('@transaksi', data)
    // console.log(datetime.tanggal);
    store.dispatch(
      addTransaksi(data, datetime.tanggal, null, null, null, true),
    );
  }
});

const App = () => {
  const [isLogin, setIsLogin] = useState();
  const [loading, setLoading] = useState(true);

  const handleAuth = () => {
    setLoading(true);
    setIsLogin(true);
    console.log('handleAuth');
  };

  useEffect(() => {
    getData('@user')
      .then((res) => {
        if (res !== null) {
          const userData = JSON.parse(res);
          // console.log(userData);
          setIsLogin(userData.isLogin);
          setLoading(false);
        }

        setInterval(() => {
          setLoading(false);
        }, 4000);
      })
      .catch((e) => {
        console.log(e);
      });
  });

  if (loading) {
    return <Loader></Loader>;
  }

  if (!isLogin) {
    return (
      <Provider store={store}>
        <Login isLogin={isLogin} onchange={handleAuth} />
      </Provider>
    );
  } else {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <MyStack isLoading={loading} />
        </NavigationContainer>
      </Provider>
    );
  }
  // return <Upload />;
};

export default App;
