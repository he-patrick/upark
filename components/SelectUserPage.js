import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import app from '../server/firebase';





export default function SelectUserPage({navigation, route}) {
  const {appleID, email} = route.params;
  const handlePark = () => {
    navigation.navigate('Welcome', {
      appleID: appleID,
      email: email,
    });
  };
  
  const handlePost = () => {
    navigation.navigate('WelcomePost', {
      appleID: appleID,
      email: email,
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top_content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Are...</Text>
        </View>
        <Image source={require('./../assets/uparking.png')} style={styles.uparkingimg}/>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handlePark} style={styles.parking_button}>
            <Image source={require('./../assets/black_arrow.png')} style={styles.buttonimg}/>
          </TouchableOpacity>

        </View>
      </View>
      <View style={styles.bottom_content}>
        <View style={styles.orContainer}>
            <Text style={styles.ortitle}>Or...</Text>
        </View>
        <Image source={require('./../assets/uposting.png')} style={styles.uparkingimg}/>
        <TouchableOpacity onPress={handlePost} style={styles.posting_button}>
            <Image source={require('./../assets/white_arrow.png')} style={styles.buttonimg}/>
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#000',
  },
  top_content: {
    backgroundColor: '#000',
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    height: '50%',
    paddingTop: 80,
    paddingStart: 40,
  },
  bottom_content: {
    backgroundColor: '#FFFFFF',
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    height: '50%',
    paddingTop: 80,
    paddingStart: 40,
  },
  titleContainer: {
    display: 'flex',
    padding: 10,
    flexDirection: 'column',
    alignItems: 'flex-start',
    alignSelf: 'stretch',

  },
  ortitle:{
    alighItems: 'flex-start',
    color: '#000000',
    fontFamily: 'Alexandria',
    fontSize: 40,
    fontWeight: 400,
    lineHeight: 52,
    marginBottom: 10,
  },

  orContainer:{
    display: 'flex',
    padding: 10,
    flexDirection: 'column',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
  },

  title: {
    color: '#FFF',
    fontFamily: 'Alexandria',
    fontSize: 40,
    fontWeight: 400,
    lineHeight: 52,
    marginBottom: 10,
  },
  parking_button:{
    marginTop: 60,
    marginLeft: 150,
    borderRadius: 200,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    padding: 25,
    width: 10,
    height: 10,

  },
  posting_button:{
    marginTop: 60,
    marginLeft: 150,
    borderRadius: 200,
    borderColor: '#000000',
    borderWidth: 1,
    padding: 25,
    width: 40,
    height: 40,

  },
  buttonimg:{
    width: 60,
    height: 60,
  },
  uparkingimg:{
    marginTop: 20,
    marginStart: -20,
    width: 200,
    height:50,
  },

  upostingimg:{
    width: 200,
    height: 90,
  },

});