import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"; // Sử dụng từ react-native-safe-area-context

const WelcomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>Silent</Text>
          <Image source={require("../assets/images/moon-logo.png")} style={styles.logo} />
          <Text style={styles.logoText}>Moon</Text>
        </View>

        <Image
          source={require("../assets/images/welcome-illustration.png")}
          style={styles.illustration}
          resizeMode="contain"
        />

        <Text style={styles.title}>We are what we do</Text>
        <Text style={styles.subtitle}>
          Thousands of people are using Silent Moon for small meditation
        </Text>

        <TouchableOpacity style={styles.signUpButton} onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.signUpButtonText}>SIGN UP</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
          <Text style={styles.loginText}>
            ALREADY HAVE AN ACCOUNT? <Text style={styles.loginLink}>LOG IN</Text>
          </Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  card: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  logoText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#3F414E",
  },
  logo: {
    width: 30,
    height: 30,
    marginHorizontal: 5,
  },
  illustration: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
    marginVertical: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#3F414E",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#A1A4B2",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 30,
    paddingHorizontal: 20,
    lineHeight: 24,
  },
  signUpButton: {
    backgroundColor: "#8E97FD",
    borderRadius: 38,
    paddingVertical: 15,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  signUpButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
  loginText: {
    fontSize: 14,
    color: "#A1A4B2",
    marginBottom: 20,
    textAlign: "center",
  },
  loginLink: {
    color: "#8E97FD",
    fontWeight: "600",
  },
});

export default WelcomeScreen;