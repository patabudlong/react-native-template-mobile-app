import { useEffect, useState } from 'react';
import { Modal, View, ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { api } from '../services/apiService';
import { UserProvider } from '../contexts/UserContext';

export default function RootLayout() {
  const [showSpinner, setShowSpinner] = useState(true);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await api.get('/health');
        if (response.error) {
          throw new Error(response.error);
        }
        setTimeout(() => setShowSpinner(false), 2000);
      } catch (error) {
        console.error('Health check failed:', error);
        setShowSpinner(false);
        setErrorMessage(error instanceof Error ? error.message : 'Connection failed');
        setShowError(true);
      }
    };

    checkHealth();
  }, []);

  return (
    <UserProvider>
      <Stack screenOptions={{ headerShown: false }} />
      
      {/* Loading Spinner */}
      <Modal
        transparent
        visible={showSpinner}
        animationType="fade"
      >
        <View style={styles.modalContainer}>
          <View style={styles.spinnerContent}>
            <ActivityIndicator size="large" color="#FF8C00" />
          </View>
        </View>
      </Modal>

      {/* Error Modal */}
      <Modal
        transparent
        visible={showError}
        animationType="fade"
      >
        <View style={styles.modalContainer}>
          <View style={styles.errorContent}>
            <Text style={styles.errorTitle}>Connection Error</Text>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
            <TouchableOpacity 
              style={styles.button}
              onPress={() => setShowError(false)}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  spinnerContent: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    minWidth: 100,
    alignItems: 'center',
  },
  errorContent: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    minWidth: 300,
    alignItems: 'center',
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF3B30',
    marginBottom: 10,
  },
  errorMessage: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FF8C00',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  }
});
