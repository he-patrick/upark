import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { updateUserInfo } from '../server/firebase';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputContainer: {
    marginVertical: 8,
    width: 300
  },
  input: {
    color: '#fff',
    borderRadius: 10,
    backgroundColor: '#343434',
    padding: 12,
    fontSize: 14,
  },
  labelText: {
    color: "#fff",
    padding: 10,
    fontSize: 14,
    fontFamily: "Anuphan",
  },
  h1: {
    color: "#fff",
    fontFamily: "Alexandria",
    fontSize: 40,
    textAlign: 'left',
  },
  h1Container: {
    width: 300,
  },
  h2: {
    color: "#fff",
    fontSize: 18,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#fff',
    width: 280,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: "Alexandria",
    fontSize: 18,
  },
  content: {
    justifyContent: 'space-between',
    paddingTop: 200
  },
  inputGroup: {
    paddingTop: 40,
  },
  buttonContainer: {
    paddingBottom: 50,
  }
});

export default function WelcomePage({navigation, route}) {
  const { appleID, email } = route.params;
  const [fullName, setFullName] = useState('');
  const [licensePlate, setLicensePlate] = useState('');

  const handleSubmit = async () => {
    if (!fullName.trim() || !licensePlate.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
  
    try {
      // Use updateUserInfo instead of addUser
      await updateUserInfo(appleID, fullName, licensePlate);
  
      navigation.navigate('Payment', {
        name: fullName,
      });
    } catch (error) {
      console.error('Error updating database:', error);
      Alert.alert('Error', 'Failed to update your information. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.h1Container}>
          <Text style={styles.h1}>
            Welcome!
          </Text>
          <Text style={styles.h2}>
            We need some information from you to get started.
          </Text>
        </View>
        <View style={styles.inputGroup}>
          <View style={styles.inputContainer}>
            <Text style={styles.labelText}>
              Full Name
            </Text>
            <TextInput
              style={styles.input}
              placeholder="John Smith"
              placeholderTextColor="#A3A3A3"
              value={fullName}  // Bind to state
              onChangeText={setFullName}  // Update state on change
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.labelText}>
              License Plate
            </Text>
            <TextInput
              style={styles.input}
              placeholder="ABCD 123"
              placeholderTextColor="#A3A3A3"
              value={licensePlate}  // Bind to state
              onChangeText={setLicensePlate}  // Update state on change
            />
          </View>
        </View>
        </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}