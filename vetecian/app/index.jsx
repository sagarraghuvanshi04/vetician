import { Redirect } from 'expo-router';
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';

export default function Index() {
  const { isAuthenticated, token, role } = useSelector(
    (state) => state.auth
  );

  // Optional loading UI (while redux-persist rehydrates)
  if (isAuthenticated === undefined) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Initializing...</Text>
      </View>
    );
  }

  // ✅ Authenticated user
  if (isAuthenticated && token) {
    // 🔁 Role-based routing (change if needed)
    switch (role) {
      case 'doctor':
        return <Redirect href="/(doc_tabs)/(tabs)" />;

      case 'peravet':
        return <Redirect href="/(peravet_tabs)/(tabs)" />;

      case 'pet_resort':
        return <Redirect href="/(pet_resort_tabs)/(tabs)" />;

      default:
        // fallback (safe)
        return <Redirect href="/(doc_tabs)/(tabs)" />;
    }
  }

  // ❌ Not authenticated → Auth screens
  return <Redirect href="/(auth)/signin" />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  text: {
    fontSize: 18,
    color: '#666',
    fontWeight: '500',
  },
});
