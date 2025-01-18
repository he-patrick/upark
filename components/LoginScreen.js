import React, {useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import FaGoogle from 'react-native-vector-icons/FontAwesome';
import FaApple from 'react-native-vector-icons/FontAwesome';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { makeRedirectUri } from 'expo-auth-session';

const LoginScreen = () => {

  const redirectUri = makeRedirectUri({
    useProxy: true,
  });
  console.log('Redirect URI:', redirectUri);

  // Initialize Google authentication
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '594767575076-n93esncs34jtgfl1mbana0obttbfrbkl.apps.googleusercontent.com',
    iosClientId: '594767575076-luv8frjf4fm5qk6qcfru1trj2lsrgfju.apps.googleusercontent.com',
    androidClientId: '594767575076-mu16msoird8hns0m1hd0khtpptsa8hr2.apps.googleusercontent.com',
    // Optionally, you can add scopes
    scopes: ['profile', 'email'],
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      // Fetch user data
      console.log('Google Sign-In successful!', authentication);

      fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${authentication.accessToken}` },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('User Info:', data);
          // Handle user data
        })
        .catch((err) => {
          console.error('Error fetching user info:', err);
        });
    }
  }, [response]);
  const handleAppleSignIn = () => {
    // Implement Apple Sign In logic
    console.log('Apple sign in pressed');
  };

  const handleGoogleSignIn = () => {
    // Implement Google Sign In logic
    promptAsync();
    console.log('Google sign in pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Log in</Text>
          <Text style={styles.subtitle}>Get started with Upark</Text>
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.signInButton}
            onPress={handleAppleSignIn}
          >
            <View style={styles.buttonContent}>
              <View style={{marginRight: 20}}>
                <FaApple name="apple" size={30} color="#000000"/>
              </View>
              <Text style={styles.buttonText}>Sign in with Apple</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.signInButton, styles.googleButton]}
            onPress={handleGoogleSignIn}
          >
            <View style={styles.buttonContent}>
              <View style={{marginRight: 15}}>
                <FaGoogle name="google" size={30} color="#000000"/>
              </View>
              <Text style={styles.buttonText}>Sign in with Google </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 200,
    paddingEnd: 50,
    paddingBottom: 350,
    paddingStart: 50,
  },
  content: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',

  },
  titleContainer: {
    display: 'flex',
    padding: 10,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: -25,
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
  subtitle: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 40,
  },
  buttonContainer: {
    gap: 16,
  },
  signInButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
    width: 260,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleButton: {
    width: 260,
    height: 50,
    backgroundColor: '#FFFFFF',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
});

export default LoginScreen;