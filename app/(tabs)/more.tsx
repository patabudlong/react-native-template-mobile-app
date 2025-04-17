import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { GradientBackground } from '../../components/GradientBackground';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function MoreScreen() {
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
        <View style={styles.topSection}>
          <View style={styles.profileRow}>
            <View style={styles.profileImageWrapper}>
              <View style={styles.profileImageContainer}>
                <Image
                  source={profileImage}
                  style={styles.profileImage}
                />
              </View>
              <TouchableOpacity 
                style={styles.cameraIconContainer}
                onPress={handleProfilePhotoChange}
              >
                <Ionicons name="camera" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.fullName}>John Doe</Text>
              <Text style={styles.lastLogin}>Last login: Today, 2:30 PM</Text>
            </View>
          </View>
        </View>
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
    marginRight: 12,
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
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 16,
    padding: 6,
    zIndex: 2,
    elevation: 2,
  },
}); 