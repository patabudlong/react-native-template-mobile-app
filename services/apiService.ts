import { authService } from './authService';

// Use single URL for API
const baseUrl = 'http://192.168.1.8:8001';

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

interface RegisterData {
  email: string;
  password: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  extension_name?: string;
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

  async register(data: RegisterData): Promise<ApiResponse<{ message: string }>> {
    try {
      const url = `${baseUrl}/users/register`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          middle_name: data.middle_name || "",
          extension_name: data.extension_name || "",
          password: data.password.trim()  // Ensure no whitespace
        }),
      });

      const responseText = await response.text();
      console.log('Register response:', responseText);

      if (!response.ok) {
        return { error: 'Registration failed' };
      }

      return { data: JSON.parse(responseText) };
    } catch (error) {
      console.error('Register error:', error);
      return { error: 'Registration failed' };
    }
  }
}; 