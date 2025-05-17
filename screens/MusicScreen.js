// screens/MusicScreen.js
import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, FlatList, SafeAreaView } from "react-native";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';

const tracks = [
  { id: '1', title: 'Peaceful Piano', artist: 'Calm Artist', duration: '3:45' },
  { id: '2', title: 'Night Rain', artist: 'Nature', duration: '4:12' },
  { id: '3', title: 'Ocean Waves', artist: 'Nature', duration: '5:01' },
  { id: '4', title: 'Morning Energy', artist: 'Uplift', duration: '2:58' },
];

export default function MusicScreen() {
  return (
    <LinearGradient colors={["#8E97FD", "#6F7DD3", "#23286B"]} style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Feather name="music" size={36} color="#fff" />
          <Text style={styles.title}>Music</Text>
        </View>
        <TouchableOpacity style={styles.playButton}>
          <Feather name="play" size={32} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>Recommended Tracks</Text>
        <FlatList
          data={tracks}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.trackItem}>
              <View>
                <Text style={styles.trackTitle}>{item.title}</Text>
                <Text style={styles.trackArtist}>{item.artist} • {item.duration}</Text>
              </View>
              <TouchableOpacity>
                <Feather name="play-circle" size={28} color="#8E97FD" />
              </TouchableOpacity>
            </View>
          )}
          style={{ marginTop: 20 }}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  playButton: {
    backgroundColor: '#8E97FD',
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 32,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  trackItem: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  trackTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  trackArtist: {
    color: '#D1D5F3',
    fontSize: 13,
    marginTop: 2,
  },
});
