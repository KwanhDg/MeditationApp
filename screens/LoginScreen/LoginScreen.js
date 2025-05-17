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
        (x, y, width, height) => {
          const offset = Platform.OS === 'ios' ? y - 80 : y - 120; // Điều chỉnh offset cho iOS và Android
          scrollViewRef.current.scrollTo({ y: offset, animated: true });
        },
        () => {
          console.warn('Không thể đo layout của TextInput');
        }
      );
    }, 200); // Tăng thời gian chờ để đảm bảo bàn phím hiển thị hoàn toàn
  };

  // Hàm kiểm tra tính hợp lệ cho Email
  const isEmailValid = (text) => {
    return text.length >= 5 && /^\S+@\S+\.\S+$/.test(text.trim());
  };

  // Hàm xử lý đăng nhập
  const handleLogin = async () => {
    // Kiểm tra điều kiện đầu vào
    if (!email.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập địa chỉ email');
      return;
    }
    if (!isEmailValid(email)) {
      Alert.alert('Lỗi', 'Địa chỉ email không hợp lệ (ít nhất 5 ký tự và đúng định dạng)');
      return;
    }
    if (!password) {
      Alert.alert('Lỗi', 'Vui lòng nhập mật khẩu');
      return;
    }
    if (password.length < 8) {
      Alert.alert('Lỗi', 'Mật khẩu phải có ít nhất 8 ký tự');
      return;
    }

    // Kiểm tra thông tin đăng nhập
    try {
      const storedData = await AsyncStorage.getItem('users');
      if (!storedData) {
        Alert.alert('Lỗi', 'Không có người dùng nào được đăng ký. Vui lòng đăng ký trước!');
        return;
      }

      let users = [];
      try {
        users = JSON.parse(storedData);
        if (!Array.isArray(users) || users.length === 0) {
          Alert.alert('Lỗi', 'Dữ liệu người dùng trống hoặc không hợp lệ');
          return;
        }
      } catch (parseError) {
        console.error('Lỗi parse dữ liệu người dùng:', parseError);
        Alert.alert('Lỗi', 'Không thể đọc dữ liệu người dùng');
        return;
      }

      const normalizedEmail = email.trim().toLowerCase();
      const user = users.find(
        (u) => u.email?.toLowerCase() === normalizedEmail && u.password === password
      );

      if (user) {
        // Lưu thông tin người dùng hiện tại
        await AsyncStorage.setItem('currentUser', JSON.stringify(user));
        Alert.alert('Thành công', 'Đăng nhập thành công!', [
          {
            text: 'OK',
            onPress: () => {
              try {
                navigation.navigate('HomeScreen', { userName: user.userName || 'Người dùng' });
              } catch (navError) {
                console.error('Lỗi navigation:', navError);
                Alert.alert('Lỗi', 'Không thể chuyển hướng đến màn hình chính');
              }
            },
          },
        ]);
      } else {
        Alert.alert('Lỗi', 'Email hoặc mật khẩu không đúng');
      }
    } catch (error) {
      console.error('Lỗi trong quá trình đăng nhập:', error);
      Alert.alert('Lỗi', 'Đăng nhập thất bại, vui lòng thử lại sau');
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
              isValid={isEmailValid(email)}
              onChangeText={setEmail}
              onFocus={() => handleInputFocus(emailRef)}
            />
          </View>
          <View style={styles.inputItem}>
            <ForwardedPrimaryInput
              ref={passwordRef}
              placeHolder="Password"
              value={password}
              isValid={password.length >= 8}
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
          <TouchableOpacity onPress={() => Alert.alert('Thông tin', 'Tính năng quên mật khẩu chưa được triển khai')}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footerWrapper}>
          <Text style={styles.footerText}>
            <Text style={styles.footerText1}>ALREADY HAVE AN ACCOUNT?</Text>
            <Text
              style={styles.footerText2}
              onPress={() => navigation.navigate('SignUpScreen')}
            >
              {' '}SIGN UP
            </Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};