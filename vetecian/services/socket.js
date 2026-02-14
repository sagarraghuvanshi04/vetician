import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:3000';

class SocketService {
  constructor() {
    this.socket = null;
  }

  connect(userId, userType) {
    if (this.socket?.connected) return;

    this.socket = io(SOCKET_URL, {
      transports: ['websocket'],
      reconnection: true
    });

    this.socket.on('connect', () => {
      console.log('✅ Socket connected');
      if (userType === 'paravet') {
        this.socket.emit('join-paravet', userId);
      } else {
        this.socket.emit('join-user', userId);
      }
    });

    this.socket.on('disconnect', () => {
      console.log('❌ Socket disconnected');
    });
  }

  onNewBooking(callback) {
    this.socket?.on('new-booking', callback);
  }

  onBookingUpdated(callback) {
    this.socket?.on('booking-updated', callback);
  }

  disconnect() {
    this.socket?.disconnect();
    this.socket = null;
  }
}

export default new SocketService();
