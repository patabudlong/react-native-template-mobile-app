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
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
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
          <View style={styles.contentContainer}>
            <View style={styles.contentSection}>
              <Text style={styles.sectionTitle}>Recent Activity</Text>
              {[1, 2, 3].map((item) => (
                <View key={item} style={styles.activityCard}>
                  <View style={styles.activityIconContainer}>
                    <Ionicons name="time-outline" size={24} color="#fff" />
                  </View>
                  <View style={styles.activityContent}>
                    <Text style={styles.activityTitle}>Activity {item}</Text>
                    <Text style={styles.activitySubtitle}>2 hours ago</Text>
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.contentSection}>
              <Text style={styles.sectionTitle}>Your Stats</Text>
              {[1, 2, 3, 4].map((item) => (
                <View key={item} style={styles.statsCard}>
                  <Text style={styles.statsTitle}>Stat {item}</Text>
                  <Text style={styles.statsValue}>value</Text>
                </View>
              ))}
            </View>

            <View style={styles.contentSection}>
              <Text style={styles.sectionTitle}>Quick Actions</Text>
              <View style={styles.quickActionsGrid}>
                {[1, 2, 3, 4].map((item) => (
                  <TouchableOpacity key={item} style={styles.quickActionCard}>
                    <View style={styles.quickActionIcon}>
                      <Ionicons name="star-outline" size={24} color="#fff" />
                    </View>
                    <Text style={styles.quickActionText}>Action {item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  contentContainer: {
    padding: 20,
  },
  contentSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  activityCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  activityIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  activitySubtitle: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    marginTop: 4,
  },
  statsCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  statsTitle: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
  },
  statsValue: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 4,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickActionCard: {
    width: '47%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickActionText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
}); 