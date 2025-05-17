// screens/ProfileScreen.js
import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, SafeAreaView, Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen({ navigation }) {
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      Alert.alert('Logged out', 'You have been logged out.', [
        { text: 'OK', onPress: () => navigation.replace('Welcome') }
      ]);
    } catch (e) {
      Alert.alert('Error', 'Could not log out.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity>
          <Feather name="settings" size={24} color="#8E97FD" />
        </TouchableOpacity>
      </View>
      <View style={styles.avatarContainer}>
        <Image
          source={require("../assets/images/avatar-default.jpg")}
          style={styles.avatar}
        />
        <Text style={styles.name}>Người dùng</Text>
        <Text style={styles.email}>admin@letgonow.com</Text>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>24</Text>
          <Text style={styles.statLabel}>Sessions</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>12h</Text>
          <Text style={styles.statLabel}>Total Time</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>5</Text>
          <Text style={styles.statLabel}>Favorites</Text>
        </View>
      </View>
      <View style={styles.actionList}>
        <TouchableOpacity style={styles.actionItem}>
          <Feather name="edit" size={20} color="#8E97FD" />
          <Text style={styles.actionText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionItem} onPress={handleLogout}>
          <Feather name="log-out" size={20} color="#FA6E5A" />
          <Text style={[styles.actionText, { color: '#FA6E5A' }]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3F414E',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
    backgroundColor: '#E5E5E5',
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#3F414E',
    marginBottom: 4,
  },
  email: {
    fontSize: 15,
    color: '#A1A4B2',
    marginBottom: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8E97FD',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 13,
    color: '#A1A4B2',
  },
  actionList: {
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    paddingTop: 24,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  actionText: {
    fontSize: 16,
    color: '#3F414E',
    marginLeft: 16,
  },
});
