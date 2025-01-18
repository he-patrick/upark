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

const parkingLots = [
  { id: 1, name: 'Parking Lot A', distance: '0.5 miles' },
  { id: 2, name: 'Parking Lot B', distance: '1.0 miles' },
  { id: 3, name: 'Parking Lot C', distance: '1.5 miles' },
  // ... more parking lots
];

export default function App() {
  const [searchQuery, setSearchQuery] = React.useState('');

  // Filter parking lots based on search query
  const filteredParkingLots = parkingLots.filter((lot) =>
    lot.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Map Background */}
      <MapView style={styles.map} />

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <FlatList
          data={filteredParkingLots}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.parkingLotItem}>
              <Text style={styles.parkingLotName}>{item.name}</Text>
              <Text style={styles.parkingLotDistance}>{item.distance}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

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
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    maxHeight: 200,
    backgroundColor: '#fff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: 10,
    paddingTop: 10,
    elevation: 10, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: -2 }, // iOS shadow
    shadowOpacity: 0.25, // iOS shadow
    shadowRadius: 3.84, // iOS shadow
  },
  parkingLotItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  parkingLotName: {
    fontSize: 18,
    fontWeight: '600',
  },
  parkingLotDistance: {
    fontSize: 14,
    color: '#888',
  },
});
