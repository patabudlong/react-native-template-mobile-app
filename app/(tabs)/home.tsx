import { StyleSheet, View, Text, TouchableOpacity, Image, RefreshControl, ScrollView } from 'react-native';
import { GradientBackground } from '../../components/GradientBackground';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState, useCallback } from 'react';

// Update path to use assets/images
const DEFAULT_PROFILE_IMAGE = require('../../assets/images/default-profile.png');

export default function HomeScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Add your refresh logic here
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleLogout = () => {
    router.replace('/(tabs)/login');
  };

  const handleInbox = () => {
    // Handle inbox press
    console.log('Inbox pressed');
  };

  const handleScan = () => {
    // Handle scan press
    console.log('Scan pressed');
  };

  return (
    <GradientBackground>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#ffffff"
            titleColor="#ffffff"
            colors={['#ffffff']}
            progressBackgroundColor="rgba(255, 255, 255, 0.2)"
            progressViewOffset={20}
            style={{ backgroundColor: 'transparent' }}
          />
        }
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerTop}>
              <View style={styles.profileSection}>
                <View style={styles.profileImageContainer}>
                  <Image
                    source={DEFAULT_PROFILE_IMAGE}
                    style={styles.profileImage}
                  />
                  <View style={styles.onlineIndicator} />
                </View>
                <View style={styles.profileInfo}>
                  <Text style={styles.welcomeText}>Welcome back,</Text>
                  <Text style={styles.userName}>John Doe</Text>
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
            
            <Text style={styles.dashboardLabel}>Dashboard</Text>
          </View>

          <View style={styles.content}>
            <Text style={styles.title}>Welcome Home!</Text>
            <Text style={styles.subtitle}>You've successfully logged in</Text>
            
            <TouchableOpacity 
              style={styles.button}
              onPress={handleLogout}
            >
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginTop: 40,
    marginBottom: 30,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 15,
    height: 15,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#fff',
  },
  profileInfo: {
    marginLeft: 15,
  },
  welcomeText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
  },
  userName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  dashboardLabel: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    opacity: 0.8,
    marginBottom: 30,
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 15,
    borderRadius: 10,
    width: '50%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inboxContainer: {
    position: 'relative',
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
  },
  badgeContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#4c669f',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  inboxWrapper: {
    alignItems: 'center',
  },
  inboxLabel: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
    opacity: 0.8,
  },
}); 