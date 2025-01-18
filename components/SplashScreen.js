import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.splashScreen}>
      <Image 
        source={require('../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  splashScreen: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: Dimensions.get('window').width * 0.7, // Logo will be 70% of screen width
    height: Dimensions.get('window').width * 0.7,
  },
});

export default SplashScreen;