import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { GradientBackground } from '../../components/GradientBackground';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';

export default function MoreScreen() {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState(require('../../assets/images/default-profile.png'));

  const handleProfilePhotoChange = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (!permissionResult.granted) {
        Alert.alert('Permission Required', 'Please allow access to your photo library to change profile photo.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'images',
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setProfileImage({ uri: result.assets[0].uri });
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to change profile photo');
    }
  };

  return (
    <GradientBackground>
      <View style={styles.container}>
        <View style={styles.topSection}>
          <View style={styles.profileRow}>
            <TouchableOpacity 
              style={styles.profileImageWrapper}
              onPress={handleProfilePhotoChange}
            >
              <View style={styles.profileImageContainer}>
                <Image
                  source={profileImage}
                  style={styles.profileImage}
                />
              </View>
              <View style={styles.cameraIconContainer}>
                <Ionicons name="camera" size={20} color="#fff" />
              </View>
            </TouchableOpacity>
            <View style={styles.profileInfo}>
              <Text style={styles.fullName}>John Doe</Text>
              <Text style={styles.lastLogin}>Last login: Today, 2:30 PM</Text>
              <TouchableOpacity onPress={() => Alert.alert('Coming Soon', 'Profile view is under development')}>
                <Text style={styles.viewProfile}>View Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={() => Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Logout',
                style: 'destructive',
                onPress: () => {
                  router.replace('/(auth)/login');
                },
              },
            ],
          )}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImageWrapper: {
    position: 'relative',
    marginRight: 25,
  },
  profileImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  profileInfo: {
    flex: 1,
  },
  fullName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  lastLogin: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  cameraIconContainer: {
    position: 'absolute',
    right: -8,
    bottom: -8,
    backgroundColor: 'rgba(255, 140, 0, 0.8)',
    borderRadius: 16,
    padding: 6,
    zIndex: 2,
    elevation: 2,
  },
  viewProfile: {
    color: '#fff',
    fontSize: 14,
    marginTop: 4,
    opacity: 0.9,
  },
  logoutButton: {
    backgroundColor: 'rgba(255, 140, 0, 0.2)',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 'auto',
    marginHorizontal: 20,
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 140, 0, 0.4)',
  },
  logoutText: {
    color: '#FF8C00',
    fontSize: 17,
    fontWeight: '700',
  },
}); 