import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';

export const gradientColors = ['#00BFFF', '#4c669f', '#192f6a'];

export function GradientBackground({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {children}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
}); 