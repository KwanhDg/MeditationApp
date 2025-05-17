import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, Image } from "react-native"
import { Feather } from "@expo/vector-icons"

const FilterButton = ({ title, icon, active, onPress }) => {
  return (
    <TouchableOpacity style={[styles.filterButton, active && styles.activeFilterButton]} onPress={onPress}>
      {icon}
      <Text style={[styles.filterButtonText, active && styles.activeFilterButtonText]}>{title}</Text>
    </TouchableOpacity>
  )
}

const MeditationCard = ({ title, subtitle, duration, image, onPress }) => {
  return (
    <TouchableOpacity style={styles.meditationCard} onPress={onPress}>
      <Image source={image} style={styles.meditationImage} />
      <Text style={styles.meditationTitle}>{title}</Text>
      <Text style={styles.meditationDetails}>
        {subtitle} • {duration}
      </Text>
    </TouchableOpacity>
  )
}

const meditationCourses = [
  {
    courseId: 1,
    title: "7 Days of Calm",
    subtitle: "MEDITATION",
    duration: "3-10 MIN",
    image: require("../assets/images/7-days-of-calm.png"),
  },
  {
    courseId: 2,
    title: "Anxiety Release",
    subtitle: "MEDITATION",
    duration: "3-10 MIN",
    image: require("../assets/images/anxiety-release.png"),
  },
  {
    courseId: 3,
    title: "Emergency Calm",
    subtitle: "PRACTICE",
    duration: "3-10 MIN",
    image: require("../assets/images/emergency-calm.png"),
  },
  {
    courseId: 4,
    title: "Breathe & Focus",
    subtitle: "MEDITATION",
    duration: "3-10 MIN",
    image: require("../assets/images/breathe-focus.png"),
  },
];

const MeditateScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Meditate</Text>
        <Text style={styles.subtitle}>
          we can learn how to recognize when our minds are doing their normal everyday acrobatics.
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersContainer}>
          <FilterButton title="All" icon={<Feather name="plus" size={20} color="white" />} active={true} />
          <FilterButton title="My" icon={<Feather name="heart" size={20} color="#A0A3B1" />} />
          <FilterButton title="Anxious" icon={<Feather name="frown" size={20} color="#A0A3B1" />} />
          <FilterButton title="Sleep" icon={<Feather name="moon" size={20} color="#A0A3B1" />} />
          <FilterButton title="Kids" icon={<Feather name="smile" size={20} color="#A0A3B1" />} />
        </ScrollView>

        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity style={styles.dailyCalmCard} onPress={() => navigation.navigate("CourseDetail", { courseId: 0, title: "Daily Calm" })}>
            <View style={styles.dailyCalmContent}>
              <Text style={styles.dailyCalmTitle}>Daily Calm</Text>
              <Text style={styles.dailyCalmSubtitle}>APR 30 • PAUSE PRACTICE</Text>
            </View>
            <TouchableOpacity style={styles.playButton}>
              <Feather name="play" size={24} color="white" />
            </TouchableOpacity>
          </TouchableOpacity>

          <View style={styles.meditationsGrid}>
            {meditationCourses.map((course) => (
              <MeditationCard
                key={course.courseId}
                title={course.title}
                subtitle={course.subtitle}
                duration={course.duration}
                image={course.image}
                onPress={() => navigation.navigate("CourseDetail", { courseId: course.courseId, title: course.title })}
              />
            ))}
          </View>
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
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#3F414E",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#A1A4B2",
    marginBottom: 20,
    lineHeight: 22,
  },
  filtersContainer: {
    paddingBottom: 20,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F2F3F7",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 15,
    width: 70,
  },
  activeFilterButton: {
    backgroundColor: "#8E97FD",
  },
  filterButtonText: {
    fontSize: 14,
    color: "#A0A3B1",
    marginLeft: 5,
  },
  activeFilterButtonText: {
    color: "white",
  },
  dailyCalmCard: {
    backgroundColor: "#FFDB9D",
    borderRadius: 10,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  dailyCalmContent: {
    flex: 1,
  },
  dailyCalmTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#3F414E",
    marginBottom: 5,
  },
  dailyCalmSubtitle: {
    fontSize: 11,
    color: "#3F414E",
    opacity: 0.7,
  },
  playButton: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  meditationsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  meditationCard: {
    width: "48%",
    marginBottom: 20,
  },
  meditationImage: {
    width: "100%",
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  meditationTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#3F414E",
    marginBottom: 5,
  },
  meditationDetails: {
    fontSize: 11,
    color: "#A1A4B2",
  },
})

export default MeditateScreen
