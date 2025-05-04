import React, { useState, useRef, useEffect, forwardRef } from 'react';
import { View,
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
import { useNavigation } from '@react-navigation/native';
import { SocialMediaButton } from '../../components/buttons/SocialMediaButton';
import { PrimaryButton } from '../../components/buttons/PrimaryButton';
import { PrimaryInput } from '../../components/forms/PrimaryInput';
import { SecondaryInput } from '../../components/forms/SecondaryInput';
import { styles } from './styles';

// Wrap PrimaryInput với forwardRef
const ForwardedPrimaryInput = forwardRef((props, ref) => (
  <PrimaryInput {...props} forwardedRef={ref} />
));

// Wrap SecondaryInput với forwardRef
const ForwardedSecondaryInput = forwardRef((props, ref) => (
  <SecondaryInput {...props} forwardedRef={ref} />
));

export const SignUp = () => {
  const [isSelected, setSelection] = useState(false);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isUserNameValid, setIsUserNameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  const navigation = useNavigation();
  const scrollViewRef = useRef(null);
  const userNameRef = useRef(null);
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

  // Hàm kiểm tra tính hợp lệ cho User Name
  const handleUserNameChange = (text) => {
    setUserName(text);
    setIsUserNameValid(text.length > 3);
  };

  // Hàm kiểm tra tính hợp lệ cho Email
  const handleEmailChange = (text) => {
    setEmail(text);
    setIsEmailValid(text !== '' && /\S+@\S+\.\S+/.test(text));
  };

  // Hàm kiểm tra email đã tồn tại
  const checkEmailExists = async (emailToCheck) => {
    try {
      const storedData = await AsyncStorage.getItem('users');
      if (!storedData) return false;
      const users = JSON.parse(storedData);
      return users.some((user) => user.email.toLowerCase() === emailToCheck.toLowerCase());
    } catch (error) {
      console.error('Error checking email:', error);
      return false;
    }
  };

  // Hàm giả lập gọi API đăng ký
  const fakeRegisterApi = async (userData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (userData.email.includes('error')) {
          reject(new Error('Registration failed: Invalid email'));
        } else {
          resolve({ success: true, user: userData });
        }
      }, 1000);
    });
  };

  // Hàm xử lý đăng ký
  const handleRegister = async () => {
    // Kiểm tra điều kiện
    if (!userName) {
      Alert.alert('Error', 'Please enter User Name');
      return;
    }
    if (!isUserNameValid) {
      Alert.alert('Error', 'User Name must be longer than 3 characters');
      return;
    }
    if (!email) {
      Alert.alert('Error', 'Please enter Email address');
      return;
    }
    if (!isEmailValid) {
      Alert.alert('Error', 'Please enter a valid Email address');
      return;
    }
    if (!password) {
      Alert.alert('Error', 'Please enter Password');
      return;
    }
    if (!isSelected) {
      Alert.alert('Error', 'Please agree to the Privacy Policy');
      return;
    }

    // Kiểm tra email đã tồn tại
    const emailExists = await checkEmailExists(email);
    if (emailExists) {
      Alert.alert('Error', 'Email already exists');
      return;
    }

    // Gọi API đăng ký
    try {
      const userData = { userName, email, password };
      const response = await fakeRegisterApi(userData);

      // Lưu vào AsyncStorage (danh sách người dùng)
      let users = [];
      const storedData = await AsyncStorage.getItem('users');
      if (storedData) {
        users = JSON.parse(storedData);
      }
      users.push(userData);
      await AsyncStorage.setItem('users', JSON.stringify(users));

      Alert.alert('Success', 'Registration successful!', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Login'),
        },
      ]);
    } catch (error) {
      Alert.alert('Error', error.message || 'Registration failed');
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
          <Text style={styles.heading}>Create your account</Text>

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
              ref={userNameRef}
              placeHolder="User Name"
              value={userName}
              isValid={isUserNameValid}
              onChangeText={handleUserNameChange}
              onFocus={() => handleInputFocus(userNameRef)}
            />
          </View>
          <View style={styles.inputItem}>
            <ForwardedPrimaryInput
              ref={emailRef}
              placeHolder="Email address"
              value={email}
              isValid={isEmailValid}
              onChangeText={handleEmailChange}
              onFocus={() => handleInputFocus(emailRef)}
            />
          </View>
          <View style={styles.inputItem}>
            <ForwardedSecondaryInput
              ref={passwordRef}
              placeHolder="Password"
              value={password}
              onChangeText={setPassword}
              onFocus={() => handleInputFocus(passwordRef)}
            />
          </View>

          {/* Checkbox Chính sách bảo mật */}
          <View style={styles.privacyPolicyCheckWrapper}>
            <TouchableOpacity style={styles.privacyPolicyLabelWrapper}>
              <Text style={styles.subTitle}>I have read the</Text>
              <Text style={styles.link}> Privacy Policy</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelection(!isSelected)}>
              <Image
                style={styles.checkBox}
                source={
                  isSelected
                    ? require('../../assets/images/check.png')
                    : require('../../assets/images/uncheck.png')
                }
              />
            </TouchableOpacity>
          </View>

          {/* Nút Get Started */}
          <View style={styles.startedBtnWrapper}>
            <PrimaryButton label={'GET STARTED'} onPress={handleRegister} />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

