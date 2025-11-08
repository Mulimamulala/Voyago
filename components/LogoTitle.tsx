import React from 'react';
import { Image } from 'react-native';
import { useColorScheme } from '@/components/useColorScheme';

export default function LogoTitle() {
    const colorScheme = useColorScheme();
    const logoSource =
        colorScheme === 'dark'
            ? require('../assets/images/header(white).png')
            : require('../assets/images/header(black).png');
    return (
            <Image
                source={logoSource}
                style={{ width: 300, height: 80, resizeMode: 'contain', top: 0 }}
                accessibilityLabel="Voyago Logo"
            />
    );
}
