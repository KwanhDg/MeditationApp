import React, { forwardRef } from 'react';
import { View, Text, StyleSheet, TextInput, Image } from 'react-native';

export const PrimaryInput = forwardRef(
  ({ placeHolder, isValid, value, onChangeText, onFocus, forwardedRef, secureTextEntry }, ref) => {
    return (
      <View style={styles.container}>
        <TextInput
          ref={forwardedRef}
          value={value}
          style={styles.input}
          placeholder={placeHolder}
          placeholderTextColor={'#A1A4B2'}
          onChangeText={onChangeText}
          onFocus={onFocus}
          secureTextEntry={secureTextEntry}
        />
        <View style={styles.validityShowWrapper}>
          {isValid && value !== '' ? (
            <Image source={require('../../assets/images/checked.png')} />
          ) : null}
        </View>
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
  validityShowWrapper: {
    marginRight: 15,
  },
});