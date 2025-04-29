// WelcomeSleep.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const WelcomeSleep = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Image
        source={require('../assets/images/night-background.png')} // Hình nền mới mà bạn đã tải lên
        style={styles.background}
      />

      {/* Content */}
      <Image
        source={require('../assets/images/birds-sleeping.png')} // Hình ảnh con chim ngủ
        style={styles.image}
      />

      {/* Title and Description */}
      <Text style={styles.title}>Welcome to Sleep</Text>
      <Text style={styles.description}>
        Explore the new kind of sleep. It uses sound and visualization to create perfect conditions for refreshing sleep.
      </Text>

      {/* GET STARTED Button using TouchableOpacity */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SleepStories')}
      >
        <Text style={styles.buttonText}>GET STARTED</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Các phần tử bắt đầu từ trên cùng
    alignItems: 'center',
    padding: 20,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '111%',
    height: '111%',
    resizeMode: 'cover', // Đảm bảo hình ảnh chiếm toàn bộ màn hình mà không bị biến dạng
  },
  image: {
    position: 'absolute',
    right: 0, // Di chuyển hình ảnh sang bên phải
    bottom: 180, // Đặt khoảng cách từ dưới màn hình
    width: 350, // Tăng kích thước hình ảnh
    height: 250, // Tăng kích thước hình ảnh
  },
  title: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 180, // Kéo tiêu đề lên 30px từ trên
    marginBottom: 10, // Giảm khoảng cách dưới tiêu đề
  },
  description: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20, // Giảm khoảng cách dưới mô tả
  },
  button: {
    marginTop: 280, // Khoảng cách từ mô tả đến nút
    backgroundColor: '#8e97fd',
    borderRadius: 25,
    width:360,
    paddingVertical: 15,
    paddingHorizontal: 40,
  },
  buttonText: {
    color: 'white',  // Màu chữ cho nút
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default WelcomeSleep;
