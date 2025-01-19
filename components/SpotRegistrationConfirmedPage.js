import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const SpotRegistrationConfirmedPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Spot registered successfully!</Text>
      {/* Local image */}
      <Image source={require('../assets/stopped.png')} style={styles.image} />
      {/* HARDCODED */}
      <Text style={styles.paragraph}>Our team is reviewing your submission to ensure all required documents are valid. This process typically takes <Text style={styles.boldText}>a few business days.</Text></Text>
      <Text style={styles.paragraph}>You will receive a confirmation email once your parking spot is approved and listed on the platform.</Text>
      <Text style={styles.paragraph}>If you have any questions in the meantime, feel free to contact our support team.</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('DashboardPagePost')} // Navigate to 'Home' screen
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
    backgroundColor: '#fff',
  },
  title: {
    fontFamily: 'Alexandria',
    fontSize: 24,
    fontWeight: 400,
    color: '#000',
  },
  subtitle: {
    fontFamily: 'Anuphan',
    fontSize: 16,
    fontWeight: 400,
    color: '#000',
  },
  image: {
    width: Dimensions.get('window').width * 0.6,
    height: Dimensions.get('window').width * 0.6,
    marginTop: 10,
  },
  button: {
    position: 'absolute', // Pins the button to the bottom of the screen
    bottom: 60, // Adds space from the bottom of the screen
    backgroundColor: '#000', // Green color
    padding: 10,
    borderRadius: 10,
    width: '80%', // Button width
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Alexandria',
    fontSize: 18,
    fontWeight: 400,
    color: '#fff'
  },
  paragraph: {
    fontFamily: 'Anuphan',
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'justify', // Center the text
    marginTop: 20, // Adds space between the image and the paragraph
    lineHeight: 17, // Increases line spacing for readability
    paddingHorizontal: 40,
    color: '#000',
  },
  boldText: {
    fontWeight: 'bold', // Makes this part of the text bold
  },
  
});

export default SpotRegistrationConfirmedPage;
