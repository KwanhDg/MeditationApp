import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const CourseCard = ({ title, subtitle, duration, color, image, onPress }) => {
  return (
    <TouchableOpacity style={[styles.courseCard, { backgroundColor: color }]} onPress={onPress}>
      <View style={styles.courseInfo}>
        <Text style={styles.courseTitle}>{title}</Text>
        <Text style={styles.courseSubtitle}>{subtitle}</Text>
      </View>
      <View style={styles.courseBottomRow}>
        <Text style={styles.courseDuration}>{duration}</Text>
        <TouchableOpacity style={styles.startButton} onPress={onPress}>
          <Text style={styles.startButtonText}>START</Text>
        </TouchableOpacity>
      </View>
      <Image source={image} style={styles.courseImage} resizeMode="contain" />
    </TouchableOpacity>
  );
};

const RecommendedCard = ({ title, type, duration, image, onPress }) => {
  return (
    <TouchableOpacity style={styles.recommendedCard} onPress={onPress}>
      <Image source={image} style={styles.recommendedImage} />
      <Text style={styles.recommendedTitle}>{title}</Text>
      <Text style={styles.recommendedDetails}>
        {type} • {duration}
      </Text>
    </TouchableOpacity>
  );
};

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Header */}
        <View style={styles.logoWrapper}>
          <Text style={styles.logoText}>Silent</Text>
          <Image source={require("../assets/images/moon-logo.png")} style={styles.logo} />
          <Text style={styles.logoText}>Moon</Text>
        </View>

        {/* Greetings */}
        <Text style={styles.greeting}>Good Morning, Afsar</Text>
        <Text style={styles.subgreeting}>We wish you have a good day</Text>

        {/* Courses */}
        <View style={styles.coursesContainer}>
          <CourseCard
            title="Basics"
            subtitle="COURSE"
            duration="3-10 MIN"
            color="#8E97FD"
            image={require("../assets/images/basics-icon.png")}
            onPress={() => navigation.navigate("CourseDetail")}
          />

          <CourseCard
            title="Relaxation"
            subtitle="MUSIC"
            duration="3-10 MIN"
            color="#FFC97E"
            image={require("../assets/images/relaxation-icon.png")}
            onPress={() => navigation.navigate("CourseDetail")}
          />
        </View>

        {/* Daily Thought */}
        <TouchableOpacity style={styles.dailyThoughtCard} onPress={() => navigation.navigate("Player")}>
          <View style={styles.dailyThoughtContent}>
            <Text style={styles.dailyThoughtTitle}>Daily Thought</Text>
            <Text style={styles.dailyThoughtSubtitle}>MEDITATION • 3-10 MIN</Text>
          </View>
          <View style={styles.playButton}>
            <Feather name="play" size={20} color="white" />
          </View>
        </TouchableOpacity>

        {/* Recommended Section */}
        <Text style={styles.recommendedSectionTitle}>Recommended for you</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.recommendedContainer}
        >
          <RecommendedCard
            title="Focus"
            type="MEDITATION"
            duration="3-10 MIN"
            image={require("../assets/images/focus-thumbnail.png")}
            onPress={() => navigation.navigate("CourseDetail")}
          />
          <RecommendedCard
            title="Happiness"
            type="MEDITATION"
            duration="3-10 MIN"
            image={require("../assets/images/happiness-thumbnail.png")}
            onPress={() => navigation.navigate("CourseDetail")}
          />
          <RecommendedCard
            title="Focus"
            type="MEDITATION"
            duration="3-10 MIN"
            image={require("../assets/images/focus-thumbnail.png")}
            onPress={() => navigation.navigate("CourseDetail")}
          />
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: "#fff",
  },
  scroll: {
    padding: 20,
    paddingBottom: 100,
  },
  logoWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  logoText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#3F414E",
    marginHorizontal: 2,
  },
  logo: {
    width: 24,
    height: 24,
  },
  greeting: {
    fontSize: 28,
    fontWeight: "700",
    color: "#3F414E",
    marginBottom: 5,
  },
  subgreeting: {
    fontSize: 16,
    color: "#A1A4B2",
    marginBottom: 25,
  },
  coursesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  courseCard: {
    width: "48%",
    borderRadius: 10,
    padding: 15,
    height: 180,
    justifyContent: "space-between",
    overflow: "hidden",
  },
  courseInfo: {
    zIndex: 2,
  },
  courseTitle: {
    zIndex: 3,
    fontSize: 18,
    fontWeight: "700",
    color: "white",
    marginBottom: 5,
    marginTop: 60,
  },
  courseSubtitle: {
    fontSize: 11,
    color: "rgba(255,255,255,0.7)",
  },
  courseBottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  courseDuration: {
    fontSize: 11,
    color: "rgba(255,255,255,0.7)",
  },
  startButton: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  startButtonText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#3F414E",
  },
  courseImage: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 100,
    height: 100,
  },
  dailyThoughtCard: {
    backgroundColor: "#333242",
    borderRadius: 10,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  dailyThoughtContent: {},
  dailyThoughtTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "white",
    marginBottom: 5,
  },
  dailyThoughtSubtitle: {
    fontSize: 11,
    color: "rgba(255,255,255,0.7)",
  },
  playButton: {
    backgroundColor: "rgba(255,255,255,0.3)",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  recommendedSectionTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#3F414E",
    marginBottom: 15,
  },
  recommendedContainer: {
    paddingBottom: 30,
  },
  recommendedCard: {
    width: 160,
    marginRight: 20,
  },
  recommendedImage: {
    width: 160,
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  recommendedTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#3F414E",
    marginBottom: 5,
  },
  recommendedDetails: {
    fontSize: 11,
    color: "#A1A4B2",
  },
  tabBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
  },
  tabItem: {
    alignItems: "center",
  },
  tabLabel: {
    fontSize: 12,
    color: "#A0A3B1",
    marginTop: 5,
  },
  activeTabLabel: {
    color: "#8E97FD",
  },
});

export default HomeScreen;
