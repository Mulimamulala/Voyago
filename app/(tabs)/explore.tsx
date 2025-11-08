
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { useAppColors } from '../../src/utils/useAppColors';
import { destinations } from '../../src/data/destinations';
import { Ionicons, MaterialIcons, FontAwesome5, Entypo, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const categories = [
  { key: 'beach', label: 'Beaches', icon: (color: string) => <MaterialIcons name="beach-access" size={20} color={color} /> },
  { key: 'adventure', label: 'Adventure', icon: (color: string) => <FontAwesome5 name="mountain" size={18} color={color} /> },
  { key: 'family', label: 'Family', icon: (color: string) => <MaterialIcons name="family-restroom" size={20} color={color} /> },
  { key: 'nature', label: 'Nature', icon: (color: string) => <MaterialIcons name="nature" size={20} color={color} /> },
  { key: 'trending', label: 'Trending', icon: (color: string) => <Ionicons name="trending-up" size={20} color={color} /> },
  { key: 'popular', label: 'Popular', icon: (color: string) => <FontAwesome5 name="fire" size={18} color={color} /> },
  { key: 'nearby', label: 'Nearby', icon: (color: string) => <Entypo name="location-pin" size={20} color={color} /> },
  { key: 'newest', label: 'Newest', icon: (color: string) => <Feather name="calendar" size={20} color={color} /> },
];

function CategoryChip({ icon, label, selected, onPress }: { icon: (color: string) => React.ReactNode; label: string; selected: boolean; onPress: () => void }) {
  // Use textColor for chip label and icon
  const { textColor } = useAppColors();
  // Use the same color as tab bar icons (textColor)
  const iconColor = textColor;
  return (
    <TouchableOpacity onPress={onPress} style={[styles.chip, selected && styles.chipSelected]}>
      {icon(iconColor)}
      <Text style={[styles.chipLabel, selected && styles.chipLabelSelected, { color: selected ? '#007AFF' : textColor }]}>{label}</Text>
    </TouchableOpacity>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  // Use textColor for section title
  const { textColor } = useAppColors();
  return (
    <View style={{ marginTop: 28 }}>
      <Text style={[styles.sectionTitle, { color: textColor }]}>{title}</Text>
      {children}
    </View>
  );
}

export default function ExploreScreen() {
  const { backgroundColor, textColor } = useAppColors();
  // Card background should match main background for dark/light mode
  const cardBackground = backgroundColor;
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const router = useRouter();

  // Filter destinations by selected category (if any)
  // No category field in data, so just show all destinations for now
  const filtered = destinations;

  // For demo, just shuffle for 'Recommended' and 'Popular'
  const recommended = [...destinations].sort(() => 0.5 - Math.random()).slice(0, 5);
  const popular = [...destinations].sort(() => 0.5 - Math.random()).slice(0, 5);

  return (
    <ScrollView style={{ backgroundColor }} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Hero Banner */}
      <TouchableOpacity style={styles.heroBanner} activeOpacity={0.9}>
        <Image source={require('../../assets/images/paris.jpg')} style={styles.heroImage} resizeMode="cover" />
        <View style={styles.heroOverlay} />
        <Text style={[styles.heroText, { color: "#fff" }]}>Discover Zanzibar&apos;s Hidden Gems!</Text>
      </TouchableOpacity>

      {/* Categories */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 18, paddingLeft: 10 }} contentContainerStyle={{ alignItems: 'center', paddingRight: 12 }}>
        {categories.map(cat => (
          <CategoryChip
            key={cat.key}
            icon={cat.icon}
            label={cat.label}
            selected={selectedCategory === cat.key}
            onPress={() => setSelectedCategory(selectedCategory === cat.key ? null : cat.key)}
          />
        ))}
      </ScrollView>

      {/* Popular Destinations */}
      <Section title="Popular Destinations">
        <FlatList
          data={popular}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity style={[styles.card, { backgroundColor: cardBackground }]} onPress={() => router.push({ pathname: '/modal', params: { id: item.id } })}>
              <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
              <Text style={[styles.cardTitle, { color: textColor }]}>{item.title}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingLeft: 12, paddingRight: 8 }}
        />
      </Section>

      {/* Recommended for You */}
      <Section title="Recommended for You">
        <FlatList
          data={recommended}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity style={[styles.card, { backgroundColor: cardBackground }]} onPress={() => router.push({ pathname: '/modal', params: { id: item.id } })}>
              <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
              <Text style={[styles.cardTitle, { color: textColor }]}>{item.title}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingLeft: 12, paddingRight: 8 }}
        />
      </Section>

      {/* All Destinations (filtered) */}
      <Section title={selectedCategory ? `Explore ${categories.find(c => c.key === selectedCategory)?.label}` : 'All Destinations'}>
        <FlatList
          data={filtered}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity style={[styles.card, { backgroundColor: cardBackground }]} onPress={() => router.push({ pathname: '/modal', params: { id: item.id } })}>
              <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
              <Text style={[styles.cardTitle, { color: textColor }]}>{item.title}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingLeft: 12, paddingRight: 8 }}
        />
      </Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  heroBanner: {
    height: 180,
    borderRadius: 18,
    margin: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  heroText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    zIndex: 2,
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 7,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  chipSelected: {
    backgroundColor: '#007AFF22',
    borderColor: '#007AFF',
  },
  chipLabel: {
    marginLeft: 7,
    fontSize: 15,
    color: '#222',
    fontWeight: '500',
  },
  chipLabelSelected: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 18,
    marginBottom: 8,
    marginTop: 8,
    color: '#222',
  },
  card: {
    width: 140,
    marginRight: 14,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  cardImage: {
    width: '100%',
    height: 90,
    borderRadius: 14,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    margin: 8,
  },
});
