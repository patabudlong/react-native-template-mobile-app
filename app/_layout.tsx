import { useEffect, useState } from 'react';
import { Modal, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Stack } from 'expo-router';
import { api } from '../services/apiService';
import React from 'react';

interface HealthResponse {
  status: string;
  message: string;
}

export default function RootLayout() {
  const [showModal, setShowModal] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState({
    message: 'Checking API connection...',
    isError: false
  });

  useEffect(() => {
    const checkHealth = async () => {
      try {
        console.log('Checking API health...');
        const response = await api.get<HealthResponse>('/health');

        if (response.error) {
          throw new Error(response.error);
        }

        if (response.data?.status === 'healthy') {
          
          setConnectionStatus({
            message: response.data.message || 'API is healthy!',
            isError: false
          });
          // Hide modal after success
          setTimeout(() => setShowModal(false), 2000);
        } else {
          throw new Error('API returned unhealthy status');
        }
      } catch (error) {
        console.error('Health check failed:', error);
        setConnectionStatus({
          message: `API connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
          isError: true
        });
        // Keep modal visible on error
      }
    };

    checkHealth();
  }, []);

  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      <Modal
        transparent
        visible={showModal}
        animationType="fade"
      >
        <View style={styles.modalContainer}>
          <View style={[
            styles.modalContent,
            connectionStatus.isError ? styles.errorContent : styles.successContent
          ]}>
            <ActivityIndicator 
              size="large" 
              color={connectionStatus.isError ? '#FF3B30' : '#FF8C00'} 
              style={styles.spinner}
            />
            <Text style={styles.modalText}>{connectionStatus.message}</Text>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    minWidth: 200,
    alignItems: 'center',
  },
  successContent: {
    backgroundColor: 'rgba(255, 140, 0, 0.9)',
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  errorContent: {
    backgroundColor: 'rgba(255, 59, 48, 0.9)',
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  modalText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  spinner: {
    marginBottom: 15,
  },
});
