"use client"

import { useState } from "react"
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Image } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { AntDesign } from "@expo/vector-icons"
import { FontAwesome } from "@expo/vector-icons"
import { supabase } from '../supabaseClient'

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [agreeToPolicy, setAgreeToPolicy] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleRegister = async () => {
    setLoading(true)
    setError('')
    setSuccess('')
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name },
        },
      })
      if (signUpError) {
        setError(signUpError.message)
      } else {
        setSuccess('Đăng ký thành công! Hãy kiểm tra email để xác thực.')
        // Có thể chuyển sang màn hình đăng nhập nếu muốn:
        // navigation.navigate('SignIn')
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

        <Text style={styles.title}>Create your account</Text>

        <TouchableOpacity style={[styles.socialButton, styles.facebookButton]}>
          <FontAwesome name="facebook" size={24} color="#fff" style={styles.socialIcon} />
          <Text style={[styles.socialButtonText, styles.facebookText]}>CONTINUE WITH FACEBOOK</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.socialButton, styles.googleButton]}>
          <Image source={require("../assets/images/google-logo.png")} style={styles.socialIcon} />
          <Text style={[styles.socialButtonText, styles.googleText]}>CONTINUE WITH GOOGLE</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>OR SIGN UP WITH EMAIL</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Name"
            placeholderTextColor="#A1A4B2"
          />
          {name.length > 0 && <AntDesign name="check" size={20} color="#4CAF50" style={styles.checkIcon} />}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email address"
            placeholderTextColor="#A1A4B2"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {email.length > 0 && <AntDesign name="check" size={20} color="#4CAF50" style={styles.checkIcon} />}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor="#A1A4B2"
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

        <View style={styles.policyContainer}>
          <TouchableOpacity 
            style={[styles.checkbox, agreeToPolicy && styles.checkedBox]} 
            onPress={() => setAgreeToPolicy(!agreeToPolicy)}
          >
            {agreeToPolicy && <AntDesign name="check" size={16} color="#8E97FD" />}
          </TouchableOpacity>
          <Text style={styles.policyText}>
            I have read the <Text style={styles.policyLink}>Privacy Policy</Text>
          </Text>
        </View>

        <TouchableOpacity style={[styles.getStartedButton, !agreeToPolicy && styles.disabledButton]} onPress={handleRegister} disabled={loading || !agreeToPolicy}>
          <Text style={styles.getStartedButtonText}>{loading ? 'Đang đăng ký...' : 'GET STARTED'}</Text>
        </TouchableOpacity>

        {error ? <Text style={{ color: 'red', marginTop: 8 }}>{error}</Text> : null}
        {success ? <Text style={{ color: 'green', marginTop: 8 }}>{success}</Text> : null}

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
  checkIcon: {
    marginLeft: 10,
  },
  eyeIcon: {
    marginLeft: 10,
  },
  policyContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
    width: "100%",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#A1A4B2",
    borderRadius: 4,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  checkedBox: {
    borderColor: "#8E97FD",
  },
  policyText: {
    fontSize: 13,
    color: "#A1A4B2",
  },
  policyLink: {
    color: "#8E97FD",
  },
  getStartedButton: {
    backgroundColor: "#8E97FD",
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: "center",
    width: "100%",
    marginTop: 8,
    marginBottom: 16,
  },
  disabledButton: {
    backgroundColor: "#E5E5E5",
  },
  getStartedButtonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "700",
  },
})

export default SignUpScreen
