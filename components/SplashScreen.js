import React, { useEffect, useRef } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';


import { Video } from 'expo-av';

const SplashScreen = () => {
  const fadeAnim = useRef(new Animated.Value(1)).current; // Initial opacity is 1 (fully visible)
  const videoRef = useRef(null); // Video reference to control playback
  
  // Video source (adjust the path as necessary)
  const videoSource = require('../assets/upark.mp4');

  useEffect(() => {
    // Set a timeout to trigger fade out after 2 seconds (you can adjust this duration)
    const timeout = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0, // Fade out to opacity 0
        duration: 2000, // Duration of 2 seconds (adjust if you want slower/faster fade)
        useNativeDriver: true, // Use native driver for better performance
      }).start();
      
      // Pause the video after fade out
      if (videoRef.current) {
        videoRef.current.pauseAsync();
      }
    }, 2000); // Fade-out will start 2 seconds after the video starts

    return () => clearTimeout(timeout); // Cleanup the timeout if the component is unmounted
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Video
          ref={videoRef}
          source={videoSource} // Local video source
          style={styles.backgroundVideo}
          resizeMode="contain" // Scale video while maintaining aspect ratio
          shouldPlay
          onError={(error) => console.log('Video error:', error)} // Error handling
        />
      </Animated.View>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  backgroundVideo: {
    width: Dimensions.get('window').width / 2, // Full width
    height: 300, // Set a fixed height (adjust as needed)
  },
});

export default SplashScreen;