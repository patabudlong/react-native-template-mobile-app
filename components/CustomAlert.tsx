import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CustomAlertProps {
  visible: boolean;
  type: 'success' | 'error';
  title: string;
  message: string;
  onClose?: () => void;
}

export function CustomAlert({ visible, type, title, message, onClose }: CustomAlertProps) {
  const iconName = type === 'success' ? 'checkmark-circle' : 'alert-circle';
  const themeColor = type === 'success' ? '#00C853' : '#FF5252';

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
    >
      <View style={styles.overlay}>
        <View style={[styles.alertBox, { borderLeftColor: themeColor, borderLeftWidth: 6 }]}>
          <View style={styles.content}>
            <View style={styles.header}>
              <Ionicons name={iconName} size={28} color={themeColor} />
              <Text style={[styles.title, { color: themeColor }]}>{title}</Text>
            </View>
            <Text style={styles.message}>{message}</Text>
          </View>
          <TouchableOpacity 
            style={styles.button}
            onPress={onClose}
          >
            <Text style={[styles.buttonText, { color: themeColor }]}>Dismiss</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
    padding: 20,
  },
  alertBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
  message: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
  button: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    padding: 16,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
}); 