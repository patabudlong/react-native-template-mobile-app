import { authService } from './authService';

// Use single URL for API
const baseUrl = 'http://192.168.1.8:8001';

console.log('Using API URL:', baseUrl);

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export const api = {
  async get<T>(endpoint: string, requiresAuth: boolean = false): Promise<ApiResponse<T>> {
    try {
      const url = `${baseUrl}${endpoint}`;
      console.log('Making GET request to:', url);
      
      const headers: HeadersInit = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      };

      if (requiresAuth) {
        const token = await authService.getToken();
        if (!token) throw new Error('No auth token available');
        headers['Authorization'] = `Bearer ${token}`;
        console.log('Using auth token:', token);
      }

      const response = await fetch(url, {
        method: 'GET',
        headers,
      });

      const textResponse = await response.text();
      console.log('Raw response:', textResponse);
      console.log('Response status:', response.status);

      if (!response.ok) {
        throw new Error(`API error: ${response.status} - ${textResponse}`);
      }

      const data = JSON.parse(textResponse);
      return { data };
    } catch (error) {
      console.error('API request failed:', error);
      return { 
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  },

  async post<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    try {
      const url = `${baseUrl}${endpoint}`;
      console.log('Making POST request to:', url);
      
      const formData = new URLSearchParams();
      Object.entries(body).forEach(([key, value]) => {
        if (value !== undefined) {
          formData.append(key, value as string);
        }
      });
      
      console.log('Form data being sent:', formData.toString());
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });

      const textResponse = await response.text();
      console.log('Raw response:', textResponse);
      console.log('Response status:', response.status);

      if (!response.ok) {
        throw new Error(`API error: ${response.status} - ${textResponse}`);
      }

      const data = JSON.parse(textResponse);
      return { data };
    } catch (error) {
      console.error('API request failed:', error);
      return { 
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  },

  async checkEmail(email: string): Promise<ApiResponse<{ exists: boolean }>> {
    try {
      const url = `${baseUrl}/users/check-email`;
      console.log('Making POST request to:', url);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const textResponse = await response.text();
      console.log('Raw response:', textResponse);
      console.log('Response status:', response.status);

      if (!response.ok) {
        throw new Error(`API error: ${response.status} - ${textResponse}`);
      }

      const data = JSON.parse(textResponse);
      return { data };
    } catch (error) {
      console.error('API request failed:', error);
      return { 
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}; 