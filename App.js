import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";


import WelcomeScreen from "./screens/WelcomeScreen";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import TopicScreen from "./screens/TopicScreen";
import RemindersScreen from "./screens/RemindersScreen";
import CourseDetailScreen from "./screens/CourseDetailScreen";
import PlayerScreen from "./screens/PlayerScreen";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import SleepStories from "./screens/SleepStories";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Topic" component={TopicScreen} />
          <Stack.Screen name="Reminders" component={RemindersScreen} />
          
          {/* ⬇️ Replace HomeScreen with the BottomTabNavigator */}
          <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
          
          <Stack.Screen name="CourseDetail" component={CourseDetailScreen} />
          <Stack.Screen name="Player" component={PlayerScreen} />
          <Stack.Screen name="SleepStories" component={SleepStories} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
