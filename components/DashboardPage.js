import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
      padding: 16,
    },
    tabs: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      borderBottomWidth: 1,
      borderBottomColor: '#fff',
      paddingBottom: 8,
    },
    tab: {
      color: '#fff',
      fontSize: 18,
    },
    activeTab: {
      borderBottomWidth: 2,
      borderBottomColor: '#fff',
    },
    searchContainer: {
      marginVertical: 16,
    },
    searchInput: {
      backgroundColor: '#333',
      color: '#fff',
      borderRadius: 8,
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

const ParkingApp = () => {
  return (
    <View style={styles.container}>
      {/* Top Tabs */}
      <View style={styles.tabs}>
        <Text style={[styles.tab, styles.activeTab]}>Park</Text>
        <Text style={styles.tab}>Post</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search parking spaces ..."
          placeholderTextColor="#999"
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
    </View>
  );
};

export default ParkingApp;
