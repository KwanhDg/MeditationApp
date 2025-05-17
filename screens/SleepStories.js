import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Image, ImageBackground, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import icon library
import { categories } from '../data/categories'; // Import categories from file
import { stories } from '../data/stories'; // Import stories from file

const SleepStories = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('all'); // Default to all categories

  // Filter stories based on selected category
  const filteredStories = selectedCategory === 'all' 
    ? stories 
    : stories.filter(story => story.category === selectedCategory);

  // Separate the first story (featured) and the rest (small stories)
  const featuredStory = filteredStories[0]; // First story
  const smallStories = filteredStories.slice(1); // Remaining stories

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryButton}
      onPress={() => navigation.navigate('SleepMusic', { categoryId: item.id })} // Điều hướng đến màn hình CategoryScreen
    >
      <View style={styles.categoryIconContainer}>
        <Icon name={item.icon} size={32} color="white" />
      </View>
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );
  

  const renderFeaturedStory = (story) => {
    if (!story) return null; // If no featured story, return null
    return (
      <View style={styles.firstStory}>
        <Image source={story.image} style={styles.firstStoryImage} />
        <View style={styles.firstStoryOverlay}>
          <Text style={styles.firstStoryTitle}>{story.title}</Text>
          <Text style={styles.firstStoryDescription}>{story.description}</Text>
          <TouchableOpacity
            style={styles.startButton}
            onPress={() => navigation.navigate('PlayOption', { storyId: story.id })}
          >
            <Text style={styles.startButtonText}>START</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderSmallStory = (item) => (
    <View key={item.id} style={styles.smallStory}>
      <TouchableOpacity
        style={styles.storyContent}
        onPress={() => navigation.navigate('PlayOption', { storyId: item.id })}
      >
        <Image source={item.image} style={styles.storyImage} />
        <View>
          <Text style={styles.storyTitle}>{item.title}</Text>
          <Text style={styles.storyDetails}>{item.duration} • {item.category}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  // Group small stories into rows of 2
  const groupedStories = [];
  for (let i = 0; i < smallStories.length; i += 2) {
    groupedStories.push(smallStories.slice(i, i + 2));
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require('../assets/images/night-background.png')}
        style={styles.container}
        imageStyle={{ width: '100%', height: '100%' }}
        resizeMode="cover"
      >
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={true}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Sleep Stories</Text>
            <Text style={styles.headerSubtitle}>
              Soothing bedtime stories to help you fall
            </Text>
            <Text style={styles.headerSubtitle}>
              into a deep and natural sleep
            </Text>
          </View>

          {/* Categories */}
          <FlatList
            data={categories}
            renderItem={renderCategory}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categories}
            contentContainerStyle={styles.categoriesContainer}
          />

          {/* Featured Story */}
          {renderFeaturedStory(featuredStory)}

          {/* Small Stories */}
          {groupedStories.map((row, index) => (
            <View key={index} style={styles.storyRow}>
              {row.map(item => renderSmallStory(item))}
            </View>
          ))}
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 10,
    paddingTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  headerTitle: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'white',
    opacity: 0.8,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  categories: {
    marginBottom: 5,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
  },
  categoryButton: {
    alignItems: 'center',
    marginRight: 10,
    width: 70,
  },
  categoryIconContainer: {
    backgroundColor: '#8e97fd',
    borderRadius: 15,
    padding: 10,
    marginBottom: 5,
    width: 62,
    height: 62,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  firstStory: {
    position: 'relative',
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  firstStoryImage: {
    width: '100%',
    height: Dimensions.get('window').height * 0.3,
    borderRadius: 10,
  },
  firstStoryOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  firstStoryTitle: {
    fontSize: 24,
    color: '#ffe7bf',
    fontWeight: 'bold',
  },
  firstStoryDescription: {
    fontSize: 14,
    color: 'white',
    opacity: 0.8,
    marginVertical: 5,
  },
  storyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  smallStory: {
    flex: 1,
    marginHorizontal: 5,
    minHeight: 220,
  },
  storyContent: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  storyImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 5,
  },
  storyTitle: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  
  storyDetails: {
    fontSize: 12,
    color: 'white',
    opacity: 0.8,
    marginTop: 5,
    textAlign: 'center',
  },
  
  startButton: {
    backgroundColor: 'white',
    paddingVertical: 10,
    borderRadius: 20,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    alignSelf: 'center',
  },
  startButtonText: {
    color: '#23274d',
    fontWeight: 'bold',
  },
});

export default SleepStories;