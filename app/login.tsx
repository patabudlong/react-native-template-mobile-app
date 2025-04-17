import React from 'react';
import { StyleSheet, View } from 'react-native';
import { GradientBackground } from '../components/GradientBackground';

export default function LoginScreen() {
  return (
    <GradientBackground>
      <View style={styles.container}>
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 