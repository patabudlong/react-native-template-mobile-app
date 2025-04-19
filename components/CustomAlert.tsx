import React, { useEffect, useRef } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export interface CustomAlertProps {
  visible: boolean;
  type: 'success' | 'error' | 'question';
  title: string;
  message: string;
  buttons?: Array<{
    text: string;
    style?: 'default' | 'cancel' | 'destructive';
    onPress: () => void;
  }>;
  onClose?: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export const CustomAlert: React.FC<CustomAlertProps> = ({
  visible,
  type,
  title,
  message,
  buttons,
  onClose,
  onConfirm,
  onCancel
}) => {
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const gradientColors = 
    type === 'success' ? ['#00C853', '#69F0AE'] :
    type === 'question' ? ['#2196F3', '#64B5F6'] :
    ['#FF5252', '#FF8A80'];

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
    >
      <View style={styles.overlay}>
        <Animated.View 
          style={[
            styles.alertContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <LinearGradient
            colors={gradientColors as [string, string, ...string[]]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
          >
            <View style={styles.content}>
              <View style={styles.iconContainer}>
                <Ionicons 
                  name={
                    type === 'success' ? 'checkmark' : 
                    type === 'question' ? 'help' : 
                    'alert'
                  } 
                  size={32} 
                  color="#fff" 
                />
              </View>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.message}>{message}</Text>
              <View>
                {buttons?.map((button, index) => (
                  <TouchableOpacity 
                    key={index} 
                    style={[styles.button, button.style === 'destructive' && styles.destructiveButton]} 
                    onPress={button.onPress}
                  >
                    <Text style={styles.buttonText}>{button.text}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              {(onConfirm || onCancel) && (
                <View style={styles.buttonRow}>
                  {onCancel && (
                    <TouchableOpacity 
                      style={[styles.button, styles.cancelButton]} 
                      onPress={onCancel}
                    >
                      <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                  )}
                  {onConfirm && (
                    <TouchableOpacity 
                      style={[styles.button, styles.confirmButton]} 
                      onPress={onConfirm}
                    >
                      <Text style={styles.buttonText}>Confirm</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
              {!buttons?.length && !onConfirm && !onCancel && onClose && (
                <TouchableOpacity 
                  style={styles.button}
                  onPress={onClose}
                >
                  <Text style={styles.buttonText}>Close</Text>
                </TouchableOpacity>
              )}
            </View>
          </LinearGradient>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  alertContainer: {
    width: '100%',
    maxWidth: 320,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  gradient: {
    width: '100%',
  },
  content: {
    padding: 24,
    alignItems: 'center',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    minWidth: 120,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  destructiveButton: {
    backgroundColor: '#FF5252',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginTop: 16,
    gap: 12,
  },
  cancelButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  confirmButton: {
    backgroundColor: 'rgba(0, 200, 83, 0.8)',
  },
});