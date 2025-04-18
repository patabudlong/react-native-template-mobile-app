import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { GradientBackground } from '../../components/GradientBackground';
import { useUser } from '../../contexts/UserContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function EditProfileScreen() {
  const { user } = useUser();
  const router = useRouter();

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
          <Text style={styles.title}>Edit Profile</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.content}>
          {/* Content will go here */}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  placeholder: {
    width: 40, // Same width as backButton for centering title
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
}); 