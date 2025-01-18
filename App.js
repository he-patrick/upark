import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Animated, Dimensions, TouchableOpacity, } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import BottomNavBar from './components/BottomNavBar';
import SplashScreen from './components/SplashScreen';
import * as Location from 'expo-location';
import LoginPage from './components/LoginPage';
import SelectUserPage from './components/SelectUserPage';
import WelcomePage from './components/WelcomePage';
import PaymentPage from './components/PaymentPage';
import DashboardPage from './components/DashboardPage';
import MapsPage from './components/MapsPage';
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
        initialRouteName="Login"
        screenOptions={{
          headerShown: false // This hides the navigation header
        }}
      >
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="SelectUser" component={SelectUserPage} />
        <Stack.Screen name="Welcome" component={WelcomePage} />
        <Stack.Screen name="Payment" component={PaymentPage} />
        <Stack.Screen name="DashboardPage" component={DashboardPage} />
        <Stack.Screen name="Maps" component={MapsPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
