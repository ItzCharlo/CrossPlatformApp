import { ScrollView, StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { router, useLocalSearchParams, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { fetchMovieDetails } from '@/services/api';
import useFetch from '@/services/useFetch';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';

interface MovieInfoProps {
  label: string;
  value: string | number | null;
}

const { width: screenWidth } = Dimensions.get('window');

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View style={styles.infoContainer}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value ?? 'N/A'}</Text>
  </View>
);

export default function Details() {
  const { id } = useLocalSearchParams();
  const { data: movie, loading, error } = useFetch(() => fetchMovieDetails(String(id)));
  const [isSaved, setIsSaved] = useState(false);

  // Tjek om filmen allerede er gemt
  const checkIfSaved = async () => {
    try {
      const existing = await AsyncStorage.getItem('savedMovies');
      const savedMovies = existing ? JSON.parse(existing) : [];
      if (movie && savedMovies.some((m: any) => m.id === movie.id)) {
        setIsSaved(true);
      } else {
        setIsSaved(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (movie) checkIfSaved();
  }, [movie]);

  const handleSaveToggle = async () => {
    try {
      const existing = await AsyncStorage.getItem('savedMovies');
      const savedMovies = existing ? JSON.parse(existing) : [];

      if (!movie) return;

      if (isSaved) {
        // Fjern filmen
        const updated = savedMovies.filter((m: any) => m.id !== movie.id);
        await AsyncStorage.setItem('savedMovies', JSON.stringify(updated));
        setIsSaved(false);
        Alert.alert('Removed', `${movie.title} was removed from your saved list.`);
      } else {
        // Tilføj filmen
        savedMovies.push(movie);
        await AsyncStorage.setItem('savedMovies', JSON.stringify(savedMovies));
        setIsSaved(true);
        Alert.alert('Saved', `${movie.title} was added to your saved list.`);
      }
    } catch (err) {
      console.error('Failed to save/remove movie:', err);
    }
  };

  if (!id) return <Text style={styles.loading}>No movie ID provided</Text>;
  if (loading) return <Text style={styles.loading}>Loading movie details...</Text>;
  if (error || !movie) return <Text style={styles.loading}>Failed to load movie details.</Text>;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {movie.poster_path && (
          <Image
            style={styles.poster}
            source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
            resizeMode="cover"
          />
        )}

        <Text style={styles.title}>{movie.title ?? 'N/A'}</Text>

        <View style={styles.row}>
          <Text style={styles.basicInfo}>{movie.release_date?.split('-')[0] ?? 'N/A'}</Text>
          <Text style={styles.basicInfo}>{movie.runtime ? `${movie.runtime}m` : 'N/A'}</Text>
          <Text style={styles.basicInfo}>⭐ {movie.vote_average ?? 'N/A'}</Text>
        </View>

        <MovieInfo label="Overview" value={movie.overview ?? 'N/A'} />
        <MovieInfo label="Genres" value={movie.genres?.map((g: any) => g.name).join(', ') ?? 'N/A'} />
        <View style={styles.rowInfo}>
          <MovieInfo
            label="Budget"
            value={movie.budget ? `$${(movie.budget / 1_000_000).toFixed(1)}M` : 'N/A'}
          />
          <MovieInfo
            label="Revenue"
            value={movie.revenue ? `$${(movie.revenue / 1_000_000).toFixed(1)}M` : 'N/A'}
          />
        </View>
        <MovieInfo
          label="Production Companies"
          value={movie.production_companies?.map((c: any) => c.name).join(', ') ?? 'N/A'}
        />
      </ScrollView>

      {/* Save/Remove knap */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveToggle}>
        <Ionicons name={isSaved ? "bookmark" : "bookmark-outline"} size={22} color="#000" />
        <Text style={styles.saveText}>{isSaved ? "Remove from Saved" : "Add to Saved"}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={22} color="#fff" />
        <Text style={styles.backText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1C1C1C', paddingBottom: 20 },
  scrollContent: { padding: 20, paddingBottom: 80 },
  poster: { width: screenWidth - 40, height: (screenWidth - 40) * 1.5, borderRadius: 10, marginBottom: 20, alignSelf: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#FFD700', marginBottom: 10, textAlign: 'center' },
  row: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  basicInfo: { color: '#FFF', fontWeight: '600' },
  infoContainer: { marginRight: 10, marginBottom: 15, flex: 1 },
  infoLabel: { color: '#FFD700', fontWeight: '700', marginBottom: 5 },
  infoValue: { color: '#FFF', fontSize: 14, lineHeight: 20 },
  rowInfo: { flexDirection: 'row', justifyContent: 'flex-start', width: '100%', marginBottom: 15 },
  loading: { marginTop: 50, textAlign: 'center', color: '#FFF', fontSize: 18 },
  backButton: {
    position: 'absolute',
    bottom: 30,
    left: '50%',
    transform: [{ translateX: -50 }],
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  backText: { color: 'white', fontWeight: '600', fontSize: 16, marginLeft: 8 },
  saveButton: {
    position: 'absolute',
    bottom: 80,
    left: '50%',
    transform: [{ translateX: -100 }],
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFD700',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  saveText: { color: '#000', fontWeight: '600', fontSize: 16, marginLeft: 8 },
});
