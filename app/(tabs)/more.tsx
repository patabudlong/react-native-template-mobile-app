import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { GradientBackground } from '../../components/GradientBackground';
import { Ionicons } from '@expo/vector-icons';

export default function MoreScreen() {
  return (
    <GradientBackground>
      <View style={styles.container}>
        <View style={styles.topSection}>
          <View style={styles.profileRow}>
            <View style={styles.profileImageWrapper}>
              <View style={styles.profileImageContainer}>
                <Image
                  source={require('../../assets/images/default-profile.png')}
                  style={styles.profileImage}
                />
              </View>
              <TouchableOpacity style={styles.cameraIconContainer}>
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