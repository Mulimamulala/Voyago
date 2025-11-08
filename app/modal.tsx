
import { useLocalSearchParams, useRouter } from 'expo-router';
import { destinations } from '../src/data/destinations';
import { useAppColors } from '../src/utils/useAppColors';
import { Text, View, Image, TouchableOpacity, StyleSheet, ScrollView, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';


export default function ModalScreen() {
  const { id } = useLocalSearchParams();
  const { backgroundColor, textColor } = useAppColors();
  const destination = destinations.find(d => d.id === id);
  const navigation = useNavigation();
  const router = useRouter();

  useLayoutEffect(() => {
    if (destination) {
      navigation.setOptions({ title: destination.title });
    }
  }, [navigation, destination]);

  // For demo: support multiple images if destination.image is array, else single
  const images = Array.isArray(destination?.image) ? destination.image : [destination?.image].filter(Boolean);

  // For demo: costs and location (mocked if not present)
  // Fallbacks for costs and location to avoid empty object errors
  // Demo: always use fallback values for costs and location (data model does not support these fields yet)
  const costs = { min: 100, max: 500, currency: 'USD' };

  // Find similar destinations (same region or just others for now)
  const similar = destinations.filter(d => d.id !== id).slice(0, 3);

  if (!destination) {
    return (
      <View style={[modalStyles.container, { backgroundColor }]}>
        <Text style={[modalStyles.title, { color: textColor }]}>Destination not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor }} contentContainerStyle={{ padding: 10 }}>
      {/* Images under title */}
      {images.map((img, idx) => (
        <Image
          key={idx}
          source={img}
          style={[modalStyles.fullWidthImage, { marginBottom: 16 }]}
          resizeMode="cover"
        />
      ))}

      {/* Description */}
      <Text style={[modalStyles.desc, { color: textColor }]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque. Etiam euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque.</Text>
      <Text style={[modalStyles.desc, { color: textColor }]}>Suspendisse potenti. Nullam ac urna eu felis dapibus condimentum sit amet a augue. Sed non neque elit. Sed ut imperdiet nisi. Proin condimentum fermentum nunc. Etiam pharetra, erat sed fermentum feugiat, velit mauris egestas quam, ut aliquam massa nisl quis neque.</Text>
      <Text style={[modalStyles.desc, { color: textColor }]}>Curabitur convallis. Duis consequat dui nec nisi volutpat eleifend. Donec nec dolor erat, condimentum sagittis sem. Morbi dictum, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque, vitae dictum lacus. Etiam pharetra, erat sed fermentum feugiat, velit mauris egestas quam.</Text>

      {/* Costs */}
      <View style={modalStyles.costsBox}>
        <Text style={[modalStyles.costsLabel, { color: textColor }]}>Costs:</Text>
        <Text style={[modalStyles.costsValue, { color: textColor }]}>
          {costs.currency} {costs.min} - {costs.max}
        </Text>
      </View>

      {/* Book Button */}
      <TouchableOpacity
        style={modalStyles.button}
        onPress={() => {
          router.replace('/(tabs)/booking');
        }}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Book Now</Text>
      </TouchableOpacity>

      {/* Similar Destinations */}
      <Text style={[modalStyles.similarTitle, { color: textColor }]}>Similar Destinations</Text>
      <FlatList
        data={similar}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 8, marginBottom: 24 }}
        renderItem={({ item }) => (
          <View style={modalStyles.similarCard}>
            <Image source={item.image} style={modalStyles.similarImage} resizeMode="cover" />
            <Text style={[modalStyles.similarLabel, { color: textColor }]}>{item.title}</Text>
          </View>
        )}
      />
    </ScrollView>
  );
}

const modalStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  image: {
    width: "100%",
    height: 140,
    borderRadius: 14,
    marginRight: 0,
    marginBottom: 8,
  },
  fullWidthImage: {
    width: '100%',
    height: 200,
    borderRadius: 18,
    alignSelf: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'left',
  },
  desc: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'left',
  },
  costsBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    gap: 8,
  },
  costsLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 8,
  },
  costsValue: {
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  similarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 4,
  },
  similarCard: {
    width: 120,
    marginRight: 12,
    alignItems: 'center',
  },
  similarImage: {
    width: 110,
    height: 70,
    borderRadius: 10,
    marginBottom: 4,
  },
  similarLabel: {
    fontSize: 14,
    textAlign: 'center',
  },
});


