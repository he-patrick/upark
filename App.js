import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Animated, Dimensions, TouchableOpacity, } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import BottomNavBar from './components/BottomNavBar';
import SplashScreen from './components/SplashScreen';
import * as Location from 'expo-location';
import SelectUserPage from './components/SelectUserPage';
import WelcomePage from './components/WelcomePage';
import PaymentPage from './components/PaymentPage';
import DashboardPage from './components/DashboardPage';
import DashboardPagePost from './components/DashboardPagePost';
import ScheduleTime from './components/ScheduleTime';
import MapsPage from './components/MapsPage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './components/LoginScreen';
import BookingConfirmedPage from './components/BookingConfirmedPage';
import SpotRegistrationConfirmedPage from './components/SpotRegistrationConfirmedPage';
import WelcomePagePost from './components/WelcomePagePost';
import ProofOfOwnershipPage from './components/ProofOfOwnershipPage';
import DefaultSurveyPage from './components/DefaultSurvey';
import PostingMap from './components/PostingMap';
import * as Font from 'expo-font';

const Stack = createNativeStackNavigator();



const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default function App() {
  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'Alexandria': require('./assets/fonts/Alexandria-VariableFont_wght.ttf'),
      });
    }
    loadFont();
  }, []);

  const [showSplash, setShowSplash] = useState(true);

  // Handle splash screen visibility
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
          headerShown: false // This hides the navigation header
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SelectUser" component={SelectUserPage} />
        <Stack.Screen name="Welcome" component={WelcomePage} />
        <Stack.Screen name="WelcomePost" component={WelcomePagePost} />
        <Stack.Screen name="Payment" component={PaymentPage} />
        <Stack.Screen name="DashboardPage" component={DashboardPage} />
        <Stack.Screen name="DashboardPagePost" component={DashboardPagePost} />
        <Stack.Screen name="ScheduleTime" component={ScheduleTime} />
        <Stack.Screen name="Maps" component={MapsPage} />
        <Stack.Screen name="BookingConfirmedPage" component={BookingConfirmedPage} />
        <Stack.Screen name="SpotRegistrationConfirmedPage" component={SpotRegistrationConfirmedPage} />
        <Stack.Screen name="ProofOfOwnershipPage" component={ProofOfOwnershipPage} />
        <Stack.Screen name="DefaultSurveyPage" component={DefaultSurveyPage} />
        <Stack.Screen name="PostingMap" component={PostingMap} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
