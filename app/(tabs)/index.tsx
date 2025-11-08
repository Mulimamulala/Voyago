

import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Image, StyleSheet, Pressable, Animated, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { destinations } from '../../src/data/destinations';
import { useAppColors } from '../../src/utils/useAppColors';
import { Ionicons, MaterialIcons, FontAwesome5, Entypo, Feather } from '@expo/vector-icons';
import CompactHeader from '../../components/CompactHeader';

// Helper component for sort chips
function SortChip({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#f2f2f2',
      borderRadius: 18,
      paddingHorizontal: 14,
      paddingVertical: 7,
      marginRight: 5,
      borderWidth: 1,
      borderColor: '#e0e0e0',
    }}>
      {icon}
      <Text style={{ marginLeft: 7, fontSize: 15, color: '#222', fontWeight: '500' }}>{label}</Text>
    </View>
  );
}


export default function HomeScreen() {
  const { backgroundColor, textColor, placeholderColor } = useAppColors();
  const [search, setSearch] = useState('');
  const [showCompactHeader, setShowCompactHeader] = useState(false);
  const router = useRouter();

  const filtered = destinations.filter(d =>
    d.title.toLowerCase().includes(search.toLowerCase()) ||
    d.description.toLowerCase().includes(search.toLowerCase())
  );

  // Animated value for header/search bar
  const headerAnim = useRef(new Animated.Value(0)).current;

  // Interpolate header translateY
  const headerTranslateY = headerAnim.interpolate({
    inputRange: [0, 80],
    outputRange: [0, -80],
    extrapolate: 'clamp',
  });

  // Handler for scroll events
  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: headerAnim } } }],
    {
      useNativeDriver: true,
      listener: (event) => {
        const y = (event as any).nativeEvent?.contentOffset?.y ?? 0;
        setShowCompactHeader(y > 40);
      },
    }
  );

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Animated.View
        style={{
          transform: [{ translateY: headerTranslateY }],
          zIndex: 1,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          backgroundColor,
        }}
      >
        {showCompactHeader ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, height: 56 }}>
            <CompactHeader />
            <TouchableOpacity onPress={() => { /* TODO: handle search icon press */ }} style={{ marginTop: 10 }}>
              <Ionicons name="search" size={28} color={textColor} />
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <TextInput
              style={[styles.search, { color: textColor, borderColor: textColor }]}
              placeholder="Search destinations..."
              placeholderTextColor={placeholderColor}
              value={search}
              onChangeText={setSearch}
            />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ paddingVertical: 6, paddingLeft: 0, paddingRight: 0, marginTop: 2 }}
              contentContainerStyle={{ alignItems: 'center', paddingHorizontal: 8 }}
            >
              <SortChip icon={<MaterialIcons name="star" size={20} color="#007AFF" />} label="Top Rated" />
              <SortChip icon={<Ionicons name="pricetag" size={20} color="#007AFF" />} label="Price" />
              <SortChip icon={<FontAwesome5 name="fire" size={18} color="#007AFF" />} label="Popular" />
              <SortChip icon={<Entypo name="location-pin" size={20} color="#007AFF" />} label="Nearby" />
              <SortChip icon={<Feather name="calendar" size={20} color="#007AFF" />} label="Newest" />
              <SortChip icon={<MaterialIcons name="family-restroom" size={20} color="#007AFF" />} label="Family" />
              <SortChip icon={<FontAwesome5 name="mountain" size={18} color="#007AFF" />} label="Adventure" />
              <SortChip icon={<MaterialIcons name="beach-access" size={20} color="#007AFF" />} label="Beach" />
              <SortChip icon={<MaterialIcons name="nature" size={20} color="#007AFF" />} label="Nature" />
              <SortChip icon={<Ionicons name="trending-up" size={20} color="#007AFF" />} label="Trending" />
            </ScrollView>
          </>
        )}
      </Animated.View>
      <Animated.FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={styles.bigCard}
            onPress={() => router.push({ pathname: '/modal', params: { id: item.id } })}
          >
            <Image source={item.image} style={styles.bigImage} resizeMode="cover" />
            <Text style={[styles.bigTitle, { color: textColor }]}>{item.title}</Text>
            <Text style={[styles.bigDesc, { color: textColor }]}>{item.description}</Text>
          </Pressable>
        )}
        contentContainerStyle={{ paddingTop: 100, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={onScroll}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 40,
  },
  search: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  bigCard: {
    borderRadius: 18,
    top: 18,
    marginBottom: 15,
    overflow: 'hidden',
    alignItems: 'center',
    paddingBottom: 5,
  },
  bigImage: {
    width: '100%',
    height: 250,
    borderRadius: 18,
    marginTop: -18,
  },
  bigTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 6,
    textAlign: 'left',
    alignSelf: 'stretch',
    paddingHorizontal: 6,
  },
  bigDesc: {
    fontSize: 15,
    marginTop: 0,
    textAlign: 'left',
    alignSelf: 'stretch',
    paddingHorizontal: 6,
  },
  button: {
    marginTop: 20,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
});
