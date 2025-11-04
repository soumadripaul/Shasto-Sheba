const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

class ApiService {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Health Tips
  async getHealthTips(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/api/health-tips${queryString ? `?${queryString}` : ''}`);
  }

  async getHealthTip(id) {
    return this.request(`/api/health-tips/${id}`);
  }

  async createHealthTip(data) {
    return this.request('/api/health-tips', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Health Centers
  async getHealthCenters(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/api/health-centers${queryString ? `?${queryString}` : ''}`);
  }

  async getHealthCenter(id) {
    return this.request(`/api/health-centers/${id}`);
  }

  async getNearbyHealthCenters(lat, lng, distance) {
    return this.request(`/api/health-centers/nearby/${lat}/${lng}${distance ? `?distance=${distance}` : ''}`);
  }

  // Events
  async getEvents(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/api/events${queryString ? `?${queryString}` : ''}`);
  }

  async getEvent(id) {
    return this.request(`/api/events/${id}`);
  }

  async createEvent(data) {
    return this.request('/api/events', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Workers
  async getWorkers(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/api/workers${queryString ? `?${queryString}` : ''}`);
  }

  async getWorker(id) {
    return this.request(`/api/workers/${id}`);
  }

  // Help Requests
  async getHelpRequests(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/api/help-requests${queryString ? `?${queryString}` : ''}`);
  }

  async getHelpRequest(id) {
    return this.request(`/api/help-requests/${id}`);
  }

  async getHelpRequestByCode(ticketCode) {
    return this.request(`/api/help-requests/code/${ticketCode}`);
  }

  async createHelpRequest(data) {
    return this.request('/api/help-requests', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateHelpRequest(id, data) {
    return this.request(`/api/help-requests/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async assignWorkerToRequest(id, workerId) {
    return this.request(`/api/help-requests/${id}/assign`, {
      method: 'PATCH',
      body: JSON.stringify({ workerId }),
    });
  }

  // Mental Health
  async getMentalHealthRecords(userId) {
    const params = userId ? `?userId=${userId}` : '';
    const response = await this.request(`/api/mental-health${params}`);
    return response.data || response;
  }

  async createMentalHealthRecord(data) {
    const response = await this.request('/api/mental-health', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.data || response;
  }

  // Maternal Health
  async getMaternalHealthRecords() {
    return this.request('/api/maternal-health');
  }

  async getMaternalHealthRecord(id) {
    return this.request(`/api/maternal-health/${id}`);
  }

  async createMaternalHealthRecord(data) {
    return this.request('/api/maternal-health', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async addMaternalCheckup(id, data) {
    return this.request(`/api/maternal-health/${id}/checkup`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Statistics
  async getStatistics() {
    return this.request('/api/statistics');
  }
}

const apiService = new ApiService(API_BASE_URL);
export default apiService;
