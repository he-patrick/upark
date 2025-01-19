import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { updateUserInfo } from '../server/firebase';
import DateTimePicker from '@react-native-community/datetimepicker';

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
    fontSize: 24,
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
  smallbutton: {
    backgroundColor: '#343434',
    color: '#fff',
    width: 160,
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#343434',
  },
  buttonSelected: {
    backgroundColor: '#343434',
    color: '#fff',
    width: 160,
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#fff',
  },
  buttonText: {
    fontFamily: "Alexandria",
    fontSize: 18,
  },
  smallbuttonText: {
    color: '#fff'
  },
  content: {
    justifyContent: 'space-between',
    paddingTop: 150
  },
  inputGroup: {
    paddingTop: 40,
  },
  buttonContainer: {
    paddingBottom: 0,
  },
  twoinputContainers: {
    flexDirection: 'row',
    marginTop: 50,
    backgroundColor: '#343434',
    borderRadius: 10,
    width: '100%'
  },
  smallText: {
    fontFamily: 'Anuphan',
    fontSize: 14,
    color: '#fff'
  }
});

export default function ScheduleTime({navigation, route}) {

  const [startSelected, setstartSelected] = useState(true);
  const [selectedStartTime, setSelectedStartTime] = useState(new Date());
  const [selectedEndTime, setSelectedEndTime] = useState(new Date());

  // Handle time change
  const onChangeStart = (event, selectedDate) => {
    const currentDate = selectedDate || selectedStartTime;
    setSelectedStartTime(currentDate);
    // console.log(currentDate);
  };

  const onChangeEnd = (event, selectedDate) => {
    const currentDate = selectedDate || selectedEndTime;
    setSelectedEndTime(currentDate);
    // console.log(currentDate);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.h1Container}>
          <Text style={styles.h1}>
            Schedule Parking
          </Text>
        </View>
        <View style={styles.twoinputContainers}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={startSelected ? styles.buttonSelected : styles.smallbutton} onPress={() => setstartSelected(true)}>
              <Text style={styles.smallbuttonText}>Start</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={startSelected ? styles.smallbutton : styles.buttonSelected}  onPress={() => setstartSelected(false)}>
              <Text style={styles.smallbuttonText}>End</Text>
            </TouchableOpacity>
          </View>
        </View>
        { startSelected ? <View style={styles.inputGroup}>
            <DateTimePicker
            value={selectedStartTime}
            mode="time" // Only time picker, no date
            display="spinner" // Optionally use "spinner" for iOS (or "clock" for Android)
            onChange={onChangeStart}
            />
        </View> : <View style={styles.inputGroup}>
            <DateTimePicker
            value={selectedEndTime}
            mode="time" // Only time picker, no date
            display="spinner" // Optionally use "spinner" for iOS (or "clock" for Android)
            onChange={onChangeEnd}
            />
        </View>}
        </View>
        <View>
            <Text style={styles.smallText}>{selectedStartTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} Start, {selectedEndTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} End</Text>
        </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}