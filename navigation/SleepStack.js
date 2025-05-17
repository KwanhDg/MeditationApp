import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeSleep from "../screens/WelcomeSleep";
import SleepStories from "../screens/SleepStories";
import PlayOption from "../screens/PlayOption";
import PlayScreen from "../screens/PlayScreen";

const Stack = createNativeStackNavigator();

export default function SleepStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WelcomeSleep" component={WelcomeSleep} />
      <Stack.Screen name="SleepStories" component={SleepStories} />
      <Stack.Screen name="PlayOption" component={PlayOption} />
      <Stack.Screen name="PlayScreen" component={PlayScreen} />
    </Stack.Navigator>
  );
} 