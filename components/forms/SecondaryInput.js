import React, { forwardRef, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';

export const SecondaryInput = forwardRef(
  ({ placeHolder, value, onChangeText, onFocus, forwardedRef }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <View style={styles.container}>
        <TextInput
          ref={forwardedRef}
          value={value}
          secureTextEntry={!showPassword}
          style={styles.input}
          placeholder={placeHolder}
          onChangeText={onChangeText}
          onFocus={onFocus}
          placeholderTextColor={'#A1A4B2'}
        />
        <TouchableOpacity
          style={styles.eyeWrapper}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Image
            style={{ opacity: showPassword ? 0.5 : 1 }}
            source={require('../../assets/images/eye.png')}
          />
        </TouchableOpacity>
      </View>
    );
  }
);

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2F3F7',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontFamily: 'HelveticaNeue',
  },
  input: {
    padding: 20,
    fontSize: 16,
    letterSpacing: 0.08,
    lineHeight: 17,
    flex: 1,
  },
  eyeWrapper: {
    marginRight: 15,
  },
});