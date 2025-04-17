import { Slot, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, Dimensions, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as SplashScreen from 'expo-splash-screen';

const { width, height } = Dimensions.get('window');

export const gradientColors = {
  primary: ['#00BFFF', '#4c669f', '#192f6a'],
};

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '/(tabs)/login',
};

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulated delay
        
        // Hide splash screen
        await SplashScreen.hideAsync();
        
        // Tell the application to render
        setAppIsReady(true);
      } catch (e) {
        console.warn(e);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (appIsReady) {
      router.replace('/(tabs)/login');
    }
  }, [appIsReady]);

  return (
    <>
      <StatusBar 
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      {!appIsReady ? (
        <View style={styles.container}>
          <LinearGradient
            colors={gradientColors.primary}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
          >
            <View style={styles.content}>
              <View style={styles.logoContainer}>
                <Text style={styles.text}>MyApp</Text>
              </View>
              <View style={styles.spinnerContainer}>
                <ActivityIndicator size="large" color="#ffffff" />
                <Text style={styles.loadingText}>Loading...</Text>
              </View>
            </View>
          </LinearGradient>
        </View>
      ) : (
        <Slot />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    width: width,
    height: height,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 50,
  },
  text: {
    color: '#ffffff',
    fontSize: 48,
    fontWeight: 'bold',
  },
  spinnerContainer: {
    alignItems: 'center',
  },
  loadingText: {
    color: '#ffffff',
    marginTop: 10,
    fontSize: 16,
  },
});
