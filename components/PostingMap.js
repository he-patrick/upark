import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import BottomNavBarPost from './BottomNavBarPost';
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
    backgroundColor: '#000',
    borderRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  toggleButtonText: {
    fontSize: 16,
    color: '#fff'
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
  },
});

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

export default function PostingMap({navigation}) {
  const route = useRoute();
  const { latitude, longitude } = route.params || {};

  // State to manage the map region
  const [mapRegion, setMapRegion] = useState(null);
  const [mapType, setMapType] = useState('terrain');
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [parkingLotsState, setParkingLotsState] = useState([]);
  const [selectedParkingLotId, setSelectedParkingLotId] = useState(null);

  // New state variables for marker and address
  const [markerCoordinate, setMarkerCoordinate] = useState(null);
  const [address, setAddress] = useState('Tap on map to select parking address');

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

  // Set map region based on search coordinates or user's current location
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
    if (latitude && longitude) {
      const updatedParkingLots = parkingLots.map((parkingLot) => {
        const distanceInKm = getDistanceFromLatLonInKm(
          latitude,
          longitude,
          parkingLot.latitude,
          parkingLot.longitude
        );
        const distance = distanceInKm; // Keep distance in km
        return {
          ...parkingLot,
          distance: distance,
        };
      });

      // Sort the parking lots by distance
      updatedParkingLots.sort((a, b) => a.distance - b.distance);

      setParkingLotsState(updatedParkingLots);
    }
  }, [latitude, longitude]);

  // Center the map on the selected parking lot
  useEffect(() => {
    if (selectedParkingLotId) {
      const selectedParkingLot = parkingLotsState.find(
        (lot) => lot.id === selectedParkingLotId
      );
      if (selectedParkingLot) {
        setMapRegion({
          latitude: selectedParkingLot.latitude,
          longitude: selectedParkingLot.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        });
      }
    }
  }, [selectedParkingLotId]);

  // Function to handle map presses
  const handleMapPress = async (event) => {
    const coordinate = event.nativeEvent.coordinate;

    // Update the marker coordinate
    setMarkerCoordinate(coordinate);

    // Fetch the address for the clicked location
    await fetchAddress(coordinate);
  };

  const handleConfirm = () => {
    if (!markerCoordinate) {
      alert('Please select a parking lot first!');
      return;
    }

    // Handle the reservation confirmation
    navigation.navigate('ProofOfOwnershipPage')
  };

  // Function to fetch address using OpenStreetMap Nominatim API
  const fetchAddress = async (coordinate) => {
    const { latitude, longitude } = coordinate;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
        {
          headers: {
            'User-Agent': 'upark/1.0 (kevinmaobc@gmail.com)',
          },
        }
      );
      const data = await response.json();

      if (data && data.display_name) {
        const formattedAddress = data.display_name;
        setAddress(formattedAddress);
      } else {
        setAddress('Address not found');
      }
    } catch (error) {
      console.error(error);
      setAddress('Error fetching address');
    }
  };

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
        onPress={handleMapPress} // Added onPress handler
      >
        {/* Render the marker if it exists */}
        {markerCoordinate && (
          <Marker coordinate={markerCoordinate} />
        )}

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
              source={
                parkingLot.id === selectedParkingLotId
                  ? require('../assets/selected_parking.png')
                  : require('../assets/parking.png')
              }
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
            {mapType === 'terrain' ? 'Satellite' : 'Normal'}
          </Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Bottom Navigation Bar */}
      <BottomNavBarPost
        filteredParkingLots={parkingLotsState}
        animatedHeight={animatedHeight}
        selectedParkingLotId={selectedParkingLotId}
        setSelectedParkingLotId={setSelectedParkingLotId}
        address={address} // Passed the address prop
      />

      {/* Reserve Button */}
      <View style={styles.reserveButtonContainer}>
        <TouchableOpacity style={styles.reserveButton}
          onPress={handleConfirm}>
          <Text style={styles.reserveButtonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
