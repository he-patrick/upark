import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
    alignContent: 'center',
    justifyContent: 'center',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    paddingBottom: 8,
    padding: 20,
  },
  tab: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Alexandria',
    paddingBottom: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
  },
  searchContainer: {
    backgroundColor: '#343434',
    marginVertical: 16,
    alignContent: 'center',
    width: '90%', // Adjusted width to be responsive
    height: 48,
    borderRadius:50,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center', // Ensure items are centered vertically
  },
  searchIcon: {
    paddingHorizontal: 12, // Adjusted padding
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    backgroundColor: '#343434',
    color: '#fff',
    paddingVertical: 12,
    fontSize: 16,
    flex: 0.9,
  },
  historyContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 16,
  },
  historyTitle: {
    color: '#fff',
    fontSize: 24,
    fontFamily: 'Alexandria',
    alignSelf: 'flex-start',
    paddingTop: 30,
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  historyCard: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginTop: 40,
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  emptyText: {
    color: '#A3A3A3',
    fontSize: 16,
    marginTop: 16,
  },
  settingsIcon: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#333',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gearText: {
    color: '#fff',
    fontSize: 24,
  },
  reservationCard: {
    width: '90%',
    backgroundColor: '#343434',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
    alignSelf: 'center',
  },
  map: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  timeContainer: {
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  timeText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Anuphan',
  },
});

const DashboardPage = ({ navigation, route }) => {
  const { latitude, longitude, appleID, selectedStartTime, selectedEndTime } = route.params || {};
  const [address, setAddress] = useState('');

  const handleSearch = async () => {
    if (!address) return;

    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      const geocodeResult = await Location.geocodeAsync(address);
      if (geocodeResult.length === 0) {
        console.error('No coordinates found for the address');
        return;
      }

      const { latitude, longitude } = geocodeResult[0];

      navigation.navigate('ScheduleTime', { latitude, longitude, appleID });
    } catch (error) {
      console.error('Error during search:', error);
    }
  };

  const startTime = selectedStartTime ? new Date(selectedStartTime) : null;
  const endTime = selectedEndTime ? new Date(selectedEndTime) : null;
  const hasReservation = latitude && longitude && startTime && endTime;

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Tabs */}
      <View style={styles.tabs}>
        <Text style={[styles.tab, styles.activeTab]}>Park</Text>
        <Text style={styles.tab}>Post</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchIcon}>
          <MaterialIcons name="search" size={24} color="#A3A3A3" />
        </View>
        <TextInput
          style={styles.searchInput}
          placeholder="Search parking spaces..."
          placeholderTextColor="#A3A3A3"
          value={address}
          onChangeText={setAddress}
          onSubmitEditing={handleSearch}
        />
      </View>

      {/* History Section */}
      <View style={styles.historyContainer}>
        <Text style={styles.historyTitle}>History</Text>
        {hasReservation ? (
          <View style={styles.reservationCard}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }}
            >
              <Marker coordinate={{ latitude: latitude, longitude: longitude }} />
            </MapView>
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>
                Start Time:{' '}
                {startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
              <Text style={styles.timeText}>
                End Time:{' '}
                {endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.historyCard}>
            <Image
              source={require('../assets/parking_sign.png')}
              style={styles.image}
            />
            <Text style={styles.emptyText}>Seems pretty empty for now...</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default DashboardPage;
