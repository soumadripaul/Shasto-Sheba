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

  // Bangladesh Locations API
  async getDivisions() {
    try {
      const response = await fetch('https://bdapi.vercel.app/api/v.1/division');
      const data = await response.json();
      console.log('Divisions API Response:', data);
      
      // If API fails, return hardcoded data
      if (!data || !data.data || data.data.length === 0) {
        return {
          data: [
            { id: "1", name: "Chattagram", bn_name: "চট্টগ্রাম" },
            { id: "2", name: "Rajshahi", bn_name: "রাজশাহী" },
            { id: "3", name: "Khulna", bn_name: "খুলনা" },
            { id: "4", name: "Barisal", bn_name: "বরিশাল" },
            { id: "5", name: "Sylhet", bn_name: "সিলেট" },
            { id: "6", name: "Dhaka", bn_name: "ঢাকা" },
            { id: "7", name: "Rangpur", bn_name: "রংপুর" },
            { id: "8", name: "Mymensingh", bn_name: "ময়মনসিংহ" }
          ]
        };
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching divisions:', error);
      // Return hardcoded fallback data
      return {
        data: [
          { id: "1", name: "Chattagram", bn_name: "চট্টগ্রাম" },
          { id: "2", name: "Rajshahi", bn_name: "রাজশাহী" },
          { id: "3", name: "Khulna", bn_name: "খুলনা" },
          { id: "4", name: "Barisal", bn_name: "বরিশাল" },
          { id: "5", name: "Sylhet", bn_name: "সিলেট" },
          { id: "6", name: "Dhaka", bn_name: "ঢাকা" },
          { id: "7", name: "Rangpur", bn_name: "রংপুর" },
          { id: "8", name: "Mymensingh", bn_name: "ময়মনসিংহ" }
        ]
      };
    }
  }

  async getDistricts(divisionId = null) {
    try {
      const url = divisionId 
        ? `https://bdapi.vercel.app/api/v.1/division/${divisionId}`
        : 'https://bdapi.vercel.app/api/v.1/district';
      const response = await fetch(url);
      const data = await response.json();
      console.log('Districts API Response:', data);
      
      // If API fails or returns empty, return fallback
      if (!data || !data.data || data.data.length === 0) {
        return { data: [] };
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching districts:', error);
      return { data: [] };
    }
  }

  async getUpazilas(districtId = null) {
    try {
      const url = districtId
        ? `https://bdapi.vercel.app/api/v.1/district/${districtId}`
        : 'https://bdapi.vercel.app/api/v.1/upazila';
      const response = await fetch(url);
      const data = await response.json();
      console.log('Upazilas API Response:', data);
      
      // If API fails or returns empty, return fallback
      if (!data || !data.data || data.data.length === 0) {
        return { data: [] };
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching upazilas:', error);
      return { data: [] };
    }
  }

  // Chatbot
  async sendChatMessage(message) {
    return this.request('/api/chatbot', {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
  }

  async getChatbotHealth() {
    return this.request('/api/chatbot/health');
  }
}

const apiService = new ApiService(API_BASE_URL);
export default apiService;
