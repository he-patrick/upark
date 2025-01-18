import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    marginVertical: 16,
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
    justifyContent: 'center',
    width: 300,
  },
  h2: {
    color: "#fff",
    fontSize: 18
  }
});

export default function PaymentPage() {
  return (
    <View style={styles.container}>
      <View style={styles.h1Container}>
        <Text style={styles.h1}>
          Welcome!
        </Text>
        <Text style={styles.h2}>
          We need some information from you to get started.
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.labelText}>
          Full Name
        </Text>
        <TextInput
          style={styles.input}
          placeholder="John Smith"
          placeholderTextColor="#A3A3A3"
        />
      </View>
    </View>
  );
}