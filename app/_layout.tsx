import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });
  const colorScheme = useColorScheme();
  const [splashHidden, setSplashHidden] = useState(false);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      setTimeout(async () => {
        await SplashScreen.hideAsync();
        setSplashHidden(true);
      }, 800); // Show splash for at least 800ms for smoothness
    }
  }, [loaded]);

  if (!loaded || !splashHidden) {
    // Show custom splash screen based on color scheme
    const splashSource = colorScheme === 'dark'
      ? require('../assets/images/voyago(black).png')
      : require('../assets/images/voyago(white).png');
    return (
      <View style={styles.splashContainer}>
        <Image source={splashSource} style={styles.splashImage} resizeMode="contain" />
      </View>
    );
  }

  return <RootLayoutNav />;
}
const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff', // You can also switch this based on colorScheme
  },
  splashImage: {
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').height * 0.3,
  },
});

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </ThemeProvider>
  );
}
