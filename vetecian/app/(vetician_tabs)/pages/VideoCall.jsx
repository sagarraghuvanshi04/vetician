import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

// Mock Data - Screenshots ke hisab se
const SPECIALITIES = [
  { id: '1', title: 'General Vet', price: '₹399', icon: '🩺' },
  { id: '2', title: 'Skin & Coat', price: '₹449', icon: '🐕' },
  { id: '3', title: 'Behavior', price: '₹499', icon: '🧠' },
  { id: '4', title: 'Digestion', price: '₹399', icon: '🦴' },
];

const DOCTORS = [
  {
    id: '1',
    name: 'Dr. Prateeksha B S',
    role: 'Senior Vet, Surgeon',
    exp: '7 years experience',
    consults: '13337 consults done',
    img: 'https://via.placeholder.com/100',
  },
  {
    id: '2',
    name: 'Dr. Anshuman Gupta',
    role: 'Pet Cardiologist',
    exp: '11 years experience',
    consults: '13587 consults done',
    img: 'https://via.placeholder.com/100',
  },
];

const VideoConsultTab = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* SECTION 1: HERO BANNER (Screenshot 1) */}
      <View style={styles.heroSection}>
        <View style={styles.heroTextContent}>
          <Text style={styles.heroTitle}>Skip the travel!</Text>
          <Text style={styles.heroSubTitle}>Take Online Vet Consultation</Text>
          <Text style={styles.heroTagline}>Private consultation + Video call • Starts at just ₹199</Text>
          
          <View style={styles.onlineStatus}>
             <Text style={styles.onlineText}>🟢 +126 Vets are online</Text>
          </View>

          <TouchableOpacity style={styles.consultNowBtn}>
            <Text style={styles.consultNowText}>Consult Now</Text>
          </TouchableOpacity>
        </View>
        <Image 
          source={{uri: 'https://img.freepik.com/free-photo/happy-woman-holding-her-dog-home_23-2149129707.jpg'}} 
          style={styles.heroImage} 
        />
      </View>

      {/* SECTION 2: SPECIALITIES (Screenshot 2) */}
      <View style={styles.whiteSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>25+ Specialities</Text>
          <TouchableOpacity><Text style={styles.seeAll}>See all Specialities</Text></TouchableOpacity>
        </View>
        <FlatList
          horizontal
          data={SPECIALITIES}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.specCard}>
              <View style={styles.iconCircle}><Text style={{fontSize: 30}}>{item.icon}</Text></View>
              <Text style={styles.specName}>{item.title}</Text>
              <Text style={styles.specPrice}>{item.price}</Text>
              <TouchableOpacity><Text style={styles.consultLink}>Consult now ›</Text></TouchableOpacity>
            </View>
          )}
        />
      </View>

      {/* SECTION 3: OFFERS (Screenshot 3) */}
      <View style={styles.offerContainer}>
        <View style={[styles.offerCard, {backgroundColor: '#E0F2F1'}]}>
          <Text style={styles.offerTag}>OFFER</Text>
          <Text style={styles.offerText}>Download App & get ₹200 HealthCash</Text>
        </View>
        <View style={[styles.offerCard, {backgroundColor: '#FFF3E0'}]}>
          <Text style={styles.offerTag}>OFFER</Text>
          <Text style={styles.offerText}>Consult with specialists at just ₹199</Text>
        </View>
      </View>

      {/* SECTION 4: OUR DOCTORS (Screenshot 3 bottom) */}
      <View style={styles.whiteSection}>
        <Text style={styles.sectionTitle}>Our Vets</Text>
        {DOCTORS.map((doc) => (
          <View key={doc.id} style={styles.docCard}>
            <Image source={{uri: doc.img}} style={styles.docImg} />
            <View style={styles.docInfo}>
              <Text style={styles.docName}>{doc.name}</Text>
              <Text style={styles.docSub}>{doc.role}</Text>
              <Text style={styles.docSub}>{doc.exp}</Text>
              <Text style={styles.docConsults}>{doc.consults}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* SECTION 5: STATS (Screenshot 4) */}
      <View style={styles.statsBar}>
        <View style={styles.statItem}><Text style={styles.statNum}>20,000+</Text><Text style={styles.statLab}>Verified Vets</Text></View>
        <View style={styles.statItem}><Text style={styles.statNum}>4.5 / 5</Text><Text style={styles.statLab}>App Rating</Text></View>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f0f0' },
  // Hero Styles
  heroSection: { backgroundColor: '#FDECE9', padding: 20, flexDirection: 'row', minHeight: 250 },
  heroTextContent: { flex: 1, zIndex: 1 },
  heroTitle: { fontSize: 18, color: '#444' },
  heroSubTitle: { fontSize: 22, fontWeight: 'bold', marginVertical: 5 },
  heroTagline: { fontSize: 13, color: '#666', marginBottom: 15 },
  consultNowBtn: { backgroundColor: '#2D9CDB', paddingVertical: 12, paddingHorizontal: 25, borderRadius: 5, alignSelf: 'flex-start' },
  consultNowText: { color: '#fff', fontWeight: 'bold' },
  heroImage: { width: 150, height: 200, position: 'absolute', right: 0, bottom: 0, opacity: 0.8 },
  onlineText: { fontSize: 12, marginBottom: 10, color: '#444' },
  // Section Styles
  whiteSection: { backgroundColor: '#fff', padding: 20, marginBottom: 10 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold' },
  seeAll: { color: '#2D9CDB', fontSize: 13 },
  // Speciality Card
  specCard: { width: 130, alignItems: 'center', padding: 15, borderHorizontalWidth: 1, borderColor: '#eee' },
  iconCircle: { width: 70, height: 70, borderRadius: 35, backgroundColor: '#f9f9f9', justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  specName: { fontWeight: 'bold', fontSize: 14 },
  specPrice: { color: '#777', marginVertical: 5 },
  consultLink: { color: '#2D9CDB', fontWeight: 'bold' },
  // Offer Cards
  offerContainer: { flexDirection: 'row', padding: 10, justifyContent: 'space-between' },
  offerCard: { width: '48%', padding: 15, borderRadius: 8 },
  offerTag: { backgroundColor: '#fff', alignSelf: 'flex-start', paddingHorizontal: 5, fontSize: 10, fontWeight: 'bold', marginBottom: 5 },
  offerText: { fontSize: 12, fontWeight: 'bold' },
  // Doctor Card
  docCard: { flexDirection: 'row', padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee' },
  docImg: { width: 60, height: 60, borderRadius: 30 },
  docInfo: { marginLeft: 15 },
  docName: { fontWeight: 'bold', fontSize: 16 },
  docSub: { color: '#666', fontSize: 12 },
  docConsults: { color: '#888', fontSize: 11, marginTop: 4 },
  // Stats
  statsBar: { backgroundColor: '#2C2D33', padding: 20, flexDirection: 'row', justifyContent: 'space-around' },
  statNum: { color: '#fff', fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  statLab: { color: '#aaa', fontSize: 12, textAlign: 'center' }
});

export default VideoConsultTab;