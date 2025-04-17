import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, Animated } from 'react-native';
import { GradientBackground } from '../../components/GradientBackground';
import { useRouter, useNavigation } from 'expo-router';

const DEFAULT_EMAIL = 'test@test.com';
const DEFAULT_PASSWORD = 'pass';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const router = useRouter();
  const navigation = useNavigation();

  // Clear inputs when screen comes into focus
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setEmail('');
      setPassword('');
      setIsEmailFocused(false);
      setIsPasswordFocused(false);
    });

    return unsubscribe;
  }, [navigation]);

  const handleLogin = () => {
    if (email === DEFAULT_EMAIL && password === DEFAULT_PASSWORD) {
      // Successful login
      router.push('/home');
    } else {
      // Failed login
      Alert.alert(
        'Login Failed',
        'Invalid email or password. Please try again.',
        [{ text: 'OK' }]
      );
    }
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
            style={styles.input}
            placeholder={isPasswordFocused || password ? '' : 'Password'}
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
            value={password}
            onChangeText={setPassword}
            onFocus={() => setIsPasswordFocused(true)}
            onBlur={() => setIsPasswordFocused(false)}
            secureTextEntry
            selectionColor="#fff"
            textContentType="password"
            autoComplete="password"
          />
        </View>

        <TouchableOpacity 
          style={styles.button}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <View style={styles.helpContainer}>
          <Text style={styles.helpText}>
            Default Login:{'\n'}
            Email: test@test.com{'\n'}
            Password: pass
          </Text>
        </View>
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
}); 