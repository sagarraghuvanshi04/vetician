import { Slot, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../store/store';
import { View, Text, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';

function LoadingScreen() {
  return (
    <View style={styles.loadingContainer}>
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
}

function AuthGuard({ children }) {
  const router = useRouter();
  const segments = useSegments();
  const [isNavigationReady, setIsNavigationReady] = useState(false);

  useEffect(() => {
    // Wait for router to be ready
    const timer = setTimeout(() => {
      setIsNavigationReady(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isNavigationReady) return;

    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const inAuthGroup = segments[0] === '(auth)';

    if (!token && !inAuthGroup) {
      router.replace('/(auth)/signin');
    } else if (token && inAuthGroup) {
      const userData = JSON.parse(user || '{}');
      const role = userData.role || 'vetician';
      
      switch(role) {
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
    }
  }, [isNavigationReady, segments]);

  return children;
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>
        <AuthGuard>
          <Slot />
          <StatusBar style="auto" />
        </AuthGuard>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
    fontWeight: '500',
  },
});
