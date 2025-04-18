import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { GradientBackground } from '../../components/GradientBackground';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

interface PrivacySection {
  id: string;
  title: string;
  content: string;
}

export default function PrivacyScreen() {
  const router = useRouter();

  const privacySections: PrivacySection[] = [
    {
      id: 'collection',
      title: 'Information We Collect',
      content: 'We collect information that you provide directly to us, including your name, email address, and any other information you choose to provide.',
    },
    {
      id: 'usage',
      title: 'How We Use Your Information',
      content: 'We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to personalize your experience.',
    },
    {
      id: 'sharing',
      title: 'Information Sharing',
      content: 'We do not share your personal information with third parties except as described in this privacy policy or with your consent.',
    },
    {
      id: 'security',
      title: 'Data Security',
      content: 'We take reasonable measures to help protect your personal information from loss, theft, misuse, and unauthorized access.',
    },
    {
      id: 'rights',
      title: 'Your Rights',
      content: 'You have the right to access, update, or delete your personal information. You can also opt out of receiving promotional communications from us.',
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
          <Text style={styles.title}>Privacy</Text>
        </View>

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.lastUpdated}>Last updated: March 2024</Text>
          
          {privacySections.map((section) => (
            <View key={section.id} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.sectionContent}>{section.content}</Text>
            </View>
          ))}

          <TouchableOpacity 
            style={styles.contactButton}
            onPress={() => console.log('Contact Privacy Team')}
          >
            <Text style={styles.contactButtonText}>Contact Privacy Team</Text>
          </TouchableOpacity>
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
  lastUpdated: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
  },
  sectionContent: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 24,
  },
  contactButton: {
    backgroundColor: 'rgba(255, 140, 0, 0.2)',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 140, 0, 0.4)',
  },
  contactButtonText: {
    color: '#FF8C00',
    fontSize: 16,
    fontWeight: '600',
  },
}); 