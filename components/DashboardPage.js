import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, SafeAreaView, Linking } from 'react-native';
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
    width: '85%',
    height: 48,
    borderRadius: 50,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    paddingHorizontal: 12,
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
    paddingHorizontal: 35,
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
    width: '85%',
    backgroundColor: '#343434',
    borderRadius: 10,
    padding: 10,
    paddingBottom: 20,
    marginVertical: 10,
    alignItems: 'center',
    alignSelf: 'center',
  },
  map: {
    width: '95%',
    paddingTop: '2%',
    height: 150,
    borderRadius: 10,
  },
  timeContainer: {
    marginTop: 10,
    padding: 10,
    width: '100%',
    alignItems: 'center',
  },
  timeText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Anuphan',
    textAlign: 'center',
  },
  addrText: {
    color: '#fff',
    fontSize: 14,
    paddingBottom: 10,
    fontFamily: 'Alexandria',
    textAlign: 'center',
  },
  finishButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#E85151',
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center',
  },
  finishButtonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Alexandria',
  },
});

const DashboardPage = ({ navigation, route }) => {
  const { latitude, longitude, appleID, selectedStartTime, selectedEndTime } = route.params || {};
  const [address, setAddress] = useState('');
  const [reservationAddress, setReservationAddress] = useState('');

  const [reservationDetails, setReservationDetails] = useState({
    latitude,
    longitude,
    selectedStartTime,
    selectedEndTime,
  });


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
  const hasReservation = reservationDetails.latitude && reservationDetails.longitude && reservationDetails.selectedStartTime && reservationDetails.selectedEndTime;

  useEffect(() => {
    const fetchAddress = async () => {
      if (hasReservation) {
        try {
          const geocodeResult = await Location.reverseGeocodeAsync({
            latitude: latitude,
            longitude: longitude,
          });

          if (geocodeResult.length > 0) {
            const { name, street, city, region, postalCode } = geocodeResult[0];
            const fullAddress = `${name} ${street}, ${city}, ${region} ${postalCode}`;
            setReservationAddress(fullAddress);
          } else {
            setReservationAddress('Address not found');
          }
        } catch (error) {
          console.error('Error fetching address:', error);
        }
      }
    };

    fetchAddress();
  }, [hasReservation]);

  const openInAppleMaps = () => {
    if (latitude && longitude) {
      const url = `http://maps.apple.com/?ll=${latitude},${longitude}&q=Parking_Location`;
      Linking.openURL(url).catch((err) => console.error('Error opening Apple Maps:', err));
    }
  };  

  const handleFinish = () => {

    setReservationDetails({
        latitude: null,
        longitude: null,
        selectedStartTime: null,
        selectedEndTime: null,
      });
      setReservationAddress('');
    navigation.navigate('DefaultSurveyPage');

    
};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabs}>
        <Text style={[styles.tab, styles.activeTab]}>Park</Text>
        <Text style={styles.tab}>Post</Text>
      </View>

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

      <View style={styles.historyContainer}>
        <Text style={styles.historyTitle}>Bookings</Text>
        {hasReservation ? (
        <TouchableOpacity onPress={openInAppleMaps} style={styles.reservationCard}>
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
            <Text style={styles.addrText}>{reservationAddress}</Text>
            <Text style={styles.timeText}>
                {startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} Start, {endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} End
            </Text>
            </View>
            <TouchableOpacity
            style={styles.finishButton}
            onPress={() => handleFinish()}
            >
            <Text style={styles.finishButtonText}>Exit Booking</Text>
            </TouchableOpacity>
        </TouchableOpacity>
        ) : (
        <View style={styles.historyCard}>
            <Image source={require('../assets/parking_sign.png')} style={styles.image} />
            <Text style={styles.emptyText}>Seems pretty empty for now...</Text>
        </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default DashboardPage;
