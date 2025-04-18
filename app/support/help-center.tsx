import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { GradientBackground } from '../../components/GradientBackground';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

interface HelpSection {
  id: string;
  title: string;
  icon: string;
  items: string[];
}

export default function HelpCenterScreen() {
  const router = useRouter();

  const helpSections: HelpSection[] = [
    {
      id: 'account',
      title: 'Account & Profile',
      icon: 'person-circle-outline',
      items: [
        'How to update profile information',
        'Changing your password',
        'Account security settings',
        'Managing notifications',
      ],
    },
    {
      id: 'general',
      title: 'General Questions',
      icon: 'information-circle-outline',
      items: [
        'Getting started guide',
        'Frequently asked questions',
        'System requirements',
        'App features overview',
      ],
    },
    {
      id: 'support',
      title: 'Support',
      icon: 'help-buoy-outline',
      items: [
        'Contact support team',
        'Report a problem',
        'Submit feedback',
        'Request a feature',
      ],
    },
  ];

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
          <Text style={styles.title}>Help Center</Text>
        </View>

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {helpSections.map((section) => (
            <View key={section.id} style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name={section.icon as any} size={24} color="#FF8C00" />
                <Text style={styles.sectionTitle}>{section.title}</Text>
              </View>
              {section.items.map((item, index) => (
                <TouchableOpacity 
                  key={index}
                  style={styles.helpItem}
                  onPress={() => console.log(`Selected: ${item}`)}
                >
                  <Text style={styles.helpItemText}>{item}</Text>
                  <Ionicons name="chevron-forward" size={20} color="rgba(255, 255, 255, 0.5)" />
                </TouchableOpacity>
              ))}
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
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 12,
  },
  helpItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    marginBottom: 8,
  },
  helpItemText: {
    fontSize: 16,
    color: '#fff',
    flex: 1,
    marginRight: 8,
  },
}); 