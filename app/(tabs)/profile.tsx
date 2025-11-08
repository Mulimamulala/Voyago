
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useAppColors } from '../../src/utils/useAppColors';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const { backgroundColor, textColor } = useAppColors();
  return (
    <ScrollView style={{ backgroundColor }} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={styles.profileCard}>
        <View style={styles.avatarWrapper}>
          <Ionicons name="person" size={48} color={textColor} />
        </View>
        <Text style={[styles.name, { color: textColor }]}>Your Name</Text>
        <Text style={[styles.email, { color: textColor }]}>you@email.com</Text>
        <TouchableOpacity style={[styles.button, { backgroundColor: textColor }]}>
          <Text style={{ color: backgroundColor, fontWeight: 'bold' }}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>Settings</Text>
        <TouchableOpacity style={styles.settingRow}>
          <MaterialIcons name="dark-mode" size={22} color={textColor} style={{ marginRight: 10 }} />
          <Text style={[styles.settingLabel, { color: textColor }]}>Dark Mode</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingRow}>
          <Ionicons name="log-out-outline" size={22} color={textColor} style={{ marginRight: 10 }} />
          <Text style={[styles.settingLabel, { color: textColor }]}>Logout</Text>
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
  profileCard: {
    borderRadius: 18,
    margin: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
    backgroundColor: 'transparent',
  },
  avatarWrapper: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  email: {
    fontSize: 15,
    marginBottom: 14,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  section: {
    marginTop: 18,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingLabel: {
    fontSize: 16,
  },
});
