import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CourseDetailScreen from "../screens/CourseDetailScreen";
import PlayerScreen from "../screens/PlayerScreen";

const Stack = createNativeStackNavigator();

export default function CourseStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CourseDetail" component={CourseDetailScreen} />
      <Stack.Screen name="Player" component={PlayerScreen} />
    </Stack.Navigator>
  );
} 