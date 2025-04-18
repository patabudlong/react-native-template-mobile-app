import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Alert, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { GradientBackground } from '../../components/GradientBackground';
import { useUser } from '../../contexts/UserContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { api } from '../../services/apiService';
import { CustomAlert } from '../../components/CustomAlert';

interface UserDetails {
  id: string;
  username: string;
  email: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  extension_name: string;
  full_name: string;
}

export default function EditProfileScreen() {
  const { user, setUser } = useUser();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    username: user?.username || '',
    first_name: user?.first_name || '',
    middle_name: user?.middle_name || '',
    last_name: user?.last_name || '',
    extension_name: user?.extension_name || '',
  });

  const [hasChanges, setHasChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertConfig, setAlertConfig] = useState<{
    type: 'success' | 'error';
    title: string;
    message: string;
  }>({
    type: 'success',
    title: '',
    message: ''
  });

  useEffect(() => {
    const isChanged = 
      formData.username !== (user?.username || '') ||
      formData.first_name !== (user?.first_name || '') ||
      formData.middle_name !== (user?.middle_name || '') ||
      formData.last_name !== (user?.last_name || '') ||
      formData.extension_name !== (user?.extension_name || '');
    
    setHasChanges(isChanged);
  }, [formData]);

  const handleBack = () => {
    if (hasChanges) {
      Alert.alert(
        'Discard Changes',
        'You have unsaved changes. Are you sure you want to leave?',
        [
          {
            text: 'Stay',
            style: 'cancel',
          },
          {
            text: 'Leave',
            style: 'destructive',
            onPress: () => router.back(),
          },
        ]
      );
    } else {
      router.back();
    }
  };

  const handleUpdate = async () => {
    if (!user?.id) {
      setAlertConfig({
        type: 'error',
        title: 'Error',
        message: 'User ID not found'
      });
      setShowAlert(true);
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.updateUser(user.id, formData);
      
      if (response.error) {
        setAlertConfig({
          type: 'error',
          title: 'Update Failed',
          message: response.error
        });
        setShowAlert(true);
        return;
      }

      setUser({
        ...user,
        ...formData,
        full_name: `${formData.first_name} ${
          formData.middle_name ? formData.middle_name.charAt(0) + '. ' : ''
        }${formData.last_name}${
          formData.extension_name ? ' ' + formData.extension_name : ''
        }`
      });

      setAlertConfig({
        type: 'success',
        title: 'Success',
        message: 'Profile updated successfully'
      });
      setShowAlert(true);
    } catch (error) {
      setAlertConfig({
        type: 'error',
        title: 'Error',
        message: 'Failed to update profile'
      });
      setShowAlert(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GradientBackground>
      <StatusBar style="light" />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={handleBack}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>Edit Profile</Text>
        </View>

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <View style={styles.inputGroup}>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>Email</Text>
                <TouchableOpacity
                  onPress={() => Alert.alert(
                    'Email',
                    'Email address cannot be changed. Please contact support if you need to update your email.'
                  )}
                >
                  <Ionicons name="information-circle-outline" size={20} color="rgba(255, 255, 255, 0.8)" />
                </TouchableOpacity>
              </View>
              <TextInput
                style={[styles.input, { opacity: 0.7 }]}
                value={user?.email}
                editable={false}
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Username</Text>
              <TextInput
                style={styles.input}
                value={formData.username}
                onChangeText={(text) => setFormData({ ...formData, username: text })}
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                placeholder="Enter username"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                First Name <Text style={styles.required}>(Required)</Text>
              </Text>
              <TextInput
                style={styles.input}
                value={formData.first_name}
                onChangeText={(text) => setFormData({ ...formData, first_name: text })}
                placeholder="Enter your first name"
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Middle Name</Text>
              <TextInput
                style={styles.input}
                value={formData.middle_name}
                onChangeText={(text) => setFormData({ ...formData, middle_name: text })}
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                placeholder="Enter middle name"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Last Name <Text style={styles.required}>(Required)</Text>
              </Text>
              <TextInput
                style={styles.input}
                value={formData.last_name}
                onChangeText={(text) => setFormData({ ...formData, last_name: text })}
                placeholder="Enter your last name"
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Extension Name</Text>
              <TextInput
                style={styles.input}
                value={formData.extension_name}
                onChangeText={(text) => setFormData({ ...formData, extension_name: text })}
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                placeholder="E.g., Jr., Sr., III"
              />
            </View>
          </View>
        </ScrollView>

        <View style={styles.buttonGroup}>
          <TouchableOpacity 
            style={[styles.button, styles.cancelButton]}
            onPress={handleBack}
          >
            <Text style={[styles.buttonText, styles.cancelButtonText]}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.button, 
              styles.updateButton,
              (isLoading || showAlert) && styles.disabledButton
            ]}
            onPress={handleUpdate}
            disabled={isLoading || showAlert}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Update Profile</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      <CustomAlert
        visible={showAlert}
        type={alertConfig.type}
        title={alertConfig.title}
        message={alertConfig.message}
        onClose={() => {
          setShowAlert(false);
          if (alertConfig.type === 'success') {
            router.back();
          }
        }}
      />
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
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 12,
    color: '#fff',
    fontSize: 16,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  cancelButtonText: {
    color: '#fff',
  },
  updateButton: {
    backgroundColor: '#FF8C00',
  },
  updateButtonText: {
    color: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  required: {
    color: 'rgba(255, 182, 182, 0.9)',
    fontSize: 13,
    fontStyle: 'italic',
    fontWeight: '500',
  },
  disabledButton: {
    opacity: 0.7,
  },
}); 