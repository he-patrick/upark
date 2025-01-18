// App.js
import React, { useState, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions, TouchableOpacity, Text } from 'react-native';
import MapView from 'react-native-maps';
import BottomNavBar from './components/BottomNavBar';
import DefaultSurveyPage from './components/DefaultSurvey';
import SplashScreen from './components/SplashScreen';

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
    borderRadius: 0,
    elevation: 10,
    shadowColor: '#000',
    zIndex: 10,
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

// Test data
const parkingLots = [
  { id: 1, name: 'Parking Lot A', distance: '0.5 miles' },
  { id: 2, name: 'Parking Lot B', distance: '1.0 miles' },
  { id: 3, name: 'Parking Lot C', distance: '1.5 miles' },
  { id: 4, name: 'Parking Lot D', distance: '2.0 miles' },
  { id: 5, name: 'Parking Lot E', distance: '2.5 miles' },
];

export default function App() {
  const [mapType, setMapType] = useState('terrain');

  const animatedHeight = useRef(new Animated.Value(200)).current;

  const toggleMapType = () => {
    setMapType((prevType) => (prevType === 'terrain' ? 'hybrid' : 'terrain'));
  };

  const buttonBottomPosition = Animated.add(
    animatedHeight,
    new Animated.Value(110) // Adjusted to ensure it's above the BottomNavBar
  );
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000); // Show splash for 2 seconds

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <View style={styles.container}>
      <MapView mapType={mapType} style={styles.map} />

      {/* Toggle Map Type Button */}
      <Animated.View style={[styles.toggleButton, { bottom: buttonBottomPosition }]}>
        <TouchableOpacity onPress={toggleMapType}>
          <Text style={styles.toggleButtonText}>
            {mapType === 'terrain' ? 'Switch to Hybrid' : 'Switch to Terrain'}
          </Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Bottom Navigation Bar */}
      <BottomNavBar
        filteredParkingLots={parkingLots}
        animatedHeight={animatedHeight}
      />

      {/* Reserve Button */}
      <View style={styles.reserveButtonContainer}>
        <View style={styles.reserveButton}>
          <Text style={styles.reserveButtonText}>Book your spot</Text>
        </View>
      </View>
    </View>
  );
}
