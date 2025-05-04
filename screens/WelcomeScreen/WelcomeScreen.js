import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles';

export const Welcome = ({ route }) => {
  const [userName, setUserName] = useState('');

  // Lấy userName từ params hoặc AsyncStorage
  useEffect(() => {
    const getUserName = async () => {
      try {
        // Ưu tiên lấy từ route.params
        if (route.params?.userName) {
          setUserName(route.params.userName);
          return;
        }
        // Nếu không có params, lấy từ AsyncStorage
        const currentUser = await AsyncStorage.getItem('currentUser');
        if (currentUser) {
          const userData = JSON.parse(currentUser);
          setUserName(userData.userName);
        }
      } catch (error) {
        console.error('Error reading currentUser:', error);
      }
    };
    getUserName();
  }, [route.params]);

  return (
    <View style={styles.container}>
      <View style={styles.logoWrapper}>
        <Image style={styles.logoImage} source={require('../../assets/images/logoWhite.png')} />
      </View>
      <View style={styles.welcomeMessage}>
        <Text style={styles.heading}>Hi {userName || 'Guest'}, Welcome</Text>
        <Text style={styles.subHeading}>to Silent Moon</Text>
        <Text style={styles.description}>
          Explore the app, Find some peace of mind to prepare for meditation.
        </Text>
      </View>
      <View style={styles.welcomeimageWrapper}>
        <Image style={styles.yoga} source={require('../../assets/images/welcomeBg.png')} />
      </View>
      <View style={styles.bgBtn}></View>
      <View style={styles.bgWrapper}>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btnStarted}>
            <Text style={styles.btnStartedLabel}>GET STARTED</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

