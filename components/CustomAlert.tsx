import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface AlertButton {
  text: string;
  style?: 'default' | 'cancel' | 'destructive';
  onPress: () => void;
}

interface CustomAlertProps {
  visible: boolean;
  type: 'success' | 'error';
  title: string;
  message: string;
  buttons?: AlertButton[];
  onClose?: () => void;
}

export function CustomAlert({ visible, type, title, message, buttons, onClose }: CustomAlertProps) {
  const iconName = type === 'success' ? 'checkmark-circle' : 'close-circle';
  const iconColor = type === 'success' ? '#4CAF50' : '#F44336';

  const renderButtons = () => {
    if (!buttons || buttons.length === 0) {
      return (
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: iconColor }]}
          onPress={onClose}
        >
          <Text style={styles.buttonText}>OK</Text>
        </TouchableOpacity>
      );
    }

    return buttons.map((button, index) => (
      <TouchableOpacity 
        key={index}
        style={[
          styles.button,
          button.style === 'destructive' && styles.destructiveButton,
          button.style === 'cancel' && styles.cancelButton
        ]}
        onPress={button.onPress}
      >
        <Text style={[
          styles.buttonText,
          button.style === 'cancel' && styles.cancelText
        ]}>
          {button.text}
        </Text>
      </TouchableOpacity>
    ));
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.alertBox}>
          <Ionicons name={iconName} size={60} color={iconColor} />
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.buttonContainer}>
            {renderButtons()}
          </View>
        </View>
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
  },
  alertBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    width: '80%',
    maxWidth: 320,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginTop: 24,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#4CAF50',
  },
  buttonMargin: {
    marginLeft: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  destructiveButton: {
    backgroundColor: '#F44336',
  },
  destructiveText: {
    color: '#fff',
  },
  cancelButton: {
    backgroundColor: '#E0E0E0',
    borderWidth: 1,
    borderColor: '#BDBDBD',
  },
  cancelText: {
    color: '#333',
  },
}); 