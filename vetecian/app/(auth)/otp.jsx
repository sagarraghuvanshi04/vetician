import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import OTPInput from '../../components/auth/OTPInput';

export default function OTPScreen() {
  const router = useRouter();
  const { phoneNumber, email, verificationId, otp: testOtp, otpMethod } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState('');

  const handleOTPSubmit = async () => {
    if (!enteredOtp || enteredOtp.length !== 6) {
      window.alert('Please enter 6-digit OTP');
      return;
    }
    
    setLoading(true);
    
    try {
      const BASE_URL = 'http://localhost:3000/api';
      console.log('🔵 Verifying OTP:', enteredOtp);
      console.log('🔵 Phone:', phoneNumber);
      console.log('🔵 Email:', email);
      console.log('🔵 Verification ID:', verificationId);
      
      const response = await fetch(`${BASE_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          phoneNumber: phoneNumber || undefined,
          email: email || undefined,
          otp: enteredOtp, 
          verificationId 
        }),
      });
      
      const contentType = response.headers.get('content-type');
      let data;
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        console.log('🔵 Non-JSON response:', text.substring(0, 200));
        data = { message: 'Server error. Please try again.' };
      }
      
      console.log('🔵 Verify response:', data);
      
      if (response.ok) {
        // Save token to localStorage (web)
        if (data.token) {
          localStorage.setItem('token', data.token);
          console.log('✅ Token saved to localStorage');
        }
        
        // Save user data to localStorage
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
          console.log('✅ User data saved:', data.user);
        }
        
        window.alert('OTP verified successfully!');
        
        // Route based on user role
        const userRole = data.user?.role || 'vetician';
        console.log('🔵 User role:', userRole);
        
        switch(userRole) {
          case 'veterinarian':
            router.replace('/(doc_tabs)');
            break;
          case 'pet_resort':
            router.replace('/(pet_resort_tabs)');
            break;
          case 'paravet':
            router.replace('/(peravet_tabs)/(tabs)');
            break;
          default:
            router.replace('/(vetician_tabs)');
        }
      } else {
        window.alert(data.message || 'Invalid OTP');
      }
    } catch (error) {
      console.log('Error verifying OTP:', error);
      window.alert('Network error. Please try again.');
    }
    
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <Text style={styles.subtitle}>
        We've sent a code to {otpMethod === 'email' ? email : phoneNumber}
      </Text>
      
      {testOtp && (
        <View style={styles.otpDisplay}>
          <Text style={styles.otpLabel}>Test OTP: </Text>
          <Text style={styles.otpValue}>{testOtp}</Text>
        </View>
      )}
      
      <OTPInput onComplete={(otp) => setEnteredOtp(otp)} />
      
      <TouchableOpacity 
        style={[styles.verifyButton, loading && styles.buttonDisabled]}
        onPress={handleOTPSubmit}
        disabled={loading}
      >
        <Text style={styles.verifyButtonText}>
          {loading ? 'Verifying...' : 'Verify OTP'}
        </Text>
      </TouchableOpacity>
      
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
  otpDisplay: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  otpLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  otpValue: {
    fontSize: 16,
    color: '#4A90E2',
    fontWeight: 'bold',
  },
  verifyButton: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: '#a0a0a0',
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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
