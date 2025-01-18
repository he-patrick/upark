import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Animated, Dimensions, TouchableOpacity, } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import BottomNavBar from './components/BottomNavBar';
import SplashScreen from './components/SplashScreen';
import * as Location from 'expo-location';
import MapsPage from './components/MapsPage';
import HomePage from './components/HomePage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  // Handle splash screen visibility
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerShown: false // This hides the navigation header
        }}
      >
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Maps" component={MapsPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
