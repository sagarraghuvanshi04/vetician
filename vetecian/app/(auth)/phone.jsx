import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function PhoneScreen() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [otpMethod, setOtpMethod] = useState('phone');
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async () => {
    if (otpMethod === 'phone' && !phoneNumber.trim()) {
      window.alert('Please enter a phone number');
      return;
    }
    if (otpMethod === 'email' && !email.trim()) {
      window.alert('Please enter an email');
      return;
    }

    const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`;
    setLoading(true);
    
    try {
      const BASE_URL = 'http://localhost:3000/api';
      console.log('🔵 API URL:', BASE_URL);
      console.log('🔵 OTP Method:', otpMethod);
      console.log('🔵 Sending OTP to:', otpMethod === 'phone' ? formattedPhone : email);
      
      const requestBody = otpMethod === 'phone' 
        ? { phoneNumber: formattedPhone }
        : { email: email.trim() };
      
      const response = await fetch(`${BASE_URL}/auth/send-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      
      console.log('🔵 Response status:', response.status);
      console.log('🔵 Response ok:', response.ok);
      
      const contentType = response.headers.get('content-type');
      let data;
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        console.log('🔵 Non-JSON response:', text.substring(0, 200));
        data = { message: 'Server error. Please try again.' };
      }
      
      console.log('🔵 Response data:', data);
      console.log('🔵 Is 404?', response.status === 404);
      console.log('🔵 Alert should show:', !response.ok && response.status === 404);
      
      if (response.ok) {
        setLoading(false);
        router.push({
          pathname: '/(auth)/otp',
          params: { 
            phoneNumber: otpMethod === 'phone' ? formattedPhone : '',
            email: otpMethod === 'email' ? email.trim() : '',
            verificationId: data.verificationId,
            otp: data.otp,
            otpMethod: otpMethod
          }
        });
      } else {
        setLoading(false);
        if (response.status === 404) {
          const message = 'No account exists with this ' + (otpMethod === 'phone' ? 'phone number' : 'email') + '. Please sign up first.';
          
          if (window.confirm(message + '\n\nWould you like to sign up now?')) {
            router.push('/(auth)/signup');
          }
        } else {
          window.alert(data.message || 'Failed to send OTP');
        }
      }
    } catch (error) {
      setLoading(false);
      console.log('Error sending OTP:', error);
      window.alert('Network error. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login with OTP</Text>
      
      <View style={styles.methodSelector}>
        <TouchableOpacity 
          style={[styles.methodButton, otpMethod === 'phone' && styles.methodButtonActive]}
          onPress={() => setOtpMethod('phone')}
        >
          <Text style={[styles.methodText, otpMethod === 'phone' && styles.methodTextActive]}>
            Phone
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.methodButton, otpMethod === 'email' && styles.methodButtonActive]}
          onPress={() => setOtpMethod('email')}
        >
          <Text style={[styles.methodText, otpMethod === 'email' && styles.methodTextActive]}>
            Email
          </Text>
        </TouchableOpacity>
      </View>
      
      {otpMethod === 'phone' ? (
        <TextInput
          style={styles.input}
          placeholder="Enter 10-digit mobile number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          maxLength={10}
        />
      ) : (
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      )}
      
      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]} 
        onPress={handleSendOTP}
        disabled={loading}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Sending...' : 'Send OTP'}
        </Text>
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
    marginBottom: 30,
  },
  methodSelector: {
    flexDirection: 'row',
    marginBottom: 20,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  methodButton: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  methodButtonActive: {
    backgroundColor: '#4A90E2',
  },
  methodText: {
    fontSize: 16,
    color: '#666',
  },
  methodTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#a0a0a0',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
