// App.js
import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import MapView from 'react-native-maps';
import BottomNavBar from './components/BottomNavBar';

// Styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  searchBar: {
    position: 'absolute',
    top: 40,
    left: 20,
    right: 20,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    elevation: 5, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 }, // iOS shadow
    shadowOpacity: 0.25, // iOS shadow
    shadowRadius: 3.84, // iOS shadow
  },
});

// Test data
const parkingLots = [
  { id: 1, name: 'Parking Lot A', distance: '0.5 miles' },
  { id: 2, name: 'Parking Lot B', distance: '1.0 miles' },
  { id: 3, name: 'Parking Lot C', distance: '1.5 miles' },
  // ... more parking lots
];

export default function App() {

  return (
    <View style={styles.container}>
      {/* Map Background */}
      <MapView style={styles.map} />

      {/* Bottom Navigation Bar */}
      <BottomNavBar filteredParkingLots={parkingLots}/>
    </View>
  );
}