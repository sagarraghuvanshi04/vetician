import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Image, SafeAreaView, Dimensions, Alert
} from 'react-native';
import { MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const ParavetModule = () => {
  const [selectedService, setSelectedService] = useState('1');

  const services = [
    { id: '1', title: 'Vaccination', price: '₹499', icon: 'syringe' },
    { id: '2', title: 'Wound Dressing', price: '₹299', icon: 'band-aid' },
    { id: '3', title: 'Sample Collection', price: '₹199', icon: 'vial' },
    { id: '4', title: 'Deworming', price: '₹249', icon: 'pills' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* --- Header Section (Practo Style) --- */}
        <View style={styles.heroSection}>
          <View style={styles.heroText}>
            <Text style={styles.heroTitle}>Paravet at Doorstep</Text>
            <Text style={styles.heroSub}>Expert technicians for your pet's routine care at home.</Text>
            <View style={styles.badge}>
              <MaterialIcons name="security" size={14} color="#24A1DE" />
              <Text style={styles.badgeText}>Safe & Sanitized Visit</Text>
            </View>
          </View>
          <Image 
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3047/3047928.png' }} 
            style={styles.heroImg} 
          />
        </View>

        {/* --- Service Selection Grid --- */}
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Select Service</Text>
          <View style={styles.grid}>
            {services.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                style={[styles.serviceCard, selectedService === item.id && styles.activeCard]}
                onPress={() => setSelectedService(item.id)}
              >
                <FontAwesome5 
                  name={item.icon} 
                  size={24} 
                  color={selectedService === item.id ? '#fff' : '#24A1DE'} 
                />
                <Text style={[styles.serviceTitle, selectedService === item.id && {color: '#fff'}]}>
                  {item.title}
                </Text>
                <Text style={[styles.servicePrice, selectedService === item.id && {color: '#e0e0e0'}]}>
                  Starts {item.price}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* --- How it Works (Logic) --- */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionHeading}>How it works</Text>
          <View style={styles.stepRow}>
            <View style={styles.stepNum}><Text style={styles.stepNumText}>1</Text></View>
            <Text style={styles.stepText}>Select a service and preferred time slot.</Text>
          </View>
          <View style={styles.stepRow}>
            <View style={styles.stepNum}><Text style={styles.stepNumText}>2</Text></View>
            <Text style={styles.stepText}>Verified Paravet reaches your home address.</Text>
          </View>
          <View style={styles.stepRow}>
            <View style={styles.stepNum}><Text style={styles.stepNumText}>3</Text></View>
            <Text style={styles.stepText}>Pay after the service is completed.</Text>
          </View>
        </View>

      </ScrollView>

      {/* --- Footer Button (As requested in your logic) --- */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.mainBtn} 
          onPress={() => Alert.alert("Booking Confirmed", "A Paravet will be assigned shortly.")}
        >
          <Text style={styles.mainBtnText}>Book Home Visit Now</Text>
          <Text style={styles.subBtnText}>Convenience Guaranteed</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  heroSection: { backgroundColor: '#E3F2FD', padding: 25, flexDirection: 'row', alignItems: 'center' },
  heroText: { flex: 1 },
  heroTitle: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  heroSub: { fontSize: 14, color: '#666', marginTop: 5 },
  badge: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  badgeText: { fontSize: 12, color: '#24A1DE', fontWeight: 'bold', marginLeft: 5 },
  heroImg: { width: 80, height: 80, opacity: 0.8 },
  
  section: { padding: 20 },
  sectionHeading: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#444' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  serviceCard: { 
    width: '48%', backgroundColor: '#fff', padding: 20, borderRadius: 10, 
    alignItems: 'center', marginBottom: 15, borderWidth: 1, borderColor: '#eee' 
  },
  activeCard: { backgroundColor: '#24A1DE', borderColor: '#24A1DE' },
  serviceTitle: { fontWeight: 'bold', marginTop: 10, fontSize: 14 },
  servicePrice: { color: '#888', fontSize: 12, marginTop: 4 },

  infoSection: { padding: 20, backgroundColor: '#fff', marginHorizontal: 20, borderRadius: 10 },
  stepRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  stepNum: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#eee', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  stepNumText: { fontSize: 12, fontWeight: 'bold' },
  stepText: { fontSize: 14, color: '#666', flex: 1 },

  footer: { padding: 15, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#eee' },
  mainBtn: { backgroundColor: '#24A1DE', paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  mainBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  subBtnText: { color: '#fff', fontSize: 12, opacity: 0.8 }
});

export default ParavetModule;