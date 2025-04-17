import React from 'react';
import { Tabs, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SharedHeader } from '../../components/SharedHeader';
import { GradientBackground } from '../../components/GradientBackground';

export default function TabLayout() {
  const pathname = usePathname();
  const isLoginScreen = pathname === '/login';

  return (
    <GradientBackground>
      {!isLoginScreen && <SharedHeader />}
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { 
            backgroundColor: '#192f6a',
            borderTopWidth: 0,
            display: isLoginScreen ? 'none' : 'flex',
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Dashboard',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="grid-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Explore',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="compass" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="more"
          options={{
            title: 'More',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ellipsis-horizontal" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </GradientBackground>
  );
}
