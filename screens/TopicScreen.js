// TopicScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';

const topics = [
  {
    title: 'Reduce Stress',
    color: '#8E97FD',
    image: require('../assets/images/reduce_stress.png'), // Replace with your actual image
  },
  {
    title: 'Improve Performance',
    color: '#FFCF86',
    image: require('../assets/images/improve_performance.png'),
  },
  {
    title: 'Increase Happiness',
    color: '#FECFBE',
    image: require('../assets/images/increase_happiness.png'),
  },
  {
    title: 'Reduce Anxiety',
    color: '#FFE0D6',
    image: require('../assets/images/reduce_anxiety.png'),
  },
  {
    title: 'Personal Growth',
    color: '#61DEA4',
    image: require('../assets/images/personal_growth.png'),
  },
  {
    title: 'Better Sleep',
    color: '#3F414E',
    image: require('../assets/images/better_sleep.png'),
  },
  {
    title: 'Improve Focus',
    color: '#FFB6B6',
    image: require('../assets/images/reduce_stress.png'),
  },
  {
    title: 'Increase Creativity',
    color: '#A1A4B2',
    image: require('../assets/images/improve_performance.png'),
  },
];

const TopicScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>What Brings you</Text>
      <Text style={styles.subtitle}>to Silent Moon?</Text>
      <Text style={styles.prompt}>choose a topic to focus on:</Text>

      <View style={styles.grid}>
        {topics.map((topic, index) => (
          <TouchableOpacity key={index} style={[styles.card, { backgroundColor: topic.color }]} onPress={() => navigation.navigate("Reminders")}>
            <Image source={topic.image} style={styles.image} />
            <Text style={[styles.cardText, topic.title === 'Better Sleep' && { color: 'white' }]}>
              {topic.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    color: '#3F414E',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 24,
    color: '#3F414E',
    marginBottom: 10,
  },
  prompt: {
    fontSize: 14,
    color: '#A1A4B2',
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '47%',
    borderRadius: 10,
    paddingBottom: 20,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 30,
    marginLeft: 20,
    textAlign: 'left',
    color: '#3F414E',
  },
  image: {
    width: 150,
    height: 100,
    resizeMode: 'contain',
  },
});

export default TopicScreen;
