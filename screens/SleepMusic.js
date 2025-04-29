// SleepMusic.js
import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { stories } from '../data/stories'; // Nhập danh sách câu chuyện
import { categories } from '../data/categories'; // Nhập danh sách danh mục

// Lấy chiều rộng màn hình
const { width } = Dimensions.get('window');
const cardWidth = (width - 40) / 2; // Chiều rộng mỗi card = (chiều rộng màn hình - khoảng cách padding) / 2

const SleepMusic = ({ route, navigation }) => {
  const { categoryId } = route.params; // Lấy danh mục đã chọn từ màn hình trước

  // Tìm name tương ứng với categoryId trong categories
  const category = categories.find(cat => cat.id === categoryId);
  const categoryName = category ? category.name : categoryId; // Nếu không tìm thấy, dùng categoryId làm giá trị mặc định

  // Lọc các câu chuyện theo danh mục
  const filteredStories = stories.filter(story => story.category === categoryId);

  const renderStory = ({ item }) => (
    <TouchableOpacity
      style={[styles.storyCard, { width: cardWidth }]} // Đặt chiều rộng cố định
      onPress={() => navigation.navigate('PlayOption', { storyId: item.id })}
    >
      <Image source={item.image} style={styles.storyImage} />
      <Text style={styles.storyTitle}>{item.title}</Text>
      <Text style={styles.storyDuration}>{item.duration} • {item.category}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Navigation Bar */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButtonContainer}
          onPress={() => navigation.goBack()}
        >
          <View style={styles.backButton}>
            <Text style={styles.backButtonText}>⬅</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>{categoryName}</Text>
        </View>
      </View>

      <FlatList
        data={filteredStories}
        renderItem={renderStory}
        keyExtractor={item => item.id.toString()}
        numColumns={2} // Hiển thị 2 cột
        columnWrapperStyle={styles.columnWrapper} // Khoảng cách giữa các cột
        key={`flatlist-${categoryId}-${2}`} // Force re-render khi categoryId thay đổi
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#23274d',
    paddingTop: 30,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom:40,
    paddingHorizontal: 10,
    position: 'relative',
    fontSize:30
  },
  backButtonContainer: {
    position: 'absolute',
    left: 10,
    top: 10,
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
    position:'absolute',
    top:-7
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  columnWrapper: {
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  storyCard: {
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
  },
  storyImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  storyTitle: {
    fontSize: 16,
    color: 'white',
    marginTop: 5,
    fontWeight: 'bold',
  },
  storyDuration: {
    fontSize: 12,
    color: '#a1a1aa',
    marginTop: 2,
  },
});

export default SleepMusic;