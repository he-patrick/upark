import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';


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
      // borderBottomColor: '#fff',
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
      // width: 280,
      flexDirection: 'row',
    },
    searchInput: {
      backgroundColor: '#343434',
      color: '#fff',
      borderRadius: 20,
      padding: 12,
      fontSize: 16,
    },
    historyContainer: {
      flex: 1,
      alignItems: 'center',
      marginTop: 16,
    },
    historyTitle: {
      color: '#fff',
      fontSize: 20,
      marginBottom: 8,
    },
    historyCard: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      width: 150,
      height: 150,
      borderRadius: 8,
    },
    emptyText: {
      color: '#fff',
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
});

const DashboardPage = () => {
    const [address, setAddress] = useState('');
    const navigation = useNavigation();

    const handleSearch = async () => {
        if (!address) return;
      
        try {
          // Ensure the app has permission to access location
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            console.error('Permission to access location was denied');
            return;
          }
      
          // Geocode the address
          const geocodeResult = await Location.geocodeAsync(address);
          if (geocodeResult.length === 0) {
            console.error('No coordinates found for the address');
            return;
          }
      
          const { latitude, longitude } = geocodeResult[0];
      
          // Navigate to MapsPage with the coordinates
          navigation.navigate('Maps', { latitude, longitude });
        } catch (error) {
          console.error('Error during search:', error);
          // Optionally, display an alert to the user
        }
      };
      
      

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Tabs */}
      <View style={styles.tabs}>
        <Text style={[styles.tab, styles.activeTab]}>Park</Text>
        <Text style={styles.tab}>Post</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={24} color="#A3A3A3" />
        <TextInput
            style={styles.searchInput}
            placeholder="Search parking spaces ..."
            placeholderTextColor="#A3A3A3"
            value={address}
            onChangeText={setAddress} // Update the address state
            onSubmitEditing={handleSearch} // Handle search action when submitted
        />
      </View>

      {/* History Section */}
      <View style={styles.historyContainer}>
        <Text style={styles.historyTitle}>History</Text>

        {/* History Card */}
        <View style={styles.historyCard}>
          <Image
            source={{
              uri: 'https://cdn.discordapp.com/attachments/1326009133056393266/1330284491788255332/image.png?ex=678d6b7a&is=678c19fa&hm=a03bd2a63d1b1d42385bb8641f72cc63dc7d217784c91335d203f93f528cdb49&',
            }}
            style={styles.image}
          />
          <Text style={styles.emptyText}>Seems pretty empty for now...</Text>
        </View>
      </View>

      {/* Settings Icon */}
      <TouchableOpacity style={styles.settingsIcon}>
        <Text style={styles.gearText}>⚙</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default DashboardPage;
