import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Animated, Dimensions, TouchableOpacity, Text, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import BottomNavBar from './BottomNavBar';
import * as Location from 'expo-location';
import { useRoute } from '@react-navigation/native';


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
    fontFamily: 'Alexandria',
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

// Updated parking lots data with coordinates
const parkingLots = [
  {
    id: 1,
    name: 'Parking Lot A',
    latitude: 45.421894,
    longitude: -75.679330,
  },
  {
    id: 2,
    name: 'Parking Lot B',
    latitude: 45.422287,
    longitude: -75.679905,
  },
  {
    id: 3,
    name: 'Parking Lot C',
    latitude: 45.424609,
    longitude: -75.683021,
  },
  {
    id: 4,
    name: 'Parking Lot D',
    latitude: 45.424409,
    longitude: -75.677453,
  },
  {
    id: 5,
    name: 'Parking Lot E',
    latitude: 45.422326245168286,
    longitude: -75.67479222216723,
  },
  {
    id: 6,
    name: 'Parking Lot F',
    latitude: 45.426475,
    longitude: -75.679551,
  },
];

// Haversine formula to calculate distances
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of earth in km
  const deg2rad = (deg) => deg * (Math.PI / 180);
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

export default function MapsPage() {
  const route = useRoute();
  const { latitude, longitude } = route.params || {};
  // State to manage the map region
  const [mapRegion, setMapRegion] = useState(null);

  const [mapType, setMapType] = useState('terrain');
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [parkingLotsState, setParkingLotsState] = useState([]);
  const [selectedParkingLotId, setSelectedParkingLotId] = useState(null);
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

  useEffect(() => {
    if (latitude && longitude) {
      // If search coordinates are provided, set the map region to that location
      setMapRegion({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      });
    } else if (location) {
      // Default to user's current location
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      });
    }
  }, [latitude, longitude, location]);

  // Calculate distances and sort parking lots when location changes
  useEffect(() => {
    if (location) {
      const updatedParkingLots = parkingLots.map((parkingLot) => {
        const distanceInKm = getDistanceFromLatLonInKm(
          location.coords.latitude,
          location.coords.longitude,
          parkingLot.latitude,
          parkingLot.longitude
        );
        const distance = distanceInKm * 1; // Convert km to miles
        return {
          ...parkingLot,
          distance: distance,
        };
      });

      // Sort the parking lots by distance
      updatedParkingLots.sort((a, b) => a.distance - b.distance);

      setParkingLotsState(updatedParkingLots);
    }
  }, [location]);

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
        region={mapRegion}
        showsUserLocation={true}
        onRegionChangeComplete={(region) => setMapRegion(region)}
      >
        {parkingLotsState.map((parkingLot) => (
          <Marker
            key={parkingLot.id}
            coordinate={{
              latitude: parkingLot.latitude,
              longitude: parkingLot.longitude,
            }}
            onPress={() => setSelectedParkingLotId(parkingLot.id)}
          >
            <Image
              source={require('../assets/parking.png')}
              style={{ height: 35, width: 35 }}
            />
          </Marker>
        ))}
      </MapView>
      {/* Toggle Map Type Button */}
      <Animated.View
        style={[
          styles.toggleButton,
          { bottom: Animated.add(animatedHeight, new Animated.Value(110)) },
        ]}
      >
        <TouchableOpacity onPress={toggleMapType}>
          <Text style={styles.toggleButtonText}>
            {mapType === 'terrain' ? 'Switch to Satellite' : 'Switch to Normal'}
          </Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Bottom Navigation Bar */}
      <BottomNavBar
        filteredParkingLots={parkingLotsState}
        animatedHeight={animatedHeight}
        selectedParkingLotId={selectedParkingLotId}
        setSelectedParkingLotId={setSelectedParkingLotId}
      />

      {/* Reserve Button */}
      <View style={styles.reserveButtonContainer}>
        <TouchableOpacity style={styles.reserveButton}>
          <Text style={styles.reserveButtonText}>Book your spot</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
