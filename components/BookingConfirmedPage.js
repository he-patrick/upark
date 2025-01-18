import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const BookingConfirmedPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Booking Confirmed!</Text>
      {/* Local image */}
      <Image source={require('../assets/parked.png')} style={styles.image} />
      {/* HARDCODED */}
      <Text style={styles.subtitle}>Uspace 10:15AM - 11:15AM</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('DashboardPage')} // Navigate to 'Home' screen
        >
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Alexandria',
    fontSize: 27,
    fontWeight: 400,
  },
  subtitle: {
    fontFamily: 'Anuphan',
    fontSize: 16,
    fontWeight: 400,
  },
  image: {
    width: Dimensions.get('window').width * 0.6,
    height: Dimensions.get('window').width * 0.6,
    marginTop: 10,
  },
  button: {
    position: 'absolute', // Pins the button to the bottom of the screen
    bottom: 60, // Adds space from the bottom of the screen
    backgroundColor: '#000000', // Green color
    padding: 10,
    borderRadius: 5,
    width: '80%', // Button width
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Alexandria',
    fontSize: 24,
    fontWeight: 400,
    color: '#ffffff'
  }
  
});

export default BookingConfirmedPage;
