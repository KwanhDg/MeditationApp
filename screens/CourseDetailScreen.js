import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, Image } from "react-native"
import { Feather } from "@expo/vector-icons"
import React, { useState } from "react"

const defaultCourse = {
  title: "Happy Morning",
  description: "Ease the mind into a restful night's sleep with these deep, ambient tones.",
  image: require("../assets/images/happy-morning-banner.png"),
  sessions: [
    { id: 1, title: "Focus Attention", duration: "10 MIN" },
    { id: 2, title: "Body Scan", duration: "5 MIN" },
    { id: 3, title: "Making Happiness", duration: "3 MIN" },
  ],
};

const courseData = {
  0: {
    title: "Daily Calm",
    description: "A daily meditation to help you pause and reset.",
    image: require("../assets/images/7-days-of-calm.png"),
    sessions: [
      { id: 1, title: "Pause Practice", duration: "10 MIN" },
      { id: 2, title: "Mindful Start", duration: "8 MIN" },
    ],
  },
  1: {
    title: "7 Days of Calm",
    description: "A week-long journey to inner peace and calm.",
    image: require("../assets/images/7-days-of-calm.png"),
    sessions: [
      { id: 1, title: "Focus Attention", duration: "10 MIN" },
      { id: 2, title: "Body Scan", duration: "5 MIN" },
      { id: 3, title: "Making Happiness", duration: "3 MIN" },
    ],
  },
  2: {
    title: "Anxiety Release",
    description: "Meditations to help you release anxiety and find calm.",
    image: require("../assets/images/anxiety-release.png"),
    sessions: [
      { id: 1, title: "Letting Go", duration: "8 MIN" },
      { id: 2, title: "Breath Awareness", duration: "6 MIN" },
    ],
  },
  3: {
    title: "Emergency Calm",
    description: "Quick practices for moments of stress.",
    image: require("../assets/images/emergency-calm.png"),
    sessions: [
      { id: 1, title: "Quick Calm", duration: "5 MIN" },
      { id: 2, title: "Reset Mind", duration: "7 MIN" },
    ],
  },
  4: {
    title: "Breathe & Focus",
    description: "Breathing exercises to improve focus and clarity.",
    image: require("../assets/images/breathe-focus.png"),
    sessions: [
      { id: 1, title: "Deep Breathing", duration: "6 MIN" },
      { id: 2, title: "Focus Practice", duration: "9 MIN" },
    ],
  },
};

const SessionItem = ({ title, duration, onPress }) => {
  return (
    <TouchableOpacity style={styles.sessionItem} onPress={onPress}>
      <TouchableOpacity style={styles.sessionPlayButton}>
        <Feather name="play" size={20} color="#8E97FD" />
      </TouchableOpacity>
      <View style={styles.sessionInfo}>
        <Text style={styles.sessionTitle}>{title}</Text>
        <Text style={styles.sessionDuration}>{duration}</Text>
      </View>
    </TouchableOpacity>
  )
}

const CourseDetailScreen = ({ navigation, route }) => {
  const { courseId } = route.params || {};
  const course = courseData[courseId] || defaultCourse;

  const [isFavorite, setIsFavorite] = useState(false);

  const handlePlay = (sessionId) => {
    navigation.navigate('Player', { sessionId });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Image source={course.image} style={styles.banner} />

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.favoriteButton} onPress={() => setIsFavorite(!isFavorite)}>
          <Feather name="heart" size={24} color={isFavorite ? "#FA6E5A" : "black"} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.downloadButton}>
          <Feather name="download" size={24} color="black" />
        </TouchableOpacity>

        <ScrollView style={styles.content}>
          <Text style={styles.title}>{course.title}</Text>
          <Text style={styles.courseLabel}>COURSE</Text>

          <Text style={styles.description}>{course.description}</Text>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Feather name="heart" size={20} color="#FA6E5A" />
              <Text style={styles.statValue}>24,234 Favorits</Text>
            </View>
            <View style={styles.statItem}>
              <Feather name="headphones" size={20} color="#8E97FD" />
              <Text style={styles.statValue}>34,234 Listening</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Pick a Session</Text>

          <View style={styles.narratorContainer}>
            <TouchableOpacity style={[styles.narratorButton, styles.activeNarratorButton]}>
              <Text style={[styles.narratorButtonText, styles.activeNarratorButtonText]}>MALE VOICE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.narratorButton}>
              <Text style={styles.narratorButtonText}>FEMALE VOICE</Text>
            </TouchableOpacity>
          </View>

          {course.sessions.map((session) => (
            <SessionItem
              key={session.id}
              title={session.title}
              duration={session.duration}
              onPress={() => handlePlay(session.id)}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  card: {
    flex: 1,
    backgroundColor: "white",
    overflow: "hidden",
  },
  banner: {
    width: "100%",
    height: 230,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  favoriteButton: {
    position: "absolute",
    top: 40,
    right: 70,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  downloadButton: {
    position: "absolute",
    top: 40,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#3F414E",
  },
  courseLabel: {
    fontSize: 14,
    color: "#A1A4B2",
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: "#A1A4B2",
    lineHeight: 24,
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: "row",
    marginBottom: 30,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 30,
  },
  statValue: {
    fontSize: 14,
    color: "#A1A4B2",
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#3F414E",
    marginBottom: 20,
  },
  narratorContainer: {
    flexDirection: "row",
    marginBottom: 30,
  },
  narratorButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 20,
  },
  narratorButtonText: {
    fontSize: 14,
    color: "#A1A4B2",
  },
  activeNarratorButton: {
    borderBottomWidth: 2,
    borderBottomColor: "#8E97FD",
  },
  activeNarratorButtonText: {
    color: "#8E97FD",
    fontWeight: "700",
  },
  sessionItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  sessionPlayButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(142, 151, 253, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  sessionInfo: {
    flex: 1,
  },
  sessionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#3F414E",
    marginBottom: 5,
  },
  sessionDuration: {
    fontSize: 12,
    color: "#A1A4B2",
  },
})

export default CourseDetailScreen
