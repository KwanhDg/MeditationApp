import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';

const topics = [
  {
    title: 'Reduce Stress',
    color: '#9BA3FF',
    image: require('../assets/images/reduce_stress.png'),
  },
  {
    title: 'Improve Performance',
    color: '#FA6E5A',
    image: require('../assets/images/improve_performance.png'),
  },
  {
    title: 'Increase Happiness',
    color: '#FEB18F',
    image: require('../assets/images/increase_happiness.png'),
  },
  {
    title: 'Reduce Anxiety',
    color: '#FFCF86',
    image: require('../assets/images/reduce_anxiety.png'),
  },
  {
    title: 'Personal Growth',
    color: '#6CB28E',
    image: require('../assets/images/personal_growth.png'),
  },
  {
    title: 'Better Sleep',
    color: '#4E5567',
    image: require('../assets/images/better_sleep.png'),
  },
];

const ChooseTopic = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.header}>
        <Text style={styles.headerBold}>What Brings you</Text>
        {"\n"}
        <Text style={styles.headerNormal}>to Silent Moon?</Text>
      </Text>
      <Text style={styles.subHeader}>choose a topic to focus on:</Text>
      <View style={styles.grid}>
        {topics.map((topic, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.card, { backgroundColor: topic.color }]}
            activeOpacity={0.8}
          >
            <Image
              source={topic.image}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.cardText}>{topic.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
    fontSize: 28,
    lineHeight: 34,
    marginBottom: 12,
    fontFamily: 'HelveticaNeue',
    color: '#3F414E',
  },
  headerBold: {
    fontWeight: 'bold',
  },
  headerNormal: {
    fontWeight: 'normal',
  },
  subHeader: {
    fontSize: 16,
    color: '#A1A4B2',
    marginBottom: 30,
    fontFamily: 'HelveticaNeue',
    textTransform: 'capitalize',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  card: {
    width: '47%', // Slightly reduced to match design spacing
    height: 140,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#3F414E',
    textAlign: 'center',
    fontFamily: 'HelveticaNeue',
  },
});

export default ChooseTopic;