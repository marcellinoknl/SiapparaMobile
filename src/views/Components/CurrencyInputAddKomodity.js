import React from 'react';
import CurrencyInputs from 'react-native-currency-input';
import { View, StyleSheet, Text } from 'react-native';

const CurrencyInput = (props) => {
    const [value, setValue] = React.useState(0);

    return (
        <View>
            <CurrencyInputs
                style={style.input}
                value={value}
                onChangeValue={setValue}
                unit="Rp. "
                delimiter=","
                precision={0}
                onChangeText={() => {
                    props.calculateSallary(value);
                }}
            />
        </View>
    );
}

const style = StyleSheet.create({
    input: {
        borderColor: '#ADADAD',
        borderWidth: 1,
        marginTop: 6,
        borderRadius: 5,
        paddingLeft: 10,
    }
});

export default CurrencyInput;