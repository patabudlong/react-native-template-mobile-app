import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { GradientBackground } from '../../components/GradientBackground';

export default function MoreScreen() {
  return (
    <GradientBackground>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>More</Text>
        </View>
        
        <View style={styles.topSection}>
          <View style={styles.profileRow}>
            <View style={styles.profileImageContainer}>
              <Image
                source={require('../../assets/images/default-profile.png')}
                style={styles.profileImage}
              />
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
  header: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 12,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
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
  profileImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    marginRight: 12,
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
}); 