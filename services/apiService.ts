import { Platform } from 'react-native';

// Use single URL for API
const baseUrl = 'http://192.168.1.8:8001';

console.log('Using API URL:', baseUrl);

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export const api = {
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const url = `${baseUrl}${endpoint}`;
      console.log('Making GET request to:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      const textResponse = await response.text();
      console.log('Raw response:', textResponse);

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
      console.log('Request body:', JSON.stringify(body, null, 2));
      
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
      console.log('Response headers:', response.headers);

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