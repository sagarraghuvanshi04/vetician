import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import SocketService from '../../../services/socket';
import ApiService from '../../../services/api';

export default function Notifications() {
  const navigation = useNavigation();
  const { user } = useSelector(state => state.auth);
  const [notifications, setNotifications] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchNotifications();
    SocketService.connect(user._id, 'user');
    
    SocketService.onBookingUpdated((updatedBooking) => {
      const newNotification = {
        _id: Date.now().toString(),
        type: 'booking_update',
        title: 'Booking Updated',
        message: `Your ${updatedBooking.serviceType} booking is now ${updatedBooking.status}`,
        status: updatedBooking.status,
        timestamp: new Date(),
        read: false
      };
      setNotifications(prev => [newNotification, ...prev]);
    });

    return () => SocketService.disconnect();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await ApiService.getDoorstepBookings();
      const bookingNotifications = (response.data || []).map(booking => ({
        _id: booking._id,
        type: 'booking',
        title: booking.serviceType,
        message: `Booking ${booking.status}`,
        status: booking.status,
        timestamp: booking.createdAt,
        read: true
      }));
      setNotifications(bookingNotifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchNotifications();
    setRefreshing(false);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return 'check-circle';
      case 'pending': return 'schedule';
      case 'in-progress': return 'autorenew';
      case 'completed': return 'done-all';
      case 'cancelled': return 'cancel';
      default: return 'notifications';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return '#4CAF50';
      case 'pending': return '#FFA726';
      case 'in-progress': return '#2196F3';
      case 'completed': return '#9E9E9E';
      case 'cancelled': return '#F44336';
      default: return '#666';
    }
  };

  const renderNotification = ({ item }) => (
    <TouchableOpacity style={[styles.notificationCard, !item.read && styles.unreadCard]}>
      <View style={[styles.iconContainer, { backgroundColor: getStatusColor(item.status) + '20' }]}>
        <MaterialIcons name={getStatusIcon(item.status)} size={24} color={getStatusColor(item.status)} />
      </View>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationMessage}>{item.message}</Text>
        <Text style={styles.notificationTime}>
          {new Date(item.timestamp).toLocaleString()}
        </Text>
      </View>
      {!item.read && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={{ width: 24 }} />
      </View>

      {notifications.length === 0 ? (
        <View style={styles.emptyState}>
          <MaterialIcons name="notifications-none" size={64} color="#ccc" />
          <Text style={styles.emptyText}>No notifications yet</Text>
        </View>
      ) : (
        <FlatList
          data={notifications}
          renderItem={renderNotification}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContainer}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F6F7FB' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginTop: 40,
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  listContainer: { padding: 16 },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  unreadCard: { backgroundColor: '#E3F2FD' },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  notificationContent: { flex: 1 },
  notificationTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 4 },
  notificationMessage: { fontSize: 14, color: '#666', marginBottom: 4 },
  notificationTime: { fontSize: 12, color: '#999' },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2196F3',
    marginLeft: 8,
  },
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 16, color: '#999', marginTop: 16 },
});
