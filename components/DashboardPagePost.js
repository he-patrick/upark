import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, SafeAreaView, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
    alignContent: 'center',
    justifyContent: 'space-between',
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
  button: {
    backgroundColor: '#fff',
    width: '80%',
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
    padding: 30,
    alignItems: 'center',
    // justifyContent: 'center',
    gap: 50,
    marginBottom: 300
  },
  historyCard: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginTop: 40,
    width: 200,
    height: 200,
    borderRadius: 8,
  },
  historyContainer: {
    // flex: 1,
    alignItems: 'flex-start',
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
});

const DashboardPagePost = ({ navigation, route }) => {
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabs}>
        <TouchableOpacity onPress={() => navigation.navigate('DashboardPage')}>
            <Text style={styles.tab}>Park</Text>
        </TouchableOpacity>
        <Text style={[styles.tab, styles.activeTab]}>Post</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.historyCard}>
            <Image source={require('../assets/map.png')} style={styles.image} />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('PostingMap')} style={styles.button}>
            <Text style={styles.buttonText}>
                Register parking spots +
            </Text>
        </TouchableOpacity>
      </View>

      
    </SafeAreaView>
  );
};

export default DashboardPagePost;
