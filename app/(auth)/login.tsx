import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, Animated, Pressable, Keyboard, Platform } from 'react-native';
import { GradientBackground } from '../../components/GradientBackground';
import { useRouter, useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { api } from '../../services/apiService';
import { authService } from '../../services/authService';

interface LoginResponse {
  access_token: string;
  token_type: string;
}

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => setKeyboardVisible(true)
    );
    const keyboardWillHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
    };
  }, []);

  // Clear inputs when screen comes into focus
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setEmail('');
      setPassword('');
      setIsEmailFocused(false);
      setIsPasswordFocused(false);
      setShowPassword(false);
    });

    return unsubscribe;
  }, [navigation]);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    setIsLoading(true);
    try {
      const requestBody = {
        username: email.trim().toLowerCase(),  // Send email as username
        password: password.trim()
      };
      console.log('Login request body:', requestBody);

      const response = await api.post<LoginResponse>('/auth/login', requestBody);

      if (response.error) {
        throw new Error(response.error);
      }

      if (response.data?.access_token) {
        await authService.saveToken(response.data.access_token);
        console.log('Login successful, token saved');
        router.replace('/(tabs)/home');
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Login failed:', error);
      Alert.alert(
        'Login Failed',
        error instanceof Error ? error.message : 'Please check your credentials and try again'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    Alert.alert(
      'Reset Password',
      'This feature is not implemented yet.',
      [{ text: 'OK' }]
    );
  };

  const handleSignUp = () => {
    Alert.alert(
      'Sign Up',
      'This feature is not implemented yet.',
      [{ text: 'OK' }]
    );
  };

  const handleBiometricAuth = () => {
    Alert.alert(
      'Biometric Authentication',
      'This feature is not implemented yet.',
      [{ text: 'OK' }]
    );
  };

  return (
    <GradientBackground>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome Back</Text>
        
        <View style={styles.inputContainer}>
          <Text style={[
            styles.floatingLabel,
            {
              transform: [{
                translateY: isEmailFocused || email ? -25 : 0
              }],
              fontSize: isEmailFocused || email ? 12 : 16,
              backgroundColor: isEmailFocused || email ? 'rgba(0, 0, 0, 0.3)' : 'transparent',
              paddingHorizontal: isEmailFocused || email ? 8 : 0,
              borderRadius: isEmailFocused || email ? 4 : 0,
              opacity: isEmailFocused || email ? 1 : 0,
            }
          ]}>
            Email
          </Text>
          <TextInput
            style={styles.input}
            placeholder={isEmailFocused || email ? '' : 'Email'}
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
            value={email}
            onChangeText={setEmail}
            onFocus={() => setIsEmailFocused(true)}
            onBlur={() => setIsEmailFocused(false)}
            keyboardType="email-address"
            autoCapitalize="none"
            selectionColor="#fff"
            textContentType="emailAddress"
            autoComplete="email"
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={[
            styles.floatingLabel,
            {
              transform: [{
                translateY: isPasswordFocused || password ? -25 : 0
              }],
              fontSize: isPasswordFocused || password ? 12 : 16,
              backgroundColor: isPasswordFocused || password ? 'rgba(0, 0, 0, 0.3)' : 'transparent',
              paddingHorizontal: isPasswordFocused || password ? 8 : 0,
              borderRadius: isPasswordFocused || password ? 4 : 0,
              opacity: isPasswordFocused || password ? 1 : 0,
            }
          ]}>
            Password
          </Text>
          <TextInput
            style={[styles.input, { paddingRight: 50 }]}
            placeholder={isPasswordFocused || password ? '' : 'Password'}
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
            value={password}
            onChangeText={setPassword}
            onFocus={() => setIsPasswordFocused(true)}
            onBlur={() => setIsPasswordFocused(false)}
            secureTextEntry={!showPassword}
            selectionColor="#fff"
            textContentType="password"
            autoComplete="password"
          />
          <Pressable 
            style={styles.passwordToggle}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons 
              name={showPassword ? "eye-off" : "eye"} 
              size={24} 
              color="rgba(255, 255, 255, 0.7)"
            />
          </Pressable>
        </View>

        <TouchableOpacity 
          style={styles.forgotPasswordContainer}
          onPress={handleForgotPassword}
        >
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Text>
        </TouchableOpacity>

        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/signup')}>
            <Text style={styles.signUpLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.biometricContainer}
          onPress={handleBiometricAuth}
        >
          <Ionicons 
            name="finger-print-outline" 
            size={28} 
            color="rgba(255, 255, 255, 0.9)"
          />
          <Text style={styles.biometricText}>Sign in with Touch ID</Text>
        </TouchableOpacity>

        {!isKeyboardVisible && (
          <View style={styles.versionContainer}>
            <Text style={styles.versionText}>Version 1.0.0</Text>
          </View>
        )}

        {/* <View style={styles.helpContainer}>
          <Text style={styles.helpText}>
            Default Login:{'\n'}
            Email: test@test.com{'\n'}
            Password: pass
          </Text>
        </View> */}
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 40,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
    position: 'relative',
    height: 56,
  },
  floatingLabel: {
    position: 'absolute',
    left: 15,
    top: 15,
    color: 'rgba(255, 255, 255, 0.7)',
    backgroundColor: 'transparent',
    zIndex: 1,
    paddingVertical: 2,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    padding: 15,
    borderRadius: 10,
    color: '#ffffff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
  },
  passwordToggle: {
    position: 'absolute',
    right: 15,
    top: 16,
    zIndex: 1,
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 5,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  helpContainer: {
    marginTop: 30,
    padding: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  helpText: {
    color: '#fff',
    textAlign: 'center',
    opacity: 0.9,
    fontSize: 14,
    lineHeight: 20,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginTop: -10,
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  forgotPasswordText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  signUpText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
  },
  signUpLink: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  biometricContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  biometricText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '500',
  },
  versionContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  versionText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
  },
  buttonDisabled: {
    opacity: 0.7,
  }
}); 