import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/HomeScreen";
import SleepStack from "../navigation/SleepStack";
import MeditateScreen from "../screens/MeditateScreen";
import MusicScreen from "../screens/MusicScreen";
import ProfileScreen from "../screens/ProfileScreen";

// Custom SVG Icons
import HomeIcon from "../assets/icons/home.svg";
import SleepIcon from "../assets/icons/sleep.svg";
import MeditateIcon from "../assets/icons/meditate.svg";
import MusicIcon from "../assets/icons/music.svg";
import ProfileIcon from "../assets/icons/profile.svg";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#8e8ffa",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarIcon: ({ focused }) => {
          const color = focused ? "#8e8ffa" : "gray";
          const size = 24;

          switch (route.name) {
            case "Home":
              return <HomeIcon width={size} height={size} fill={color} />;
            case "Sleep":
              return <SleepIcon width={size} height={size} fill={color} />;
            case "Meditate":
              return <MeditateIcon width={size} height={size} fill={color} />;
            case "Music":
              return <MusicIcon width={size} height={size} fill={color} />;
            case "User":
              return <ProfileIcon width={size} height={size} fill={color} />;
            default:
              return null;
          }
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Sleep" component={SleepStack} options={{
        tabBarStyle: {
          backgroundColor: "#151932",
          borderTopWidth: 0,
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
        }
      }} />
      <Tab.Screen name="Meditate" component={MeditateScreen} />
      <Tab.Screen name="Music" component={MusicScreen} />
      <Tab.Screen name="User" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
