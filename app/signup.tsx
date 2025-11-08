import React, { useState } from 'react';
import { Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useAppColors } from '../src/utils/useAppColors';
import { useRouter } from 'expo-router';

export default function SignupScreen() {
    const { backgroundColor, textColor, placeholderColor } = useAppColors();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSignup = () => {
        if (!email || !password) {
            setError('Please fill all fields');
            setSuccess('');
            return;
        }
        if (password !== confirm) {
            setError('Passwords do not match');
            setSuccess('');
            return;
        }
        // Store in globalThis for session persistence
        (globalThis as any).signupUser = { email, password };
        setError('');
        setSuccess('Account created! You can now log in.');
        setTimeout(() => {
            router.replace('/login');
        }, 1200);
    };

    return (
        <ScrollView style={{ backgroundColor }} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
            <Text style={[styles.title, { color: textColor }]}>Sign Up</Text>
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
            <TextInput
                style={[styles.input, { color: textColor, borderColor: textColor }]}
                placeholder="Confirm Password"
                placeholderTextColor={placeholderColor}
                secureTextEntry
                value={confirm}
                onChangeText={setConfirm}
            />
            {error ? <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text> : null}
            {success ? <Text style={{ color: 'green', marginBottom: 10 }}>{success}</Text> : null}
            <TouchableOpacity style={[styles.button, { backgroundColor: textColor }]} onPress={handleSignup}>
                <Text style={{ color: backgroundColor, fontWeight: 'bold' }}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginTop: 18 }} onPress={() => router.replace('/login')}>
                <Text style={{ color: textColor }}>Already have an account? <Text style={{ fontWeight: 'bold' }}>Login</Text></Text>
            </TouchableOpacity>
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
