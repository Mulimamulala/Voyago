import React from 'react';
import { Image } from 'react-native';
import { useColorScheme } from '@/components/useColorScheme';

export default function CompactHeader() {
    const colorScheme = useColorScheme();
    const logoSource =
        colorScheme === 'dark'
            ? require('../assets/images/header(white).png')
            : require('../assets/images/header(black).png');
    return (
        <Image
            source={logoSource}
            style={{ width: 150, height: 150, resizeMode: 'contain', top: 10 }}
            accessibilityLabel="Voyago Logo"
        />
    );
}
