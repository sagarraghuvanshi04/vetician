// import React, { useState, useEffect, useRef } from 'react';
// import { 
//   View, 
//   Text, 
//   StyleSheet, 
//   TouchableOpacity, 
//   TextInput, 
//   SafeAreaView 
// } from 'react-native';

// const OTPScreen = () => {
//   const [otp, setOtp] = useState(['', '', '', '', '', '']);
//   const [timer, setTimer] = useState(60);
//   const [isResendActive, setIsResendActive] = useState(false);
//   const inputRefs = useRef([]);

//   // Timer Logic
//   useEffect(() => {
//     let interval;
//     if (timer > 0) {
//       interval = setInterval(() => {
//         setTimer((prev) => prev - 1);
//       }, 1000);
//     } else {
//       setIsResendActive(true);
//       clearInterval(interval);
//     }
//     return () => clearInterval(interval);
//   }, [timer]);

//   const handleChange = (text, index) => {
//     const newOtp = [...otp];
//     newOtp[index] = text;
//     setOtp(newOtp);

//     if (text && index < 5) {
//       inputRefs.current[index + 1].focus();
//     }
//   };

//   const handleKeyPress = (e, index) => {
//     if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
//       inputRefs.current[index - 1].focus();
//     }
//   };

//   const handleResend = () => {
//     if (isResendActive) {
//       setTimer(60);
//       setIsResendActive(false);
//       // Add your API call here
//       console.log("OTP Resent!");
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Brand Header */}
//       <View style={styles.headerSection}>
//         <View style={styles.logoPlaceholder}>
//           <Text style={styles.logoIcon}>🐾</Text>
//           <Text style={styles.logoText}>Vetician</Text>
//         </View>
//         <Text style={styles.title}>Verify Account</Text>
//         <Text style={styles.subtitle}>Enter the 6-digit code sent to your email</Text>
//       </View>

//       {/* OTP Inputs */}
//       <View style={styles.otpContainer}>
//         {otp.map((digit, index) => (
//           <TextInput
//             key={index}
//             style={[
//               styles.otpInput,
//               digit ? styles.activeInput : styles.inactiveInput
//             ]}
//             keyboardType="numeric"
//             maxLength={1}
//             onChangeText={(text) => handleChange(text, index)}
//             onKeyPress={(e) => handleKeyPress(e, index)}
//             value={digit}
//             ref={(ref) => (inputRefs.current[index] = ref)}
//           />
//         ))}
//       </View>

//       {/* Action Button */}
//       <TouchableOpacity style={styles.verifyButton}>
//         <Text style={styles.buttonText}>Verify & Continue</Text>
//       </TouchableOpacity>

//       {/* Timer & Resend */}
//       <View style={styles.footer}>
//         {timer > 0 ? (
//           <Text style={styles.timerText}>Resend code in <Text style={styles.boldTime}>{timer}s</Text></Text>
//         ) : (
//           <TouchableOpacity onPress={handleResend}>
//             <Text style={styles.resendText}>
//               Don't have a code? <Text style={styles.resendLink}>Resend</Text>
//             </Text>
//           </TouchableOpacity>
//         )}
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//     paddingHorizontal: 24,
//   },
//   headerSection: {
//     alignItems: 'center',
//     marginTop: 60,
//     marginBottom: 40,
//   },
//   logoPlaceholder: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   logoIcon: {
//     fontSize: 24,
//     marginRight: 8,
//     color: '#4A90E2',
//   },
//   logoText: {
//     fontSize: 26,
//     fontWeight: '700',
//     color: '#4A90E2',
//     letterSpacing: 0.5,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: 8,
//   },
//   subtitle: {
//     fontSize: 14,
//     color: '#888',
//     textAlign: 'center',
//   },
//   otpContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 30,
//   },
//   otpInput: {
//     width: 48,
//     height: 56,
//     borderRadius: 10,
//     borderWidth: 1,
//     textAlign: 'center',
//     fontSize: 22,
//     fontWeight: 'bold',
//     backgroundColor: '#F3F7FF', // Matches the subtle tint in your screenshot
//   },
//   inactiveInput: {
//     borderColor: '#E2E8F0',
//   },
//   activeInput: {
//     borderColor: '#4A90E2',
//     borderWidth: 2,
//   },
//   verifyButton: {
//     backgroundColor: '#4A90E2',
//     paddingVertical: 16,
//     borderRadius: 10,
//     alignItems: 'center',
//     shadowColor: '#4A90E2',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 8,
//     elevation: 3,
//   },
//   buttonText: {
//     color: '#FFF',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   footer: {
//     marginTop: 25,
//     alignItems: 'center',
//   },
//   timerText: {
//     color: '#888',
//     fontSize: 14,
//   },
//   boldTime: {
//     color: '#4A90E2',
//     fontWeight: '700',
//   },
//   resendText: {
//     color: '#666',
//     fontSize: 14,
//   },
//   resendLink: {
//     color: '#4A90E2',
//     fontWeight: '700',
//   },
// });

// export default OTPScreen;

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import OTPInput from '../../components/auth/OTPInput';

export default function OTPScreen() {
  const router = useRouter();
  const { phoneNumber, verificationId } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);

  const handleOTPSubmit = async (otp) => {
    setLoading(true);
    
    try {
      const BASE_URL = 'https://usually-imposturous-sharri.ngrok-free.dev/api';
      const response = await fetch(`${BASE_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
        body: JSON.stringify({ 
          phoneNumber, 
          otp, 
          verificationId 
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        Alert.alert('Success', 'OTP verified successfully!', [
          {
            text: 'OK',
            onPress: () => router.replace('/(vetician_tabs)')
          }
        ]);
      } else {
        Alert.alert('Error', data.message || 'Invalid OTP');
      }
    } catch (error) {
      console.log('Error verifying OTP:', error);
      Alert.alert('Error', 'Network error. Please try again.');
    }
    
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <Text style={styles.subtitle}>
        We've sent a code to {phoneNumber}
      </Text>
      
      <OTPInput onComplete={handleOTPSubmit} />
      
      <TouchableOpacity 
        style={styles.resendButton}
        onPress={() => router.back()}
      >
        <Text style={styles.resendText}>Change Number</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  resendButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  resendText: {
    color: '#4A90E2',
    fontSize: 16,
  },
});
