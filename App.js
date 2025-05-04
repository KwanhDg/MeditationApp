import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeSleep from './screens/WelcomeSleep';
import SleepStories from './screens/SleepStories';
import SleepMusic from './screens/SleepMusic';
import PlayOption from './screens/PlayOption';
import PlayScreen from './screens/PlayScreen';
import { SplashScreen } from './screens/SplashScreen/SplashScreen';
import { Login } from './screens/LoginScreen/LoginScreen';
import { SignUp } from './screens/SignUpScreen/SignUpScreen';
import { Welcome } from './screens/WelcomeScreen/WelcomeScreen';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen 
          name="Splash" 
          component={SplashScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="WelcomeSleep" 
          component={WelcomeSleep} 
          options={{ headerShown: false }} // Ẩn tên màn hình WelcomeSleep
        />
        <Stack.Screen 
          name="SleepStories" 
          component={SleepStories} 
          options={{ headerShown: false }} // Ẩn tên màn hình SleepStories
        />
        <Stack.Screen 
          name="SleepMusic" 
          component={SleepMusic} 
          options={{ headerShown: false }} // Ẩn tên màn hình SleepMusic
        />
        <Stack.Screen 
          name="PlayOption" 
          component={PlayOption} 
          options={{ headerShown: false }} // Ẩn tên màn hình SleepMusic
        />
        <Stack.Screen 
          name="PlayScreen" 
          component={PlayScreen} 
          options={{ headerShown: false }} // Ẩn tên màn hình SleepMusic
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
