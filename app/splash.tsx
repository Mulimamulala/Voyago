import React, { useEffect } from 'react';
import { Text, StyleSheet, View, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppColors } from '../src/utils/useAppColors';

export default function SplashScreen() {
    const router = useRouter();
    const { backgroundColor, textColor } = useAppColors();

    useEffect(() => {
        const checkFirstTime = async () => {
            try {
                const seen = await AsyncStorage.getItem('hasOnboarded');
                setTimeout(() => {
                    if (!seen) {
                        router.replace('/onboarding');
                    } else {
                        router.replace('/login');
                    }
                }, 1200);
            } catch (e) {
                router.replace('/login');
            }
        };
        checkFirstTime();
    }, [router]);

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <Text style={[styles.title, { color: textColor }]}>Voyago</Text>
            <ActivityIndicator size="large" color={textColor} style={{ marginTop: 24 }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 38,
        fontWeight: 'bold',
        letterSpacing: 2,
    },
});
