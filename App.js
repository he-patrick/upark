import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Animated, Dimensions, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import BottomNavBar from './components/BottomNavBar';
import SplashScreen from './components/SplashScreen';
import * as Location from 'expo-location';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  toggleButton: {
    position: 'absolute',
    right: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  toggleButtonText: {
    fontSize: 16,
  },
  reserveButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    elevation: 10,
    paddingVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reserveButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 10,
  },
  reserveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

// Test data for parking lots
const parkingLots = [
  { id: 1, name: 'Parking Lot A', distance: '0.5 miles' },
  { id: 2, name: 'Parking Lot B', distance: '1.0 miles' },
  { id: 3, name: 'Parking Lot C', distance: '1.5 miles' },
  { id: 4, name: 'Parking Lot D', distance: '2.0 miles' },
  { id: 5, name: 'Parking Lot E', distance: '2.5 miles' },
];

export default function App() {
  const [mapType, setMapType] = useState('terrain');
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [showSplash, setShowSplash] = useState(true);

  const animatedHeight = useRef(new Animated.Value(200)).current;

  // Request location permission and fetch the current location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

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

  if (!location) {
    return (
      <View style={styles.container}>
        <Text>{errorMsg || 'Waiting for location...'}</Text>
      </View>
    );
  }

  const toggleMapType = () => {
    setMapType((prevType) => (prevType === 'terrain' ? 'hybrid' : 'terrain'));
  };

  return (
    <View style={styles.container}>
      <MapView
        mapType={mapType}
        style={styles.map}
        region={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        followsUserLocation={true}
      >
        <Marker coordinate={{ latitude: location.coords.latitude, longitude: location.coords.longitude }} />
      </MapView>

      {/* Toggle Map Type Button */}
      <Animated.View style={[styles.toggleButton, { bottom: Animated.add(animatedHeight, new Animated.Value(110)) }]}>
        <TouchableOpacity onPress={toggleMapType}>
          <Text style={styles.toggleButtonText}>
            {mapType === 'terrain' ? 'Switch to Satellite' : 'Switch to Normal'}
          </Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Bottom Navigation Bar */}
      <BottomNavBar filteredParkingLots={parkingLots} animatedHeight={animatedHeight} />

      {/* Reserve Button */}
      <View style={styles.reserveButtonContainer}>
        <TouchableOpacity style={styles.reserveButton}>
          <Text style={styles.reserveButtonText}>Book your spot</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
