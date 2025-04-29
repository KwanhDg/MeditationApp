import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, ScrollView, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { stories } from '../data/stories'; // Nhập danh sách câu chuyện

// Lấy chiều rộng màn hình
const { width } = Dimensions.get('window');
const cardWidth = (width - 40) / 2; // Chiều rộng mỗi card liên quan

const PlayOption = ({ route, navigation }) => {
  const { storyId } = route.params; // Lấy storyId từ màn hình trước

  // Tìm story dựa trên storyId
  const story = stories.find(s => s.id === storyId);
  if (!story) {
    return <Text>Story not found!</Text>;
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
      style={[styles.relatedCard, { width: cardWidth }, index % 2 === 0 ? { marginRight: 10 } : {}]}
      onPress={() => navigation.navigate('PlayOption', { storyId: item.id })}
    >
      <Image source={item.image} style={styles.relatedImage} />
      <Text style={styles.relatedTitle}>{item.title}</Text>
      <Text style={styles.relatedDuration}>{item.duration} • {item.category.toUpperCase()}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Image Section */}
      <View style={styles.imageContainer}>
        <Image source={story.image} style={styles.mainImage} />
        {/* Navigation Bar */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButtonContainer}
            onPress={() => navigation.goBack()}
          >
            <View style={styles.backButton}>
              <Text style={styles.backButtonText}>←</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.headerButtons}>
            <TouchableOpacity onPress={handleFavorite} style={styles.favoriteButton}>
              <Image
                source={isFavorite ? require('../assets/images/heart.png') : require('../assets/images/heart1.png')}
                style={styles.favoriteIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDownload} style={styles.downloadButton}>
              <Image source={require('../assets/images/download.png')} style={styles.downloadIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Main Content with ScrollView */}
      <ScrollView style={styles.contentContainer}>
        <Text style={styles.title}>{story.title}</Text>
        <Text style={styles.duration}>{story.duration} • {story.category.toUpperCase()}</Text>
        <Text style={styles.description}>{story.description}</Text>

        {/* Favorites and Listenings */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Image source={require('../assets/images/heart.png')} style={styles.statIcon} />
            <Text style={styles.statText}>{favorites.toLocaleString()} Favorites</Text>
          </View>
          <View style={styles.statItem}>
            <Image source={require('../assets/images/tainghe.png')} style={styles.statIcon} />
            <Text style={styles.statText}>{(story.listenings || 0).toLocaleString()} Listening</Text>
          </View>
        </View>

        {/* Related Stories */}
        <Text style={styles.relatedHeader}>Related</Text>
        <View style={styles.relatedContainer}>
          {relatedStories.map((item, index) => renderRelatedStory(item, index))}
        </View>

        {/* Play Button */}
        <TouchableOpacity style={styles.playButton} onPress={handlePlay}>
          <Text style={styles.playButtonText}>PLAY</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#23274d',
  },
  imageContainer: {
    position: 'relative',
  },
  mainImage: {
    width: '100%',
    height: 300,
    borderRadius: 0,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  backButtonContainer: {
    position: 'absolute',
    left: 10,
    top: 40,
  },
  backButton: {
    width: 40, // Tăng kích thước nút
    height: 40, // Tăng kích thước nút
    borderRadius: 25, // Đảm bảo nút tròn (bán kính = width/2)
    backgroundColor: 'white',
    justifyContent: 'center', // Căn giữa ký tự theo chiều dọc
    alignItems: 'center', // Căn giữa ký tự theo chiều ngang
  },
  backButtonText: {
    fontSize: 30, // Tăng kích thước ký tự
    color: 'black', // Tô đậm ký tự
    position: 'absolute',
    top: -7,
  },
  headerButtons: {
    position: 'absolute',
    right: 10,
    top: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  favoriteButton: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: '#273480',
    backgroundColor: '#273480',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  favoriteIcon: {
    width: 24,
    height: 24,
  },
  downloadButton: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: '#273480',
    backgroundColor: '#273480',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  downloadIcon: {
    width: 24,
    height: 24,
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  duration: {
    fontSize: 14,
    color: '#a1a1aa',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  statIcon: {
    width: 16,
    height: 16,
    marginRight: 5,
  },
  statText: {
    fontSize: 16,
    color: 'white',
  },
  relatedHeader: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  relatedContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  relatedCard: {
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  relatedImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  relatedTitle: {
    fontSize: 16,
    color: 'white',
    marginTop: 5,
    fontWeight: 'bold',
  },
  relatedDuration: {
    fontSize: 12,
    color: '#a1a1aa',
    marginTop: 2,
  },
  playButton: {
    backgroundColor: '#a78bfa',
    paddingVertical: 15,
    borderRadius: 25,
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
    left: 20,
    width: '90%',
    alignItems: 'center',
    marginVertical: 20,
  },
  playButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default PlayOption;