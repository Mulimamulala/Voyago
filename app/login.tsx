import React, { useState } from 'react';
import { Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useAppColors } from '../src/utils/useAppColors';
import { useRouter } from 'expo-router';

// Extend globalThis to include signupUser for TypeScript
declare global {
    // Adjust the type as needed if signupUser has more fields
    interface Global {
        signupUser?: { email: string; password: string };
    }
    // For React Native/JS environments, use typeof globalThis
    var signupUser: { email: string; password: string } | undefined;
}

// Preset credentials for demo
const DEMO_USER = { email: 'demo@email.com', password: 'password123' };

export default function LoginScreen() {
    const { backgroundColor, textColor, placeholderColor } = useAppColors();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        // Check against demo user or temp signup user in globalThis
        const signupUser = globalThis.signupUser;
        if (
            (email === DEMO_USER.email && password === DEMO_USER.password) ||
            (signupUser && email === signupUser.email && password === signupUser.password)
        ) {
            setError('');
            router.replace('/(tabs)');
        } else {
            setError('Invalid email or password');
        }
    };

    return (
        <ScrollView style={{ backgroundColor }} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
            <Text style={[styles.title, { color: textColor }]}>Login</Text>
            <TextInput
                style={[styles.input, { color: textColor, borderColor: textColor }]}
                placeholder="Email"
                placeholderTextColor={placeholderColor}
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={[styles.input, { color: textColor, borderColor: textColor }]}
                placeholder="Password"
                placeholderTextColor={placeholderColor}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            {error ? <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text> : null}
            <TouchableOpacity style={[styles.button, { backgroundColor: textColor }]} onPress={handleLogin}>
                <Text style={{ color: backgroundColor, fontWeight: 'bold' }}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginTop: 18 }} onPress={() => router.replace('/signup')}>
                <Text style={{ color: textColor }}>Don&apos;t have an account? <Text style={{ fontWeight: 'bold' }}>Sign up</Text></Text>
            </TouchableOpacity>
            <Text style={{ color: textColor, fontSize: 13, textAlign: 'center', marginTop: 40 }}>
                Demo login: demo@email.com / password123
            </Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 24,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        fontSize: 16,
        width: 280,
    },
    button: {
        paddingVertical: 14,
        paddingHorizontal: 40,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 8,
    },
});
