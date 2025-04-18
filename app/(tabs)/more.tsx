import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { GradientBackground } from '../../components/GradientBackground';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useUser } from '../../contexts/UserContext';

const MAX_NAME_LENGTH = 20;

const formatName = (name: string | undefined) => {
  if (!name) return 'Guest';
  if (name.length <= MAX_NAME_LENGTH) return name;
  return `${name.substring(0, MAX_NAME_LENGTH)}...`;
};

export default function MoreScreen() {
  const router = useRouter();
  const { user } = useUser();
  const [profileImage, setProfileImage] = useState(require('../../assets/images/default-profile.png'));

  const handleProfilePhotoChange = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (!permissionResult.granted) {
        Alert.alert('Permission Required', 'Please allow access to your photo library to change profile photo.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
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
        <ScrollView style={styles.scrollView}>
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
                <Text style={styles.fullName}>
                  {formatName(user?.full_name)}
                </Text>
                <Text style={styles.email}>{user?.email || 'No email'}</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account Settings</Text>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => router.push('/profile/edit-profile')}
            >
              <Ionicons name="person-outline" size={24} color="#fff" />
              <Text style={styles.menuItemText}>Edit Profile</Text>
              <Ionicons name="chevron-forward" size={24} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => router.push('/profile/change-password')}
            >
              <Ionicons name="lock-closed-outline" size={24} color="#fff" />
              <Text style={styles.menuItemText}>Change Password</Text>
              <Ionicons name="chevron-forward" size={24} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => Alert.alert('Coming Soon', 'Notification settings are under development')}
            >
              <Ionicons name="notifications-outline" size={24} color="#fff" />
              <Text style={styles.menuItemText}>Notifications</Text>
              <Ionicons name="chevron-forward" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Support</Text>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => Alert.alert('Coming Soon', 'Help center is under development')}
            >
              <Ionicons name="help-circle-outline" size={24} color="#fff" />
              <Text style={styles.menuItemText}>Help Center</Text>
              <Ionicons name="chevron-forward" size={24} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => Alert.alert('Coming Soon', 'Privacy settings are under development')}
            >
              <Ionicons name="shield-outline" size={24} color="#fff" />
              <Text style={styles.menuItemText}>Privacy</Text>
              <Ionicons name="chevron-forward" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </ScrollView>

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
  scrollView: {
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
    width: 80,
    height: 80,
    borderRadius: 40,
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
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
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
  section: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 16,
    opacity: 0.9,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 8,
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
    marginLeft: 16,
  },
  logoutButton: {
    backgroundColor: 'rgba(255, 140, 0, 0.2)',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
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