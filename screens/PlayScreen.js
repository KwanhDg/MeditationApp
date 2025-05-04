import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, Alert, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';
import { stories } from '../data/stories'; // Nhập danh sách câu chuyện

// Lấy chiều rộng màn hình
const { width, height } = Dimensions.get('window');

// Object ánh xạ để lấy file MP3 tĩnh
const mp3Files = {
  'the_ocean_moon.mp3': require('../assets/mp3/the_ocean_moon.mp3'),
  'night_island.mp3': require('../assets/mp3/night_island.mp3'),
  'sweet_sleep.mp3': require('../assets/mp3/sweet_sleep.mp3'),
  'good_night.mp3': require('../assets/mp3/good_night.mp3'),
  'moon_cloud.mp3': require('../assets/mp3/moon_cloud.mp3'),
};

const PlayScreen = ({ route, navigation }) => {
  const { storyId } = route.params; // Lấy storyId từ màn hình trước

  // Tìm story dựa trên storyId
  const story = stories.find(s => s.id === storyId);
  if (!story) {
    return <Text>Story not found!</Text>;
  }

  // Quản lý trạng thái yêu thích
  const [isFavorite, setIsFavorite] = useState(false);
  const [favorites, setFavorites] = useState(story.favorites || 0);

  // Quản lý trạng thái phát nhạc
  const [isPlaying, setIsPlaying] = useState(false); // Trạng thái phát nhạc
  const [progress, setProgress] = useState(0); // Tiến trình nhạc (0-1)
  const [currentTime, setCurrentTime] = useState(0); // Thời gian hiện tại (giây)
  const [totalDuration, setTotalDuration] = useState(0); // Tổng thời lượng (giây)

  // Ref để quản lý đối tượng âm thanh
  const soundRef = useRef(new Audio.Sound());

  // Xác định đường dẫn MP3
  const getTrackUrl = () => {
    const mp3Url = story.mp3Url;

    // Nếu mp3Url là URL (bắt đầu bằng http hoặc https), dùng trực tiếp
    if (mp3Url.startsWith('http://') || mp3Url.startsWith('https://')) {
      return mp3Url;
    }

    // Nếu mp3Url là tên file cục bộ, lấy từ object ánh xạ
    const file = mp3Files[mp3Url];
    if (!file) {
      throw new Error(`MP3 file not found for ${mp3Url}`);
    }
    return file;
  };

  // Khởi tạo và phát âm thanh
  useEffect(() => {
    const setupAudio = async () => {
      try {
        const sound = soundRef.current;
        await sound.loadAsync(getTrackUrl());

        // Lấy tổng thời lượng
        const status = await sound.getStatusAsync();
        if (status.isLoaded) {
          setTotalDuration(status.durationMillis / 1000); // Chuyển từ milliseconds sang giây

          // Tự động phát
          await sound.playAsync();
          setIsPlaying(true);
        }
      } catch (error) {
        console.error('Error loading audio:', error);
        Alert.alert('Error', 'Could not load the audio file.');
      }
    };
    setupAudio();

    // Cleanup khi component unmount
    return () => {
      const sound = soundRef.current;
      sound.unloadAsync();
    };
  }, [story.mp3Url]);

  // Cập nhật tiến trình nhạc
  useEffect(() => {
    const sound = soundRef.current;
    const interval = setInterval(async () => {
      const status = await sound.getStatusAsync();
      if (status.isLoaded && status.isPlaying) {
        setCurrentTime(status.positionMillis / 1000); // Chuyển từ milliseconds sang giây
        setProgress(status.durationMillis ? status.positionMillis / status.durationMillis : 0);
      }
    }, 1000); // Cập nhật mỗi giây

    return () => clearInterval(interval);
  }, []);

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

  // Xử lý phát/tạm dừng
  const handlePlayPause = async () => {
    const sound = soundRef.current;
    const status = await sound.getStatusAsync();
    if (status.isLoaded) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Xử lý tua lại 15 giây
  const handleRewind = async () => {
    const sound = soundRef.current;
    const status = await sound.getStatusAsync();
    if (status.isLoaded) {
      const newTime = Math.max(0, currentTime - 15);
      await sound.setPositionAsync(newTime * 1000); // Chuyển từ giây sang milliseconds
      setCurrentTime(newTime);
      setProgress(totalDuration ? newTime / totalDuration : 0);
    }
  };

  // Xử lý tua tới 15 giây
  const handleForward = async () => {
    const sound = soundRef.current;
    const status = await sound.getStatusAsync();
    if (status.isLoaded) {
      const newTime = Math.min(totalDuration, currentTime + 15);
      await sound.setPositionAsync(newTime * 1000); // Chuyển từ giây sang milliseconds
      setCurrentTime(newTime);
      setProgress(totalDuration ? newTime / totalDuration : 0);
    }
  };

  // Định dạng thời gian (MM:SS)
  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <ImageBackground
      source={require('../assets/images/backgroundplay.png')} // Hình nền
      style={styles.container}
      resizeMode="cover" // Đảm bảo hình nền phủ toàn màn hình
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.closeButtonText}>×</Text>
        </TouchableOpacity>
        <View style={styles.headerButtons}>
          <TouchableOpacity onPress={handleFavorite} style={styles.headerButton}>
            <Image
              source={isFavorite ? require('../assets/images/heart.png') : require('../assets/images/heart1.png')}
              style={styles.headerIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDownload} style={styles.headerButton}>
            <Image source={require('../assets/images/download.png')} style={styles.headerIcon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Title and Category */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{story.title}</Text>
        <Text style={styles.category}>{story.category.toUpperCase()}</Text>
      </View>

      {/* Playback Controls */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity onPress={handleRewind} style={styles.controlButton}>
          <Image
            source={require('../assets/images/group_6836.png')} // Hình ảnh tua lại
            style={styles.controlIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePlayPause} style={styles.playPauseButton}>
          <Text style={styles.playPauseText}>{isPlaying ? '||' : '▶'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleForward} style={styles.controlButton}>
          <Image
            source={require('../assets/images/group_6835.png')} // Hình ảnh tua lên
            style={styles.controlIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
          <View style={[styles.progressDot, { left: `${progress * 100}%` }]} />
        </View>
        <Text style={styles.timeText}>{formatTime(totalDuration)}</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    position: 'absolute',
    top: 40,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  headerButtons: {
    flexDirection: 'row',
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  headerIcon: {
    width: 24,
    height: 24,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  category: {
    fontSize: 16,
    color: '#a1a1aa',
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  controlButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  controlIcon: {
    width: 24,
    height: 24,
  },
  playPauseButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playPauseText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  timeText: {
    fontSize: 14,
    color: 'white',
    marginHorizontal: 10,
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    position: 'relative',
  },
  progressFill: {
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 2,
  },
  progressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'white',
    position: 'absolute',
    top: -4,
    marginLeft: -6,
  },
});

export default PlayScreen;