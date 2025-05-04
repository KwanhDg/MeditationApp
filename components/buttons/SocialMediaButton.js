import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

export const SocialMediaButton = (props) => {
  const {label, background, btnType, fontColor} = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.btn, {backgroundColor: background}]}>
        <Image
          style={styles.socialIcon}
          source={
            btnType === 'FACEBOOK'
              ? require('../../assets/images/facebook.png')
              : require('../../assets/images/google.png')
          }
        />
        <Text style={[styles.label, {color: fontColor}]}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
  },
  btn: {
    backgroundColor: '#7583CA',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EBEAEC',
  },
  label: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '#F6F1FB',
    color: '#F6F1FB',
    fontFamily: 'HelveticaNeue',
    padding: 20,
    alignSelf: 'center',
  },
  socialIcon: {
    position: 'absolute',
    left: 30,
  },
});