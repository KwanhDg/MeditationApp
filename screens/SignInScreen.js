"use client"

import { useState } from "react"
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Image } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { FontAwesome } from "@expo/vector-icons"
import { AntDesign } from "@expo/vector-icons"
import { supabase } from '../supabaseClient'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async () => {
    setLoading(true)
    setError('')
    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (signInError) {
        setError(signInError.message)
      } else {
        await AsyncStorage.setItem('token', data.session.access_token)
        navigation.navigate('Onboarding')
      }
    } catch (err) {
      setError('Có lỗi xảy ra!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#3F414E" />
        </TouchableOpacity>

        <Text style={styles.title}>Welcome Back!</Text>

        <TouchableOpacity style={[styles.socialButton, styles.facebookButton]}>
          <FontAwesome name="facebook" size={24} color="#fff" style={styles.socialIcon} />
          <Text style={[styles.socialButtonText, styles.facebookText]}>CONTINUE WITH FACEBOOK</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.socialButton, styles.googleButton]}>
          <Image source={require("../assets/images/google-logo.png")} style={styles.socialIcon} />
          <Text style={[styles.socialButtonText, styles.googleText]}>CONTINUE WITH GOOGLE</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>OR LOG IN WITH EMAIL</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email address"
            placeholderTextColor="#A1A4B2"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#A1A4B2"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons 
              name={showPassword ? "eye-off" : "eye"} 
              size={20} 
              color="#A1A4B2" 
              style={styles.eyeIcon} 
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
          <Text style={styles.loginButtonText}>{loading ? 'Đang đăng nhập...' : 'LOG IN'}</Text>
        </TouchableOpacity>

        {error ? <Text style={{ color: 'red', marginTop: 8 }}>{error}</Text> : null}

        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={styles.noAccountText}>DON'T HAVE AN ACCOUNT? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.signupText}>SIGN UP</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  card: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 0,
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 32,
    backgroundColor: "#F7F8F8",
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#3F414E",
    marginBottom: 32,
    textAlign: "center",
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    paddingVertical: 14,
    width: "100%",
    marginBottom: 16,
  },
  facebookButton: {
    backgroundColor: "#7583CA",
  },
  googleButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#EBEAEC",
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  socialButtonText: {
    fontSize: 15,
    fontWeight: "700",
  },
  facebookText: {
    color: "#fff",
  },
  googleText: {
    color: "#3F414E",
  },
  orText: {
    fontSize: 13,
    color: "#A1A4B2",
    textAlign: "center",
    marginVertical: 24,
    fontWeight: "600",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7F8F8",
    borderRadius: 16,
    marginBottom: 16,
    paddingHorizontal: 16,
    width: "100%",
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 15,
    color: "#3F414E",
    backgroundColor: "transparent",
  },
  eyeIcon: {
    marginLeft: 10,
  },
  loginButton: {
    backgroundColor: "#8E97FD",
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: "center",
    width: "100%",
    marginTop: 8,
    marginBottom: 16,
  },
  loginButtonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "700",
  },
  forgotPasswordText: {
    fontSize: 13,
    color: "#A1A4B2",
    textAlign: "center",
    marginBottom: 32,
    marginTop: 0,
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "auto",
    marginBottom: 16,
  },
  noAccountText: {
    fontSize: 13,
    color: "#A1A4B2",
  },
  signupText: {
    fontSize: 13,
    color: "#8E97FD",
    fontWeight: "700",
  },
})

export default SignInScreen
