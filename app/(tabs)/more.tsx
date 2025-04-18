import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { GradientBackground } from '../../components/GradientBackground';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useUser } from '../../contexts/UserContext';
import { CustomAlert } from '../../components/CustomAlert';
import { api } from '../../services/apiService';

interface UserDetails {
  id: string;
  email: string;
  username: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  extension_name: string;
  full_name: string;
}

const MAX_NAME_LENGTH = 20;

const formatName = (user: UserDetails | null) => {
  if (!user?.first_name) return 'Guest';
  
  const fullName = `${user.first_name} ${user.last_name}${user.middle_name ? ` ${user.middle_name.charAt(0)}.` : ''}`;
  
  if (fullName.length <= MAX_NAME_LENGTH) return fullName;
  return `${fullName.substring(0, MAX_NAME_LENGTH)}...`;
};

export default function MoreScreen() {
  const router = useRouter();
  const { user } = useUser();
  const [profileImage, setProfileImage] = useState(require('../../assets/images/default-profile.png'));
  const [showAlert, setShowAlert] = useState(false);
  const [alertConfig, setAlertConfig] = useState<{
    type: 'success' | 'error';
    title: string;
    message: string;
    action?: () => void;
    buttons?: Array<{
      text: string;
      style?: 'default' | 'cancel' | 'destructive';
      onPress: () => void;
    }>;
  }>({
    type: 'error',
    title: '',
    message: ''
  });

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

  const handleLogout = () => {
    setAlertConfig({
      type: 'error',
      title: 'Logout',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => setShowAlert(false)
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => router.replace('/(auth)/login')
        }
      ]
    });
    setShowAlert(true);
  };

  const handleDeleteAccount = () => {
    setAlertConfig({
      type: 'error',
      title: 'Delete Account',
      message: 'Are you sure you want to delete your account? This action cannot be undone.',
      buttons: [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => setShowAlert(false)
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            if (!user?.id) return;
            
            try {
              const response = await api.deleteUser(user.id);
              
              if (response.error) {
                setAlertConfig({
                  type: 'error',
                  title: 'Error',
                  message: response.error,
                  buttons: [{
                    text: 'OK',
                    onPress: () => setShowAlert(false)
                  }]
                });
                return;
              }

              router.replace('/(auth)/login');
            } catch (error) {
              setAlertConfig({
                type: 'error',
                title: 'Error',
                message: 'Failed to delete account',
                buttons: [{
                  text: 'OK',
                  onPress: () => setShowAlert(false)
                }]
              });
            }
          }
        }
      ]
    });
    setShowAlert(true);
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
                  {formatName(user)}
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
              onPress={() => router.push('/profile/notifications')}
            >
              <Ionicons name="notifications-outline" size={24} color="#fff" />
              <Text style={styles.menuItemText}>Notifications</Text>
              <Ionicons name="chevron-forward" size={24} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.menuItem}
              onPress={handleLogout}
            >
              <Ionicons name="log-out-outline" size={24} color="rgba(255, 182, 182, 0.95)" />
              <Text style={[styles.menuItemText, styles.logoutText]}>Logout</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Support</Text>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => router.push('/support/help-center')}
            >
              <Ionicons name="help-circle-outline" size={24} color="#fff" />
              <Text style={styles.menuItemText}>Help Center</Text>
              <Ionicons name="chevron-forward" size={24} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => router.push('/support/privacy')}
            >
              <Ionicons name="shield-outline" size={24} color="#fff" />
              <Text style={styles.menuItemText}>Privacy</Text>
              <Ionicons name="chevron-forward" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={handleDeleteAccount}
            >
              <Ionicons name="trash-outline" size={24} color="rgba(255, 182, 182, 0.95)" />
              <Text style={[styles.menuItemText, styles.deleteText]}>Delete My Account</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      <CustomAlert
        visible={showAlert}
        type={alertConfig.type}
        title={alertConfig.title}
        message={alertConfig.message}
        buttons={alertConfig.buttons}
        onClose={() => setShowAlert(false)}
      />
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
    color: 'rgba(255, 255, 255, 0.9)',
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
    color: 'rgba(255, 255, 255, 0.9)',
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
    color: 'rgba(255, 255, 255, 0.9)',
    marginLeft: 16,
  },
  logoutButton: {
    marginTop: 8,
  },
  logoutText: {
    color: 'rgba(255, 182, 182, 0.95)',
  },
  deleteAccount: {
    marginTop: 8,
  },
  deleteText: {
    color: 'rgba(255, 182, 182, 0.95)',
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: 8,
  },
}); 