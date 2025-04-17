import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';

export default function RootLayout() {
  return (
    <>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Stack 
        screenOptions={{ headerShown: false }}
        initialRouteName="(tabs)"
      >
        <Stack.Screen 
          name="(tabs)" 
          options={{ 
            headerShown: false,
            animation: 'none' 
          }} 
        />
      </Stack>
    </>
  );
}
