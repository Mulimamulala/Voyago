
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useAppColors } from '../../src/utils/useAppColors';
import { Ionicons } from '@expo/vector-icons';

export default function BookingScreen() {
  const { backgroundColor, textColor } = useAppColors();
  return (
    <ScrollView style={{ backgroundColor }} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={styles.headerRow}>
        <Text style={[styles.header, { color: textColor }]}>My Bookings</Text>
        <Ionicons name="calendar" size={28} color={textColor} style={{ marginLeft: 8 }} />
      </View>
      <Text style={[styles.sub, { color: textColor }]}>Upcoming and past reservations will appear here.</Text>
      {/* Example booking card */}
      <View style={[styles.card, { backgroundColor }]}>
        <Text style={[styles.cardTitle, { color: textColor }]}>No bookings yet</Text>
        <Text style={[styles.cardDesc, { color: textColor }]}>You haven&apos;t made any bookings. Start exploring and book your next adventure!</Text>
        <TouchableOpacity style={[styles.button, { backgroundColor: textColor }]}>
          <Text style={{ color: backgroundColor, fontWeight: 'bold' }}>Explore Destinations</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 40,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  sub: {
    fontSize: 16,
    marginBottom: 18,
    paddingHorizontal: 20,
  },
  card: {
    borderRadius: 18,
    margin: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardDesc: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 18,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
});
