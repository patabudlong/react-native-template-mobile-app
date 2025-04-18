import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { api } from '../services/apiService';
import { useUser } from '../contexts/UserContext';
import { authService } from '../services/authService';
import { jwtDecode } from "jwt-decode";

interface UserDetails {
  id: string;
  full_name: string;
  email: string;
  // add other fields as needed
}

interface JwtPayload {
  user_id: string;  // Changed to user_id
  exp: number;
  // add other claims as needed
}

export function SharedHeader() {
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // Get the saved token
        const token = await authService.getToken();
        if (!token) {
          console.error('No token found');
          return;
        }

        // Decode the token to get user_id
        const decoded = jwtDecode<JwtPayload>(token);
        console.log('Decoded token:', decoded);
        
        const userId = decoded.user_id;
        if (!userId) {
          throw new Error('No user_id found in token');
        }

        console.log('Fetching details for user_id:', userId);

        // Make the API call with the user_id
        const response = await api.get<UserDetails>(`/auth/users/${userId}`, true);
        console.log('User details response:', response);

        if (response.error) {
          throw new Error(response.error);
        }

        if (response.data) {
          setUser(response.data);
          console.log('User details stored:', response.data);
        }
      } catch (error) {
        console.error('Failed to fetch user details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleInbox = () => {
    console.log('Inbox pressed');
  };

  const handleScan = () => {
    console.log('Scan pressed');
  };

  return (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image
              source={require('../assets/images/default-profile.png')}
              style={styles.profileImage}
            />
            <View style={styles.onlineIndicator} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text 
              style={styles.userName}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {loading 
                ? 'Loading...' 
                : user?.full_name && user.full_name.length > 15
                  ? `${user.full_name.slice(0, 20)}...`
                  : user?.full_name || 'Guest'
              }
            </Text>
          </View>
        </View>
        
        <View style={styles.actionsContainer}>
          <View style={styles.inboxWrapper}>
            <TouchableOpacity style={styles.inboxContainer} onPress={handleInbox}>
              <Ionicons name="mail-outline" size={28} color="#fff" />
              <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>3</Text>
              </View>
            </TouchableOpacity>
            <Text style={styles.inboxLabel}>Inbox</Text>
          </View>

          <View style={styles.inboxWrapper}>
            <TouchableOpacity style={styles.inboxContainer} onPress={handleScan}>
              <Ionicons name="scan-outline" size={28} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.inboxLabel}>Scan</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 12,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    position: 'relative',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
  },
  onlineIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderWidth: 2,
    borderColor: '#192f6a',
  },
  profileInfo: {
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  inboxWrapper: {
    alignItems: 'center',
  },
  inboxContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  badgeContainer: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FF4B55',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 6,
  },
  inboxLabel: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
}); 