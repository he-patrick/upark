import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, Switch, SafeAreaView } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { PaperProvider, Checkbox } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

const SpotRegistrationConfirmedPage = ({ navigation }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [file, setFile] = useState(null);
    const handleFilePicker = async () => {
        try {
          // Open the file picker
          const result = await DocumentPicker.getDocumentAsync({
            type: '*/*', // Allow any type of file
          });
    
          if (result.type === 'cancel') {
            // Handle the case where the user cancels the file picker
            console.log('File picker canceled');
          } else {
            // File selected successfully
            console.log('File selected:', result);
            setFile(result); // Set the selected file to state
            Alert.alert('File selected:', result.name); // Show file name in an alert
          }
        } catch (error) {
          console.log('Error picking file:', error);
          Alert.alert('Error picking file', error.message); // Show an error message if the picker fails
        }
    };
  return (
    
    <SafeAreaView style={styles.container}>
      <View style={styles.upperContent}>
      {/* Centered Title */}
      <Text style={styles.title}>Upload proof of ownership</Text>

      {/* Left-aligned Text with padding from the sides */}
      <Text style={styles.boldtext}>
        Acceptable documents include:
      </Text>
      <View style={styles.bulletPointsContainer}>
        <Text style={styles.bulletPoint}>• Clear photo of parking pass</Text>
        <Text style={styles.bulletPoint}>• Lease agreement confirming parking permissions</Text>
        <Text style={styles.bulletPoint}>• Utility bill associated with your property</Text>
      </View>

      <Text style={styles.text}>
        Note: Parking spots registered without valid proof of ownership will not be accepted. Ensuring proper documentation protects all users and maintains the integrity of the marketplace.
      </Text>
      <TouchableOpacity style={styles.uploadbutton} onPress={handleFilePicker}>
        <Icon name="upload" size={24} color="#ffffff" />
        <Text style={styles.uploadbuttonText}>    Upload</Text>
      </TouchableOpacity>
      </View>
      
      
      {/* <View style={styles.transparentRectangle} /> */}
      {/* <View style={styles.checkboxContainer}>
        <Checkbox
          status={isChecked ? 'checked' : 'unchecked'}
          onPress={() => setIsChecked(!isChecked)} // Toggle checkbox on press
          color='#000000'
          uncheckedColor="#000"
          style={styles.checkbox}
        //   checkedColor="#000000"
        //   uncheckedColor='#000000'
        />
        <Text style={styles.checkboxLabel}>{'I confirm that I have read, understand, and agree to the Terms and Conditions, Privacy Policy, and any applicable policies regarding the use of this platform. I acknowledge that providing false or misleading information may result in the removal of my listing and account suspension.'}</Text>
      </View> */}
      <View style={styles.lowerContent}>
      <View style={styles.checkboxContainer}>
        {/* <Checkbox
          status={isChecked ? 'checked' : 'unchecked'}
          onPress={() => setIsChecked(!isChecked)} // Toggle checkbox on press
          color='#000000'
          uncheckedColor="#000"
          style={styles.checkbox}
        //   checkedColor="#000000"
        //   uncheckedColor='#000000'
        /> */}
        {isChecked ? <TouchableOpacity style={styles.square} onPress={() => setIsChecked(!isChecked)} /> : <TouchableOpacity style={styles.squarePressed} onPress={() => setIsChecked(!isChecked)}><Text style={styles.checkText}>X</Text></TouchableOpacity>}
        <Text style={styles.label}>I confirm that I have read, understand, and agree to the Terms and Conditions. I acknowledge that providing false or misleading information may result in the removal of my listing and account suspension.</Text>
      </View>
      

      {/* Centered Button at the Bottom */}
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DashboardPage')}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
      </View>
    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  label: {
    paddingLeft: 10,
  },
  checkText: {
    color: '#fff',
    padding: 4,
    fontFamily: 'Alexandria',
    alignSelf: 'center'
  },
  square: {
    width: 30,  // Width of the square
    height: 30,
    borderWidth: 2,
        borderColor: 'black', 
        borderRadius: 5,
        backgroundColor: 'white',
  },
  squarePressed: {
    width: 30,  // Width of the square
    height: 30,
    borderWidth: 2,
    backgroundColor: 'black',
        borderColor: 'black', 
        borderRadius: 5,
  },
  buttonContainer: {
    paddingBottom: 50,
  },
  upperContent: {
    paddingTop: 100,
  },
    container: {
        flex: 1, // Take up full screen height
        // paddingTop: 20, // Padding at the top for the title
        backgroundColor: '#ffffff',
        justifyContent: 'space-between', // Start content from the top
    },
    title: {
        fontFamily: 'Alexandria',
        fontSize: 27,
        fontWeight: 400,
        color: '#000000',
        textAlign: 'center', // Centered title
        marginBottom: 40, // Adds space below the title
    },
    text: {
        fontFamily: 'Anuphan',
        fontSize: 14,
        fontWeight: 400,
        color: '#000000',
        textAlign: 'left', // Left-aligned text
        paddingHorizontal: 40, // Padding on the left and right
        marginBottom: 10, // Adds space between paragraphs
    },
    boldtext: {
        fontFamily: 'Anuphan',
        fontSize: 14,
        fontWeight: 400,
        color: '#000000',
        textAlign: 'left', // Left-aligned text
        paddingHorizontal: 40, // Padding on the left and right
        marginBottom: 10, // Adds space between paragraphs
        fontWeight: 'bold',
    },
    bulletPointsContainer: {
        paddingLeft: 60, // Padding on the left for bullet points
        marginBottom: 20, // Space between bullet points and the button
    },
    bulletPoint: {
        fontFamily: 'Anuphan',
        fontSize: 14,
        fontWeight: 400,
        color: '#000000',
        textAlign: 'left', // Left-align the bullet point text
        // marginBottom: 10, // Adds space between each bullet point
    },
    button: {
        left: '50%', // Move it to the center horizontally
        transform: [{ translateX: -175 }], // Offset by half the button's width to center it
        width: 350, // Button width (can adjust as needed)
        alignItems: 'center', // Centers text inside the button
        position: 'absolute', // Pins the button to the bottom of the screen
        bottom: 60, // Adds space from the bottom of the screen
        backgroundColor: '#000000', // Green color
        padding: 10,
        borderRadius: 5,
        
        // width: '80%', // Button width
    },
    buttonText: {
        fontFamily: 'Alexandria',
        fontSize: 24,
        fontWeight: 400,
        color: '#ffffff'
    },
    uploadbutton: {
        marginTop: 10,
        left: '50%', // Move it to the center horizontally
        transform: [{ translateX: -175 }], // Offset by half the button's width to center it
        width: 350, // Button width (can adjust as needed)
        alignItems: 'center', // Centers text inside the button
        backgroundColor: '#000000', // Green color
        padding: 10,
        borderRadius: 5,
        width: '80%', // Button width
        flexDirection: 'row',
        justifyContent: 'center',
    },
    uploadbuttonText: {
        fontFamily: 'Alexandria',
        fontSize: 20,
        fontWeight: 400,
        color: '#ffffff',
        textAlign: 'center',
    },
    checkboxContainer: {
      // backgroundColor: '#343434',
        flexDirection: 'row',
        // alignItems: 'center',
        // marginBottom: 20,
        // // color: '#000000',
        paddingHorizontal: 33,
        // justifyContent: 'center',
        // left: '50%', // Move it to the center horizontally
        // transform: [{ translateX: -175 }], // Offset by half the button's width to center it
        width: 380, // Button width (can adjust as needed)
        // position: 'absolute', // Pins the button to the bottom of the screen
        bottom: 100, // Adds space from the bottom of the screen
        // padding: 10,
        // borderRadius: 5,
    },
    checkboxLabel: {
        fontSize: 12,
        marginLeft: 10,
    },
    checkbox: {
        borderWidth: 2,
        borderColor: 'black', 
        borderRadius: 5,
    },
    transparentRectangle: {
        position: 'absolute', // Absolute position
        top: 730,             // Y-coordinate (distance from the top of the screen)
        left: 83,            // X-coordinate (distance from the left of the screen)
        width: 30,           // Width of the rectangle
        height: 30,          // Height of the rectangle
        borderWidth: 2,       // Border width
        borderColor: 'black', // Border color (black)
        backgroundColor: 'transparent', // Transparent fill
    },

  
});

export default SpotRegistrationConfirmedPage;

// ----

// import React, { useState } from 'react';
// import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
// import * as DocumentPicker from 'expo-document-picker';
// import { PaperProvider, Checkbox } from 'react-native-paper';
// import Icon from 'react-native-vector-icons/FontAwesome';

// const SpotRegistrationConfirmedPage = ({ navigation }) => {
//     const [isChecked, setIsChecked] = useState(false);
//     const [file, setFile] = useState(null);

//     const handleFilePicker = async () => {
//         try {
//             // Open the file picker
//             const result = await DocumentPicker.getDocumentAsync({
//                 type: '*/*', // Allow any type of file
//             });

//             if (result.type === 'cancel') {
//                 // Handle the case where the user cancels the file picker
//                 console.log('File picker canceled');
//             } else {
//                 // File selected successfully
//                 console.log('File selected:', result);
//                 setFile(result); // Set the selected file to state
//                 Alert.alert('File selected:', result.name); // Show file name in an alert
//             }
//         } catch (error) {
//             console.log('Error picking file:', error);
//             Alert.alert('Error picking file', error.message); // Show an error message if the picker fails
//         }
//     };

//     return (
//         <PaperProvider>
//             <View style={styles.container}>
//                 {/* Centered Title */}
//                 <Text style={styles.title}>Upload proof of ownership</Text>

//                 {/* Left-aligned Text with padding from the sides */}
//                 <Text style={styles.boldtext}>
//                     Acceptable documents include:
//                 </Text>
//                 <View style={styles.bulletPointsContainer}>
//                     <Text style={styles.bulletPoint}>• Clear photo of parking pass</Text>
//                     <Text style={styles.bulletPoint}>• Lease agreement confirming parking permissions</Text>
//                     <Text style={styles.bulletPoint}>• Utility bill associated with your property</Text>
//                 </View>

//                 <Text style={styles.text}>
//                     Note: Parking spots registered without valid proof of ownership will not be accepted. Ensuring proper documentation protects all users and maintains the integrity of the marketplace.
//                 </Text>

//                 <TouchableOpacity style={styles.uploadbutton} onPress={handleFilePicker}>
//                     <Icon name="upload" size={24} color="#ffffff" />
//                     <Text style={styles.uploadbuttonText}>    Upload</Text>
//                 </TouchableOpacity>

//                 {/* Checkbox with Border */}
//                 <View style={styles.checkboxWrapper}>
//                     <Checkbox
//                         status={isChecked ? 'checked' : 'unchecked'}
//                         onPress={() => setIsChecked(!isChecked)} // Toggle checkbox on press
//                         color="#000000"
//                         uncheckedColor="black"
//                     />
//                     <Text style={styles.checkboxLabel}>
//                         I confirm that I have read, understand, and agree to the Terms and Conditions, Privacy Policy, and any applicable policies regarding the use of this platform. I acknowledge that providing false or misleading information may result in the removal of my listing and account suspension.
//                     </Text>
//                 </View>

//                 {/* Centered Button at the Bottom */}
//                 <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DashboardPage')}>
//                     <Text style={styles.buttonText}>Next</Text>
//                 </TouchableOpacity>
//             </View>
//         </PaperProvider>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1, // Take up full screen height
//         backgroundColor: '#ffffff',
//         justifyContent: 'center', // Start content from the top
//     },
//     title: {
//         fontFamily: 'Alexandria',
//         fontSize: 27,
//         fontWeight: 400,
//         color: '#000000',
//         textAlign: 'center', // Centered title
//         marginBottom: 40, // Adds space below the title
//     },
//     text: {
//         fontFamily: 'Anuphan',
//         fontSize: 16,
//         fontWeight: 400,
//         color: '#000000',
//         textAlign: 'left', // Left-aligned text
//         paddingHorizontal: 40, // Padding on the left and right
//         marginBottom: 10, // Adds space between paragraphs
//     },
//     boldtext: {
//         fontFamily: 'Anuphan',
//         fontSize: 16,
//         fontWeight: 400,
//         color: '#000000',
//         textAlign: 'left', // Left-aligned text
//         paddingHorizontal: 40, // Padding on the left and right
//         marginBottom: 10, // Adds space between paragraphs
//         fontWeight: 'bold',
//     },
//     bulletPointsContainer: {
//         paddingLeft: 60, // Padding on the left for bullet points
//         marginBottom: 20, // Space between bullet points and the button
//     },
//     bulletPoint: {
//         fontFamily: 'Anuphan',
//         fontSize: 13,
//         fontWeight: 400,
//         color: '#000000',
//         textAlign: 'left', // Left-align the bullet point text
//     },
//     button: {
//         left: '50%', // Move it to the center horizontally
//         transform: [{ translateX: -175 }], // Offset by half the button's width to center it
//         width: 350, // Button width (can adjust as needed)
//         alignItems: 'center', // Centers text inside the button
//         position: 'absolute', // Pins the button to the bottom of the screen
//         bottom: 60, // Adds space from the bottom of the screen
//         backgroundColor: '#000000', // Green color
//         padding: 10,
//         borderRadius: 5,
//     },
//     buttonText: {
//         fontFamily: 'Alexandria',
//         fontSize: 24,
//         fontWeight: 400,
//         color: '#ffffff',
//     },
//     uploadbutton: {
//         left: '50%', // Move it to the center horizontally
//         transform: [{ translateX: -175 }], // Offset by half the button's width to center it
//         width: 350, // Button width (can adjust as needed)
//         alignItems: 'center', // Centers text inside the button
//         backgroundColor: '#000000', // Green color
//         padding: 10,
//         borderRadius: 5,
//         width: '80%', // Button width
//         flexDirection: 'row',
//         justifyContent: 'center',
//     },
//     uploadbuttonText: {
//         fontFamily: 'Alexandria',
//         fontSize: 20,
//         fontWeight: 400,
//         color: '#ffffff',
//         textAlign: 'center',
//     },
//     checkboxWrapper: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginBottom: 20,
//         paddingHorizontal: 40,
//         left: '50%', // Move it to the center horizontally
//         transform: [{ translateX: -175 }], // Offset by half the checkbox's width to center it
//         width: 350, // Checkbox container width (can adjust as needed)
//         padding: 10,
//         // borderRadius: 5,
//         // borderWidth: 2, // Border around the checkbox
//         // borderColor: 'black', // Border color when unchecked
//     },
//     checkboxLabel: {
//         fontSize: 12,
//         marginLeft: 10,
//     },
// });

// export default SpotRegistrationConfirmedPage;

