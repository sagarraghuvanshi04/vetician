import * as SecureStore from 'expo-secure-store';

// ✅ EXPO SAFE ENV
const API_BASE_URL = 'http://localhost:3000/api';

console.log('API_BASE_URL:', API_BASE_URL);

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // ✅ Get token from SecureStore or localStorage
  async getToken() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return localStorage.getItem('token');
      }
      return await SecureStore.getItemAsync('token');
    } catch {
      return null;
    }
  }

  // ✅ Generic request
  async request(endpoint, options = {}) {
    const token = await this.getToken();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, config);
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('❌ API Error:', error.message);
      throw error;
    }
  }

  // ✅ AXIOS-LIKE HELPERS
  get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  post(endpoint, body = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  patch(endpoint, body = {}) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });
  }

  delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }

  /* =========================
     AUTH
  ========================= */

  login(email, password) {
    return this.post('/auth/login', { email, password });
  }

  logout() {
    return SecureStore.deleteItemAsync('token');
  }

  /* =========================
     USER
  ========================= */

  getProfile() {
    return this.get('/users/profile');
  }

  updateProfile(data) {
    return this.patch('/users/profile', data);
  }

  changePassword(currentPassword, newPassword) {
    return this.patch('/users/change-password', { currentPassword, newPassword });
  }

  deleteAccount() {
    return this.delete('/users/account');
  }

  getDashboardStats() {
    return this.get('/users/dashboard-stats');
  }

  /* =========================
     PETS
  ========================= */

  createPet(data) {
    return this.post('/parents/pets', data);
  }

  getPets() {
    return this.get('/pets');
  }

  getPetsByUserId(userId) {
    return this.get(`/parents/pets/${userId}`);
  }

  /* =========================
     APPOINTMENTS
  ========================= */

  getAppointments(filters = {}) {
    return this.post('/appointments', filters); // Adjust endpoint if needed
  }

  createAppointment(data) {
    return this.post('/appointments/create', data); // Adjust endpoint if needed
  }

  /* =========================
     PATIENTS
  ========================= */

  getPatients(filters = {}) {
    return this.post('/patients', filters); // Adjust endpoint
  }

  createPatient(data) {
    return this.post('/patients/create', data);
  }

  /* =========================
     VETERINARIAN / CLINIC / PET RESORT
     (Existing functions kept)
  ========================= */

  getVerifiedVeterinarians(filters = {}) {
    return this.post('/admin/verified', filters);
  }

  getUnverifiedVeterinarians() {
    return this.post('/admin/unverified');
  }

  verifyVeterinarianField(veterinarianId, fieldName) {
    return this.patch(`/verify/${veterinarianId}/${fieldName}`);
  }

  getVerifiedClinics(filters = {}) {
    return this.post('/admin/verified/clinic', filters);
  }

  getUnverifiedClinics() {
    return this.post('/admin/unverified/clinic');
  }

  verifyClinic(clinicId) {
    return this.post(`/admin/clinic/verify/${clinicId}`);
  }

  getVerifiedPetResorts(filters = {}) {
    return this.post('/admin/verified/petresort', filters);
  }

  getUnverifiedPetResorts() {
    return this.post('/admin/unverified/petresort');
  }

  verifyPetResort(resortId) {
    return this.post(`/admin/petresort/verify/${resortId}`);
  }

  unverifyPetResort(resortId) {
    return this.post(`/admin/petresort/unverify/${resortId}`);
  }
}

export default new ApiService();
