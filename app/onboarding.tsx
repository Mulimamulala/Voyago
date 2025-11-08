import React from 'react';
import { Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useAppColors } from '../src/utils/useAppColors';
import { useRouter } from 'expo-router';

export default function OnboardingScreen() {
    const { backgroundColor, textColor } = useAppColors();
    const router = useRouter();
    return (
        <ScrollView style={{ backgroundColor }} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
            <Image source={require('../assets/images/paris.jpg')} style={styles.image} resizeMode="cover" />
            <Text style={[styles.title, { color: textColor }]}>Welcome to Voyago</Text>
            <Text style={[styles.subtitle, { color: textColor }]}>Discover, book, and explore amazing destinations around the world.</Text>
            <TouchableOpacity style={[styles.button, { backgroundColor: textColor }]} onPress={() => router.replace('/login')}>
                <Text style={{ color: backgroundColor, fontWeight: 'bold' }}>Get Started</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 220,
        height: 220,
        borderRadius: 110,
        marginBottom: 32,
        marginTop: 40,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 12,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 32,
        textAlign: 'center',
        paddingHorizontal: 10,
    },
    button: {
        paddingVertical: 14,
        paddingHorizontal: 40,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
});
