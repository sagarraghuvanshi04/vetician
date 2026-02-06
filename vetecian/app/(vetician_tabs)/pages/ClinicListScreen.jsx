// import React, { useState } from 'react';
// import {
//   View, Text, StyleSheet, ScrollView, TouchableOpacity,
//   TextInput, FlatList, Image, Dimensions, SafeAreaView
// } from 'react-native';
// import { MaterialIcons, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
// import { router } from 'expo-router';
// import { ChevronLeft } from 'lucide-react-native';

// const { width } = Dimensions.get('window');

// // --- MOCK DATA ---
// const MOCK_CLINICS = [
//   {
//     clinicDetails: {
//       _id: '1',
//       clinicName: 'Happy Paws Vet Care',
//       city: 'Bangalore',
//       locality: 'Indiranagar',
//       establishmentType: 'Multi-speciality Clinic',
//       fees: '450',
//       verified: true,
//     },
//     veterinarianDetails: {
//       name: 'Rahul Sharma',
//       experience: '12',
//       gender: 'Male',
//       specialization: 'Surgeon',
//       profilePhotoUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200&h=200&auto=format&fit=crop',
//     }
//   },
//   {
//     clinicDetails: {
//       _id: '2',
//       clinicName: 'Pet Wellness Center',
//       city: 'Bangalore',
//       locality: 'Koramangala',
//       establishmentType: 'Pet Hospital',
//       fees: '600',
//       verified: true,
//     },
//     veterinarianDetails: {
//       name: 'Aditi Rao',
//       experience: '8',
//       gender: 'Female',
//       specialization: 'Dermatologist',
//       profilePhotoUrl: 'https://images.unsplash.com/photo-1559839734-2b71f1536783?q=80&w=200&h=200&auto=format&fit=crop',
//     }
//   },
//   {
//     clinicDetails: {
//       _id: '1',
//       clinicName: 'Happy Paws Vet Care',
//       city: 'Bangalore',
//       locality: 'Indiranagar',
//       establishmentType: 'Multi-speciality Clinic',
//       fees: '450',
//       verified: true,
//     },
//     veterinarianDetails: {
//       name: 'Rahul Sharma',
//       experience: '12',
//       gender: 'Male',
//       specialization: 'Surgeon',
//       profilePhotoUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200&h=200&auto=format&fit=crop',
//     }
//   }
// ];

// const ClinicCard = ({ clinic, onPress }) => {
//   const { clinicDetails, veterinarianDetails: vet } = clinic;
//   return (
//     <TouchableOpacity style={styles.card} onPress={onPress}>
//       <View style={styles.cardTopSection}>
//         <Image source={{ uri: vet?.profilePhotoUrl }} style={styles.profileImage} />
//         <View style={styles.mainInfo}>
//           <Text style={styles.drName}>Dr. {vet.name}</Text>
//           <Text style={styles.specializationText}>Pet {vet.specialization}</Text>
//           <Text style={styles.expText}>{vet.experience} years experience overall</Text>
          
//           <View style={styles.locationRow}>
//             <Text style={styles.boldText}>{clinicDetails.locality}, {clinicDetails.city}</Text>
//             <Text style={styles.dot}> • </Text>
//             <Text style={styles.clinicNameText}>{clinicDetails.clinicName}</Text>
//           </View>
          
//           <Text style={styles.feeText}>₹{clinicDetails.fees} Consultation fee at clinic</Text>
          
//           <View style={styles.ratingRow}>
//             <View style={styles.thumbBadge}>
//               <MaterialIcons name="thumb-up" size={12} color="white" />
//               <Text style={styles.thumbText}>98%</Text>
//             </View>
//             <Text style={styles.storiesText}>45 Patient Stories</Text>
//           </View>
//         </View>
//       </View>

//       <View style={styles.cardBottom}>
//         <View style={styles.availability}>
//           <MaterialCommunityIcons name="calendar-check" size={16} color="#10B981" />
//           <Text style={styles.availText}>Available Today</Text>
//         </View>
//         <TouchableOpacity style={styles.bookBtn} onPress={onPress}>
//           <Text style={styles.bookBtnText}>Book Clinic Visit</Text>
//         </TouchableOpacity>
        
//       </View>
//     </TouchableOpacity>
//   );
// };

// export default function ClinicListScreen() {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [location, setLocation] = useState('Bangalore');

//   const filteredData = MOCK_CLINICS.filter(item => 
//     item.clinicDetails.clinicName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     item.veterinarianDetails.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Practo Style Dual Search Bar */}
//       <View style={styles.searchHeader}>
//         <View style={styles.searchBox}>
//           <View style={styles.locationInput}>
//             <Ionicons name="location-outline" size={18} color="#7D7D7D" />
//             <TextInput 
//               style={styles.input} 
//               value={location} 
//               onChangeText={setLocation}
//               placeholder="Location"
//             />
//           </View>
//           <View style={styles.divider} />
//           <View style={styles.serviceInput}>
//             <Ionicons name="search-outline" size={18} color="#7D7D7D" />
//             <TextInput 
//               style={styles.input} 
//               placeholder="Search Vets, Clinics..." 
//               value={searchQuery}
//               onChangeText={setSearchQuery}
//             />
//           </View>
//         </View>
//       </View>

//       {/* Filter Chips */}
//       <View style={styles.filterWrapper}>
//         <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterContainer}>
//           <FilterChip label="Gender" icon="chevron-down" />
//           <FilterChip label="Patient Stories" icon="chevron-down" />
//           <FilterChip label="Experience" icon="chevron-down" />
//           <FilterChip label="All Filters" icon="options-outline" isIconLeft />
//         </ScrollView>
//       </View>

//       <View style={styles.resultsCountBar}>
//         <Text style={styles.resultsCount}>{filteredData.length} Vets available in {location}</Text>
//         <View style={styles.verifiedInfo}>
//           <MaterialIcons name="check-circle" size={14} color="#555" />
//           <Text style={styles.verifiedInfoText}>Verified details</Text>
//         </View>
//       </View>

//       <FlatList
//         data={filteredData}
//         renderItem={({ item }) => (
//           <ClinicCard 
//             clinic={item} 
//             onPress={() => router.push({
//               pathname: '/pages/ClinicDetailScreen',
//               params: { clinic: JSON.stringify(item) }
//             })} 
//           />
//         )}
//         keyExtractor={(item) => item.clinicDetails._id}
//         contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
//       />
//     </SafeAreaView>
//   );
// }

// const FilterChip = ({ label, icon, isIconLeft }) => (
//   <TouchableOpacity style={styles.chip}>
//     {isIconLeft && <Ionicons name={icon} size={14} color="#555" style={{marginRight: 4}} />}
//     <Text style={styles.chipText}>{label}</Text>
//     {!isIconLeft && <Ionicons name={icon} size={14} color="#555" style={{marginLeft: 4}} />}
//   </TouchableOpacity>
// );

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#f0f0f5' },
  
//   // Search Bar Header
//   searchHeader: { backgroundColor: '#28328c', padding: 12, paddingTop: 40 },
//   searchBox: { 
//     flexDirection: 'row', backgroundColor: 'white', borderRadius: 6, height: 45, alignItems: 'center' 
//   },
//   locationInput: { flex: 1, flexDirection: 'row', alignItems: 'center', paddingLeft: 10 },
//   serviceInput: { flex: 2, flexDirection: 'row', alignItems: 'center', paddingLeft: 10 },
//   divider: { width: 1, height: '60%', backgroundColor: '#ddd' },
//   input: { flex: 1, marginLeft: 5, fontSize: 14, color: '#333' },

//   // Filters
//   filterWrapper: { backgroundColor: '#28328c', paddingBottom: 10 },
//   filterContainer: { paddingHorizontal: 12, gap: 8 },
//   chip: { 
//     flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.2)', 
//     paddingHorizontal: 12, paddingVertical: 6, borderRadius: 4, borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)' 
//   },
//   chipText: { color: 'white', fontSize: 12 },

//   resultsCountBar: { padding: 15 },
//   resultsCount: { fontSize: 16, fontWeight: 'bold', color: '#333' },
//   verifiedInfo: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
//   verifiedInfoText: { fontSize: 12, color: '#666', marginLeft: 4 },

//   // Professional Card Style
//   card: { backgroundColor: 'white', marginBottom: 12, borderRadius: 4, overflow: 'hidden', elevation: 2 },
//   cardTopSection: { flexDirection: 'row', padding: 15 },
//   profileImage: { width: 80, height: 80, borderRadius: 40 },
//   mainInfo: { flex: 1, marginLeft: 15 },
//   drName: { fontSize: 18, fontWeight: 'bold', color: '#24A1DE' },
//   specializationText: { fontSize: 14, color: '#666', marginTop: 2 },
//   expText: { fontSize: 13, color: '#666' },
//   locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
//   boldText: { fontSize: 13, fontWeight: 'bold', color: '#444' },
//   clinicNameText: { fontSize: 13, color: '#24A1DE' },
//   dot: { color: '#ccc' },
//   feeText: { fontSize: 13, color: '#444', marginTop: 4 },
  
//   ratingRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
//   thumbBadge: { 
//     backgroundColor: '#10B981', flexDirection: 'row', alignItems: 'center', 
//     paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 
//   },
//   thumbText: { color: 'white', fontSize: 12, fontWeight: 'bold', marginLeft: 4 },
//   storiesText: { fontSize: 12, color: '#24A1DE', marginLeft: 10, fontWeight: '600', textDecorationLine: 'underline' },

//   cardBottom: { 
//     borderTopWidth: 1, borderTopColor: '#eee', padding: 12, 
//     flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' 
//   },
//   availability: { flexDirection: 'row', alignItems: 'center' },
//   availText: { color: '#10B981', fontSize: 13, fontWeight: '600', marginLeft: 5 },
//   bookBtn: { backgroundColor: '#24A1DE', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 4 },
//   bookBtnText: { color: 'white', fontWeight: 'bold', fontSize: 14 }
// });

import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, FlatList, Image, Dimensions, SafeAreaView, Linking
} from 'react-native';
import { MaterialIcons, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

// --- MOCK DATA ---
const MOCK_CLINICS = [
  {
    clinicDetails: {
      _id: '1',
      clinicName: 'Happy Paws Vet Care',
      city: 'Bangalore',
      locality: 'Indiranagar',
      establishmentType: 'Multi-speciality Clinic',
      fees: '450',
      verified: true,
      phoneNumber: '9876543210' // For Call feature
    },
    veterinarianDetails: {
      name: 'Rahul Sharma',
      experience: '12',
      gender: 'Male',
      specialization: 'Surgeon',
      profilePhotoUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200&h=200&auto=format&fit=crop',
    }
  },
  {
    clinicDetails: {
      _id: '2',
      clinicName: 'Pet Wellness Center',
      city: 'Bangalore',
      locality: 'Koramangala',
      establishmentType: 'Pet Hospital',
      fees: '600',
      verified: true,
      phoneNumber: '9876543211'
    },
    veterinarianDetails: {
      name: 'Aditi Rao',
      experience: '8',
      gender: 'Female',
      specialization: 'Dermatologist',
      profilePhotoUrl: 'https://images.unsplash.com/photo-1559839734-2b71f1536783?q=80&w=200&h=200&auto=format&fit=crop',
    }
  }
];

const ClinicCard = ({ clinic, onPress }) => {
  const { clinicDetails, veterinarianDetails: vet } = clinic;

  const handleCall = () => {
    Linking.openURL(`tel:${clinicDetails.phoneNumber}`);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.cardTopSection}>
        <Image source={{ uri: vet?.profilePhotoUrl }} style={styles.profileImage} />
        <View style={styles.mainInfo}>
          <Text style={styles.drName}>Dr. {vet.name}</Text>
          <Text style={styles.specializationText}>Pet {vet.specialization}</Text>
          <Text style={styles.expText}>{vet.experience} years experience overall</Text>
          
          <View style={styles.locationRow}>
            <Text style={styles.boldText}>{clinicDetails.locality}, {clinicDetails.city}</Text>
            <Text style={styles.dot}> • </Text>
            <Text style={styles.clinicNameText}>{clinicDetails.clinicName}</Text>
          </View>
          
          <Text style={styles.feeText}>₹{clinicDetails.fees} Consultation fee at clinic</Text>
          
          <View style={styles.ratingRow}>
            <View style={styles.thumbBadge}>
              <MaterialIcons name="thumb-up" size={12} color="white" />
              <Text style={styles.thumbText}>98%</Text>
            </View>
            <Text style={styles.storiesText}>45 Patient Stories</Text>
          </View>
        </View>
      </View>

      {/* --- Updated Button Section (As per your Screenshot) --- */}
      <View style={styles.buttonWrapper}>
        
        {/* Row 1: Book Clinic Visit (Primary Blue) */}
        <TouchableOpacity style={styles.bookClinicBtn} onPress={onPress}>
          <Text style={styles.bookClinicBtnText}>Book Clinic Visit</Text>
          <Text style={styles.noBookingFeeText}>No Booking Fee</Text>
        </TouchableOpacity>

        <View style={styles.secondaryButtonsRow}>
          {/* Row 2: Contact Clinic (Outline Style) */}
          <TouchableOpacity style={styles.contactBtn} onPress={handleCall}>
            <Ionicons name="call" size={18} color="#24A1DE" />
            <Text style={styles.contactBtnText}>Contact Clinic</Text>
          </TouchableOpacity>

          {/* Row 3: Video Call (Outline Style) */}
          <TouchableOpacity 
            style={styles.videoBtn} 
            onPress={() => router.push('/pages/VideoCall')}
          >
            <Ionicons name="videocam" size={18} color="#24A1DE" />
            <Text style={styles.contactBtnText}>Video Call</Text>
          </TouchableOpacity>
        </View>

      </View>
    </TouchableOpacity>
  );
};

export default function ClinicListScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('Bangalore');

  const filteredData = MOCK_CLINICS.filter(item => 
    item.clinicDetails.clinicName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.veterinarianDetails.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchHeader}>
        <View style={styles.searchBox}>
          <View style={styles.locationInput}>
            <Ionicons name="location-outline" size={18} color="#7D7D7D" />
            <TextInput 
              style={styles.input} 
              value={location} 
              onChangeText={setLocation}
              placeholder="Location"
            />
          </View>
          <View style={styles.divider} />
          <View style={styles.serviceInput}>
            <Ionicons name="search-outline" size={18} color="#7D7D7D" />
            <TextInput 
              style={styles.input} 
              placeholder="Search Vets, Clinics..." 
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>
      </View>

      <FlatList
        data={filteredData}
        renderItem={({ item }) => (
          <ClinicCard 
            clinic={item} 
            onPress={() => router.push({
              pathname: '/pages/ClinicDetailScreen',
              params: { clinic: JSON.stringify(item) }
            })} 
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 20 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f0f5' },
  searchHeader: { backgroundColor: '#28328c', padding: 12, paddingTop: 40 },
  searchBox: { flexDirection: 'row', backgroundColor: 'white', borderRadius: 6, height: 45, alignItems: 'center' },
  locationInput: { flex: 1, flexDirection: 'row', alignItems: 'center', paddingLeft: 10 },
  serviceInput: { flex: 2, flexDirection: 'row', alignItems: 'center', paddingLeft: 10 },
  divider: { width: 1, height: '60%', backgroundColor: '#ddd' },
  input: { flex: 1, marginLeft: 5, fontSize: 14, color: '#333' },

  card: { backgroundColor: 'white', marginBottom: 16, borderRadius: 8, elevation: 3, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4 },
  cardTopSection: { flexDirection: 'row', padding: 15 },
  profileImage: { width: 70, height: 70, borderRadius: 35 },
  mainInfo: { flex: 1, marginLeft: 15 },
  drName: { fontSize: 18, fontWeight: 'bold', color: '#24A1DE' },
  specializationText: { fontSize: 14, color: '#666' },
  expText: { fontSize: 13, color: '#666' },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  boldText: { fontSize: 13, fontWeight: 'bold', color: '#444' },
  clinicNameText: { fontSize: 13, color: '#24A1DE' },
  dot: { color: '#ccc' },
  feeText: { fontSize: 13, color: '#444', marginTop: 4 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  thumbBadge: { backgroundColor: '#10B981', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  thumbText: { color: 'white', fontSize: 12, fontWeight: 'bold', marginLeft: 4 },
  storiesText: { fontSize: 12, color: '#24A1DE', marginLeft: 10, fontWeight: '600' },

  // --- New Button Styles ---
  buttonWrapper: { padding: 15, borderTopWidth: 1, borderTopColor: '#eee' },
  
  bookClinicBtn: { 
    backgroundColor: '#24A1DE', 
    borderRadius: 6, 
    paddingVertical: 10, 
    alignItems: 'center',
    marginBottom: 10 
  },
  bookClinicBtnText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  noBookingFeeText: { color: 'white', fontSize: 12, opacity: 0.9 },

  secondaryButtonsRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 10 },
  
  contactBtn: { 
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1, 
    borderColor: '#ddd', 
    borderRadius: 6, 
    paddingVertical: 12, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  videoBtn: { 
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1, 
    borderColor: '#ddd', 
    borderRadius: 6, 
    paddingVertical: 12, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  contactBtnText: { color: '#24A1DE', fontSize: 15, fontWeight: 'bold', marginLeft: 8 }
});