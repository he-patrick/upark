import React, { useEffect, useRef } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';

const SplashScreen = () => {
  const fadeAnim = useRef(new Animated.Value(1)).current; // Initial opacity 1

  useEffect(() => {
    // Start the fade-out animation after the component mounts
    Animated.timing(fadeAnim, {
      toValue: 0, // Fade out to opacity 0
      duration: 2000, // Duration of 2 seconds
      useNativeDriver: true, // Optimize for performance
    }).start();
  }, []);
  return (
    <View style={styles.splashScreen}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Image 
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>
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