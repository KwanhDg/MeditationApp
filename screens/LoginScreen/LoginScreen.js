import React, { useState, useRef, useEffect, forwardRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SocialMediaButton } from '../../components/buttons/SocialMediaButton';
import { PrimaryButton } from '../../components/buttons/PrimaryButton';
import { PrimaryInput } from '../../components/forms/PrimaryInput';
import { styles } from './styles';

// Wrap PrimaryInput với forwardRef
const ForwardedPrimaryInput = forwardRef((props, ref) => (
  <PrimaryInput {...props} forwardedRef={ref} />
));

export const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const scrollViewRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  // Đặt lại vị trí cuộn khi bàn phím ẩn
  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    });

    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  // Hàm để cuộn đến TextInput khi focus
  const handleInputFocus = (inputRef) => {
    setTimeout(() => {
      inputRef.current.measureLayout(
        scrollViewRef.current,
        (x, y) => {
          scrollViewRef.current.scrollTo({ y, animated: true });
        },
        () => {}
      );
    }, 100);
  };

  // Hàm kiểm tra tính hợp lệ cho Email
  const isEmailValid = (text) => {
    return text !== '' && /\S+@\S+\.\S+/.test(text);
  };

  // Hàm xử lý đăng nhập
  const handleLogin = async () => {
    // Kiểm tra điều kiện
    if (!email) {
      Alert.alert('Error', 'Please enter Email address');
      return;
    }
    if (!isEmailValid(email)) {
      Alert.alert('Error', 'Please enter a valid Email address');
      return;
    }
    if (!password) {
      Alert.alert('Error', 'Please enter Password');
      return;
    }

    // Kiểm tra thông tin đăng nhập
    try {
      const storedData = await AsyncStorage.getItem('users');
      if (!storedData) {
        Alert.alert('Error', 'No users registered');
        return;
      }
      const users = JSON.parse(storedData);
      const user = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );
      if (user) {
        // Lưu thông tin người dùng hiện tại
        await AsyncStorage.setItem('currentUser', JSON.stringify(user));
        Alert.alert('Success', 'Login successful!', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Welcome', { userName: user.userName }),
          },
        ]);
      } else {
        Alert.alert('Error', 'Invalid email or password');
      }
    } catch (error) {
      Alert.alert('Error', 'Login failed');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
    >
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Hình ảnh nền */}
        <Image
          style={styles.vector1}
          source={require('../../assets/images/vector1.png')}
        />
        <Image
          style={styles.vector2}
          source={require('../../assets/images/vector2.png')}
        />
        <Image
          style={styles.vector3}
          source={require('../../assets/images/vector3.png')}
        />
        <Image
          style={styles.vector4}
          source={require('../../assets/images/vector4.png')}
        />

        {/* Nội dung chính */}
        <View style={styles.contentContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={styles.back}
              source={require('../../assets/images/back.png')}
            />
          </TouchableOpacity>
          <Text style={styles.heading}>Welcome Back!</Text>

          {/* Nút Facebook và Google */}
          <View style={styles.btnContainer}>
            <View style={styles.btnWrapperItem}>
              <SocialMediaButton
                label={'CONTINUE WITH FACEBOOK'}
                background={'#7583CA'}
                fontColor={'#F6F1FB'}
                btnType="FACEBOOK"
              />
            </View>
            <View style={styles.btnWrapperItem}>
              <SocialMediaButton
                label={'CONTINUE WITH GOOGLE'}
                background={'#EBEAEC'}
                fontColor={'#3F414E'}
                btnType="GOOGLE"
              />
            </View>
          </View>

          <Text style={styles.or}>OR LOG IN WITH EMAIL</Text>

          {/* Các Input */}
          <View style={styles.inputItem}>
            <ForwardedPrimaryInput
              ref={emailRef}
              placeHolder="Email address"
              value={email}
              isValid={false}
              onChangeText={setEmail}
              onFocus={() => handleInputFocus(emailRef)}
            />
          </View>
          <View style={styles.inputItem}>
            <ForwardedPrimaryInput
              ref={passwordRef}
              placeHolder="Password"
              value={password}
              isValid={false}
              onChangeText={setPassword}
              secureTextEntry={true}
              onFocus={() => handleInputFocus(passwordRef)}
            />
          </View>

          {/* Nút Login */}
          <View style={styles.loginBtnWrapper}>
            <PrimaryButton label={'LOG IN'} onPress={handleLogin} />
          </View>

          {/* Forgot Password */}
          <TouchableOpacity onPress={() => Alert.alert('Info', 'Forgot Password feature not implemented')}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footerWrapper}>
          <Text style={styles.footerText}>
            <Text style={styles.footerText1}>ALREADY HAVE AN ACCOUNT?</Text>
            <Text
              style={styles.footerText2}
              onPress={() => navigation.navigate('SignUp')}
            >
              {' '}
              SIGN UP
            </Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

