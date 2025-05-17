import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Image } from "react-native"
import { LinearGradient } from "expo-linear-gradient"

const OnboardingScreen = ({ navigation }) => {
  return (
    <LinearGradient colors={["#8E97FD", "#7583CA"]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.logoRow}>
          <Text style={styles.logoText}>Silent</Text>
          <Image source={require("../assets/images/moon-logo-white.png")} style={styles.logo} />
          <Text style={styles.logoText}>Moon</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.welcomeText}>Hi Afsar, Welcome</Text>
          <Text style={styles.subtitleText}>to Silent Moon</Text>
          <Text style={styles.descriptionText}>
            Explore the app, Find some peace of mind to prepare for meditation.
          </Text>
          <Image source={require("../assets/images/meditation-illustration.png")} style={styles.illustration} resizeMode="contain" />
          <TouchableOpacity style={styles.getStartedButton} onPress={() => navigation.navigate("Topic")}> 
            <Text style={styles.getStartedButtonText}>GET STARTED</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 48,
    marginBottom: 16,
  },
  logoText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
    letterSpacing: 1,
  },
  logo: {
    width: 28,
    height: 28,
    marginHorizontal: 6,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 24,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: "700",
    color: "#FFECCC",
    textAlign: "center",
    marginTop: 16,
    marginBottom: 0,
  },
  subtitleText: {
    fontSize: 22,
    fontWeight: "400",
    color: "white",
    textAlign: "center",
    marginBottom: 16,
  },
  descriptionText: {
    fontSize: 15,
    color: "white",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 22,
    opacity: 0.9,
  },
  illustration: {
    width: "100%",
    height: 400,
    marginBottom: 40,
  },
  getStartedButton: {
    backgroundColor: "white",
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 48,
    alignItems: "center",
    marginTop: 16,
    marginBottom: 16,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  getStartedButtonText: {
    color: "#8E97FD",
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 1,
  },
})

export default OnboardingScreen
