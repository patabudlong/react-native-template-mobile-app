import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Pressable, Alert } from 'react-native';
import { GradientBackground } from '../../components/GradientBackground';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { PolicyModal } from '../../components/PolicyModal';
import { api } from '../../services/apiService';
import { CustomAlert } from '../../components/CustomAlert';

export default function FinishSignUpScreen() {
  const params = useLocalSearchParams();
  const email = params.email as string;
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: email,
    password: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    extension_name: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertConfig, setAlertConfig] = useState<{
    type: 'success' | 'error' | 'question';
    title: string;
    message: string;
    buttons?: Array<{
      text: string;
      style?: 'default' | 'cancel' | 'destructive';
      onPress: () => void;
    }>;
  }>({
    type: 'error',
    title: '',
    message: ''
  });

  const termsContent = `
1. Acceptance of Terms

By accessing and using our application, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you may not use our services.

2. User Registration

Users must provide accurate and complete information during registration. You are responsible for maintaining the confidentiality of your account credentials.

3. User Conduct

Users agree to:
- Use the service legally and appropriately
- Not engage in harmful or malicious activities
- Respect other users' privacy and rights

4. Service Modifications

We reserve the right to modify or discontinue any part of our service at any time.`;

  const privacyContent = `
Privacy Policy

1. Information Collection

We collect information that you provide directly to us, including:
- Personal information (name, email)
- Usage data
- Device information

2. Information Usage

We use collected information to:
- Provide and maintain our services
- Improve user experience
- Send important notifications

3. Data Protection

We implement security measures to protect your personal information.

4. Information Sharing

We do not sell or share your personal information with third parties except as described in this policy.`;

  const validatePassword = (password: string): { isValid: boolean; message: string } => {
    if (password.length < 8) {
      return { isValid: false, message: 'Password must be at least 8 characters long' };
    }
    
    if (!/[A-Z]/.test(password)) {
      return { isValid: false, message: 'Password must contain at least one uppercase letter' };
    }
    
    if (!/[a-z]/.test(password)) {
      return { isValid: false, message: 'Password must contain at least one lowercase letter' };
    }
    
    if (!/[0-9]/.test(password)) {
      return { isValid: false, message: 'Password must contain at least one number' };
    }
    
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return { isValid: false, message: 'Password must contain at least one special character' };
    }

    return { isValid: true, message: '' };
  };

  const handleFinish = async () => {
    console.log('Form data with email:', formData);
    
    if (!formData.first_name || !formData.last_name || !formData.password) {
      setAlertConfig({
        type: 'error',
        title: 'Missing Information',
        message: 'Please fill in all required fields',
        buttons: [{
          text: 'OK',
          onPress: () => setShowAlert(false)
        }]
      });
      setShowAlert(true);
      return;
    }

    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      setAlertConfig({
        type: 'error',
        title: 'Invalid Password',
        message: passwordValidation.message,
        buttons: [{
          text: 'OK',
          onPress: () => setShowAlert(false)
        }]
      });
      setShowAlert(true);
      return;
    }

    try {
      const registerData = {
        email: formData.email,
        password: formData.password,
        first_name: formData.first_name,
        middle_name: formData.middle_name || undefined,
        last_name: formData.last_name,
        extension_name: formData.extension_name || undefined,
      };

      const response = await api.register(registerData);
      
      if (response.error) {
        setAlertConfig({
          type: 'error',
          title: 'Registration Failed',
          message: response.error,
          buttons: [{
            text: 'OK',
            onPress: () => setShowAlert(false)
          }]
        });
        setShowAlert(true);
        return;
      }

      setAlertConfig({
        type: 'success',
        title: 'Registration Successful',
        message: 'Your account has been created successfully. Please login to continue.',
        buttons: [{
          text: 'OK',
          onPress: () => router.replace('/login')
        }]
      });
      setShowAlert(true);

    } catch (error) {
      setAlertConfig({
        type: 'error',
        title: 'Error',
        message: 'Failed to register. Please try again.',
        buttons: [{
          text: 'OK',
          onPress: () => setShowAlert(false)
        }]
      });
      setShowAlert(true);
    }
  };

  return (
    <GradientBackground>
      <StatusBar style="light" />
      <View style={styles.container}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.keyboardView}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
          <ScrollView 
            style={styles.scrollView}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            <View style={styles.header}>
              <Text style={styles.title}>Complete Your Profile</Text>
              <Text style={styles.subtitle}>Tell us more about yourself</Text>
            </View>

            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <View style={styles.labelContainer}>
                  <Text style={styles.label}>Email</Text>
                  <Ionicons 
                    name="checkmark-circle" 
                    size={18} 
                    color="#22C55E"
                    style={styles.checkIcon} 
                  />
                </View>
                <View style={[styles.input, styles.emailContainer]}>
                  <Text style={styles.emailText}>{email}</Text>
                </View>
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
                <Text style={styles.label}>Middle Name</Text>
                <TextInput
                  style={styles.input}
                  value={formData.middle_name}
                  onChangeText={(text) => setFormData({ ...formData, middle_name: text })}
                  placeholder="Enter your middle name"
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Extension Name</Text>
                <TextInput
                  style={styles.input}
                  value={formData.extension_name}
                  onChangeText={(text) => setFormData({ ...formData, extension_name: text })}
                  placeholder="E.g., Jr., Sr., III"
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  Password <Text style={styles.required}>(Required)</Text>
                </Text>
                <View style={styles.input}>
                  <TextInput
                    style={styles.passwordInput}
                    value={formData.password}
                    onChangeText={(text) => setFormData({ ...formData, password: text })}
                    placeholder="Create a password"
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                    secureTextEntry={!showPassword}
                  />
                  <Pressable 
                    style={styles.passwordToggle}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Text style={styles.passwordToggleText}>
                      {showPassword ? 'Hide' : 'Show'}
                    </Text>
                  </Pressable>
                </View>
                <View style={styles.passwordGuide}>
                  <Text style={styles.passwordGuideTitle}>Password must contain:</Text>
                  <Text style={styles.passwordGuideText}>• Minimum of 8 characters</Text>
                  <Text style={styles.passwordGuideText}>• At least one uppercase letter (A-Z)</Text>
                  <Text style={styles.passwordGuideText}>• At least one lowercase letter (a-z)</Text>
                  <Text style={styles.passwordGuideText}>• At least one number (0-9)</Text>
                  <Text style={styles.passwordGuideText}>• At least one special character (!@#$%^&*)</Text>
                </View>
              </View>
            </View>

            <View style={styles.agreementContainer}>
              <Text style={styles.agreementText}>
                By signing up, you agree to our{' '}
                <Text 
                  style={styles.agreementLink}
                  onPress={() => setShowTerms(true)}
                >
                  Terms & Conditions
                </Text>
                {' '}and{' '}
                <Text 
                  style={styles.agreementLink}
                  onPress={() => setShowPrivacy(true)}
                >
                  Privacy Policy
                </Text>
              </Text>
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity 
              style={styles.finishButton}
              onPress={handleFinish}
            >
              <Text style={styles.finishButtonText}>Finish</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>

      <PolicyModal
        isVisible={showTerms}
        onClose={() => setShowTerms(false)}
        title="Terms & Conditions"
        content={termsContent}
      />

      <PolicyModal
        isVisible={showPrivacy}
        onClose={() => setShowPrivacy(false)}
        title="Privacy Policy"
        content={privacyContent}
      />

      <CustomAlert
        visible={showAlert}
        type={alertConfig.type}
        title={alertConfig.title}
        message={alertConfig.message}
        onConfirm={() => {
          setShowAlert(false);
          alertConfig.buttons?.[0]?.onPress?.();
        }}
      />
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  header: {
    marginTop: 60,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  form: {
    gap: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    height: 48,
    paddingHorizontal: 12,
    color: '#fff',
    fontSize: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  finishButton: {
    backgroundColor: '#FF8C00',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  finishButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  passwordInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    height: '100%',
    padding: 0,
  },
  passwordToggle: {
    paddingLeft: 8,
  },
  passwordToggleText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    fontWeight: '600',
  },
  agreementContainer: {
    marginTop: 16,
    paddingHorizontal: 20,
  },
  agreementText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  agreementLink: {
    color: '#FF8C00',
    fontWeight: '600',
  },
  emailContainer: {
    justifyContent: 'center',
  },
  emailText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 16,
    fontWeight: '600',
  },
  required: {
    color: 'rgba(255, 182, 182, 0.9)',
    fontSize: 13,
    fontStyle: 'italic',
    fontWeight: '500',
  },
  passwordGuide: {
    marginTop: 8,
    paddingHorizontal: 4,
  },
  passwordGuideTitle: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    marginBottom: 4,
  },
  passwordGuideText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
    marginBottom: 2,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  checkIcon: {
    marginTop: -5,
  }
}); 