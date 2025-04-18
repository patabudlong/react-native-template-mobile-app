import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { GradientBackground } from '../../components/GradientBackground';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

export default function NotificationsScreen() {
  const router = useRouter();
  
  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      id: 'push',
      title: 'Push Notifications',
      description: 'Receive push notifications for important updates',
      enabled: true,
    },
    {
      id: 'email',
      title: 'Email Notifications',
      description: 'Receive email notifications for account activity',
      enabled: true,
    },
    {
      id: 'updates',
      title: 'App Updates',
      description: 'Get notified when new app updates are available',
      enabled: true,
    },
    {
      id: 'news',
      title: 'News & Features',
      description: 'Stay informed about new features and improvements',
      enabled: false,
    },
    {
      id: 'marketing',
      title: 'Marketing',
      description: 'Receive promotional offers and marketing updates',
      enabled: false,
    },
  ]);

  const toggleSwitch = (id: string) => {
    setSettings(settings.map(setting => 
      setting.id === id 
        ? { ...setting, enabled: !setting.enabled }
        : setting
    ));
  };

  return (
    <GradientBackground>
      <StatusBar style="light" />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>Notifications</Text>
        </View>

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {settings.map((setting) => (
            <View key={setting.id} style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>{setting.title}</Text>
                <Text style={styles.settingDescription}>{setting.description}</Text>
              </View>
              <Switch
                trackColor={{ false: 'rgba(255, 255, 255, 0.1)', true: '#FF8C00' }}
                thumbColor="#fff"
                ios_backgroundColor="rgba(255, 255, 255, 0.1)"
                onValueChange={() => toggleSwitch(setting.id)}
                value={setting.enabled}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
}); 