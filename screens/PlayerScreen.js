"use client"

import { useState, useRef, useEffect } from "react"
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from "react-native"
import { Feather } from "@expo/vector-icons"
import { Audio } from 'expo-av';

const sessionData = {
  1: {
    title: "Focus Attention",
    subtitle: "7 DAYS OF CALM",
    audio: require("../assets/audio/focus-attention.mp3"),
  },
  2: {
    title: "Body Scan",
    subtitle: "5 MIN BODY SCAN",
    audio: require("../assets/audio/body-scan.mp3"),
  },
  3: {
    title: "Making Happiness",
    subtitle: "3 MIN HAPPINESS",
    audio: require("../assets/audio/making-happiness.mp3"),
  },
};

const PlayerScreen = ({ navigation, route }) => {
  const sessionId = route?.params?.sessionId || 1;
  const { title, subtitle, audio } = sessionData[sessionId] || sessionData[1];

  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [position, setPosition] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const soundRef = useRef(null)
  const SEEK_STEP = 10000; // 10 giây

  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync()
      }
    }
  }, [])

  const onPlaybackStatusUpdate = status => {
    if (status.isLoaded) {
      setDuration(status.durationMillis || 0)
      setPosition(status.positionMillis || 0)
      setProgress((status.positionMillis || 0) / (status.durationMillis || 1))
      if (status.didJustFinish) {
        setIsPlaying(false)
        setProgress(0)
      }
    }
  }

  const playAudio = async () => {
    if (soundRef.current) {
      await soundRef.current.playAsync()
      setIsPlaying(true)
      return
    }
    const { sound } = await Audio.Sound.createAsync(
      audio,
      { shouldPlay: true },
      onPlaybackStatusUpdate
    )
    soundRef.current = sound
    setIsPlaying(true)
  }

  const pauseAudio = async () => {
    if (soundRef.current) {
      await soundRef.current.pauseAsync()
      setIsPlaying(false)
    }
  }

  const seekBackward = async () => {
    if (soundRef.current) {
      const status = await soundRef.current.getStatusAsync();
      if (status.isLoaded) {
        let newPosition = Math.max(0, status.positionMillis - SEEK_STEP);
        await soundRef.current.setPositionAsync(newPosition);
      }
    }
  };

  const seekForward = async () => {
    if (soundRef.current) {
      const status = await soundRef.current.getStatusAsync();
      if (status.isLoaded) {
        let newPosition = Math.min(status.durationMillis, status.positionMillis + SEEK_STEP);
        await soundRef.current.setPositionAsync(newPosition);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
          <Feather name="x" size={24} color="#3F414E" />
        </TouchableOpacity>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton} onPress={() => setIsFavorite(!isFavorite)}>
            <Feather name="heart" size={24} color={isFavorite ? "#FA6E5A" : "#A0A3B1"} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Feather name="download" size={24} color="#A0A3B1" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>

          <View style={styles.controlsContainer}>
            <TouchableOpacity style={styles.controlButton} onPress={seekBackward}>
              <Feather name="rotate-ccw" size={24} color="#3F414E" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.playPauseButton} onPress={isPlaying ? pauseAudio : playAudio}>
              {isPlaying ? (
                <Feather name="pause" size={30} color="white" />
              ) : (
                <Feather name="play" size={30} color="white" />
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.controlButton} onPress={seekForward}>
              <Feather name="rotate-cw" size={24} color="#3F414E" />
            </TouchableOpacity>
          </View>

          <View style={styles.progressContainer}>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
            </View>
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>{formatMillis(position)}</Text>
              <Text style={styles.timeText}>{formatMillis(duration)}</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

function formatMillis(ms) {
  if (!ms) return "00:00"
  const totalSec = Math.floor(ms / 1000)
  const min = Math.floor(totalSec / 60)
  const sec = totalSec % 60
  return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  card: {
    flex: 1,
    backgroundColor: "#FAF8F5",
    padding: 20,
  },
  closeButton: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  actionButtons: {
    flexDirection: "row",
    position: "absolute",
    top: 40,
    right: 20,
  },
  actionButton: {
    marginLeft: 20,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#3F414E",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#A0A3B1",
    marginBottom: 60,
  },
  controlsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 60,
  },
  controlButton: {
    marginHorizontal: 30,
  },
  playPauseButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#3F414E",
    alignItems: "center",
    justifyContent: "center",
  },
  progressContainer: {
    width: "100%",
  },
  progressBarContainer: {
    width: "100%",
    height: 4,
    backgroundColor: "#E5E5E5",
    borderRadius: 2,
    marginBottom: 10,
  },
  progressBar: {
    height: 4,
    backgroundColor: "#3F414E",
    borderRadius: 2,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeText: {
    fontSize: 14,
    color: "#A0A3B1",
  },
})

export default PlayerScreen
