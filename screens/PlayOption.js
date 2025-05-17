import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, ScrollView, Dimensions, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { stories } from '../data/stories'; // Nhập danh sách câu chuyện
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

// Lấy chiều rộng màn hình
const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2; // Chiều rộng mỗi card liên quan

const PlayOption = ({ route, navigation }) => {
  const { storyId } = route.params; // Lấy storyId từ màn hình trước

  // Tìm story dựa trên storyId
  const story = stories.find(s => s.id === storyId);
  if (!story) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Story not found!</Text>
      </SafeAreaView>
    );
  }

  // Quản lý trạng thái yêu thích
  const [isFavorite, setIsFavorite] = useState(false);
  const [favorites, setFavorites] = useState(story.favorites || 0);

  // Lọc các story liên quan (cùng category, nhưng không phải story hiện tại)
  const relatedStories = stories.filter(s => s.category === story.category && s.id !== storyId);

  // Kiểm tra trạng thái yêu thích khi storyId thay đổi
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        const favoriteStatus = await AsyncStorage.getItem(`favorite_${storyId}`);
        const isFav = favoriteStatus !== null ? JSON.parse(favoriteStatus) : false;
        setIsFavorite(isFav);
        setFavorites(story.favorites + (isFav ? 1 : 0));
      } catch (error) {
        console.error('Error reading favorite status:', error);
      }
    };
    checkFavoriteStatus();
  }, [storyId, story.favorites]);

  // Xử lý khi nhấn nút Favorite
  const handleFavorite = async () => {
    try {
      const newFavoriteStatus = !isFavorite;
      setIsFavorite(newFavoriteStatus);
      const newFavorites = newFavoriteStatus ? favorites + 1 : favorites - 1;
      setFavorites(newFavorites);

      // Lưu trạng thái yêu thích vào AsyncStorage
      await AsyncStorage.setItem(`favorite_${storyId}`, JSON.stringify(newFavoriteStatus));
    } catch (error) {
      console.error('Error saving favorite status:', error);
      Alert.alert('Error', 'Could not save favorite status.');
    }
  };

  // Xử lý khi nhấn nút Download
  const handleDownload = () => {
    Alert.alert(
      'Download',
      `Do you want to download "${story.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Download', onPress: () => Alert.alert('Success', `${story.title} has been downloaded!`) },
      ],
      { cancelable: true }
    );
  };

  // Xử lý khi nhấn nút Play
  const handlePlay = () => {
    navigation.navigate('PlayScreen', { storyId });
  };

  // Render mỗi story liên quan
  const renderRelatedStory = (item, index) => (
    <TouchableOpacity
      key={item.id.toString()}
      style={[styles.relatedCard, { width: cardWidth }, index % 2 === 0 ? { marginRight: 16 } : {}]}
      onPress={() => navigation.navigate('PlayOption', { storyId: item.id })}
    >
      <Image source={item.image} style={styles.relatedImage} />
      <Text style={styles.relatedTitle} numberOfLines={1}>{item.title}</Text>
      <Text style={styles.relatedDuration}>{item.duration} • {item.category.toUpperCase()}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={story.image} style={styles.mainImage} />
        <LinearGradient
          colors={['rgba(0,0,0,0.7)', 'transparent']}
          style={styles.gradient}
        />
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Feather name="arrow-left" size={24} color="#151932" />
          </TouchableOpacity>
          <View style={styles.headerButtons}>
            <TouchableOpacity onPress={handleFavorite} style={styles.iconButton}>
              <Feather name="heart" size={24} color={isFavorite ? "#FA6E5A" : "#151932"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDownload} style={styles.iconButton}>
              <Feather name="download" size={24} color="#151932" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{story.title}</Text>
        <Text style={styles.duration}>{story.duration} • {story.category.toUpperCase()}</Text>
        <Text style={styles.description}>{story.description}</Text>

        {/* Favorites and Listenings */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Feather name="heart" size={20} color="#FA6E5A" />
            <Text style={styles.statText}>{favorites.toLocaleString()} Favorites</Text>
          </View>
          <View style={styles.statItem}>
            <Feather name="headphones" size={20} color="#8E8FFA" />
            <Text style={styles.statText}>{(story.listenings || 0).toLocaleString()} Listening</Text>
          </View>
        </View>

        {/* Related Stories */}
        <Text style={styles.relatedHeader}>Related Stories</Text>
        <View style={styles.relatedContainer}>
          {relatedStories.map((item, index) => renderRelatedStory(item, index))}
        </View>

        {/* Play Button */}
        <TouchableOpacity style={styles.playButton} onPress={handlePlay}>
          <Text style={styles.playButtonText}>PLAY</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151932',
  },
  imageContainer: {
    position: 'relative',
    height: 300,
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  duration: {
    fontSize: 14,
    color: '#8E8FFA',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24,
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    marginBottom: 32,
    gap: 24,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  relatedHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  relatedContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 32,
  },
  relatedCard: {
    marginBottom: 16,
  },
  relatedImage: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    marginBottom: 8,
  },
  relatedTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  relatedDuration: {
    fontSize: 12,
    color: '#8E8FFA',
  },
  playButton: {
    backgroundColor: '#8E8FFA',
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  playButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  errorText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default PlayOption;