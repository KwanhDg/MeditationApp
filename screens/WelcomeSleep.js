// WelcomeSleep.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';

const WelcomeSleep = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../assets/images/night-background.png')}
        style={styles.background}
      />
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to Sleep</Text>
        <Text style={styles.description}>
          Explore the new kind of sleep. It uses sound and visualization to create perfect conditions for refreshing sleep.
        </Text>
        <Image
          source={require('../assets/images/birds-sleeping.png')}
          style={styles.image}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SleepStories')}
      >
        <Text style={styles.buttonText}>GET STARTED</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 24,
    marginTop: 40,
  },
  image: {
    width: '120%',
    height: 220,
    marginTop: 16,
    marginBottom: 16,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 22,
    opacity: 0.9,
  },
  button: {
    backgroundColor: '#8e97fd',
    borderRadius: 25,
    width: '90%',
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 32,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default WelcomeSleep;
