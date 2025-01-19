import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';

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
  shortinputContainer: {
    width: 140,
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
  },
  twoinputContainers: {
    flexDirection: 'row',
    gap: 20
  }
});

export default function PaymentPage({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.h1Container}>
          <Text style={styles.h1}>
            Hi, ...
          </Text>
          <Text style={styles.h2}>
            Next, add a payment method to continue to Upark
          </Text>
        </View>
        <View style={styles.inputGroup}>
          <View style={styles.inputContainer}>
            <Text style={styles.labelText}>
              Card Number
            </Text>
            <TextInput
              style={styles.input}
              placeholder="XXXX XXXX XXXX XXXX"
              placeholderTextColor="#A3A3A3"
            />
          </View>
          <View style={styles.twoinputContainers}>
            <View style={styles.shortinputContainer}>
              <Text style={styles.labelText}>
                Exp. Date
              </Text>
              <TextInput
                style={styles.input}
                placeholder="MM/YY"
                placeholderTextColor="#A3A3A3"
              />
            </View>
            <View style={styles.shortinputContainer}>
              <Text style={styles.labelText}>
                Exp. Date
              </Text>
              <TextInput
                style={styles.input}
                placeholder="MM/YY"
                placeholderTextColor="#A3A3A3"
              />
            </View>
          </View>
        </View>
        </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DashboardPage')}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}