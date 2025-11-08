import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import LogoTitle from '../../components/LogoTitle';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const backgroundColor = Colors[colorScheme ?? 'light'].background;
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarStyle: { backgroundColor },
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: Platform.OS === 'ios' || Platform.OS === 'android' ? () => <LogoTitle /> : 'Home',
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor, height: 150 },
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          headerTitle: Platform.OS === 'ios' || Platform.OS === 'android' ? () => <LogoTitle /> : 'Home',
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor, height: 150 },
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
        }}
      />
      <Tabs.Screen
        name="booking"
        options={{
          headerTitle: Platform.OS === 'ios' || Platform.OS === 'android' ? () => <LogoTitle /> : 'Home',
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor, height: 150 },
          tabBarIcon: ({ color }) => <TabBarIcon name="calendar" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: Platform.OS === 'ios' || Platform.OS === 'android' ? () => <LogoTitle /> : 'Home',
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor, height: 150 },
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}
