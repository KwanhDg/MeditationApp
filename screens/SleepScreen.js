// screens/SleepScreen.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const SleepScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Sleep Screen</Text>
    </View>
  );
};

export default SleepScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
